"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { CaseStudy, CaseStudyTone } from "@/lib/content";

gsap.registerPlugin(useGSAP);

const toneCard: Record<CaseStudyTone, string> = {
  yellow: "bg-card-yellow text-accent",
  pink: "bg-card-pink text-card-berry",
  berry: "bg-card-berry text-white",
};

const toneMuted: Record<CaseStudyTone, string> = {
  yellow: "text-accent/80",
  pink: "text-card-berry/80",
  berry: "text-white/85",
};

const tonePill: Record<CaseStudyTone, string> = {
  yellow: "bg-white/80 text-accent",
  pink: "bg-white/70 text-card-berry",
  berry: "bg-white/20 text-white",
};

/**
 * Stacked work cards: each card sits sticky below the header while the next
 * one scrolls up over it; the covered card eases back in scale. The stack is
 * plain CSS sticky, so it works — minus the scale motion — without JS and
 * under prefers-reduced-motion.
 */
export default function WorkCards({ studies }: { studies: CaseStudy[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          const inner = card.querySelector(".work-card-inner");
          if (!next || !inner) {
            return;
          }
          gsap.to(inner, {
            scale: 0.94,
            rotation: index % 2 === 0 ? -0.6 : 0.6,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col gap-8">
      {studies.map((study, index) => (
        <div
          key={study.slug}
          className="work-card sticky"
          style={{ top: `calc(10vh + ${index * 1.75}rem)` }}
        >
          <article
            className={`work-card-inner rounded-3xl p-6 sm:p-10 ${toneCard[study.tone]}`}
          >
            <header className="flex items-start justify-between gap-4 sm:gap-6">
              <h3 className="min-w-0 break-words font-display text-[clamp(2.5rem,9vw,9rem)] font-semibold leading-[0.95] tracking-tight">
                <Link
                  href={`/work/${study.slug}`}
                  className="transition-opacity hover:opacity-70"
                >
                  {study.title}
                </Link>
              </h3>
              <span className="mt-2 shrink-0 font-display text-[clamp(1.125rem,3.5vw,3.25rem)] font-semibold leading-none tracking-tight sm:mt-3">
                ({String(index + 1).padStart(2, "0")})
              </span>
            </header>

            <div
              className={
                study.image
                  ? "mt-8 grid gap-8 sm:mt-12 md:grid-cols-2 md:items-start lg:gap-12"
                  : "mt-8 sm:mt-12"
              }
            >
              <div>
                <p className={`max-w-xl text-lg leading-relaxed sm:text-xl ${toneMuted[study.tone]}`}>
                  {study.summary}
                </p>

                {study.stack ? (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <li
                        key={tech}
                        className={`stack-pill rounded-full px-4 py-2 font-label text-xs tracking-wide ${tonePill[study.tone]}`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className={`label mt-8 ${toneMuted[study.tone]}`}>
                  {study.kind} · {study.role}
                </p>
                {!study.image && study.note ? (
                  <p className={`label mt-2 normal-case ${toneMuted[study.tone]}`}>{study.note}</p>
                ) : null}
                <Link
                  href={`/work/${study.slug}`}
                  className="mt-4 inline-block font-display text-lg font-medium underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current"
                >
                  Read the case study →
                </Link>
              </div>

              {study.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 md:mt-6">
                  <Image
                    src={study.image.src}
                    alt={study.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : null}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
