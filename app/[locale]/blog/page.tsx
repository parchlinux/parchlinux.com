import BlogExplorer from "@/components/custom/blog/blog-explorer";
import { getBlogCopy } from "@/components/custom/blog/blog-copy";
import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const fa = locale === "fa";
  return {
    title: fa ? "بلاگ پارچ گنو/لینوکس" : "Parch GNU/Linux Blog",
    description: fa
      ? "خبرها، راهنماهای فنی و نوشته‌های جامعه پارچ گنو/لینوکس."
      : "Release stories, technical guides and community writing from Parch GNU/Linux.",
    alternates: {
      canonical: `https://parchlinux.com/${locale}/blog`,
      languages: {
        fa: "https://parchlinux.com/fa/blog",
        en: "https://parchlinux.com/en/blog",
      },
    },
    openGraph: {
      type: "website",
      url: `https://parchlinux.com/${locale}/blog`,
      title: fa ? "بلاگ پارچ گنو/لینوکس" : "Parch GNU/Linux Blog",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const copy = getBlogCopy(locale);

  return (
    <main className="blog-page pb-12 sm:pb-20">
      <section className="container mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 sm:pb-14 md:px-8 lg:pt-8">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(33,199,150,.9)]" />
            {copy.eyebrow}
          </div>
          <h1 className="text-balance text-[2.5rem] font-extrabold leading-[1.16] tracking-tight sm:text-5xl lg:text-[4.4rem] lg:leading-[1.05]">
            {copy.titleStart}{" "}
            <span className="text-parch">{copy.titleAccent}</span>{" "}
            {copy.titleEnd}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {copy.intro}
          </p>
        </div>
      </section>

      <BlogExplorer posts={posts} locale={locale} />
    </main>
  );
}
