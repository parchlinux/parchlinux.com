import { Button } from "@/components/ui/button";
import { Code2, Coffee, Github } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const LinkSection = () => {
  const t = useTranslations("LinkSection");

  return (
    <div className="relative">
      <div className="bg-grid-center md:bg-size-[30%]! bg-size-[80%]! z-[-1] w-screen h-full pointer-events-none absolute top-0 md:-left-8 -left-4 " />
      <div className="w-full max-w-6xl mx-auto px-4 lg:pt-48 md:pt-32 pt-24 lg:pb-64 md:pb-48 pb-28 relative">
        <div className="flex flex-col gap-12">
          <div className="xl:text-5xl lg:text-4xl text-2xl sm:text-3xl font-semibold text-center sm:text-center">
            {t("title")}
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="md:flex grid gap-6">
              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-6 rounded-full text-xs sm:text-[18px] py-6 sm:py-7 outline-2 outline-offset-2 outline-solid outline-secondary"
              >
                <Github />
                {t("sourceCode")}
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="md:w-fit md:col-span-4 col-span-6 rounded-full text-xs sm:text-[18px] py-6 sm:py-7 outline-2 outline-offset-2 outline-solid outline-secondary"
              >
                <Coffee />
                {t("donate")}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-12 rounded-full text-[16px] sm:text-[18px] py-6  sm:py-7 outline-2 outline-offset-2 outline-solid outline-primary"
              >
                <Code2 />
                {t("joinTeam")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
