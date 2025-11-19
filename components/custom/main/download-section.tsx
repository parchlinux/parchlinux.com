import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const DownloadSection = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center md:items-center py-16 gap-10 md:gap-0">
        <div className="md:col-span-4 flex justify-center md:justify-end order-1 md:order-2 w-full md:w-auto">
          <Image
            width={160}
            height={260}
            src={"/logo.svg"}
            alt="logo-download"
            className="w-36 sm:w-40 md:w-44 lg:w-48 h-auto"
          />
        </div>

        <div className="md:col-span-8 flex flex-col justify-center gap-6 md:gap-14 text-center md:text-left order-2 md:order-1 w-full">
          <h2 className="md:text-4xl text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
            Try Parch Linux Now
          </h2>
          <Button className="rounded-full text-[18px] bg-black text-white py-7 ring-1 ring-gray-500 ring-offset-4 px-5 w-fit mx-auto md:mx-0 transition-all duration-300">
            <Download />
            Download for free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
