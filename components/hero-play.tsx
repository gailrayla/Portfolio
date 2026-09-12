"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Marla from "@/components/marla";

/*
 * The hero interaction: Marla runs, you make her jump, and the things she
 * collects go in her pack. Each pickup is something true about Gail, so the
 * play returns a little of the About page rather than points.
 *
 * Deliberately has no fail state. Bumping a crate costs a stumble and
 * nothing else; a portfolio is a bad place to lose.
 */

const STAGE_W = 900;
const STAGE_H = 300;
const GROUND = 250;

const MARLA_SCALE = 0.68;
const MARLA_X = 90;
/** Distance from the top of the art box down to the paws. */
const MARLA_FOOT_OFFSET = 148 * MARLA_SCALE;

const SPEED = 265; // stage units per second
const GRAVITY = 2300;
const JUMP_V = -760;

const OBSTACLE_W = 34;
const OBSTACLE_H = 44;
const ITEM_SIZE = 36;
/** Low items are collected by running; high ones need a jump. */
const ITEM_LOW_Y = GROUND - 52;
const ITEM_HIGH_Y = GROUND - 132;

type ItemKind = "coffee" | "film" | "ticket" | "ball";

const ITEMS: { kind: ItemKind; label: string }[] = [
  { kind: "coffee", label: "a good coffee" },
  { kind: "film", label: "a roll of film" },
  { kind: "ticket", label: "another solo trip" },
  { kind: "ball", label: "her actual priority" },
];

type Entity =
  | { id: number; type: "obstacle"; x: number }
  | { id: number; type: "item"; x: number; y: number; kind: ItemKind; taken: boolean };

type Phase = "idle" | "running";

function ItemIcon({ kind }: { kind: ItemKind }) {
  switch (kind) {
    case "coffee":
      return (
        <g>
          <path d="M7 11 h18 v12 a6 6 0 0 1 -6 6 h-6 a6 6 0 0 1 -6 -6 Z" fill="var(--color-accent)" />
          <path d="M25 14 h3 a4 4 0 0 1 0 8 h-3" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" />
          <path d="M7 11 h18" stroke="var(--color-accent-deep)" strokeWidth="3.5" />
          <path d="M13 5 v3 M19 5 v3" stroke="var(--color-ink-faint)" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "film":
      return (
        <g>
          <rect x="8" y="9" width="20" height="18" rx="3" fill="var(--color-accent)" />
          <circle cx="18" cy="18" r="5" fill="var(--color-accent-deep)" />
          <path d="M8 6 h7 v3 h-7 Z" fill="var(--color-ink-faint)" />
        </g>
      );
    case "ticket":
      return (
        <g>
          <path d="M6 11 h24 v5 a3 3 0 0 0 0 6 v5 h-24 v-5 a3 3 0 0 0 0 -6 Z" fill="var(--color-accent)" />
          <path d="M20 13 v12" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      );
    case "ball":
      return (
        <g>
          <circle cx="18" cy="18" r="11" fill="var(--color-accent)" />
          <path
            d="M9 12 C 14 16, 14 20, 9 24 M27 12 C 22 16, 22 20, 27 24"
            stroke="#fff"
            strokeOpacity="0.8"
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
  }
}

export default function HeroPlay() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [collected, setCollected] = useState<ItemKind[]>([]);
  const [caption, setCaption] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  /* Narrow screens zoom into the stage instead of shrinking the whole scene,
     and touch devices are told to tap rather than to press a key. */
  const [narrow, setNarrow] = useState(false);
  const [touch, setTouch] = useState(false);
  const [, render] = useReducer((n: number) => n + 1, 0);

  const stageRef = useRef<HTMLDivElement>(null);
  const entities = useRef<Entity[]>([]);
  const nextId = useRef(1);
  const spawnIn = useRef(0.7);
  const runPhase = useRef(0);
  /** Height above the ground, in stage units. */
  const lift = useRef(0);
  const velocity = useRef(0);
  const stumble = useRef(0);
  const collectedRef = useRef<ItemKind[]>([]);
  const phaseRef = useRef<Phase>("idle");
  const visible = useRef(true);
  const reducedRef = useRef(false);
  const captionTimer = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = prefersReduced;
    setReduced(prefersReduced);
    setTouch(window.matchMedia("(pointer: coarse)").matches);

    const narrowQuery = window.matchMedia("(max-width: 639px)");
    const syncNarrow = (): void => setNarrow(narrowQuery.matches);
    syncNarrow();
    narrowQuery.addEventListener("change", syncNarrow);
    return () => narrowQuery.removeEventListener("change", syncNarrow);
  }, []);

  const jump = useCallback(() => {
    if (phaseRef.current !== "running" || lift.current > 0) {
      return;
    }
    velocity.current = JUMP_V;
  }, []);

  const start = useCallback(() => {
    if (reducedRef.current) {
      return;
    }
    if (phaseRef.current === "running") {
      jump();
      return;
    }
    phaseRef.current = "running";
    setPhase("running");
  }, [jump]);

  /* Pause when the hero scrolls away or the tab is hidden. */
  useEffect(() => {
    const node = stageRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      return;
    }

    let frame = 0;
    let last = performance.now();

    const tick = (now: number): void => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (phaseRef.current === "running" && visible.current && !document.hidden) {
        step(dt);
        render();
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const showCaption = (label: string): void => {
    setCaption(label);
    if (captionTimer.current) {
      window.clearTimeout(captionTimer.current);
    }
    captionTimer.current = window.setTimeout(() => setCaption(null), 2200);
  };

  const step = (dt: number): void => {
    runPhase.current += dt * 11;

    /* Vertical motion. */
    if (velocity.current !== 0 || lift.current > 0) {
      velocity.current += GRAVITY * dt;
      lift.current -= velocity.current * dt;
      if (lift.current <= 0) {
        lift.current = 0;
        velocity.current = 0;
      }
    }

    if (stumble.current > 0) {
      stumble.current = Math.max(0, stumble.current - dt * 3);
    }

    /* Spawning. */
    spawnIn.current -= dt;
    if (spawnIn.current <= 0) {
      spawnIn.current = 1.15 + Math.random() * 0.7;
      /* Skip anything already collected, and anything still on screen, so
         the same pickup never appears twice at once. */
      const onScreen = entities.current
        .filter((entity): entity is Extract<Entity, { type: "item" }> => entity.type === "item")
        .map((entity) => entity.kind);
      const remaining = ITEMS.filter(
        (item) => !collectedRef.current.includes(item.kind) && !onScreen.includes(item.kind),
      );
      const wantItem = remaining.length > 0 && Math.random() < 0.6;

      if (wantItem) {
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        const high = Math.random() < 0.5;
        entities.current.push({
          id: nextId.current++,
          type: "item",
          x: STAGE_W + 40,
          y: high ? ITEM_HIGH_Y : ITEM_LOW_Y,
          kind: pick.kind,
          taken: false,
        });
      } else {
        entities.current.push({ id: nextId.current++, type: "obstacle", x: STAGE_W + 40 });
      }
    }

    /* Movement and collision. */
    const feetY = GROUND - lift.current;
    const marlaLeft = MARLA_X + 18;
    const marlaRight = MARLA_X + 112;
    const marlaTop = feetY - 80;

    for (const entity of entities.current) {
      entity.x -= SPEED * dt;

      if (entity.type === "obstacle") {
        const overlapX = entity.x < marlaRight && entity.x + OBSTACLE_W > marlaLeft;
        const overlapY = feetY > GROUND - OBSTACLE_H;
        if (overlapX && overlapY && stumble.current === 0) {
          stumble.current = 1;
        }
      } else if (!entity.taken) {
        const overlapX = entity.x < marlaRight && entity.x + ITEM_SIZE > marlaLeft;
        const overlapY = entity.y < feetY && entity.y + ITEM_SIZE > marlaTop;
        if (overlapX && overlapY) {
          entity.taken = true;
          collectedRef.current = [...collectedRef.current, entity.kind];
          setCollected(collectedRef.current);
          const found = ITEMS.find((item) => item.kind === entity.kind);
          if (found) {
            showCaption(found.label);
          }
        }
      }
    }

    entities.current = entities.current.filter(
      (entity) => entity.x > -80 && (entity.type === "obstacle" || !entity.taken),
    );
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === " " || event.key === "Enter" || event.key === "ArrowUp") {
      event.preventDefault();
      start();
    }
  };

  const feetY = GROUND - lift.current;
  const marlaY = feetY - MARLA_FOOT_OFFSET;
  const bagFull = collected.length === ITEMS.length;

  return (
    <div
      ref={stageRef}
      role="application"
      aria-label="Marla the labrador runs and collects things. Press space or tap to make her jump."
      tabIndex={0}
      onKeyDown={onKeyDown}
      /* No preventDefault and no touch-none: a finger dragging across the
         hero must still scroll the page. A tap alone does not scroll. */
      onPointerDown={start}
      className="relative h-full w-full cursor-pointer select-none rounded-xl outline-none focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-ink-faint"
    >
      <svg
        viewBox={narrow ? "30 30 540 270" : `0 0 ${STAGE_W} ${STAGE_H}`}
        className="h-full w-full"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={GROUND}
          x2={STAGE_W}
          y2={GROUND}
          className="stroke-ink-faint"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {!reduced
          ? entities.current.map((entity) =>
              entity.type === "obstacle" ? (
                <rect
                  key={entity.id}
                  x={entity.x}
                  y={GROUND - OBSTACLE_H}
                  width={OBSTACLE_W}
                  height={OBSTACLE_H}
                  rx="6"
                  className="fill-surface stroke-ink-faint"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
              ) : (
                <g key={entity.id} transform={`translate(${entity.x} ${entity.y})`}>
                  <ItemIcon kind={entity.kind} />
                </g>
              ),
            )
          : null}

        <g transform={`translate(${MARLA_X} ${marlaY}) scale(${MARLA_SCALE})`}>
          <Marla
            phase={runPhase.current}
            airborne={lift.current > 4}
            tilt={stumble.current * -7}
            pack
          />
        </g>
      </svg>

      {/* Marla's bag, and what is in it so far. */}
      <div className="pointer-events-none absolute left-0 top-0 flex items-center gap-2">
        <span className="label">marla&rsquo;s bag</span>
        <span className="flex gap-1">
          {ITEMS.map((item) => (
            <span
              key={item.kind}
              className={`h-1.5 w-5 rounded-full ${
                collected.includes(item.kind) ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4">
        <span className="label">
          {reduced
            ? "marla is sitting this one out, motion is turned down"
            : phase === "idle"
              ? "tap, or press space, to make marla jump"
              : bagFull
                ? "her bag is full. good dog."
                : caption
                  ? `picked up: ${caption}`
                  : touch
                    ? "tap to jump"
                    : "space to jump"}
        </span>
      </div>
    </div>
  );
}
