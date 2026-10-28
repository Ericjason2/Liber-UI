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
  Bookmark,
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

export default function ThemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "name">("popular");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    SAMPLE_THEMES.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    return [
      { id: "all", label: "All Palettes", count: SAMPLE_THEMES.length },
      { id: "warm", label: "Warm & Sunsets", count: counts["warm"] || 0 },
      { id: "cool", label: "Cool & Oceans", count: counts["cool"] || 0 },
      { id: "nature", label: "Nature & Botanical", count: counts["nature"] || 0 },
      { id: "pastel", label: "Soft Pastels", count: counts["pastel"] || 0 },
      { id: "neon", label: "Neon & Synth", count: counts["neon"] || 0 },
      { id: "standard", label: "Minimal Industrial", count: counts["standard"] || 0 },
      { id: "high-contrast", label: "High Contrast", count: counts["high-contrast"] || 0 },
    ].filter((c) => c.id === "all" || c.count > 0);
  }, []);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredThemes = useMemo(() => {
    const list = SAMPLE_THEMES.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.swatches.some((s) => s.toLowerCase().includes(q)) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)));
      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return list.sort((a, b) => {
      if (sortBy === "popular") {
        return (b.likes || 1000) - (a.likes || 1000);
      }
      return a.name.localeCompare(b.name);
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

  const downloadAllPalettes = () => {
    const dataStr = JSON.stringify(SAMPLE_THEMES, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "liber-color-palettes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Downloaded all color palettes as JSON");
  };

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
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-muted border border-border text-muted-foreground">
            Coolors.co Popular format
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Popular Color Palettes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Curated 5-swatch color schemes matching the most popular palettes on Coolors.
              Click any color stripe to copy its HEX code instantly, or export full CSS and Tailwind variables.
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

            <button
              onClick={downloadAllPalettes}
              className="flex items-center gap-2 h-10 px-4 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              <span>Export All (.json)</span>
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
              placeholder="Search by name, hex code (#264653), or mood (warm, ocean, neon, sage)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 h-10 px-3 rounded-[10px] border border-border bg-card text-xs text-muted-foreground font-mono">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "popular" | "name")}
                className="bg-transparent text-foreground font-medium outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            <span className="h-10 px-3 flex items-center rounded-[10px] border border-border bg-muted/40 text-xs font-mono text-muted-foreground whitespace-nowrap">
              {filteredThemes.length} / {SAMPLE_THEMES.length}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[10px] opacity-70">({cat.count})</span>
            </button>
          ))}
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
              colors: {
                [`${theme.slug}-1`]: theme.swatches[0],
                [`${theme.slug}-2`]: theme.swatches[1],
                [`${theme.slug}-3`]: theme.swatches[2],
                [`${theme.slug}-4`]: theme.swatches[3],
                [`${theme.slug}-5`]: theme.swatches[4],
              },
            },
            null,
            2
          );

          return (
            <article
              key={theme.slug}
              id={`palette-${theme.slug}`}
              className={`rounded-[10px] border transition-all duration-200 bg-card p-4 space-y-4 flex flex-col justify-between ${
                isHighlighted
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border hover:border-neutral-400 dark:hover:border-neutral-600"
              }`}
            >
              {/* Card Header: Title, Category Badge, Likes */}
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

                <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Bookmark className="h-3.5 w-3.5 opacity-70" />
                  <span>{theme.likes ? `${(theme.likes / 1000).toFixed(1)}k` : "12.4k"}</span>
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
        <div className="py-20 text-center space-y-3 rounded-[10px] border border-border bg-card">
          <p className="text-sm text-foreground font-medium">No color palettes found.</p>
          <p className="text-xs text-muted-foreground font-mono">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 text-xs rounded-[10px] bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Export & Offline Backup Banner */}
      <div className="p-6 sm:p-8 rounded-[10px] border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Complete Color System Offline Backup
          </h3>
          <p className="text-xs text-muted-foreground max-w-xl">
            Download all {SAMPLE_THEMES.length} palettes with WCAG contrast metrics, 5-swatch arrays, and CSS variables in a single JSON bundle for your design systems.
          </p>
        </div>
        <button
          onClick={downloadAllPalettes}
          className="flex items-center gap-2 h-10 px-5 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <Download className="h-4 w-4" />
          <span>Download All Palettes (.json)</span>
        </button>
      </div>
    </div>
  );
}
