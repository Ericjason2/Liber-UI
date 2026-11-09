import { type NextRequest, NextResponse } from "next/server";
import { SAMPLE_FONTS, type FontItem } from "@/lib/catalog-fonts";

const THEME_IDS = ["Basic", "Fancy", "Script", "Techno", "Gothic", "Bitmap"];

let cachedSortedFonts: FontItem[] | null = null;
let cachedThemeCounts: Record<string, number> | null = null;

function getSortedFontsAndCounts(): {
  sortedFonts: FontItem[];
  themeCounts: Record<string, number>;
} {
  if (cachedSortedFonts && cachedThemeCounts) {
    return { sortedFonts: cachedSortedFonts, themeCounts: cachedThemeCounts };
  }

  cachedSortedFonts = [...SAMPLE_FONTS].sort((a, b) => a.name.localeCompare(b.name));

  const counts: Record<string, number> = { all: cachedSortedFonts.length };
  for (const themeId of THEME_IDS) {
    const tLower = themeId.toLowerCase();
    counts[themeId] = cachedSortedFonts.filter((f) => {
      const ft = (f.theme || "").toLowerCase();
      if (tLower === "basic") {
        return ft === "basic" || f.category === "sans" || f.category === "serif";
      }
      if (tLower === "bitmap") {
        return ft === "bitmap" || f.category === "mono";
      }
      if (tLower === "fancy") {
        return ft === "fancy" || f.category === "display";
      }
      return ft === tLower;
    }).length;
  }

  cachedThemeCounts = counts;
  return { sortedFonts: cachedSortedFonts, themeCounts: cachedThemeCounts };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const selectedTheme = searchParams.get("theme") || "all";
  const selectedSubtheme = searchParams.get("subtheme") || "all";
  const selectedLetter = searchParams.get("letter") || "All";
  const limitParam = parseInt(searchParams.get("limit") || "36", 10);
  const offsetParam = parseInt(searchParams.get("offset") || "0", 10);

  const limit = Number.isNaN(limitParam) ? 36 : Math.min(Math.max(limitParam, 1), 200);
  const offset = Number.isNaN(offsetParam) ? 0 : Math.max(offsetParam, 0);

  const { sortedFonts, themeCounts } = getSortedFontsAndCounts();

  const filtered = sortedFonts.filter((font) => {
    const fontTheme = (
      font.theme ||
      (font.category === "mono" ? "Bitmap" : font.category === "display" ? "Fancy" : "Basic")
    ).toLowerCase();
    const fontSubtheme = (font.subtheme || "").toLowerCase();

    if (q) {
      const matchesSearch =
        font.name.toLowerCase().includes(q) ||
        font.slug.toLowerCase().includes(q) ||
        fontTheme.includes(q) ||
        fontSubtheme.includes(q) ||
        Boolean(font.author && font.author.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (selectedLetter !== "All") {
      const firstChar = font.name.charAt(0).toUpperCase();
      if (selectedLetter === "#") {
        if (/[A-Z]/.test(firstChar)) return false;
      } else if (firstChar !== selectedLetter) {
        return false;
      }
    }

    if (selectedTheme !== "all") {
      const tLower = selectedTheme.toLowerCase();
      let matchesTheme: boolean;
      if (tLower === "basic") {
        matchesTheme = fontTheme === "basic" || font.category === "sans" || font.category === "serif";
      } else if (tLower === "bitmap") {
        matchesTheme = fontTheme === "bitmap" || font.category === "mono";
      } else if (tLower === "fancy") {
        matchesTheme = fontTheme === "fancy" || font.category === "display";
      } else {
        matchesTheme = fontTheme === tLower || font.category === tLower;
      }
      if (!matchesTheme) return false;
    }

    if (selectedSubtheme !== "all") {
      const stLower = selectedSubtheme.toLowerCase();
      if (!fontSubtheme.includes(stLower)) return false;
    }

    return true;
  });

  const fonts = filtered.slice(offset, offset + limit);

  return NextResponse.json(
    {
      fonts,
      totalFiltered: filtered.length,
      themeCounts,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}

