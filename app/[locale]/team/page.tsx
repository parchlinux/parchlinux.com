import React from "react";
import TeamCard from "@/components/custom/team/team-card";
import team from "@/data/team";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, ExternalLink } from "lucide-react";

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
    ? "تیم توسعه پارچ لینوکس | Parch GNU/Linux"
    : "The Parch Linux Team | Core Developers & Maintainers";
  const description = isFa
    ? "آشنایی با اعضای تیم اصلی توسعه، نگهداری بسته‌ها و طراحان توزیع آزاد پارچ گنو/لینوکس."
    : "Meet the core developers, packagers, and maintainers driving the Parch GNU/Linux project forward.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://parchlinux.com/${locale}/team`,
      languages: {
        en: "https://parchlinux.com/en/team",
        fa: "https://parchlinux.com/fa/team",
        "x-default": "https://parchlinux.com/en/team",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://parchlinux.com/${locale}/team`,
      siteName: "Parch GNU/Linux",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
  };
}

interface TeamMember {
  name: string;
  job: string;
  image: string;
  links: Array<{
    mastadon?: string;
    mastodon?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  }>;
}

export default function TeamPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("TeamPage");

  return (
    <div className="container mx-auto max-w-7xl lg:px-4 md:px-8 sm:px-6 px-4 py-4 sm:py-8 space-y-10 sm:space-y-12">
      {/* Clean Hero Title & Subtitle */}
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

      {/* Team Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {team.map((member: TeamMember) => {
            const links = member.links[0] || {};

            return (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.job}
                image={member.image}
                imageAlt={`${member.name} profile picture`}
                socialLinks={{
                  mastodon: links.mastodon || links.mastadon || "",
                  twitter: links.twitter || "",
                  linkedin: links.linkedin || "",
                  github: links.github || "",
                  website: links.website || "",
                }}
              />
            );
          })}
        </div>
      </section>

      {/* Contributors & Community Callout */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-parch-blue/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-start">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
            <Heart size={16} />
            <span>{t("community.title")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            {t("community.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button asChild size="lg" className="rounded-xl shadow-xs">
            <Link
              href={`/${locale}/contributors`}
              className="flex items-center gap-2"
            >
              <Users size={16} />
              <span>{t("community.contributorsButton")}</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <a
              href="https://github.com/parchlinux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>{t("community.githubButton")}</span>
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
