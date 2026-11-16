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
  Download,
  Terminal,
  Search,
  Code2,
  Eye,
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
    Record<string, "preview" | "tsx" | "html">
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
    }, 60);

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

  const handleDownloadComponent = (c: ComponentItem) => {
    const blob = new Blob([c.code], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${c.slug}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`Fichier ${c.slug}.tsx téléchargé !`);
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
              UI Components
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {TOTAL_COMPONENTS_COUNT.toLocaleString()} composants open-source prêts à l&apos;emploi. Prévisualisez chaque composant en direct, installez-le via CLI ou téléchargez directement son fichier source <code className="font-mono text-xs text-foreground">components/ui/&lt;nom&gt;.tsx</code>.
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
              <span>{totalFiltered} Composants</span>
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
              placeholder="Rechercher un composant par tag ou nom (ex: card, hero, form, button, navbar, pricing, header)..."
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

        {/* Tag Cloud Pills Bar */}
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
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
          loading ? "opacity-75" : "opacity-100"
        }`}
      >
        {items.map((item) => {
          const currentMode = componentModes[item.slug] || "preview";
          const isCopied = copiedKey === item.slug;
          const exactHtml =
            item.rawHtml ||
            `<div class="p-6">${item.description}</div>`;

          return (
            <article
              key={item.slug}
              id={item.slug}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all scroll-mt-20 flex flex-col justify-between shadow-sm"
            >
              {/* Card Header Bar */}
              <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between gap-2">
                <Link
                  href={`/components/${item.slug}`}
                  className="font-semibold text-sm text-foreground hover:text-primary transition-colors truncate"
                >
                  {item.name}
                </Link>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Inline Preview / Code Switcher */}
                  <div className="flex items-center rounded-md border border-border bg-card p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        setComponentModes((prev) => ({
                          ...prev,
                          [item.slug]: "preview",
                        }))
                      }
                      className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
                        currentMode === "preview"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setComponentModes((prev) => ({
                          ...prev,
                          [item.slug]: "tsx",
                        }))
                      }
                      className={`px-2 py-0.5 rounded font-medium transition-colors flex items-center gap-1 ${
                        currentMode === "tsx"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Code2 className="h-3 w-3" />
                      <span>Code</span>
                    </button>
                  </div>

                  {/* Direct Download .tsx */}
                  <button
                    type="button"
                    onClick={() => handleDownloadComponent(item)}
                    title={`Télécharger ${item.slug}.tsx`}
                    className="p-1.5 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
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
                  <div className="absolute inset-0 bg-slate-950/0 group-hover/preview:bg-slate-950/30 transition-colors flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Ouvrir la prévisualisation &amp; le code</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="p-3.5 bg-neutral-950 font-mono text-xs overflow-x-auto border-b border-border h-[250px] flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400 text-[11px] mb-2 gap-2 shrink-0">
                    <span className="font-semibold text-neutral-200 truncate">
                      components/ui/{item.slug}.tsx
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(item.code);
                        toast("Code copié !");
                      }}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white transition-colors text-[10px] shrink-0"
                    >
                      Copier
                    </button>
                  </div>
                  <pre className="text-neutral-200 select-all leading-relaxed overflow-y-auto flex-1 text-[11px]">
                    <code>{item.code}</code>
                  </pre>
                </div>
              )}

              {/* Card Footer: Tags & Open / CLI Buttons */}
              <div className="p-3.5 flex items-center justify-between gap-2 text-xs bg-card">
                <div className="flex flex-wrap items-center gap-1 min-w-0 overflow-hidden">
                  {item.tags.slice(0, 3).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedTag(t);
                        setCurrentPage(1);
                      }}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/70 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors truncate"
                    >
                      #{t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyCmd(item)}
                    title={`Copier la commande CLI pour ${item.name}`}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-muted/40 hover:bg-muted text-foreground font-mono text-[11px] whitespace-nowrap transition-colors"
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
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 font-medium text-[11px] whitespace-nowrap transition-opacity shadow-sm"
                  >
                    <span>Ouvrir</span>
                    <ArrowUpRight className="h-3 w-3" />
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
