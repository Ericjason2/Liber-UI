import fs from "fs";
import path from "path";

// List of all tags from tailwindflex.com/tags
const TAILWINDFLEX_TAGS = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "banner",
  "blog-card",
  "breadcrumb",
  "button",
  "button-group",
  "call-to-action",
  "card",
  "carousel",
  "chip",
  "code-block",
  "comment-section",
  "countdown-timer",
  "divider",
  "dropdown",
  "error-page",
  "faq",
  "feature",
  "footer",
  "form",
  "grid",
  "header",
  "hero",
  "input",
  "list",
  "login",
  "logo-cloud",
  "modal",
  "navbar",
  "newsletter",
  "notification",
  "pagination",
  "pricing",
  "profile",
  "progress-bar",
  "radio",
  "range-slider",
  "rating",
  "search-bar",
  "select",
  "sidebar",
  "skeleton-loader",
  "loading",
  "stats",
  "steps",
  "table",
  "tabs",
  "team",
  "testimonial",
  "timeline",
  "toggle",
  "tooltip",
  "widget"
];

interface ScrapedItem {
  slug: string;
  kind: "component";
  name: string;
  description: string;
  category: "inputs" | "buttons" | "data-display" | "feedback";
  tags: string[];
  license: "MIT";
  author: string;
  code: string;
  sourceUrl: string;
}

function decodeHtml(html: string): string {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function mapTagToCategory(tag: string): "inputs" | "buttons" | "data-display" | "feedback" {
  if (["button", "button-group", "toggle"].includes(tag)) return "buttons";
  if (["form", "input", "login", "search-bar", "select", "radio", "range-slider", "newsletter"].includes(tag)) return "inputs";
  if (["alert", "banner", "notification", "modal", "skeleton-loader", "loading", "progress-bar", "tooltip"].includes(tag)) return "feedback";
  return "data-display";
}

function sanitizeAndConvertToReact(rawHtml: string, componentName: string): string {
  let cleaned = decodeHtml(rawHtml);

  // 1. Remove dangerous script and iframe elements (Security)
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  cleaned = cleaned.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
  cleaned = cleaned.replace(/href\s*=\s*(['"])javascript:.*?\1/gi, 'href="#"');

  // 2. Remove full-viewport outer wrapper if present (e.g. h-screen w-screen bg-black)
  cleaned = cleaned.replace(/^<div[^>]*class="[^"]*(?:h-screen|min-h-screen|w-screen)[^"]*"[^>]*>/i, "");
  cleaned = cleaned.replace(/<\/div>\s*$/i, "");

  // 3. Convert class to className
  cleaned = cleaned.replace(/\bclass="/g, 'className="');
  cleaned = cleaned.replace(/\bclass='/g, "className='");

  // 4. Ensure self-closing tags close properly in JSX
  const voidTags = ["input", "img", "br", "hr", "link", "meta"];
  for (const tag of voidTags) {
    const regex = new RegExp(`<(${tag}[^>]*?)(?<!/)>`, "gi");
    cleaned = cleaned.replace(regex, "<$1 />");
  }

  // 5. Wrap in React function component
  const pascalName = componentName
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  return `import React from "react";

export function ${pascalName || "Component"}() {
  return (
    ${cleaned.trim()}
  );
}`;
}

async function scrapeTag(tag: string): Promise<{ title: string; author: string; slug: string; url: string }[]> {
  const url = `https://tailwindflex.com/tag/${tag}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  if (!res.ok) return [];

  const html = await res.text();
  const regex = /href="https:\/\/tailwindflex\.com\/@([^/]+)\/([^/"]+)"/gi;
  const results: { title: string; author: string; slug: string; url: string }[] = [];
  const seen = new Set<string>();

  let match;
  while ((match = regex.exec(html)) !== null) {
    const author = match[1] || "tailwindflex";
    const slug = match[2] || "";
    if (!slug) continue;
    const fullUrl = `https://tailwindflex.com/@${author}/${slug}`;
    if (!seen.has(fullUrl)) {
      seen.add(fullUrl);
      const title = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      results.push({ title, author, slug, url: fullUrl });
    }
  }

  return results;
}

async function scrapeComponentDetails(url: string, defaultName: string, author: string, mainTag: string): Promise<ScrapedItem | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    if (!res.ok) return null;
    const html = await res.text();

    const needle = 'id="code_preview"';
    const idIdx = html.indexOf(needle);
    if (idIdx === -1) return null;
    const tagEnd = html.indexOf(">", idIdx);
    if (tagEnd === -1) return null;
    const closeIdx = html.indexOf("</textarea>", tagEnd);
    if (closeIdx === -1) return null;

    const rawCode = html.slice(tagEnd + 1, closeIdx).trim();
    if (!rawCode || rawCode.length < 20) return null;

    // Extract title from <title>
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    let title = defaultName;
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/\s*-\s*Tailwind\s*CSS\s*Example/i, "").trim();
    }

    // Extract description from meta
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const description = descMatch && descMatch[1] ? descMatch[1].trim() : `${title} Tailwind CSS component from TailwindFlex.`;

    // Extract tags from a[href*="/tag/"]
    const tagRegex = /href="https:\/\/tailwindflex\.com\/tag\/([^"]+)"[^>]*>([^<]+)<\/a>/gi;
    const tags = new Set<string>([mainTag]);
    let tMatch;
    while ((tMatch = tagRegex.exec(html)) !== null) {
      const tSlug = (tMatch[1] || "").trim().toLowerCase();
      if (tSlug) tags.add(tSlug);
    }

    const reactCode = sanitizeAndConvertToReact(rawCode, title);
    const slug = path.basename(url).toLowerCase();

    return {
      slug,
      kind: "component",
      name: title,
      description,
      category: mapTagToCategory(mainTag),
      tags: Array.from(tags),
      license: "MIT",
      author: author || "tailwindflex",
      code: reactCode,
      sourceUrl: url
    };
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Starting TailwindFlex scrape across ${TAILWINDFLEX_TAGS.length} tags...`);
  const allComponents = new Map<string, ScrapedItem>();
  const tagStats: Record<string, number> = {};

  for (const tag of TAILWINDFLEX_TAGS) {
    console.log(`Processing tag: ${tag}...`);
    const items = await scrapeTag(tag);
    tagStats[tag] = 0;

    // Pick top 1-2 items per tag
    for (const item of items.slice(0, 2)) {
      const existing = allComponents.get(item.slug);
      if (existing) {
        existing.tags.push(tag);
        tagStats[tag] = (tagStats[tag] || 0) + 1;
        continue;
      }

      const details = await scrapeComponentDetails(item.url, item.title, item.author, tag);
      if (details) {
        allComponents.set(item.slug, details);
        tagStats[tag] = (tagStats[tag] || 0) + 1;
        console.log(`  + [${tag}] ${details.name} (${item.slug})`);
      }
      // Small pause to be gentle with rate limits
      await new Promise(r => setTimeout(r, 150));
    }
  }

  const results = Array.from(allComponents.values());
  console.log(`\nSuccessfully scraped ${results.length} unique components across ${TAILWINDFLEX_TAGS.length} tags!`);

  const outputPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-components.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Saved output to ${outputPath}`);
}

main().catch(console.error);

