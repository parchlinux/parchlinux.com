"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const { isMobile } = useSidebar();
  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolledClasses =
    "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm";
  const defaultClasses = "bg-transparent xl:pt-4";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? scrolledClasses : defaultClasses
      }`}
    >
      <div className="container flex xl:h-16 h-20 2xl:max-w-360 max-w-7xl 2xl:px-0 px-4 items-center justify-between mx-auto">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <Image
              src={"/logo-white.svg"}
              width={30}
              height={30}
              alt="logo-dark"
              className="dark:block hidden"
            />
            <Image
              src={"/logo-dark.svg"}
              width={20}
              height={20}
              alt="logo-light"
              className="dark:hidden block"
            />
            <span className="text-xl">{t("brandName")}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center xl:space-x-8 space-x-4">
          <Link
            href="https://forum.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            {t("forum")}
          </Link>

          <Link
            href="https://wiki.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            {t("wiki")}
          </Link>

          <Link
            href={`/${locale}/contributors`}
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            {t("contributors")}
          </Link>
          <Link
            href="https://blog.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            {t("blog")}
          </Link>

          <Link
            href={`/${locale}/team`}
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            {t("team")}
          </Link>
        </nav>
        {isMobile ? (
          <SidebarTrigger />
        ) : (
          <div className="flex items-center space-x-3">
            <Button
              variant={"secondary"}
              className="rounded-full bg-accent-foreground hover:bg-accent-foreground/80 text-muted"
              asChild
            >
              <Link
                href="https://daramet.com/parchlinux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {t("donate")}
                <Coffee className="text-muted" />
              </Link>
            </Button>

            <span className="mb-1 xl:block hidden text-gray-400">&#8226;</span>
            <Button
              className="rounded-full bg-parch text-white hover:text-white/80"
              variant="default"
              asChild
            >
              <Link href={`/${locale}/download`}>{t("download")}</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
