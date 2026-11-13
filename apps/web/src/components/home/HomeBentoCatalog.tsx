"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Eye, Terminal } from "lucide-react";
import { EditorialDivider, TiltedPill } from "./HomePrimitives";
import { ScrollReveal, getRevealMotionProps, useInViewOnce } from "./ScrollReveal";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";
import { TOTAL_THEMES_COUNT } from "@/lib/catalog-themes-base";
import { TOTAL_FONTS_COUNT } from "@/lib/catalog-fonts-base";
import { SAMPLE_ANIMATIONS } from "@/lib/catalog-animations";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";

/**
 * Module 1 — "What's inside Liber UI?" 3x2 Bento showcase inspired by Behance Module 1.
 * Each card houses an architectural live micro-preview of a real Liber UI asset family.
 */
export function HomeBentoCatalog() {
  const [gridRef, gridVisible] = useInViewOnce<HTMLDivElement>();
  const cardMotion = (idx: number) => getRevealMotionProps(gridVisible, idx * 160, 1450);

  return (
    <section className="space-y-12 sm:space-y-16">
      <ScrollReveal variant="fade-up">
        <div className="space-y-10 sm:space-y-12">
          <EditorialDivider left="Catalog Overview" center="Liber UI" index="01" />

          {/* Centered Header with Tilted Inline Accent Pill */}
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              What’s inside{" "}
              <TiltedPill className="-rotate-3 mx-1 text-lg sm:text-2xl px-4 py-1 align-middle">
                Liber
              </TiltedPill>{" "}
              UI ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Five production-ready asset families engineered for clarity, accessibility, and instant
              integration—no heavy wrappers or hidden runtime dependencies.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 x 2 Bento Card Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {/* 1. Color Themes Card */}
        <div {...cardMotion(0)}>
        <Link href="/themes" className="group block space-y-3">
          <div className="h-[220px] rounded-[22px] border border-border bg-card p-6 flex flex-col justify-between liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            <div className="space-y-3 pt-1">
              <div className="relative h-6 rounded-[8px] border border-border overflow-hidden bg-gradient-to-r from-[#2563EB]/15 via-[#2563EB]/50 to-[#2563EB]">
                <span className="absolute right-3 top-0.5 bottom-0.5 w-4 rounded-[4px] border-2 border-foreground bg-[#2563EB] dark:bg-[#38BDF8]" />
              </div>
              <div className="relative h-6 rounded-[8px] border border-border overflow-hidden liber-checkerboard">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2563EB] dark:to-[#38BDF8]" />
                <span className="absolute left-1/2 -translate-x-1/2 top-0.5 bottom-0.5 w-4 rounded-[4px] border-2 border-foreground bg-[#2563EB]/70 dark:bg-[#38BDF8]/80" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2 px-2.5 h-8 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono">
                <span className="h-3.5 w-3.5 rounded-[4px] bg-[#2563EB] dark:bg-[#38BDF8]" />
                <span className="text-foreground font-medium">2563EB</span>
                <span className="text-muted-foreground">100%</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono text-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>16.8:1</span>
              </div>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                Color Themes
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {TOTAL_THEMES_COUNT} WCAG AA/AAA Palettes
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>

        {/* 2. Fonts & Typography Card */}
        <div {...cardMotion(1)}>
        <Link href="/fonts" className="group block space-y-3">
          <div className="h-[220px] rounded-[22px] border border-border bg-card p-6 flex flex-col justify-between liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            <div className="text-center pt-1">
              <div className="text-3xl font-bold tracking-tight">
                <span className="text-foreground">Typo</span>
                <span className="text-[#2563EB] dark:text-[#38BDF8]">graphy</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="h-8 px-3 rounded-[8px] border border-border bg-surface-subtle flex items-center justify-between text-xs font-medium text-foreground">
                <span>Geist Sans</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-7 w-7 rounded-[6px] border border-border bg-muted text-xs font-bold flex items-center justify-center">
                    B
                  </span>
                  <span className="h-7 w-7 rounded-[6px] border border-border bg-surface-subtle text-xs italic font-serif flex items-center justify-center text-muted-foreground">
                    I
                  </span>
                  <span className="h-7 w-7 rounded-[6px] border border-border bg-surface-subtle text-xs underline flex items-center justify-center text-muted-foreground">
                    U
                  </span>
                </div>
                <span className="h-7 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-[11px] font-mono flex items-center gap-1 text-foreground">
                  18 PX <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                Typography & Fonts
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {TOTAL_FONTS_COUNT.toLocaleString()}+ Open-License Fonts
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>

        {/* 3. Logos & Vectors Card */}
        <div {...cardMotion(2)}>
        <Link href="/logos" className="group block space-y-3">
          <div className="relative h-[220px] rounded-[22px] border border-border bg-card p-6 flex items-center justify-center liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            {/* Blueprint Dot Grid */}
            <div className="absolute inset-0 text-border bg-grid-dots opacity-60 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-border bg-card liber-floating-widget flex items-center justify-center p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/svg/typescript/color.svg" alt="TypeScript" className="h-6 w-6 object-contain" />
              </div>
              <div className="h-16 w-16 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] border-4 border-card liber-floating-widget flex items-center justify-center">
                <div
                  className="h-8 w-8 bg-white dark:bg-[#090D16]"
                  style={{
                    WebkitMaskImage: "url('/svg/react/mono.svg')",
                    maskImage: "url('/svg/react/mono.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>
              <div className="h-12 w-12 rounded-full border border-border bg-card liber-floating-widget flex items-center justify-center p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/svg/docker/color.svg" alt="Docker" className="h-6 w-6 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                Logos & Vectors
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {OFFICIAL_LOGOS.length} SVGs · Color, Mono & Wordmark
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>

        {/* 4. Animations Card */}
        <div {...cardMotion(3)}>
        <Link href="/animations" className="group block space-y-3">
          <div className="h-[220px] rounded-[22px] border border-border bg-card p-6 flex items-center justify-center liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            <div className="relative w-full max-w-[240px] space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 flex-1 rounded-full bg-[#2563EB]/30 dark:bg-[#38BDF8]/30 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] group-hover:w-full transition-all duration-500" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded border border-border bg-surface-subtle">
                  0.4s
                </span>
              </div>
              <div className="h-3.5 rounded-[6px] bg-[#2563EB]/65 dark:bg-[#38BDF8]/65" />
              <div className="h-4 rounded-[6px] bg-[#2563EB]/85 dark:bg-[#38BDF8]/85" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded border border-border bg-surface-subtle">
                  GPU
                </span>
                <div className="h-6 flex-1 rounded-[8px] bg-[#2563EB] dark:bg-[#38BDF8]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                CSS & Tailwind Motion
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {SAMPLE_ANIMATIONS.length} Keyframes · prefers-reduced-motion
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>

        {/* 5. UI Components & Grid System Card */}
        <div {...cardMotion(4)}>
        <Link href="/components" className="group block space-y-3">
          <div className="relative h-[220px] rounded-[22px] border border-border bg-card p-5 flex flex-col justify-between liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            {/* Overlapping Desktop + Mobile column bars */}
            <div className="relative flex-1 flex items-end gap-1.5 px-2 pt-4 pb-2 overflow-hidden">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-t-[4px] ${
                    idx >= 6
                      ? "h-20 bg-amber-400/55 dark:bg-amber-400/45"
                      : "h-28 bg-[#2563EB]/25 dark:bg-[#38BDF8]/25"
                  }`}
                />
              ))}
              <span className="absolute top-1 left-2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-card text-foreground">
                1440PX
              </span>
              <span className="absolute top-9 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-card text-foreground">
                375PX
              </span>
            </div>

            <div className="h-8 px-3 rounded-[8px] border border-border bg-surface-subtle flex items-center justify-between text-[11px] font-mono text-foreground">
              <span>12 Columns · Primitives</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                UI Components
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {SAMPLE_COMPONENTS.length} Accessible Interactive TSX Blocks
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>

        {/* 6. CLI, CDN & Docs Card */}
        <div {...cardMotion(5)}>
        <Link href="/docs" className="group block space-y-3">
          <div className="h-[220px] rounded-[22px] border border-border bg-card p-6 flex flex-col items-center justify-between liber-showcase-frame group-hover:border-[#2563EB]/60 dark:group-hover:border-[#38BDF8]/60 transition-colors overflow-hidden">
            <div className="pt-2">
              <div className="relative h-20 w-20 rounded-[18px] bg-[#2563EB] dark:bg-[#38BDF8] text-white dark:text-[#090D16] flex items-center justify-center text-2xl font-bold font-mono liber-floating-widget">
                &lt;/&gt;
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 inset-x-2 h-3 rounded-b-[14px] bg-[#2563EB]/30 dark:bg-[#38BDF8]/30 -z-10"
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] border border-border bg-surface-subtle text-[11px] font-mono text-foreground">
                <Terminal className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>@liber-ui/cli</span>
              </div>
              <div className="px-2.5 h-8 rounded-[8px] border border-border bg-surface-subtle flex items-center text-[11px] font-mono text-muted-foreground">
                CDN · npm
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                CLI & Direct CDN
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                Open Registry · CSS Imports
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
        </div>
      </div>
    </section>
  );
}

