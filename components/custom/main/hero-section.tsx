import { cn } from "@/lib/utils";
import React from "react";

const HeroSection = ({ reverse }: { reverse?: boolean }) => {
  return (
    <div className="grid grid-cols-12">
      <div className={cn("col-span-6", reverse ? "order-1" : "order-2")}></div>
      <div className={cn("col-span-6", reverse ? "order-2" : "order-1")}>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">Do your daily work easily</h2>
          <p className="text-sm">
            ParchLinux, which stands for Persian Arch, is a Linux distribution
            based on the popular and versatile Arch Linux. It aims to provide a
            streamlined, user-friendly experience while maintaining the
            customizability and performance that Arch Linux is known for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
