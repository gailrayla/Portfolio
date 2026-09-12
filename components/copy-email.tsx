"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

/**
 * The footer email: a mailto link with a copy button beside it, because
 * plenty of people would rather paste the address somewhere than have a
 * mail client open on them.
 */
export default function CopyEmail({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      /* Clipboard denied or unavailable. The mailto link still works. */
    }
  };

  return (
    <span className="inline-flex items-center gap-3">
      <a
        href={`mailto:${address}`}
        className="text-lg underline decoration-line underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent sm:text-xl"
      >
        {address}
      </a>
      <button
        type="button"
        onClick={copy}
        className="text-ink-faint transition-colors hover:text-accent"
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        <span className="sr-only">{copied ? "Email copied" : "Copy email address"}</span>
      </button>
      <span aria-live="polite" className="label">
        {copied ? "copied" : ""}
      </span>
    </span>
  );
}
