import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/content";

/** Renders `**bold**` spans in content paragraphs as emphasized text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const studyIndex = caseStudies.findIndex((entry) => entry.slug === study.slug);
  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length];

  return (
    <main>
      <article className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link
          href="/#work"
          className="label transition-colors hover:text-ink"
        >
          ← Selected work
        </Link>

        <header className="mt-12 border-b border-line pb-12">
          <p className="label">
            fig. {String(studyIndex + 1).padStart(2, "0")} / {study.kind.toLowerCase()}
          </p>
          <h1 className="mt-4 font-display text-display-lg font-semibold tracking-tight">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{study.summary}</p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="label">Client</dt>
              <dd className="mt-1">{study.client}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1">{study.role}</dd>
            </div>
            {study.stack ? (
              <div>
                <dt className="label">Stack</dt>
                <dd className="mt-1">{study.stack.join(" · ")}</dd>
              </div>
            ) : null}
          </dl>

          {study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block font-display font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              Visit the live site
            </a>
          ) : null}

          {study.note ? <p className="label mt-8">{study.note}</p> : null}
        </header>

        {study.metrics ? (
          <section aria-label="Outcomes" className="border-b border-line py-12">
            <dl className="grid gap-8 sm:grid-cols-3">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="font-display text-display-md font-semibold tracking-tight">
                    {metric.value}
                  </dd>
                  <dt className="label mt-2">{metric.label}</dt>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <div className="mt-4 max-w-2xl">
          {study.sections.map((section) => (
            <section key={section.heading} className="py-8">
              <h2 className="label">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink-muted">
                  <RichText text={paragraph} />
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-line pt-10">
          <p className="label">Next</p>
          <Link
            href={`/work/${nextStudy.slug}`}
            className="mt-2 inline-block font-display text-display-md font-semibold tracking-tight underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            {nextStudy.title}
          </Link>
        </footer>
      </article>
    </main>
  );
}
