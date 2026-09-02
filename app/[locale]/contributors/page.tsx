import { Card, CardContent } from "@/components/ui/card";
import contributors from "@/data/contributors";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Contributors({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations("ContributorsPage");
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <h1 className="text-center text-3xl font-bold mb-12">{t("title")}</h1>
      <div className="grid grid-cols-4 gap-8">
        {contributors.map((contributor) => (
          <Card
            className="lg:col-span-1 sm:col-span-2 col-span-4 relative gap-3.5 w-full rounded-lg bg-secondary border-0 shadow p-3"
            key={contributor.name}
          >
            <CardContent className="flex items-center gap-3 px-0">
              <Image
                src={contributor.image || ""}
                width={60}
                height={60}
                className="rounded-sm"
                alt={contributor.name}
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-base">{contributor.name}</h3>
                <span
                  className="text-sm text-foreground/90 rtl:text-end"
                  dir="ltr"
                >
                  {contributor.id}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
