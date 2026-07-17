export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
};

export type CaseStudyImage = {
  src: string;
  alt: string;
};

/** Card background on the stacked work cards; maps to the card-* color tokens. */
export type CaseStudyTone = "yellow" | "pink" | "berry";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  kind: "Client work" | "Employment";
  role: string;
  tone: CaseStudyTone;
  image?: CaseStudyImage;
  stack?: string[];
  liveUrl?: string;
  summary: string;
  note?: string;
  metrics?: CaseStudyMetric[];
  sections: CaseStudySection[];
};

export const siteUrl = "https://www.gailparayno.com";
export const email = "paraynogail@gmail.com";
export const phoneDisplay = "+63 956 771 3741";
export const phoneHref = "tel:+639567713741";
export const githubUrl = "https://github.com/gailrayla";
export const linkedinUrl = "https://www.linkedin.com/in/gail-parayno-280644247/";
export const cvPath = "/Gail_Rayla_Emanuelle_Parayno_Full_Stack_Engineer_Resume.pdf";

export const caseStudies: CaseStudy[] = [
  {
    slug: "trustyco",
    title: "TrustyCo",
    client: "TrustyCo · Wollongong, AU",
    kind: "Client work",
    role: "Design & build",
    tone: "yellow",
    image: {
      src: "/trustyco-site.png",
      alt: "TrustyCo website hero with the headline “Thoughtful cleaning that feels good to come home to”",
    },
    stack: ["Angular", "TypeScript", "SCSS", "EmailJS", "Vercel"],
    liveUrl: "https://www.trustyco.au/",
    summary:
      "A single-page site for a Wollongong cleaning business with 200+ clients, built to turn local search demand into direct enquiries.",
    sections: [
      {
        heading: "Problem",
        paragraphs: [
          "TrustyCo had grown to a **200-plus client book almost entirely on word of mouth**. That growth had a ceiling: people searching for cleaners in the Wollongong area **couldn’t find them**, and prospective clients who heard the name had nowhere to verify the business was real, established, and easy to reach.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "I **designed and built the site solo**, working directly with the owner. The structure is deliberately simple, one page organised around the questions a prospective client actually has: what services, what area, what it costs to ask.",
          "Content and markup are **structured for local search from the start**: semantic sections, service and service-area copy written for the queries people type, and real metadata rather than an afterthought.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "A **responsive single-page Angular site** on Vercel, with an enquiry form that lands straight in the owner’s inbox. No dashboard to maintain, no CMS to pay for. The right amount of infrastructure for a business this shape.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The site is live and doing its job: **a real web presence for a business that had none**, with enquiries arriving straight from search.",
        ],
      },
    ],
  },
  {
    slug: "byrachel",
    title: "ByRachel",
    client: "ByRachel · Marketing studio, AU",
    kind: "Client work",
    role: "Design & build",
    tone: "pink",
    image: {
      src: "/byrachel-site.png",
      alt: "ByRachel website hero for the branding and web design studio",
    },
    stack: ["Angular", "TypeScript", "SCSS", "Vercel"],
    liveUrl: "https://www.byrachel.com.au/",
    summary:
      "A site for a marketing studio, and the second project in a word-of-mouth client relationship that started with TrustyCo.",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "ByRachel **came by referral**: the studio’s owner and TrustyCo’s owner know each other, and the TrustyCo build led directly to this one. For freelance work, that referral is the point: **the first project was good enough that it produced the second**.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "I **worked closely with the owner** to find the studio’s look. The direction came from a **stargazer lily**: its colours and its feel, feminine and confident, carried into the palette and the type.",
          "ByRachel is an **up-and-coming business** that has already worked with a client and is speaking with prospective ones, so the site’s job is to make the next conversation easy to start.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "A site for the studio to present its services and point prospective clients to a conversation. Like TrustyCo, it is **sized to the business**: fast, direct, and maintainable without ongoing help.",
        ],
      },
    ],
  },
  {
    slug: "burt",
    title: "Burt",
    client: "Burt Intelligence · AdTech SaaS",
    kind: "Employment",
    role: "Frontend Engineer",
    tone: "berry",
    stack: ["Angular", "TypeScript", "Ruby on Rails", "Tailwind", "AWS"],
    summary:
      "Production engineering on an advertising analytics platform, across an Angular frontend and a Rails backend, with a team in Sweden.",
    note: "No screenshots: the product lives behind auth. Written record only.",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Burt Intelligence builds analytics software for the advertising industry. My title is frontend engineer; in practice the work runs across the **whole production codebase**, an Angular frontend and a Rails backend. I’m based in the Philippines, with a team in Sweden.",
        ],
      },
      {
        heading: "Problem space",
        paragraphs: [
          "AdTech analytics is dense by nature: large volumes of campaign and revenue data that have to be legible to the people whose job depends on reading them correctly. The frontend work is mostly about making **data-heavy interfaces fast and trustworthy**; the backend work is about getting the right data to them reliably.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "**Over thirty features and bugfixes** across the platform so far, from new functionality to **high-priority production defects**, including the quick, careful changes that emergency cases demand.",
          "I also aid the big lifts: **major Angular version updates** and other platform-wide changes that have to land without breaking what is already in production.",
        ],
      },
      {
        heading: "How I work",
        paragraphs: [
          "I work from **3 pm to midnight to share my team's working day in Sweden**, so collaboration happens live. Distance still makes writing the backbone: clear pull requests, honest code review, and changes scoped so anyone can pick them up.",
          "Owning changes across both halves of the stack is the norm here, not the exception. A feature is done when it **ships end to end**, not when one layer of it does.",
        ],
      },
      {
        heading: "Scale",
        paragraphs: [
          "This is a production platform in **daily use by paying customers**, the kind of codebase where changes are reviewed, releases are deliberate, and the cost of being wrong is real.",
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);
