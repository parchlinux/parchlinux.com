"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const HeadSection = () => {
  const t = useTranslations("HeadSection");

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12 mb-8">
        <div className="xl:col-span-7 sm:col-span-8 col-span-12 flex items-center sm:order-first order-last">
          <div className="flex flex-col xl:gap-7 lg:gap-5 gap-3 sm:items-start items-center">
            <h1 className="xl:text-[3.1rem] lg:text-4xl sm:text-[1.8rem] text-[1.85rem] font-extrabold xl:order-first">
              {t.rich("title", {
                ready: (chunks) => <span className="text-parch">{chunks}</span>,
              })}
            </h1>
            <div className="grid grid-cols-4 xl:gap-4 md:gap-2 sm:gap-5 gap-3 mb-1.5 xl:order-2 order-last 2xl:pr-30 xl:pr-32 sm:pr-16 w-full">
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/install.png"}
                  width={30}
                  height={30}
                  alt="install"
                />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.easyInstallation")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/rocket.png"}
                  width={30}
                  height={30}
                  alt="rocket"
                />
                <h3 className="lg:text-xs sm:text-[10px] text-xs xl:block hidden">
                  {t("features.highPerformance")}
                </h3>
                <h3 className="lg:text-xs sm:text-[10px] text-xs xl:hidden block">
                  {t("features.highSpeed")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/user.png"}
                  width={30}
                  height={30}
                  alt="user"
                />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.userFriendly")}
                </h3>
              </div>
              <div className="flex sm:flex-col justify-center items-center sm:col-span-1 col-span-full w-full bg-secondary rounded-lg py-4 gap-3">
                <Image
                  className="lg:px-0 px-1"
                  src={"/images/arch.png"}
                  width={30}
                  height={30}
                  alt="arch"
                />
                <h3 className="lg:text-xs sm:text-[10px] text-xs">
                  {t("features.poweredByArch")}
                </h3>
              </div>
            </div>
            <p className="text-justify font-light sm:w-5/6 sm:text-[0.99rem] text-xs xl:order-last sm:mb-0 mb-4">
              {t.rich("description", {
                arch: (chunks) => <span className="text-parch">{chunks}</span>,
                userFriendly: (chunks) => <span className="text-parch">{chunks}</span>,
                performance: (chunks) => <span className="text-parch">{chunks}</span>,
              })}
            </p>
          </div>
        </div>
        <div className="xl:col-span-5 sm:col-span-4 col-span-12">
          <div className="flex sm:justify-end justify-center">
            <Image
              className="lg:px-0 px-1"
              src={"/images/parch-macos-2.png"}
              width={700}
              height={600}
              alt="Parch Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSection;