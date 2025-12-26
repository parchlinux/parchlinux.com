"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  FooterColumn,
  FooterContent,
  FooterSect,
} from "@/components/ui/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LaptopMinimal, Linkedin, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  SiBluesky,
  SiDiscord,
  SiInstagram,
  SiMastodon,
  SiPeertube,
  SiTelegram,
  SiThreads,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export default function Footer() {
  const { setTheme, theme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Footer");

  const changeLanguage = (lang: "en" | "fa") => {
    if (!pathname) return;
    const cleanPath = pathname.replace(/^\/(en|fa)/, "");
    router.push(`/${lang}${cleanPath}`);
  };

  const socials = [
    {
      href: "https://youtube.com/@ParchLinux",
      label: "YouTube",
      icon: (
        <SiYoutube
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://tubedu.org/c/parch",
      label: "Tubedu",
      icon: (
        <SiPeertube
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://ieji.de/@parchlinux",
      label: "Mastodon",
      icon: (
        <SiMastodon
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://threads.net/@parchlinux",
      label: "Threads",
      icon: (
        <SiThreads
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://x.com/parchgnulinux",
      label: "X",
      icon: (
        <SiX
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://www.linkedin.com/company/parch-linux",
      label: "LinkedIn",
      icon: (
        <Linkedin
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://instagram.com/parchlinux",
      label: "Instagram",
      icon: (
        <SiInstagram
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://t.me/parchlinux_en",
      label: "Telegram",
      icon: (
        <SiTelegram
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://discord.gg/9RW5cRByAM",
      label: "Discord",
      icon: (
        <SiDiscord
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
    {
      href: "https://bsky.app/profile/parchlinux.com",
      label: "Bluesky",
      icon: (
        <SiBluesky
          size={19}
          className="text-muted-foreground hover:text-white transition-colors"
        />
      ),
    },
  ];

  const footerColumns = [
    {
      titleKey: "product",
      items: [{ labelKey: "download", href: "/download", internal: true }],
    },
    {
      titleKey: "resources",
      items: [
        {
          labelKey: "forum",
          href: "https://forum.parchlinux.com",
          internal: false,
        },
        { labelKey: "contributors", href: "/contributors", internal: true },
        {
          labelKey: "blog",
          href: "https://blog.parchlinux.com",
          internal: false,
        },
      ],
    },
    {
      titleKey: "team",
      items: [
        { labelKey: "technical", href: "/team", internal: true },
        { labelKey: "design", href: "/team", internal: true },
        { labelKey: "web", href: "/team", internal: true },
      ],
    },
  ];

  return (
    <footer className="w-full mt-auto pt-12 md:pb-8 pb-4">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row justify-between gap-6">
        <FooterSect className="w-full">
          <FooterContent className="lg:flex flex-wrap justify-between gap-8 w-full">
            <FooterColumn className="lg:order-first order-last flex flex-col sm:items-start items-center gap-2 sm:m-0 mx-auto col-span-2">
              <div className="flex items-center gap-1">
                <h3 className="text-xs">
                  <Link
                    href="mailto:contact@parchlinux.com"
                    className="underline"
                  >
                    contact@parchlinux.com
                  </Link>
                </h3>
                <ArrowUpRight size={16} />
              </div>
              <div className="flex md:gap-4 gap-3 mt-2">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </FooterColumn>
            {footerColumns.map((col) => (
              <FooterColumn key={col.titleKey}>
                <h3 className="text-sm pt-1 font-semibold">
                  {t(`columns.${col.titleKey}.title`)}
                </h3>
                {col.items.map((item) =>
                  item.internal ? (
                    <Link
                      key={item.labelKey}
                      href={`/${locale}${item.href}`}
                      className="text-muted-foreground text-sm block hover:underline"
                    >
                      {t(`columns.${col.titleKey}.items.${item.labelKey}`)}
                    </Link>
                  ) : (
                    <Link
                      key={item.labelKey}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm block hover:underline"
                    >
                      {t(`columns.${col.titleKey}.items.${item.labelKey}`)}
                    </Link>
                  )
                )}
              </FooterColumn>
            ))}
            <span className="hidden">{theme}</span>
            <FooterColumn className="sm:order-last order-first flex flex-col items-start gap-2 lg:w-fit w-full max-w-74 sm:col-span-1 col-span-2">
              <Select onValueChange={changeLanguage} defaultValue={locale}>
                <SelectTrigger className="w-full rounded-full" dir="auto">
                  <SelectValue placeholder={t("languageSelect.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    {t("languageSelect.english")}
                  </SelectItem>
                  <SelectItem value="fa">
                    {t("languageSelect.persian")}
                  </SelectItem>
                </SelectContent>
              </Select>

              <ButtonGroup className="mt-2" dir="ltr">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-s-full border-e-0",
                    theme === "system" && "bg-foreground! text-background!"
                  )}
                  onClick={() => setTheme("system")}
                >
                  <LaptopMinimal />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "border-x-0",
                    theme === "light" && "bg-foreground! text-background!"
                  )}
                  onClick={() => setTheme("light")}
                >
                  <Sun />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-e-full",
                    theme === "dark" && "bg-foreground! text-background!"
                  )}
                  onClick={() => setTheme("dark")}
                >
                  <Moon />
                </Button>
              </ButtonGroup>

              <div className="mt-2 text-center sm:text-right">
                <p className="text-xs">{t("problemMessage.line1")}</p>
                <p className="flex gap-1 text-xs ">
                  {t("problemMessage.line2.part1")}
                  <span className="flex text-parch">
                    <Link
                      href="https://forum.parchlinux.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("problemMessage.line2.forum")}
                    </Link>
                    <ArrowUpRight
                      size={16}
                      className="mt-0.5 text-foreground rtl:hidden"
                    />
                  </span>
                  {t("problemMessage.line2.part2") &&
                    `${t("problemMessage.line2.part2")}`}
                </p>
              </div>
            </FooterColumn>
          </FooterContent>
        </FooterSect>
      </div>
    </footer>
  );
}
