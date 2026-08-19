import React from "react";
import CodeBlock from "./code-block";
import ImageGallery, { GalleryImage } from "./image-gallery";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function headingId(text: string) {
  return text
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[`*_~\[\](){}<>]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainInlineText(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  let inCode = false;
  let inGallery = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (trimmed.startsWith(":::gallery")) {
      inGallery = true;
      continue;
    }
    if (inGallery && trimmed.startsWith(":::")) {
      inGallery = false;
      continue;
    }
    if (inCode || inGallery) continue;

    const match = /^(##|###)\s+(.+)$/.exec(trimmed);
    if (!match) continue;
    const text = plainInlineText(match[2]);
    items.push({
      id: headingId(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return items;
}

function isUrlOrLatin(text: string): boolean {
  return /^https?:\/\//i.test(text) || !/[\u0600-\u06FF]/.test(text);
}

function parseImagesFromText(text: string): GalleryImage[] {
  const images: GalleryImage[] = [];
  const regex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    images.push({
      alt: match[1],
      src: match[2],
      title: match[3] || undefined,
    });
  }
  return images;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const pattern = /(!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|https?:\/\/[^\s<>)"]+|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;
  const parts = text.split(pattern).filter((part) => part !== "");

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    const image = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.exec(part);
    if (image) {
      return (
        <img
          key={key}
          src={image[2]}
          alt={image[1]}
          title={image[3]}
          loading="lazy"
          className="my-8 h-auto w-full rounded-2xl border border-border/70"
        />
      );
    }

    const link = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.exec(part);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      const ltr = isUrlOrLatin(link[1]);
      return (
        <a
          key={key}
          href={link[2]}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          dir={ltr ? "ltr" : undefined}
          className={ltr ? "inline-link-ltr" : undefined}
        >
          {renderInline(link[1], `${key}-t`)}
        </a>
      );
    }

    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={key}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className="inline-link-ltr"
        >
          {part}
        </a>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} dir="ltr" className="inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("__") && part.endsWith("__"))
    ) {
      return <strong key={key}>{renderInline(part.slice(2, -2), `${key}-s`)}</strong>;
    }

    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
      return <em key={key}>{renderInline(part.slice(1, -1), `${key}-e`)}</em>;
    }

    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

function isBlockStart(line: string) {
  const trimmed = line.trim();
  return (
    !trimmed ||
    trimmed.startsWith(":::gallery") ||
    trimmed === ":::" ||
    /^#{1,6}\s/.test(trimmed) ||
    /^```/.test(trimmed) ||
    /^>\s?/.test(trimmed) ||
    /^[-*+]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed) ||
    /^---+$/.test(trimmed) ||
    /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.test(trimmed)
  );
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const raw = lines[index];
    const line = raw.trim();

    if (!line) {
      index += 1;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <CodeBlock
          key={`code-${index}`}
          code={code.join("\n")}
          language={language}
        />
      );
      continue;
    }

    // Explicit gallery block: :::gallery [caption]
    if (line.startsWith(":::gallery")) {
      const captionMatch = /:::gallery\s*(?:["'](.*)["'])?/.exec(line);
      const caption = captionMatch?.[1] || undefined;
      const galleryLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith(":::")) {
        galleryLines.push(lines[index]);
        index += 1;
      }
      index += 1; // skip closing :::
      const images: GalleryImage[] = [];
      for (const gLine of galleryLines) {
        const parsed = parseImagesFromText(gLine);
        images.push(...parsed);
      }
      if (images.length > 0) {
        blocks.push(
          <ImageGallery
            key={`gallery-${index}`}
            images={images}
            caption={caption}
          />
        );
      }
      continue;
    }

    // Heading
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = plainInlineText(heading[2]);
      const id = headingId(text);
      const children = renderInline(heading[2], `heading-${index}`);
      const key = `heading-${index}`;
      if (level === 1) blocks.push(<h1 key={key} id={id}>{children}</h1>);
      if (level === 2) blocks.push(<h2 key={key} id={id}>{children}</h2>);
      if (level === 3) blocks.push(<h3 key={key} id={id}>{children}</h3>);
      if (level === 4) blocks.push(<h4 key={key} id={id}>{children}</h4>);
      if (level === 5) blocks.push(<h5 key={key} id={id}>{children}</h5>);
      if (level === 6) blocks.push(<h6 key={key} id={id}>{children}</h6>);
      index += 1;
      continue;
    }

    // Horizontal Rule
    if (/^---+$/.test(line)) {
      blocks.push(<hr key={`hr-${index}`} />);
      index += 1;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`}>
          <p>{renderInline(quote.join(" "), `quote-${index}`)}</p>
        </blockquote>
      );
      continue;
    }

    // Unordered List
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*+]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*+]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item, `ul-${index}-${itemIndex}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item, `ol-${index}-${itemIndex}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Standalone image or consecutive images (gallery)
    const standaloneImage = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.exec(line);
    if (standaloneImage) {
      const consecutiveImages: GalleryImage[] = [
        {
          alt: standaloneImage[1],
          src: standaloneImage[2],
          title: standaloneImage[3] || undefined,
        },
      ];
      index += 1;
      while (index < lines.length) {
        const nextLine = lines[index].trim();
        if (!nextLine) {
          let lookahead = index + 1;
          while (lookahead < lines.length && !lines[lookahead].trim()) {
            lookahead++;
          }
          if (
            lookahead < lines.length &&
            /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.test(
              lines[lookahead].trim()
            )
          ) {
            index = lookahead;
            const nextImg = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.exec(
              lines[index].trim()
            )!;
            consecutiveImages.push({
              alt: nextImg[1],
              src: nextImg[2],
              title: nextImg[3] || undefined,
            });
            index += 1;
            continue;
          }
          break;
        }
        const nextImg = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/.exec(
          nextLine
        );
        if (nextImg) {
          consecutiveImages.push({
            alt: nextImg[1],
            src: nextImg[2],
            title: nextImg[3] || undefined,
          });
          index += 1;
        } else {
          break;
        }
      }
      blocks.push(
        <ImageGallery
          key={`gallery-${index}`}
          images={consecutiveImages}
        />
      );
      continue;
    }

    // Regular Paragraph
    const paragraph = [line];
    index += 1;
    while (index < lines.length && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`p-${index}`}>{renderInline(paragraph.join(" "), `p-${index}`)}</p>
    );
  }

  return <div className="blog-prose">{blocks}</div>;
}
