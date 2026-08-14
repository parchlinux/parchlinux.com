from __future__ import annotations

import argparse
import html
import json
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = ROOT / "public"
MEDIA_ROOT = PUBLIC_ROOT / "blog"
IMAGE_MARKDOWN_RE = re.compile(r"!\[([^\]]*)\]\((https?://[^)\s]+)\)")

NS = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "excerpt": "http://wordpress.org/export/1.2/excerpt/",
    "wp": "http://wordpress.org/export/1.2/",
    "dc": "http://purl.org/dc/elements/1.1/",
}


def clean_text(value: str | None) -> str:
    return html.unescape(value or "").strip()


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def decode_wordpress_slug(value: str) -> str:
    value = clean_text(value)
    if not value:
        return value
    try:
        return urllib.parse.unquote(value)
    except Exception:
        return value


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKC", decode_wordpress_slug(value)).lower()
    value = re.sub(r"[\s_/]+", "-", value)
    value = re.sub(r"[^\w\-\u0600-\u06ff]", "", value, flags=re.UNICODE)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "post"


def strip_html(source: str) -> str:
    source = re.sub(r"<script\b[^>]*>.*?</script>", " ", source or "", flags=re.I | re.S)
    source = re.sub(r"<style\b[^>]*>.*?</style>", " ", source, flags=re.I | re.S)
    source = re.sub(r"<[^>]+>", " ", source)
    return re.sub(r"\s+", " ", html.unescape(source)).strip()


def detect_locale(title: str, excerpt_html: str, body_html: str) -> str:
    sample = " ".join((title, strip_html(excerpt_html), strip_html(body_html)[:12000]))
    persian_letters = len(re.findall(r"[\u0600-\u06ff]", sample))
    latin_letters = len(re.findall(r"[A-Za-z]", sample))
    if persian_letters == 0 and latin_letters == 0:
        return "fa"
    return "fa" if persian_letters >= latin_letters * 0.28 else "en"


class HtmlToMarkdown(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self.link_stack: list[str] = []
        self.list_stack: list[str] = []
        self.in_pre = False
        self.in_code = False
        self.first_image: str | None = None

    def emit(self, text: str) -> None:
        self.out.append(text)

    def ensure_blank_line(self) -> None:
        current = "".join(self.out)
        if current.endswith("\n\n"):
            return
        if current.endswith("\n"):
            self.emit("\n")
        else:
            self.emit("\n\n")

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag in {"p", "div", "section", "article"}:
            self.ensure_blank_line()
        elif tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.ensure_blank_line()
            self.emit("#" * int(tag[1]) + " ")
        elif tag in {"strong", "b"}:
            self.emit("**")
        elif tag in {"em", "i"}:
            self.emit("*")
        elif tag == "br":
            self.emit("  \n")
        elif tag == "a":
            self.emit("[")
            self.link_stack.append(attrs_dict.get("href") or "")
        elif tag == "img":
            src = attrs_dict.get("src") or ""
            alt = attrs_dict.get("alt") or ""
            if src:
                if not self.first_image:
                    self.first_image = src
                self.emit(f"![{alt}]({src})")
        elif tag in {"ul", "ol"}:
            self.ensure_blank_line()
            self.list_stack.append(tag)
        elif tag == "li":
            self.emit("\n")
            self.emit("1. " if self.list_stack and self.list_stack[-1] == "ol" else "- ")
        elif tag == "blockquote":
            self.ensure_blank_line()
            self.emit("> ")
        elif tag == "pre":
            self.ensure_blank_line()
            self.in_pre = True
            self.emit("```\n")
        elif tag == "code":
            if not self.in_pre:
                self.in_code = True
                self.emit("`")
        elif tag == "hr":
            self.ensure_blank_line()
            self.emit("---\n\n")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"p", "div", "section", "article"}:
            self.ensure_blank_line()
        elif tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.ensure_blank_line()
        elif tag in {"strong", "b"}:
            self.emit("**")
        elif tag in {"em", "i"}:
            self.emit("*")
        elif tag == "a":
            href = self.link_stack.pop() if self.link_stack else ""
            self.emit(f"]({href})" if href else "]")
        elif tag in {"ul", "ol"}:
            if self.list_stack:
                self.list_stack.pop()
            self.ensure_blank_line()
        elif tag == "blockquote":
            self.ensure_blank_line()
        elif tag == "pre":
            self.in_pre = False
            if not "".join(self.out).endswith("\n"):
                self.emit("\n")
            self.emit("```\n\n")
        elif tag == "code" and not self.in_pre:
            self.in_code = False
            self.emit("`")

    def handle_data(self, data: str) -> None:
        if self.in_pre:
            self.emit(data)
            return
        self.emit(re.sub(r"[\t\r\n ]+", " ", data))

    def markdown(self) -> str:
        result = "".join(self.out)
        result = re.sub(r"[ \t]+\n", "\n", result)
        result = re.sub(r"\n{3,}", "\n\n", result)
        result = re.sub(r"\n +", "\n", result)
        return result.strip()


def html_to_markdown(source: str) -> tuple[str, str | None]:
    parser = HtmlToMarkdown()
    parser.feed(source or "")
    parser.close()
    return parser.markdown(), parser.first_image


def text_of(item: ET.Element, path: str) -> str:
    node = item.find(path, NS)
    return clean_text(node.text if node is not None else "")


def categories_of(item: ET.Element) -> tuple[list[str], list[str]]:
    categories: list[str] = []
    tags: list[str] = []
    for node in item.findall("category"):
        value = clean_text(node.text)
        if not value:
            continue
        domain = node.attrib.get("domain", "")
        if domain == "category":
            categories.append(value)
        elif domain == "post_tag":
            tags.append(value)
    return categories, tags


def target_path(directory: Path, slug: str, conflict: str) -> Path | None:
    candidate = directory / f"{slug}.md"
    if not candidate.exists() or conflict == "overwrite":
        return candidate
    if conflict == "skip":
        return None
    counter = 2
    while True:
        candidate = directory / f"{slug}-{counter}.md"
        if not candidate.exists():
            return candidate
        counter += 1


def image_extension(url: str) -> str:
    suffix = Path(urllib.parse.urlparse(url).path).suffix.lower()
    if suffix in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"}:
        return suffix
    return ".jpg"


def download_file(url: str, destination: Path) -> bool:
    request = urllib.request.Request(url, headers={"User-Agent": "ParchBlogImporter/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            destination.write_bytes(response.read())
        return True
    except Exception as exc:
        print(f"warning: could not download {url}: {exc}", file=sys.stderr)
        if destination.exists():
            destination.unlink()
        return False


def localize_images(content: str, locale: str, slug: str, cover_url: str | None) -> str:
    urls: list[str] = []
    if cover_url and cover_url.startswith(("http://", "https://")):
        urls.append(cover_url)
    for _, url in IMAGE_MARKDOWN_RE.findall(content):
        if url not in urls:
            urls.append(url)
    if not urls:
        return content
    media_dir = MEDIA_ROOT / locale / slug
    media_dir.mkdir(parents=True, exist_ok=True)
    replacements: dict[str, str] = {}
    inline_index = 1
    for url in urls:
        suffix = image_extension(url)
        if cover_url and url == cover_url:
            name = f"cover{suffix}"
        else:
            source_stem = slugify(Path(urllib.parse.urlparse(url).path).stem)[:48] or "image"
            name = f"{inline_index:02d}-{source_stem}{suffix}"
            inline_index += 1
        destination = media_dir / name
        if download_file(url, destination):
            replacements[url] = "/" + destination.relative_to(PUBLIC_ROOT).as_posix()
    for remote, local in replacements.items():
        content = content.replace(remote, local)
    return content


def convert_item(item: ET.Element, requested_locale: str, include_drafts: bool) -> tuple[str, str, str, str | None] | None:
    post_type = text_of(item, "wp:post_type")
    status = text_of(item, "wp:status")
    if post_type != "post":
        return None
    if status != "publish" and not include_drafts:
        return None

    title = text_of(item, "title") or "Untitled"
    raw_slug = text_of(item, "wp:post_name") or title
    author = text_of(item, "dc:creator") or "Parch GNU/Linux"
    date = text_of(item, "wp:post_date_gmt") or text_of(item, "wp:post_date")
    if date:
        date = date.replace(" ", "T")
        if len(date) == 19:
            date += "Z"

    body_html = text_of(item, "content:encoded")
    excerpt_html = text_of(item, "excerpt:encoded")
    locale = detect_locale(title, excerpt_html, body_html) if requested_locale == "auto" else requested_locale
    markdown, first_image = html_to_markdown(body_html)
    excerpt_md, _ = html_to_markdown(excerpt_html)
    description = re.sub(r"[#>*_`\[\]()]", "", excerpt_md).strip()
    if not description:
        description = re.sub(r"\s+", " ", re.sub(r"[#>*_`\[\]()]", "", markdown))[:240].strip()

    categories, tags = categories_of(item)
    category = categories[0] if categories else ("عمومی" if locale == "fa" else "General")

    frontmatter = [
        "---",
        f"title: {yaml_string(title)}",
        f"description: {yaml_string(description)}",
        f"date: {yaml_string(date or '1970-01-01')}",
        f"category: {yaml_string(category)}",
        "tags: " + json.dumps(tags, ensure_ascii=False),
        f"author: {yaml_string(author)}",
    ]
    if first_image:
        frontmatter.append(f"image: {yaml_string(first_image)}")
    frontmatter.extend([
        "featured: false",
        f"draft: {'false' if status == 'publish' else 'true'}",
        "---",
        "",
    ])

    return locale, slugify(raw_slug), "\n".join(frontmatter) + markdown + "\n", first_image


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert a WordPress WXR export to Parch Markdown posts.")
    parser.add_argument("wxr", type=Path, help="Path to WordPress .xml export")
    parser.add_argument("--locale", choices=("auto", "fa", "en"), default="auto")
    parser.add_argument("--output", type=Path, help="Output directory or root when --locale auto is used")
    parser.add_argument("--include-drafts", action="store_true", help="Also export non-published posts as draft: true")
    parser.add_argument("--download-images", action="store_true", help="Download WordPress images into public/blog/<locale>/<slug>/")
    parser.add_argument("--conflict", choices=("skip", "overwrite", "suffix"), default="skip")
    args = parser.parse_args()

    if not args.wxr.exists():
        print(f"error: file not found: {args.wxr}", file=sys.stderr)
        return 2

    try:
        root = ET.parse(args.wxr).getroot()
    except ET.ParseError as exc:
        print(f"error: invalid WordPress XML: {exc}", file=sys.stderr)
        return 2

    items = root.findall("./channel/item")
    written = {"fa": 0, "en": 0}
    skipped = 0
    conflicts = 0

    for item in items:
        converted = convert_item(item, args.locale, args.include_drafts)
        if not converted:
            skipped += 1
            continue
        locale, slug, content, cover_url = converted
        if args.locale == "auto":
            base = args.output or Path("content") / "blog"
            output = base / locale
        else:
            output = args.output or Path("content") / "blog" / locale
        output.mkdir(parents=True, exist_ok=True)
        target = target_path(output, slug, args.conflict)
        if target is None:
            print(f"skipped existing [{locale}] {output / (slug + '.md')}")
            conflicts += 1
            continue
        actual_slug = target.stem
        if args.download_images:
            content = localize_images(content, locale, actual_slug, cover_url)
        target.write_text(content, encoding="utf-8")
        print(f"wrote [{locale}] {target}")
        written[locale] += 1

    total = written["fa"] + written["en"]
    print(f"\nDone: {total} post(s) written ({written['fa']} fa, {written['en']} en), {skipped} non-post item(s) skipped, {conflicts} existing post(s) skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
