import MiniSearch from "minisearch";
import {
  OFFICIAL_LOGOS,
  SAMPLE_BLOCKS,
  SAMPLE_COMPONENTS,
  SAMPLE_THEMES,
  SAMPLE_FONTS,
} from "./catalog";

export interface SearchDoc {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: "logo" | "block" | "component" | "theme" | "font";
  category: string;
  tags: string[];
  aliases?: string[];
  url: string;
}

const docs: SearchDoc[] = [
  ...OFFICIAL_LOGOS.map((l) => ({
    id: `logo-${l.slug}`,
    slug: l.slug,
    name: l.name,
    description: l.description,
    kind: "logo" as const,
    category: l.category,
    tags: l.tags,
    aliases: l.aliases,
    url: `/logos/${l.slug}`,
  })),
  ...SAMPLE_BLOCKS.map((b) => ({
    id: `block-${b.slug}`,
    slug: b.slug,
    name: b.name,
    description: b.description,
    kind: "block" as const,
    category: b.category,
    tags: b.tags,
    url: `/blocks#${b.slug}`,
  })),
  ...SAMPLE_COMPONENTS.map((c) => ({
    id: `component-${c.slug}`,
    slug: c.slug,
    name: c.name,
    description: c.description,
    kind: "component" as const,
    category: c.category,
    tags: c.tags,
    url: `/components#${c.slug}`,
  })),
  ...SAMPLE_THEMES.map((t) => ({
    id: `theme-${t.slug}`,
    slug: t.slug,
    name: t.name,
    description: t.description,
    kind: "theme" as const,
    category: "theme",
    tags: ["theme", "palette", "colors"],
    url: `/themes#${t.slug}`,
  })),
  ...SAMPLE_FONTS.map((f) => ({
    id: `font-${f.slug}`,
    slug: f.slug,
    name: f.name,
    description: f.description,
    kind: "font" as const,
    category: f.category,
    tags: ["font", "typography"],
    url: `/fonts#${f.slug}`,
  })),
];

const miniSearch = new MiniSearch<SearchDoc>({
  fields: ["name", "aliases", "description", "tags", "category"],
  storeFields: ["id", "slug", "name", "description", "kind", "category", "url"],
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
    boost: { name: 2, aliases: 1.5 },
  },
});

miniSearch.addAll(docs);

export function searchCatalog(query: string, limit = 8): SearchDoc[] {
  if (!query.trim()) return docs.slice(0, limit);
  const results = miniSearch.search(query);
  return results.slice(0, limit).map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    kind: r.kind,
    category: r.category,
    tags: [],
    url: r.url,
  }));
}
