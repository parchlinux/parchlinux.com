import DownloadCard from "@/components/custom/download/download-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import downloads from "@/data/download";
import { GitGraph, Github, GitPullRequest } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Download() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center w-full justify-between border rounded-md px-10 py-5">
        <div className="flex items-center gap-6">
          <Image
            src={"/images/download/parch-box.png"}
            width={150}
            height={150}
            alt="parch-box"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-bold">Latest Releases</h1>
            <h2 className="text-xl">This build was released on 2025-09-14</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant={"default"} className="rounded-lg" size={"lg"}>
            <GitPullRequest />
            <span>Pull Request</span>
            <Badge className="bg-white/20 shadow">#17508</Badge>
          </Button>
          <Button variant={"secondary"} className="rounded-lg" size={"lg"}>
            <GitGraph />
            <span>Commit</span>
            <Badge className="bg-white/20 shadow">335ed8d9</Badge>
          </Button>
          <Button className="rounded-lg bg-parch-purple" size={"lg"}>
            <Github />
            <span>Submitted by</span>
            <Badge className="bg-white/20 shadow">Sohrab Behdani</Badge>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {downloads.map((download, index) => (
          <DownloadCard key={index} item={download} />
        ))}
      </div>
    </div>
  );
}
