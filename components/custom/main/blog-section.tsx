import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getAllPosts } from "@/lib/blog";

const BlogSection = () => {
  const locale = useLocale();
  const t = useTranslations("BlogSection");
  const posts = getAllPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="container mx-auto mt-24 max-w-7xl px-4">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
        <Link
          href={`/${locale}/blog`}
          className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
        >
          {locale === "fa" ? "همه نوشته‌ها" : "All stories"}
          <ArrowUpRight className="h-4 w-4 rtl:-rotate-90" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group rounded-[1.4rem] border border-border/70 bg-card/60 p-5 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-primary">{post.category}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readingTime} {locale === "fa" ? "دقیقه" : "min"}
              </span>
            </div>
            <h3 className="text-lg font-bold leading-7 transition group-hover:text-primary">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
