import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

const DownloadSection = () => {
  const locale = useLocale();
  const t = useTranslations("DownloadSection");

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center md:items-center py-16 gap-10 md:gap-0">
        <div className="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2 w-full md:w-auto">
          <Image
            width={160}
            height={260}
            src={"/logo.svg"}
            alt={t("logoAlt")}
            className="w-30 sm:w-40 md:w-44 lg:w-48 h-auto"
          />
        </div>

        <div className="md:col-span-8 flex flex-col justify-center md:items-start items-center gap-6 md:gap-14 text-center md:text-left order-2 md:order-1 w-full">
          <h2 className="text-2xl sm:text-4xl xl:text-6xl 2xl:text-7xl font-semibold text-start">
            {t("title")}
          </h2>
          <Link href={`/${locale}/download`} className="w-fit">
            <Button className="rounded-full md:text-[18px] text-sm bg-foreground text-background md:py-7 py-5 outline-2 outline-offset-2 outline-solid outline-black/45 dark:outline-white/45 md:px-5 px-8 w-fit mx-auto md:mx-0 transition-all duration-300">
              <Download />
              {t("downloadButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
