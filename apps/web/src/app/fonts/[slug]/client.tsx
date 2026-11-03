"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  Terminal,
  Code2,
  Type,
  RotateCcw,
} from "lucide-react";
import type { FontItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

interface FontDetailClientProps {
  font: FontItem;
  relatedFonts: FontItem[];
}

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz".split("");
const NUMBER_CHARS = "0123456789".split("");
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/".split("");

const PRESET_SIZES = [24, 32, 48, 64, 72, 96];

export function FontDetailClient({ font, relatedFonts }: FontDetailClientProps) {
  const defaultSample = "The quick brown fox jumps over the lazy dog";
  const [sampleText, setSampleText] = useState(defaultSample);
  const [fontSize, setFontSize] = useState<number>(48);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"specimen" | "alphabet" | "install">("specimen");
  const { toast } = useToast();

  const fontDisplayFamily = `'${font.googleFontsFamily || font.name}', ${
    font.category === "serif"
      ? "serif"
      : font.category === "mono"
      ? "monospace"
      : "sans-serif"
  }`;

  const liberCmd = `npx @liber-ui/cli add font-${font.slug}`;
  const cssFontFaceSnippet = `@font-face {\n  font-family: '${font.name}';\n  src: url('/fonts/${font.slug}/${font.name}-Regular.woff2') format('woff2'),\n       url('/fonts/${font.slug}/${font.name}-Regular.ttf') format('truetype');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n:root {\n  --font-${font.slug}: '${font.name}', sans-serif;\n}`;
  const tailwindSnippet = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        '${font.slug}': ['var(--font-${font.slug})', '${font.category || "sans-serif"}'],\n      },\n    },\n  },\n};`;
  const nextFontLocalSnippet = `// app/layout.tsx\nimport localFont from 'next/font/local';\n\nconst font${font.name.replace(/[^a-zA-Z0-9]/g, "")} = localFont({\n  src: './fonts/${font.slug}/${font.name}-Regular.woff2',\n  variable: '--font-${font.slug}',\n  display: 'swap',\n});\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" className={font${font.name.replace(/[^a-zA-Z0-9]/g, "")}.variable}>\n      <body>{children}</body>\n    </html>\n  );\n}`;

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Monospace Breadcrumbs & Back Link */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/fonts"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Fonts Catalog</span>
        </Link>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-muted border border-border">
            {font.theme || "Basic"}
          </span>
          {font.subtheme && (
            <span className="px-2 py-0.5 rounded-full bg-muted/60 border border-border/80">
              {font.subtheme}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-muted border border-border">
            {font.license}
          </span>
        </div>
      </div>

      {/* 2. Hero Header */}
      <div className="space-y-6 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              {font.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {font.author
                ? `Original typeface designed by ${font.author}.`
                : font.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {font.downloadUrl && (
              <a
                href={font.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-[10px] bg-primary text-primary-foreground hover:opacity-90 font-mono text-xs font-medium flex items-center gap-2 transition-opacity shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download (.zip)</span>
              </a>
            )}

            <button
              onClick={() =>
                copyToClipboard(
                  liberCmd,
                  `Copied CLI command for ${font.name}`,
                  "hero-cli"
                )
              }
              className="h-10 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground flex items-center gap-2 transition-colors"
              title="Copy Liber CLI command"
            >
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span>liber add font-{font.slug}</span>
              {copiedKey === "hero-cli" ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 opacity-60" />
              )}
            </button>

            <button
              onClick={() =>
                copyToClipboard(
                  cssFontFaceSnippet,
                  `Copied @font-face for ${font.name}`,
                  "hero-css"
                )
              }
              className="h-10 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted font-mono text-xs text-foreground flex items-center gap-2 transition-colors"
              title="Copy @font-face CSS snippet"
            >
              <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>@font-face</span>
              {copiedKey === "hero-css" && (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-border/60">
          <button
            onClick={() => setActiveTab("specimen")}
            className={`px-4 py-2 rounded-[8px] text-xs font-mono font-medium transition-colors ${
              activeTab === "specimen"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Live Specimen & Preview
          </button>
          <button
            onClick={() => setActiveTab("alphabet")}
            className={`px-4 py-2 rounded-[8px] text-xs font-mono font-medium transition-colors ${
              activeTab === "alphabet"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Character Map & Glyphs
          </button>
          <button
            onClick={() => setActiveTab("install")}
            className={`px-4 py-2 rounded-[8px] text-xs font-mono font-medium transition-colors ${
              activeTab === "install"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Installation & CSS Code
          </button>
        </div>
      </div>

      {/* 3. Tab: Live Specimen & Preview */}
      {activeTab === "specimen" && (
        <div className="space-y-6">
          {/* Controls Deck */}
          <div className="p-5 rounded-[12px] border border-border bg-card space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Type any custom text to preview..."
                  className="w-full h-11 pl-4 pr-24 rounded-[10px] border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card focus:ring-2 focus:ring-ring transition-all"
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

              <button
                onClick={() => {
                  setSampleText(defaultSample);
                  setFontSize(48);
                }}
                className="h-11 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors self-end sm:self-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Font Size Presets */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-border/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Size:</span>
                <div className="flex items-center gap-1">
                  {PRESET_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-2.5 py-1 rounded-[6px] text-xs font-mono transition-colors ${
                        fontSize === size
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "border border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Type className="h-3.5 w-3.5" />
                <span>Editable Viewport</span>
              </div>
            </div>
          </div>

          {/* Authentic Glyph Sheet Banner if available */}
          {font.previewImg && (
            <div className="p-6 rounded-[12px] border border-border bg-card/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  Original Typeface Glyph Sheet
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Vector Preview Strip
                </span>
              </div>
              <div className="py-4 flex items-center justify-center overflow-x-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={font.previewImg}
                  alt={`${font.name} original glyph sheet`}
                  className="h-14 sm:h-16 w-auto max-w-full object-contain dark:invert select-none"
                />
              </div>
            </div>
          )}

          {/* Live Editable Specimen Viewport */}
          <div className="p-8 sm:p-12 rounded-[12px] border border-border bg-card min-h-[16rem] flex flex-col justify-center overflow-hidden">
            <p
              contentEditable
              suppressContentEditableWarning
              className="w-full text-foreground break-words outline-none select-all"
              style={{
                fontFamily: fontDisplayFamily,
                fontSize: `${fontSize}px`,
                lineHeight: 1.25,
              }}
            >
              {sampleText || defaultSample}
            </p>
          </div>
        </div>
      )}

      {/* 4. Tab: Character Map & Full Alphabet */}
      {activeTab === "alphabet" && (
        <div className="space-y-8">
          {/* Authentic Preview Image if present */}
          {font.previewImg && (
            <div className="p-6 rounded-[12px] border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  Authentic Character Set Rendering
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Glyph Map
                </span>
              </div>
              <div className="py-4 flex items-center justify-center overflow-x-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={font.previewImg}
                  alt={`${font.name} glyphs`}
                  className="h-16 sm:h-20 w-auto max-w-full object-contain dark:invert select-none"
                />
              </div>
            </div>
          )}

          {/* Uppercase Alphabet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                Uppercase (A–Z)
              </h2>
              <span className="text-xs font-mono text-muted-foreground">26 glyphs</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
              {UPPERCASE_CHARS.map((char) => (
                <div
                  key={char}
                  className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                >
                  <span
                    className="text-2xl text-foreground select-all"
                    style={{ fontFamily: fontDisplayFamily }}
                  >
                    {char}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-60 group-hover:opacity-100">
                    {char}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lowercase Alphabet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                Lowercase (a–z)
              </h2>
              <span className="text-xs font-mono text-muted-foreground">26 glyphs</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
              {LOWERCASE_CHARS.map((char) => (
                <div
                  key={char}
                  className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                >
                  <span
                    className="text-2xl text-foreground select-all"
                    style={{ fontFamily: fontDisplayFamily }}
                  >
                    {char}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-60 group-hover:opacity-100">
                    {char}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Numbers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                Numerals (0–9)
              </h2>
              <span className="text-xs font-mono text-muted-foreground">10 glyphs</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {NUMBER_CHARS.map((char) => (
                <div
                  key={char}
                  className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                >
                  <span
                    className="text-2xl text-foreground select-all"
                    style={{ fontFamily: fontDisplayFamily }}
                  >
                    {char}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-60 group-hover:opacity-100">
                    {char}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Punctuation & Symbols */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                Punctuation & Special Symbols
              </h2>
              <span className="text-xs font-mono text-muted-foreground">{SYMBOL_CHARS.length} glyphs</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-14 gap-2">
              {SYMBOL_CHARS.map((char) => (
                <div
                  key={char}
                  className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                >
                  <span
                    className="text-xl text-foreground select-all"
                    style={{ fontFamily: fontDisplayFamily }}
                  >
                    {char}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground opacity-50">
                    {char.charCodeAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab: Installation & Developer Guide */}
      {activeTab === "install" && (
        <div className="space-y-8">
          {/* CLI Section */}
          <div className="p-6 rounded-[12px] border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  1. Automatic Installation via Liber CLI
                </h3>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    liberCmd,
                    `Copied CLI command for ${font.name}`,
                    "install-cli"
                  )
                }
                className="h-8 px-2.5 rounded-[6px] border border-border bg-muted hover:bg-muted/80 text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === "install-cli" ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-4 rounded-[8px] bg-muted/60 font-mono text-xs text-foreground overflow-x-auto">
              <code>{liberCmd}</code>
            </pre>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This command automatically creates the font style definitions in your project’s styles directory and configures your project theme.
            </p>
          </div>

          {/* CSS @font-face Section */}
          <div className="p-6 rounded-[12px] border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  2. Local CSS @font-face Definition
                </h3>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    cssFontFaceSnippet,
                    `Copied @font-face CSS snippet`,
                    "install-css"
                  )
                }
                className="h-8 px-2.5 rounded-[6px] border border-border bg-muted hover:bg-muted/80 text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === "install-css" ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-4 rounded-[8px] bg-muted/60 font-mono text-xs text-foreground overflow-x-auto">
              <code>{cssFontFaceSnippet}</code>
            </pre>
          </div>

          {/* Next.js & Tailwind Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[12px] border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  Next.js next/font/local
                </h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      nextFontLocalSnippet,
                      `Copied Next.js snippet`,
                      "install-next"
                    )
                  }
                  className="h-7 px-2 rounded-[6px] border border-border bg-muted text-xs font-mono text-foreground flex items-center gap-1"
                >
                  {copiedKey === "install-next" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 rounded-[8px] bg-muted/60 font-mono text-xs text-foreground overflow-x-auto">
                <code>{nextFontLocalSnippet}</code>
              </pre>
            </div>

            <div className="p-6 rounded-[12px] border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground font-mono">
                  Tailwind CSS Config
                </h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      tailwindSnippet,
                      `Copied Tailwind snippet`,
                      "install-tw"
                    )
                  }
                  className="h-7 px-2 rounded-[6px] border border-border bg-muted text-xs font-mono text-foreground flex items-center gap-1"
                >
                  {copiedKey === "install-tw" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 rounded-[8px] bg-muted/60 font-mono text-xs text-foreground overflow-x-auto">
                <code>{tailwindSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 6. Essential Metadata Sidebar / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[12px] border border-border bg-card">
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            License
          </span>
          <span className="text-sm font-medium text-foreground mt-1 block">
            {font.license}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            Available Weights
          </span>
          <span className="text-sm font-medium text-foreground mt-1 block font-mono">
            {font.weights.join(", ")}
          </span>
        </div>
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            Supported Formats
          </span>
          <span className="text-sm font-medium text-foreground mt-1 block font-mono">
            TTF · OTF · WOFF2
          </span>
        </div>
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            Theme / Style
          </span>
          <span className="text-sm font-medium text-foreground mt-1 block capitalize">
            {font.theme || "Basic"} {font.subtheme ? `(${font.subtheme})` : ""}
          </span>
        </div>
      </div>

      {/* 7. Related Fonts Grid */}
      {relatedFonts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              More {font.theme || "Similar"} Fonts
            </h2>
            <Link
              href="/fonts"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse all fonts →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedFonts.map((rf) => (
              <Link
                key={rf.slug}
                href={`/fonts/${rf.slug}`}
                className="p-5 rounded-[10px] border border-border bg-card hover:border-primary/50 transition-all group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {rf.name}
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">
                    {rf.theme || rf.category}
                  </span>
                </div>

                <div className="min-h-[3.5rem] flex items-center overflow-hidden">
                  {rf.previewImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rf.previewImg}
                      alt={rf.name}
                      loading="lazy"
                      className="h-8 w-auto max-w-full object-contain dark:invert select-none pointer-events-none"
                    />
                  ) : (
                    <p
                      className="text-xl text-foreground truncate select-none"
                      style={{
                        fontFamily: `'${rf.googleFontsFamily || rf.name}', sans-serif`,
                      }}
                    >
                      {rf.name}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
