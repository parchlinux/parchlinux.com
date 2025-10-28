import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitGraph, Github, GitPullRequest } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Download() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-6">
          <Image
            src={"/images/download/parch-box.png"}
            width={150}
            height={150}
            alt="parch-box"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold">Latest Releases</h1>
            <h2>This build was released on 2025-09-14</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant={"default"} className="rounded-lg">
            <GitPullRequest />
            <span>Pull Request</span>
            <Badge>#17508</Badge>
          </Button>
          <Button variant={"secondary"} className="rounded-lg">
            <GitGraph />
            <span>Pull Request</span>
            <Badge>#17508</Badge>
          </Button>
          <Button className="rounded-lg bg-parch-purple">
            <Github />
            <span>Pull Request</span>
            <Badge>#17508</Badge>
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
