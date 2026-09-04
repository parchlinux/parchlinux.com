"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopySnippetProps {
  code: string;
  label?: string;
  copiedText?: string;
  copyText?: string;
  multiline?: boolean;
}

export default function CopySnippet({
  code,
  label,
  copiedText = "Copied!",
  copyText = "Copy",
  multiline = false,
}: CopySnippetProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy snippet", err);
    }
  }

  return (
    <div
      dir="ltr"
      className="group relative my-3 overflow-hidden rounded-xl border border-border/80 bg-neutral-950 text-neutral-100 shadow-md transition-all hover:border-primary/40"
    >
      {label && (
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-3.5 py-1.5 text-xs text-neutral-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="flex items-center gap-1.5 opacity-60">
              <span className="h-2 w-2 rounded-full bg-rose-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
              {label}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-neutral-200 transition hover:border-primary/60 hover:bg-primary/20 hover:text-white active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">{copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{copyText}</span>
              </>
            )}
          </button>
        </div>
      )}

      <div className="relative flex items-center justify-between gap-2 p-3 sm:p-4 text-left">
        <pre
          className={`font-mono text-xs sm:text-sm leading-relaxed text-neutral-200 overflow-x-auto selection:bg-primary/30 selection:text-white ${
            multiline ? "w-full" : "flex-1 pr-12"
          }`}
        >
          <code>{code}</code>
        </pre>

        {!label && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-800/90 px-2.5 py-1 text-xs font-medium text-neutral-200 transition hover:border-primary/60 hover:bg-primary/20 hover:text-white active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">{copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{copyText}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
