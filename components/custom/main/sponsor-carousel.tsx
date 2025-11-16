"use client";

import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { Button } from "@/components/ui/button";

export default function SponsorsCarousel() {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <div className="container max-w-7xl mx-auto py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold  mb-4">Our Sponsors</h2>
          <p className="text-gray-400 text-lg">
            You can be one of our sponsors.
          </p>
        </div>

        <div className="flex justify-center gap-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative bg-secondary rounded-2xl p-18 py-12 ring-secondary flex flex-col items-center justify-center aspect-square"
            >
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-center">
                {sponsor.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" className="text-lg px-8 bg-parch p-6 rounded-full ring-secondary">
            Become our sponsor
          </Button>
        </div>
      </div>
    </div>
  );
}