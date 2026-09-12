import Hero from "@/components/hero";
import Reveal from "@/components/reveal";
import WorkGrid from "@/components/work-grid";
import { work } from "@/lib/content";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <section id="work" aria-labelledby="work-heading" className="shell pb-8">
        <Reveal>
          <h2 id="work-heading" className="label mb-8">
            work
          </h2>
        </Reveal>
        <WorkGrid items={work} />
      </section>
    </main>
  );
}
