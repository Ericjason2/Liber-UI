"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  Terminal,
  Code2,
  RotateCcw,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import type { FontItem } from "@/lib/catalog-fonts-base";
import { useToast } from "@/context/ToastContext";
import { getFontPreviewUrl, getFontCharmapUrl } from "@/lib/fontPreviewUtils";

interface FontDetailClientProps {
  font: FontItem;
  relatedFonts: FontItem[];
}

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz".split("");
const NUMBER_CHARS = "0123456789".split("");
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/".split("");

const PRESET_SIZES = [24, 32, 48, 64, 72, 96];

const QUICK_SAMPLES = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "0123456789 · FREE TYPOGRAPHY",
  "Liber UI · Modern Catalog",
];

export function FontDetailClient({ font, relatedFonts }: FontDetailClientProps) {
  const defaultSample = "The quick brown fox jumps over the lazy dog";
  const [sampleText, setSampleText] = useState(defaultSample);
  const [debouncedText, setDebouncedText] = useState(defaultSample);
  const [fontSize, setFontSize] = useState<number>(48);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"specimen" | "alphabet" | "install">("specimen");
  const [imgLoaded, setImgLoaded] = useState(true);
  const { toast } = useToast();

  const charmapUrl = getFontCharmapUrl(font);

  // Debounce typed text by 250ms for smooth live updates without request spam
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(sampleText);
    }, 250);
    return () => clearTimeout(handler);
  }, [sampleText]);

  const activePreviewUrl = getFontPreviewUrl(
    font,
    debouncedText.trim() ? debouncedText : defaultSample,
    fontSize
  );

  const siteOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://liber-ui-delta.vercel.app";
  const fontCssUrl = `${siteOrigin}/api/font-css/${font.slug}`;
  const fontFileUrl = `${siteOrigin}/api/font-file/${font.slug}.ttf`;
  const liberCmd = `npx @liber-ui/cli add font-${font.slug}`;
  const cssFontFaceSnippet = `/* Option A: Direct CSS @import (CDN - no download required) */\n@import url('${fontCssUrl}');\n\n/* Option B: Standard @font-face (Direct CDN .ttf or local files) */\n@font-face {\n  font-family: '${font.name}';\n  src: url('${fontFileUrl}') format('truetype'),\n       url('/fonts/${font.slug}/${font.name}-Regular.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n:root {\n  --font-${font.slug}: '${font.name}', sans-serif;\n}`;
  const tailwindSnippet = `/* 1. In globals.css: @import url('${fontCssUrl}'); */\n/* 2. Use class="font-${font.slug}" or configure tailwind.config.js: */\nmodule.exports = {\n  theme: {\n    extend: {\n      fontFamily: {\n        '${font.slug}': ['var(--font-${font.slug})', '${font.category || "sans-serif"}'],\n      },\n    },\n  },\n};`;
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
                  onChange={(e) => {
                    setSampleText(e.target.value);
                    setImgLoaded(false);
                  }}
                  placeholder="Type any custom text to preview in this font..."
                  className="w-full h-11 pl-4 pr-24 rounded-[10px] border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-card focus:ring-2 focus:ring-ring transition-all"
                />
                <div className="absolute right-2.5 flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-[6px] border border-border">
                    {sampleText.length} chars
                  </span>
                  {sampleText && (
                    <button
                      onClick={() => {
                        setSampleText("");
                        setImgLoaded(false);
                      }}
                      className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
                      title="Clear text"
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
                  setImgLoaded(false);
                }}
                className="h-11 px-3.5 rounded-[10px] border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors self-end sm:self-auto"
                title="Reset to default pangram"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Quick Presets & Font Size Deck */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-border/60">
              {/* Preset Sizes */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Size:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {PRESET_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        setImgLoaded(false);
                      }}
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

              {/* Quick Sample Text Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono text-muted-foreground mr-1">Presets:</span>
                {QUICK_SAMPLES.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSampleText(qs);
                      setImgLoaded(false);
                    }}
                    className="px-2 py-0.5 rounded-[6px] border border-border bg-muted/30 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors truncate max-w-[140px] sm:max-w-[200px]"
                    title={qs}
                  >
                    {qs}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Specimen Viewport (rendered via authentic Dafont engine) */}
          <div className="p-8 sm:p-12 rounded-[12px] border border-border bg-card min-h-[16rem] flex flex-col justify-center items-center text-center overflow-hidden relative">
            <div className="w-full flex justify-between items-center text-[11px] font-mono text-muted-foreground pb-4 mb-4 border-b border-border/60">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Authentic Typeface Preview ({font.name})</span>
              </span>
              <span>{fontSize}px rendering</span>
            </div>

            <div className="py-6 w-full flex items-center justify-center overflow-x-auto min-h-[6rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activePreviewUrl}
                src={activePreviewUrl}
                alt={sampleText || defaultSample}
                onLoad={() => setImgLoaded(true)}
                className={`max-w-full h-auto object-contain dark:invert select-none pointer-events-none transition-opacity duration-200 ${
                  imgLoaded ? "opacity-100" : "opacity-40"
                }`}
              />
            </div>

            <div className="w-full pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Dynamic preview rendered natively in {font.name}</span>
              <span>Vector TrueType Engine</span>
            </div>
          </div>

          {/* Authentic Glyph Sheet Banner if available */}
          {font.previewImg && (
            <div className="p-6 rounded-[12px] border border-border bg-card/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  Original Typeface Specimen Banner
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Official Font Strip
                </span>
              </div>
              <div className="py-4 flex items-center justify-center overflow-x-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={font.previewImg}
                  alt={`${font.name} original specimen strip`}
                  className="h-14 sm:h-16 w-auto max-w-full object-contain dark:invert select-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Tab: Character Map & Full Alphabet */}
      {activeTab === "alphabet" && (
        <div className="space-y-8">
          {/* Authentic Character Map & Full Alphabet Sheet from author */}
          {charmapUrl && (
            <div className="p-6 sm:p-8 rounded-[12px] border border-border bg-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Authentic Complete Character Map & Glyphs
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Handcrafted vector glyphs (Uppercase A-Z, Lowercase a-z, Numerals, Accents & Symbols) from the original typeface.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={charmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-3 rounded-[8px] border border-border bg-muted/40 hover:bg-muted text-xs font-mono text-foreground flex items-center gap-1.5 transition-colors"
                  >
                    <span>Full Resolution</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 sm:p-8 rounded-[8px] bg-card border border-border/70 overflow-x-auto flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={charmapUrl}
                  alt={`${font.name} complete character map`}
                  className="w-full max-w-4xl h-auto object-contain dark:invert select-none"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Authentic Rendered Alphabet Strips directly in this typeface */}
          <div className="p-6 sm:p-8 rounded-[12px] border border-border bg-card space-y-6">
            <h3 className="text-sm font-semibold tracking-tight text-foreground font-mono">
              Live Alphabet Strips ({font.name})
            </h3>

            {/* Uppercase Strip */}
            <div className="p-4 rounded-[10px] border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Uppercase Alphabet (A–Z)</span>
                <span>26 Glyphs</span>
              </div>
              <div className="py-2 overflow-x-auto flex items-center justify-start min-h-[3rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFontPreviewUrl(font, "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z", 40)}
                  alt="Uppercase Alphabet"
                  loading="lazy"
                  className="h-10 sm:h-12 w-auto max-w-none object-contain dark:invert select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Lowercase Strip */}
            <div className="p-4 rounded-[10px] border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Lowercase Alphabet (a–z)</span>
                <span>26 Glyphs</span>
              </div>
              <div className="py-2 overflow-x-auto flex items-center justify-start min-h-[3rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFontPreviewUrl(font, "a b c d e f g h i j k l m n o p q r s t u v w x y z", 40)}
                  alt="Lowercase Alphabet"
                  loading="lazy"
                  className="h-10 sm:h-12 w-auto max-w-none object-contain dark:invert select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Numerals Strip */}
            <div className="p-4 rounded-[10px] border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Numerals (0–9)</span>
                <span>10 Glyphs</span>
              </div>
              <div className="py-2 overflow-x-auto flex items-center justify-start min-h-[3rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFontPreviewUrl(font, "0 1 2 3 4 5 6 7 8 9", 40)}
                  alt="Numerals"
                  loading="lazy"
                  className="h-10 sm:h-12 w-auto max-w-none object-contain dark:invert select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Punctuation & Symbols Strip */}
            <div className="p-4 rounded-[10px] border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Punctuation & Special Symbols</span>
                <span>Standard Glyphs</span>
              </div>
              <div className="py-2 overflow-x-auto flex items-center justify-start min-h-[3rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFontPreviewUrl(font, "! ? @ # $ % & * ( ) - _ + = [ ] { } : ; , .", 36)}
                  alt="Punctuation & Symbols"
                  loading="lazy"
                  className="h-9 sm:h-10 w-auto max-w-none object-contain dark:invert select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Reference Codepoints Matrix */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                Unicode Codepoints Reference Matrix
              </h3>
              <span className="text-xs font-mono text-muted-foreground">Standard ASCII mapping</span>
            </div>

            {/* Uppercase Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Uppercase (A-Z)</span>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
                {UPPERCASE_CHARS.map((char) => (
                  <div
                    key={char}
                    className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                  >
                    <span className="text-xl font-bold text-foreground font-mono">
                      {char}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground opacity-60">
                      U+{char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lowercase Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Lowercase (a-z)</span>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
                {LOWERCASE_CHARS.map((char) => (
                  <div
                    key={char}
                    className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                  >
                    <span className="text-xl font-bold text-foreground font-mono">
                      {char}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground opacity-60">
                      U+{char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Numbers Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Numbers (0-9)</span>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {NUMBER_CHARS.map((char) => (
                  <div
                    key={char}
                    className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                  >
                    <span className="text-xl font-bold text-foreground font-mono">
                      {char}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground opacity-60">
                      U+{char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Symbols Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Symbols & Punctuation</span>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-14 gap-2">
                {SYMBOL_CHARS.map((char) => (
                  <div
                    key={char}
                    className="aspect-square rounded-[8px] border border-border bg-card flex flex-col items-center justify-center hover:border-primary/50 transition-colors group cursor-default"
                  >
                    <span className="text-lg font-bold text-foreground font-mono">
                      {char}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground opacity-60">
                      {char.charCodeAt(0)}
                    </span>
                  </div>
                ))}
              </div>
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
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
              <a
                href={`/api/font-css/${font.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span>Open CSS Stylesheet (/api/font-css/{font.slug})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`/api/font-file/${font.slug}.ttf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
              >
                <span>Direct .ttf Binary (/api/font-file/{font.slug}.ttf)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
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
                    <p className="text-xl text-foreground truncate select-none font-sans">
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
