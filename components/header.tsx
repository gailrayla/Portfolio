import Link from "next/link";
import { email } from "@/lib/content";

export default function Header() {
  return (
    <header>
      <div className="flex items-start justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="font-display text-base font-semibold tracking-tight">
          Gail Parayno
        </Link>
        <nav aria-label="Main">
          <ul className="label flex flex-col items-end gap-1.5 text-right">
            <li>
              <Link href="/#work" className="transition-colors hover:text-ink">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <a href={`mailto:${email}`} className="transition-colors hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
