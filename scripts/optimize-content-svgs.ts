import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { optimizeSvgString } from "./lib/optimize-svg.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTENT_LOGOS = join(__dirname, "../content/logos");

const entries = await readdir(CONTENT_LOGOS, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const dir = join(CONTENT_LOGOS, entry.name);
  const files = await readdir(dir);

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;
    const filePath = join(dir, file);
    const raw = await readFile(filePath, "utf8");
    const variant = file.replace(".svg", "");
    try {
      const opt = optimizeSvgString(raw, {
        slug: entry.name,
        variant: variant as "color" | "mono" | "wordmark" | "light" | "dark",
        brandName: entry.name,
      });
      await writeFile(filePath, opt.svg, "utf8");
      if (raw.length !== opt.svg.length) {
        console.log(`[OPT] ${entry.name}/${file}: ${raw.length} -> ${opt.svg.length} bytes`);
      }
    } catch (err) {
      console.error(`[ERR] Failed to optimize ${entry.name}/${file}:`, (err as Error).message);
    }
  }
}

console.log("Finished SVGO pre-optimization on all content/logos/");
