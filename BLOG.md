# Parch Blog content

The blog reads Markdown files directly from:

- `content/blog/fa/*.md`
- `content/blog/en/*.md`

Each post uses frontmatter like this:

```md
---
title: "Post title"
description: "Short SEO/card description"
date: "2026-08-14"
updated: "2026-08-15"
category: "Guides"
tags: ["linux", "parch"]
author: "Parch Team"
image: "/images/blog/example.webp"
featured: false
draft: false
---

Markdown starts here.
```

`image` is optional. Without it, the Parch abstract journal visual is used automatically.

## WordPress migration

Export your WordPress site from **Tools → Export → Posts** and save the WXR/XML file. Then run:

```bash
python3 scripts/wordpress-to-markdown.py wordpress-export.xml
```

The converter detects Persian and English separately for every post. Persian posts are written to `content/blog/fa/` and English posts to `content/blog/en/`. You can still force a single language with `--locale fa` or `--locale en`. Percent-encoded WordPress slugs are decoded before filenames are created. The converter handles published posts by default, keeps categories/tags, converts common WordPress HTML to Markdown, and uses the first content image as the post cover when available.

To include drafts as Markdown files too:

```bash
python3 scripts/wordpress-to-markdown.py wordpress-export.xml --include-drafts
```

Review migrated Markdown once before publishing, especially posts that used WordPress shortcodes, page-builder blocks, embeds, galleries, or custom HTML.

The included Markdown posts are sample content for previewing the layout; replace or delete them after importing the real WordPress archive.
