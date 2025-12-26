import type { DownloadItem } from "@/types";

const downloads: DownloadItem[] = [
  {
    logo: "/images/download/kde.png",
    title: "kde",
    description: "kde",
    image: "/images/download/kde-desktop.png",
    hashs: [
      {
        version: "x64",
        hash: "c29c85f0ac20e8ac78b19959a639b4f9",
      },
      {
        version: "ARM64",
        hash: "2efbca52c90306c9bef3a1c544db3113",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "2.9 GiB",
        date: "11/26/2025",
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/plasma/ParchLinux-plasma-latest.iso",
      },
    ],
  },
  // {
  //   logo: "/images/gnome.png",
  //   title: "gnome",
  //   description: "gnome",
  //   image: "/images/download/gnome-desktop.png",
  //   hashs: [
  //     {
  //       version: "x64",
  //       hash: "3afbcb52c90306c9bef3a1c544db3114",
  //     },
  //     {
  //       version: "ARM64",
  //       hash: "3afbcb52c90306c9bef3a1c544db3115",
  //     },
  //   ],
  //   links: [
  //     {
  //       version: "x64",
  //       title: "x64",
  //       size: "2.7 GiB",
  //       date: "7/23/2025",
  //       color: "parch-blue",
  //       href: "",
  //     },
  //     {
  //       version: "ARM64",
  //       title: "arm64",
  //       size: "2.6 GiB",
  //       date: "7/23/2025",
  //       color: "parch-purple",
  //       href: "",
  //     },
  //   ],
  // },
  // {
  //   logo: "/images/download/raspberry.png",
  //   title: "raspberry",
  //   description: "raspberry",
  //   image: "/images/download/RaspberryPi-desktop.png",
  //   hashs: [
  //     {
  //       version: "x64",
  //       hash: "4bfbcc52c90306c9bef3a1c544db3116",
  //     },
  //     {
  //       version: "ARM64",
  //       hash: "4bfbcc52c90306c9bef3a1c544db3117",
  //     },
  //   ],
  //   links: [
  //     {
  //       version: "x64",
  //       title: "x64",
  //       size: "2.5 GiB",
  //       date: "7/23/2025",
  //       color: "parch-blue",
  //       href: "",
  //     },
  //     {
  //       version: "ARM64",
  //       title: "arm64",
  //       size: "2.4 GiB",
  //       date: "7/23/2025",
  //       color: "parch-purple",
  //       href: "",
  //     },
  //   ],
  // },
];

export default downloads;
