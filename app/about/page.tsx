import type { Metadata } from "next";
import Image from "next/image";
import { cvPath, email, linkedinUrl, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer with a dual bachelor's in Computer Science Engineering and Design (UNIST, cum laude), shipping full-stack product at an AdTech platform and for clients.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <article className="shell py-14 sm:py-20">
        <h1 className="font-sans text-display font-medium tracking-tight">about</h1>

        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.disciplines.map((discipline) => (
            <li key={discipline} className="tag">
              {discipline}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="max-w-[60ch] space-y-6 leading-relaxed text-ink-muted">
            <p>
              I hold a{" "}
              <strong className="font-medium text-ink">
                dual bachelor&rsquo;s in Computer Science Engineering and Design
              </strong>{" "}
              from UNIST in South Korea, cum laude. Most engineers who care about design taught
              themselves the second half, and most designers who code taught themselves the first.
              I was trained in both at the same time, which is the whole reason I work the way I do.
            </p>
            <p>
              What that turns into day to day is{" "}
              <strong className="font-medium text-ink">owning a feature end to end</strong>. At{" "}
              <strong className="font-medium text-ink">Burt Intelligence</strong> that means an
              Angular frontend, a Ruby on Rails API, and the analytics data layer underneath, for a
              platform enterprise media clients read real numbers off. Before that, a year at a US
              startup building a Next.js portal from zero and refactoring a legacy codebase into
              NestJS services. The handoff most teams lose time to just isn&rsquo;t in my way.
            </p>
            <p>
              I&rsquo;ve also spent time on the research side, at UNIST&rsquo;s{" "}
              <strong className="font-medium text-ink">
                Human-AI Interaction and Visualization Lab
              </strong>
              , classifying how language models fail at code and synthesising developer surveys into
              findings that were published. Same instinct as the rest of the work: understand the
              people using the thing before deciding what to build.
            </p>
            <p>
              I pick up new tooling quickly, and I am deliberate about why. I bring{" "}
              <strong className="font-medium text-ink">agentic AI and new workflows</strong> into
              how I work because they buy time back, and{" "}
              <strong className="font-medium text-ink">the time is the point</strong>: less of it
              spent on the repetitive middle of a task, more of it spent on the product decisions
              that actually need a person. Efficiency for its own sake is just a different way to
              be busy.
            </p>
            <p>
              I&rsquo;m used to being the person from somewhere else: an international student
              in South Korea, remote with a startup in Washington, and now shipping from the
              Philippines with a team in Gothenburg on a{" "}
              <strong className="font-medium text-ink">3 pm to midnight</strong> day so we overlap.
              Different norms, different communication styles, same job.
            </p>
            <p>
              Off the clock I am almost certainly holding a coffee, shooting film, or somewhere
              on my own with both. Solo travel has given me one genuinely useless talent: I am
              very good at guessing whether the stranger I just handed my phone to is about to
              run off with it. Still undefeated.
            </p>
            <p>
              Say hi anytime, at{" "}
              <a
                href={`mailto:${email}`}
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {email}
              </a>{" "}
              or on{" "}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                LinkedIn
              </a>
              . The full history is in the{" "}
              <a
                href={cvPath}
                download
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                CV
              </a>
              .
            </p>
          </div>

          <div className="lg:pt-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface">
              <Image
                src="/portrait.jpg"
                alt="Gail Parayno at her UNIST graduation in Ulsan, in the red gown and cap, holding her diploma and two bouquets"
                fill
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="label mt-3">graduation day, unist</p>
          </div>
        </div>
      </article>
    </main>
  );
}
