import { Button } from "@/components/ui/button";
import { Code, Code2, Coffee, Github } from "lucide-react";
import React from "react";

const LinkSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-48 pb-64">
      <div className="flex flex-col gap-8">
        <div className="xl:text-5xl text-4xl text-center font-bold">
          Parch is open-source and free for everyone
        </div>
        <div className="flex justify-center gap-6">
          <Button
            size={"lg"}
            className="rounded-full text-[18px] py-7 text-gray-950 ring-1 ring-offset-4 ring-gray-200/50 px-5"
          >
            <Github />
            Source Code
          </Button>
          <Button
            size={"lg"}
            className="rounded-full text-[18px] py-7 text-gray-950 ring-1 ring-offset-4 ring-secondary/50 px-5"
          >
            <Coffee />
            Donate
          </Button>
          <Button
            size={"lg"}
            className="rounded-full text-[18px] py-7 text-gray-950 ring-parch px-5"
          >
            <Code2 />
            Join our team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
