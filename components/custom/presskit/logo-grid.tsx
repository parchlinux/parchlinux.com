"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface LogoItem {
  id: string;
  name: string;
  title: string;
  description: string;
  svgPath: string;
  pngPath: string;
  previewBg: "dark" | "light";
}

interface LogoGridProps {
  items: LogoItem[];
}

export default function LogoGrid({ items }: LogoGridProps) {
  const t = useTranslations("PresskitPage.logosSection");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyName = (name: string, id: string) => {
    navigator.clipboard.writeText(name);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
        >
          {/* Preview Container */}
          <div
            className={`relative w-full h-48 sm:h-52 rounded-xl flex items-center justify-center p-6 border transition-colors ${
              item.previewBg === "dark"
                ? "bg-neutral-950 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <Image
                src={item.svgPath}
                alt={item.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <span
              className={`absolute top-3 end-3 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border ${
                item.previewBg === "dark"
                  ? "bg-neutral-900/90 text-neutral-300 border-neutral-700"
                  : "bg-neutral-100/90 text-neutral-700 border-neutral-300"
              }`}
            >
              {item.previewBg === "dark" ? t("previewDark") : t("previewLight")}
            </span>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-2 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <button
                type="button"
                onClick={() => copyName(item.name, item.id)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title={t("copyName")}
              >
                {copiedId === item.id ? (
                  <>
                    <Check size={13} className="text-green-500" />
                    <span className="text-green-500">{t("copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>{item.name}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Download Actions */}
          <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-3">
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 rounded-xl shadow-xs"
            >
              <a href={item.svgPath} download className="flex items-center justify-center gap-2">
                <Download size={14} />
                <span>{t("downloadSvg")}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 rounded-xl"
            >
              <a href={item.pngPath} download className="flex items-center justify-center gap-2">
                <Download size={14} />
                <span>{t("downloadPng")}</span>
              </a>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
