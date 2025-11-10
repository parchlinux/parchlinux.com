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
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
        <div
          className={cn(
            "col-span-12 lg:col-span-6",
            reverse ? "lg:order-1" : "lg:order-2"
          )}
        >
          {image && (
            <div className="relative rounded-[50px] p-2 overflow-hidden border-[6px] lg:border-8 border-[#1b2639d0]">
              <Image
                src={image}
                alt={imageAlt}
                width={800}
                height={500}
                className="w-full h-auto object-cover rounded-[42px] lg:rounded-[42px]"
              />
            </div>
          )}
        </div>
        <div
          className={cn(
            "col-span-12 lg:col-span-6",
            reverse ? "lg:order-2" : "lg:order-1"
          )}
        >
          <div className="flex flex-col xl:gap-3 gap-1">
            {title}
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
