import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Volume2,
  Cpu,
  ShoppingBag,
  History,
  Gamepad2,
  Usb,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Download,
  MessageSquare,
  Zap,
  Check,
  Sliders,
  Flame,
  Shield,
  Laptop,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiArchlinux, SiRust } from "@icons-pack/react-simple-icons";

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
    ? "از پارچ لینوکس چه انتظاری داشته باشیم؟ | Parch GNU/Linux"
    : "What to Expect from Parch Linux | Features & Innovations";
  const description = isFa
    ? "چرا پارچ لینوکس؟ بررسی پایداری اتمیک، فروشگاه نرم‌افزار ParchStore، بازگشت خودکار سیستم با Btrfs، پروژه همنوا و ابزارهای اختصاصی پارچ."
    : "Why choose Parch Linux? Discover unbreakable rolling releases with Btrfs snapshots, the ParchStore app center, Parch Kernel Manager, and Project Hamnava.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/features`,
      languages: {
        en: "https://parchlinux.com/en/features",
        fa: "https://parchlinux.com/fa/features",
        "x-default": "https://parchlinux.com/en/features",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/features`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function FeaturesPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("FeaturesPage");
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const comparisonRows: Array<{
    key: string;
    highlight: boolean;
    status?: "ready" | "upcoming";
  }> = [
    { key: "installer", highlight: true, status: "ready" },
    { key: "snapshots", highlight: true, status: "ready" },
    { key: "appStore", highlight: true, status: "ready" },
    { key: "kernelSwitch", highlight: true, status: "ready" },
    { key: "accessibility", highlight: true, status: "upcoming" },
    { key: "rollingBase", highlight: false, status: "ready" },
    { key: "immutable", highlight: true, status: "upcoming" },
    { key: "telemetry", highlight: false, status: "ready" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("title"),
    description: t("subtitle"),
    url: `https://parchlinux.com/${locale}/features`,
    isPartOf: {
      "@type": "WebSite",
      name: "Parch GNU/Linux",
      url: `https://parchlinux.com/${locale}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-7xl lg:px-0 md:px-8 sm:px-6 px-4 py-8 flex flex-col gap-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto pt-6">
          <Badge
            variant="outline"
            className="px-4 py-1 text-xs sm:text-sm font-medium border-primary/40 bg-primary/10 text-primary flex items-center gap-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            {t("badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button className="rounded-full bg-parch text-white hover:bg-parch/90 gap-2 font-medium" size="lg" asChild>
              <Link href={`/${locale}/download`}>
                <Download size={18} />
                <span>{t("cta.download")}</span>
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full gap-2 font-medium" size="lg" asChild>
              <Link href={`/${locale}/repo`}>
                <ShoppingBag size={18} />
                <span>{t("cta.repositories")}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Highlights Bar with Bulletproof SVGs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 p-3.5 rounded-xl border bg-card/60 backdrop-blur-xs">
            <div className="p-2.5 rounded-lg bg-[#1793D1]/15 text-[#1793D1] shrink-0 flex items-center justify-center">
              <SiArchlinux size={24} className="text-[#1793D1]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">
                {t("quickStats.archBased")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {t("quickStats.archBasedDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl border bg-card/60 backdrop-blur-xs">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 flex items-center justify-center">
              <Volume2 size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">
                {t("quickStats.offlineAccessibility")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {t("quickStats.offlineAccessibilityDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl border bg-card/60 backdrop-blur-xs">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0 flex items-center justify-center">
              <Layers size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">
                {t("quickStats.atomicWorkstation")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {t("quickStats.atomicWorkstationDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl border bg-card/60 backdrop-blur-xs">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500 shrink-0 flex items-center justify-center">
              <History size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold truncate">
                {t("quickStats.rollbackProtection")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {t("quickStats.rollbackProtectionDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: The Parch Experience — What You Get From Day One */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
            <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
              {t("expectSection.badge")}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t("expectSection.title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              {t("expectSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Card 1: Zero Setup Friction */}
            <Card className="border border-border/80 bg-gradient-to-b from-card to-secondary/15 hover:border-teal-500/40 transition-all shadow-sm">
              <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full gap-5">
                <div className="flex flex-col gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Laptop size={26} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {t("expectSection.card1Title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                    {t("expectSection.card1Desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card1Tag1")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card1Tag2")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card1Tag3")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Unbreakable Rolling Release */}
            <Card className="border border-border/80 bg-gradient-to-b from-card to-secondary/15 hover:border-purple-500/40 transition-all shadow-sm">
              <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full gap-5">
                <div className="flex flex-col gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center">
                    <History size={26} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {t("expectSection.card2Title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                    {t("expectSection.card2Desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card2Tag1")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card2Tag2")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card2Tag3")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: ParchStore */}
            <Card className="border border-border/80 bg-gradient-to-b from-card to-secondary/15 hover:border-blue-500/40 transition-all shadow-sm">
              <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full gap-5">
                <div className="flex flex-col gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
                    <ShoppingBag size={26} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {t("expectSection.card3Title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                    {t("expectSection.card3Desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card3Tag1")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card3Tag2")}</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-foreground/80 font-medium">{t("expectSection.card3Tag3")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SECTION 2: Flagship Innovations: ParchStore, Immutable, Hamnava */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ParchStore Feature Spotlight */}
          <Card className="relative overflow-hidden border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card hover:border-primary/50 transition-all shadow-sm">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                    <ShoppingBag size={26} />
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {t("features.parchStore.badge")}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t("features.parchStore.title")}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                    {t("features.parchStore.description")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-primary shrink-0" />
                    <span>{t("features.parchStore.tag1")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-primary shrink-0" />
                    <span>{t("features.parchStore.tag2")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-primary shrink-0" />
                    <span>{t("features.parchStore.tag3")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-primary shrink-0" />
                    <span>{t("features.parchStore.tag4")}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="rounded-full text-xs sm:text-sm gap-2 w-full sm:w-auto font-medium"
                  asChild
                >
                  <Link href={`/${locale}/repo`}>
                    <span>{t("features.parchStore.linkText")}</span>
                    <ArrowIcon size={14} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Parch Immutable */}
          <Card className="relative overflow-hidden border-blue-500/25 bg-gradient-to-br from-blue-500/10 via-card to-card hover:border-blue-500/50 transition-all shadow-sm">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <Layers size={26} />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                    {t("features.immutable.badge")}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t("features.immutable.title")}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                    {t("features.immutable.description")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                    <span>{t("features.immutable.tag1")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                    <span>{t("features.immutable.tag2")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                    <span>{t("features.immutable.tag3")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                    <span>{t("features.immutable.tag4")}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="rounded-full text-xs sm:text-sm gap-2 w-full sm:w-auto font-medium"
                  asChild
                >
                  <Link href={`/${locale}/blog/parch-immutable-first-alpha`}>
                    <span>{t("features.immutable.linkText")}</span>
                    <ArrowIcon size={14} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Hamnava & Parch Kernel Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Hamnava */}
          <Card className="relative overflow-hidden border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-card to-card hover:border-emerald-500/50 transition-all shadow-sm">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <Volume2 size={26} />
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">
                    {t("features.hamnava.badge")}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t("features.hamnava.title")}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                    {t("features.hamnava.description")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{t("features.hamnava.tag1")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{t("features.hamnava.tag2")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{t("features.hamnava.tag3")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{t("features.hamnava.tag4")}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="rounded-full text-xs sm:text-sm gap-2 w-full sm:w-auto font-medium"
                  asChild
                >
                  <Link href={`/${locale}/blog/${isFa ? "parch-accessibility" : "a-linux-distribution-that-leaves-no-one-behind"}`}>
                    <span>{t("features.hamnava.linkText")}</span>
                    <ArrowIcon size={14} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Parch Kernel Manager */}
          <Card className="relative overflow-hidden border-orange-500/25 bg-gradient-to-br from-orange-500/10 via-card to-card hover:border-orange-500/50 transition-all shadow-sm">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Cpu size={26} />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                    {t("features.kernelManager.badge")}
                  </Badge>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t("features.kernelManager.title")}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                    {t("features.kernelManager.description")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    <span>{t("features.kernelManager.tag1")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    <span>{t("features.kernelManager.tag2")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    <span>{t("features.kernelManager.tag3")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/90 font-medium">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    <span>{t("features.kernelManager.tag4")}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono">{t("features.kernelManager.tagGtk")}</Badge>
                <Badge variant="outline" className="text-xs font-mono">{t("features.kernelManager.tagCli")}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SECTION 3: Secondary In-House Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MirrorMan in Rust */}
          <Card className="border hover:border-foreground/30 transition-all">
            <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <SiRust size={22} className="text-orange-500" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("features.mirrorman.badge")}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">
                  {t("features.mirrorman.title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {t("features.mirrorman.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                <Badge variant="outline" className="text-[10px]">{t("features.mirrorman.tag1")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.mirrorman.tag2")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.mirrorman.tag3")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Parch Next & Btrfs */}
          <Card className="border hover:border-foreground/30 transition-all">
            <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                    <History size={20} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("features.btrfs.badge")}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">
                  {t("features.btrfs.title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {t("features.btrfs.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                <Badge variant="outline" className="text-[10px]">{t("features.btrfs.tag1")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.btrfs.tag2")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.btrfs.tag3")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Parch GameHub */}
          <Card className="border hover:border-foreground/30 transition-all">
            <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                    <Gamepad2 size={20} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("features.gamehub.badge")}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">
                  {t("features.gamehub.title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {t("features.gamehub.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                <Badge variant="outline" className="text-[10px]">{t("features.gamehub.tag1")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.gamehub.tag2")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.gamehub.tag3")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Parch To Go */}
          <Card className="border hover:border-foreground/30 transition-all">
            <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                    <Usb size={20} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("features.togo.badge")}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">
                  {t("features.togo.title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {t("features.togo.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                <Badge variant="outline" className="text-[10px]">{t("features.togo.tag1")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.togo.tag2")}</Badge>
                <Badge variant="outline" className="text-[10px]">{t("features.togo.tag3")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Hardened Security & 2FA */}
          <Card className="border hover:border-foreground/30 transition-all md:col-span-2 lg:col-span-2">
            <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {t("features.security.badge")}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">
                  {t("features.security.title")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {t("features.security.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                <Badge variant="outline" className="text-xs">{t("features.security.tag1")}</Badge>
                <Badge variant="outline" className="text-xs">{t("features.security.tag2")}</Badge>
                <Badge variant="outline" className="text-xs">{t("features.security.tag3")}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SECTION 4: Comparison Table — Parch Linux vs Stock Arch Linux */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
            <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
              {t("comparisonSection.badge")}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t("comparisonSection.title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              {t("comparisonSection.subtitle")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
            <table className="w-full text-center text-sm" dir="auto">
              <thead className="bg-secondary/40 border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <tr>
                  <th className="py-4 px-4 sm:px-6 text-center">{t("comparisonSection.featureCol")}</th>
                  <th className="py-4 px-4 sm:px-6 text-center text-emerald-500 font-bold">{t("comparisonSection.parchCol")}</th>
                  <th className="py-4 px-4 sm:px-6 text-center text-muted-foreground">{t("comparisonSection.archCol")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.key} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 text-center font-medium">
                      {t(`comparisonSection.features.${row.key}` as any)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      {row.status === "upcoming" ? (
                        <div className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs sm:text-sm border border-amber-500/20">
                          <Sparkles size={14} className="shrink-0 text-amber-500" />
                          <span>{t("comparisonSection.upcomingValue")}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-emerald-500">
                          <Check size={16} className="shrink-0 text-emerald-500" />
                          <span>{t("comparisonSection.parchValue")}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center text-muted-foreground">
                      {row.highlight ? (
                        <span className="text-zinc-500 italic inline-block">{t("comparisonSection.archValue")}</span>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-1.5 text-foreground/75">
                          <Check size={16} className="shrink-0 text-foreground/60" />
                          <span>{t("comparisonSection.included")}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: Engaging Call to Action */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-lg shadow-primary/5">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shadow-inner">
            <Sparkles size={32} />
          </div>
          <div className="max-w-2xl flex flex-col gap-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t("bottomCta.title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              {t("bottomCta.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            <Button className="rounded-full bg-parch text-white hover:bg-parch/90 gap-2 font-medium px-6 py-6 text-sm" size="lg" asChild>
              <Link href={`/${locale}/download`}>
                <Download size={18} />
                <span>{t("cta.download")}</span>
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full gap-2 font-medium px-6 py-6 text-sm" size="lg" asChild>
              <Link href={`/${locale}/repo`}>
                <ShoppingBag size={18} />
                <span>{t("cta.repositories")}</span>
              </Link>
            </Button>
            <Button variant="secondary" className="rounded-full gap-2 font-medium px-6 py-6 text-sm" size="lg" asChild>
              <Link href="https://forum.parchlinux.com" target="_blank" rel="noopener noreferrer">
                <MessageSquare size={18} />
                <span>{t("cta.community")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
