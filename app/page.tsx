import Link from "next/link";
import Hero from "@/components/hero";
import Reveal from "@/components/reveal";
import WorkCards from "@/components/work-cards";
import { caseStudies } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="work" aria-labelledby="work-heading" className="border-b border-line">
        <div className="px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="label">fig. 02 / selected work</p>
            <h2 id="work-heading" className="mt-4 font-display text-display-lg font-semibold tracking-tight">
              Selected work
            </h2>
          </Reveal>

          <div className="mt-12">
            <WorkCards studies={caseStudies} />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <Reveal>
            <p className="label">fig. 03 / about</p>
            <h2 id="about-heading" className="mt-4 font-display text-display-lg font-semibold tracking-tight">
              Both halves, one person
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              I hold a dual bachelor&rsquo;s in Computer Science Engineering and Design (cum laude,
              UNIST), and I ship production Angular and Rails at an AdTech SaaS company with a team
              in Sweden. The design decisions and the engineering decisions on this site were made
              by the same person.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block font-display font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              More about how I work
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
