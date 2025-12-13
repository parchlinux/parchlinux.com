export interface HashItem {
  version: string;
  hash: string;
}

export interface LinkItem {
  version: string;
  title: string;
  size: string;
  date: string;
  color: "primary" | "parch-purple" | "parch-blue";
  href: string;
}

export interface DownloadItem {
  logo: string;
  title: string;
  description: string;
  image: string;
  hashs: HashItem[];
  links: LinkItem[];
}

export interface DownloadCardProps {
  logo: string;
  title: string;
  description: string;
  image: string;
  hashs: HashItem[];
  links: LinkItem[];
}
