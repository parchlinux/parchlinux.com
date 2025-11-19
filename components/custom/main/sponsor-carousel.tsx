import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SponsorsCarousel() {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <div className="container max-w-7xl mx-auto py-14 px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold">Our Sponsors</h2>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {sponsors.map((sponsor) => (
          <Card className="md:col-span-1 col-span-3" key={sponsor.id}>
            <CardContent className="flex justify-center">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={80}
                height={80}
              />
            </CardContent>
            <h3 className="font-semibold text-lg text-center">
              {sponsor.name}
            </h3>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          className="text-lg px-8 bg-parch p-6 rounded-full ring-secondary"
        >
          Become our sponsor
        </Button>
      </div>
    </div>
  );
}
