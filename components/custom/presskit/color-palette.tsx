"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

interface ColorItem {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  isLight?: boolean;
}

const BRAND_COLORS: ColorItem[] = [
  {
    id: "primary",
    name: "primary",
    hex: "#00EAFF",
    rgb: "rgb(0, 234, 255)",
    isLight: true,
  },
  {
    id: "mint",
    name: "mint",
    hex: "#00FF95",
    rgb: "rgb(0, 255, 149)",
    isLight: true,
  },
  {
    id: "blue",
    name: "blue",
    hex: "#00A9FF",
    rgb: "rgb(0, 169, 255)",
    isLight: false,
  },
  {
    id: "sky",
    name: "sky",
    hex: "#0080FF",
    rgb: "rgb(0, 128, 255)",
    isLight: false,
  },
  {
    id: "charcoal",
    name: "charcoal",
    hex: "#101314",
    rgb: "rgb(16, 19, 20)",
    isLight: false,
  },
  {
    id: "cloud",
    name: "cloud",
    hex: "#F5F8FA",
    rgb: "rgb(245, 248, 250)",
    isLight: true,
  },
];

export default function ColorPalette() {
  const t = useTranslations("PresskitPage.paletteSection");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {BRAND_COLORS.map((color) => (
        <Card
          key={color.id}
          onClick={() => copyHex(color.hex)}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-3.5 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer"
          title={`${t("copyHex")}: ${color.hex}`}
        >
          {/* Swatch */}
          <div
            className="w-full h-20 rounded-xl border border-black/10 dark:border-white/10 transition-transform duration-300 group-hover:scale-102 flex items-end justify-end p-2"
            style={{ backgroundColor: color.hex }}
          >
            <div className="p-1 rounded-md bg-black/30 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedHex === color.hex ? (
                <Check size={12} className="text-green-400" />
              ) : (
                <Copy size={12} />
              )}
            </div>
          </div>

          {/* Details */}
          <div className="mt-3 space-y-1">
            <span className="text-xs font-semibold text-foreground block truncate">
              {t(`colors.${color.id}` as any)}
            </span>
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{color.hex}</span>
              {copiedHex === color.hex && (
                <span className="text-[10px] text-green-500 font-sans font-medium">
                  {useTranslations("PresskitPage.logosSection")("copied")}
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
