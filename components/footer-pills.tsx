"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Asterisk from "@/components/asterisk";

gsap.registerPlugin(useGSAP);

const pillBase =
  "footer-pill absolute rounded-full px-7 py-4 font-display text-[clamp(1.125rem,3.2vw,3.5rem)] font-semibold sm:px-16 sm:py-9";

const circleBase =
  "footer-pill absolute flex aspect-square w-[clamp(4.5rem,13vw,12rem)] items-center justify-center rounded-full font-display text-[clamp(1.5rem,4.5vw,4rem)] font-semibold";

/**
 * Decorative pills that drop from the top of the footer card and bounce into
 * a pile on its "floor" — big, overlapping, jazzi-style. Purely visual:
 * hidden from assistive tech, static under reduced motion.
 */
export default function FooterPills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const pills = gsap.utils.toArray<HTMLElement>(".footer-pill");
        gsap.set(pills, { y: -1100 });

        /*
         * One drop, not a parade: everything falls together (tiny random
         * offsets), accelerates like gravity, lands with a single small
         * rebound and settles into the pile. Rotation stays fixed so the
         * pills read as stacked at rest, not spinning.
         */
        const drop = contextSafe?.(() => {
          pills.forEach((pill) => {
            gsap
              .timeline({ delay: gsap.utils.random(0, 0.25) })
              .to(pill, { y: 0, duration: gsap.utils.random(0.55, 0.75), ease: "power2.in" })
              .to(pill, { y: -16, duration: 0.12, ease: "power1.out" })
              .to(pill, { y: 0, duration: 0.16, ease: "power1.in" });
          });
        });

        ScrollTrigger.create({
          trigger: container.current,
          start: "top 70%",
          once: true,
          onEnter: () => drop?.(),
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-32 top-0 select-none sm:bottom-20"
    >
      {/* Piled on the floor, overlapping — nothing floats. */}
      <span className={`${pillBase} bottom-[24%] left-[-4%] rotate-[-32deg] bg-card-yellow text-ink sm:left-[-2%]`}>
        say hiii
      </span>
      <span className={`${pillBase} bottom-[2%] left-[14%] rotate-[-5deg] bg-card-pink text-card-berry`}>
        reach out
      </span>
      <span className={`${pillBase} bottom-[22%] right-[8%] rotate-[9deg] bg-card-berry text-white`}>
        let&rsquo;s chat!
      </span>
      <span className={`${pillBase} bottom-[1%] right-[-4%] rotate-[4deg] bg-card-yellow text-ink sm:right-[-2%]`}>
        open to work
      </span>
      <span className={`${circleBase} bottom-[12%] left-[11%] rotate-[12deg] bg-accent text-white`}>
        <Asterisk className="h-[42%] w-[42%]" />
      </span>
      <span className={`${circleBase} bottom-[34%] right-[10%] rotate-[-10deg] bg-card-pink text-card-berry`}>
        @
      </span>
    </div>
  );
}
