import type { Metadata } from "next";
import { Caveat, Outfit, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { githubUrl, linkedinUrl, profile, siteUrl } from "@/lib/content";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const title = `${profile.name} · Software Engineer`;
const description =
  "Software engineer who designs and ships features end to end, across Angular, React, Next.js, Ruby on Rails and NestJS. Dual bachelor's in Computer Science Engineering and Design (UNIST, cum laude).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Gail Parayno",
    "software engineer",
    "full-stack engineer",
    "product engineer",
    "design engineer",
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "Ruby on Rails",
    "NestJS",
    "software engineer Philippines",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    /* The image comes from app/opengraph-image.tsx, which is generated from
       the same profile data as the page, so it cannot go stale. */
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sourceCodePro.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: "Software Engineer",
              url: siteUrl,
              sameAs: [linkedinUrl, githubUrl],
            }),
          }}
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
