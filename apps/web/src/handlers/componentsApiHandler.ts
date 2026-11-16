import { type NextRequest, NextResponse } from "next/server";
import { SAMPLE_COMPONENTS, type ComponentItem } from "../lib/catalog-components";

const CATEGORY_IDS = [
  "card",
  "form",
  "button",
  "navbar",
  "hero",
  "pricing",
  "grid",
  "profile",
  "landing-page",
] as const;

let cachedCategoryCounts: Record<string, number> | null = null;
let cachedAvailableTags: Array<{ tag: string; count: number }> | null = null;

function getMetadataCaches() {
  if (cachedCategoryCounts && cachedAvailableTags) {
    return {
      categoryCounts: cachedCategoryCounts,
      availableTags: cachedAvailableTags,
    };
  }

  const counts: Record<string, number> = { all: SAMPLE_COMPONENTS.length };
  for (const cat of CATEGORY_IDS) {
    counts[cat] = 0;
  }
  for (const comp of SAMPLE_COMPONENTS) {
    if (comp.category) {
      counts[comp.category] = (counts[comp.category] || 0) + 1;
    }
  }

  const tagMap = new Map<string, number>();
  for (const comp of SAMPLE_COMPONENTS) {
    for (const rawTag of comp.tags || []) {
      const t = rawTag.trim();
      if (!t) continue;
      tagMap.set(t, (tagMap.get(t) || 0) + 1);
    }
  }

  cachedCategoryCounts = counts;
  cachedAvailableTags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 45);

  return {
    categoryCounts: cachedCategoryCounts,
    availableTags: cachedAvailableTags,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slugParam = (searchParams.get("slug") || "").trim();

  if (slugParam) {
    const component = SAMPLE_COMPONENTS.find((c) => c.slug === slugParam) || null;
    if (!component) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 });
    }
    const related = SAMPLE_COMPONENTS.filter(
      (c) =>
        c.slug !== component.slug &&
        (c.tags.some((t) => component.tags.includes(t)) || c.category === component.category)
    ).slice(0, 6);

    return NextResponse.json(
      { component, related },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }

  const rawQ = (searchParams.get("q") || "").toLowerCase().trim();
  const q = rawQ.startsWith("#") ? rawQ.slice(1) : rawQ;
  const selectedCat = (searchParams.get("category") || "all").toLowerCase().trim();
  const selectedTag = (searchParams.get("tag") || "all").toLowerCase().trim();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const limitParam = parseInt(searchParams.get("limit") || "12", 10);

  const limit = Number.isNaN(limitParam) ? 12 : Math.min(Math.max(limitParam, 1), 48);
  const page = Number.isNaN(pageParam) ? 1 : Math.max(pageParam, 1);
  const offset = (page - 1) * limit;

  const { categoryCounts, availableTags } = getMetadataCaches();

  const filtered: ComponentItem[] = SAMPLE_COMPONENTS.filter((item) => {
    if (selectedCat !== "all" && item.category !== selectedCat) {
      return false;
    }

    if (
      selectedTag !== "all" &&
      !item.tags.some((t) => t.toLowerCase() === selectedTag)
    ) {
      return false;
    }

    if (q) {
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    return true;
  });

  const components = filtered.slice(offset, offset + limit);

  return NextResponse.json(
    {
      components,
      items: components,
      totalFiltered: filtered.length,
      total: filtered.length,
      totalCount: SAMPLE_COMPONENTS.length,
      categoryCounts,
      availableTags,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}

