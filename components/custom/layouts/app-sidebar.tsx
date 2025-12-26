"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Coffee, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function AppSidebar() {
  const locale = useLocale();
  const { toggleSidebar } = useSidebar();
  const t = useTranslations("AppSidebar");

  const items = [
    {
      title: t("forum"),
      url: "https://forum.parchlinux.com/",
      out: true,
    },
    {
      title: t("wiki"),
      url: "https://wiki.parchlinux.com/",
      out: true,
    },
    {
      title: t("contributors"),
      url: `/${locale}/contributors`,
    },
    {
      title: t("blog"),
      url: "https://blog.parchlinux.com/",
      out: true,
    },
    {
      title: t("team"),
      url: `/${locale}/team`,
    },
  ];

  return (
    <Sidebar side="right">
      <SidebarContent className="bg-[#1B3033] dark:bg-[#122022]">
        <Button
          variant={"ghost"}
          onClick={toggleSidebar}
          className="right-5 top-5 absolute z-50"
        >
          <X className="w-6! h-6!" />
        </Button>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-12 mt-28">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:text-muted-foreground"
                    onClick={toggleSidebar}
                    asChild
                  >
                    <Link
                      href={item.url}
                      className="justify-center hover:bg-transparent focus:bg-transparent"
                      target={item?.out ? "_blank" : "_self"}
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="flex flex-col gap-4 items-center mt-12">
              <Button
                className="rounded-full bg-parch text-white hover:text-white/80 w-full max-w-80 font-medium text-base py-6"
                variant="default"
                onClick={toggleSidebar}
                size={"lg"}
                asChild
              >
                <Link href={`/${locale}/download`}>{t("download")}</Link>
              </Button>
              <Button
                className="rounded-full bg-accent-foreground hover:bg-accent-foreground/80 w-full max-w-80 font-medium text-base py-6"
                size={"lg"}
                onClick={toggleSidebar}
                asChild
              >
                <Link
                  href="https://daramet.com/parchlinux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {t("donate")} <Coffee className="text-muted w-5! h-5!" />
                </Link>
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
