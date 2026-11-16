"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BASE_COMPONENTS,
  TOTAL_COMPONENTS_COUNT,
  type ComponentItem,
} from "@/lib/catalog-components-base";
import { ComponentLivePreview } from "@/components/ComponentLivePreview";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import {
  PACKAGE_MANAGERS,
  type PackageManager,
} from "@/lib/package-manager";

const PAGE_SIZE = 12;

export default function ComponentsPage({
  initialItems,
}: {
  initialItems?: ComponentItem[];
}) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pm, setPm] = useState<PackageManager>("pnpm");

  // Server-fetched paginated items
  const [items, setItems] = useState<ComponentItem[]>(() =>
    initialItems && initialItems.length > 0
      ? initialItems
      : BASE_COMPONENTS.slice(0, PAGE_SIZE)
  );
  const [totalFiltered, setTotalFiltered] = useState<number>(TOTAL_COMPONENTS_COUNT);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({
    all: TOTAL_COMPONENTS_COUNT,
    card: 227,
    form: 250,
    navbar: 229,
    button: 225,
    hero: 194,
    pricing: 131,
    grid: 100,
    profile: 97,
    "landing-page": 70,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch paginated components from server API
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          category: selectedCat,
          page: String(currentPage),
          limit: String(PAGE_SIZE),
        });
        const res = await fetch(`/api/components?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.components)) {
          setItems(data.components);
        }
        if (typeof data.totalFiltered === "number") {
          setTotalFiltered(data.totalFiltered);
        }
        if (data.categoryCounts) {
          setCategoryCounts(data.categoryCounts);
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          // Keep current items as fallback
        }
      } finally {
        setLoading(false);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, selectedCat, currentPage]);

  const categories = [
    { id: "all", label: "All Components", count: categoryCounts.all ?? TOTAL_COMPONENTS_COUNT },
    { id: "card", label: "Cards", count: categoryCounts.card ?? 0 },
    { id: "form", label: "Forms", count: categoryCounts.form ?? 0 },
    { id: "navbar", label: "Navbars & Menus", count: categoryCounts.navbar ?? 0 },
    { id: "button", label: "Buttons & CTA", count: categoryCounts.button ?? 0 },
    { id: "hero", label: "Hero & Banners", count: categoryCounts.hero ?? 0 },
    { id: "pricing", label: "Pricing", count: categoryCounts.pricing ?? 0 },
    { id: "grid", label: "Grids & Bento", count: categoryCounts.grid ?? 0 },
    { id: "profile", label: "Profiles & Authors", count: categoryCounts.profile ?? 0 },
    { id: "landing-page", label: "Landing Pages", count: categoryCounts["landing-page"] ?? 0 },
  ];

  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* 1. Breadcrumb & Top Bar */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Components</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              UI Components
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {TOTAL_COMPONENTS_COUNT.toLocaleString()} open-source UI components ready to use. Interactive live previews with instant React TSX and Tailwind CSS code export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 rounded-[10px] border border-border bg-card p-1">
              {PACKAGE_MANAGERS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPm(m)}
                  className={`px-2 py-1 font-mono text-[11px] rounded-[6px] transition-colors ${pm === m
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
              <span>{totalFiltered} Components</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search & Categories */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search components by name (e.g. card, hero, form, button, navbar, pricing, header)..."
              className="w-full h-11 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCat(c.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2.5 rounded-[8px] text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${selectedCat === c.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-[10px] opacity-70">({c.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Live Visual Component Cards Grid (Clean, Clickable, No buttons badge, Generous Spacing) */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 transition-opacity duration-200 ${loading ? "opacity-75" : "opacity-100"
          }`}
      >
        {items.map((item) => {
          const exactHtml =
            item.rawHtml ||
            `<div class="p-6">${item.description}</div>`;

          return (
            <Link
              key={item.slug}
              id={item.slug}
              href={`/components/${item.slug}`}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/35 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header: Clean Title + Arrow (No category/button badge clutter) */}
              <div className="px-5 py-4 border-b border-border/80 bg-muted/20 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>

              {/* Card Body: Live Visual Miniature Preview */}
              <div className="relative border-b border-border/80 overflow-hidden bg-slate-50 dark:bg-slate-950">
                <ComponentLivePreview
                  rawHtml={exactHtml}
                  title={item.name}
                  mode="thumbnail"
                />
              </div>

              {/* Card Footer: Short Description + Elegant "View component →" Link */}
              <div className="p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-xs bg-card">
                <p className="text-muted-foreground line-clamp-1 text-xs flex-1">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-1 font-medium text-xs text-foreground/80 group-hover:text-primary transition-colors shrink-0">
                  <span>View component</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 4. Pagination Controls (Clean whitespace without harsh divider line) */}
      {totalPages > 1 && (
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(currentPage * PAGE_SIZE, totalFiltered)} of {totalFiltered}{" "}
            available components
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 240, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 2
                ) {
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 240, behavior: "smooth" });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${currentPage === pageNum
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (Math.abs(pageNum - currentPage) === 3) {
                  return (
                    <span key={pageNum} className="px-1 text-xs text-muted-foreground">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 240, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
