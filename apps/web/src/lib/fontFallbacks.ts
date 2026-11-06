// Mapping of font themes/categories to high-quality expressive Google Fonts
// Ensures typed text previews visually render in the authentic typographic style.

export interface ThematicFallback {
  googleFamily: string;
  category: "serif" | "sans-serif" | "monospace" | "cursive" | "display";
}

export const THEME_FALLBACKS: Record<string, ThematicFallback> = {
  // Fancy subthemes
  cartoon: { googleFamily: "Bangers", category: "cursive" },
  comic: { googleFamily: "Bangers", category: "cursive" },
  groovy: { googleFamily: "Righteous", category: "cursive" },
  "old-school": { googleFamily: "Righteous", category: "display" },
  retro: { googleFamily: "Righteous", category: "display" },
  curly: { googleFamily: "Pacifico", category: "cursive" },
  western: { googleFamily: "Rye", category: "serif" },
  horror: { googleFamily: "Creepster", category: "cursive" },
  eroded: { googleFamily: "Creepster", category: "cursive" },
  distorted: { googleFamily: "Nosifer", category: "cursive" },
  destroy: { googleFamily: "Creepster", category: "cursive" },
  typewriter: { googleFamily: "Special Elite", category: "monospace" },
  decorative: { googleFamily: "Cinzel Decorative", category: "serif" },
  stencil: { googleFamily: "Black Ops One", category: "display" },
  grid: { googleFamily: "Major Mono Display", category: "monospace" },

  // Gothic subthemes
  medieval: { googleFamily: "UnifrakturMaguntia", category: "serif" },
  modern: { googleFamily: "UnifrakturCook", category: "serif" },
  celtic: { googleFamily: "MedievalSharp", category: "serif" },
  initials: { googleFamily: "Cinzel Decorative", category: "serif" },

  // Basic subthemes
  sans: { googleFamily: "Space Grotesk", category: "sans-serif" },
  serif: { googleFamily: "Playfair Display", category: "serif" },
  mono: { googleFamily: "JetBrains Mono", category: "monospace" },

  // Script subthemes
  calligraphy: { googleFamily: "Great Vibes", category: "cursive" },
  school: { googleFamily: "Caveat", category: "cursive" },
  handwritten: { googleFamily: "Caveat", category: "cursive" },
  brush: { googleFamily: "Pacifico", category: "cursive" },
  graffiti: { googleFamily: "Sedgwick Ave", category: "cursive" },

  // Techno subthemes
  "sci-fi": { googleFamily: "Orbitron", category: "sans-serif" },
  lcd: { googleFamily: "VT323", category: "monospace" },
  square: { googleFamily: "Audiowide", category: "sans-serif" },

  // Bitmap subthemes
  pixel: { googleFamily: "Press Start 2P", category: "monospace" },
};

export function getFontDisplayFamily(font: {
  name: string;
  googleFontsFamily?: string;
  theme?: string;
  subtheme?: string;
  category?: string;
}): string {
  if (font.googleFontsFamily) {
    return `'${font.googleFontsFamily}', sans-serif`;
  }

  const subKey = (font.subtheme || "").toLowerCase().replace(/\s+/g, "-");
  const themeKey = (font.theme || "").toLowerCase().replace(/\s+/g, "-");
  const catKey = (font.category || "").toLowerCase();

  const fallback =
    THEME_FALLBACKS[subKey] ||
    THEME_FALLBACKS[themeKey] ||
    THEME_FALLBACKS[catKey] ||
    (catKey === "serif"
      ? { googleFamily: "Playfair Display", category: "serif" }
      : catKey === "mono"
      ? { googleFamily: "JetBrains Mono", category: "monospace" }
      : { googleFamily: "Space Grotesk", category: "sans-serif" });

  return `'${font.name}', '${fallback.googleFamily}', ${fallback.category}`;
}

export function loadFontStylesheet(family: string) {
  if (typeof document === "undefined" || !family) return;
  const linkId = `gfont-${family.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  if (document.getElementById(linkId)) return;

  const familyQuery = family.replace(/ /g, "+");
  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${familyQuery}&display=swap`;
  document.head.appendChild(link);
}
