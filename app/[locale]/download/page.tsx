import DownloadCard from "@/components/custom/download/download-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import downloads from "@/data/download";
import { releaseInfo } from "@/data/release-info";
import { GitGraph, Github, GitPullRequest } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Download() {
  const t = useTranslations("DownloadPage");

  const translatedDownloads = downloads.map((download) => {
    const key = download.title;

    return {
      ...download,
      title: t(`titles.${key}`),
      description: t(`descriptions.${key}`),
      links: download.links.map((link) => ({
        ...link,
        title: t(`downloadTitles.${link.version.toLowerCase()}`),
      })),
    };
  });

  return (
    <div className="container mx-auto max-w-7xl lg:px0 md:px-8 sm:px-6 px-4">
      <div className="flex sm:flex-row flex-col justify-center sm:text-start text-center items-center w-full md:gap-4 gap-2 sm:border rounded-md px-8 py-3 mb-12">
        <Image
          src={"/images/download/parch-box.png"}
          width={150}
          height={150}
          alt="parch-box"
        />
        <div className="flex sm:flex-row flex-col gap-3 items-center">
          <div className="flex flex-col gap-0.5">
            <h1 className="xl:text-2xl text-lg font-bold">
              {t("latestReleases")}
            </h1>
            <h2 className="lg:text-base text-sm text-foreground/85">
              {t("buildReleased")} 2025-09-14
            </h2>
          </div>
          <div className="flex gap-3">
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-primary"
              size={"lg"}
            >
              <GitPullRequest />
              <span>{t("pullRequest")}</span>
              <Badge className="bg-white/20 shadow text-white">
                {releaseInfo.pullRequestNumber}
              </Badge>
            </Button>
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-parch-blue shadow-parch-blue shadow-sm"
              size={"lg"}
            >
              <GitGraph />
              <span>{t("commit")}</span>
              <Badge className="bg-white/20 shadow text-white">
                {releaseInfo.commitHash}
              </Badge>
            </Button>
            <Button
              variant={"link"}
              className="flex xl:flex-row flex-col xl:h-10 h-fit py-3 rounded-lg text-white hover:no-underline bg-parch-purple"
              size={"lg"}
            >
              <Github />
              <span>{t("submittedBy")}</span>
              <Badge className="bg-white/20 shadow text-white">
                {releaseInfo.submittedBy}
              </Badge>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {translatedDownloads.map((download, index) => (
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
