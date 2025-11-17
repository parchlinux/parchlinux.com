import { Button } from "@/components/ui/button";
import { Code2, Coffee, Github } from "lucide-react";
import React from "react";

const LinkSection = () => {
  return (
    <div className="relative">
      <div className="bg-grid-center z-[-1] w-screen h-full opacity-10 pointer-events-none absolute top-0 -left-8" />
      <div className="w-full max-w-6xl mx-auto px-4 lg:pt-48 pt-32 lg:pb-64 pb-48 relative">
        <div className="flex flex-col gap-8">
          <div className="xl:text-5xl lg:text-4xl text-2xl sm:text-3xl font-bold text-center sm:text-center">
            Parch is open-source and free for everyone
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex w-full sm:w-auto justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="w-1/2 sm:w-auto rounded-full text-[16px] sm:text-[18px] py-6 sm:py-7 ring-1 ring-offset-4 ring-gray-200/50 px-5"
              >
                <Github />
                Source Code
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="w-1/2 sm:w-auto rounded-full text-[16px] sm:text-[18px] py-6 sm:py-7 ring-1 ring-offset-4 ring-secondary/50 px-5"
              >
                <Coffee />
                Donate
              </Button>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto rounded-full text-[16px] sm:text-[18px] py-6 sm:py-7 ring-parch px-5"
            >
              <Code2 />
              Join our team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkSection;
