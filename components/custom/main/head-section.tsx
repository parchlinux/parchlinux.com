"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Handshake, Monitor, Rocket } from "lucide-react";
import { SiArchlinux, SiLinux } from "@icons-pack/react-simple-icons";

const HeadSection = () => {
  const t = useTranslations("HeadSection");

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12 mb-8">
        <div className="xl:col-span-7 sm:col-span-8 col-span-12 flex items-center sm:order-first order-last">
          <div className="flex flex-col xl:gap-7 lg:gap-5 gap-3 sm:items-start items-center">
            <h1 className="xl:text-[3.1rem] lg:text-4xl sm:text-[1.8rem] text-[1.6rem] font-extrabold xl:order-first">
              {t.rich("title", {
                ready: (chunks) => <span className="text-parch">{chunks}</span>,
              })}
            </h1>
            <div className="grid grid-cols-4 xl:gap-4 sm:gap-2 gap-3 mb-1.5 xl:order-2 order-last 2xl:pe-30 xl:pe-32 sm:pe-16 w-full">
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 xl:px-0 px-4 gap-1.5">
                <Monitor size={32} />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.easyInstallation")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 xl:px-0 px-4 gap-1.5">
                <Rocket size={32} />
                <h3 className="lg:text-xs sm:text-[10px] text-xs xl:block hidden">
                  {t("features.highPerformance")}
                </h3>
                <h3 className="lg:text-xs sm:text-[10px] text-xs xl:hidden block">
                  {t("features.highSpeed")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 xl:px-0 px-4 gap-1.5">
                <Handshake size={32} />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.userFriendly")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 xl:px-0 px-4 gap-1.5">
                <SiArchlinux size={32} />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.poweredByArch")}
                </h3>
              </div>
            </div>
            <p className="text-justify font-light sm:w-5/6 sm:text-[0.99rem] text-xs xl:order-last sm:mb-0 mb-4">
              {t.rich("description", {
                arch: (chunks) => <span className="text-parch">{chunks}</span>,
                userFriendly: (chunks) => (
                  <span className="text-parch">{chunks}</span>
                ),
                performance: (chunks) => (
                  <span className="text-parch">{chunks}</span>
                ),
              })}
            </p>
          </div>
        </div>
        <div className="xl:col-span-5 sm:col-span-4 col-span-12">
          <div className="flex sm:justify-end justify-center">
            <Image
              className="hidden sm:block 2xl:hidden lg:px-0 px-1 translate-x-20"
              src={"/images/bg-md.png"}
              width={700}
              height={800}
              quality={100}
              alt="Parch Preview Medium"
            />
            <Image
              className="block sm:hidden 2xl:block lg:px-0 px-1 mb-5"
              src={"/images/bg-sm.png"}
              width={700}
              height={800}
              quality={100}
              alt="Parch Preview Small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
