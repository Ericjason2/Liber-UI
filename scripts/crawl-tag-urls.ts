import fs from "fs";
import path from "path";

const TAGS = [
  "card",
  "hero",
  "form",
  "button",
  "grid",
  "call-to-action",
  "navbar",
  "landing-page",
  "profile",
  "pricing",
  "header"
];

async function fetchTagPage(tag: string, page: number): Promise<{ html: string; status: number }> {
  try {
    const res = await fetch(`https://tailwindflex.com/tag/${tag}?page=${page}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    const html = await res.text();
    return { html, status: res.status };
  } catch (e) {
    console.error(`Failed tag ${tag} page ${page}:`, e);
    return { html: "", status: 500 };
  }
}

async function getTagMaxPage(tag: string): Promise<number> {
  const { html } = await fetchTagPage(tag, 1);
  const pageMatches = [...html.matchAll(/[?&]page=(\d+)/g)]
    .map(m => parseInt(m[1] ?? "1", 10))
    .filter(n => !isNaN(n));
  return pageMatches.length > 0 ? Math.max(...pageMatches) : 1;
}

async function main() {
  console.log("Analyzing tag pages...");
  const tagMaxPages: Record<string, number> = {};
  
  for (const tag of TAGS) {
    const max = await getTagMaxPage(tag);
    tagMaxPages[tag] = max;
    console.log(`Tag ${tag}: ${max} pages detected.`);
  }

  const allComponentsMap = new Map<string, { url: string; author: string; slug: string; tags: Set<string> }>();

  for (const tag of TAGS) {
    const maxPage = tagMaxPages[tag] || 1;
    console.log(`\nFetching ${maxPage} pages for tag "${tag}"...`);

    // Fetch pages with concurrency 5
    for (let p = 1; p <= maxPage; p += 5) {
      const pageBatch = Array.from({ length: Math.min(5, maxPage - p + 1) }, (_, i) => p + i);
      const results = await Promise.all(pageBatch.map(page => fetchTagPage(tag, page)));

      for (const { html } of results) {
        const matches = [...html.matchAll(/href=["'](https:\/\/tailwindflex\.com\/@([^/]+)\/([a-zA-Z0-9_-]+))["']/g)];
        for (const m of matches) {
          const url = m[1];
          const author = m[2];
          const slug = m[3];
          if (!url || !author || !slug) continue;
          
          const existing = allComponentsMap.get(url);
          if (!existing) {
            allComponentsMap.set(url, {
              url,
              author,
              slug,
              tags: new Set([tag])
            });
          } else {
            existing.tags.add(tag);
          }
        }
      }
    }
    console.log(`Tag "${tag}" processed. Total unique components so far: ${allComponentsMap.size}`);
  }

  const output = Array.from(allComponentsMap.values()).map(c => ({
    url: c.url,
    author: c.author,
    slug: c.slug,
    tags: Array.from(c.tags)
  }));

  const outPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-discovered-urls.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\nDONE! Saved ${output.length} unique component URLs to ${outPath}`);
}

main();

