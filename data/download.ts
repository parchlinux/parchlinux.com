import type { DownloadItem } from "@/types";

// Helper function to convert YYYY-MM-DD to MM/DD/YYYY
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

const downloads: DownloadItem[] = [
  {
    logo: "/images/download/kde.png",
    title: "kde",
    description: "kde",
    image: "/images/download/kde-desktop.png",
    hashs: [
      {
        version: "x64",
        hash: "8476893e34729afa705cd98954712187",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "3.4 GiB",
        date: formatDate("2026-07-08"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/plasma/Parchlinux-plasma-latest.iso",
      },
    ],
  },
  {
    logo: "/images/download/gnome.png",
    title: "gnome",
    description: "gnome",
    image: "/images/download/gnome-desktop.png",
    hashs: [
      {
        version: "x64",
        hash: "e26d97936ce3a874f0ae194e9fcf8b9b",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "2.8 GiB",
        date: formatDate("2026-07-08"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/gnome/Parchlinux-gnome-latest.iso",
      },
    ],
  },
  {
    logo: "/images/download/xfce.png",
    title: "xfce",
    description: "xfce",
    image: "",
    hashs: [
      {
        version: "x64",
        hash: "1e02b66eb4e31c169153a0adde66ff7e",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "2.8 GiB",
        date: formatDate("2026-07-09"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/XFCE/Parchlinux-XFCE-latest.iso",
      },
    ],
  },
];

export default downloads;
