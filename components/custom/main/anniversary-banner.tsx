"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function AnniversaryBanner() {
  const t = useTranslations("AnniversaryBanner");
  const locale = useLocale();
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <div className="container max-w-7xl mx-auto">
      <Link
        href={`/${locale}/blog/parch-fifth-anniversary`}
        className="group relative flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/60 hover:shadow-primary/10 hover:scale-[1.005]"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 text-center sm:text-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 shadow-inner group-hover:scale-110 transition-transform">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {t("badge")}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {t("title")}
              </h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all group-hover:bg-primary/90 group-hover:gap-2">
          <span>{t("cta")}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
