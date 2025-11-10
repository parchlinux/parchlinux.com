import {
  FooterColumn,
  FooterContent,
  FooterSect,
} from "@/components/ui/footer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-4 pb-8">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <FooterSect className="w-full">
          <FooterContent className="w-full">
            <FooterColumn>
              <div className="flex items-center gap-1">
                <h3 className="text-xs">info@parchlinux.com</h3>
                <ArrowUpRight size={16} />
              </div>
              <div className="flex gap-3">
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
                <InstagramLogoIcon width={18} height={18} />
              </div>
              <span className="text-muted-foreground text-sm mt-auto">
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
            <FooterColumn>
              <Select>
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Persian">Persian</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FooterColumn>
          </FooterContent>
        </FooterSect>
      </div>
    </footer>
  );
}
