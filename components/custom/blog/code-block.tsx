"use client";

import React, { useState, useMemo } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import hljs from "highlight.js";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function normalizeLanguage(lang?: string): string {
  if (!lang) return "";
  const clean = lang.trim().toLowerCase();
  const map: Record<string, string> = {
    sh: "bash",
    zsh: "bash",
    shell: "bash",
    terminal: "bash",
    py: "python",
    js: "javascript",
    ts: "typescript",
    yml: "yaml",
    md: "markdown",
  };
  return map[clean] || clean;
}

export default function CodeBlock({ code, language = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanLang = normalizeLanguage(language);

  const highlightedCode = useMemo(() => {
    try {
      if (cleanLang && hljs.getLanguage(cleanLang)) {
        return hljs.highlight(code, { language: cleanLang, ignoreIllegals: true }).value;
      }
      if (code.trim()) {
        const auto = hljs.highlightAuto(code);
        return auto.value;
      }
    } catch {
      // fallback to plain escaped text
    }
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }, [code, cleanLang]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  }

  const displayLang = language.trim() || (cleanLang ? cleanLang : "code");

  return (
    <div
      dir="ltr"
      className="codeblock-container group my-6 overflow-hidden rounded-xl border border-white/10 bg-[#090d16] text-left shadow-lg transition-all"
    >
      {/* Header bar */}
      <div
        dir="ltr"
        className="flex items-center justify-between border-b border-white/10 bg-[#0e1524] px-4 py-2.5 text-xs text-slate-400"
      >
        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-1.5 opacity-70">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 font-medium uppercase tracking-wider text-slate-300">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            {displayLang}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-primary/50 hover:bg-primary/10 hover:text-white active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div dir="ltr" className="relative text-left">
        <pre
          dir="ltr"
          className="codeblock-pre m-0 overflow-x-auto p-4 text-left font-mono text-[0.88rem] leading-relaxed text-slate-200"
        >
          <code
            dir="ltr"
            className="font-mono text-left"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}
