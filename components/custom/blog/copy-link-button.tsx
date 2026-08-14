"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export default function CopyLinkButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Link2 className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}
