import type { Metadata } from "next";
import Link from "next/link";
import { cvPath, email } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Frontend engineer with a dual bachelor's in Computer Science Engineering and Design (UNIST, cum laude), shipping production Angular and Rails at an AdTech SaaS company.",
};

export default function AboutPage() {
  return (
    <main>
      <article className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link href="/" className="label transition-colors hover:text-ink">
          ← Home
        </Link>
        <p className="label mt-10">About</p>
        <h1 className="mt-4 max-w-3xl font-display text-display-lg font-semibold tracking-tight">
          Trained in both halves of the work.
        </h1>

        <div className="mt-12 max-w-2xl space-y-12">
          <section>
            <h2 className="label">The degree</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              I hold a <strong className="font-semibold text-ink">dual bachelor&rsquo;s degree in Computer Science Engineering and Design</strong> from
              UNIST, one of South Korea&rsquo;s leading science and technology universities, <strong className="font-semibold text-ink">cum
              laude</strong>. That combination is the premise of everything on this site: most
              engineers who care about design taught themselves the second half, and most designers
              who code taught themselves the first. I was formally trained in both, at the same
              time, and graduated with honours in the pairing.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              In practice it means <strong className="font-semibold text-ink">the handoff most teams struggle with doesn&rsquo;t exist in my
              work</strong>. The person choosing the type scale and the person writing the component are the
              same person, and each decision is made knowing what it costs the other side.
            </p>
          </section>

          <section>
            <h2 className="label">The day job</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              I&rsquo;m a <strong className="font-semibold text-ink">frontend engineer at Burt Intelligence</strong>, an AdTech SaaS company: production
              Angular on the frontend, Ruby on Rails behind it. I&rsquo;m based in the Philippines
              and work <strong className="font-semibold text-ink">3 pm to midnight to share my team&rsquo;s working day in Sweden</strong>, so
              collaboration happens live. Distance still rewards a particular discipline: write
              clearly, scope changes well, and make the pull request carry the context a hallway
              chat would have.
            </p>
            <p className="mt-4 leading-relaxed text-ink-muted">
              The title says frontend; <strong className="font-semibold text-ink">the work does not stay in its lane</strong>. I own changes <strong className="font-semibold text-ink">end to
              end</strong>, from the Rails models to the Angular views that render them.
            </p>
          </section>

          <section>
            <h2 className="label">Across cultures</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              I&rsquo;m used to being the person from somewhere else. I studied as an <strong className="font-semibold text-ink">international
              student in South Korea</strong>, interned with a <strong className="font-semibold text-ink">US startup</strong>, and now ship with a <strong className="font-semibold text-ink">Swedish team
              from the Philippines</strong>. Different norms, different communication styles, same job:
              understand the people you build with, then build.
            </p>
          </section>

          <section>
            <h2 className="label">How I work</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              I like small, deliberate systems: two typefaces doing two jobs, tokens instead of
              one-off values, motion that argues for something instead of decorating it. This site
              is <strong className="font-semibold text-ink">built the way I build client work</strong>: semantic markup, visible focus states, reduced
              motion respected, metadata that actually works. View source; that&rsquo;s the pitch.
            </p>
          </section>

          <section>
            <h2 className="label">Elsewhere</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              The full history is in the CV: internships across VR research, service design, and
              full-stack engineering at a US startup.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={cvPath}
                download
                className="font-display font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                Download CV (PDF)
              </a>
              <a
                href={`mailto:${email}`}
                className="font-display font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {email}
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
