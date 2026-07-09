import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parchlinux.com";

  const routes = ["", "/download", "/contributors", "/team", "/blog"];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );
}
