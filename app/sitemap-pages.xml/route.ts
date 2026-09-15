import { getStaticPageRoutes, renderSitemapXml } from "@/lib/sitemap-data";

export const dynamic = "force-static";

export function GET() {
  const routes = getStaticPageRoutes();
  const xml = renderSitemapXml(routes);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
