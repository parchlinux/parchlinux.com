import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parchlinux.com";
  const routes = ["", "/download", "/contributors", "/team", "/blog", "/guidelines"];

  const staticRoutes = routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );

  const articleRoutes = routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}
