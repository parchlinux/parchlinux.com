"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DownloadCardProps } from "@/types";
import { Check, Copy, Download, ExternalLink, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

const DownloadCard = ({
  logo,
  title,
  description,
  image,
  isRC,
  hashs,
  links,
}: DownloadCardProps) => {
  const t = useTranslations("DownloadCard");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyHash = async (hash: string, version: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(version);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 p-0.5 rounded-xl bg-muted/60 border border-border/40">
              <Image
                src={logo}
                width={48}
                height={48}
                alt={title}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
              <div className="mt-1">
                {isRC ? (
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs px-2.5 py-0.5 font-medium rounded-full"
                  >
                    {t("releaseCandidate")}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/25 text-xs px-2.5 py-0.5 font-medium rounded-full"
                  >
                    {t("officialEdition")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content & Mockup */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 my-4">
          <div className="flex-1 space-y-4 w-full">
            <p className="text-sm text-foreground/80 leading-relaxed text-justify sm:text-start">
              {description}
            </p>

            {/* Checksums */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("checksum")}
              </span>
              <div className="space-y-2">
                {hashs.map((hashItem) => (
                  <div
                    key={hashItem.version}
                    onClick={() => copyHash(hashItem.hash, hashItem.version)}
                    className="flex items-center justify-between gap-2 bg-muted/50 hover:bg-muted/80 border border-border/60 hover:border-primary/40 rounded-xl px-3 py-2 cursor-pointer transition-colors group/hash"
                    title={t("clickToCopy")}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                        {hashItem.version}
                      </span>
                      <code className="text-xs font-mono text-foreground/90 truncate dir-ltr text-left">
                        {hashItem.hash}
                      </code>
                    </div>
                    <div className="shrink-0 text-muted-foreground group-hover/hash:text-primary transition-colors flex items-center gap-1">
                      {copiedIndex === hashItem.version ? (
                        <>
                          <span className="text-[11px] text-green-500 font-medium">
                            {t("copied")}
                          </span>
                          <Check size={14} className="text-green-500" />
                        </>
                      ) : (
                        <Copy size={14} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Preview Frame */}
          {image && (
            <div className="shrink-0 flex items-center justify-center p-2 rounded-2xl bg-muted/30 border border-border/50 group-hover:border-primary/25 transition-colors">
              <Image
                src={image}
                width={125}
                height={188}
                alt={title}
                className="w-[100px] sm:w-[120px] h-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>

      {/* Download Action Footer */}
      <div className="mt-4 pt-3 border-t border-border/40 space-y-2">
        {links.map((link) => (
          <Link
            key={link.version}
            download
            href={link.href}
            className="flex items-center justify-between gap-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-xl p-3.5 transition-all shadow-sm hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black/15 dark:bg-white/15 px-2.5 py-1 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                {link.version}
              </div>
              <div className="flex flex-col text-start">
                <span className="font-bold text-sm leading-tight text-white dark:text-black">
                  {link.title}
                </span>
                <span className="text-xs opacity-90 font-normal text-white/90 dark:text-black/90">
                  {t("size")}: {link.size} • {t("buildDate")}: {link.date}
                </span>
              </div>
            </div>

            <Download size={18} className="shrink-0 text-white dark:text-black" aria-hidden="true" />
          </Link>
        ))}

        {isRC && (
          <div className="flex justify-center pt-1">
            <a
              href="https://forum.parchlinux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare size={13} />
              <span>{t("feedbackForum")}</span>
              <ExternalLink size={11} />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DownloadCard;
