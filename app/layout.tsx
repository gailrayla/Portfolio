import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { siteUrl } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gail Parayno · Software Engineer, Frontend Focused",
    template: "%s · Gail Parayno",
  },
  description:
    "Software engineer, frontend focused, with a formal design education: dual bachelor's in Computer Science Engineering and Design (UNIST, cum laude). Ships production interfaces end to end across TypeScript, Angular, React, Next.js, and Ruby on Rails.",
  keywords: [
    "Gail Parayno",
    "frontend engineer",
    "design engineer",
    "UI engineer",
    "full-stack developer",
    "Angular",
    "React",
    "Next.js",
    "TypeScript",
    "Ruby on Rails",
    "web developer Philippines",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Gail Parayno · Software Engineer, Frontend Focused",
    description:
      "Software engineer, frontend focused, with a formal design education. Ships production interfaces end to end.",
    url: siteUrl,
    siteName: "Gail Parayno",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gail Parayno · portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gail Parayno · Software Engineer, Frontend Focused",
    description:
      "Software engineer, frontend focused, with a formal design education. Ships production interfaces end to end.",
    images: ["/og-image.png"],
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
      className={`${bricolage.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Adds .js before first paint so the hero load sequence can hide
            its copy without a flash; no-JS visitors get the settled hero. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gail Parayno",
              jobTitle: "Software Engineer",
              url: siteUrl,
              sameAs: [
                "https://www.linkedin.com/in/gail-parayno-280644247/",
                "https://github.com/gailrayla",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
