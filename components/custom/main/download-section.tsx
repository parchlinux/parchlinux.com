import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const DownloadSection = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 flex flex-col justify-between">
        <h2 className="text-7xl font-bold">Try Parch Linux Now</h2>
        <Button className="w-fit rounded-full">
          <Download />
          Download for free
        </Button>
      </div>
      <div className="col-span-4 flex justify-end">
        <Image width={180} height={300} src={"/logo.svg"} alt="logo-download" />
      </div>
    </div>
  );
};

export default DownloadSection;
