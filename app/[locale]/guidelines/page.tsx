import { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  HeartHandshake,
  Users,
  Scale,
  MessageSquareHeart,
  Lightbulb,
  Coffee,
  ShieldCheck,
  Globe2,
  ArrowUpRight,
  Sparkles,
  Info,
  CheckCircle2,
  Home,
  MessageSquare,
} from "lucide-react";
import {
  SiDiscord,
  SiTelegram,
} from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? "منشور جامعه پارچ لینوکس | Parch GNU/Linux"
    : "Community Guidelines | Parch GNU/Linux";
  const description = isFa
    ? "منشور رفتار، اصول و راهنمای تعامل در جامعه پارچ لینوکس، فضاهای گفتگو و کافه پارچ."
    : "Parch Linux Community Guidelines, Code of Conduct, Parch Cafe, and official community spaces.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/guidelines`,
      languages: {
        en: "https://parchlinux.com/en/guidelines",
        fa: "https://parchlinux.com/fa/guidelines",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/guidelines`,
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

export default function GuidelinesPage() {
  const locale = useLocale();
  const t = useTranslations("GuidelinesPage");
  const isFa = locale === "fa";

  const principlesList = [
    {
      key: "patient",
      icon: Sparkles,
      color: "from-teal-500/20 to-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      accentBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      num: "01",
    },
    {
      key: "welcoming",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
      accentBg: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
      num: "02",
    },
    {
      key: "considerate",
      icon: Globe2,
      color: "from-sky-500/20 to-indigo-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      accentBg: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
      num: "03",
    },
    {
      key: "respectful",
      icon: Scale,
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      accentBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
      num: "04",
    },
    {
      key: "kind",
      icon: MessageSquareHeart,
      color: "from-emerald-500/20 to-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
      accentBg: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
      num: "05",
    },
    {
      key: "understanding",
      icon: Lightbulb,
      color: "from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      accentBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      num: "06",
    },
  ];

  const spacesList = [
    {
      key: "forum",
      href: "https://forum.parchlinux.com/",
      icon: MessageSquare,
      badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    },
    {
      key: "telegram",
      href: isFa ? "https://t.me/parchlinux" : "https://t.me/parchlinux_en",
      icon: SiTelegram,
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    },
    {
      key: "discord",
      href: "https://discord.gg/9RW5cRByAM",
      icon: SiDiscord,
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: isFa ? "منشور جامعه پارچ لینوکس" : "Parch Linux Community Guidelines",
    headline: isFa ? "منشور جامعه پارچ لینوکس" : "Parch Linux Community Guidelines",
    description: isFa
      ? "منشور رفتار و اصول تعامل در جامعه پارچ لینوکس"
      : "Principles and guidelines for Parch Linux community members",
    url: `https://parchlinux.com/${locale}/guidelines`,
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
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
            <span>{t("badge")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-6">
            <span className="text-parch block sm:inline">{t("title")}</span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </header>

        {/* Welcome & Open-Door Card */}
        <section className="mb-12">
          <Card className="border border-border/80 bg-card/75 backdrop-blur-md shadow-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <CardContent className="p-0 flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {t("welcomeTitle")}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed sm:leading-loose text-justify">
                {t("welcomeP1")}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Scope & Application Notice */}
        <section className="mb-16">
          <div className="rounded-2xl sm:rounded-3xl border border-sky-500/20 bg-linear-to-br from-sky-500/5 via-card to-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("scopeTitle")}
              </h2>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose text-justify">
              <p>{t("scopeP1")}</p>
              <p>{t("scopeP2")}</p>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {t("principlesTitle")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("principlesIntro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principlesList.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.key}
                  className="group relative rounded-2xl border border-border/70 bg-card/60 hover:bg-card/95 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col justify-between"
                >
                  <CardContent className="p-0 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl border bg-gradient-to-br ${item.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(`principles.${item.key}.title`)}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-muted-foreground/50 select-none">
                        {item.num}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed sm:leading-loose text-justify">
                      {t(`principles.${item.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FreeBSD Attribution Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-secondary/50 border border-border/60 rounded-full px-4 py-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span>{t("freebsdAttribution")}</span>
            </div>
          </div>
        </section>

        {/* Parch Cafe Spotlight */}
        <section className="mb-16 sm:mb-20">
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-6 sm:p-10 shadow-lg">
            <div className="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>{t("cafe.badge")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-4">
                  {t("cafe.title")}
                </h2>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed sm:leading-loose text-justify max-w-2xl">
                  {t("cafe.description")}
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <Button
                  size="lg"
                  className="rounded-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <Link
                    href="https://forum.parchlinux.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>{t("cafe.cta")}</span>
                    <ArrowUpRight className="w-4 h-4 rtl:-rotate-90" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Spaces Grid */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              {t("spaces.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("spaces.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spacesList.map((space) => {
              const Icon = space.icon;
              return (
                <Card
                  key={space.key}
                  className="group rounded-2xl border border-border/80 bg-card/70 hover:bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between p-5"
                >
                  <CardContent className="p-0 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border ${space.badgeColor} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {t(`spaces.${space.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(`spaces.${space.key}.description`)}
                    </p>
                  </CardContent>

                  <div className="mt-5 pt-4 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors text-xs font-medium"
                      asChild
                    >
                      <Link
                        href={space.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{t(`spaces.${space.key}.action`)}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 rtl:-rotate-90" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-8 italic">
            {t("spaces.futureNote")}
          </p>
        </section>

        {/* Closing / Call to Action */}
        <section>
          <div className="rounded-3xl border border-primary/20 bg-linear-to-b from-card to-secondary/40 p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
            <div className="inline-flex p-3 rounded-2xl bg-primary/15 text-primary mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              {t("closing.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t("closing.description")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-parch text-white hover:text-white/80 font-medium px-6 py-6 text-sm sm:text-base"
                asChild
              >
                <Link
                  href="https://forum.parchlinux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("closing.joinCommunity")}</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full font-medium px-6 py-6 text-sm sm:text-base"
                asChild
              >
                <Link href={`/${locale}`} className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{t("closing.backToHome")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
