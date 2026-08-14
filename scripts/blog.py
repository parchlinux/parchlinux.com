from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT_ROOT = ROOT / "content" / "blog"
PUBLIC_ROOT = ROOT / "public"
MEDIA_ROOT = PUBLIC_ROOT / "blog"
LOCALES = ("fa", "en")
KNOWN_FIELDS = (
    "title",
    "description",
    "date",
    "updated",
    "category",
    "tags",
    "author",
    "image",
    "featured",
    "draft",
)
REQUIRED_FIELDS = ("title", "description", "date", "category", "author")
IMAGE_PATTERN = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+[\"'][^\"']*[\"'])?\)")
PERSIAN_PATTERN = re.compile(r"[\u0600-\u06ff]")


@dataclass
class Post:
    locale: str
    file: Path
    slug: str
    meta: dict[str, object]
    body: str

    @property
    def media_dir(self) -> Path:
        return MEDIA_ROOT / self.locale / self.slug

    @property
    def route(self) -> str:
        return f"/{self.locale}/blog/{self.slug}"


def clean_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value.startswith('"') and value.endswith('"'):
        try:
            parsed = json.loads(value)
            if isinstance(parsed, str):
                return parsed
        except json.JSONDecodeError:
            return value[1:-1]
    if len(value) >= 2 and value.startswith("'") and value.endswith("'"):
        return value[1:-1]
    return value


def parse_value(key: str, value: str) -> object:
    value = value.strip()
    if key in {"featured", "draft"}:
        return value.lower() in {"true", "yes", "1"}
    if key == "tags":
        if value.startswith("[") and value.endswith("]"):
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    return [str(item).strip() for item in parsed if str(item).strip()]
            except json.JSONDecodeError:
                pass
        return [clean_scalar(item) for item in value.split(",") if clean_scalar(item)]
    return clean_scalar(value)


def parse_document(source: str) -> tuple[dict[str, object], str]:
    if not source.startswith("---"):
        return {}, source.strip()
    match = re.match(r"^---\s*\n(.*?)\n---\s*(?:\n|$)(.*)$", source, flags=re.S)
    if not match:
        return {}, source.strip()
    raw, body = match.groups()
    meta: dict[str, object] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        if key:
            meta[key] = parse_value(key, value)
    return meta, body.strip()


def encode_value(key: str, value: object) -> str:
    if key in {"featured", "draft"}:
        return "true" if bool(value) else "false"
    if key == "tags":
        items = value if isinstance(value, list) else []
        return json.dumps(items, ensure_ascii=False)
    return json.dumps(str(value), ensure_ascii=False)


def serialize_document(meta: dict[str, object], body: str) -> str:
    lines = ["---"]
    emitted: set[str] = set()
    for key in KNOWN_FIELDS:
        if key not in meta:
            continue
        value = meta[key]
        if value is None or value == "":
            continue
        lines.append(f"{key}: {encode_value(key, value)}")
        emitted.add(key)
    for key in sorted(meta):
        if key in emitted or key in KNOWN_FIELDS:
            continue
        value = meta[key]
        if value is None or value == "":
            continue
        lines.append(f"{key}: {encode_value(key, value)}")
    lines.extend(["---", "", body.rstrip(), ""])
    return "\n".join(lines)


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[\s_/]+", "-", value)
    value = re.sub(r"[^\w\-\u0600-\u06ff]", "", value, flags=re.UNICODE)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "post"


def infer_locale(text: str) -> str:
    persian = len(PERSIAN_PATTERN.findall(text))
    latin = len(re.findall(r"[A-Za-z]", text))
    return "fa" if persian >= max(1, int(latin * 0.28)) else "en"


def post_dir(locale: str) -> Path:
    return CONTENT_ROOT / locale


def post_path(locale: str, slug: str) -> Path:
    return post_dir(locale) / f"{slug}.md"


def load_post(locale: str, slug: str) -> Post:
    path = post_path(locale, slug)
    if not path.exists():
        candidates = [entry for entry in post_dir(locale).glob("*.md") if entry.stem == slug]
        if not candidates:
            raise FileNotFoundError(f"post not found: {locale}/{slug}")
        path = candidates[0]
    meta, body = parse_document(path.read_text(encoding="utf-8"))
    return Post(locale=locale, file=path, slug=path.stem, meta=meta, body=body)


def all_posts(locale: str | None = None) -> list[Post]:
    locales = (locale,) if locale else LOCALES
    posts: list[Post] = []
    for current in locales:
        directory = post_dir(current)
        if not directory.exists():
            continue
        for path in sorted(directory.glob("*.md")):
            meta, body = parse_document(path.read_text(encoding="utf-8"))
            posts.append(Post(current, path, path.stem, meta, body))
    return posts


def ensure_roots() -> None:
    for locale in LOCALES:
        post_dir(locale).mkdir(parents=True, exist_ok=True)
        (MEDIA_ROOT / locale).mkdir(parents=True, exist_ok=True)


def today() -> str:
    return datetime.now(timezone.utc).date().isoformat()


def ask(label: str, default: str = "", required: bool = False) -> str:
    suffix = f" [{default}]" if default else ""
    while True:
        value = input(f"{label}{suffix}: ").strip()
        if value:
            return value
        if default:
            return default
        if not required:
            return ""
        print("This value is required.")


def ask_bool(label: str, default: bool = False) -> bool:
    marker = "Y/n" if default else "y/N"
    value = input(f"{label} [{marker}]: ").strip().lower()
    if not value:
        return default
    return value in {"y", "yes", "1", "true"}


def normalize_tags(raw: str) -> list[str]:
    return [item.strip() for item in raw.split(",") if item.strip()]


def resolve_post(args: argparse.Namespace) -> Post:
    locale = getattr(args, "locale", None)
    slug = getattr(args, "slug", None)
    if locale and slug:
        return load_post(locale, slug)
    return choose_post(locale)


def choose_post(locale: str | None = None) -> Post:
    posts = all_posts(locale)
    if not posts:
        raise RuntimeError("no posts found")
    for index, post in enumerate(posts, 1):
        status = "draft" if bool(post.meta.get("draft", False)) else "published"
        title = str(post.meta.get("title") or post.slug)
        print(f"{index:>3}. [{post.locale}] {title}  ({post.slug}, {status})")
    raw = ask("Post number", required=True)
    try:
        index = int(raw)
    except ValueError as exc:
        raise RuntimeError("invalid post number") from exc
    if index < 1 or index > len(posts):
        raise RuntimeError("post number out of range")
    return posts[index - 1]


def cmd_new(args: argparse.Namespace) -> int:
    ensure_roots()
    interactive_meta = bool(args.interactive_meta or args.title is None)
    locale = args.locale or ask("Language (fa/en)", "fa", True)
    if locale not in LOCALES:
        raise RuntimeError("language must be fa or en")
    title = args.title or ask("Title", required=True)
    default_slug = slugify(title)
    slug = slugify(args.slug or (ask("Slug", default_slug, True) if interactive_meta else default_slug))
    path = post_path(locale, slug)
    if path.exists():
        raise RuntimeError(f"post already exists: {path.relative_to(ROOT)}")
    description = args.description if args.description is not None else (ask("Description") if interactive_meta else "")
    default_category = "عمومی" if locale == "fa" else "General"
    category = args.category or (ask("Category", default_category) if interactive_meta else default_category)
    raw_tags = args.tags if args.tags is not None else (ask("Tags, comma separated") if interactive_meta else "")
    tags = normalize_tags(raw_tags)
    author = args.author or (ask("Author", "Parch GNU/Linux") if interactive_meta else "Parch GNU/Linux")
    featured = args.featured or (ask_bool("Featured", False) if interactive_meta else False)
    draft = not args.publish
    meta: dict[str, object] = {
        "title": title,
        "description": description,
        "date": args.date or today(),
        "category": category,
        "tags": tags,
        "author": author,
        "featured": featured,
        "draft": draft,
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(serialize_document(meta, ""), encoding="utf-8")
    (MEDIA_ROOT / locale / slug).mkdir(parents=True, exist_ok=True)
    print(f"created {path.relative_to(ROOT)}")
    print(f"media   {(MEDIA_ROOT / locale / slug).relative_to(ROOT)}")
    print(f"route   /{locale}/blog/{slug}")
    if args.edit:
        open_editor(path)
    return 0


def cmd_list(args: argparse.Namespace) -> int:
    posts = all_posts(args.locale)
    query = (args.search or "").casefold()
    status = args.status
    rows: list[Post] = []
    for post in posts:
        is_draft = bool(post.meta.get("draft", False))
        if status == "draft" and not is_draft:
            continue
        if status == "published" and is_draft:
            continue
        haystack = " ".join([
            post.slug,
            str(post.meta.get("title", "")),
            str(post.meta.get("description", "")),
            str(post.meta.get("category", "")),
            " ".join(post.meta.get("tags", []) if isinstance(post.meta.get("tags"), list) else []),
        ]).casefold()
        if query and query not in haystack:
            continue
        rows.append(post)
    if not rows:
        print("No posts found.")
        return 0
    print(f"{'LANG':<4} {'STATUS':<9} {'DATE':<10} {'SLUG':<34} TITLE")
    print("-" * 100)
    for post in sorted(rows, key=lambda item: str(item.meta.get("date", "")), reverse=True):
        state = "draft" if bool(post.meta.get("draft", False)) else "published"
        date = str(post.meta.get("date", ""))[:10]
        title = str(post.meta.get("title") or post.slug)
        print(f"{post.locale:<4} {state:<9} {date:<10} {post.slug[:34]:<34} {title}")
    print(f"\n{len(rows)} post(s)")
    return 0


def cmd_show(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    print(f"File:     {post.file.relative_to(ROOT)}")
    print(f"Media:    {post.media_dir.relative_to(ROOT)}")
    print(f"Route:    {post.route}")
    print(f"Status:   {'draft' if bool(post.meta.get('draft', False)) else 'published'}")
    print(f"Title:    {post.meta.get('title', '')}")
    print(f"Date:     {post.meta.get('date', '')}")
    print(f"Category: {post.meta.get('category', '')}")
    tags = post.meta.get("tags", [])
    print(f"Tags:     {', '.join(tags) if isinstance(tags, list) else tags}")
    print(f"Author:   {post.meta.get('author', '')}")
    print(f"Cover:    {post.meta.get('image', '')}")
    print(f"Featured: {'yes' if bool(post.meta.get('featured', False)) else 'no'}")
    print(f"Words:    {len(re.findall(r'\\S+', post.body))}")
    return 0


def cmd_edit(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    meta = dict(post.meta)
    fields = args.field or []
    if fields:
        for assignment in fields:
            if "=" not in assignment:
                raise RuntimeError(f"invalid assignment: {assignment}")
            key, value = assignment.split("=", 1)
            key = key.strip()
            value = value.strip()
            if key == "tags":
                meta[key] = normalize_tags(value)
            elif key in {"featured", "draft"}:
                meta[key] = value.lower() in {"1", "true", "yes", "y"}
            else:
                meta[key] = value
    else:
        meta["title"] = ask("Title", str(meta.get("title", "")), True)
        meta["description"] = ask("Description", str(meta.get("description", "")))
        meta["date"] = ask("Date", str(meta.get("date", today())), True)
        updated = ask("Updated", str(meta.get("updated", "")))
        if updated:
            meta["updated"] = updated
        else:
            meta.pop("updated", None)
        meta["category"] = ask("Category", str(meta.get("category", "")), True)
        current_tags = meta.get("tags", [])
        tag_text = ", ".join(current_tags) if isinstance(current_tags, list) else str(current_tags)
        meta["tags"] = normalize_tags(ask("Tags", tag_text))
        meta["author"] = ask("Author", str(meta.get("author", "Parch GNU/Linux")), True)
        image = ask("Cover image", str(meta.get("image", "")))
        if image:
            meta["image"] = image
        else:
            meta.pop("image", None)
        meta["featured"] = ask_bool("Featured", bool(meta.get("featured", False)))
        meta["draft"] = ask_bool("Draft", bool(meta.get("draft", False)))
    post.file.write_text(serialize_document(meta, post.body), encoding="utf-8")
    print(f"updated {post.file.relative_to(ROOT)}")
    return 0


def open_editor(path: Path) -> None:
    editor = os.environ.get("VISUAL") or os.environ.get("EDITOR")
    if not editor:
        print(f"Set $EDITOR or $VISUAL, then edit: {path.relative_to(ROOT)}")
        return
    result = subprocess.run([*editor.split(), str(path)], cwd=ROOT)
    if result.returncode != 0:
        raise RuntimeError(f"editor exited with code {result.returncode}")


def cmd_write(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    open_editor(post.file)
    return 0


def unique_media_path(directory: Path, name: str) -> Path:
    candidate = directory / name
    if not candidate.exists():
        return candidate
    stem = candidate.stem
    suffix = candidate.suffix
    counter = 2
    while True:
        candidate = directory / f"{stem}-{counter}{suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def cmd_image(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    source = Path(args.file).expanduser().resolve()
    if not source.is_file():
        raise RuntimeError(f"image not found: {source}")
    post.media_dir.mkdir(parents=True, exist_ok=True)
    suffix = source.suffix.lower() or ".img"
    if args.cover:
        name = f"cover{suffix}" if not args.name else args.name
    elif args.name:
        name = args.name
    else:
        existing = [p for p in post.media_dir.iterdir() if p.is_file() and p.name != "cover" + p.suffix]
        name = f"{len(existing) + 1:02d}-{slugify(source.stem)}{suffix}"
    if not Path(name).suffix:
        name += suffix
    target = post.media_dir / name
    if target.exists() and not args.replace:
        target = unique_media_path(post.media_dir, name)
    shutil.copy2(source, target)
    url = "/" + target.relative_to(PUBLIC_ROOT).as_posix()
    if args.cover:
        meta = dict(post.meta)
        meta["image"] = url
        post.file.write_text(serialize_document(meta, post.body), encoding="utf-8")
        print(f"cover   {url}")
    else:
        alt = args.alt or str(post.meta.get("title") or post.slug)
        snippet = f"![{alt}]({url})"
        if args.append:
            body = post.body.rstrip() + "\n\n" + snippet + "\n"
            post.file.write_text(serialize_document(post.meta, body), encoding="utf-8")
            print(f"added   {snippet}")
        else:
            print(snippet)
    print(f"file    {target.relative_to(ROOT)}")
    return 0


def cmd_media(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    if not post.media_dir.exists():
        print("No media directory.")
        return 0
    files = sorted(path for path in post.media_dir.rglob("*") if path.is_file())
    if not files:
        print("No media files.")
        return 0
    for path in files:
        print("/" + path.relative_to(PUBLIC_ROOT).as_posix())
    return 0


def cmd_status(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    meta = dict(post.meta)
    if args.state == "published":
        meta["draft"] = False
    elif args.state == "draft":
        meta["draft"] = True
    else:
        raise RuntimeError("state must be draft or published")
    if args.featured is not None:
        meta["featured"] = args.featured
    post.file.write_text(serialize_document(meta, post.body), encoding="utf-8")
    print(f"{args.state}: {post.locale}/{post.slug}")
    return 0


def rewrite_media_urls(text: str, locale: str, old_slug: str, new_slug: str) -> str:
    return text.replace(f"/blog/{locale}/{old_slug}/", f"/blog/{locale}/{new_slug}/")


def cmd_rename(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    new_slug = slugify(args.new_slug or ask("New slug", required=True))
    if new_slug == post.slug:
        print("Slug unchanged.")
        return 0
    target_file = post_path(post.locale, new_slug)
    if target_file.exists():
        raise RuntimeError(f"target exists: {target_file.relative_to(ROOT)}")
    old_media = post.media_dir
    new_media = MEDIA_ROOT / post.locale / new_slug
    meta = dict(post.meta)
    body = rewrite_media_urls(post.body, post.locale, post.slug, new_slug)
    if isinstance(meta.get("image"), str):
        meta["image"] = rewrite_media_urls(str(meta["image"]), post.locale, post.slug, new_slug)
    target_file.write_text(serialize_document(meta, body), encoding="utf-8")
    post.file.unlink()
    if old_media.exists():
        new_media.parent.mkdir(parents=True, exist_ok=True)
        if new_media.exists():
            raise RuntimeError(f"media target exists: {new_media.relative_to(ROOT)}")
        old_media.rename(new_media)
    print(f"renamed {post.locale}/{post.slug} -> {post.locale}/{new_slug}")
    return 0


def cmd_delete(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    if not args.force:
        confirmation = ask(f"Type {post.slug} to delete")
        if confirmation != post.slug:
            print("Cancelled.")
            return 1
    post.file.unlink()
    if post.media_dir.exists() and not args.keep_media:
        shutil.rmtree(post.media_dir)
    print(f"deleted {post.locale}/{post.slug}")
    return 0


def cmd_move(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    target_locale = args.to
    if target_locale == post.locale:
        print("Locale unchanged.")
        return 0
    target_file = post_path(target_locale, post.slug)
    if target_file.exists():
        raise RuntimeError(f"target exists: {target_file.relative_to(ROOT)}")
    target_file.parent.mkdir(parents=True, exist_ok=True)
    meta = dict(post.meta)
    body = post.body.replace(f"/blog/{post.locale}/{post.slug}/", f"/blog/{target_locale}/{post.slug}/")
    if isinstance(meta.get("image"), str):
        meta["image"] = str(meta["image"]).replace(f"/blog/{post.locale}/{post.slug}/", f"/blog/{target_locale}/{post.slug}/")
    target_file.write_text(serialize_document(meta, body), encoding="utf-8")
    post.file.unlink()
    if post.media_dir.exists():
        target_media = MEDIA_ROOT / target_locale / post.slug
        target_media.parent.mkdir(parents=True, exist_ok=True)
        if target_media.exists():
            raise RuntimeError(f"media target exists: {target_media.relative_to(ROOT)}")
        post.media_dir.rename(target_media)
    print(f"moved {post.locale}/{post.slug} -> {target_locale}/{post.slug}")
    return 0


def local_public_path(url: str) -> Path | None:
    if not url.startswith("/") or url.startswith("//"):
        return None
    clean = url.split("?", 1)[0].split("#", 1)[0].lstrip("/")
    return PUBLIC_ROOT / clean


def validate_post(post: Post) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    for field in REQUIRED_FIELDS:
        if not str(post.meta.get(field, "")).strip():
            errors.append(f"missing {field}")
    if not post.body.strip():
        warnings.append("empty body")
    date = str(post.meta.get("date", "")).strip()
    if date:
        try:
            datetime.fromisoformat(date.replace("Z", "+00:00"))
        except ValueError:
            errors.append(f"invalid date: {date}")
    if infer_locale(str(post.meta.get("title", "")) + " " + post.body[:6000]) != post.locale:
        warnings.append("content language may not match directory")
    cover = post.meta.get("image")
    if isinstance(cover, str) and cover:
        local = local_public_path(cover)
        if local and not local.exists():
            errors.append(f"missing cover: {cover}")
        if local and not cover.startswith(f"/blog/{post.locale}/{post.slug}/"):
            warnings.append(f"cover outside standard media directory: {cover}")
    else:
        warnings.append("no cover image")
    for alt, url in IMAGE_PATTERN.findall(post.body):
        local = local_public_path(url)
        if local and not local.exists():
            errors.append(f"missing inline image: {url}")
        if not alt.strip():
            warnings.append(f"image has empty alt text: {url}")
        if local and not url.startswith(f"/blog/{post.locale}/{post.slug}/"):
            warnings.append(f"image outside standard media directory: {url}")
    if re.search(r"^#\s+", post.body, flags=re.M):
        warnings.append("body contains H1; use ## because title is already H1")
    return errors, warnings


def cmd_validate(args: argparse.Namespace) -> int:
    ensure_roots()
    posts = all_posts(args.locale)
    error_count = 0
    warning_count = 0
    known = {(post.locale, post.slug) for post in posts}
    for post in posts:
        errors, warnings = validate_post(post)
        if args.fix:
            post.media_dir.mkdir(parents=True, exist_ok=True)
            post.file.write_text(serialize_document(post.meta, post.body), encoding="utf-8")
        if errors or warnings:
            print(f"[{post.locale}] {post.slug}")
            for message in errors:
                print(f"  ERROR   {message}")
            for message in warnings:
                print(f"  WARN    {message}")
        error_count += len(errors)
        warning_count += len(warnings)
    orphan_media: list[Path] = []
    for locale in LOCALES:
        root = MEDIA_ROOT / locale
        if not root.exists():
            continue
        for directory in root.iterdir():
            if directory.is_dir() and (locale, directory.name) not in known:
                orphan_media.append(directory)
    for directory in orphan_media:
        print(f"[media] {directory.relative_to(ROOT)}")
        print("  WARN    orphan media directory")
        warning_count += 1
    print(f"\nChecked {len(posts)} post(s): {error_count} error(s), {warning_count} warning(s)")
    return 1 if error_count else 0


def cmd_format(args: argparse.Namespace) -> int:
    targets = all_posts(args.locale) if args.all else [resolve_post(args)]
    for post in targets:
        post.file.write_text(serialize_document(post.meta, post.body), encoding="utf-8")
        print(f"formatted {post.file.relative_to(ROOT)}")
    return 0


def cmd_stats(args: argparse.Namespace) -> int:
    posts = all_posts(args.locale)
    published = [post for post in posts if not bool(post.meta.get("draft", False))]
    drafts = [post for post in posts if bool(post.meta.get("draft", False))]
    featured = [post for post in posts if bool(post.meta.get("featured", False))]
    covers = [post for post in posts if post.meta.get("image")]
    categories = Counter(str(post.meta.get("category", "")) for post in posts if post.meta.get("category"))
    tags = Counter(tag for post in posts for tag in (post.meta.get("tags", []) if isinstance(post.meta.get("tags"), list) else []))
    words = sum(len(re.findall(r"\S+", post.body)) for post in posts)
    print(f"Posts:       {len(posts)}")
    print(f"Published:   {len(published)}")
    print(f"Drafts:      {len(drafts)}")
    print(f"Featured:    {len(featured)}")
    print(f"With cover:  {len(covers)}")
    print(f"Words:       {words}")
    for locale in LOCALES:
        print(f"{locale.upper()}:          {sum(1 for post in posts if post.locale == locale)}")
    if categories:
        print("\nCategories:")
        for name, count in categories.most_common():
            print(f"  {count:>3}  {name}")
    if tags:
        print("\nTop tags:")
        for name, count in tags.most_common(15):
            print(f"  {count:>3}  {name}")
    return 0


def cmd_import(args: argparse.Namespace) -> int:
    script = ROOT / "scripts" / "wordpress-to-markdown.py"
    command = [sys.executable, str(script), str(Path(args.file).expanduser())]
    if args.locale:
        command.extend(["--locale", args.locale])
    if args.include_drafts:
        command.append("--include-drafts")
    if args.download_images:
        command.append("--download-images")
    command.extend(["--conflict", args.conflict])
    result = subprocess.run(command, cwd=ROOT)
    if result.returncode != 0:
        return result.returncode
    print("\nRunning validation...")
    validation_args = argparse.Namespace(locale=None, fix=False)
    return cmd_validate(validation_args)


def cmd_path(args: argparse.Namespace) -> int:
    post = resolve_post(args)
    print(post.file)
    return 0


def interactive() -> int:
    ensure_roots()
    actions = {
        "1": ("List/search posts", interactive_list),
        "2": ("Create post", interactive_new),
        "3": ("Edit metadata", interactive_edit),
        "4": ("Edit Markdown", interactive_write),
        "5": ("Add image", interactive_image),
        "6": ("Publish / draft", interactive_status),
        "7": ("Rename slug", interactive_rename),
        "8": ("Move language", interactive_move),
        "9": ("Delete post", interactive_delete),
        "10": ("Validate blog", interactive_validate),
        "11": ("Statistics", interactive_stats),
        "12": ("Import WordPress", interactive_import),
    }
    while True:
        print("\nParch Blog Manager")
        print("=" * 40)
        for key, (label, _) in actions.items():
            print(f"{key:>2}. {label}")
        print(" 0. Exit")
        choice = input("\nChoose: ").strip()
        if choice == "0":
            return 0
        action = actions.get(choice)
        if not action:
            print("Invalid choice.")
            continue
        try:
            action[1]()
        except (RuntimeError, FileNotFoundError) as exc:
            print(f"Error: {exc}")


def interactive_list() -> None:
    query = ask("Search")
    locale = ask("Language fa/en/all", "all")
    args = argparse.Namespace(locale=None if locale == "all" else locale, search=query, status="all")
    cmd_list(args)


def interactive_new() -> None:
    args = argparse.Namespace(locale=None, title=None, slug=None, description=None, category=None, tags=None, author=None, date=None, featured=False, publish=False, edit=False, interactive_meta=True)
    cmd_new(args)


def interactive_edit() -> None:
    post = choose_post()
    cmd_edit(argparse.Namespace(locale=post.locale, slug=post.slug, field=[]))


def interactive_write() -> None:
    post = choose_post()
    cmd_write(argparse.Namespace(locale=post.locale, slug=post.slug))


def interactive_image() -> None:
    post = choose_post()
    file = ask("Image file", required=True)
    cover = ask_bool("Use as cover", False)
    alt = "" if cover else ask("Alt text", str(post.meta.get("title", post.slug)))
    append = False if cover else ask_bool("Append Markdown to end of post", False)
    args = argparse.Namespace(locale=post.locale, slug=post.slug, file=file, cover=cover, name=None, alt=alt, append=append, replace=False)
    cmd_image(args)


def interactive_status() -> None:
    post = choose_post()
    state = ask("State draft/published", "published" if bool(post.meta.get("draft", False)) else "draft", True)
    cmd_status(argparse.Namespace(locale=post.locale, slug=post.slug, state=state, featured=None))


def interactive_rename() -> None:
    post = choose_post()
    cmd_rename(argparse.Namespace(locale=post.locale, slug=post.slug, new_slug=None))


def interactive_move() -> None:
    post = choose_post()
    target = "en" if post.locale == "fa" else "fa"
    target = ask("Move to fa/en", target, True)
    cmd_move(argparse.Namespace(locale=post.locale, slug=post.slug, to=target))


def interactive_delete() -> None:
    post = choose_post()
    cmd_delete(argparse.Namespace(locale=post.locale, slug=post.slug, force=False, keep_media=False))


def interactive_validate() -> None:
    cmd_validate(argparse.Namespace(locale=None, fix=False))


def interactive_stats() -> None:
    cmd_stats(argparse.Namespace(locale=None))


def interactive_import() -> None:
    file = ask("WordPress XML", required=True)
    include_drafts = ask_bool("Include WordPress drafts", False)
    download_images = ask_bool("Download and organize WordPress images", True)
    conflict = ask("Existing post handling skip/overwrite/suffix", "skip", True)
    cmd_import(argparse.Namespace(file=file, locale=None, include_drafts=include_drafts, download_images=download_images, conflict=conflict))


def add_post_selector(parser: argparse.ArgumentParser, required: bool = True) -> None:
    parser.add_argument("locale", choices=LOCALES, nargs=None if required else "?")
    parser.add_argument("slug", nargs=None if required else "?")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="blog", description="Parch Markdown blog manager")
    sub = parser.add_subparsers(dest="command")

    new = sub.add_parser("new")
    new.add_argument("--locale", choices=LOCALES)
    new.add_argument("--title")
    new.add_argument("--slug")
    new.add_argument("--description")
    new.add_argument("--category")
    new.add_argument("--tags")
    new.add_argument("--author")
    new.add_argument("--date")
    new.add_argument("--featured", action="store_true")
    new.add_argument("--publish", action="store_true")
    new.add_argument("--edit", action="store_true")
    new.add_argument("--interactive-meta", action="store_true")
    new.set_defaults(func=cmd_new)

    listing = sub.add_parser("list", aliases=["ls"])
    listing.add_argument("--locale", choices=LOCALES)
    listing.add_argument("--status", choices=("all", "draft", "published"), default="all")
    listing.add_argument("--search", "-s")
    listing.set_defaults(func=cmd_list)

    show = sub.add_parser("show")
    add_post_selector(show, False)
    show.set_defaults(func=cmd_show)

    edit = sub.add_parser("edit")
    add_post_selector(edit, False)
    edit.add_argument("--field", "-f", action="append")
    edit.set_defaults(func=cmd_edit)

    write = sub.add_parser("write")
    add_post_selector(write, False)
    write.set_defaults(func=cmd_write)

    image = sub.add_parser("image", aliases=["img"])
    add_post_selector(image, True)
    image.add_argument("file")
    image.add_argument("--cover", action="store_true")
    image.add_argument("--name")
    image.add_argument("--alt")
    image.add_argument("--append", action="store_true")
    image.add_argument("--replace", action="store_true")
    image.set_defaults(func=cmd_image)

    media = sub.add_parser("media")
    add_post_selector(media, False)
    media.set_defaults(func=cmd_media)

    status = sub.add_parser("status")
    add_post_selector(status, True)
    status.add_argument("state", choices=("draft", "published"))
    feature = status.add_mutually_exclusive_group()
    feature.add_argument("--featured", dest="featured", action="store_true")
    feature.add_argument("--not-featured", dest="featured", action="store_false")
    status.set_defaults(func=cmd_status, featured=None)

    rename = sub.add_parser("rename")
    add_post_selector(rename, True)
    rename.add_argument("new_slug", nargs="?")
    rename.set_defaults(func=cmd_rename)

    move = sub.add_parser("move")
    add_post_selector(move, True)
    move.add_argument("--to", choices=LOCALES, required=True)
    move.set_defaults(func=cmd_move)

    delete = sub.add_parser("delete", aliases=["rm"])
    add_post_selector(delete, True)
    delete.add_argument("--force", action="store_true")
    delete.add_argument("--keep-media", action="store_true")
    delete.set_defaults(func=cmd_delete)

    validate = sub.add_parser("validate", aliases=["check", "doctor"])
    validate.add_argument("--locale", choices=LOCALES)
    validate.add_argument("--fix", action="store_true")
    validate.set_defaults(func=cmd_validate)

    formatter = sub.add_parser("format", aliases=["fmt"])
    formatter.add_argument("locale", choices=LOCALES, nargs="?")
    formatter.add_argument("slug", nargs="?")
    formatter.add_argument("--all", action="store_true")
    formatter.set_defaults(func=cmd_format)

    stats = sub.add_parser("stats")
    stats.add_argument("--locale", choices=LOCALES)
    stats.set_defaults(func=cmd_stats)

    importer = sub.add_parser("import-wordpress", aliases=["import"])
    importer.add_argument("file")
    importer.add_argument("--locale", choices=("auto", "fa", "en"))
    importer.add_argument("--include-drafts", action="store_true")
    importer.add_argument("--download-images", action="store_true")
    importer.add_argument("--conflict", choices=("skip", "overwrite", "suffix"), default="skip")
    importer.set_defaults(func=cmd_import)

    path_cmd = sub.add_parser("path")
    add_post_selector(path_cmd, False)
    path_cmd.set_defaults(func=cmd_path)

    return parser


def main() -> int:
    ensure_roots()
    parser = build_parser()
    args = parser.parse_args()
    if not args.command:
        return interactive()
    try:
        return args.func(args)
    except (RuntimeError, FileNotFoundError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
