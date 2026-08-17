"use client";

import { BlogPostMeta } from "@/lib/blog";
import { ArrowUpRight, Clock3, Rss, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getBlogCopy } from "./blog-copy";

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function PostVisual({
  post,
  className = "",
}: {
  post: BlogPostMeta;
  className?: string;
}) {
  if (post.image) {
    return (
      <div
        className={`blog-post-visual bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${post.image})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`blog-post-visual blog-post-visual--abstract ${className}`} aria-hidden="true">
      <div className="blog-orbit blog-orbit--one" />
      <div className="blog-orbit blog-orbit--two" />
      <div className="blog-visual-mark">P</div>
    </div>
  );
}

export default function BlogExplorer({
  posts,
  locale,
}: {
  posts: BlogPostMeta[];
  locale: string;
}) {
  const copy = getBlogCopy(locale);
  const [category, setCategory] = useState(copy.all);
  const [query, setQuery] = useState("");

  const featured = posts.find((post) => post.featured) ?? posts[0];
  const categories = useMemo(
    () => [copy.all, ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts, copy.all]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    return posts.filter((post) => {
      const categoryMatch = category === copy.all || post.category === category;
      const queryMatch =
        !normalizedQuery ||
        [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [posts, category, query, copy.all, locale]);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      {featured && (
        <section className="blog-featured-shell relative overflow-hidden rounded-4xl border border-border/70 bg-card/70">
          <div className="blog-featured-glow" aria-hidden="true" />
          <div className="grid min-h-107.5 grid-cols-1 lg:grid-cols-12">
            <div className="relative z-10 flex flex-col gap-12 p-6 sm:p-9 lg:col-span-7 lg:p-12">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {copy.featured}
                </span>
                <span>{featured.category}</span>
              </div>

              <div className="max-w-3xl h-full w-full mx-auto">
                <Link href={`/${locale}/blog/${featured.slug}`} className="flex flex-col group h-full w-full">
                  <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl xl:text-3xl lg:text-2xl lg:leading-[1.08]">
                    {featured.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {featured.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                    <span>{formatDate(featured.date, locale)}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {featured.readingTime} {copy.minute}
                    </span>
                    <span className="ms-auto inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-medium text-background transition-transform group-hover:-translate-y-0.5">
                      {copy.read}
                      <ArrowUpRight className="h-4 w-4 rtl:-rotate-90" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[280px] p-4 lg:col-span-5 lg:p-5">
              <PostVisual post={featured} className="h-full min-h-[280px] rounded-[1.5rem]" />
            </div>
          </div>
        </section>
      )}

      <section className="mt-20 sm:mt-24">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              {copy.archive}
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">{copy.latest}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{copy.latestHint}</p>
          </div>

          <div className="relative w-full lg:w-[360px]">
            <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.search}
              aria-label={copy.search}
              className="h-12 w-full rounded-full border border-border/80 bg-card/70 pe-11 ps-11 text-sm shadow-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute end-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                aria-label={copy.clear}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="blog-filter-strip mb-9 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-transparent bg-foreground text-background shadow-sm"
                    : "border-border/80 bg-card/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post, index) => (
              <article
                key={post.slug}
                className={`blog-story-card group relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-card/65 p-3 ${
                  index === 0 && filtered.length > 2 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <Link href={`/${locale}/blog/${post.slug}`} className="flex h-full flex-col">
                  <PostVisual post={post} className="aspect-[16/10] rounded-[1.15rem]" />
                  <div className="flex flex-1 flex-col px-2 pb-3 pt-5 sm:px-3">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-primary">{post.category}</span>
                      <span>•</span>
                      <span>{formatDate(post.date, locale)}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-8 tracking-tight transition group-hover:text-primary sm:text-[1.35rem]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.readingTime} {copy.minute}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="h-4 w-4 rtl:-rotate-90" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.6rem] border border-dashed border-border bg-card/40 px-6 py-16 text-center">
            <p className="font-medium">{copy.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(copy.all);
              }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              {copy.clear}
            </button>
          </div>
        )}
      </section>

      <section className="blog-newsletter relative mt-20 overflow-hidden rounded-4xl border border-border/70 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="blog-newsletter-grid" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{copy.newsletterTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.newsletterText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border bg-background/70 px-4 py-2">
              {posts.length} {copy.articles}
            </span>
            <span className="rounded-full border border-border bg-background/70 px-4 py-2">
              {Math.max(0, categories.length - 1)} {copy.category}
            </span>
            <a
              href={`/${locale}/blog/rss.xml`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-medium text-background transition hover:opacity-85"
            >
              <Rss className="h-4 w-4" />
              {copy.rss}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
