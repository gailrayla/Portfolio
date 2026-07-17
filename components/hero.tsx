"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NameCanvas from "@/components/name-canvas";

gsap.registerPlugin(useGSAP);

/*
 * Module-scope, so it resets on every full page load (the intro replays on
 * reload, like lokasasmita.com) but survives client-side route changes (no
 * replay when navigating back home from /about). Set on completion rather
 * than start so React strict-mode's double effect run can't skip the intro.
 */
let introPlayedThisLoad = false;

/**
 * The signature moment, once per page load: a counter runs 0→100 while a
 * progress rule draws; the loader wipes away into the hero's construction
 * drawing — annotation lines and type labels — which retracts as the designed
 * hero settles and the wordmark assembles from particles. Killed entirely
 * under prefers-reduced-motion.
 */
export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [nameActive, setNameActive] = useState(false);
  const [scatterIn, setScatterIn] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setShowPreloader(false);
        gsap.set(".hero-copy", { visibility: "visible" });
        gsap.set(".anno", { autoAlpha: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-copy", { visibility: "visible" });

        if (introPlayedThisLoad) {
          setShowPreloader(false);
          setScatterIn(false);
          setNameActive(true);
          gsap.set(".anno", { autoAlpha: 0 });
          return;
        }

        gsap.set(".hero-item", { autoAlpha: 0, y: 12 });
        gsap.set(".anno", { autoAlpha: 1 });
        gsap.set(".anno-line", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".anno-line-v", { scaleY: 0, transformOrigin: "center top" });
        gsap.set(".anno-label", { autoAlpha: 0 });

        const progress = { value: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            introPlayedThisLoad = true;
            setShowPreloader(false);
          },
        });

        tl.to(progress, {
          value: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
            }
          },
        })
          .to(".preloader-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
          .to(".preloader-count", { yPercent: -50, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, "-=0.05")
          .to(".preloader", { yPercent: -100, duration: 0.55, ease: "power3.inOut" }, "-=0.05")
          .addLabel("draw", "-=0.25")
          .to(".anno-line", { scaleX: 1, duration: 0.35, stagger: 0.06 }, "draw")
          .to(".anno-line-v", { scaleY: 1, duration: 0.35 }, "draw")
          .to(".anno-label", { autoAlpha: 1, duration: 0.25, stagger: 0.05 }, "draw+=0.15")
          .addLabel("settle", "draw+=0.4")
          .to(".hero-item", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "settle")
          .call(() => setNameActive(true), undefined, "settle")
          .addLabel("retract", "settle+=0.5")
          .to(".anno-label", { autoAlpha: 0, duration: 0.2 }, "retract")
          .to(
            ".anno-line",
            { scaleX: 0, transformOrigin: "right center", duration: 0.35, stagger: 0.04 },
            "retract+=0.05",
          )
          .to(".anno-line-v", { scaleY: 0, duration: 0.35 }, "retract+=0.05");
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative">
      {showPreloader ? (
        <div className="preloader fixed inset-0 z-50 bg-paper">
          <span className="label absolute bottom-8 left-4 sm:bottom-10 sm:left-6">
            gailparayno.com
          </span>
          <span
            ref={counterRef}
            className="preloader-count absolute bottom-6 right-4 font-label text-[clamp(3.5rem,9vw,6.5rem)] leading-none sm:bottom-8 sm:right-6"
          >
            000
          </span>
          <span
            aria-hidden="true"
            className="preloader-bar absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent"
          />
        </div>
      ) : null}

      <div className="hero-copy flex min-h-[calc(100svh-7rem)] flex-col justify-between gap-16 px-4 pb-2 pt-10 sm:px-6 sm:pt-16">
        <div className="relative grid gap-8 sm:grid-cols-2">
          <span aria-hidden="true" className="anno anno-label label absolute -top-6 left-0">
            fig. 01 / hero
          </span>
          <span
            aria-hidden="true"
            className="anno anno-line-v absolute -left-3 top-0 hidden h-full w-px bg-ink/20 lg:block"
          />
          <h1 className="hero-item max-w-md font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            Software engineer, frontend focused.
          </h1>
          <p className="hero-item max-w-md leading-relaxed text-ink-muted sm:justify-self-end">
            I design interfaces and write the code that ships them. Type, layout, and motion are
            decided by the same hands that build the production frontend.
          </p>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="anno anno-line absolute -top-5 left-0 h-px w-full bg-ink/25"
          />
          <span
            aria-hidden="true"
            className="anno anno-label label absolute -top-10 right-0 hidden sm:block"
          >
            wordmark / canvas / cursor-reactive
          </span>
          <div className="hero-item">
            <NameCanvas text="gail parayno" start={nameActive} scatter={scatterIn} />
          </div>
        </div>
      </div>

      {/* Color block under the name — the "floor" the wordmark sits on. */}
      <div className="flex h-[28vh] items-center justify-center bg-card-yellow sm:h-[34vh]">
        <span aria-hidden="true" className="spin-slow font-display text-5xl text-accent sm:text-7xl">
          ✳
        </span>
      </div>
    </section>
  );
}
