"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const { isMobile } = useSidebar();

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
      <div className="container flex xl:h-16 h-20 max-w-7xl items-center justify-between px-4 mx-auto">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <Image src={"/logo.svg"} width={19} height={19} alt="logo" />
            <span className="text-xl">Parch GNU/Linux</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center xl:space-x-8 space-x-4">
          <Link
            href="https://forum.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            Forum
          </Link>

          <Link
            href="https://wiki.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            Wiki
          </Link>

          <Link
            href={`/${locale}/contributors`}
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            Contributors
          </Link>
          <Link
            href="https://blog.parchlinux.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            Blog
          </Link>

          <Link
            href={`/${locale}/team`}
            className="text-sm font-medium hover:text-foreground/50 transition-colors"
          >
            Team
          </Link>
        </nav>
        {isMobile ? (
          <SidebarTrigger />
        ) : (
          <div className="flex items-center space-x-3">
            <Button
              variant={"secondary"}
              className="rounded-full bg-accent-foreground hover:bg-accent-foreground/80"
              asChild
            >
              <Link
                href="https://daramet.com/parchlinux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Coffee className="text-muted" />
              </Link>
            </Button>

            <span className="mb-1 xl:block hidden text-gray-400">&#8226;</span>

            <Button
              className="rounded-full bg-parch text-white hover:text-white/80"
              variant="default"
              asChild
            >
              <Link href={`/${locale}/download`}>Download</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
