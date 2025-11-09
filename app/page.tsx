import BlogSection from "@/components/custom/main/blog-section";
import DownloadSection from "@/components/custom/main/download-section";
import EventSection from "@/components/custom/main/event-section";
import HeadSection from "@/components/custom/main/head-section";
import HeroSection from "@/components/custom/main/hero-section";
import IconSection from "@/components/custom/main/icon-section";
import LinkSection from "@/components/custom/main/link-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 h-full lg:px0 md:px-8 px-6">
      <HeadSection />
      <div className="flex flex-col gap-24">
        <HeroSection
          title={
            <h2 className="xl:text-[2.8rem] lg:text-[1.8rem] text-2xl font-bold xl:leading-14">
              Do your daily <span className="text-parch">work</span> easily
            </h2>
          }
          description={
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
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
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
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
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
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
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
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
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
            </p>
          }
          image="/images/wallpaper 4.jpg"
          imageAlt="ParchLinux Desktop"
          reverse
        />
        <div className="container max-w-7xl mx-auto">
          <span className="font-bold text-zinc-400 text-justify lg:text-sm text-xs">
            *Arch User Repository is a community-driven repository for Arch
            Linux users. It contains package descriptions (PKGBUILDs) that allow
            you to compile a package from source with makepkg and then install
            it via pacman.
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
            <p className="text-justify text-sm">
              ParchLinux, which stands for Persian Arch, is a Linux distribution
              based on the popular and versatile Arch Linux. It aims to provide
              a streamlined, user-friendly experience while maintaining the
              customizability and performance that Arch Linux is known for.
            </p>
          }
          image="/images/wallpaper 2.jpg"
          imageAlt="ParchLinux Desktop"
        />
      </div>
      <IconSection />
      <LinkSection />
      <EventSection />
      <BlogSection />
      <DownloadSection />
    </div>
  );
}
