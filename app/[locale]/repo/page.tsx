import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import Link from "next/link";
import {
  Server,
  Terminal,
  Globe2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  SiArchlinux,
  SiFlathub,
  SiTelegram,
  SiDiscord,
} from "@icons-pack/react-simple-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CopySnippet from "@/components/custom/repo/copy-snippet";

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
    ? "مخازن نرم‌افزاری پارچ لینوکس | Parch GNU/Linux"
    : "Software Repositories | Parch GNU/Linux";
  const description = isFa
    ? "راهنمای استفاده از مخازن پک‌من (world و void) و پروکسی فلت‌هاب پارچ لینوکس در پارچ و سایر توزیع‌ها."
    : "Guide to configuring Parch Linux Pacman repositories (world and void) and Flathub proxy mirror in Parch and other Linux distributions.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/repo`,
      languages: {
        en: "https://parchlinux.com/en/repo",
        fa: "https://parchlinux.com/fa/repo",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/repo`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RepoPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("RepoPage");
  const isFa = locale === "fa";

  const worldRepoConfig = `[world]
SigLevel = Optional TrustAll
Server = https://mirror.parchlinux.ir/$repo/$arch`;

  const voidRepoConfig = `[void]
SigLevel = Optional TrustAll
Server = https://mirror.parchlinux.ir/$repo/$arch`;

  const combinedConfig = `[world]
SigLevel = Optional TrustAll
Server = https://mirror.parchlinux.ir/$repo/$arch

# Testing / Unstable repository (optional)
# [void]
# SigLevel = Optional TrustAll
# Server = https://mirror.parchlinux.ir/$repo/$arch`;

  const copyLabel = isFa ? "کپی" : "Copy";
  const copiedLabel = isFa ? "کپی شد!" : "Copied!";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isFa ? "مخازن نرم‌افزاری پارچ لینوکس" : "Parch Linux Software Repositories",
    description: isFa
      ? "راهنمای استفاده از مخازن رسمی پک‌من و پروکسی فلت‌هاب پارچ لینوکس"
      : "Official guide to using Parch Linux Pacman repositories and Flathub proxy mirror",
    url: `https://parchlinux.com/${locale}/repo`,
    publisher: {
      "@type": "Organization",
      name: "Parch GNU/Linux",
      url: "https://parchlinux.com",
    },
    inLanguage: isFa ? "fa-IR" : "en-US",
  };

  return (
    <main className="relative pb-20 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Decorative ambient background glow */}
      <div className="pointer-events-none absolute -top-24 start-1/2 -translate-x-1/2 w-[90vw] max-w-6xl h-96 bg-radial from-teal-500/10 via-sky-500/5 to-transparent blur-3xl -z-10" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Section */}
        <header className="text-center pt-4 pb-12 sm:pb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-foreground text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <Server className="w-4 h-4 text-emerald-500" />
            <span>{t("badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-6">
            <span className="text-parch block sm:inline">{t("title")}</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 border-border/80 hover:border-primary/50 text-xs sm:text-sm"
              asChild
            >
              <a href="#pacman">
                <SiArchlinux className="w-4 h-4 text-[#1793D1]" />
                <span>{t("quickNav.pacman")}</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 border-border/80 hover:border-primary/50 text-xs sm:text-sm"
              asChild
            >
              <a href="#flatpak">
                <SiFlathub className="w-4 h-4 text-[#4A90E2]" />
                <span>{t("quickNav.flatpak")}</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 border-border/80 hover:border-primary/50 text-xs sm:text-sm"
              asChild
            >
              <a href="#mirrors">
                <Globe2 className="w-4 h-4 text-emerald-500" />
                <span>{t("quickNav.mirrors")}</span>
              </a>
            </Button>
          </div>
        </header>

        {/* Section 1: Pacman Repositories */}
        <section id="pacman" className="mb-20 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-[#1793D1]">
              <SiArchlinux className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                {t("pacman.badge")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {t("pacman.title")}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mb-4">
            {t("pacman.description")}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/70 bg-card/60 text-xs text-muted-foreground mb-8">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{t("pacman.supportedDistros")}</span>
          </div>

          {/* World vs Void Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* World Repository Card */}
            <Card className="rounded-2xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/5 via-card to-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-lg font-bold text-foreground">
                      [{t("pacman.world.name")}]
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {t("pacman.world.tag")}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("pacman.world.description")}
                </p>

                <CopySnippet
                  code={worldRepoConfig}
                  label="pacman.conf"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                  multiline
                />
              </CardContent>
            </Card>

            {/* Void Repository Card */}
            <Card className="rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/5 via-card to-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-lg font-bold text-foreground">
                      [{t("pacman.void.name")}]
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {t("pacman.void.tag")}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("pacman.void.description")}
                </p>

                <CopySnippet
                  code={voidRepoConfig}
                  label="pacman.conf"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                  multiline
                />
              </CardContent>
            </Card>
          </div>

          {/* Step-by-Step Guide for Pacman */}
          <div className="rounded-3xl border border-border/80 bg-card/75 backdrop-blur-md p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-primary" />
              <span>{t("pacman.steps.title")}</span>
            </h3>

            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("pacman.steps.step1.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("pacman.steps.step1.description")}
                </p>
                <CopySnippet
                  code="sudo nano /etc/pacman.conf"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>

              {/* Step 2 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("pacman.steps.step2.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("pacman.steps.step2.description")}
                </p>
                <CopySnippet
                  code={combinedConfig}
                  label="/etc/pacman.conf"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                  multiline
                />
              </div>

              {/* Step 3 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("pacman.steps.step3.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("pacman.steps.step3.description")}
                </p>
                <CopySnippet
                  code="sudo pacman -Syy"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>

              {/* Step 4 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("pacman.steps.step4.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("pacman.steps.step4.description")}
                </p>
                <CopySnippet
                  code="sudo pacman -S parch-wallpaper"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Flatpak Proxy Repository */}
        <section id="flatpak" className="mb-20 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-[#4A90E2]">
              <SiFlathub className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                {t("flatpak.badge")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {t("flatpak.title")}
              </h2>
            </div>
          </div>

          {/* Announcement Card */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-br from-primary/10 via-card to-card p-6 sm:p-8 mb-8 shadow-sm">
            <div className="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("flatpak.announcement")}</span>
              </div>
              <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed">
                {t("flatpak.description")}
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Globe2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{t("flatpak.supportedDistros")}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Guide for Flatpak */}
          <div className="rounded-3xl border border-border/80 bg-card/75 backdrop-blur-md p-6 sm:p-8 shadow-sm mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-primary" />
              <span>{t("flatpak.steps.title")}</span>
            </h3>

            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("flatpak.steps.step1.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("flatpak.steps.step1.description")}
                </p>
                <CopySnippet
                  code="flatpak remote-add --if-not-exists flathub https://flathub.parchlinux.com/repo/flathub.flatpakrepo"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>

              {/* Step 2 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("flatpak.steps.step2.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("flatpak.steps.step2.description")}
                </p>
                <CopySnippet
                  code="sudo flatpak remote-modify flathub --url=https://flathub.parchlinux.com/repo/"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>

              {/* Step 3 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("flatpak.steps.step3.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("flatpak.steps.step3.description")}
                </p>
                <CopySnippet
                  code="flatpak update"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>

              {/* Step 4 */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {t("flatpak.steps.step4.title")}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 leading-relaxed">
                  {t("flatpak.steps.step4.description")}
                </p>
                <CopySnippet
                  code="flatpak install flathub org.mozilla.firefox"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mirror Information */}
        <section id="mirrors" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {t("mirrors.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("mirrors.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-2xl border border-border/80 bg-card/70 p-5">
              <CardContent className="p-0 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Server className="w-4 h-4 text-[#1793D1]" />
                  <span>{t("mirrors.pacmanUrl")}</span>
                </div>
                <CopySnippet
                  code="https://mirror.parchlinux.ir/$repo/$arch"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border/80 bg-card/70 p-5">
              <CardContent className="p-0 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Globe2 className="w-4 h-4 text-[#4A90E2]" />
                  <span>{t("mirrors.flatpakUrl")}</span>
                </div>
                <CopySnippet
                  code="https://flathub.parchlinux.com/repo/"
                  copyText={copyLabel}
                  copiedText={copiedLabel}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community Banner */}
        <section>
          <div className="rounded-3xl border border-primary/20 bg-linear-to-b from-card to-secondary/40 p-8 sm:p-10 text-center relative overflow-hidden shadow-sm">
            <div className="inline-flex p-3 rounded-2xl bg-primary/15 text-primary mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              {t("community.title")}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t("community.description")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-parch text-white hover:text-white/80 font-medium px-6 py-5 text-sm"
                asChild
              >
                <Link
                  href="https://forum.parchlinux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("community.forum")}</span>
                  <ExternalLink className="w-3.5 h-3.5 rtl:-rotate-90" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full font-medium px-6 py-5 text-sm"
                asChild
              >
                <Link
                  href={isFa ? "https://t.me/parchlinux" : "https://t.me/parchlinux_en"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiTelegram className="w-4 h-4 text-[#24A1DE]" />
                  <span>{t("community.telegram")}</span>
                  <ExternalLink className="w-3.5 h-3.5 rtl:-rotate-90" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full font-medium px-6 py-5 text-sm"
                asChild
              >
                <Link
                  href="https://discord.gg/9RW5cRByAM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiDiscord className="w-4 h-4 text-[#5865F2]" />
                  <span>{t("community.discord")}</span>
                  <ExternalLink className="w-3.5 h-3.5 rtl:-rotate-90" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
