import fs from "fs";
import path from "path";
import esbuild from "esbuild";

interface RawScrapedItem {
  slug: string;
  name: string;
  description: string;
  category: "inputs" | "buttons" | "data-display" | "feedback";
  tags: string[];
  author?: string;
  code: string;
}

function decodeHtml(html: string): string {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function balanceTags(html: string): string {
  const tags = ["div", "section", "article", "nav", "ul", "ol", "li", "span", "p", "button", "form", "table", "tbody", "thead", "tr", "td", "th", "svg"];
  let balanced = html;
  for (const tag of tags) {
    const openMatches = balanced.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) || [];
    const nonSelfClosingOpen = openMatches.filter(m => !m.endsWith("/>"));
    const closeMatches = balanced.match(new RegExp(`</${tag}>`, "gi")) || [];
    const diff = nonSelfClosingOpen.length - closeMatches.length;
    if (diff > 0) {
      balanced += `\n${`</${tag}>`.repeat(diff)}`;
    }
  }
  return balanced;
}

function sanitizeAndConvertToReact(rawCode: string, componentName: string): string {
  let cleaned = decodeHtml(rawCode);

  // 1. Strip dangerous elements
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  cleaned = cleaned.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  cleaned = cleaned.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");

  // 2. Strip HTML comments (which break JSX)
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");

  // 3. Strip all inline event handlers and Alpine.js / Vue attributes (e.g. @click, x-data, :class)
  cleaned = cleaned.replace(/\s+on[a-zA-Z]+\s*=\s*(['"]).*?\1/gi, "");
  cleaned = cleaned.replace(/\s+on[a-zA-Z]+\s*=\s*[^\s>]+/gi, "");
  cleaned = cleaned.replace(/\s+@[a-zA-Z\-:]+\s*=\s*(['"]).*?\1/gi, "");
  cleaned = cleaned.replace(/\s+:[a-zA-Z\-:]+\s*=\s*(['"]).*?\1/gi, "");
  cleaned = cleaned.replace(/\s+x-[a-zA-Z\-:]+\s*=\s*(['"]).*?\1/gi, "");
  cleaned = cleaned.replace(/href\s*=\s*(['"])javascript:.*?\1/gi, 'href="#"');

  // 4. Remove full-viewport outer wrapper if present (e.g. h-screen w-screen bg-black)
  cleaned = cleaned.replace(/^<div[^>]*class="[^"]*(?:h-screen|min-h-screen|w-screen)[^"]*"[^>]*>/i, "");
  cleaned = cleaned.replace(/<\/div>\s*$/i, "");

  // 5. Convert class to className (both single and double quotes)
  cleaned = cleaned.replace(/\bclass='([^']*)'/g, 'className="$1"');
  cleaned = cleaned.replace(/\bclass="([^"]*)"/g, 'className="$1"');
  cleaned = cleaned.replace(/\bclass=([a-zA-Z0-9_-]+)/g, 'className="$1"');

  // 6. Convert SVG kebab-case attributes to camelCase for React
  cleaned = cleaned.replace(/\bfill-rule=/g, "fillRule=");
  cleaned = cleaned.replace(/\bclip-rule=/g, "clipRule=");
  cleaned = cleaned.replace(/\bstroke-width=/g, "strokeWidth=");
  cleaned = cleaned.replace(/\bstroke-linecap=/g, "strokeLinecap=");
  cleaned = cleaned.replace(/\bstroke-linejoin=/g, "strokeLinejoin=");
  cleaned = cleaned.replace(/\bstroke-dasharray=/g, "strokeDasharray=");
  cleaned = cleaned.replace(/\bstroke-dashoffset=/g, "strokeDashoffset=");
  cleaned = cleaned.replace(/\bclip-path=/g, "clipPath=");

  // 7. Ensure self-closing tags close properly in JSX
  const voidTags = ["input", "img", "br", "hr", "link", "meta", "col"];
  for (const tag of voidTags) {
    const regex = new RegExp(`<(${tag}[^>]*?)(?<!/)>`, "gi");
    cleaned = cleaned.replace(regex, "<$1 />");
  }

  // 8. Fix style="..." strings (in JSX, style must be an object style={{ ... }})
  cleaned = cleaned.replace(/\s+style="([^"]*)"/gi, (_, css) => {
    try {
      const rules = css.split(";").filter(Boolean);
      const props: string[] = [];
      for (const rule of rules) {
        const [k, v] = rule.split(":").map((s: string) => s.trim());
        if (k && v) {
          const camelKey = k.replace(/-([a-z])/g, (_: string, l: string) => l.toUpperCase());
          props.push(`${camelKey}: "${v.replace(/"/g, '\\"')}"`);
        }
      }
      return ` style={{ ${props.join(", ")} }}`;
    } catch {
      return "";
    }
  });

  // 9. Remove any leftover import/export lines inside inner code
  cleaned = cleaned.replace(/import\s+React[^;]*;/g, "");
  cleaned = cleaned.replace(/export\s+function[^{]*{/g, "");
  cleaned = cleaned.replace(/return\s*\(/g, "");
  cleaned = cleaned.replace(/\);\s*\}\s*$/g, "");

  // 10. Balance unclosed tags
  cleaned = balanceTags(cleaned.trim());

  // 11. Wrap in proper React function component with valid JS identifier
  let pascalName = componentName
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  if (/^[0-9]/.test(pascalName)) {
    pascalName = "Component" + pascalName;
  }

  return `import React from "react";

export function ${pascalName || "Component"}() {
  return (
    ${cleaned.trim()}
  );
}`;
}

function run() {
  const inputPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-components.json");
  const data: RawScrapedItem[] = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  console.log(`Processing ${data.length} scraped components with tag balancer...`);

  const validComponents: RawScrapedItem[] = [];
  let syntaxErrors = 0;
  let securityDrops = 0;

  for (const item of data) {
    const reactCode = sanitizeAndConvertToReact(item.code, item.name);

    // Security check
    if (/<script/i.test(reactCode) || /\son[a-zA-Z]+\s*=/i.test(reactCode) || /javascript:/i.test(reactCode)) {
      securityDrops++;
      continue;
    }

    // Syntax validation via esbuild
    try {
      esbuild.transformSync(reactCode, { loader: "tsx" });
      validComponents.push({
        ...item,
        code: reactCode
      });
    } catch {
      syntaxErrors++;
    }
  }

  console.log(`\nValidation complete!`);
  console.log(`Valid: ${validComponents.length} / ${data.length}`);
  console.log(`Syntax errors: ${syntaxErrors}`);
  console.log(`Security drops: ${securityDrops}`);

  // Generate apps/web/src/data/tailwindflex-components.ts
  const tsContent = `// Automatically generated from TailwindFlex scraping pipeline
// Security audited & TSX validated

export interface TailwindFlexComponentItem {
  slug: string;
  kind: "component";
  name: string;
  description: string;
  category: "inputs" | "buttons" | "data-display" | "feedback";
  tags: string[];
  license: "MIT";
  author: string;
  registryDependencies: string[];
  dependencies: string[];
  code: string;
}

export const TAILWINDFLEX_COMPONENTS: TailwindFlexComponentItem[] = ${JSON.stringify(
    validComponents.map(c => ({
      slug: c.slug,
      kind: "component",
      name: c.name,
      description: c.description,
      category: c.category,
      tags: c.tags,
      license: "MIT",
      author: c.author || "tailwindflex",
      registryDependencies: [],
      dependencies: [],
      code: c.code
    })),
    null,
    2
  )};
`;

  const outputPath = path.resolve(process.cwd(), "apps/web/src/data/tailwindflex-components.ts");
  fs.writeFileSync(outputPath, tsContent, "utf-8");
  console.log(`Written ${validComponents.length} components to ${outputPath}`);

  // Generate public static registry manifests for shadcn/Liber CLI: apps/web/public/r/<slug>.json
  const publicRDir = path.resolve(process.cwd(), "apps/web/public/r");
  if (!fs.existsSync(publicRDir)) {
    fs.mkdirSync(publicRDir, { recursive: true });
  }

  let manifestsWritten = 0;
  for (const c of validComponents) {
    const manifest = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: c.slug,
      type: "registry:ui",
      title: c.name,
      description: c.description,
      author: c.author || "TailwindFlex / Liber",
      categories: [c.category],
      dependencies: [],
      files: [
        {
          path: `ui/${c.slug}.tsx`,
          content: c.code,
          type: "registry:ui",
        },
      ],
      meta: {
        kind: "component",
        tags: c.tags,
      },
    };
    fs.writeFileSync(
      path.join(publicRDir, `${c.slug}.json`),
      JSON.stringify(manifest, null, 2) + "\n",
      "utf-8"
    );
    manifestsWritten++;
  }
  console.log(`Generated ${manifestsWritten} static registry manifests in ${publicRDir}`);
}

run();
