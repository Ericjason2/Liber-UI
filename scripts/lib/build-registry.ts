import type { LogoMeta } from "./schema.js";

export interface RegistryItemFile {
  path: string;
  content: string;
  type: string;
  target?: string;
}

export interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  title: string;
  description: string;
  author?: string;
  categories?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryItemFile[];
  meta?: Record<string, unknown>;
}

export interface RootRegistry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

export function createLogoRegistryItem(
  logo: LogoMeta,
  reactComponentCode: string,
): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: logo.slug,
    type: "registry:ui",
    title: logo.name,
    description: logo.description,
    author: logo.author,
    categories: [logo.category],
    files: [
      {
        path: `ui/logos/${logo.slug}.tsx`,
        content: reactComponentCode,
        type: "registry:ui",
      },
    ],
    meta: {
      kind: "logo",
      aliases: logo.aliases,
      website: logo.website,
      brandGuidelinesUrl: logo.brandGuidelinesUrl,
      source: logo.source,
      variants: logo.variants,
    },
  };
}

export function createFontRegistryItem(font: any): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: font.slug,
    type: "registry:font",
    title: font.name,
    description: font.description,
    author: font.author,
    categories: [font.category],
    dependencies: [font.fontsourcePackage],
    files: [
      {
        path: `styles/fonts/${font.slug}.css`,
        content: `/* Self-hosted font definition for ${font.name} */\n@import "${font.fontsourcePackage}";\n:root {\n  --font-${font.category}: '${font.family}', sans-serif;\n}\n`,
        type: "registry:style",
      },
    ],
    meta: {
      kind: "font",
      family: font.family,
      weights: font.weights,
      subsets: font.subsets,
      variable: font.variable,
      license: font.license,
      fontsourcePackage: font.fontsourcePackage,
    },
  };
}

export function createRootRegistry(items: RegistryItem[]): RootRegistry {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "liber",
    homepage: "https://liber.dev",
    items,
  };
}
