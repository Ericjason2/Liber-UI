"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Eye } from "lucide-react";
import { SAMPLE_BLOCKS, type BlockItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

export default function BlocksPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Blocks", count: SAMPLE_BLOCKS.length },
    { id: "hero", label: "Hero", count: SAMPLE_BLOCKS.filter((b) => b.category === "hero").length },
    { id: "features", label: "Features", count: SAMPLE_BLOCKS.filter((b) => b.category === "features").length },
    { id: "pricing", label: "Pricing", count: SAMPLE_BLOCKS.filter((b) => b.category === "pricing").length },
    { id: "cta", label: "CTA", count: SAMPLE_BLOCKS.filter((b) => b.category === "cta").length },
  ];

  const filtered = selectedCat === "all"
    ? SAMPLE_BLOCKS
    : SAMPLE_BLOCKS.filter((b) => b.category === selectedCat);

  const handleCopy = (block: BlockItem) => {
    navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/${block.slug}.json`);
    setCopiedKey(block.slug);
    toast(`Copied ${block.name} install command`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Monospace Breadcrumb & Top Meta */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Blocks</span>
        </div>

        {/* Title Row & Viewport Control */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 pb-2 border-b border-border">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
              UI Blocks
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Full-section responsive page layouts built with standard Tailwind CSS and headless primitives.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center rounded-[10px] border border-border bg-card p-1 text-xs">
              {(["desktop", "tablet", "mobile"] as const).map((vp) => (
                <button
                  key={vp}
                  onClick={() => setViewport(vp)}
                  className={`px-3 py-1 font-medium rounded-[6px] capitalize transition-colors ${viewport === vp
                      ? "bg-muted font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {vp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${selectedCat === c.id
                ? "bg-primary text-primary-foreground font-semibold"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
          >
            <span>{c.label}</span>
            <span className="font-mono text-[10px] opacity-70">({c.count})</span>
          </button>
        ))}
      </div>

      {/* 3. 2-Column Grid of Block Cards (Stitch library_blocks_listing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((block) => (
          <article
            key={block.slug}
            id={block.slug}
            className="group rounded-[10px] border border-border bg-card overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between scroll-mt-20"
          >
            {/* 16:10 Thumbnail Wireframe Schematic */}
            <div className="aspect-[16/10] bg-muted/40 border-b border-border p-6 relative flex flex-col items-center justify-center overflow-hidden select-none">
              {/* Badge top right */}
              <div className="absolute top-3 right-3 font-mono text-[11px] text-muted-foreground bg-card px-2 py-0.5 rounded-[6px] border border-border">
                Next.js · Tailwind
              </div>

              {/* Wireframe Mockup */}
              <div className="w-full max-w-xs flex flex-col items-center text-center space-y-3">
                <div className="h-4 px-2 rounded-full bg-muted border border-border flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <div className="w-16 h-1.5 rounded bg-muted-foreground/40"></div>
                </div>

                <div className="space-y-1.5 w-full flex flex-col items-center">
                  <div className="w-48 h-3.5 bg-foreground/80 rounded"></div>
                  <div className="w-36 h-3 bg-foreground/60 rounded"></div>
                </div>

                <div className="space-y-1 w-full flex flex-col items-center pt-0.5">
                  <div className="w-56 h-2 bg-muted-foreground/30 rounded"></div>
                  <div className="w-40 h-2 bg-muted-foreground/20 rounded"></div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <div className="px-3 py-1 rounded bg-primary text-[10px] font-mono text-primary-foreground font-medium">
                    Get Started
                  </div>
                  <div className="px-3 py-1 rounded border border-border bg-card text-[10px] font-mono text-foreground">
                    Documentation
                  </div>
                </div>
              </div>

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleCopy(block)}
                  className="px-4 py-2 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Install Block</span>
                </button>
              </div>
            </div>

            {/* Card Info & Badges */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {block.slug}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">1.2 KB</span>
                </div>

                <h2 className="text-base font-semibold tracking-tight text-foreground mt-1">
                  {block.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {block.description}
                </p>
              </div>

              {/* Badges & Actions */}
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    Responsive
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    Dark mode
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(block)}
                  className="h-8 px-2.5 rounded-[6px] border border-border bg-muted hover:bg-muted/80 text-foreground text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === block.slug ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span>{copiedKey === block.slug ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
