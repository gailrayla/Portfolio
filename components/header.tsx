"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { email, githubUrl, linkedinUrl, profile } from "@/lib/content";

const navItems = [
  { href: "/", label: "work" },
  { href: "/about", label: "about" },
];

/**
 * Sticky header: handwritten wordmark on the left, centred nav, contact
 * marks on the right. The nav underline sits drawn on the current page and
 * grows in on hover elsewhere.
 */
export default function Header() {
  const pathname = usePathname();

  const isCurrent = (href: string): boolean =>
    href === "/" ? pathname === "/" || pathname.startsWith("/work") : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-hand text-2xl leading-none tracking-tight transition-colors hover:text-accent"
        >
          {profile.name.toLowerCase()}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-7 font-mono text-xs">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="nav-link text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-3.5 text-ink-faint">
          <li>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="block transition-colors hover:text-accent"
            >
              <LinkedInIcon className="h-[15px] w-[15px]" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="block transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-[15px] w-[15px]" />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`} className="block transition-colors hover:text-accent">
              <MailIcon className="h-[17px] w-[17px]" />
              <span className="sr-only">Email</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
