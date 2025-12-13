import DownloadCard from "@/components/custom/download/download-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import downloads from "@/data/download";
import { GitGraph, Github, GitPullRequest } from "lucide-react";
import Image from "next/image";

export default function Download() {
  return (
    <div className="container mx-auto max-w-7xl lg:px0 md:px-8 sm:px-6 px-4">
      <div className="flex sm:flex-row flex-col justify-center sm:text-start text-center items-center w-full sm:justify-between sm:border rounded-md px-8 py-3 mb-12">
        <Image
          src={"/images/download/parch-box.png"}
          width={150}
          height={150}
          alt="parch-box"
        />
        <div className="flex sm:flex-row flex-col gap-3 items-center">
          <div className="flex flex-col gap-0.5">
            <h1 className="xl:text-2xl text-lg font-bold">Latest Releases</h1>
            <h2 className="lg:text-base text-sm text-foreground/85">
              This build was released on 2025-09-14
            </h2>
          </div>
          <div className="flex gap-3">
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-primary"
              size={"lg"}
            >
              <GitPullRequest />
              <span>Pull Request</span>
              <Badge className="bg-white/20 shadow text-white">#17508</Badge>
            </Button>
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-parch-blue shadow-parch-blue shadow-sm"
              size={"lg"}
            >
              <GitGraph />
              <span>Commit</span>
              <Badge className="bg-white/20 shadow text-white">335ed8d9</Badge>
            </Button>
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-parch-purple"
              size={"lg"}
            >
              <Github />
              <span>Submitted by</span>
              <Badge className="bg-white/20 shadow text-white">
                Sohrab Behdani
              </Badge>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {downloads.map((download, index) => (
          <DownloadCard
            key={index}
            logo={download.logo}
            title={download.title}
            description={download.description}
            image={download.image}
            hashs={download.hashs}
            links={download.links}
          />
        ))}
      </div>
    </div>
  );
}
