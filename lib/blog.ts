import fs from "node:fs";
import path from "node:path";

export type BlogLocale = "fa" | "en";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author: string;
  image?: string;
  featured: boolean;
  draft: boolean;
  locale: BlogLocale;
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const parsed = JSON.parse(trimmed);
      return typeof parsed === "string" ? parsed : String(parsed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseArray(value: string) {
  const cleaned = value.trim();
  if (!cleaned) return [];

  if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
    return cleaned
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return cleaned
    .split(",")
    .map((item) => stripQuotes(item))
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value: string | undefined, fallback = false) {
  if (!value) return fallback;
  return ["true", "yes", "1"].includes(value.trim().toLowerCase());
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) {
    return { attributes: {} as Record<string, string>, content: source.trim() };
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { attributes: {} as Record<string, string>, content: source.trim() };
  }

  const raw = source.slice(3, end).trim();
  const content = source.slice(end + 4).trim();
  const attributes: Record<string, string> = {};

  for (const line of raw.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) attributes[key] = value;
  }

  return { attributes, content };
}

export function estimateReadingTime(content: string) {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function postFromFile(filePath: string, locale: BlogLocale): BlogPost {
  const source = fs.readFileSync(filePath, "utf8");
  const { attributes, content } = parseFrontmatter(source);
  const filename = path.basename(filePath, path.extname(filePath));
  const slug = stripQuotes(attributes.slug || filename);

  return {
    slug,
    title: stripQuotes(attributes.title || slug.replace(/-/g, " ")),
    description: stripQuotes(attributes.description || ""),
    date: stripQuotes(attributes.date || new Date().toISOString()),
    updated: attributes.updated ? stripQuotes(attributes.updated) : undefined,
    category: stripQuotes(attributes.category || (locale === "fa" ? "عمومی" : "General")),
    tags: parseArray(attributes.tags || ""),
    author: stripQuotes(attributes.author || "Parch GNU/Linux"),
    image: attributes.image ? stripQuotes(attributes.image) : undefined,
    featured: parseBoolean(attributes.featured),
    draft: parseBoolean(attributes.draft),
    locale,
    readingTime: Number(attributes.readingTime) || estimateReadingTime(content),
    content,
  };
}

function localeDirectory(locale: string) {
  return path.join(BLOG_ROOT, locale === "fa" ? "fa" : "en");
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  const safeLocale: BlogLocale = locale === "fa" ? "fa" : "en";
  const directory = localeDirectory(safeLocale);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => postFromFile(path.join(directory, file), safeLocale))
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
  const safeLocale: BlogLocale = locale === "fa" ? "fa" : "en";
  const directory = localeDirectory(safeLocale);

  if (!fs.existsSync(directory)) return null;

  const file = fs
    .readdirSync(directory)
    .filter((entry) => /\.mdx?$/.test(entry))
    .find((entry) => path.basename(entry, path.extname(entry)) === slug);

  if (!file) return null;

  const post = postFromFile(path.join(directory, file), safeLocale);
  return post.draft ? null : post;
}

export function getAllPostSlugs() {
  const locales: BlogLocale[] = ["fa", "en"];
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}
