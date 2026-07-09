import { Button } from "@/components/ui/button";
import { Code2, Coffee, Github } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
                asChild
              >
                <Link
                  href={"https://github.com/parchlinux/parch-iso-plasma"}
                  target="_blank"
                >
                  <Github aria-hidden="true" />
                  {t("sourceCode")}
                </Link>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="md:w-fit md:col-span-4 col-span-6 rounded-full text-xs sm:text-[18px] py-6 sm:py-7 outline-2 outline-offset-2 outline-solid outline-secondary"
                asChild
              >
                <Link
                  href="https://daramet.com/parchlinux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Coffee aria-hidden="true" />
                  {t("donate")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-12 rounded-full text-[16px] sm:text-[18px] py-6 sm:py-7 outline-2 outline-offset-2 outline-solid outline-primary relative"
                asChild
              >
                <Link
                  href="mailto:contact@parchlinux.com"
                  target="_blank"
                  className="relative"
                >
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient
                        id="gradient-code2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#21c796" />
                        <stop offset="50%" stopColor="#0385ce" />
                        <stop offset="100%" stopColor="#0d40bf" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Code2
                    stroke={`url(#gradient-code2)`}
                    className="drop-shadow-sm"
                    aria-hidden="true"
                  />
                  {t("joinTeam")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
