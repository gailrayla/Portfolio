"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkDiagram from "@/components/work-diagrams";
import type { Work } from "@/lib/content";

gsap.registerPlugin(useGSAP);

/**
 * The work index: a two-column grid of cards, each one image, title,
 * status, discipline tags, and a line about what it is. Cards fade up as
 * they arrive; the grid is plain CSS, so it holds without JS.
 */
export default function WorkGrid({ items }: { items: Work[] }) {
  const container = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 22,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <ul ref={container} className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.slug} className="work-card">
          <Link href={`/work/${item.slug}`} className="group block">
            <div className="work-card-thumb relative aspect-[16/10] overflow-hidden rounded-xl bg-surface">
              {item.thumb ? (
                <Image
                  src={item.thumb.src}
                  alt={item.thumb.alt}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="object-cover object-top"
                />
              ) : item.diagram ? (
                /* Nothing to photograph, so the work gets drawn instead. */
                <WorkDiagram variant={item.diagram} />
              ) : null}
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-sans text-title font-medium tracking-tight transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <p className="label shrink-0">
                {item.status} &middot; {item.period}
              </p>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>

            <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-muted">{item.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
