import DownloadCard from "@/components/custom/download/download-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import downloads from "@/data/download";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Cpu,
  Layers,
  HardDrive,
  Usb,
  ArrowDownToLine,
  Disc,
  PlayCircle,
  MessageSquare,
  BookOpen,
  ExternalLink,
  ShieldCheck,
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
    ? "دانلود پارچ لینوکس | Parch GNU/Linux"
    : "Download Parch Linux | Official ISO Releases";
  const description = isFa
    ? "دانلود مستقیم آخرین ایمیج‌های نصب پارچ لینوکس برای میزکارهای پلاسما ۶، گنوم، XFCE و هایپرلند با چکسام رسمی."
    : "Download official Parch Linux ISOs for KDE Plasma 6, GNOME, XFCE, and Hyprland. Fast, modern, and open source.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/download`,
      languages: {
        en: "https://parchlinux.com/en/download",
        fa: "https://parchlinux.com/fa/download",
        "x-default": "https://parchlinux.com/en/download",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/download`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
  };
}

export default function Download({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("DownloadPage");

  const translatedDownloads = downloads.map((download) => {
    const key = download.title;

    return {
      ...download,
      title: t(`titles.${key}` as any),
      description: t(`descriptions.${key}` as any),
      links: download.links.map((link) => ({
        ...link,
        title: t(`downloadTitles.${link.version.toLowerCase()}` as any),
      })),
    };
  });

  return (
    <div className="container mx-auto max-w-7xl lg:px-4 md:px-8 sm:px-6 px-4 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* Modern Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-xs">
          <Sparkles size={14} className="animate-pulse" />
          <span>{t("heroBadge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {t("heroTitle")}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-muted/60 border border-border/50">
            <Cpu size={13} className="text-primary" />
            64-bit (x86_64)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-muted/60 border border-border/50">
            <ShieldCheck size={13} className="text-primary" />
            Rolling Release
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-muted/60 border border-border/50">
            <Sparkles size={13} className="text-primary" />
            Calamares Installer
          </span>
        </div>
      </section>

      {/* Editions Grid */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {translatedDownloads.map((download) => (
            <DownloadCard
              key={download.logo}
              logo={download.logo}
              title={download.title}
              description={download.description}
              image={download.image}
              isRC={download.isRC}
              hashs={download.hashs}
              links={download.links}
            />
          ))}
        </div>
      </section>

      {/* System Requirements & Quick Start */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
        {/* System Requirements Card */}
        <Card className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-7 backdrop-blur-sm space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Cpu size={22} className="text-primary" />
              <span>{t("requirements.title")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t("requirements.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
              <Cpu size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">CPU</span>
                <span className="text-muted-foreground">{t("requirements.cpu")}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
              <Layers size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">RAM</span>
                <span className="text-muted-foreground">{t("requirements.ram")}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
              <HardDrive size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">Storage</span>
                <span className="text-muted-foreground">{t("requirements.storage")}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
              <Usb size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">Media</span>
                <span className="text-muted-foreground">{t("requirements.usb")}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Installation Guide Card */}
        <Card className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-7 backdrop-blur-sm space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <PlayCircle size={22} className="text-primary" />
              <span>{t("quickStart.title")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t("quickStart.subtitle")}
            </p>
          </div>

          <div className="space-y-3.5 pt-1">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">{t("quickStart.step1Title")}</span>
                <span className="text-muted-foreground">{t("quickStart.step1Desc")}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">{t("quickStart.step2Title")}</span>
                <span className="text-muted-foreground">{t("quickStart.step2Desc")}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold block text-foreground">{t("quickStart.step3Title")}</span>
                <span className="text-muted-foreground">{t("quickStart.step3Desc")}</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Community & Forum Callout */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-parch-blue/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            <MessageSquare size={16} />
            <span>{t("community.title")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">
            {t("community.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button asChild size="lg" className="rounded-xl shadow-xs">
            <a
              href="https://forum.parchlinux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare size={16} />
              <span>{t("community.forumButton")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <a
              href="https://wiki.parchlinux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>{t("community.wikiButton")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
