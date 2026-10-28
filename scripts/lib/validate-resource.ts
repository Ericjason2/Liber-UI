import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import {
  SCHEMAS,
  FAMILY_DIR,
  META_FILE,
  type Kind,
  KINDS,
  type ResourceMeta,
  type LogoMeta,
} from "./schema.js";

export interface ValidationIssue {
  kind: Kind | "unknown";
  slug: string;
  path: string;
  message: string;
}

export interface ValidationReport {
  totalChecked: number;
  byKind: Record<Kind, number>;
  issues: ValidationIssue[];
}

/** Check SVG safety & constraints. */
export function validateSvgContent(
  content: string,
  fileName: string,
  maxSizeBytes = 12 * 1024, // 12 kB tolerance (specs ask < 8kB after SVGO, raw SVGs may be slightly above before SVGO)
): string[] {
  const errors: string[] = [];
  const lower = content.toLowerCase();

  if (lower.includes("<script")) {
    errors.push(`${fileName}: contains forbidden <script> element`);
  }
  if (lower.includes("<foreignobject")) {
    errors.push(`${fileName}: contains forbidden <foreignObject> element`);
  }
  if (/on[a-z]+\s*=/i.test(content)) {
    errors.push(`${fileName}: contains forbidden inline event handler`);
  }
  if (/(?:href|xlink:href)\s*=\s*["']https?:\/\//i.test(content)) {
    errors.push(`${fileName}: contains forbidden external reference`);
  }
  if (Buffer.byteLength(content, "utf8") > maxSizeBytes) {
    errors.push(
      `${fileName}: exceeds maximum size (${Buffer.byteLength(content, "utf8")} bytes > ${maxSizeBytes} bytes)`,
    );
  }

  return errors;
}

/** Validate a single resource folder. */
export async function validateResourceFolder(
  contentRoot: string,
  kind: Kind,
  slug: string,
): Promise<{ meta?: ResourceMeta; issues: ValidationIssue[] }> {
  const dir = join(contentRoot, FAMILY_DIR[kind], slug);
  const metaFileName = META_FILE[kind];
  const metaPath = join(dir, metaFileName);
  const issues: ValidationIssue[] = [];

  let rawMeta: unknown;
  try {
    const text = await readFile(metaPath, "utf8");
    rawMeta = JSON.parse(text);
  } catch (err) {
    issues.push({
      kind,
      slug,
      path: metaPath,
      message: `Failed to read or parse ${metaFileName}: ${(err as Error).message}`,
    });
    return { issues };
  }

  const schema = SCHEMAS[kind];
  const parsed = schema.safeParse(rawMeta);

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      issues.push({
        kind,
        slug,
        path: issue.path.join("."),
        message: issue.message,
      });
    }
    return { issues };
  }

  const meta = parsed.data;

  // Slug must match folder name
  if (meta.slug !== slug) {
    issues.push({
      kind,
      slug,
      path: "slug",
      message: `Slug "${meta.slug}" does not match folder name "${slug}"`,
    });
  }

  // Kind-specific checks
  if (kind === "logo") {
    const logo = meta as LogoMeta;
    for (const [vName, variant] of Object.entries(logo.variants)) {
      if (!variant) continue;
      const svgPath = join(dir, variant.file);
      try {
        const svgContent = await readFile(svgPath, "utf8");
        const svgIssues = validateSvgContent(svgContent, variant.file);
        for (const msg of svgIssues) {
          issues.push({ kind, slug, path: `variants.${vName}`, message: msg });
        }
      } catch (err) {
        issues.push({
          kind,
          slug,
          path: `variants.${vName}.file`,
          message: `SVG file "${variant.file}" not found in ${slug}/: ${(err as Error).message}`,
        });
      }
    }
  }

  return { meta, issues };
}

/** Validate all resources under contentRoot. */
export async function validateAll(contentRoot: string): Promise<ValidationReport> {
  const report: ValidationReport = {
    totalChecked: 0,
    byKind: { logo: 0, block: 0, component: 0, theme: 0, font: 0 },
    issues: [],
  };

  for (const kind of KINDS) {
    const familyDir = join(contentRoot, FAMILY_DIR[kind]);
    const entries: string[] = [];
    try {
      const items = await readdir(familyDir);
      for (const item of items) {
        try {
          const s = await stat(join(familyDir, item));
          if (s.isDirectory()) entries.push(item);
        } catch {
          // ignore
        }
      }
    } catch {
      // Family folder might not exist yet (e.g. before phase 5/6)
      continue;
    }

    for (const slug of entries) {
      report.totalChecked++;
      report.byKind[kind]++;
      const res = await validateResourceFolder(contentRoot, kind, slug);
      report.issues.push(...res.issues);
    }
  }

  return report;
}
