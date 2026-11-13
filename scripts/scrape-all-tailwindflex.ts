import fs from "fs";
import path from "path";

interface DiscoveredUrl {
  url: string;
  author: string;
  slug: string;
  tags: string[];
}

export interface ScrapedComponent {
  slug: string;
  name: string;
  author: string;
  authorUrl: string;
  sourceUrl: string;
  mention: string;
  category: "inputs" | "buttons" | "data-display" | "feedback";
  tags: string[];
  rawHtml: string;
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function mapTagsToCategory(tags: string[]): "inputs" | "buttons" | "data-display" | "feedback" {
  const tSet = new Set(tags.map(t => t.toLowerCase()));
  if (tSet.has("button") || tSet.has("navbar") || tSet.has("header") || tSet.has("call-to-action")) {
    return "buttons";
  }
  if (tSet.has("form") || tSet.has("input") || tSet.has("search")) {
    return "inputs";
  }
  if (tSet.has("alert") || tSet.has("badge") || tSet.has("toast") || tSet.has("modal")) {
    return "feedback";
  }
  return "data-display"; // card, hero, grid, profile, pricing, landing-page, etc.
}

async function fetchWithRetry(url: string, retries = 2): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
      });
      clearTimeout(timer);
      if (res.status === 200) {
        return await res.text();
      }
      if (res.status === 404) return null;
    } catch {
      if (attempt === retries) return null;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return null;
}

async function main() {
  const discoveredPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-discovered-urls.json");
  const outputPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-scraped-all.json");

  if (!fs.existsSync(discoveredPath)) {
    console.error("Discovered URLs file not found!");
    process.exit(1);
  }

  const discovered: DiscoveredUrl[] = JSON.parse(fs.readFileSync(discoveredPath, "utf-8"));
  console.log(`Loaded ${discovered.length} discovered component URLs.`);

  // Load existing results to allow resuming
  const scrapedMap = new Map<string, ScrapedComponent>();
  if (fs.existsSync(outputPath)) {
    try {
      const existing: ScrapedComponent[] = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
      for (const item of existing) {
        scrapedMap.set(item.slug, item);
      }
      console.log(`Resuming with ${scrapedMap.size} already scraped components.`);
    } catch {
      // ignore
    }
  }

  const queue = discovered.filter(d => !scrapedMap.has(d.slug));
  console.log(`Remaining to fetch: ${queue.length} components.`);

  const CONCURRENCY = 15;
  let completed = scrapedMap.size;
  let queueIndex = 0;
  let errors = 0;

  async function worker() {
    while (queueIndex < queue.length) {
      const idx = queueIndex++;
      const item = queue[idx];
      if (!item) break;

      const pageHtml = await fetchWithRetry(item.url);
      if (!pageHtml) {
        errors++;
        continue;
      }

      // Extract textarea code_preview
      const codeMatch = pageHtml.match(/<textarea[^>]*id=["']code_preview["'][^>]*>([\s\S]*?)<\/textarea>/i);
      const codeContent = codeMatch?.[1];
      if (!codeContent || !codeContent.trim()) {
        errors++;
        continue;
      }

      const rawCode = decodeHtmlEntities(codeContent.trim());

      // Extract Title
      const titleMatch = pageHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const titleContent = titleMatch?.[1];
      let title = titleContent ? titleContent.replace(/<[^>]+>/g, "").trim() : "";
      if (!title) {
        title = item.slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, l => l.toUpperCase());
      }

      // Extract page tags
      const pageTagMatches = [...pageHtml.matchAll(/href=["']\/tag\/([a-zA-Z0-9_-]+)["']/g)]
        .map(m => m[1])
        .filter((t): t is string => Boolean(t));
      const combinedTags = Array.from(new Set([...item.tags, ...pageTagMatches]));

      const authorName = item.author.replace(/^@/, "");
      const scraped: ScrapedComponent = {
        slug: item.slug,
        name: title,
        author: `@${authorName}`,
        authorUrl: `https://tailwindflex.com/@${authorName}`,
        sourceUrl: item.url,
        mention: `Créé par @${authorName} sur TailwindFlex`,
        category: mapTagsToCategory(combinedTags),
        tags: combinedTags,
        rawHtml: rawCode
      };

      scrapedMap.set(item.slug, scraped);
      completed++;

      if (completed % 50 === 0 || completed === discovered.length) {
        console.log(`Progress: ${completed}/${discovered.length} (${((completed / discovered.length) * 100).toFixed(1)}%) | Errors: ${errors}`);
        // Save intermediate checkpoint
        fs.writeFileSync(outputPath, JSON.stringify(Array.from(scrapedMap.values()), null, 2), "utf-8");
      }
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, () => worker());
  await Promise.all(workers);

  // Final write
  fs.writeFileSync(outputPath, JSON.stringify(Array.from(scrapedMap.values()), null, 2), "utf-8");
  console.log(`\nCOMPLETED SCRAPING! Total saved: ${scrapedMap.size} components to ${outputPath}`);
}

main();

