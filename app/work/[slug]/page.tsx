import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkDiagram from "@/components/work-diagrams";
import { getWork, work } from "@/lib/content";

/** Renders `**bold**` spans in content paragraphs as emphasized text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWork(slug);

  if (!item) {
    notFound();
  }

  const index = work.findIndex((entry) => entry.slug === item.slug);
  const next = work[(index + 1) % work.length];

  return (
    <main id="main">
      <article className="shell py-10 sm:py-14">
        {/* Cover: the imagery first, the way the card promised it. */}
        <div
          className={`relative w-full overflow-hidden rounded-2xl bg-surface ${
            item.thumb ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          {item.thumb ? (
            <Image
              src={item.thumb.src}
              alt={item.thumb.alt}
              fill
              priority
              sizes="(min-width: 1088px) 68rem, 100vw"
              className="object-cover object-top"
            />
          ) : item.diagram ? (
            <WorkDiagram variant={item.diagram} />
          ) : null}
        </div>
        {/* The note explains the absence of screenshots; it belongs under the
            drawing, not inside the frame where it reads as a caption. */}
        {item.note ? <p className="label mt-3 text-center">{item.note}</p> : null}

        <header className="mx-auto mt-12 max-w-[62ch] text-center">
          <h1 className="font-sans text-display font-medium tracking-tight">{item.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{item.summary}</p>
          {item.liveUrl ? (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-xs text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              visit the live site &rarr;
            </a>
          ) : null}
        </header>

        <dl className="mt-14 grid gap-8 border-y border-line-faint py-8 sm:grid-cols-2 lg:grid-cols-4">
          {item.meta.map((entry) => (
            <div key={entry.label}>
              <dt className="label">{entry.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{entry.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-14 max-w-[62ch]">
          {item.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="label">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink-muted">
                  <RichText text={paragraph} />
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="mt-6 flex items-baseline justify-between gap-6 border-t border-line-faint pt-8">
          <Link href="/#work" className="label transition-colors hover:text-accent">
            &larr; all work
          </Link>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <span className="label">next</span>
            <span className="mt-1 block font-sans text-title font-medium tracking-tight transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </footer>
      </article>
    </main>
  );
}
