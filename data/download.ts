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
        hash: "c29c85f0ac20e8ac78b19959a639b4f9",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "3.1 GiB",
        date: formatDate("2025-11-26"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/plasma/ParchLinux-plasma-latest.iso",
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
        hash: "c3e86e45f19dc276a0d858bd7a64e5c5",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "2.7 GiB",
        date: formatDate("2025-11-26"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/gnome/ParchLinux-gnome-latest.iso",
      },
    ],
  },
  {
    logo: "/images/download/xfce.png",
    title: "xfce",
    description: "xfce",
    image: "/images/download/xfce-desktop.png",
    hashs: [
      {
        version: "x64",
        hash: "d5fe615168e4bb2b059633504d21e3da",
      },
    ],
    links: [
      {
        version: "x64",
        title: "x64",
        size: "2.5 GiB",
        date: formatDate("2025-11-28"),
        color: "parch-blue",
        href: "https://mirror.parchlinux.ir/XFCE/ParchLinux-XFCE-latest.iso",
      },
    ],
  },
];

export default downloads;
