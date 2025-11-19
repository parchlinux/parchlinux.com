import { Button } from "@/components/ui/button";
import { Code2, Coffee, Github } from "lucide-react";
import React from "react";

const LinkSection = () => {
  return (
    <div className="relative">
      <div className="bg-grid-center z-[-1] w-screen h-full opacity-10 pointer-events-none absolute top-0 -left-8" />
      <div className="w-full max-w-6xl mx-auto px-4 lg:pt-48 pt-32 lg:pb-64 md:pb-48 pb-28 relative">
        <div className="flex flex-col gap-8">
          <div className="xl:text-5xl lg:text-4xl text-2xl sm:text-3xl font-bold text-center sm:text-center">
            Parch is open-source and free for everyone
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="grid grid-cols-12 gap-6">
              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-6 rounded-full text-xs sm:text-[18px] py-6 sm:py-7 ring-parch px-5 ring-1 ring-offset-4 ring-secondary/20"
              >
                <Github />
                Source Code
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-6 rounded-full text-xs sm:text-[18px] py-6 sm:py-7 ring-parch px-5 ring-1 ring-offset-4 ring-secondary/20"
              >
                <Coffee />
                Donate
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="md:col-span-4 col-span-12 rounded-full text-[16px] sm:text-[18px] py-6 sm:py-7 ring-parch px-5 ring-1 ring-offset-4 ring-primary"
              >
                <Code2 />
                Join our team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
