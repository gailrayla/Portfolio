import Link from "next/link";
import CopyEmail from "@/components/copy-email";
import LocalTime from "@/components/local-time";
import { cvPath, email, githubUrl, linkedinUrl, profile } from "@/lib/content";

function RollLink({
  href,
  children,
  external = false,
  download = false,
}: {
  href: string;
  children: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className="roll-link transition-colors hover:text-accent"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      <span className="roll-link-inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </a>
  );
}

const footerNav = [
  { href: "/", label: "work" },
  { href: "/about", label: "about" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line-faint">
      <div className="shell py-16 sm:py-20">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <h2 className="font-sans text-display font-medium tracking-tight">say hello.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
              Open to software engineering roles, full-stack and product work, and freelance
              builds. Always happy to talk about shipping the whole thing rather than a slice of
              it, and I will never turn down a coffee chat.
            </p>
            <div className="mt-7">
              <CopyEmail address={email} />
            </div>
          </div>

          <nav aria-label="Footer" className="sm:text-right">
            <ul className="flex gap-6 font-mono text-xs text-ink-muted sm:flex-col sm:gap-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={cvPath} download className="transition-colors hover:text-accent">
                  cv
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-faint pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label">
            &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.location},{" "}
            {profile.timeZoneLabel} &middot; <LocalTime timeZone={profile.timeZone} />
          </p>
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs">
            <li>
              <RollLink href={linkedinUrl} external>
                linkedin
              </RollLink>
            </li>
            <li>
              <RollLink href={githubUrl} external>
                github
              </RollLink>
            </li>
            <li>
              <RollLink href={cvPath} download>
                download cv
              </RollLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
