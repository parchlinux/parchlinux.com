import DownloadCard from "@/components/custom/download/download-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import downloads from "@/data/download";
import { GitGraph, Github, GitPullRequest } from "lucide-react";
import Image from "next/image";

export default function Download() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center w-full justify-between border rounded-md px-8 py-3 mb-12">
        <div className="flex items-center gap-6">
          <Image
            src={"/images/download/parch-box.png"}
            width={135}
            height={135}
            alt="parch-box"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">Latest Releases</h1>
            <h2 className="text-lg">This build was released on 2025-09-14</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant={"default"}
            className="rounded-lg text-white"
            size={"lg"}
          >
            <GitPullRequest />
            <span>Pull Request</span>
            <Badge className="bg-white/20 shadow text-white">#17508</Badge>
          </Button>
          <Button className="rounded-lg text-white bg-parch-blue" size={"lg"}>
            <GitGraph />
            <span>Commit</span>
            <Badge className="bg-white/20 shadow text-white">335ed8d9</Badge>
          </Button>
          <Button className="rounded-lg text-white bg-parch-purple" size={"lg"}>
            <Github />
            <span>Submitted by</span>
            <Badge className="bg-white/20 shadow text-white">
              Sohrab Behdani
            </Badge>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
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
