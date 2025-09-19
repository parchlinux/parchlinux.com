import { Button } from "@/components/ui/button";
import { Code, Code2, Coffee, Github } from "lucide-react";
import React from "react";

const LinkSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        <div className="text-5xl text-center font-bold">
          Parch is open-source and free for everyone
        </div>
        <div className="flex justify-center gap-2">
          <Button size={"lg"} className="rounded-full">
            <Github />
            Source Code
          </Button>
          <Button size={"lg"} className="rounded-full">
            <Coffee />
            Donate
          </Button>
          <Button size={"lg"} className="rounded-full">
            <Code2 />
            Join our team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
