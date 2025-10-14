import { cn } from "@/lib/utils";
import React from "react";

const HeroSection = ({
  title,
  description,
  reverse,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12">
        <div
          className={cn("col-span-6", reverse ? "order-1" : "order-2")}
        ></div>
        <div className={cn("col-span-6", reverse ? "order-2" : "order-1")}>
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
