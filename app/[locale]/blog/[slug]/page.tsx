import CopyLinkButton from "@/components/custom/blog/copy-link-button";
import { getBlogCopy } from "@/components/custom/blog/blog-copy";
import MarkdownContent, { extractToc } from "@/components/custom/blog/markdown-content";
import ReadingProgress from "@/components/custom/blog/reading-progress";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  const url = `https://parchlinux.com/${locale}/blog/${post.slug}`;
  return {
    title: `${post.title} | ${locale === "fa" ? "بلاگ پارچ" : "Parch Blog"}`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const copy = getBlogCopy(locale);
  const toc = extractToc(post.content);
  const allPosts = getAllPosts(locale);
  const related = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aScore = Number(a.category === post.category) + a.tags.filter((tag) => post.tags.includes(tag)).length;
      const bScore = Number(b.category === post.category) + b.tags.filter((tag) => post.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Parch GNU/Linux" },
    mainEntityOfPage: `https://parchlinux.com/${locale}/blog/${post.slug}`,
    image: post.image ? [post.image] : undefined,
    keywords: post.tags.join(", "),
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
  };

  const BackIcon = locale === "fa" ? ArrowRight : ArrowLeft;

  return (
    <main className="blog-article-page pb-16 sm:pb-24">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <Link
          href={`/${locale}/blog`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <BackIcon className="h-4 w-4" />
          {copy.back}
        </Link>

        <header className="mx-auto max-w-5xl text-center">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-medium text-foreground">
              {post.category}
            </span>
            <span>{formatDate(post.date, locale)}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readingTime} {copy.minute}
            </span>
          </div>

          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[4rem] lg:leading-[1.08]">
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {post.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <span>{post.author}</span>
            {post.updated && (
              <>
                <span>•</span>
                <span>{copy.updated}: {formatDate(post.updated, locale)}</span>
              </>
            )}
            <CopyLinkButton label={copy.share} />
          </div>
        </header>

        <div className="blog-article-cover relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[1.8rem] border border-border/70 sm:mt-14 sm:rounded-[2.3rem]">
          {post.image ? (
            <div
              className="aspect-[16/8] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
              role="img"
              aria-label={post.title}
            />
          ) : (
            <div className="blog-post-visual blog-post-visual--abstract aspect-[16/8] w-full">
              <div className="blog-orbit blog-orbit--one" />
              <div className="blog-orbit blog-orbit--two" />
              <div className="blog-article-watermark">PARCH / JOURNAL</div>
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
          <article className="min-w-0">
            <MarkdownContent content={post.content} />
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-border/70 pt-7">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-border/70 bg-card/55 p-5 backdrop-blur-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{copy.toc}</p>
                <nav className="space-y-1.5">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block rounded-lg py-1.5 text-xs leading-5 text-muted-foreground transition hover:text-foreground ${
                        item.level === 3 ? "ps-3" : "font-medium"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-6xl border-t border-border/70 pt-10 sm:mt-24 sm:pt-12">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold sm:text-3xl">{copy.related}</h2>
              <Link href={`/${locale}/blog`} className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:flex">
                {copy.archive}
                <ArrowUpRight className="h-4 w-4 rtl:-rotate-90" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/blog/${item.slug}`}
                  className="group rounded-2xl border border-border/70 bg-card/60 p-5 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                >
                  <p className="text-xs font-medium text-primary">{item.category}</p>
                  <h3 className="mt-3 text-base font-bold leading-7 group-hover:text-primary">{item.title}</h3>
                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
