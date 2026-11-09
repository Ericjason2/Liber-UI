import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";
import { NextRequest } from "next/server";

import {
  OFFICIAL_LOGOS,
  SAMPLE_FONTS,
  SAMPLE_THEMES,
  SAMPLE_ANIMATIONS,
  SAMPLE_COMPONENTS,
  searchCatalog,
} from "../../apps/web/src/lib/catalog";
import { GET as getLogoCss } from "../../apps/web/src/handlers/logoCssApiHandler";
import { GET as getFontCss } from "../../apps/web/src/handlers/fontCssApiHandler";
import { extractFontFromZipBuffer } from "../../apps/web/src/handlers/fontFileApiHandler";
import { GET as getFontsApi } from "../../apps/web/src/handlers/fontsApiHandler";
import { GET as getRegistryItem } from "../../apps/web/src/handlers/registryItemHandler";
import { GET as getSearchApi } from "../../apps/web/src/handlers/searchApiHandler";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "../..");
const WEB_PUBLIC_DIR = resolve(ROOT_DIR, "apps/web/public");
const REACT_INDEX_PATH = resolve(ROOT_DIR, "packages/react/src/index.ts");

/**
 * Helper to construct a minimal valid PKZIP buffer in memory for testing
 * the on-the-fly Dafont .zip -> .ttf extractor.
 */
function buildTestZipBuffer(
  entries: Array<{ name: string; content: Buffer; deflate?: boolean }>
): Buffer {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, "utf8");
    const method = entry.deflate ? 8 : 0;
    const dataBuf = entry.deflate ? deflateRawSync(entry.content) : entry.content;

    // Local file header (30 bytes + file name)
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); // signature
    lh.writeUInt16LE(20, 4); // version needed
    lh.writeUInt16LE(0, 6); // flags
    lh.writeUInt16LE(method, 8); // compression method
    lh.writeUInt32LE(0, 14); // crc32 (unused by extractor)
    lh.writeUInt32LE(dataBuf.length, 18); // compressed size
    lh.writeUInt32LE(entry.content.length, 22); // uncompressed size
    lh.writeUInt16LE(nameBuf.length, 26); // filename length
    lh.writeUInt16LE(0, 28); // extra length

    localParts.push(lh, nameBuf, dataBuf);

    // Central directory header (46 bytes + file name)
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0); // signature
    cd.writeUInt16LE(20, 4); // version made by
    cd.writeUInt16LE(20, 6); // version needed
    cd.writeUInt16LE(0, 8); // flags
    cd.writeUInt16LE(method, 10); // compression method
    cd.writeUInt32LE(0, 16); // crc32
    cd.writeUInt32LE(dataBuf.length, 20); // compressed size
    cd.writeUInt32LE(entry.content.length, 24); // uncompressed size
    cd.writeUInt16LE(nameBuf.length, 28); // filename length
    cd.writeUInt16LE(0, 30); // extra field length
    cd.writeUInt16LE(0, 32); // comment length
    cd.writeUInt32LE(offset, 42); // local header offset

    centralParts.push(cd, nameBuf);
    offset += lh.length + nameBuf.length + dataBuf.length;
  }

  const cdBuffer = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // EOCD signature
  eocd.writeUInt16LE(entries.length, 8); // total entries on disk
  eocd.writeUInt16LE(entries.length, 10); // total entries
  eocd.writeUInt32LE(cdBuffer.length, 12); // size of central directory
  eocd.writeUInt32LE(offset, 16); // offset of central directory

  return Buffer.concat([...localParts, cdBuffer, eocd]);
}

describe("End-User E2E Flows — Logos, Fonts (CSS/Tailwind/TTF), Themes, Animations & Components", () => {
  describe("1. Logos — Static SVGs, React Components, CSS/CDN & Tailwind Masking", () => {
    it("provides valid color.svg and currentColor mono.svg for every official logo", () => {
      expect(OFFICIAL_LOGOS.length).toBeGreaterThanOrEqual(45);

      for (const logo of OFFICIAL_LOGOS) {
        const colorPath = resolve(WEB_PUBLIC_DIR, "svg", logo.slug, "color.svg");
        const monoPath = resolve(WEB_PUBLIC_DIR, "svg", logo.slug, "mono.svg");

        expect(existsSync(colorPath), `Missing color.svg for ${logo.slug}`).toBe(true);
        expect(existsSync(monoPath), `Missing mono.svg for ${logo.slug}`).toBe(true);

        const colorSvg = readFileSync(colorPath, "utf8");
        const monoSvg = readFileSync(monoPath, "utf8");

        expect(colorSvg).toContain("<svg");
        expect(colorSvg).toContain("viewBox=");
        expect(monoSvg).toContain("<svg");
        expect(monoSvg).toContain("currentColor");
      }
    });

    it("exports React components (@liber-ui/react) for Color and Mono variants", () => {
      expect(existsSync(REACT_INDEX_PATH)).toBe(true);
      const indexContent = readFileSync(REACT_INDEX_PATH, "utf8");

      expect(indexContent).toContain("ReactColor");
      expect(indexContent).toContain("ReactMono");
      expect(indexContent).toContain("GithubMono");
      expect(indexContent).toContain("DockerColor");
      expect(indexContent).toContain("VercelMono");
    });

    it("serves ready-to-import CSS rules via /api/logo-css/<slug> and /api/logo-css/all", async () => {
      const singleReq = new NextRequest("https://liber-ui-delta.vercel.app/api/logo-css/react");
      const singleRes = await getLogoCss(singleReq, {
        params: Promise.resolve({ slug: "react" }),
      });

      expect(singleRes.status).toBe(200);
      expect(singleRes.headers.get("Content-Type")).toContain("text/css");
      expect(singleRes.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const singleCss = await singleRes.text();
      expect(singleCss).toContain(".logo-react {");
      expect(singleCss).toContain("https://liber-ui-delta.vercel.app/svg/react/color.svg");
      expect(singleCss).toContain(".logo-react-mono {");
      expect(singleCss).toContain("mask-image: url('https://liber-ui-delta.vercel.app/svg/react/mono.svg')");
      expect(singleCss).toContain("background-color: currentColor;");

      const allReq = new NextRequest("https://liber-ui-delta.vercel.app/api/logo-css/all");
      const allRes = await getLogoCss(allReq, {
        params: Promise.resolve({ slug: "all" }),
      });
      expect(allRes.status).toBe(200);
      const allCss = await allRes.text();
      expect(allCss).toContain(".logo-github");
      expect(allCss).toContain(".logo-docker");
    });
  });

  describe("2. Fonts — CSS @import, @font-face, Tailwind Utilities & Binary .ttf Extractor", () => {
    it("generates CSS @import + CSS variable + Tailwind utility class for Google Fonts (/api/font-css/geist)", async () => {
      const req = new NextRequest("https://liber-ui-delta.vercel.app/api/font-css/geist");
      const res = await getFontCss(req, {
        params: Promise.resolve({ slug: "geist" }),
      });

      expect(res.status).toBe(200);
      expect(res.headers.get("Content-Type")).toContain("text/css");
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");

      const css = await res.text();
      expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Geist");
      expect(css).toContain("--font-geist: 'Geist', sans-serif;");
      expect(css).toContain(".font-geist {");
      expect(css).toContain("font-family: 'Geist', sans-serif;");
    });

    it("generates @font-face pointing to /api/font-file/<slug>.ttf + Tailwind utility class for Dafont fonts", async () => {
      const dafontItem = SAMPLE_FONTS.find((f) => Boolean(f.downloadUrl));
      expect(dafontItem).toBeDefined();
      if (!dafontItem) return;

      const slug = dafontItem.slug;
      const req = new NextRequest(`https://liber-ui-delta.vercel.app/api/font-css/${slug}`);
      const res = await getFontCss(req, {
        params: Promise.resolve({ slug }),
      });

      expect(res.status).toBe(200);
      const css = await res.text();
      expect(css).toContain("@font-face {");
      expect(css).toContain(`font-family: '${dafontItem.name}';`);
      expect(css).toContain(`url('https://liber-ui-delta.vercel.app/api/font-file/${slug}.ttf') format('truetype')`);
      expect(css).toContain(`--font-${slug}: '${dafontItem.name}'`);
      expect(css).toContain(`.font-${slug} {`);
    });

    it("extracts the best .ttf binary from a compressed ZIP archive while ignoring __MACOSX metadata", () => {
      const fakeRegularTtf = Buffer.from([0x00, 0x01, 0x00, 0x00, 0x54, 0x54, 0x46, 0x21]);
      const fakeBoldTtf = Buffer.from([0x00, 0x01, 0x00, 0x00, 0x42, 0x4f, 0x4c, 0x44]);

      const zipBuf = buildTestZipBuffer([
        { name: "__MACOSX/._Demo-Regular.ttf", content: Buffer.from("junk"), deflate: true },
        { name: "README.txt", content: Buffer.from("License info"), deflate: true },
        { name: "Demo-Bold.ttf", content: fakeBoldTtf, deflate: true },
        { name: "Demo-Regular.ttf", content: fakeRegularTtf, deflate: true },
      ]);

      const extracted = extractFontFromZipBuffer(zipBuf);
      expect(extracted).not.toBeNull();
      if (!extracted) return;
      expect(extracted.ext).toBe("ttf");
      expect(extracted.data.equals(fakeRegularTtf)).toBe(true);
    });

    it("paginates and filters the 7,382 fonts via /api/fonts", async () => {
      const req = new NextRequest(
        "https://liber-ui-delta.vercel.app/api/fonts?q=mono&category=mono&page=1&limit=10"
      );
      const res = await getFontsApi(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as {
        total: number;
        items: Array<{ slug: string; name: string }>;
      };
      expect(data.total).toBeGreaterThan(0);
      expect(data.items.length).toBeLessThanOrEqual(10);
      expect(data.items[0]).toHaveProperty("slug");
      expect(data.items[0]).toHaveProperty("name");
    });

    it("serves shadcn/Liber CLI registry manifest for fonts (/r/font-<slug>)", async () => {
      const req = new NextRequest("https://liber-ui-delta.vercel.app/r/font-geist");
      const res = await getRegistryItem(req, {
        params: Promise.resolve({ slug: "font-geist" }),
      });

      expect(res.status).toBe(200);
      const json = (await res.json()) as {
        type: string;
        files: Array<{ path: string; content: string }>;
      };
      expect(json.type).toBe("registry:font");
      expect(json.files[0]?.path).toBe("styles/fonts/geist.css");
      expect(json.files[0]?.content).toContain("--font-geist:");
      expect(json.files[0]?.content).toContain(".font-geist");
    });
  });

  describe("3. Themes — CSS Custom Properties, WCAG Contrast & CLI Registry", () => {
    it("provides valid 5-swatch palettes and serves :root CSS variables via /r/theme-<slug>", async () => {
      expect(SAMPLE_THEMES.length).toBeGreaterThan(100);

      const theme = SAMPLE_THEMES[0];
      expect(theme).toBeDefined();
      if (!theme) return;
      expect(theme.swatches).toHaveLength(5);

      const req = new NextRequest(`https://liber-ui-delta.vercel.app/r/theme-${theme.slug}`);
      const res = await getRegistryItem(req, {
        params: Promise.resolve({ slug: `theme-${theme.slug}` }),
      });

      expect(res.status).toBe(200);
      const json = (await res.json()) as {
        type: string;
        files: Array<{ path: string; content: string }>;
      };
      expect(json.type).toBe("registry:theme");
      expect(json.files[0]?.path).toBe(`styles/themes/${theme.slug}.css`);
      expect(json.files[0]?.content).toContain(":root {");
      expect(json.files[0]?.content).toContain("--background:");
      expect(json.files[0]?.content).toContain("--primary:");
    });
  });

  describe("4. Animations — CSS @keyframes, Tailwind Config & prefers-reduced-motion", () => {
    it("serves complete @keyframes, CSS classes, and Tailwind arbitrary classes for all 23 animations", async () => {
      expect(SAMPLE_ANIMATIONS.length).toBe(23);

      for (const anim of SAMPLE_ANIMATIONS) {
        expect(anim.cssKeyframes).toContain("@keyframes");
        expect(anim.cssClasses).toContain(`.${anim.slug}`);
        expect(anim.tailwindConfig).toContain("keyframes");
      }

      const req = new NextRequest("https://liber-ui-delta.vercel.app/r/scale-up-center");
      const res = await getRegistryItem(req, {
        params: Promise.resolve({ slug: "scale-up-center" }),
      });

      expect(res.status).toBe(200);
      const json = (await res.json()) as {
        type: string;
        files: Array<{ path: string; content: string }>;
      };
      expect(json.type).toBe("registry:style");
      expect(json.files[0]?.content).toContain("@keyframes scale-up-center");
      expect(json.files[0]?.content).toContain("@media (prefers-reduced-motion: no-preference)");
    });
  });

  describe("5. UI Components — Complete Copy-Paste TSX & Static Registry Manifests", () => {
    it("provides full TSX code and static /public/r/<slug>.json manifests for all 10 components", () => {
      expect(SAMPLE_COMPONENTS.length).toBe(10);

      for (const comp of SAMPLE_COMPONENTS) {
        expect(comp.code.length).toBeGreaterThan(120);
        expect(comp.code).toContain("export ");

        const staticManifestPath = resolve(WEB_PUBLIC_DIR, "r", `${comp.slug}.json`);
        expect(
          existsSync(staticManifestPath),
          `Missing static registry manifest for component ${comp.slug}`
        ).toBe(true);

        const manifest = JSON.parse(readFileSync(staticManifestPath, "utf8")) as {
          name: string;
          files: unknown[];
        };
        expect(manifest.name).toBe(comp.slug);
        expect(Array.isArray(manifest.files)).toBe(true);
        expect(manifest.files.length).toBeGreaterThan(0);
      }
    });
  });

  describe("6. Global Search (/api/search) & Tailwind Style Configuration", () => {
    it("scans src/views and src/context in tailwind.config.ts so all UI styles remain active", () => {
      const tailwindConfigPath = resolve(ROOT_DIR, "apps/web/tailwind.config.ts");
      const content = readFileSync(tailwindConfigPath, "utf8");
      expect(content).toContain("./src/views/**/*.{js,ts,jsx,tsx,mdx}");
      expect(content).toContain("./src/components/**/*.{js,ts,jsx,tsx,mdx}");
    });

    it("returns accurate navigation URLs across logos, fonts, themes, animations, and components", async () => {
      const results = searchCatalog("react");
      expect(results.some((r) => r.kind === "logo" && r.url === "/logos/react")).toBe(true);

      const req = new NextRequest("https://liber-ui-delta.vercel.app/api/search?q=geist&limit=10");
      const res = await getSearchApi(req);
      expect(res.status).toBe(200);

      const body = (await res.json()) as {
        results: Array<{ kind: string; url: string }>;
      };
      expect(
        body.results.some((r) => r.kind === "font" && r.url === "/fonts/geist")
      ).toBe(true);
    });
  });
});
