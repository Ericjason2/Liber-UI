"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { InstallStrip } from "@/components/InstallStrip";
import {
  DashedSelectionBox,
  FloatingToolDock,
  FloatingFillInspector,
  FloatingTypographyInspector,
} from "./HomePrimitives";
import { ScrollParallax } from "./ScrollReveal";
import { BASE_THEMES } from "@/lib/catalog-themes-base";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";
import { TOTAL_THEMES_COUNT } from "@/lib/catalog-themes-base";
import { TOTAL_FONTS_COUNT } from "@/lib/catalog-fonts-base";
import { SAMPLE_ANIMATIONS } from "@/lib/catalog-animations";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";

interface HomeHeroShowcaseProps {
  onOpenSearch: () => void;
}

/**
 * Module 0 Hero inspired by the Behance Design System showcase:
 * Massive display typography with Figma selection frame, tilted floating tool/inspector cards,
 * live catalog search & CLI strip, and a centered minimalist display monitor previewing live UI tokens.
 */
export function HomeHeroShowcase({ onOpenSearch }: HomeHeroShowcaseProps) {
  const [activeBtn, setActiveBtn] = useState<string>("primary-icon-left");

  const previewThemes = BASE_THEMES.slice(0, 4);
  const heroLogos = OFFICIAL_LOGOS.slice(0, 6);

  return (
    <section className="relative pt-8 sm:pt-16 pb-10">
      {/* Subtle ambient background glow behind Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[680px] h-[340px] liber-ambient-glow rounded-full blur-2xl"
      />

      {/* Top Display Area with Floating Tilted Inspector Widgets */}
      <div className="relative max-w-5xl mx-auto text-center space-y-9">
        {/* Top-Left Tilted Design Tool Dock (Desktop) */}
        <ScrollParallax speed={-0.09} className="hidden lg:block absolute -top-6 left-2 xl:-left-8 z-20">
          <div className="-rotate-6 liber-hero-reveal" style={{ animationDelay: "160ms" }}>
            <FloatingToolDock />
          </div>
        </ScrollParallax>

        {/* Top-Right Tilted Color Fill Inspector (Desktop) */}
        <ScrollParallax speed={0.08} className="hidden lg:block absolute -top-10 right-0 xl:-right-8 z-20">
          <div className="rotate-6 liber-hero-reveal" style={{ animationDelay: "260ms" }}>
            <FloatingFillInspector hex="2563EB" opacity="100%" />
          </div>
        </ScrollParallax>

        {/* Massive Editorial Headline with Figma Selection Box */}
        <h1 className="liber-hero-reveal text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.03em] text-foreground leading-[1.08] max-w-4xl mx-auto">
          Open code for{" "}
          <DashedSelectionBox>
            <span className="text-[#2563EB] dark:text-[#38BDF8]">polished</span>
          </DashedSelectionBox>{" "}
          interfaces.
        </h1>

        <p
          style={{ animationDelay: "140ms" }}
          className="liber-hero-reveal text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {OFFICIAL_LOGOS.length}+ official tech logos, {TOTAL_FONTS_COUNT.toLocaleString()}+ free fonts,{" "}
          {TOTAL_THEMES_COUNT} WCAG palettes, {SAMPLE_ANIMATIONS.length} GPU animations &{" "}
          {SAMPLE_COMPONENTS.length} UI primitives. Copy directly or install with one command.
        </p>

        {/* Wide Search Bar + Primary Pill CTAs */}
        <div style={{ animationDelay: "260ms" }} className="liber-hero-reveal max-w-[660px] mx-auto space-y-5 pt-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between h-12 px-4 rounded-full border border-border bg-card text-sm text-muted-foreground hover:border-foreground/40 transition-colors liber-showcase-frame"
          >
            <span className="flex items-center gap-3 truncate">
              <Search className="h-4 w-4 text-foreground/70 shrink-0" />
              <span className="truncate">Search logos, animations, components, themes, fonts...</span>
            </span>
            <kbd className="hidden sm:inline-block rounded-full border border-border bg-surface-subtle px-2.5 py-0.5 text-[11px] font-mono text-foreground/80 shrink-0">
              Ctrl K
            </kbd>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/logos"
              className="h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <span>Browse catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="h-11 px-6 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2"
            >
              <span>Read the docs</span>
            </Link>
          </div>
        </div>

        {/* Interactive CLI Strip */}
        <div style={{ animationDelay: "380ms" }} className="liber-hero-reveal pt-3">
          <InstallStrip />
        </div>
      </div>

      {/* Centered Hero Display Monitor Mockup with Overlapping Typography Inspector */}
      <div className="relative max-w-[1040px] mx-auto mt-16 sm:mt-24">
        {/* Overlapping Tilted Typography Inspector Popover */}
        <ScrollParallax speed={-0.1} className="hidden md:block absolute -top-9 right-4 lg:-right-6 z-20">
          <div style={{ animationDelay: "520ms" }} className="rotate-3 liber-hero-reveal">
            <FloatingTypographyInspector />
          </div>
        </ScrollParallax>

        {/* Monitor Outer Bezel */}
        <div style={{ animationDelay: "460ms" }} className="liber-hero-reveal-scale">
          <div className="relative rounded-[22px] sm:rounded-[28px] border-[6px] sm:border-[10px] border-foreground dark:border-[#1E293B] bg-card overflow-hidden liber-showcase-frame">
          {/* Simulated Studio Viewport Inside Screen */}
          <div className="p-4 sm:p-8 space-y-7 bg-background">
            {/* Screen Top Micro Bar */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs font-mono font-medium text-foreground">
                  Liber Design Catalog
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <span className="hidden sm:inline">Geist · Neutral Tokens</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-subtle border border-border text-foreground">
                  WCAG AA/AAA
                </span>
              </div>
            </div>

            {/* Screen Block 1: Brand & Theme Swatch Cards (4-col) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-semibold text-foreground">Theme Swatches</h2>
                <Link
                  href="/themes"
                  className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {TOTAL_THEMES_COUNT} palettes →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {previewThemes.map((theme) => {
                  const mainColor = theme.swatches[4] || theme.swatches[2] || "#2563EB";
                  return (
                    <Link
                      key={theme.slug}
                      href={`/themes#palette-${theme.slug}`}
                      className="group rounded-[12px] border border-border bg-card overflow-hidden hover:border-foreground/40 transition-colors"
                    >
                      <div
                        className="h-14 sm:h-16 flex items-center justify-center px-2 text-[11px] font-mono font-semibold text-white"
                        style={{ backgroundColor: mainColor }}
                      >
                        <span className="px-2 py-0.5 rounded bg-black/25 backdrop-blur-sm">
                          {mainColor.toUpperCase()}
                        </span>
                      </div>
                      <div className="h-5 flex">
                        {theme.swatches.map((hex, i) => (
                          <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                        ))}
                      </div>
                      <div className="px-2.5 py-1.5 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-foreground truncate">{theme.name}</span>
                        <span className="font-mono text-muted-foreground">{theme.wcagLevel}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Screen Block 2: Interactive Button Matrix */}
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2 items-center text-[11px] font-mono text-muted-foreground">
                <span className="font-semibold text-foreground font-sans text-xs sm:text-sm">
                  Buttons
                </span>
                <span className="text-center hidden sm:block">Enabled</span>
                <span className="text-center hidden sm:block">Icon Left</span>
                <span className="text-center hidden sm:block">Focused</span>
                <span className="text-center hidden sm:block">Disabled</span>
              </div>

              {/* Primary Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-center">
                <span className="text-xs text-muted-foreground hidden sm:inline">Primary</span>
                <button
                  type="button"
                  onClick={() => setActiveBtn("primary-enabled")}
                  className={`h-8 px-3 rounded-[8px] text-xs font-medium bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] transition-all ${activeBtn === "primary-enabled" ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                    }`}
                >
                  Button
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBtn("primary-icon-left")}
                  className={`h-8 px-3 rounded-[8px] text-xs font-medium bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] inline-flex items-center justify-center gap-1.5 transition-all ${activeBtn === "primary-icon-left" ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                    }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Action</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBtn("primary-focused")}
                  className="hidden sm:inline-flex h-8 px-3 rounded-[8px] text-xs font-medium bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] items-center justify-center gap-1.5 ring-2 ring-[#2563EB]/40 dark:ring-[#38BDF8]/40 ring-offset-2 ring-offset-background"
                >
                  <span>Deploy</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  disabled
                  className="hidden sm:inline-flex h-8 px-3 rounded-[8px] text-xs font-medium bg-muted text-muted-foreground/60 items-center justify-center cursor-not-allowed"
                >
                  Disabled
                </button>
              </div>

              {/* Secondary Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-center">
                <span className="text-xs text-muted-foreground hidden sm:inline">Secondary</span>
                <button
                  type="button"
                  onClick={() => setActiveBtn("sec-enabled")}
                  className={`h-8 px-3 rounded-[8px] text-xs font-medium bg-primary text-primary-foreground transition-all ${activeBtn === "sec-enabled" ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                    }`}
                >
                  Button
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBtn("sec-icon-left")}
                  className={`h-8 px-3 rounded-[8px] text-xs font-medium border border-border bg-surface-subtle text-foreground inline-flex items-center justify-center gap-1.5 transition-all ${activeBtn === "sec-icon-left" ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                    }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Copy TSX</span>
                </button>
                <button
                  type="button"
                  className="hidden sm:inline-flex h-8 px-3 rounded-[8px] text-xs font-medium bg-primary text-primary-foreground items-center justify-center gap-1.5 ring-2 ring-foreground/20 ring-offset-2 ring-offset-background"
                >
                  <span>Install</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  disabled
                  className="hidden sm:inline-flex h-8 px-3 rounded-[8px] text-xs font-medium border border-border bg-surface-subtle/50 text-muted-foreground/50 items-center justify-center cursor-not-allowed"
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* Screen Block 3: Text Fields & Official Logos Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-9 px-3 rounded-[8px] border border-border bg-surface-subtle flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">npx @liber-ui/cli add react</span>
                </div>
                <div className="flex-1 h-9 px-3 rounded-[8px] border border-[#2563EB] dark:border-[#38BDF8] bg-card flex items-center justify-between text-xs text-foreground">
                  <span className="truncate font-mono">verified@liber.dev</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-2">
                <span className="text-[11px] font-mono text-muted-foreground mr-1">Logos:</span>
                {heroLogos.map((logo) => (
                  <Link
                    key={logo.slug}
                    href={`/logos/${logo.slug}`}
                    title={logo.name}
                    className="h-8 w-8 rounded-[8px] border border-border bg-surface-subtle hover:border-foreground/50 flex items-center justify-center p-1.5 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/svg/${logo.slug}/color.svg`}
                      alt={logo.name}
                      className="h-4 w-4 object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Monitor Stand (Behance Module 0 detail) */}
        <div aria-hidden="true" className="hidden sm:flex flex-col items-center">
          <div className="w-28 h-12 bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 border-x border-border" />
          <div className="w-44 h-2 rounded-full bg-neutral-300 dark:bg-slate-700" />
        </div>
        </div>
      </div>
    </section>
  );
}

