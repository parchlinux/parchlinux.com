import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LogoGrid from "@/components/custom/presskit/logo-grid";
import ColorPalette from "@/components/custom/presskit/color-palette";
import {
  Download,
  FileText,
  CheckCircle2,
  XCircle,
  Type,
  Palette,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? "هویت بصری و کیت رسانه‌ای | Parch GNU/Linux"
    : "Brand Identity & Press Kit | Parch GNU/Linux";
  const description = isFa
    ? "راهنمای رسمی استفاده از نشان‌ها، رنگ‌ها، قلم‌ها و بسته گرافیکی پارچ گنو/لینوکس برای رسانه‌ها و تولیدکنندگان محتوا."
    : "Official logos, brand guidelines, color palettes, and press kit assets for Parch GNU/Linux.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/presskit`,
      languages: {
        en: "https://parchlinux.com/en/presskit",
        fa: "https://parchlinux.com/fa/presskit",
        "x-default": "https://parchlinux.com/en/presskit",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/presskit`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
  };
}

export default function PresskitPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("PresskitPage");

  const logoItems = [
    {
      id: "normal",
      name: "Parch_normal",
      title: t("logosSection.items.normal.title"),
      description: t("logosSection.items.normal.description"),
      svgPath: "/presskit/svg/Parch_normal.svg",
      pngPath: "/presskit/png/Parch_normal.png",
      previewBg: "dark" as const,
    },
    {
      id: "dark",
      name: "Parch_dark",
      title: t("logosSection.items.dark.title"),
      description: t("logosSection.items.dark.description"),
      svgPath: "/presskit/svg/Parch_dark.svg",
      pngPath: "/presskit/png/Parch_dark.png",
      previewBg: "light" as const,
    },
    {
      id: "white",
      name: "Parch_white",
      title: t("logosSection.items.white.title"),
      description: t("logosSection.items.white.description"),
      svgPath: "/presskit/svg/Parch_white.svg",
      pngPath: "/presskit/png/Parch_white.png",
      previewBg: "dark" as const,
    },
    {
      id: "black",
      name: "Parch_black",
      title: t("logosSection.items.black.title"),
      description: t("logosSection.items.black.description"),
      svgPath: "/presskit/svg/Parch_black.svg",
      pngPath: "/presskit/png/Parch_black.png",
      previewBg: "light" as const,
    },
  ];

  const dos = [0, 1, 2, 3].map((i) => t(`rulesSection.dos.${i}` as any));
  const donts = [0, 1, 2, 3].map((i) => t(`rulesSection.donts.${i}` as any));

  return (
    <div className="container mx-auto max-w-7xl lg:px-4 md:px-8 sm:px-6 px-4 py-4 sm:py-8 space-y-12 sm:space-y-14">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-2 pb-1 space-y-4">
        <div className="inline-flex items-center gap-1.5">
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/25 text-xs px-2.5 py-0.5 font-medium rounded-md"
          >
            {t("badge")}
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Primary Download CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="rounded-xl shadow-xs">
            <a
              href="/presskit/parch-brand-assets.zip"
              download
              className="flex items-center gap-2"
            >
              <Download size={16} />
              <span>{t("downloadAllButton")}</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <a
              href="https://github.com/parchlinux/arts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              <span>{t("downloadPdfButton")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </section>

      {/* Story & Philosophy Card */}
      <section className="rounded-2xl border border-border/70 bg-card/80 p-6 sm:p-8 backdrop-blur-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles size={16} />
            <span>{t("aboutSection.title")}</span>
          </div>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            {t("aboutSection.p1")}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("aboutSection.p2")}
          </p>
        </div>
      </section>

      {/* Official Logos Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("logosSection.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("logosSection.subtitle")}
          </p>
        </div>

        <LogoGrid items={logoItems} />
      </section>

      {/* Color System Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
            <Palette size={14} />
            <span>{t("paletteSection.badge")}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("paletteSection.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("paletteSection.subtitle")}
          </p>
        </div>

        <ColorPalette />
      </section>

      {/* Typography Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
            <Type size={14} />
            <span>{t("typographySection.badge")}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("typographySection.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("typographySection.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase">UI & Web (Latin)</span>
              <Badge variant="outline" className="text-xs rounded-md">Primary</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Saira</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("typographySection.latinDesc")}
            </p>
            <div className="pt-2 text-xs font-mono text-foreground/70 border-t border-border/40">
              Aa Bb Cc 1234567890
            </div>
          </Card>

          <Card className="rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase">UI & Web (Persian)</span>
              <Badge variant="outline" className="text-xs rounded-md">Primary</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight font-mono">استعداد (Estedad)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("typographySection.persianDesc")}
            </p>
            <div className="pt-2 text-xs font-mono text-foreground/70 border-t border-border/40 dir-rtl">
              ابپتث ۱۲۳۴۵۶۷۸۹۰
            </div>
          </Card>

          <Card className="rounded-2xl border border-border/70 bg-card/80 p-5 sm:p-6 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase">Editorial & Display</span>
              <Badge variant="outline" className="text-xs rounded-md">Secondary</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Morabba & Raleway</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("typographySection.secondaryDesc")}
            </p>
            <div className="pt-2 text-xs font-mono text-foreground/70 border-t border-border/40">
              Headlines, Stickers & Posters
            </div>
          </Card>
        </div>
      </section>

      {/* Rules & Guidelines: Do's and Don'ts */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("rulesSection.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("rulesSection.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's */}
          <Card className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <CheckCircle2 size={18} />
              <span>{t("rulesSection.dosTitle")}</span>
            </div>
            <ul className="space-y-3 text-sm text-foreground/90">
              {dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Don'ts */}
          <Card className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
              <XCircle size={18} />
              <span>{t("rulesSection.dontsTitle")}</span>
            </div>
            <ul className="space-y-3 text-sm text-foreground/90">
              {donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Bottom Callout Banner */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-parch-blue/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles size={16} />
            <span>{t("bottomCallout.title")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            {t("bottomCallout.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button asChild size="lg" className="rounded-xl shadow-xs">
            <a
              href="https://github.com/parchlinux/arts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>{t("bottomCallout.button")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
