"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroPlay from "@/components/hero-play";
import { ScribbleArrow } from "@/components/icons";
import { profile } from "@/lib/content";

gsap.registerPlugin(useGSAP);

/**
 * The hero: an interactive stage up top with a handwritten note pointing
 * into it, then the introduction: name, what I do, and the three facts
 * that back it up. Copy fades up once on load; killed under reduced motion.
 */
export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-item", {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
        });
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="shell pb-16 pt-6 sm:pb-24">
      <div className="relative">
        {/* The margin note and its arrow point into the interactive stage. */}
        <div className="pointer-events-none absolute right-0 top-4 z-10 hidden w-64 lg:block">
          <p className="note text-right">
            that is marla. help her fill her bag
          </p>
          <ScribbleArrow className="ml-auto mr-10 mt-1 h-16 w-20 text-ink-faint" />
        </div>

        <div className="h-[40vh] min-h-[260px] w-full sm:h-[46vh]">
          <HeroPlay />
        </div>
      </div>

      <div className="mt-10 sm:mt-14">
        <p className="hero-item font-mono text-xs text-ink-faint">Hi! I&rsquo;m</p>
        <h1 className="hero-item mt-3 font-sans text-hero font-medium leading-[1.02] tracking-tight">
          {profile.name}
        </h1>
        <p className="hero-item mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {profile.tagline}
        </p>
        {/* Separators trail their item so a wrapped line never opens on a dot. */}
        <p className="hero-item label mt-7 flex flex-wrap items-center gap-x-2 gap-y-1">
          {profile.credentials.map((item, index) => (
            <span key={item}>
              {item}
              {index < profile.credentials.length - 1 ? (
                <span className="ml-2 text-line">&middot;</span>
              ) : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
