import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const HeroSection = ({
  title,
  description,
  image,
  imageAlt = "Section image",
  reverse,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}) => {
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-4 sm:gap-12 items-center">
        <div
          className={cn(
            "col-span-12 sm:col-span-6",
            reverse ? "sm:order-1" : "sm:order-2"
          )}
        >
          {image && (
            <div className="relative lg:rounded-[50px] rounded-3xl p-2 overflow-hidden border-[6px] sm:border-6 lg:border-8 border-[#1b2639d0]">
              <Image
                src={image}
                alt={imageAlt}
                width={800}
                height={500}
                className="w-full h-auto object-cover lg:rounded-[40px] rounded-2xl"
              />
            </div>
          )}
        </div>

        <div
          className={cn(
            "col-span-12 sm:col-span-6",
            reverse ? "sm:order-2" : "sm:order-1"
          )}
        >
          <div className="flex flex-col xl:gap-3 gap-2.5 text-center sm:text-left">
            {title}
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
