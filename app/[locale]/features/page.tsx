import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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
    ? "پارچ چه چیزهایی دارد | Parch GNU/Linux"
    : "What comes with Parch | Parch GNU/Linux";
  const description = isFa
    ? "پارچ همان آرچ لینوکس است با تنظیمات انجام‌شده: نصب‌کننده گرافیکی، اسنپ‌شات Btrfs پیش از هر به‌روزرسانی، پارچ‌استور، مدیر کرنل و چند ابزار دیگر."
    : "Parch is Arch Linux with the setup done: a graphical installer, a Btrfs snapshot before every update, ParchStore, Kernel Manager and a few more tools.";

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

const SPEC = ["base", "desktops", "installer", "filesystem", "software", "telemetry"] as const;
const FIRST_BOOT = ["hardware", "snapshots", "persian"] as const;
const TOOLS = ["store", "kernel", "installer", "mirrorman", "gamehub", "togo", "totp"] as const;
const COMPARE: Array<{
  key: "installer" | "snapshots" | "appStore" | "kernelSwitch" | "accessibility" | "immutable" | "rollingBase" | "telemetry";
  parch: "included" | "planned";
  arch: "included" | "manual";
}> = [
  { key: "installer", parch: "included", arch: "manual" },
  { key: "snapshots", parch: "included", arch: "manual" },
  { key: "appStore", parch: "included", arch: "manual" },
  { key: "kernelSwitch", parch: "included", arch: "manual" },
  { key: "accessibility", parch: "planned", arch: "manual" },
  { key: "immutable", parch: "planned", arch: "manual" },
  { key: "rollingBase", parch: "included", arch: "included" },
  { key: "telemetry", parch: "included", arch: "included" },
];

// the same two buttons as the release banner on the home page
const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-[var(--parch-solid)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-primary dark:text-primary-foreground";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const textLink =
  "group inline-flex items-center gap-1.5 text-sm font-medium text-parch underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm";

function SectionHead({ title, subtitle, className = "" }: { title: string; subtitle: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{title}</h2>
      <p className="max-w-xl text-base text-muted-foreground leading-relaxed text-pretty">{subtitle}</p>
    </div>
  );
}

export default function FeaturesPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("FeaturesPage");
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;
  const nudge = "transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5";

  const upcoming = [
    { key: "immutable", href: `/${locale}/blog/parch-immutable-first-alpha` },
    {
      key: "hamnava",
      href: `/${locale}/blog/${isFa ? "parch-accessibility" : "a-linux-distribution-that-leaves-no-one-behind"}`,
    },
  ] as const;

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
      <div className="container mx-auto max-w-6xl md:px-8 sm:px-6 px-4 pt-6 pb-24 flex flex-col gap-24 sm:gap-32">
        {/* What Parch is, and the facts at a glance */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:items-end">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Link href={`/${locale}/download`} className={primaryButton}>
                {t("cta.download")}
              </Link>
              <Link href={`/${locale}/repo`} className={textLink}>
                {t("cta.repositories")}
                <ArrowIcon className={`h-3.5 w-3.5 ${nudge}`} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <dl className="rounded-xl border border-border text-sm divide-y divide-border">
            {SPEC.map((key) => (
              <div key={key} className="flex items-baseline justify-between gap-6 px-4 py-3">
                <dt className="text-muted-foreground">{t(`spec.${key}`)}</dt>
                <dd className="font-medium text-end">{t(`spec.${key}Value`)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Ready on first boot */}
        <section className="flex flex-col gap-10">
          <SectionHead title={t("firstBoot.title")} subtitle={t("firstBoot.subtitle")} />
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {FIRST_BOOT.map((key) => (
              <div key={key} className="flex flex-col gap-2.5 border-t border-border pt-5">
                <h3 className="text-lg font-semibold text-balance">{t(`firstBoot.${key}Title`)}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
                  {t(`firstBoot.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools the team builds */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHead
            title={t("tools.title")}
            subtitle={t("tools.subtitle")}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          />
          <ul className="lg:col-span-8 border-t border-border">
            {TOOLS.map((key) => (
              <li
                key={key}
                className="grid gap-x-8 gap-y-2 border-b border-border py-6 sm:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold">{t(`tools.${key}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{t(`tools.${key}.meta`)}</p>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
                  {t(`tools.${key}.desc`)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Not released yet */}
        <section className="flex flex-col gap-10">
          <SectionHead title={t("upcoming.title")} subtitle={t("upcoming.subtitle")} />
          <div className="grid rounded-xl border border-border md:grid-cols-2">
            {upcoming.map(({ key, href }, i) => (
              <article
                key={key}
                className={`flex flex-col gap-4 p-6 sm:p-8 ${i > 0 ? "border-t border-border md:border-t-0 md:border-s" : ""}`}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{t(`upcoming.${key}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{t(`upcoming.${key}.meta`)}</p>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
                  {t(`upcoming.${key}.desc`)}
                </p>
                <Link href={href} className={`${textLink} mt-auto self-start pt-2`}>
                  {t(`upcoming.${key}.link`)}
                  <ArrowIcon className={`h-3.5 w-3.5 ${nudge}`} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Parch next to plain Arch */}
        <section className="flex flex-col gap-10">
          <SectionHead title={t("compare.title")} subtitle={t("compare.subtitle")} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th scope="col" className="py-3 pe-3 sm:pe-4 text-start font-medium">{t("compare.featureCol")}</th>
                  <th scope="col" className="py-3 px-2 sm:px-4 text-start font-semibold text-foreground">{t("compare.parchCol")}</th>
                  <th scope="col" className="py-3 ps-2 sm:ps-4 text-start font-medium">{t("compare.archCol")}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.key} className="border-b border-border">
                    <th scope="row" className="py-3.5 pe-3 sm:pe-4 text-start font-normal">
                      {t(`compare.rows.${row.key}`)}
                    </th>
                    <td className="py-3.5 px-2 sm:px-4 whitespace-nowrap">
                      {row.parch === "included" ? (
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Check className="h-4 w-4 text-parch" aria-hidden="true" />
                          {t("compare.included")}
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400">{t("compare.planned")}</span>
                      )}
                    </td>
                    <td className="py-3.5 ps-2 sm:ps-4 whitespace-nowrap text-muted-foreground">
                      {row.arch === "included" ? t("compare.included") : t("compare.manual")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Download */}
        <section className="flex flex-col gap-6 rounded-xl border border-border p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{t("closing.title")}</h2>
            <p className="text-base text-muted-foreground">{t("closing.subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href={`/${locale}/download`} className={primaryButton}>
              {t("cta.download")}
            </Link>
            <Link
              href="https://forum.parchlinux.com"
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButton}
            >
              {t("cta.forum")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
