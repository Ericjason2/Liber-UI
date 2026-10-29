"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Check, Info, Terminal, Code, ArrowUpRight, Download } from "lucide-react";
import { OFFICIAL_LOGOS, type LogoItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

type VariantType = "color" | "mono" | "wordmark";
type CategoryType = "all" | "languages" | "frontend" | "backend" | "devops" | "tools";

export default function LogosPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [variant, setVariant] = useState<VariantType>("color");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "devops", label: "Cloud & DevOps" },
    { id: "tools", label: "Tools" },
  ];

  const filteredLogos = useMemo(() => {
    return OFFICIAL_LOGOS.filter((logo) => {
      const matchesSearch =
        logo.name.toLowerCase().includes(search.toLowerCase()) ||
        logo.aliases.some((a) => a.toLowerCase().includes(search.toLowerCase())) ||
        logo.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === "all" || logo.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

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

  const handleCopyCli = (logo: LogoItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cmd = `pnpm dlx shadcn add https://liber.dev/r/${logo.slug}.json`;
    navigator.clipboard.writeText(cmd);
    const key = `${logo.slug}-cli`;
    setCopiedKey(key);
    toast(`Copied CLI install for ${logo.name}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Monospace Breadcrumb & Top Meta */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Logos</span>
        </div>

        {/* Title Row & Counter Pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 pb-4 border-b border-border">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
              Logos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Official technology logos in SVG, with color and monochrome variants.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <a
              href="/downloads/liber-svg-collection.zip"
              download="liber-svg-collection.zip"
              className="flex items-center gap-1.5 h-10 px-3.5 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download All (.zip)</span>
            </a>
            <div className="flex items-center gap-1.5 font-mono text-xs text-foreground bg-muted border border-border px-3 h-10 rounded-[10px]">
              <span className="font-medium">{filteredLogos.length} logos</span>
              <span className="text-muted-foreground">· v1.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls Bar (Search + Variant Segmented Control) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-muted/40 rounded-xl border border-border">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logos by name, alias or tag..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-[10px] border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Variant Segmented Control */}
        <div className="inline-flex items-center p-1 rounded-[10px] border border-border bg-card">
          {(["color", "mono", "wordmark"] as VariantType[]).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-3 py-1 text-xs font-medium rounded-[6px] capitalize transition-colors ${variant === v
                ? "bg-muted font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id
              ? "bg-primary text-primary-foreground font-semibold"
              : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. Grid of Logo Tiles (Faithful to Stitch library_logos_listing_directory) */}
      {filteredLogos.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border rounded-[10px] space-y-2">
          <p className="text-sm font-medium text-foreground">No logo matches your filter</p>
          <p className="text-xs text-muted-foreground">Try clearing your search query or selecting another category.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLogos.map((logo) => {
            const hasRequestedVariant = !!(logo.variants && logo.variants[variant]);
            const currentVKey = hasRequestedVariant ? variant : "color";
            const svgKey = `${logo.slug}-svg`;
            const cliKey = `${logo.slug}-cli`;

            return (
              <div
                key={logo.slug}
                id={logo.slug}
                className="flex flex-col p-4 rounded-[10px] border border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group scroll-mt-20"
              >
                {/* Tile Top: 48x48 Icon Box + Category Badge */}
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

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground capitalize">
                    {logo.category}
                  </span>
                </div>

                {/* Name & Description */}
                <Link
                  href={`/logos/${logo.slug}`}
                  className="font-medium text-sm text-foreground hover:underline flex items-center gap-1 group/title"
                >
                  <span>{logo.name}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                </Link>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 mb-4">
                  {logo.description}
                </p>

                {/* Card Action Buttons (Direct 1-click SVG + CLI) */}
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
                  <button
                    onClick={(e) => handleCopySvg(logo, e)}
                    className="flex-1 h-8 rounded-[6px] bg-muted border border-border/80 text-foreground font-mono text-xs hover:bg-muted/80 transition-colors flex items-center justify-center gap-1.5"
                    type="button"
                  >
                    {copiedKey === svgKey ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Code className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span>{copiedKey === svgKey ? "Copied" : "SVG"}</span>
                  </button>

                  <button
                    onClick={(e) => handleCopyCli(logo, e)}
                    className="h-8 px-2.5 rounded-[6px] bg-muted border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center"
                    title="Copy shadcn add command"
                    type="button"
                  >
                    {copiedKey === cliKey ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Terminal className="h-3.5 w-3.5" />
                    )}
                  </button>
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
          Logos are trademarks of their respective owners. Use them strictly to refer to the brand in technology stacks, portfolio showcases, and partner listings in compliance with each organization&apos;s official brand guidelines.
        </p>
      </div>
    </div>
  );
}
