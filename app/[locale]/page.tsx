// import BlogSection from "@/components/custom/main/blog-section";
import DownloadSection from "@/components/custom/main/download-section";
// import EventSection from "@/components/custom/main/event-section";
import HeadSection from "@/components/custom/main/head-section";
import HeroSection from "@/components/custom/main/hero-section";
import IconSection from "@/components/custom/main/icon-section";
import LinkSection from "@/components/custom/main/link-section";
import SponsorsCarousel from "@/components/custom/main/sponsor-carousel";
import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const t = useTranslations("Index");

  return (
    <>
      <div className="flex flex-col gap-12 h-full lg:px0 md:px-8 sm:px-6 px-4">
        <HeadSection />
        <div className="flex flex-col gap-24">
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                Do your daily <span className="text-parch">work</span> easily
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                By providing you with the tools you need and simplifying the
                installation process and the complete repository alongside a
                personalized and beautiful desktop environment, Parch Linux can
                bring you a good experience of bringing together speed and
                personalization.
              </p>
            }
            image="/images/wallpaper 4.jpg"
            imageAlt="ParchLinux Desktop"
            reverse
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                <span className="text-parch">Coding</span> like a geek!
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                All the tools you need for programming are available in Parch,
                and with just one command, you can download and install the
                desired program.
              </p>
            }
            image="/images/wallpaper 2.jpg"
            imageAlt="ParchLinux Desktop"
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                Choose which one you want!{" "}
                <span className="text-parch">Gnome</span> or{" "}
                <span className="text-parch">Plasma</span>?
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                ParchLinux officially supports two well-known desktop
                environments, Plasma and GNOME. You are free to work with
                whichever you feel most comfortable with.
              </p>
            }
            image="/images/wallpaper 3.jpg"
            imageAlt="ParchLinux Desktop"
            reverse
          />
          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                Always stay <span className="text-parch">up to date</span>!
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                The packages in the ParchLinux are rolling and you always get
                the latest features without having to get a new version.
              </p>
            }
            image="/images/parchview.png"
            imageAlt="ParchLinux Desktop"
          />

          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                Now you have <span className="text-parch">AUR*</span> power!
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                More than 80,000 packages are placed in the huge repository of
                Arch users (AUR) and you will have no problem downloading the
                package.
              </p>
            }
            image="/images/wallpaper 4.jpg"
            imageAlt="ParchLinux Desktop"
            reverse
          />
          <div className="container max-w-7xl mx-auto">
            <span className="font-bold text-zinc-400 text-justify lg:text-sm text-xs">
              *Arch User Repository is a community-driven repository for Arch
              Linux users. It contains package descriptions (PKGBUILDs) that
              allow you to compile a package from source with makepkg and then
              install it via pacman.
            </span>
          </div>

          <HeroSection
            title={
              <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
                <span className="text-parch">Pacman</span> is ready to install
                your packages!{" "}
              </h2>
            }
            description={
              <p className="text-justify md:text-sm text-xs">
                The package manager in Parch is ready to provide the best user
                experience for installing, updating, and managing system
                applications.
              </p>
            }
            image="/images/wallpaper 2.jpg"
            imageAlt="ParchLinux Desktop"
          />
        </div>
        <IconSection />
        <LinkSection />
        {/* <EventSection /> */}
        {/* <BlogSection /> */}
        <SponsorsCarousel />
        <DownloadSection />
      </div>
      {/* <div className="bg-grid-reverse z-[-1] absolute w-[150%] h-[1000px] opacity-5 bottom-44 -left-10 transform translate-y-1/2 pointer-events-none" /> */}
    </>
  );
}
