"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Download,
  Terminal,
  RotateCcw,
  Search,
  Type,
  Check,
  Copy,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { BASE_FONTS, TOTAL_FONTS_COUNT, type FontItem } from "@/lib/catalog-fonts-base";
import { useToast } from "@/context/ToastContext";
import { getFontPreviewUrl } from "@/lib/fontPreviewUtils";

const ALPHABET = [
  "All",
  "#",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const THEMES = [
  { id: "all", label: "All Fonts" },
  { id: "Basic", label: "Basic" },
  { id: "Fancy", label: "Fancy" },
  { id: "Script", label: "Script" },
  { id: "Techno", label: "Techno" },
  { id: "Gothic", label: "Gothic" },
  { id: "Bitmap", label: "Bitmap" },
];

const THEME_SUBTHEMES: Record<string, string[]> = {
  Basic: ["Sans serif", "Serif", "Fixed width"],
  Fancy: ["Cartoon", "Comic", "Retro", "Groovy", "Horror", "Western", "Old School", "Typewriter", "Eroded", "Distorted"],
  Script: ["Calligraphy", "Handwritten", "Brush", "Graffiti"],
  Techno: ["Sci-fi", "3D", "Square", "LCD"],
  Gothic: ["Medieval", "Modern", "Celtic"],
  Bitmap: ["Pixel"],
};

const INITIAL_SORTED_BASE = [...BASE_FONTS].sort((a, b) => a.name.localeCompare(b.name));

interface FontsApiResponse {
  fonts: FontItem[];
  totalFiltered: number;
  themeCounts: Record<string, number>;
}

export default function FontsPage() {
  const defaultSample = "The quick brown fox jumps over the lazy dog";
  const [sampleText, setSampleText] = useState(defaultSample);
  const [debouncedSampleText, setDebouncedSampleText] = useState(defaultSample);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedSubtheme, setSelectedSubtheme] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("All");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const [fonts, setFonts] = useState<FontItem[]>(INITIAL_SORTED_BASE);
  const [totalFiltered, setTotalFiltered] = useState<number>(TOTAL_FONTS_COUNT);
  const [themeCounts, setThemeCounts] = useState<Record<string, number>>({
    all: TOTAL_FONTS_COUNT,
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSampleText(sampleText);
    }, 250);
    return () => clearTimeout(handler);
  }, [sampleText]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 180);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch first page (36 items) whenever filters change
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      q: debouncedQuery,
      theme: selectedTheme,
      subtheme: selectedSubtheme,
      letter: selectedLetter,
      limit: "36",
      offset: "0",
    });

    fetch(`/api/fonts?${params.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<FontsApiResponse>) : null))
      .then((data) => {
        if (data && !controller.signal.aborted) {
          setFonts(data.fonts);
          setTotalFiltered(data.totalFiltered);
          setThemeCounts(data.themeCounts);
        }
      })
      .catch(() => {
        // Ignore abort errors
      });

    return () => controller.abort();
  }, [debouncedQuery, selectedTheme, selectedSubtheme, selectedLetter]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || fonts.length >= totalFiltered) return;
    setIsLoadingMore(true);
    try {
      const params = new URLSearchParams({
        q: debouncedQuery,
        theme: selectedTheme,
        subtheme: selectedSubtheme,
        letter: selectedLetter,
        limit: "36",
        offset: String(fonts.length),
      });
      const res = await fetch(`/api/fonts?${params.toString()}`);
      if (res.ok) {
        const data = (await res.json()) as FontsApiResponse;
        setFonts((prev) => [...prev, ...data.fonts]);
        setTotalFiltered(data.totalFiltered);
      }
    } catch {
      // Ignore network errors
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    isLoadingMore,
    fonts.length,
    totalFiltered,
    debouncedQuery,
    selectedTheme,
    selectedSubtheme,
    selectedLetter,
  ]);

  const copyToClipboard = (text: string, label: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentSubthemes = useMemo(() => {
    return selectedTheme !== "all" ? THEME_SUBTHEMES[selectedTheme] || [] : [];
  }, [selectedTheme]);

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* 1. Monospace Breadcrumb & Top Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
            <Link href="/" className="hover:text-foreground transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Fonts & Assets</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Typography & Font System
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Explore open-license & 100% free commercial typefaces classified alphabetically and by authentic themes.
                Click on any font to inspect its full character map, glyphs, and test live sentences.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  setSampleText(defaultSample);
                  setSearchQuery("");
                  setDebouncedQuery("");
                  setSelectedTheme("all");
                  setSelectedSubtheme("all");
                  setSelectedLetter("All");
                }}
                className="h-10 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
                <Type className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">{totalFiltered} fonts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Alphabet Navigation Bar (A-Z, #, All) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Alphabetical Index
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {selectedLetter === "All" ? "A–Z All Letters" : `Letter "${selectedLetter}"`}
            </span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
            {ALPHABET.map((char) => (
              <button
                key={char}
                onClick={() => {
                  setSelectedLetter(char);
                }}
                className={`min-w-[32px] h-8 px-2 rounded-[6px] text-xs font-mono transition-colors flex items-center justify-center ${
                  selectedLetter === char
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Theme & Subtheme Navigation Bar */}
        <div className="p-5 rounded-[12px] border border-border bg-card space-y-4">
          {/* Main Themes */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTheme(t.id);
                    setSelectedSubtheme("all");
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedTheme === t.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{t.label}</span>
                  {themeCounts[t.id] !== undefined && (
                    <span className="font-mono text-[10px] opacity-70">
                      ({themeCounts[t.id]})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search font or author..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-[8px] border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card"
              />
            </div>
          </div>

          {/* Subtheme Filter Chips (when a specific theme is active) */}
          {currentSubthemes.length > 0 && (
            <div className="pt-3 border-t border-border/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mr-1">
                Subthemes:
              </span>
              <button
                onClick={() => {
                  setSelectedSubtheme("all");
                }}
                className={`px-2.5 py-1 rounded-[6px] text-xs font-mono transition-colors ${
                  selectedSubtheme === "all"
                    ? "bg-foreground text-background font-medium"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                All {selectedTheme}
              </button>
              {currentSubthemes.map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setSelectedSubtheme(st);
                  }}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-mono whitespace-nowrap transition-colors ${
                    selectedSubtheme === st
                      ? "bg-foreground text-background font-medium"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}

          {/* Live Text Tester Deck */}
          <div className="pt-3 border-t border-border/60 flex items-center gap-3">
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type custom text to preview across all font specimens..."
                className="w-full h-10 pl-4 pr-20 rounded-[8px] border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card font-sans"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {sampleText.length} chars
                </span>
                {sampleText && (
                  <button
                    onClick={() => setSampleText("")}
                    className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Minimalist Font Specimen List with Generous Spacing */}
        <div className="divide-y divide-border rounded-[12px] border border-border bg-card overflow-hidden">
          {fonts.map((font) => {
            const siteOrigin =
              typeof window !== "undefined"
                ? window.location.origin
                : "https://liber-ui-delta.vercel.app";
            const liberCmd = `npx @liber-ui/cli add font-${font.slug}`;
            const cssImportSnippet = `@import url('${siteOrigin}/api/font-css/${font.slug}');\n\n/* Usage: font-family: '${font.name}', sans-serif; or class="font-${font.slug}" */`;
            const tailwindFontSnippet = `/* 1. In globals.css: @import url('${siteOrigin}/api/font-css/${font.slug}'); */\n/* 2. Use class="font-${font.slug}" or configure tailwind.config.js: */\nmodule.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        '${font.slug}': ['var(--font-${font.slug})', '${font.category || "sans-serif"}'],\n      },\n    },\n  },\n};`;
            const isCustomText = Boolean(
              debouncedSampleText && debouncedSampleText !== defaultSample && debouncedSampleText.trim()
            );
            const previewUrl = isCustomText
              ? getFontPreviewUrl(font, debouncedSampleText, 44)
              : (font.previewImg || "");

            return (
              <article
                key={font.slug}
                id={font.slug}
                className="p-6 sm:p-8 hover:bg-muted/15 transition-colors group space-y-4"
              >
                {/* Minimal Header: Title + Theme Tag + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/fonts/${font.slug}`}
                      className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{font.name}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </Link>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
                      {font.theme || "Basic"}
                      {font.subtheme ? ` · ${font.subtheme}` : ""}
                    </span>
                  </div>

                  {/* Actions: Download, CSS, Tailwind, CLI Command, View Details */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {font.downloadUrl && (
                      <a
                        href={font.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3 rounded-[8px] bg-primary text-primary-foreground hover:opacity-90 font-mono text-xs font-medium flex items-center gap-1.5 transition-opacity"
                        title={`Download ${font.name} (.zip)`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    )}

                    <button
                      onClick={(e) =>
                        copyToClipboard(
                          cssImportSnippet,
                          `Copied CSS @import for ${font.name}`,
                          `${font.slug}-css`,
                          e
                        )
                      }
                      className="h-8 px-2.5 rounded-[8px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground flex items-center gap-1.5 transition-colors"
                      title="Copy CSS @import stylesheet"
                    >
                      <Code2 className="h-3 w-3 text-muted-foreground" />
                      <span>CSS</span>
                      {copiedKey === `${font.slug}-css` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-60" />
                      )}
                    </button>

                    <button
                      onClick={(e) =>
                        copyToClipboard(
                          tailwindFontSnippet,
                          `Copied Tailwind config for ${font.name}`,
                          `${font.slug}-tw`,
                          e
                        )
                      }
                      className="h-8 px-2.5 rounded-[8px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground flex items-center gap-1.5 transition-colors"
                      title="Copy Tailwind CSS font snippet"
                    >
                      <Sparkles className="h-3 w-3 text-muted-foreground" />
                      <span>Tailwind</span>
                      {copiedKey === `${font.slug}-tw` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-60" />
                      )}
                    </button>

                    <button
                      onClick={(e) =>
                        copyToClipboard(
                          liberCmd,
                          `Copied CLI command for ${font.name}`,
                          `${font.slug}-liber`,
                          e
                        )
                      }
                      className="h-8 px-2.5 rounded-[8px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground flex items-center gap-1.5 transition-colors"
                      title="Copy Liber CLI command"
                    >
                      <Terminal className="h-3 w-3 text-muted-foreground" />
                      <span>liber add font-{font.slug}</span>
                      {copiedKey === `${font.slug}-liber` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-60" />
                      )}
                    </button>

                    <Link
                      href={`/fonts/${font.slug}`}
                      className="h-8 px-2.5 rounded-[8px] border border-border bg-card hover:bg-muted font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      title={`Inspect full alphabet and details for ${font.name}`}
                    >
                      <span>View Glyphs →</span>
                    </Link>
                  </div>
                </div>

                {/* Specimen Viewport: Clickable to navigate directly to font detail */}
                <Link
                  href={`/fonts/${font.slug}`}
                  className="block py-4 sm:py-6 overflow-x-hidden min-h-[5.5rem] flex items-center cursor-pointer"
                >
                  {previewUrl && !failedImages[font.slug] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={`${font.slug}-${sampleText}`}
                      src={previewUrl}
                      alt={`${font.name} typography preview`}
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [font.slug]: true }))
                      }
                      className="h-10 sm:h-12 w-auto max-w-full object-contain dark:invert select-none pointer-events-none"
                    />
                  ) : (
                    <p className="w-full text-foreground truncate select-none text-2xl sm:text-3xl font-sans">
                      {sampleText || defaultSample}
                    </p>
                  )}
                </Link>
              </article>
            );
          })}
        </div>

        {/* 5. Pagination / Load More */}
        {totalFiltered > fonts.length && (
          <div className="pt-6 flex flex-col items-center gap-2">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-6 py-2.5 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-mono text-foreground hover:text-primary transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <span>{isLoadingMore ? "Loading fonts..." : "Load more fonts"}</span>
              <span className="text-muted-foreground">
                ({totalFiltered - fonts.length} remaining)
              </span>
            </button>
            <span className="text-[11px] font-mono text-muted-foreground">
              Showing {fonts.length} of {totalFiltered} fonts
            </span>
          </div>
        )}

        {/* Empty State */}
        {fonts.length === 0 && (
          <div className="py-16 text-center space-y-3 rounded-[12px] border border-border bg-card">
            <p className="text-sm text-foreground font-medium">No fonts match your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDebouncedQuery("");
                setSelectedTheme("all");
                setSelectedSubtheme("all");
                setSelectedLetter("All");
              }}
              className="px-4 py-2 text-xs rounded-[10px] bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
