import team from "@/data/team";
import teams from "@/data/team";
import Image from "next/image";
import React from "react";

export default function Team() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold mb-12">Our team</h1>
      <div className="grid grid-cols-4 gap-8">
        {team.map((contributor, index) => (
          <div
            className="flex flex-col relative gap-3 p-5 bg-primary/20 rounded-lg lg:col-span-1 sm:col-span-2 col-span-4"
            key={index}
          >
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">Mohammad Arshiya Fardinfar</h3>
              <span className="text-muted/80">Founder</span>
            </div>

            <Image
              src={"https://picsum.photos/350"}
              width={350}
              height={350}
              className="rounded-sm w-full"
              alt="ss"
            />
            <div className="absolute bottom-5 w-20 right-0 bg-primary/20 mx-5 px-2 z-10 rounded-l-xl">
              ss
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
