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
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  ArrowUpRight,
  LaptopMinimal,
  Moon,
  MoveUpRight,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { setTheme, theme } = useTheme();

  return (
    <footer className="bottom-0 z-50 w-full mt-4 md:pb-8 pb-4 relative">
      <div className="container flex items-center justify-between md:px-8 px-6 mx-auto max-w-7xl">
        <span className="hidden">{theme}</span>
        <FooterSect className="w-full bg-transparent">
          <FooterContent className="w-full">
            <FooterColumn className="md:order-first order-last md:col-span-1 col-span-2 md:items-start items-center">
              <div className="flex items-center gap-1">
                <h3 className="text-xs">info@parchlinux.com</h3>
                <ArrowUpRight size={16} />
              </div>
              <div className="flex gap-3 text-muted-foreground">
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
              </div>
              <span className="text-muted-foreground text-xs mt-auto">
                2025 Design by Faridnafar
              </span>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-sm pt-1 font-semibold">Product</h3>
              <a href={""} className="text-muted-foreground text-sm">
                Features
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Downloads
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Parch mobile
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                FAQ
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-sm pt-1 font-semibold">Resources</h3>
              <a href={""} className="text-muted-foreground text-sm">
                Blog
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Forum
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Community
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-sm pt-1 font-semibold">Team</h3>
              <a href={""} className="text-muted-foreground text-sm">
                Technical
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Design
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Web
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-sm pt-1 font-semibold">Legal</h3>
              <a href={""} className="text-muted-foreground text-sm">
                Terms
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Security
              </a>
              <a href={""} className="text-muted-foreground text-sm">
                Privacy
              </a>
            </FooterColumn>
            <FooterColumn className="md:order-last order-first md:col-span-1 col-span-2">
              <Select>
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Persian">Persian</SelectItem>
                </SelectContent>
              </Select>
              <ButtonGroup>
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
              <div>
                <p className="text-xs">Do you have a problem?</p>
                <p className="flex gap-1 text-xs">
                  Visit the
                  <span className="flex text-parch">
                    Forum <MoveUpRight size={16} className="mt-0.5" />
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
