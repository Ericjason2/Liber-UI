import type { LogoMeta, FontMeta } from "./schema.js";

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

export function createFontRegistryItem(font: FontMeta): RegistryItem {
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

export function createComponentRegistryItem(comp: {
  slug: string;
  name: string;
  description: string;
  category: string;
  dependencies?: string[];
  code: string;
}): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: comp.slug,
    type: "registry:ui",
    title: comp.name,
    description: comp.description,
    author: "Liber Team",
    categories: [comp.category],
    dependencies: comp.dependencies || [],
    files: [
      {
        path: `ui/${comp.slug}.tsx`,
        content: comp.code,
        type: "registry:ui",
      },
    ],
    meta: {
      kind: "component",
    },
  };
}

export function createThemeRegistryItem(theme: {
  slug: string;
  name: string;
  description: string;
  category: string;
  swatches: string[];
}): RegistryItem {
  const cssContent = `/* Liber UI Theme: ${theme.name} */\n:root {\n  --background: ${theme.swatches[0]};\n  --foreground: ${theme.swatches[1]};\n  --primary: ${theme.swatches[2]};\n  --muted: ${theme.swatches[3]};\n  --accent: ${theme.swatches[4]};\n  --color-1: ${theme.swatches[0]};\n  --color-2: ${theme.swatches[1]};\n  --color-3: ${theme.swatches[2]};\n  --color-4: ${theme.swatches[3]};\n  --color-5: ${theme.swatches[4]};\n}\n`;
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${theme.slug}`,
    type: "registry:theme",
    title: theme.name,
    description: theme.description,
    author: "Liber Team",
    categories: [theme.category],
    files: [
      {
        path: `styles/themes/${theme.slug}.css`,
        content: cssContent,
        type: "registry:style",
      },
    ],
    meta: {
      kind: "theme",
      swatches: theme.swatches,
    },
  };
}

export function createRootRegistry(items: RegistryItem[]): RootRegistry {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "liber",
    homepage: "https://liber-ui-delta.vercel.app",
    items,
  };
}
