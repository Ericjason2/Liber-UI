"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { SAMPLE_THEMES, type ThemeItem } from "@/lib/catalog";
import {
  Copy,
  Check,
  Search,
  Download,
  Dices,
  SlidersHorizontal,
  Code2,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

function getContrastColor(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0A0A0A" : "#FFFFFF";
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const THEME_SYNONYMS: Record<string, string[]> = {
  // Médécine / Santé / Medical / Health
  medecine: ["medecine", "medicine", "medical", "sante", "health", "hospital", "hopital", "pharma", "pharmacie", "clinic", "clinique", "care", "soin", "doctor", "docteur", "urgences", "cardiac"],
  medicine: ["medecine", "medicine", "medical", "sante", "health", "hospital", "pharma", "clinic", "care"],
  sante: ["medecine", "medicine", "medical", "sante", "health", "hospital", "pharma", "clinic", "care", "wellness"],
  health: ["medecine", "medicine", "medical", "sante", "health", "hospital", "pharma", "clinic", "care"],
  medical: ["medecine", "medicine", "medical", "sante", "health", "hospital", "pharma", "clinic", "care"],
  hopital: ["medecine", "medical", "sante", "hospital", "hopital", "care"],
  hospital: ["medecine", "medical", "sante", "hospital", "care"],
  pharma: ["medecine", "pharmacie", "pharmacy", "medical", "sante"],
  pharmacie: ["medecine", "pharmacie", "pharmacy", "medical", "sante"],

  // Nature / Botanical / Forest
  nature: ["nature", "botanical", "botanique", "forest", "foret", "plant", "plantes", "vegetal", "bio", "organic", "organique", "earth", "terre", "green", "vert", "eucalyptus", "sage", "feuille", "arbres", "ecologie"],
  foret: ["nature", "forest", "foret", "botanical", "wood", "bois", "green", "vert"],
  forest: ["nature", "forest", "foret", "botanical", "wood", "green"],
  botanique: ["nature", "botanical", "botanique", "plant", "green"],
  botanical: ["nature", "botanical", "plant", "green"],
  ecologie: ["nature", "organic", "green", "bio", "earth"],
  plante: ["nature", "plant", "plantes", "botanical", "green"],
  plantes: ["nature", "plant", "plantes", "botanical", "green"],

  // Technologie / Tech / Cyber / Code
  technologie: ["tech", "technologie", "technology", "cyber", "digital", "matrix", "code", "coding", "terminal", "ai", "ia", "futur", "future", "neon"],
  technology: ["tech", "technologie", "technology", "cyber", "digital", "code", "neon"],
  tech: ["tech", "technologie", "technology", "cyber", "digital", "code", "neon"],
  cyber: ["cyber", "neon", "matrix", "tech", "futur", "digital"],
  code: ["code", "terminal", "developer", "programming", "linear", "dracula", "tech"],

  // Luxe / Gold / Elegance
  luxe: ["luxe", "luxury", "gold", "or", "prestige", "elegant", "elegance", "premium", "rich"],
  luxury: ["luxe", "luxury", "gold", "prestige", "elegant", "premium"],
  gold: ["gold", "or", "amber", "luxury", "luxe", "yellow"],
  or: ["gold", "or", "amber", "luxury", "luxe"],

  // Mer / Ocean / Water
  mer: ["mer", "ocean", "sea", "water", "eau", "marine", "plage", "beach", "aquatic", "aquatique", "blue", "bleu"],
  ocean: ["mer", "ocean", "sea", "water", "marine", "blue", "bleu", "cold", "arctic"],
  eau: ["water", "eau", "ocean", "sea", "mer", "blue", "cyan"],

  // Chaud / Sunset / Soleil / Fire
  chaud: ["warm", "chaud", "sunset", "soleil", "sun", "summer", "ete", "fire", "feu", "orange", "rouge", "red"],
  sunset: ["sunset", "dusk", "crepuscule", "twilight", "warm", "sun", "soleil", "orange", "mauve"],
  soleil: ["sun", "soleil", "sunset", "warm", "summer", "ete", "yellow", "orange"],
  feu: ["fire", "feu", "flamme", "flame", "warm", "red", "rouge", "orange"],

  // Froid / Hiver / Ice
  froid: ["cold", "froid", "ice", "glace", "winter", "hiver", "snow", "neige", "frost", "arctic", "polaire"],
  hiver: ["winter", "hiver", "frost", "ice", "snow", "neige", "cold"],
  winter: ["winter", "hiver", "frost", "ice", "snow", "cold"],

  // Sombre / Dark / Nuit
  sombre: ["dark", "sombre", "night", "nuit", "black", "noir", "nocturne", "shadow"],
  nuit: ["night", "nuit", "dark", "sombre", "black", "noir"],
  noir: ["black", "noir", "dark", "sombre", "obsidian", "oled"],

  // Clair / Light / Blanc / Minimal
  clair: ["light", "clair", "white", "blanc", "clean", "minimal", "pure", "epure"],
  blanc: ["white", "blanc", "light", "clair", "clean", "pure"],
  minimal: ["minimal", "clean", "linen", "epure", "standard", "light"],
};

export default function ThemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "name">("default");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredThemes = useMemo(() => {
    const rawQ = searchQuery.trim();
    if (!rawQ && selectedCategory === "all") {
      const list = [...SAMPLE_THEMES];
      if (sortBy === "name") {
        return list.sort((a, b) => a.name.localeCompare(b.name));
      }
      return list;
    }

    const normQ = normalizeText(rawQ);
    const searchTerms: string[] = [normQ];
    if (THEME_SYNONYMS[normQ]) {
      searchTerms.push(...THEME_SYNONYMS[normQ]);
    }
    // Also check single tokens if multi-word
    normQ.split(/\s+/).forEach((tok) => {
      if (tok && THEME_SYNONYMS[tok]) {
        searchTerms.push(...THEME_SYNONYMS[tok]);
      }
    });

    const list = SAMPLE_THEMES.filter((t) => {
      const tNameNorm = normalizeText(t.name);
      const tDescNorm = normalizeText(t.description);
      const tSlugNorm = normalizeText(t.slug);
      const tCatNorm = normalizeText(t.category);
      const tTagsNorm = (t.tags || []).map(normalizeText);

      const matchesSearch =
        !normQ ||
        searchTerms.some(
          (term) =>
            tNameNorm.includes(term) ||
            tDescNorm.includes(term) ||
            tSlugNorm.includes(term) ||
            tCatNorm.includes(term) ||
            tTagsNorm.some((tag) => tag.includes(term)) ||
            t.swatches.some((s) => s.toLowerCase().includes(term))
        );

      const matchesCategory =
        selectedCategory === "all" ||
        t.category === selectedCategory ||
        (selectedCategory === "cold" && t.category === "cool");

      return matchesSearch && matchesCategory;
    });

    return list.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleRandomPalette = useCallback(() => {
    if (filteredThemes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredThemes.length);
    const chosen = filteredThemes[randomIndex];
    if (!chosen) return;
    setHighlightedSlug(chosen.slug);
    toast(`Highlighted: ${chosen.name}`);
    const el = document.getElementById(`palette-${chosen.slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [filteredThemes, toast]);

  // Spacebar to pick a random palette (signature Coolors feature)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        (e.target === document.body || e.target === document.documentElement)
      ) {
        e.preventDefault();
        handleRandomPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRandomPalette]);

  const downloadSinglePalette = (theme: ThemeItem) => {
    const dataStr = JSON.stringify(theme, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-${theme.slug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`Downloaded ${theme.name} palette JSON`);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Monospace Breadcrumb & Top Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Themes</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Color Palettes & Themes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Curated modern color schemes with verified WCAG contrast standards.
              Click any color stripe to copy its HEX code instantly, or export clean CSS variables and Tailwind tokens.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button
              onClick={handleRandomPalette}
              className="flex items-center gap-2 h-10 px-4 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
              title="Hit Spacebar anytime to jump to a random palette"
            >
              <Dices className="h-4 w-4 text-muted-foreground" />
              <span>Shuffle</span>
              <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded-[4px] bg-muted border border-border text-muted-foreground ml-1">
                Space
              </kbd>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search & Category Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search theme (e.g. médécine, nature, tech, luxe, pastel, dark, sunset)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 h-10 px-3 rounded-[10px] border border-border bg-card text-xs text-muted-foreground font-mono">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "default" | "name")}
                className="bg-transparent text-foreground font-medium outline-none cursor-pointer"
              >
                <option value="default">Curated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            <span className="h-10 px-3 flex items-center rounded-[10px] border border-border bg-muted/40 text-xs font-mono text-muted-foreground whitespace-nowrap">
              {filteredThemes.length} / {SAMPLE_THEMES.length}
            </span>
          </div>
        </div>

        {/* Navigation Bar: Single 'All' pill + active search filter badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
              selectedCategory === "all" && !searchQuery
                ? "bg-primary text-primary-foreground font-semibold"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>All</span>
            <span className="font-mono text-[10px] opacity-70">({SAMPLE_THEMES.length})</span>
          </button>

          {searchQuery && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-muted text-foreground border border-border flex items-center gap-1.5">
                <span>Thème: &ldquo;{searchQuery}&rdquo;</span>
                <span className="text-muted-foreground font-semibold">({filteredThemes.length})</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-primary transition-colors ml-0.5"
                  title="Effacer la recherche"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Coolors-Style Popular Palettes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => {
          const isHighlighted = highlightedSlug === theme.slug;
          const hexListString = theme.swatches.join(", ");
          const cssVariablesString = theme.swatches
            .map((hex, i) => `--color-${i + 1}: ${hex};`)
            .join("\n");
          const tailwindConfigSnippet = JSON.stringify(
            {
              colors: Object.fromEntries(
                theme.swatches.map((hex, i) => [`${theme.slug}-${i + 1}`, hex])
              ),
            },
            null,
            2
          );

          return (
            <article
              key={theme.slug}
              id={`palette-${theme.slug}`}
              className={`rounded-[10px] border transition-all duration-200 bg-card p-4 space-y-4 flex flex-col justify-between ${isHighlighted
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
            >
              {/* Card Header: Title, Category Badge, Contrast Ratio */}
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {theme.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border capitalize">
                      {theme.category}
                    </span>
                    {theme.wcagLevel && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        WCAG {theme.wcagLevel}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded-[6px] bg-muted/70 border border-border">
                    {theme.contrastRatio}
                  </span>
                </div>
              </div>

              {/* Coolors 5-Swatch Vertical Bars (Iconic format) */}
              <div className="h-36 sm:h-40 rounded-[8px] overflow-hidden flex border border-border/80">
                {theme.swatches.map((hex, index) => {
                  const textColor = getContrastColor(hex);
                  const isCopied = copiedKey === `${theme.slug}-${hex}`;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        copyToClipboard(hex, `Copied ${hex}`, `${theme.slug}-${hex}`)
                      }
                      style={{ backgroundColor: hex }}
                      className="group relative flex-1 h-full flex flex-col justify-end items-center pb-2.5 transition-all hover:flex-[1.3] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      title={`Click to copy ${hex}`}
                    >
                      {/* Copy Icon on hover */}
                      <div
                        className="opacity-0 group-hover:opacity-100 transition-opacity mb-auto pt-3"
                        style={{ color: textColor }}
                      >
                        {isCopied ? (
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </div>

                      {/* Hex Value Label */}
                      <span
                        className="font-mono text-[11px] font-semibold tracking-tight uppercase"
                        style={{ color: textColor }}
                      >
                        {isCopied ? "COPIED" : hex.replace("#", "")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground line-clamp-1">
                {theme.description}
              </p>

              {/* Quick Action Toolbar */}
              <div className="pt-2 border-t border-border/70 flex items-center justify-between gap-1.5 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        hexListString,
                        `Copied 5 HEX codes for ${theme.name}`,
                        `${theme.slug}-all-hex`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded-[6px] bg-muted hover:bg-muted/80 text-foreground border border-border text-[11px] transition-colors"
                  >
                    {copiedKey === `${theme.slug}-all-hex` ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span>HEX</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        cssVariablesString,
                        `Copied CSS variables for ${theme.name}`,
                        `${theme.slug}-css`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded-[6px] bg-muted hover:bg-muted/80 text-foreground border border-border text-[11px] transition-colors"
                  >
                    {copiedKey === `${theme.slug}-css` ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Code2 className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span>CSS</span>
                  </button>

                  <button
                    onClick={() =>
                      copyToClipboard(
                        tailwindConfigSnippet,
                        `Copied Tailwind colors for ${theme.name}`,
                        `${theme.slug}-tw`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded-[6px] bg-muted hover:bg-muted/80 text-foreground border border-border text-[11px] transition-colors"
                  >
                    {copiedKey === `${theme.slug}-tw` ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span>Tailwind</span>
                  </button>
                </div>

                <button
                  onClick={() => downloadSinglePalette(theme)}
                  className="p-1.5 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Download palette JSON"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredThemes.length === 0 && (
        <div className="py-20 text-center space-y-3 rounded-[12px] border border-dashed border-border bg-card/60 p-8">
          <p className="text-base text-foreground font-semibold">
            Aucun résultat pour &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
            Aucune palette de couleurs ne correspond à ce thème. Essayez un mot-clé comme <span className="font-mono text-foreground font-medium">médécine</span>, <span className="font-mono text-foreground font-medium">nature</span>, <span className="font-mono text-foreground font-medium">luxe</span>, <span className="font-mono text-foreground font-medium">tech</span>, <span className="font-mono text-foreground font-medium">pastel</span>, ou <span className="font-mono text-foreground font-medium">sunset</span>.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 text-xs rounded-[10px] bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Afficher toutes les palettes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
