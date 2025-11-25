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
import {
  ArrowUpRight,
  LaptopMinimal,
  Moon,
  MoveUpRight,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useLocale } from "next-intl";

import {
  SiBluesky,
  SiDiscord,
  SiInstagram,
  SiLinkedin,
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

  const socials = [
    {
      href: "https://youtube.com/@ParchLinux",
      label: "YouTube",
      icon: (
        <SiYoutube size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://tubedu.org/c/parch",
      label: "Tubedu",
      icon: (
        <SiPeertube size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://ieji.de/@parchlinux",
      label: "IEJI",
      icon: (
        <SiMastodon size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://threads.net/@parchlinux",
      label: "Threads",
      icon: (
        <SiThreads size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://x.com/parchgnulinux",
      label: "X",
      icon: <SiX size={24} className="hover:text-white transition-colors" />,
    },
    {
      href: "https://www.linkedin.com/company/parch-linux",
      label: "LinkedIn",
      icon: (
        <SiLinkedin size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://instagram.com/parchlinux",
      label: "Instagram",
      icon: (
        <SiInstagram size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://t.me/parchlinux_en",
      label: "Telegram",
      icon: (
        <SiTelegram size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://discord.gg/9RW5cRByAM",
      label: "Discord",
      icon: (
        <SiDiscord size={24} className="hover:text-white transition-colors" />
      ),
    },
    {
      href: "https://bsky.app/profile/parchlinux.com",
      label: "Bluesky",
      icon: (
        <SiBluesky size={24} className="hover:text-white transition-colors" />
      ),
    },
  ];

  const footerColumns = [
    {
      title: "Product",
      items: [{ label: "Download", href: "/download", internal: true }],
    },
    {
      title: "Resources",
      items: [
        {
          label: "Forum",
          href: "https://forum.parchlinux.com",
          internal: false,
        },
        { label: "Community", href: "/contributors", internal: true },
        { label: "Blog", href: "https://blog.parchlinux.com", internal: false },
      ],
    },
    {
      title: "Team",
      items: [
        { label: "Technical", href: "/team", internal: true },
        { label: "Design", href: "/team", internal: true },
        { label: "Web", href: "/team", internal: true },
      ],
    },
  ];

  return (
    <footer className="w-full bg-background mt-auto pt-12 md:pb-8 pb-4">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row justify-between gap-6">
        <FooterSect className="w-full">
          <FooterContent className="flex flex-wrap justify-between gap-8 w-full">
            {/* Social Section */}
            <FooterColumn className="flex flex-col md:items-start items-center gap-2">
              <div className="flex items-center gap-1">
                <h3 className="text-xs">
                  <a href="mailto:info@parchlinux.com" className="underline">
                    info@parchlinux.com
                  </a>
                </h3>
                <ArrowUpRight size={16} />
              </div>

              <div className="flex gap-4 mt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </FooterColumn>

            {/* Footer Columns */}
            {footerColumns.map((col) => (
              <FooterColumn key={col.title}>
                <h3 className="text-sm pt-1 font-semibold">{col.title}</h3>

                {col.items.map((item) =>
                  item.internal ? (
                    <Link
                      key={item.label}
                      href={`/${locale}${item.href}`}
                      className="text-muted-foreground text-sm block hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm block hover:underline"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </FooterColumn>
            ))}

            {/* Theme + Language */}
            <FooterColumn className="flex flex-col items-center md:items-end gap-2">
              <Select>
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Persian">Persian</SelectItem>
                </SelectContent>
              </Select>

              <ButtonGroup className="mt-2">
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

              {/* Fixed Forum CTA (kept external, but clean structure) */}
              <div className="mt-2 text-center md:text-right">
                <p className="text-xs">Do you have a problem?</p>
                <p className="flex gap-1 text-xs justify-center md:justify-end">
                  Visit the
                  <span className="flex text-parch">
                    <a
                      href="https://forum.parchlinux.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forum
                    </a>
                    <MoveUpRight size={16} className="mt-0.5" />
                  </span>
                </p>
              </div>
            </FooterColumn>
          </FooterContent>
        </FooterSect>
      </div>
    </footer>
  );
}
