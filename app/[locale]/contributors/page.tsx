import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import contributors from "@/data/contributors";
import Image from "next/image";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";
import { Github, BookOpen, ExternalLink, Sparkles } from "lucide-react";

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
    ? "مشارکت‌کنندگان پارچ لینوکس | Parch GNU/Linux"
    : "Contributors | Parch GNU/Linux Community";
  const description = isFa
    ? "فهرست مشارکت‌کنندگان، مترجمان، برنامه‌نویسان و حامیان جامعه متن‌باز پارچ لینوکس."
    : "List of open-source contributors, translators, developers, and supporters of the Parch Linux project.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/contributors`,
      languages: {
        en: "https://parchlinux.com/en/contributors",
        fa: "https://parchlinux.com/fa/contributors",
        "x-default": "https://parchlinux.com/en/contributors",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/contributors`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
  };
}

export default function Contributors({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("ContributorsPage");

  return (
    <div className="container mx-auto max-w-7xl lg:px-4 md:px-8 sm:px-6 px-4 py-4 sm:py-8 space-y-10 sm:space-y-12">
      {/* Clean Hero Header */}
      <section className="text-center max-w-3xl mx-auto pt-2 pb-1 space-y-3">
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
      </section>

      {/* Contributors Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {contributors.map((contributor) => {
            const cleanUsername = contributor.id.replace(/^@/, "");
            const githubUrl = `https://github.com/${cleanUsername}`;

            return (
              <Card
                key={contributor.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <CardContent className="p-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Avatar with subtle recessed frame & hover zoom */}
                    <div className="relative shrink-0 p-0.5 rounded-xl bg-muted/60 border border-border/40 group-hover:border-primary/40 transition-colors">
                      <Image
                        src={contributor.image || "https://github.com/ghost.png"}
                        width={52}
                        height={52}
                        className="w-12 h-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={contributor.name}
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
                        {contributor.name}
                      </h3>
                      <span
                        className="text-xs text-muted-foreground font-mono truncate dir-ltr text-start"
                      >
                        {contributor.id}
                      </span>
                    </div>
                  </div>

                  {/* Profile link button */}
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-8 h-8 rounded-lg bg-muted/60 hover:bg-primary/15 text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/30 flex items-center justify-center transition-all shadow-xs active:scale-95"
                    aria-label={`${contributor.name} on GitHub`}
                    title={`${contributor.name} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How to Contribute & Join Section */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-parch-blue/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles size={16} />
            <span>{t("community.title")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            {t("community.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button asChild size="lg" className="rounded-xl shadow-xs">
            <a
              href="https://github.com/parchlinux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github size={16} />
              <span>{t("community.githubButton")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <Link
              href={`/${locale}/community-guidelines`}
              className="flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>{t("community.guidelinesButton")}</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
