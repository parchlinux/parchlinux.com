import contributors from "@/data/contributors";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold mb-12">Contributors</h1>
      <div className="grid grid-cols-4 gap-8">
        {contributors.map((contributor, index) => (
          <div
            className="flex items-center gap-4 p-3 bg-primary/20 rounded-lg lg:col-span-1 sm:col-span-2 col-span-4"
            key={index}
          >
            <Image
              src={"https://picsum.photos/60"}
              width={60}
              height={60}
              className="rounded-sm"
              alt="ss"
            />
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Mohammad Arshiya Fardinfar</h3>
              <span>@arshiya_shadow</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
