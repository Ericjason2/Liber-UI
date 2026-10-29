import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile } from "node:fs/promises";
import { validateAll, validateResourceFolder, validateSvgContent } from "../lib/validate-resource.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentRoot = join(__dirname, "../../content");
const fixtureRoot = join(__dirname, "../__fixtures__/content");

describe("Liber resource validation", () => {
  it("passes cleanly on all official sample logos in content/", async () => {
    const report = await validateAll(contentRoot);
    expect(report.totalChecked).toBeGreaterThanOrEqual(150);
    expect(report.byKind.logo).toBe(150);
    expect(report.issues).toEqual([]);
  });

  it("fails explicitly on broken metadata schema in fixture", async () => {
    const res = await validateResourceFolder(fixtureRoot, "logo", "broken-sample");
    expect(res.issues.length).toBeGreaterThan(0);

    // Verifies schema catches invalid license, url, hex
    expect(res.issues.some((i) => i.path === "license")).toBe(true);
    expect(res.issues.some((i) => i.path === "website")).toBe(true);
    expect(res.issues.some((i) => i.path === "variants.color.hex")).toBe(true);
  });

  it("catches forbidden <script> and inline events in unsafe SVG", async () => {
    const unsafeSvg = await readFile(join(fixtureRoot, "logos/broken-sample/color.svg"), "utf8");
    const issues = validateSvgContent(unsafeSvg, "color.svg");
    expect(issues.some((msg) => msg.includes("<script>"))).toBe(true);

    const inlineEventSvg = '<svg viewBox="0 0 24 24" onclick="alert(1)"><path d="M0 0"/></svg>';
    const eventIssues = validateSvgContent(inlineEventSvg, "event.svg");
    expect(eventIssues.some((msg) => msg.includes("inline event"))).toBe(true);
  });
});
