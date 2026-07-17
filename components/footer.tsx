import FooterPills from "@/components/footer-pills";
import LocalTime from "@/components/local-time";
import { cvPath, email, githubUrl, linkedinUrl, phoneDisplay, phoneHref } from "@/lib/content";

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
      className="roll-link transition-colors hover:text-ink"
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

export default function Footer() {
  return (
    <footer className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-white px-6 py-8 sm:px-10 sm:py-10">
        <FooterPills />

        <div className="label relative z-10 flex items-baseline justify-between">
          <span>Philippines · GMT+8</span>
          <LocalTime timeZone="Asia/Manila" />
        </div>

        <div className="relative z-10 flex min-h-[26rem] flex-col items-center pt-10 text-center sm:min-h-[70vh] sm:pt-20">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-none tracking-tight">
            Let&rsquo;s work together!
          </h2>
          <a
            href={`mailto:${email}`}
            className="mt-10 inline-block max-w-full rounded-full bg-accent px-6 py-4 font-display text-[clamp(1rem,2.5vw,2.5rem)] font-semibold text-white transition-transform duration-200 hover:-rotate-2 hover:scale-105 sm:px-16 sm:py-8"
          >
            {email}
          </a>
        </div>

        <div className="relative z-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label">© {new Date().getFullYear()} Gail Parayno</p>
          <ul className="label flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <li>
              <RollLink href={linkedinUrl} external>
                LinkedIn
              </RollLink>
            </li>
            <li>
              <RollLink href={githubUrl} external>
                GitHub
              </RollLink>
            </li>
            <li>
              <RollLink href={cvPath} download>
                Download CV
              </RollLink>
            </li>
            <li>
              <RollLink href={phoneHref}>{phoneDisplay}</RollLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
