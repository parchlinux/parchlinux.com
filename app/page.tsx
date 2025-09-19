import IconSection from "@/components/custom/main/icon-section";
import LinkSection from "@/components/custom/main/link-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <IconSection />
      <LinkSection />
    </div>
  );
}
