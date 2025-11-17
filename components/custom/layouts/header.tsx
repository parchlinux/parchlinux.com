"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="container flex xl:h-16 h-24 items-center justify-between px-4 mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={"/logo.svg"} width={19} height={19} alt="logo" />
            <span className=" text-xl">Parch Linux</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center xl:space-x-8 space-x-4">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Forum
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Wiki
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Community
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/team"
            className="text-sm font-medium hover:text-foreground transition-colors"
          >
            Team
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button className="rounded-full bg-accent-foreground" asChild>
            <Link href="/download">
              <span className="xl:block hidden ">Donate</span> <Coffee />
            </Link>
          </Button>
          <span className="mb-1 xl:block hidden text-gray-400">&#8226;</span>
          <Button className="rounded-full bg-parch" variant={"default"} asChild>
            <Link href="/download">Downlaod</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
