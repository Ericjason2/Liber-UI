"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Check,
  Info,
  Download,
  Code2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { OFFICIAL_LOGOS, type LogoItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

type VariantType = "color" | "mono" | "wordmark";

const ALPHABET = [
  "All",
  "#",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export default function LogosPage() {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("All");
  const [variant, setVariant] = useState<VariantType>("color");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredLogos = useMemo(() => {
    return OFFICIAL_LOGOS.filter((logo) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        logo.name.toLowerCase().includes(q) ||
        logo.slug.toLowerCase().includes(q) ||
        logo.aliases.some((a) => a.toLowerCase().includes(q)) ||
        logo.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedLetter === "All") return true;

      const firstChar = logo.name.charAt(0).toUpperCase();
      if (selectedLetter === "#") {
        return !/[A-Z]/.test(firstChar);
      }

      return firstChar === selectedLetter;
    });
  }, [search, selectedLetter]);

  const handleCopySvg = async (logo: LogoItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const vKey = logo.variants?.[variant] ? variant : "color";
    try {
      const res = await fetch(`/svg/${logo.slug}/${vKey}.svg`);
      const svgText = await res.text();
      await navigator.clipboard.writeText(svgText);
      const key = `${logo.slug}-svg`;
      setCopiedKey(key);
      toast(`Copied ${logo.name} SVG`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast(`Failed to copy SVG`);
    }
  };

  const handleCopyJsx = (logo: LogoItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const componentSuffix =
      variant === "mono" ? "Mono" : variant === "wordmark" ? "Wordmark" : "Color";
    const componentName = `${toPascalCase(logo.slug)}${componentSuffix}`;
    const jsxSnippet = `<${componentName} size={28} />`;

    navigator.clipboard.writeText(jsxSnippet);
    const key = `${logo.slug}-jsx`;
    setCopiedKey(key);
    toast(`Copied JSX: ${jsxSnippet}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* 1. Breadcrumb & Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Logos</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 pb-4 border-b border-border">
          <div className="space-y-1 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
              Brand & Technology Logos
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official vector logos for UI/UX designers, front-end developers, and product creators.
              Free copy-paste SVG, React JSX components, and offline downloads.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <a
              href="/downloads/liber-svg-collection.zip"
              download="liber-svg-collection.zip"
              className="flex items-center gap-1.5 h-10 px-4 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download All SVGs (.zip)</span>
            </a>
            <div className="flex items-center gap-1.5 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
              <span className="font-medium">{filteredLogos.length} logos</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls Bar (Search + Variant Switcher) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-muted/40 rounded-xl border border-border">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all logos by name, alias, tool, or software..."
            className="w-full h-9 pl-9 pr-8 text-xs rounded-[8px] border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Variant Segmented Control */}
        <div className="inline-flex items-center p-1 rounded-[8px] border border-border bg-card">
          {(["color", "mono", "wordmark"] as VariantType[]).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-3 py-1 text-xs font-medium rounded-[6px] capitalize transition-colors ${
                variant === v
                  ? "bg-muted font-semibold text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "mono" ? "Monochrome" : v}
            </button>
          ))}
        </div>
      </div>

      {/* 3. A-Z Alphabetical Index Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`min-w-[28px] h-7 px-2 rounded-[6px] flex items-center justify-center transition-colors ${
              selectedLetter === letter
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* 4. Grid of Logo Tiles */}
      {filteredLogos.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border rounded-[10px] space-y-2">
          <p className="text-sm font-medium text-foreground">No logos found matching your search</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search keywords or reset the alphabetical filter.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedLetter("All");
            }}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLogos.map((logo) => {
            const hasRequestedVariant = !!(logo.variants && logo.variants[variant]);
            const currentVKey = hasRequestedVariant ? variant : "color";
            const svgKey = `${logo.slug}-svg`;
            const jsxKey = `${logo.slug}-jsx`;

            return (
              <div
                key={logo.slug}
                id={logo.slug}
                className="flex flex-col p-4 rounded-[10px] border border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group scroll-mt-20"
              >
                {/* Tile Top: 48x48 Icon Box + Detail Link */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-[10px] border border-border bg-muted/40 flex items-center justify-center p-2.5 group-hover:bg-card transition-colors">
                    {/* SVG preview */}
                    <img
                      src={`/svg/${logo.slug}/${currentVKey}.svg`}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <Link
                    href={`/logos/${logo.slug}`}
                    className="p-1 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title={`View ${logo.name} details & variants`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Name & Description */}
                <Link
                  href={`/logos/${logo.slug}`}
                  className="font-medium text-sm text-foreground hover:underline group/title line-clamp-1"
                >
                  {logo.name}
                </Link>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 mb-4">
                  {logo.description}
                </p>

                {/* Card Action Buttons (Direct 1-click SVG, JSX, & Download) */}
                <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-border">
                  <button
                    onClick={(e) => handleCopySvg(logo, e)}
                    className="flex-1 h-8 rounded-[6px] bg-muted hover:bg-muted/80 border border-border text-foreground font-mono text-xs transition-colors flex items-center justify-center gap-1"
                    type="button"
                    title="Copy SVG markup"
                  >
                    {copiedKey === svgKey ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span>{copiedKey === svgKey ? "Copied" : "SVG"}</span>
                  </button>

                  <button
                    onClick={(e) => handleCopyJsx(logo, e)}
                    className="flex-1 h-8 rounded-[6px] bg-muted hover:bg-muted/80 border border-border text-foreground font-mono text-xs transition-colors flex items-center justify-center gap-1"
                    type="button"
                    title="Copy React JSX component"
                  >
                    {copiedKey === jsxKey ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span>{copiedKey === jsxKey ? "Copied" : "JSX"}</span>
                  </button>

                  <a
                    href={`/svg/${logo.slug}/${currentVKey}.svg`}
                    download={`${logo.slug}-${currentVKey}.svg`}
                    className="h-8 px-2 rounded-[6px] bg-muted hover:bg-muted/80 border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                    title="Download SVG file"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Bottom Trademark Notice */}
      <div className="flex items-start gap-3 p-4 rounded-[10px] border border-border bg-muted/40 text-xs text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
        <p className="leading-relaxed">
          Logos are registered trademarks of their respective owners. Use them exclusively for nominative reference (identifying tech stacks, portfolios, partner listings) in accordance with each organization&apos;s official brand guidelines.
        </p>
      </div>
    </div>
  );
}
