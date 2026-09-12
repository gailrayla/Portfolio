export type MetaItem = {
  label: string;
  value: string;
};

export type WorkSection = {
  heading: string;
  paragraphs: string[];
};

export type WorkImage = {
  src: string;
  alt: string;
};

/** Card status chip. Reads as the project's current state, not its category. */
export type WorkStatus = "in production" | "shipped" | "published" | "prototype";

/** Identifies which diagram stands in for a missing screenshot. */
export type DiagramKey = "stack" | "split" | "taxonomy";

export type Work = {
  slug: string;
  title: string;
  /** One line on the work card. What it is, in plain terms. */
  blurb: string;
  status: WorkStatus;
  /** Right-hand side of the card status line. */
  period: string;
  /** Discipline tags on the card: what kind of work this was. */
  tags: string[];
  thumb?: WorkImage;
  /**
   * Drawn instead of a photo when the product cannot be shown, either behind
   * auth or not a screen at all. Rendered inline so it tracks the palette.
   */
  diagram?: DiagramKey;
  /** Case-study meta grid: timeline / role / team / stack. */
  meta: MetaItem[];
  liveUrl?: string;
  /** Shown when there is no imagery to show, e.g. product behind auth. */
  note?: string;
  /** Case-study deck under the title. */
  summary: string;
  sections: WorkSection[];
};

export const siteUrl = "https://www.gailparayno.com";
export const email = "paraynogail@gmail.com";
export const phoneDisplay = "+63 956 771 3741";
export const phoneHref = "tel:+639567713741";
export const githubUrl = "https://github.com/gailrayla";
export const linkedinUrl = "https://www.linkedin.com/in/gail-parayno-280644247/";
export const cvPath = "/Gail_Parayno_Resume.pdf";

/**
 * The positioning layer. Everything the site says about who Gail is reads
 * from here, so the pitch stays identical across hero, about, and metadata.
 */
export const profile = {
  name: "Gail Parayno",
  /**
   * Hero line. "Software engineer" is the noun on purpose, because it is the title
   * on her CV and the one recruiters search for. The ownership claim rides
   * in the verb phrase, so the pitch widens without narrowing the job title.
   */
  tagline: "a software engineer who designs and ships features end to end",
  /** Hero credential strip, rendered separated by interpuncts. */
  credentials: [
    "software engineer @ burt intelligence",
    "cs engineering + design @ unist, cum laude",
    "based in the philippines",
  ],
  /** About-page discipline tags: how the engineering shows up, not the title. */
  disciplines: ["full-stack engineering", "product engineering", "design engineering"],
  location: "Philippines",
  timeZone: "Asia/Manila",
  timeZoneLabel: "GMT+8",
} as const;

export const work: Work[] = [
  {
    slug: "burt",
    title: "Burt Intelligence",
    blurb:
      "An AdTech reporting platform for enterprise media clients, worked end to end from Angular views to the Rails API and the analytics layer beneath it.",
    status: "in production",
    period: "since 2025",
    tags: ["full-stack", "product engineering", "ai workflows", "platform migration"],
    diagram: "stack",
    note: "The product lives behind auth, so this one is a written record rather than a gallery.",
    meta: [
      { label: "timeline", value: "sep 2025 to present" },
      { label: "role", value: "software engineer" },
      { label: "team", value: "remote from ph, team in gothenburg" },
      { label: "stack", value: "angular · typescript · ruby on rails · postgres · aws" },
    ],
    summary:
      "85+ shipped changes across an advertising analytics platform, from the Angular views down to the Rails API and the data layer behind it.",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Burt Intelligence builds analytics software for the advertising industry: **enterprise media and broadcast clients** reading campaign and revenue data they make real money decisions on. My title is software engineer. In practice the work runs the **full width of the product**, an Angular frontend, a Ruby on Rails API, and the analytics data layer underneath.",
          "I work from the Philippines with a team in Gothenburg, on **3 pm to midnight** so the working day overlaps and collaboration happens live rather than in a queue.",
        ],
      },
      {
        heading: "What I ship",
        paragraphs: [
          "**85+ features and bugfixes** across the stack so far. Not 85 frontend tickets: the work crosses the API boundary whenever the feature does, because a feature is finished when it works end to end, not when one layer of it does.",
        ],
      },
      {
        heading: "Platform upgrade",
        paragraphs: [
          "I took on the cross-cutting rendering regressions from an **Angular v17 to v21 and PrimeNG upgrade of a large monorepo**. That is the class of work with no visible feature at the end of it, and the class that breaks everything if it goes wrong.",
          "That meant **restoring the platform font stack**, **eliminating overlay clipping** across dropdowns and dialogs, and **rebuilding responsive filter layouts with CSS container queries** so they held up at every breakpoint instead of only the ones the old media queries knew about.",
        ],
      },
      {
        heading: "Debugging across the stack",
        paragraphs: [
          "A server error was **blocking enterprise clients from opening shared reports**. I traced the failure from the Angular client through to the Rails API and **restored access for affected accounts the same day**.",
          "Owning both ends is what made that possible. There was no handoff to wait on, because the person reading the stack trace was the person who could fix either side of it.",
        ],
      },
      {
        heading: "Agentic workflows",
        paragraphs: [
          "I **help bring agentic AI into how the team ships**, inside the existing workflow rather than alongside it: same repo, same review, same release process.",
          "The hard part was never getting a model to produce code. It is getting it to produce code **the way this team writes code**. A large Angular and Rails codebase carries years of accumulated convention, and a tool that ignores that generates work which passes tests and still fails review.",
          "So most of the work is **encoding what we already know**: turning our conventions, patterns, and review standards into reusable skills and instructions an agent reads before it touches anything. **The standards stay ours.** The agent has to meet them, not redefine them.",
        ],
      },
    ],
  },
  {
    slug: "om-farm",
    title: "O.M Farm",
    blurb:
      "Two full-stack products for a US startup: a Next.js portal built from scratch, and a legacy codebase refactored into NestJS services.",
    status: "shipped",
    period: "2024",
    tags: ["full-stack", "product engineering", "service architecture"],
    diagram: "split",
    note: "The portal ships behind a client login, so this is its architecture rather than its screens.",
    meta: [
      { label: "timeline", value: "jan 2024 to dec 2024" },
      { label: "role", value: "junior software engineer" },
      { label: "team", value: "remote from ph, startup in washington, usa" },
      { label: "stack", value: "react · next.js · nestjs · graphql · postgres · firebase · gcp" },
    ],
    summary:
      "A year at a US startup building product across the stack: a portal from zero, a legacy refactor, and 30+ features in between.",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "O.M Farm is a **startup in Washington, USA**; I worked remotely from the Philippines as a junior software engineer. Startup scope means the work is whatever the product needs that quarter, which over a year meant **two distinct products and the ordinary feature work around them**.",
        ],
      },
      {
        heading: "Feature work",
        paragraphs: [
          "**30+ React and TypeScript features and components** for a full-stack product, turning **Figma designs into responsive interfaces** backed by PostgreSQL and Firebase.",
          "This is the part of the job that the design half of my degree earns its keep on: I can read a Figma file for what it actually specifies, notice where it breaks at a real breakpoint, and **resolve it without a round trip**.",
        ],
      },
      {
        heading: "Portal architecture",
        paragraphs: [
          "I built the **O.M Farm Portal (om.farm)** in React and Next.js. The design decision I'd point at: **separating read and write paths into independent article and agreement services**, backed by GraphQL and PostgreSQL on Google Cloud.",
          "Splitting them meant the read path could be optimised for the thing it actually does, serving content fast, without dragging the write path's constraints along with it. Either side could then change without putting the other at risk.",
        ],
      },
      {
        heading: "Legacy refactor",
        paragraphs: [
          "For **ReplyIntelligence (app.replyintelligence.com)** I refactored a **legacy codebase into NestJS services**, then shipped full-stack features on top of the result across React, Firebase, PostgreSQL, and Google Cloud Functions.",
          "Refactoring is the least glamorous item on any list, and the one that tells you the most about whether someone can hold a whole system in their head. **You cannot restructure code you only half understand.**",
        ],
      },
    ],
  },
  {
    slug: "byrachel",
    title: "ByRachel",
    blurb:
      "A site for an Australian marketing studio, designed and built solo. The second project out of one word-of-mouth client relationship.",
    status: "shipped",
    period: "2026",
    tags: ["design engineering", "brand + web", "seo + accessibility"],
    thumb: {
      src: "/byrachel-site.png",
      alt: "ByRachel website hero for the branding and web design studio",
    },
    liveUrl: "https://www.byrachel.com.au/",
    meta: [
      { label: "timeline", value: "february 2026" },
      { label: "role", value: "design and build, solo" },
      { label: "client", value: "byrachel · marketing studio, au" },
      { label: "stack", value: "angular · typescript · scss · vercel" },
    ],
    summary:
      "A site for an Australian marketing studio serving small businesses and startups, built solo from direction to deployment.",
    sections: [
      {
        heading: "How it happened",
        paragraphs: [
          "ByRachel **came by referral**. The studio's owner and TrustyCo's owner know each other, and the TrustyCo build led directly to this one. For freelance work that referral is the whole scoreboard: **the first project was good enough that it produced the second**.",
        ],
      },
      {
        heading: "Finding the direction",
        paragraphs: [
          "I **worked directly with the owner** to find the studio's look. The direction came from a **stargazer lily**: its colours and its feel, feminine and confident, carried through into the palette and the type.",
          "ByRachel is an **up-and-coming studio** that has worked with a client and is speaking with prospective ones, so the site's job is narrow and clear: make the next conversation easy to start.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "An Angular and TypeScript site on Vercel, **responsive across breakpoints**, with a **full SEO metadata layer** (OpenGraph, Twitter cards, canonical tags) and **keyboard skip-link navigation** for accessibility.",
          "That last pair is the tell. Metadata and skip links are the things nobody asks for and nobody notices, and **they are in there because the job isn't done without them**.",
        ],
      },
    ],
  },
  {
    slug: "trustyco",
    title: "TrustyCo",
    blurb:
      "A single-page site that turned a 200-client word-of-mouth cleaning business into one that people can actually find.",
    status: "shipped",
    period: "2025",
    tags: ["design engineering", "brand + web", "local seo"],
    thumb: {
      src: "/trustyco-site.png",
      alt: "TrustyCo website hero with the headline “Thoughtful cleaning that feels good to come home to”",
    },
    liveUrl: "https://www.trustyco.au/",
    meta: [
      { label: "timeline", value: "august 2025" },
      { label: "role", value: "design and build, solo" },
      { label: "client", value: "trustyco · wollongong, au" },
      { label: "stack", value: "angular · typescript · scss · emailjs · vercel" },
    ],
    summary:
      "A single-page site for a Wollongong cleaning business, built to turn local search demand into direct enquiries.",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "TrustyCo had grown to a **200-plus client book almost entirely on word of mouth**. That growth had a ceiling: people searching for cleaners around Wollongong **couldn't find them**, and prospective clients who heard the name had nowhere to check the business was real, established, and easy to reach.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "I **designed and built the site solo**, working directly with the owner. The structure is deliberately simple. One page, organised around the questions a prospective client actually has: what services, what area, what it costs to ask.",
          "Content and markup are **structured for local search from the start**: semantic sections, service and service-area copy written for the queries people type, and real metadata rather than an afterthought.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "A **responsive single-page Angular site** on Vercel with an EmailJS enquiry form that lands straight in the owner's inbox. No dashboard to maintain, no CMS to pay for. **The right amount of infrastructure for a business this shape.**",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The form is now **the business's main inbound enquiry channel**, connecting customers directly to the service. A real web presence for a business that had none.",
        ],
      },
    ],
  },
  {
    slug: "haiv-lab",
    title: "LLM Code Errors",
    blurb:
      "Research at UNIST's Human-AI Interaction lab on how language models fail at code, and how developers actually read it.",
    status: "published",
    period: "2024",
    tags: ["ai research", "ux research", "published paper"],
    diagram: "taxonomy",
    note: "Research rather than a screen. This is the classification the study produced.",
    meta: [
      { label: "timeline", value: "jul 2024 to dec 2024" },
      { label: "role", value: "software research intern" },
      { label: "lab", value: "human-ai interaction and visualization lab, unist" },
      { label: "output", value: "findings published in a conference paper" },
    ],
    summary:
      "Two studies at UNIST's Human-AI Interaction and Visualization Lab: where LLM code generation breaks, and how developers comprehend code.",
    sections: [
      {
        heading: "Classifying how models fail",
        paragraphs: [
          "I analysed and classified **LLM code generation errors from SWE-Bench**, sorting them into bugs, feature requests, removals, and security issues **to inform how the models were evaluated**.",
          "The interesting part wasn't the counting. It was that **a benchmark score hides the shape of the failure**. A model that quietly removes code and a model that writes an insecure patch score the same, and they are not the same problem.",
        ],
      },
      {
        heading: "How developers read code",
        paragraphs: [
          "I **coded and synthesised 50 developer survey responses** on code comprehension, producing findings that were **published in a conference paper**.",
          "Qualitative coding is unglamorous and it is the same muscle as user research: take 50 people's messy accounts of what they did, and find the structure that is actually in them rather than the one you hoped for.",
        ],
      },
      {
        heading: "Why it's here",
        paragraphs: [
          "This is the research half of the same instinct that runs through the rest of my work. **Understand the people using the thing before deciding what to build**, whether the thing is a vineyard tablet, an analytics dashboard, or a language model writing patches.",
        ],
      },
    ],
  },
];

export const getWork = (slug: string): Work | undefined =>
  work.find((entry) => entry.slug === slug);
