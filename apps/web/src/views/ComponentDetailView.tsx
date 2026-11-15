"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { ComponentItem } from "@/lib/catalog-components-base";
import { ComponentLivePreview } from "@/components/ComponentLivePreview";
import {
  ArrowLeft,
  Check,
  Copy,
  Code2,
  ExternalLink,
  Eye,
  Laptop,
  Moon,
  Smartphone,
  Sun,
  Tablet,
  Terminal,
  User,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  PACKAGE_MANAGERS,
  getCliCommand,
  type PackageManager,
} from "@/lib/package-manager";

interface ComponentDetailViewProps {
  component: ComponentItem;
  relatedComponents: ComponentItem[];
}

export default function ComponentDetailView({
  component,
  relatedComponents,
}: ComponentDetailViewProps) {
  const { toast } = useToast();
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [activeTab, setActiveTab] = useState<"split" | "preview" | "html" | "tsx">("split");
  const [codeTab, setCodeTab] = useState<"html" | "tsx">("html");
  const [viewport, setViewport] = useState<"100%" | "768px" | "375px">("100%");
  const [previewDark, setPreviewDark] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<"cmd" | "html" | "tsx" | null>(null);

  const exactHtml =
    component.rawHtml ||
    `<!-- ${component.name} -->\n<div class="p-6">\n  ${component.description}\n</div>`;

  const cliCommand = getCliCommand(pm, `add ${component.slug}`);

  const handleCopy = (text: string, type: "cmd" | "html" | "tsx", label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* 1. Top Breadcrumb & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-sans font-medium mr-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Tous les composants</span>
          </Link>
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[260px]">
            {component.name}
          </span>
        </div>

        {/* Package Manager & Quick CLI Install */}
        <div className="flex flex-wrap items-center gap-2">
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

          <button
            type="button"
            onClick={() =>
              handleCopy(cliCommand, "cmd", `Commande ${pm} copiée pour ${component.name}`)
            }
            className="inline-flex items-center gap-2 px-3.5 h-9 rounded-[10px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground transition-colors"
          >
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="truncate max-w-[240px]">{cliCommand}</span>
            {copiedType === "cmd" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Component Header, Creator Attribution & Tags */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-primary/10 text-primary border border-primary/20 capitalize font-medium">
                {component.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-muted text-muted-foreground border border-border">
                Licence {component.license}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-muted text-muted-foreground border border-border">
                Slug: {component.slug}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {component.name}
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {component.description}
            </p>
          </div>

          {/* Creator Attribution Box */}
          <div className="shrink-0 rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 min-w-[260px]">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Créateur du composant :</span>
              {component.authorUrl ? (
                <a
                  href={component.authorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-semibold text-foreground hover:text-primary hover:underline transition-colors"
                >
                  {component.author}
                </a>
              ) : (
                <span className="font-mono font-semibold text-foreground">
                  {component.author}
                </span>
              )}
            </div>

            {component.mention && (
              <div className="text-[11px] font-mono text-muted-foreground bg-card px-2.5 py-1.5 rounded-lg border border-border">
                {component.mention}
              </div>
            )}

            {component.sourceUrl && (
              <a
                href={component.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline pt-0.5"
              >
                <span>Voir la publication originale sur TailwindFlex</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        {component.tags && component.tags.length > 0 && (
          <div className="pt-3 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground mr-1">Tags :</span>
            {component.tags.map((tag) => (
              <Link
                key={tag}
                href={`/components?tag=${encodeURIComponent(tag)}`}
                className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted/70 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 3. Interactive Preview & Code Studio Toolbar */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="px-4 sm:px-6 py-3.5 border-b border-border bg-muted/40 flex flex-wrap items-center justify-between gap-3">
          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setActiveTab("split")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "split"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Prévisualisation &amp; Code</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Aperçu Plein Écran</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("html");
                setCodeTab("html");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "html"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code HTML exact</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("tsx");
                setCodeTab("tsx");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "tsx"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Code React (TSX)</span>
            </button>
          </div>

          {/* Viewport & Theme Controls + Quick Copy */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Responsive Viewport Buttons */}
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setViewport("100%")}
                title="Vue Desktop (100%)"
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewport === "100%"
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>100%</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("768px")}
                title="Vue Tablette (768px)"
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewport === "768px"
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Tablet className="h-3.5 w-3.5" />
                <span>768px</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("375px")}
                title="Vue Mobile (375px)"
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewport === "375px"
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>375px</span>
              </button>
            </div>

            {/* Dark / Light Preview Toggle */}
            <button
              type="button"
              onClick={() => setPreviewDark((d) => !d)}
              className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors"
              title="Basculer le thème Clair / Sombre de la prévisualisation"
            >
              {previewDark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Aperçu Clair</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-slate-500" />
                  <span>Aperçu Sombre</span>
                </>
              )}
            </button>

            {/* Quick Copy Exact HTML */}
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  exactHtml,
                  "html",
                  "Code HTML exact copié dans le presse-papiers !"
                )
              }
              className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-medium flex items-center gap-1.5 transition-opacity shadow-sm"
            >
              {copiedType === "html" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>Copier HTML exact</span>
            </button>
          </div>
        </div>

        {/* Live Visual Preview Canvas */}
        {(activeTab === "split" || activeTab === "preview") && (
          <div className="border-b border-border">
            <ComponentLivePreview
              rawHtml={exactHtml}
              title={component.name}
              mode="full"
              darkMode={previewDark}
              viewportWidth={viewport}
              minHeight={activeTab === "preview" ? 680 : 540}
            />
          </div>
        )}

        {/* Code Viewer Section (Exact HTML & React TSX) */}
        {(activeTab === "split" || activeTab === "html" || activeTab === "tsx") && (
          <div className="bg-neutral-950 text-neutral-100">
            {/* Code Header Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCodeTab("html")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    (activeTab === "html" || (activeTab === "split" && codeTab === "html"))
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                  }`}
                >
                  HTML Exact (Original TailwindFlex)
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("tsx")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    (activeTab === "tsx" || (activeTab === "split" && codeTab === "tsx"))
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                  }`}
                >
                  React / Next.js ({component.slug}.tsx)
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      exactHtml,
                      "html",
                      "Code HTML exact copié dans le presse-papiers !"
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedType === "html" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                  <span>Copier le code HTML exact</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      component.code,
                      "tsx",
                      "Code React TSX copié dans le presse-papiers !"
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedType === "tsx" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                  <span>Copier le code React TSX</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 sm:p-6 overflow-x-auto">
              {(activeTab === "html" || (activeTab === "split" && codeTab === "html")) ? (
                <pre className="font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed select-all max-h-[600px] overflow-y-auto">
                  <code>{`<!-- ${component.mention || `Créé par ${component.author} sur TailwindFlex`}${
                    component.sourceUrl ? ` (${component.sourceUrl})` : ""
                  } -->\n${exactHtml}`}</code>
                </pre>
              ) : (
                <pre className="font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed select-all max-h-[600px] overflow-y-auto">
                  <code>{component.code}</code>
                </pre>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. Related Components Grid */}
      {relatedComponents.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Composants similaires
              </h2>
              <p className="text-xs text-muted-foreground">
                Cliquez sur un composant pour ouvrir sa prévisualisation interactive et son code exact.
              </p>
            </div>
            <Link
              href="/components"
              className="text-xs font-mono text-primary hover:underline"
            >
              Voir tout le catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedComponents.map((rel) => (
              <Link
                key={rel.slug}
                href={`/components/${rel.slug}`}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="relative border-b border-border overflow-hidden">
                  <ComponentLivePreview
                    rawHtml={rel.rawHtml || ""}
                    title={rel.name}
                    mode="thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-md">
                      Ouvrir l&apos;aperçu &amp; le code →
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {rel.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize shrink-0">
                      {rel.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>Par {rel.author}</span>
                    <span>#{rel.tags[0] || "ui"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

