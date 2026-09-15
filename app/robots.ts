import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://parchlinux.com/sitemap.xml",
      "https://parchlinux.com/sitemap_index.xml",
      "https://parchlinux.com/sitemap-pages.xml",
      "https://parchlinux.com/sitemap-blog.xml",
    ],
  };
}
