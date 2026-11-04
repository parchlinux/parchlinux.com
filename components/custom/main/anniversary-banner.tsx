"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";

export default function AnniversaryBanner() {
  const t = useTranslations("AnniversaryBanner");
  const locale = useLocale();
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <div className="container max-w-7xl mx-auto">
      <Link
        href={`/${locale}/blog/one-month-in-parch-september-2026`}
        className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-background p-4 sm:px-5 transition-colors duration-200 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 text-center sm:text-start">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-parch">
            <Rocket className="h-[18px] w-[18px]" aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1.5">
              <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-[11px] font-medium text-parch">
                {t("badge")}
              </span>
              <h2 className="text-sm sm:text-base font-semibold text-foreground">
                {t("title")}
              </h2>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
              {t("description")}
            </p>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--parch-solid)] px-4 py-2 text-xs font-semibold text-white transition-opacity duration-200 group-hover:opacity-90 dark:bg-primary dark:text-primary-foreground">
          {t("cta")}
          <ArrowIcon
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </div>
  );
}
