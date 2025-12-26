import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SponsorsCarousel() {
  const t = useTranslations("SponsorsCarousel");

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="container max-w-7xl mx-auto py-14 px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold">{t("title")}</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id} className="p-4 flex flex-col items-center">
            <Link href={sponsor.url || "#"} target="_blank">
              <CardContent className="flex justify-center items-center h-28">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </CardContent>
              <h3 className="font-semibold text-lg text-center">
                {sponsor.name}
              </h3>
            </Link>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="mailto:contact@parchlinux.com" target="_blank">
          <Button
            size="lg"
            className="text-lg flex flex-col items-center px-8 bg-parch p-6 rounded-full ring-secondary text-white"
          >
            {t("becomeSponsor")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
