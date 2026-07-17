"use client";

import { useEffect, useRef } from "react";

type Particle = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type NameCanvasProps = {
  text: string;
  /** Begin particle rendering (fired when the intro timeline reaches its settle beat). */
  start: boolean;
  /** Fly particles in from scatter on first assembly; false on repeat visits. */
  scatter: boolean;
};

const SPRING = 0.06;
const FRICTION = 0.8;
const POINTER_RADIUS = 100;
const POINTER_FORCE = 5;

/**
 * The wordmark as a cursor-reactive particle field, canvas 2D only — no WebGL,
 * no three.js. The visible <span> is the no-JS / reduced-motion fallback and
 * doubles as the layout sizer; the canvas replaces it once particles are live.
 */
export default function NameCanvas({ text, start, scatter }: NameCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) {
      return;
    }
    const wrap = wrapRef.current;
    const sizer = sizerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !sizer || !canvas) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    startedRef.current = true;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dot = 3;
    let raf = 0;
    let disposed = false;
    const pointer = { x: -1e5, y: -1e5 };
    const rootStyle = getComputedStyle(document.documentElement);
    const ink = rootStyle.getPropertyValue("--color-ink").trim() || "#171717";
    const fontFamily = getComputedStyle(sizer).fontFamily;

    const build = (fromScatter: boolean): void => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) {
        return;
      }

      let fontPx = 100;
      octx.font = `700 ${fontPx}px ${fontFamily}`;
      fontPx = (fontPx * width * 0.99) / octx.measureText(text).width;
      octx.font = `700 ${fontPx}px ${fontFamily}`;
      const metrics = octx.measureText(text);
      const baseline =
        (height + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
      octx.fillText(text, (width - metrics.width) / 2, baseline);

      const step = Math.max(2, Math.round(3 * dpr));
      dot = step;
      const data = octx.getImageData(0, 0, width, height).data;
      particles = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            particles.push({
              hx: x,
              hy: y,
              x: fromScatter ? x + (Math.random() - 0.5) * width * 0.4 : x,
              y: fromScatter ? y + (Math.random() - 0.5) * height * 3 : y,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const tick = (): void => {
      if (disposed) {
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      const radius = POINTER_RADIUS * dpr;
      const radius2 = radius * radius;
      for (const p of particles) {
        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < radius2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = ((radius - d) / radius) * POINTER_FORCE * dpr;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, dot, dot);
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) * (width / rect.width);
      pointer.y = (event.clientY - rect.top) * (height / rect.height);
    };
    const onPointerOut = (): void => {
      pointer.x = -1e5;
      pointer.y = -1e5;
    };

    const observer = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect();
      if (Math.round(rect.width * dpr) !== width) {
        build(false);
      }
    });

    document.fonts.ready.then(() => {
      if (disposed) {
        return;
      }
      build(scatter);
      sizer.style.visibility = "hidden";
      canvas.style.opacity = "1";
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerout", onPointerOut);
      observer.observe(wrap);
      tick();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      observer.disconnect();
    };
  }, [start, scatter, text]);

  return (
    <div ref={wrapRef} role="img" aria-label={text} className="relative w-full select-none">
      <span
        ref={sizerRef}
        aria-hidden="true"
        className="block whitespace-nowrap text-center font-display text-[12.5vw] font-bold leading-[1.08] tracking-tight"
      >
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-0" />
    </div>
  );
}
