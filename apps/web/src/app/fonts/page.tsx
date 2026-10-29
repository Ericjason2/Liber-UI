"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Terminal,
  RotateCcw,
  Search,
  Code2,
  Type,
  FolderCode,
  FileCode,
  Layers,
  Sparkles,
} from "lucide-react";
import { SAMPLE_FONTS } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

// Open-source stylesheet URL covering the curated open-license fonts for real glyph rendering in tester
const OPEN_FONTS_CATALOG_HREF =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@400;600&family=DM+Sans:wght@400;500;700&family=Fira+Code:wght@400;500;700&family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Lato:wght@400;700&family=Lora:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700&family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Oswald:wght@400;600;700&family=PT+Serif:wght@400;700&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&family=Poppins:wght@400;600;700&family=Roboto+Mono:wght@400;500;700&family=Roboto:wght@400;500;700&family=Source+Code+Pro:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@500;700;800&display=swap";

export default function FontsPage() {
  const defaultSample = "The quick brown fox jumps over the lazy dog";
  const [sampleText, setSampleText] = useState(defaultSample);
  const [fontSize, setFontSize] = useState(36);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeGuideTab, setActiveGuideTab] = useState<"fonts" | "logos">("fonts");
  const [fontConfigTab, setFontConfigTab] = useState<"next" | "css" | "fontsource">("next");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = useMemo(() => {
    return [
      { id: "all", label: "All Fonts", count: SAMPLE_FONTS.length },
      { id: "sans", label: "Sans-Serif", count: SAMPLE_FONTS.filter((f) => f.category === "sans").length },
      { id: "serif", label: "Serif", count: SAMPLE_FONTS.filter((f) => f.category === "serif").length },
      { id: "mono", label: "Monospace", count: SAMPLE_FONTS.filter((f) => f.category === "mono").length },
      { id: "display", label: "Display", count: SAMPLE_FONTS.filter((f) => f.category === "display").length },
    ];
  }, []);

  const filtered = useMemo(() => {
    return SAMPLE_FONTS.filter((font) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        font.name.toLowerCase().includes(q) ||
        font.description.toLowerCase().includes(q) ||
        font.slug.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || font.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      {/* Inject open web fonts stylesheet for live glyph rendering in specimen tester */}
      <link rel="stylesheet" href={OPEN_FONTS_CATALOG_HREF} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* 1. Monospace Breadcrumb & Top Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
            <Link href="/" className="hover:text-foreground transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Fonts & Assets</span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-muted border border-border text-muted-foreground">
              Open Source Typographies · SIL OFL & Apache 2.0
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Typography & Font System
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Curated open-license typographies available for 100% free commercial and personal use.
                Self-hostable locally with zero third-party tracking, native Next.js font optimization, and Tailwind CSS.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  setSampleText(defaultSample);
                  setFontSize(36);
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="h-10 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
                <Type className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">{filtered.length} fonts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Self-Hosting Developer Architecture Guide (Fonts & Logos) */}
        <div className="rounded-[10px] border border-border bg-card overflow-hidden">
          <div className="border-b border-border bg-muted/40 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FolderCode className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                Self-Hosting Developer Guide
              </span>
            </div>

            <div className="flex items-center rounded-[8px] border border-border bg-card p-0.5 text-xs">
              <button
                onClick={() => setActiveGuideTab("fonts")}
                className={`px-3 py-1 rounded-[6px] font-medium transition-colors ${
                  activeGuideTab === "fonts"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Fonts Storage & Setup
              </button>
              <button
                onClick={() => setActiveGuideTab("logos")}
                className={`px-3 py-1 rounded-[6px] font-medium transition-colors ${
                  activeGuideTab === "logos"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Logos Storage & Formats
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {activeGuideTab === "fonts" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-[8px] border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                      <FolderCode className="h-3.5 w-3.5 text-blue-500" />
                      <span>Dossier de destination</span>
                    </div>
                    <code className="block font-mono text-xs text-primary bg-card px-2.5 py-1.5 rounded-[6px] border border-border select-all">
                      public/fonts/&lt;slug&gt;/
                    </code>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Ex: <span className="font-mono text-foreground">public/fonts/inter/Inter-Regular.woff2</span> ou <span className="font-mono text-foreground">public/fonts/geist/Geist-Variable.woff2</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-[8px] border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                      <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Formats recommandés</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                        .woff2
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        .woff
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      WOFF2 offre une compression gzip/brotli native jusqu'à 30% plus légère que le TTF standard.
                    </p>
                  </div>

                  <div className="p-4 rounded-[8px] border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                      <span>Téléchargement sans serveur</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Téléchargez les archives <span className="font-mono text-foreground">.woff2</span> depuis les dépôts officiels des fonderies ou installez le package <span className="font-mono text-foreground">@fontsource/&lt;nom&gt;</span>.
                    </p>
                  </div>
                </div>

                {/* Configuration Code Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span>Configuration de la police dans votre projet :</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setFontConfigTab("next")}
                        className={`px-2.5 py-1 text-xs font-mono rounded-[6px] transition-colors ${
                          fontConfigTab === "next"
                            ? "bg-muted text-foreground font-semibold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Next.js localFont
                      </button>
                      <button
                        onClick={() => setFontConfigTab("css")}
                        className={`px-2.5 py-1 text-xs font-mono rounded-[6px] transition-colors ${
                          fontConfigTab === "css"
                            ? "bg-muted text-foreground font-semibold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        CSS @font-face
                      </button>
                      <button
                        onClick={() => setFontConfigTab("fontsource")}
                        className={`px-2.5 py-1 text-xs font-mono rounded-[6px] transition-colors ${
                          fontConfigTab === "fontsource"
                            ? "bg-muted text-foreground font-semibold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        npm @fontsource
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-border bg-muted/30 p-4 font-mono text-xs relative group">
                    {fontConfigTab === "next" && (
                      <pre className="text-foreground overflow-x-auto leading-relaxed">
{`// app/fonts.ts
import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});`}
                      </pre>
                    )}

                    {fontConfigTab === "css" && (
                      <pre className="text-foreground overflow-x-auto leading-relaxed">
{`/* styles/globals.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}`}
                      </pre>
                    )}

                    {fontConfigTab === "fontsource" && (
                      <pre className="text-foreground overflow-x-auto leading-relaxed">
{`# 1. Installer le package fontsource de la police
pnpm add @fontsource/inter

# 2. Importer les graisses requises dans app/layout.tsx
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";`}
                      </pre>
                    )}

                    <button
                      onClick={() =>
                        copyToClipboard(
                          fontConfigTab === "next"
                            ? `import localFont from "next/font/local";\n\nexport const fontSans = localFont({\n  src: [\n    { path: "../public/fonts/inter/Inter-Regular.woff2", weight: "400", style: "normal" },\n    { path: "../public/fonts/inter/Inter-Bold.woff2", weight: "700", style: "normal" },\n  ],\n  variable: "--font-sans",\n  display: "swap",\n});`
                            : fontConfigTab === "css"
                            ? `@font-face {\n  font-family: 'Inter';\n  src: url('/fonts/inter/Inter-Regular.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}`
                            : `pnpm add @fontsource/inter\nimport "@fontsource/inter/400.css";\nimport "@fontsource/inter/700.css";`,
                          "Snippet copié",
                          "guide-font-code"
                        )
                      }
                      className="absolute top-3 right-3 p-1.5 rounded-[6px] bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
                      title="Copier le snippet"
                    >
                      {copiedKey === "guide-font-code" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[8px] border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                      <FolderCode className="h-3.5 w-3.5 text-blue-500" />
                      <span>Emplacement dans votre projet</span>
                    </div>
                    <code className="block font-mono text-xs text-primary bg-card px-2.5 py-1.5 rounded-[6px] border border-border select-all">
                      public/svg/&lt;slug&gt;/
                    </code>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Exemple : <span className="font-mono text-foreground">public/svg/docker/color.svg</span> ou <span className="font-mono text-foreground">public/svg/github/mono.svg</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-[8px] border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                      <Layers className="h-3.5 w-3.5 text-purple-500" />
                      <span>Emplacement dans la librairie Liber (Contribution)</span>
                    </div>
                    <code className="block font-mono text-xs text-primary bg-card px-2.5 py-1.5 rounded-[6px] border border-border select-all">
                      content/logos/&lt;slug&gt;/
                    </code>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Chaque marque dispose d'un dossier dédié validé par le schéma Zod.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-semibold text-foreground">
                    Fichiers obligatoires par logo dans <code className="bg-muted px-1.5 py-0.5 rounded">content/logos/&lt;slug&gt;/</code> :
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-[8px] border border-border bg-card space-y-1">
                      <span className="font-mono font-bold text-foreground">color.svg</span>
                      <p className="text-[11px] text-muted-foreground">
                        Vecteur officiel en couleurs exactes de la charte de marque.
                      </p>
                    </div>

                    <div className="p-3 rounded-[8px] border border-border bg-card space-y-1">
                      <span className="font-mono font-bold text-foreground">mono.svg</span>
                      <p className="text-[11px] text-muted-foreground">
                        Variante monochrome avec <code className="text-primary">currentColor</code> pour dark/light.
                      </p>
                    </div>

                    <div className="p-3 rounded-[8px] border border-border bg-card space-y-1">
                      <span className="font-mono font-bold text-foreground">wordmark.svg</span>
                      <p className="text-[11px] text-muted-foreground">
                        Variante combinant symbole graphique et typographie officielle.
                      </p>
                    </div>

                    <div className="p-3 rounded-[8px] border border-border bg-card space-y-1">
                      <span className="font-mono font-bold text-foreground">meta.json</span>
                      <p className="text-[11px] text-muted-foreground">
                        Métadonnées Zod : nom, source officielle, brandGuidelinesUrl.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-border bg-muted/30 p-4 font-mono text-xs relative group mt-3">
                    <pre className="text-foreground overflow-x-auto leading-relaxed">
{`// Exemple d'utilisation dans votre application React / Next.js
import { GithubColor, DockerColor } from "@liber/react";

export function TechStack() {
  return (
    <div className="flex items-center gap-4">
      {/* 1. Via package React optimisé (< 2 Ko tree-shakeable) */}
      <GithubColor size={24} />

      {/* 2. Ou via fichier SVG statique dans public/svg/ */}
      <img src="/svg/docker/color.svg" alt="Docker" className="h-6 w-6" />
    </div>
  );
}`}
                    </pre>

                    <button
                      onClick={() =>
                        copyToClipboard(
                          `import { GithubColor } from "@liber/react";\n<img src="/svg/docker/color.svg" alt="Docker" className="h-6 w-6" />`,
                          "Snippet logo copié",
                          "guide-logo-code"
                        )
                      }
                      className="absolute top-3 right-3 p-1.5 rounded-[6px] bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
                      title="Copier le snippet"
                    >
                      {copiedKey === "guide-logo-code" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Interactive Control Deck: Live Text Tester & Slider */}
        <div className="p-5 rounded-[10px] border border-border bg-card space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {/* Live Text Tester Input */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type custom text to preview across all font specimens..."
                className="w-full h-11 pl-4 pr-24 rounded-[10px] border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-[6px] border border-border">
                  {sampleText.length} chars
                </span>
                {sampleText && (
                  <button
                    onClick={() => setSampleText("")}
                    className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Specimen Size Slider */}
            <div className="flex items-center gap-3 bg-muted/40 border border-border px-4 py-1.5 rounded-[10px] h-11 min-w-[240px]">
              <span className="text-xs font-medium text-muted-foreground font-mono">Size</span>
              <input
                type="range"
                min="14"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-28 h-1.5 bg-muted rounded-[6px] appearance-none cursor-pointer accent-primary"
              />
              <span className="font-mono text-xs font-semibold text-foreground bg-card px-2 py-0.5 rounded-[6px] border border-border ml-auto">
                {fontSize}px
              </span>
            </div>
          </div>

          {/* Search by Font Name & Category Filter Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedCategory === c.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="font-mono text-[10px] opacity-70">({c.count})</span>
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search font..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-[8px] border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card"
              />
            </div>
          </div>
        </div>

        {/* 4. Vertical Font Specimen Rows */}
        <div className="divide-y divide-border rounded-[10px] border border-border bg-card overflow-hidden">
          {filtered.map((font) => {
            const fontDisplayFamily = `'${font.googleFontsFamily || font.name}', ${
              font.category === "serif"
                ? "serif"
                : font.category === "mono"
                ? "monospace"
                : "sans-serif"
            }`;
            const shadcnCmd = `pnpm dlx shadcn add https://liber.dev/r/font-${font.slug}.json`;
            const cssFontFaceSnippet = `@font-face {\n  font-family: '${font.name}';\n  src: url('/fonts/${font.slug}/${font.name}-Regular.woff2') format('woff2');\n  font-weight: 400;\n  font-display: swap;\n}`;

            return (
              <article
                key={font.slug}
                id={font.slug}
                className="p-6 sm:p-8 hover:bg-muted/20 transition-colors scroll-mt-20 group"
              >
                {/* Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {font.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border capitalize">
                      {font.category}
                    </span>
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      {font.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                      {font.license}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                      {font.weights.length} weights
                    </span>
                    {font.variable && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                        Variable
                      </span>
                    )}

                    {/* Copy Shadcn Command */}
                    <button
                      onClick={() =>
                        copyToClipboard(
                          shadcnCmd,
                          `Copied shadcn command for ${font.name}`,
                          `${font.slug}-shadcn`
                        )
                      }
                      className="flex items-center gap-1.5 font-mono text-xs bg-muted border border-border hover:bg-primary hover:text-primary-foreground text-foreground px-2.5 py-1 rounded-[6px] transition-colors ml-1"
                      title="Copy shadcn add command"
                    >
                      <Terminal className="h-3 w-3" />
                      <span>shadcn add font-{font.slug}</span>
                      {copiedKey === `${font.slug}-shadcn` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 opacity-60" />
                      )}
                    </button>

                    {/* Copy @font-face CSS */}
                    <button
                      onClick={() =>
                        copyToClipboard(
                          cssFontFaceSnippet,
                          `Copied CSS @font-face for ${font.name}`,
                          `${font.slug}-css`
                        )
                      }
                      className="flex items-center gap-1 font-mono text-xs bg-muted border border-border hover:bg-muted/80 text-foreground px-2 py-1 rounded-[6px] transition-colors"
                      title="Copy local CSS @font-face definition"
                    >
                      <Code2 className="h-3 w-3 text-muted-foreground" />
                      <span>@font-face</span>
                      {copiedKey === `${font.slug}-css` && (
                        <Check className="h-3 w-3 text-emerald-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Specimen Viewport (contenteditable for live interaction) */}
                <div className="py-4 overflow-x-hidden min-h-[5.5rem] flex items-center">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full text-foreground truncate outline-none select-all"
                    style={{
                      fontFamily: fontDisplayFamily,
                      fontSize: `${fontSize}px`,
                      lineHeight: 1.25,
                    }}
                  >
                    {sampleText || defaultSample}
                  </p>
                </div>

                {/* Specimen Footer Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-border/60 text-xs font-mono text-muted-foreground gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>Weights: {font.weights.join(", ")}</span>
                    <span>·</span>
                    <span>Formats: WOFF2, TTF</span>
                    <span>·</span>
                    <span>Open License ({font.license})</span>
                  </div>
                  <span className="text-[11px] opacity-80">
                    Local folder: public/fonts/{font.slug}/ or @fontsource/{font.slug}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center space-y-3 rounded-[10px] border border-border bg-card">
            <p className="text-sm text-foreground font-medium">No fonts match your criteria.</p>
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
      </div>
    </>
  );
}
