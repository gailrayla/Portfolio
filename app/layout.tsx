import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-switch-2";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gail Parayno | Full-Stack Developer Portfolio",
  description:
    "Gail Parayno is a software engineer specializing in frontend and full-stack development. Explore projects, skills, and experience in web development.",
  keywords: [
    "Gail Parayno",
    "Software Engineer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Web Development",
  ],
  openGraph: {
    title: "Gail Parayno | Software Engineer Portfolio",
    description:
      "Gail Parayno is a software engineer specializing in frontend and full-stack development.",
    url: "https://www.gailparayno.com/",
    siteName: "Gail Parayno Portfolio",
    images: [
      {
        url: "public/website-image.png",
        width: 1200,
        height: 630,
        alt: "Gail Parayno Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gail Parayno | Software Engineer Portfolio",
    description:
      "Gail Parayno is a software engineer specializing in frontend and full-stack development.",
    images: ["public/website-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gail Parayno",
              jobTitle: "Software Engineer",
              url: "https://www.gailparayno.com/",
              sameAs: [
                "https://www.linkedin.com/in/gail-parayno-280644247/",
                "https://github.com/gailrayla",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <div className="fixed bottom-5 right-5">
              <ModeToggle />
            </div>
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
