import { getAllSitemapRoutes } from "@/lib/sitemap-data";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapRoutes();
}
