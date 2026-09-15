import { BASE_URL, renderSitemapIndexXml } from "@/lib/sitemap-data";

export const dynamic = "force-static";

export function GET() {
  const xml = renderSitemapIndexXml([
    { url: `${BASE_URL}/sitemap-pages.xml`, lastModified: "2026-09-15T00:00:00Z" },
    { url: `${BASE_URL}/sitemap-blog.xml`, lastModified: "2026-09-15T00:00:00Z" },
  ]);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
