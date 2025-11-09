import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const DownloadSection = () => {
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-12 px-8">
        <div className="col-span-8 flex flex-col justify-center gap-14">
          <h2 className="2xl:text-7xl xl:text-6xl text-5xl font-bold">
            Try Parch Linux Now
          </h2>
          <Button className="rounded-full text-[18px] bg-black text-white py-7 ring-1 ring-gray-500 ring-offset-4 px-5 w-fit">
            <Download />
            Download for free
          </Button>
        </div>
        <div className="col-span-4 flex justify-end">
          <Image
            width={180}
            height={300}
            src={"/logo.svg"}
            alt="logo-download"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
