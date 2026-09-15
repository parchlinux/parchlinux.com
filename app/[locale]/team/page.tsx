import React from "react";
import ProfileCard from "../../../components/custom/team/team-card";
import team from "@/data/team";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";

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
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  }>;
}

export default function App({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("TeamPage");

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-center text-3xl font-bold mb-12">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {team.map((member: TeamMember) => {
          const links = member.links[0] || {};

          return (
            <ProfileCard
              key={member.name}
              name={member.name}
              role={member.job}
              image={member.image}
              imageAlt={`${member.name} profile picture`}
              socialLinks={{
                mastodon: links.mastadon || "",
                twitter: links.twitter || "",
                linkedin: links.linkedin || "",
                github: links.github || "",
                website: links.website || "",
              }}
            />
          );
        })}
      </div>
      <span className="font-bold text-justify lg:text-sm text-xs">
        {t.rich("contributorsNote", {
          link: (chunks) => (
            <Link href={`/${locale}/contributors`} className="text-parch underline hover:opacity-80">
              {chunks}
            </Link>
          ),
        })}
      </span>
    </div>
  );
}
