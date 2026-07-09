"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { DownloadCardProps } from "@/types";
import { Check, Copy, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

const DownloadCard = ({
  logo,
  title,
  description,
  image,
  hashs,
  links,
}: DownloadCardProps) => {
  const t = useTranslations("DownloadCard");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyHash = async (hash: string, version: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(version);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="relative">
      <CardContent dir="ltr">
        <div className="flex flex-col items-start gap-3 mb-4" dir="auto">
          <Image src={logo} width={50} height={50} alt={title} />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm text-foreground/80">{description}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 rtl:text-right">{t("hash")}</h3>
          <div className="space-y-2">
            {hashs.map((hashItem) => (
              <div
                key={hashItem.version}
        className="flex items-center gap-2 bg-primary/15 p-2 rounded-md border-primary border cursor-pointer group"
        onClick={() => copyHash(hashItem.hash, hashItem.version)}
        title="Click to copy"
              >
                <div
                  className={`flex items-center justify-center bg-primary text-black w-9 h-9 rounded font-bold text-xs ${
                    hashItem.version === "ARM64" ? "text-center leading-3" : ""
                  }`}
                >
                  {hashItem.version === "ARM64" ? (
                    <span>
                      ARM
                      <br />
                      <span className="text-[12px]">64</span>
                    </span>
                  ) : (
                    <span>{hashItem.version}</span>
                  )}
                </div>
                <div className="text-xs font-mono truncate text-primary font-medium flex-1">
                  {hashItem.hash}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedIndex === hashItem.version ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 w-60">
          <h3 className="text-lg font-bold mb-2">{t("download")}</h3>
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.version}
                download
                href={link.href}
                className={`flex sm:flex-row flex-col w-fit bg-${link.color} rounded-md p-2.5 flex items-center gap-3 transition-all hover:opacity-80  `}
              >
                <div className="flex sm:w-fit w-full items-center justify-between">
                  <div className="bg-white p-2 w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold text-black">
                    {link.version === "ARM64" ? (
                      <div className="flex flex-col items-center justify-center leading-3">
                        <span className="text-[10px]">ARM</span>
                        <span className="text-[10px]">64</span>
                      </div>
                    ) : (
                      link.version
                    )}
                  </div>
                  <Download size={18} className="sm:hidden block" aria-hidden="true" />
                </div>

                <div className="flex flex-row text-left">
                  <div className="flex flex-col">
                    <h5 className="font-bold text-white text-sm mb-1.5">
                      {link.title}
                    </h5>
                    <span className="text-xs w-fit">
                      {t("size")}: {link.size}
                    </span>
                    <span className="text-xs w-fit">
                      {t("buildDate")}: {link.date}
                    </span>
                  </div>

                  <Download
                    size={15}
                    className="sm:block hidden mt-auto mb-2.5 ms-1.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        {image && (
          <Image
            src={image}
            width={120}
            height={60}
            alt={title}
            className="absolute bottom-0 right-0.5 sm:w-32 h-40 w-30 z-10"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
