import DownloadCard from "@/components/custom/download/download-card";
import { Button } from "@/components/ui/button";
import downloads from "@/data/download";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Metadata } from "next";
import { MessageSquare, BookOpen, ExternalLink } from "lucide-react";

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
    <div className="container mx-auto max-w-7xl lg:px-4 md:px-8 sm:px-6 px-4 py-4 sm:py-8 space-y-10 sm:space-y-12">
      {/* Clean Hero Title */}
      <section className="text-center max-w-3xl mx-auto pt-2 pb-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {t("heroTitle")}
        </h1>
      </section>

      {/* Editions Grid - Balanced 2x2 */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
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
