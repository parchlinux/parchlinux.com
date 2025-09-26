import DownloadSection from "@/components/custom/main/download-section";
import EventSection from "@/components/custom/main/event-section";
import HeadSection from "@/components/custom/main/head-section";
import HeroSection from "@/components/custom/main/hero-section";
import IconSection from "@/components/custom/main/icon-section";
import LinkSection from "@/components/custom/main/link-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <HeadSection />
      <HeroSection />
      <HeroSection reverse />
      <HeroSection />
      <HeroSection reverse />
      <HeroSection />
      <IconSection />
      <LinkSection />
      <EventSection />
      <EventSection />
      <DownloadSection />
    </div>
  );
}
