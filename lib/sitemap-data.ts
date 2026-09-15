import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export const BASE_URL = "https://parchlinux.com";

export const BLOG_TRANSLATION_MAP: Record<string, { en?: string; fa?: string }> = {
  "parch-immutable-first-alpha": {
    en: "parch-immutable-first-alpha",
    fa: "parch-immutable-first-alpha",
  },
  "introducing-parch-immutable": {
    en: "introducing-parch-immutable",
    fa: "introducing-parch-immutable",
  },
  "parch-fifth-anniversary": {
    en: "parch-fifth-anniversary",
    fa: "parch-fifth-anniversary",
  },
  "this-month-in-parch-parch-in-motion": {
    en: "this-month-in-parch-parch-in-motion",
    fa: "this-month-in-parch-parch-in-motion",
  },
  "parch-accessibility": {
    en: "a-linux-distribution-that-leaves-no-one-behind",
    fa: "parch-accessibility",
  },
  "a-linux-distribution-that-leaves-no-one-behind": {
    en: "a-linux-distribution-that-leaves-no-one-behind",
    fa: "parch-accessibility",
  },
};

export function getBlogAlternates(locale: string, slug: string) {
  const mapping = BLOG_TRANSLATION_MAP[slug];
  if (mapping && mapping.en && mapping.fa) {
    return {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${BASE_URL}/en/blog/${mapping.en}`,
        fa: `${BASE_URL}/fa/blog/${mapping.fa}`,
        "x-default": `${BASE_URL}/en/blog/${mapping.en}`,
      },
    };
  }
  return {
    canonical: `${BASE_URL}/${locale}/blog/${slug}`,
    languages: {
      [locale]: `${BASE_URL}/${locale}/blog/${slug}`,
    },
  };
}

export interface RouteConfig {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified: Date;
}

export function getStaticPageConfigs(): RouteConfig[] {
  // Use latest real milestone dates rather than arbitrary new Date()
  const siteReleaseDate = new Date("2026-09-15T00:00:00Z");
  const downloadReleaseDate = new Date("2026-08-19T00:00:00Z");

  const faPosts = getAllPosts("fa");
  const latestPostDate = faPosts.length > 0
    ? new Date(faPosts[0].updated || faPosts[0].date)
    : siteReleaseDate;

  return [
    { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: siteReleaseDate },
    { path: "/features", priority: 0.9, changeFrequency: "weekly", lastModified: siteReleaseDate },
    { path: "/download", priority: 0.9, changeFrequency: "monthly", lastModified: downloadReleaseDate },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly", lastModified: latestPostDate },
    { path: "/repo", priority: 0.85, changeFrequency: "monthly", lastModified: siteReleaseDate },
    { path: "/team", priority: 0.75, changeFrequency: "monthly", lastModified: siteReleaseDate },
    { path: "/contributors", priority: 0.75, changeFrequency: "monthly", lastModified: siteReleaseDate },
    { path: "/guidelines", priority: 0.75, changeFrequency: "monthly", lastModified: siteReleaseDate },
  ];
}

export function getStaticPageRoutes(): MetadataRoute.Sitemap {
  const configs = getStaticPageConfigs();

  return routing.locales.flatMap((locale) =>
    configs.map((config) => ({
      url: `${BASE_URL}/${locale}${config.path}`,
      lastModified: config.lastModified,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE_URL}/${l}${config.path}`])
          ),
          "x-default": `${BASE_URL}/en${config.path}`,
        },
      },
    }))
  );
}

export function getBlogArticleRoutes(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => {
      const alternates = getBlogAlternates(locale, post.slug);
      return {
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updated || post.date),
        changeFrequency: "monthly" as const,
        priority: post.featured ? 0.85 : 0.75,
        alternates: {
          languages: alternates.languages,
        },
      };
    })
  );
}

export function getAllSitemapRoutes(): MetadataRoute.Sitemap {
  return [...getStaticPageRoutes(), ...getBlogArticleRoutes()];
}

export function renderSitemapXml(routes: MetadataRoute.Sitemap): string {
  const urlTags = routes
    .map((route) => {
      const alternatesTags = route.alternates?.languages
        ? Object.entries(route.alternates.languages)
            .map(
              ([lang, href]) =>
                `  <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
            )
            .join("\n")
        : "";

      const lastmod = route.lastModified
        ? `  <lastmod>${new Date(route.lastModified).toISOString()}</lastmod>`
        : "";
      const changefreq = route.changeFrequency
        ? `  <changefreq>${route.changeFrequency}</changefreq>`
        : "";
      const priority = route.priority !== undefined
        ? `  <priority>${route.priority.toFixed(2)}</priority>`
        : "";

      return [
        "<url>",
        `  <loc>${route.url}</loc>`,
        alternatesTags,
        lastmod,
        changefreq,
        priority,
        "</url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlTags}
</urlset>`;
}

export function renderSitemapIndexXml(
  sitemaps: Array<{ url: string; lastModified?: Date | string }>
): string {
  const sitemapTags = sitemaps
    .map((s) => {
      const lastmod = s.lastModified
        ? `  <lastmod>${new Date(s.lastModified).toISOString()}</lastmod>`
        : "";
      return [
        "<sitemap>",
        `  <loc>${s.url}</loc>`,
        lastmod,
        "</sitemap>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapTags}
</sitemapindex>`;
}
