/**
 * Zod schemas for the five resource kinds (cahier des charges, section 6).
 * A missing or invalid field fails `pnpm validate` and the CI.
 */
import { z } from "zod";

export const KINDS = ["logo", "block", "component", "theme", "font"] as const;
export type Kind = (typeof KINDS)[number];

/** Folder name under content/ for each kind. */
export const FAMILY_DIR: Record<Kind, string> = {
  logo: "logos",
  block: "blocks",
  component: "components",
  theme: "themes",
  font: "fonts",
};

/** Metadata file name for each kind (section 5). */
export const META_FILE: Record<Kind, string> = {
  logo: "meta.json",
  block: "meta.json",
  component: "meta.json",
  theme: "theme.json",
  font: "font.json",
};

export const LOGO_CATEGORIES = [
  "languages",
  "frontend",
  "backend",
  "devops",
  "tools",
  "africa",
] as const;

export const LOGO_VARIANTS = ["color", "mono", "light", "dark", "wordmark"] as const;
export type LogoVariant = (typeof LOGO_VARIANTS)[number];

export const BLOCK_CATEGORIES = [
  "headers",
  "hero",
  "features",
  "pricing",
  "testimonials",
  "cta",
  "footers",
] as const;

export const FONT_CATEGORIES = ["sans", "serif", "mono", "display"] as const;

/** CSS variables every theme must define, in light and dark (section 7). */
export const REQUIRED_THEME_VARS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
] as const;

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase letters, digits and dashes");

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected a date formatted YYYY-MM-DD");
const httpsUrl = z
  .string()
  .url("expected a valid URL")
  .refine((u) => u.startsWith("https://"), { message: "expected an https:// URL" });
const hexColor = z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "expected #rgb or #rrggbb");
const svgFile = z.string().regex(/^[a-z0-9-]+\.svg$/, "expected a local .svg file name");
const npmPackage = z.string().regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/);
const relativeFile = z
  .string()
  .min(1)
  .refine((p) => !p.startsWith("/") && !p.split(/[\\/]/).includes(".."), {
    message: "file must be a relative path inside the resource folder",
  });

/** Code licenses accepted for blocks, components and themes. */
const codeLicense = z.enum(["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"]);

/** Common base shared by every family. */
const base = {
  slug: slugSchema,
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).optional(),
  author: z.string().trim().min(1),
};

const logoVariant = z.strictObject({ file: svgFile, hex: hexColor.optional() });

export const logoSchema = z.strictObject({
  ...base,
  kind: z.literal("logo"),
  license: z.literal("trademark"),
  category: z.enum(LOGO_CATEGORIES),
  aliases: z.array(z.string().trim().min(1)),
  website: httpsUrl,
  brandGuidelinesUrl: httpsUrl,
  source: z.strictObject({ url: httpsUrl, retrievedAt: isoDate }),
  variants: z.strictObject({
    color: z.strictObject({ file: svgFile, hex: hexColor }),
    mono: logoVariant.optional(),
    light: logoVariant.optional(),
    dark: logoVariant.optional(),
    wordmark: logoVariant.optional(),
  }),
});

const registryFile = z.strictObject({
  path: relativeFile,
  target: z.string().min(1).optional(),
});

export const blockSchema = z.strictObject({
  ...base,
  kind: z.literal("block"),
  license: codeLicense,
  category: z.enum(BLOCK_CATEGORIES),
  registryDependencies: z.array(z.string().min(1)),
  dependencies: z.array(npmPackage),
  files: z.array(registryFile).min(1),
  responsive: z.literal(true),
});

const componentProp = z.strictObject({
  name: z.string().min(1),
  type: z.string().min(1),
  default: z.string().optional(),
  description: z.string().min(1),
});

export const componentSchema = z.strictObject({
  ...base,
  kind: z.literal("component"),
  license: codeLicense,
  registryDependencies: z.array(z.string().min(1)),
  dependencies: z.array(npmPackage),
  files: z.array(registryFile).min(1),
  variants: z.array(componentProp),
});

const cssVars = z.record(z.string().regex(/^[a-z0-9-]+$/), z.string().min(1));

const contrastEntry = z.strictObject({
  pair: z.string(),
  ratio: z.number(),
  passes: z.boolean(),
});

export const themeSchema = z
  .strictObject({
    ...base,
    kind: z.literal("theme"),
    license: codeLicense,
    radius: z.string().regex(/^\d+(\.\d+)?(rem|px)$/),
    fonts: z.strictObject({
      sans: slugSchema.optional(),
      serif: slugSchema.optional(),
      mono: slugSchema.optional(),
      heading: slugSchema.optional(),
    }),
    light: cssVars,
    dark: cssVars,
    contrastReport: z
      .strictObject({ light: z.array(contrastEntry), dark: z.array(contrastEntry) })
      .optional(),
  })
  .superRefine((theme, ctx) => {
    for (const mode of ["light", "dark"] as const) {
      for (const key of REQUIRED_THEME_VARS) {
        if (!(key in theme[mode])) {
          ctx.addIssue({
            code: "custom",
            path: [mode, key],
            message: `missing required CSS variable "${key}"`,
          });
        }
      }
    }
  });

export const fontSchema = z.strictObject({
  ...base,
  kind: z.literal("font"),
  license: z.enum(["OFL-1.1", "Apache-2.0"]),
  family: z.string().min(1),
  category: z.enum(FONT_CATEGORIES),
  fontsourcePackage: z.string().regex(/^@fontsource(-variable)?\/[a-z0-9-]+$/),
  weights: z.array(z.number().int().min(100).max(900)).min(1),
  subsets: z.array(z.string().min(1)).min(1),
  variable: z.boolean(),
  source: z.strictObject({ url: httpsUrl }),
  licenseFile: relativeFile,
});

export const SCHEMAS = {
  logo: logoSchema,
  block: blockSchema,
  component: componentSchema,
  theme: themeSchema,
  font: fontSchema,
} as const;

export type LogoMeta = z.infer<typeof logoSchema>;
export type BlockMeta = z.infer<typeof blockSchema>;
export type ComponentMeta = z.infer<typeof componentSchema>;
export type ThemeMeta = z.infer<typeof themeSchema>;
export type FontMeta = z.infer<typeof fontSchema>;
export type ResourceMeta = LogoMeta | BlockMeta | ComponentMeta | ThemeMeta | FontMeta;
