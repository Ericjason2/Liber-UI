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
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  Search,
  Code2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  PACKAGE_MANAGERS,
  getCliCommand,
  type PackageManager,
} from "@/lib/package-manager";

const PAGE_SIZE = 12;

const FEATURED_TAGS: Array<{ tag: string; count: number }> = [
  { tag: "card", count: 503 },
  { tag: "hero", count: 285 },
  { tag: "form", count: 252 },
  { tag: "button", count: 213 },
  { tag: "grid", count: 212 },
  { tag: "call-to-action", count: 157 },
  { tag: "navbar", count: 143 },
  { tag: "landing-page", count: 142 },
  { tag: "profile", count: 139 },
  { tag: "pricing", count: 136 },
  { tag: "header", count: 130 },
];

export default function ComponentsPage({
  initialItems,
}: {
  initialItems?: ComponentItem[];
}) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("tag") || "all";
    }
    return "all";
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [componentModes, setComponentModes] = useState<
    Record<string, "preview" | "html" | "tsx">
  >({});
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
    buttons: 201,
    inputs: 233,
    "data-display": 1072,
    feedback: 19,
  });
  const [availableTags, setAvailableTags] =
    useState<Array<{ tag: string; count: number }>>(FEATURED_TAGS);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  // Fetch paginated components from server API
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          category: selectedCat,
          tag: selectedTag,
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
        if (Array.isArray(data.availableTags) && data.availableTags.length > 0) {
          setAvailableTags(data.availableTags);
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          // Keep current items as fallback
        }
      } finally {
        setLoading(false);
      }
    }, 80);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, selectedCat, selectedTag, currentPage]);

  const categories = [
    { id: "all", label: "Tous les composants", count: categoryCounts.all ?? TOTAL_COMPONENTS_COUNT },
    { id: "data-display", label: "Cards, Hero, Navbar & Layouts", count: categoryCounts["data-display"] ?? 1072 },
    { id: "inputs", label: "Formulaires & Inputs", count: categoryCounts.inputs ?? 233 },
    { id: "buttons", label: "Boutons & CTA", count: categoryCounts.buttons ?? 201 },
    { id: "feedback", label: "Alertes & Feedback", count: categoryCounts.feedback ?? 19 },
  ];

  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));

  const handleCopyCmd = (c: ComponentItem) => {
    navigator.clipboard.writeText(getCliCommand(pm, `add ${c.slug}`));
    setCopiedKey(c.slug);
    toast(`Commande ${pm} copiée pour ${c.name}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* 1. Breadcrumb & Top Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Components</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              UI Components &amp; TailwindFlex Library
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Explorez {TOTAL_COMPONENTS_COUNT.toLocaleString()} composants gratuits avec prévisualisation visuelle en direct, mention du créateur, code HTML exact d&apos;origine et composant React TSX. Cliquez sur un composant pour ouvrir sa page dédiée.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 rounded-[10px] border border-border bg-card p-1">
              {PACKAGE_MANAGERS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPm(m)}
                  className={`px-2 py-1 font-mono text-[11px] rounded-[6px] transition-colors ${
                    pm === m
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
              <span>{totalFiltered} Composants disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search, Categories & Tag Cloud */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Rechercher par tag, titre, créateur ou slug (ex: card, hero, form, navbar, pricing, @samuel)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCat(c.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-[8px] text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCat === c.id
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-[10px] opacity-70">({c.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tag Cloud Pills Bar (All scraped TailwindFlex tags) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedTag("all");
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors whitespace-nowrap flex items-center gap-1 ${
              selectedTag === "all"
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            <span>Tous les tags</span>
          </button>
          {availableTags.slice(0, 32).map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(selectedTag === tag ? "all" : tag);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors whitespace-nowrap flex items-center gap-1 ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>#{tag}</span>
              <span className="text-[9px] opacity-75">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Live Visual Component Cards Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-7 transition-opacity duration-200 ${
          loading ? "opacity-75" : "opacity-100"
        }`}
      >
        {items.map((item) => {
          const currentMode = componentModes[item.slug] || "preview";
          const isCopied = copiedKey === item.slug;
          const exactHtml =
            item.rawHtml ||
            `<!-- ${item.name} -->\n<div class="p-6">${item.description}</div>`;

          return (
            <article
              key={item.slug}
              id={item.slug}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all scroll-mt-20 flex flex-col justify-between shadow-sm"
            >
              {/* Card Header Bar */}
              <div className="px-4 sm:px-5 py-3 border-b border-border bg-muted/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Link
                    href={`/components/${item.slug}`}
                    className="font-semibold text-sm text-foreground hover:text-primary transition-colors truncate"
                  >
                    {item.name}
                  </Link>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border capitalize shrink-0">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Inline Preview / HTML / TSX Switcher */}
                  <div className="flex items-center rounded-lg border border-border bg-card p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        setComponentModes((prev) => ({
                          ...prev,
                          [item.slug]: "preview",
                        }))
                      }
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                        currentMode === "preview"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Aperçu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setComponentModes((prev) => ({
                          ...prev,
                          [item.slug]: "html",
                        }))
                      }
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                        currentMode === "html"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Code2 className="h-3 w-3" />
                      <span>HTML</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setComponentModes((prev) => ({
                          ...prev,
                          [item.slug]: "tsx",
                        }))
                      }
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                        currentMode === "tsx"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      TSX
                    </button>
                  </div>

                  {/* Open Full Detail Page */}
                  <Link
                    href={`/components/${item.slug}`}
                    title={`Ouvrir ${item.name} en plein écran avec le code`}
                    className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card Body: Live Visual Miniature Preview OR Inline Code */}
              {currentMode === "preview" ? (
                <Link
                  href={`/components/${item.slug}`}
                  className="relative block border-b border-border overflow-hidden group/preview"
                >
                  <ComponentLivePreview
                    rawHtml={exactHtml}
                    title={item.name}
                    mode="thumbnail"
                  />

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/0 group-hover/preview:bg-slate-950/35 transition-colors flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg transform translate-y-1 group-hover/preview:translate-y-0 transition-all">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Voir la prévisualisation &amp; le code exact</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="p-4 bg-neutral-950 font-mono text-xs overflow-x-auto border-b border-border h-[260px] flex flex-col">
                  <div className="flex flex-wrap items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400 text-[11px] mb-2 gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-200">
                        {currentMode === "html"
                          ? `${item.slug}.html (Exact Original)`
                          : `${item.slug}.tsx`}
                      </span>
                      {item.mention && (
                        <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          {item.mention}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            currentMode === "html" ? exactHtml : item.code
                          );
                          toast(
                            currentMode === "html"
                              ? "Code HTML exact copié !"
                              : "Code React TSX copié !"
                          );
                        }}
                        className="px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white transition-colors text-[10px]"
                      >
                        Copier {currentMode === "html" ? "HTML exact" : "TSX"}
                      </button>
                    </div>
                  </div>
                  <pre className="text-neutral-200 select-all leading-relaxed overflow-y-auto flex-1">
                    <code>{currentMode === "html" ? exactHtml : item.code}</code>
                  </pre>
                </div>
              )}

              {/* Card Footer: Creator Attribution, Tags & Open / CLI Buttons */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-card">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.author && (
                      <span className="text-[11px] text-muted-foreground font-mono">
                        Créé par{" "}
                        <a
                          href={item.authorUrl || `https://tailwindflex.com/${item.author}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-foreground font-semibold hover:text-primary hover:underline"
                        >
                          {item.author}
                        </a>
                      </span>
                    )}
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-0.5 text-[10px] font-mono text-primary/80 hover:underline"
                      >
                        <span>TailwindFlex</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.slice(0, 5).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedTag(t);
                          setCurrentPage(1);
                        }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted/70 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyCmd(item)}
                    title={`Copier la commande CLI pour ${item.name}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-foreground font-mono text-[11px] whitespace-nowrap transition-colors"
                  >
                    <Terminal className="h-3 w-3 text-muted-foreground" />
                    <span>add</span>
                    {isCopied ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>

                  <Link
                    href={`/components/${item.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 font-medium text-xs whitespace-nowrap transition-opacity shadow-sm"
                  >
                    <span>Aperçu &amp; Code</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            Affichage de {(currentPage - 1) * PAGE_SIZE + 1} à{" "}
            {Math.min(currentPage * PAGE_SIZE, totalFiltered)} sur {totalFiltered}{" "}
            composants disponibles
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 260, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
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
                        window.scrollTo({ top: 260, behavior: "smooth" });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                        currentPage === pageNum
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
                window.scrollTo({ top: 260, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
