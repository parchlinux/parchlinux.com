import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const baseUrl = "https://parchlinux.com";
  const blogUrl = `${baseUrl}/${locale}/blog`;
  const isFa = locale === "fa";

  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.description)}</description>
          <category>${escapeXml(post.category)}</category>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${isFa ? "بلاگ پارچ گنو/لینوکس" : "Parch GNU/Linux Blog"}</title>
        <link>${blogUrl}</link>
        <description>${
          isFa
            ? "خبرها، راهنماهای فنی و نوشته‌های جامعه پارچ"
            : "Release stories, technical guides and community writing from Parch GNU/Linux"
        }</description>
        <language>${isFa ? "fa-IR" : "en-US"}</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
