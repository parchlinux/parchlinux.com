# Parch Blog Manager

The blog is managed from one CLI:

```bash
python3 scripts/blog.py
```

Running it without a command opens the interactive manager.

## Structure

Each post is one Markdown file:

```text
content/blog/fa/<slug>.md
content/blog/en/<slug>.md
```

Each post has its own media directory:

```text
public/blog/fa/<slug>/
public/blog/en/<slug>/
```

A Persian post named `install-parch` therefore uses:

```text
content/blog/fa/install-parch.md
public/blog/fa/install-parch/cover.webp
public/blog/fa/install-parch/01-installer.webp
```

Its public image URLs are:

```text
/blog/fa/install-parch/cover.webp
/blog/fa/install-parch/01-installer.webp
```

## Interactive manager

```bash
python3 scripts/blog.py
```

The menu includes listing and searching, creating posts, editing metadata, opening Markdown in your editor, adding images, publishing or returning to draft, renaming slugs, moving language, deleting posts, validation, statistics and WordPress import.

## Create a post

Interactive:

```bash
python3 scripts/blog.py new
```

Direct:

```bash
python3 scripts/blog.py new \
  --locale fa \
  --title "آموزش نصب پارچ" \
  --slug install-parch \
  --description "راهنمای نصب پارچ گنو/لینوکس" \
  --category "آموزش" \
  --tags "پارچ,لینوکس,نصب"
```

New posts are drafts unless `--publish` is passed.

## List and search

```bash
python3 scripts/blog.py list
python3 scripts/blog.py list --locale fa
python3 scripts/blog.py list --status draft
python3 scripts/blog.py list --search "gnome"
```

`ls` is an alias for `list`.

## Inspect a post

```bash
python3 scripts/blog.py show fa install-parch
```

It prints the file, media directory, route, status, title, date, category, tags, author, cover, featured state and word count.

## Edit metadata

Interactive metadata editor:

```bash
python3 scripts/blog.py edit fa install-parch
```

Set individual fields without prompts:

```bash
python3 scripts/blog.py edit fa install-parch \
  -f 'category=آموزش' \
  -f 'tags=پارچ,نصب,لینوکس' \
  -f 'featured=true'
```

## Edit Markdown

Set an editor once in your shell:

```bash
export EDITOR="code --wait"
```

Then:

```bash
python3 scripts/blog.py write fa install-parch
```

The complete Markdown file opens in the editor.

## Add a cover

```bash
python3 scripts/blog.py image fa install-parch ~/Pictures/cover.webp --cover
```

The image is copied into the post media directory and `image:` in frontmatter is updated automatically.

## Add an image inside the article

```bash
python3 scripts/blog.py image fa install-parch ~/Pictures/installer.webp --alt "نصاب پارچ"
```

The CLI copies and names the image, then prints the exact Markdown to paste where the image should appear:

```md
![نصاب پارچ](/blog/fa/install-parch/01-installer.webp)
```

To append it to the end of the article automatically:

```bash
python3 scripts/blog.py image fa install-parch ~/Pictures/installer.webp --alt "نصاب پارچ" --append
```

See all media belonging to one post:

```bash
python3 scripts/blog.py media fa install-parch
```

## Publish and draft

```bash
python3 scripts/blog.py status fa install-parch published
python3 scripts/blog.py status fa install-parch draft
```

Featured state can be changed at the same time:

```bash
python3 scripts/blog.py status fa install-parch published --featured
python3 scripts/blog.py status fa install-parch published --not-featured
```

## Rename a slug

```bash
python3 scripts/blog.py rename fa install-parch parch-installation
```

The CLI renames the Markdown file, renames the media directory and rewrites media URLs inside the post and frontmatter.

## Move a post between languages

```bash
python3 scripts/blog.py move fa install-parch --to en
```

The Markdown file, media directory and media URLs move together.

## Delete a post

```bash
python3 scripts/blog.py delete fa install-parch
```

It asks for the slug before deleting. To delete without confirmation:

```bash
python3 scripts/blog.py delete fa install-parch --force
```

Keep the media directory if needed:

```bash
python3 scripts/blog.py delete fa install-parch --keep-media
```

## Validate everything

```bash
python3 scripts/blog.py validate
```

Aliases:

```bash
python3 scripts/blog.py check
python3 scripts/blog.py doctor
```

Validation checks required metadata, dates, content language, missing covers, missing inline images, image alt text, media paths, accidental H1 headings and orphan media directories.

Normalize frontmatter formatting and create missing media directories:

```bash
python3 scripts/blog.py validate --fix
```

## Format Markdown metadata

One post:

```bash
python3 scripts/blog.py format fa install-parch
```

All posts:

```bash
python3 scripts/blog.py format --all
```

## Statistics

```bash
python3 scripts/blog.py stats
```

It reports total posts, published posts, drafts, featured posts, covers, word count, language totals, categories and top tags.

## WordPress import

Use the manager instead of calling the converter directly:

```bash
python3 scripts/blog.py import-wordpress wordpress-export.xml
```

The importer detects Persian and English separately and skips existing slugs by default.

Download WordPress images into the same organized media structure and rewrite Markdown URLs:

```bash
python3 scripts/blog.py import-wordpress wordpress-export.xml --download-images
```

Include drafts:

```bash
python3 scripts/blog.py import-wordpress wordpress-export.xml --include-drafts
```

Conflict modes:

```bash
python3 scripts/blog.py import-wordpress wordpress-export.xml --conflict skip
python3 scripts/blog.py import-wordpress wordpress-export.xml --conflict overwrite
python3 scripts/blog.py import-wordpress wordpress-export.xml --conflict suffix
```

The interactive manager asks whether WordPress images should be downloaded and organized.

## Post format

```md
---
title: "عنوان مقاله"
description: "توضیح کوتاه و دقیق"
date: "2026-08-14"
category: "آموزش"
tags: ["پارچ", "لینوکس"]
author: "Parch GNU/Linux"
image: "/blog/fa/install-parch/cover.webp"
featured: false
draft: true
---

مقدمه مقاله.

## بخش اول

متن مقاله.

![توضیح تصویر](/blog/fa/install-parch/01-example.webp)

## بخش دوم

متن بیشتر.
```

Use `##` for top-level sections inside the article. The page title already provides the H1.

## Recommended workflow

```text
new → image --cover → write → image → validate → status published
```

For migrated content:

```text
import-wordpress --download-images → validate → edit/write where needed → publish
```
