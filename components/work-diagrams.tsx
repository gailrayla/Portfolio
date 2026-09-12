import type { DiagramKey } from "@/lib/content";

/*
 * Drawn stand-ins for the projects that have no screenshot to show: Burt and
 * ReplyIntelligence live behind auth, and the research was never a screen.
 *
 * These are inline SVG rather than files in /public for two reasons: they
 * inherit the site's typefaces, and their colours are palette tokens, so
 * when the palette changes they change with it.
 *
 * Each one draws a real decision from the work, never invented data.
 */

const VIEW_BOX = "0 0 800 500";

/** Burt: one change crossing every layer of the platform. */
function StackDiagram() {
  const layers = [
    { y: 118, label: "Angular client" },
    { y: 222, label: "Ruby on Rails API" },
    { y: 326, label: "analytics data layer" },
  ];

  return (
    <svg viewBox={VIEW_BOX} className="h-full w-full" role="img" aria-label="Diagram: a single change crossing the Angular client, the Ruby on Rails API, and the analytics data layer">
      <text x="56" y="64" className="font-mono fill-ink-faint" fontSize="17">
        one change, end to end
      </text>

      {/* The thread running through every layer. */}
      <path d="M132 118 V 402" className="stroke-accent" strokeWidth="2" fill="none" />
      <path d="M124 392 l8 12 l8 -12" className="stroke-accent" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {layers.map((layer) => (
        <g key={layer.label}>
          <path d={`M132 ${layer.y + 38} H 190`} className="stroke-accent" strokeWidth="2" />
          <rect
            x="190"
            y={layer.y}
            width="452"
            height="76"
            rx="10"
            className="fill-paper stroke-ink-faint" strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <text
            x="216"
            y={layer.y + 46}
            className="font-sans fill-ink"
            fontSize="23"
          >
            {layer.label}
          </text>
        </g>
      ))}

      <text x="190" y="446" className="font-mono fill-ink-faint" fontSize="17">
        85+ shipped changes
      </text>
    </svg>
  );
}

/** O.M Farm: the read and write paths split into separate services. */
function SplitDiagram() {
  return (
    <svg viewBox={VIEW_BOX} className="h-full w-full" role="img" aria-label="Diagram: a Next.js portal splitting into an article read service and an agreement write service, both backed by GraphQL, PostgreSQL and Google Cloud">
      <text x="48" y="60" className="font-mono fill-ink-faint" fontSize="17">
        read and write, split on purpose
      </text>

      <rect x="48" y="204" width="184" height="92" rx="10" className="fill-paper stroke-ink-faint" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="72" y="245" className="font-sans fill-ink" fontSize="21">
        O.M Farm
      </text>
      <text x="72" y="272" className="font-mono fill-ink-faint" fontSize="15">
        next.js portal
      </text>

      {/* The split itself is the point, so it carries the accent. */}
      <path d="M232 250 C 272 250, 272 176, 312 176" className="stroke-accent" strokeWidth="2" fill="none" />
      <path d="M232 250 C 272 250, 272 324, 312 324" className="stroke-accent" strokeWidth="2" fill="none" />

      <rect x="312" y="140" width="236" height="72" rx="10" className="fill-paper stroke-ink-faint" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="336" y="174" className="font-sans fill-ink" fontSize="20">
        article service
      </text>
      <text x="336" y="196" className="font-mono fill-ink-faint" fontSize="15">
        read
      </text>

      <rect x="312" y="288" width="236" height="72" rx="10" className="fill-paper stroke-ink-faint" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="336" y="322" className="font-sans fill-ink" fontSize="20">
        agreement service
      </text>
      <text x="336" y="344" className="font-mono fill-ink-faint" fontSize="15">
        write
      </text>

      <path d="M548 176 C 588 176, 588 250, 620 250" className="stroke-ink-faint" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
      <path d="M548 324 C 588 324, 588 250, 620 250" className="stroke-ink-faint" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />

      <rect x="620" y="186" width="140" height="128" rx="10" className="fill-paper stroke-ink-faint" strokeOpacity="0.35" strokeWidth="1.5" />
      {["GraphQL", "PostgreSQL", "Google Cloud"].map((label, index) => (
        <text
          key={label}
          x="644"
          y={224 + index * 32}
          className="font-mono fill-ink-muted"
          fontSize="15"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/** HAIV Lab: the four buckets a single benchmark score collapses into one. */
function TaxonomyDiagram() {
  const buckets = [
    { y: 96, label: "bugs" },
    { y: 172, label: "feature requests" },
    { y: 248, label: "removals" },
    { y: 324, label: "security issues", accent: true },
  ];

  return (
    <svg viewBox={VIEW_BOX} className="h-full w-full" role="img" aria-label="Diagram: SWE-Bench code generation failures sorted into bugs, feature requests, removals and security issues">
      <text x="48" y="56" className="font-mono fill-ink-faint" fontSize="17">
        what one benchmark score hides
      </text>

      <rect x="48" y="196" width="214" height="104" rx="10" className="fill-paper stroke-ink-faint" strokeOpacity="0.35" strokeWidth="1.5" />
      <text x="72" y="238" className="font-sans fill-ink" fontSize="21">
        SWE-Bench
      </text>
      <text x="72" y="266" className="font-mono fill-ink-faint" fontSize="15">
        llm code generation
      </text>

      {buckets.map((bucket) => (
        <g key={bucket.label}>
          <path
            d={`M262 248 C 320 248, 320 ${bucket.y + 28}, 380 ${bucket.y + 28}`}
            className={bucket.accent ? "stroke-accent" : "stroke-ink-faint"}
            strokeOpacity={bucket.accent ? 1 : 0.5}
            strokeWidth={bucket.accent ? 2 : 1.5}
            fill="none"
          />
          <rect
            x="380"
            y={bucket.y}
            width="300"
            height="56"
            rx="28"
            className={`fill-paper ${bucket.accent ? "stroke-accent" : "stroke-ink-faint"}`}
            strokeOpacity={bucket.accent ? 1 : 0.35}
            strokeWidth="1.5"
          />
          <text
            x="410"
            y={bucket.y + 35}
            className={`font-sans ${bucket.accent ? "fill-accent" : "fill-ink"}`}
            fontSize="20"
          >
            {bucket.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const diagrams: Record<DiagramKey, () => React.JSX.Element> = {
  stack: StackDiagram,
  split: SplitDiagram,
  taxonomy: TaxonomyDiagram,
};

export default function WorkDiagram({ variant }: { variant: DiagramKey }) {
  const Diagram = diagrams[variant];
  return <Diagram />;
}
