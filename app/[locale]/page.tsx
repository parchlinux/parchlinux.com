import DownloadSection from "@/components/custom/main/download-section";
import HeadSection from "@/components/custom/main/head-section";
import HeroSection from "@/components/custom/main/hero-section";
import IconSection from "@/components/custom/main/icon-section";
import LinkSection from "@/components/custom/main/link-section";
import SponsorsCarousel from "@/components/custom/main/sponsor-carousel";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";

export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("Index");

  return (
    <>
      <div className="flex flex-col gap-12 h-full lg:px0 md:px-8 sm:px-6 px-4">
        <HeadSection />
        <div className="flex flex-col gap-24">
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14 xl:text-nowrap">
                {t.rich("workTitle", {
                  work: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("workDescription")}
              </p>
            }
            image="/images/wallpaper 4.jpg"
            imageAlt={t("desktopAlt")}
            reverse
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14 xl:text-nowrap">
                {t.rich("codingTitle", {
                  coding: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("codingDescription")}
              </p>
            }
            image="/images/wallpaper 2.jpg"
            imageAlt={t("desktopAlt")}
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14 rtl:xl:text-nowrap">
                {t.rich("chooseTitle", {
                  gnome: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                  plasma: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("chooseDescription")}
              </p>
            }
            image="/images/wallpaper 3.jpg"
            imageAlt={t("desktopAlt")}
            reverse
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14 xl:text-nowrap">
                {t.rich("updateTitle", {
                  update: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("updateDescription")}
              </p>
            }
            image="/images/wallpaper 4.jpg"
            imageAlt={t("desktopAlt")}
          />

          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14 xl:text-nowrap">
                {t.rich("aurTitle", {
                  aur: (chunks) => <span className="text-parch">{chunks}</span>,
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("aurDescription")}
              </p>
            }
            image="/images/wallpaper 2.jpg"
            imageAlt={t("desktopAlt")}
            reverse
          />
          <div className="container max-w-7xl mx-auto">
            <p className="font-bold text-zinc-400 text-justify lg:text-sm text-xs">
              {t("aurNote")}
            </p>
          </div>

          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-extrabold xl:leading-14">
                {t.rich("pacmanTitle", {
                  pacman: (chunks) => (
                    <span className="text-parch">{chunks}</span>
                  ),
                })}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs font-light">
                {t("pacmanDescription")}
              </p>
            }
            image="/images/wallpaper 3.jpg"
            imageAlt={t("desktopAlt")}
          />
        </div>
        <IconSection />
        <LinkSection />
        <SponsorsCarousel />
        <DownloadSection />
      </div>
    </>
  );
}
