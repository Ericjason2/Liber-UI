"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialDivider } from "./HomePrimitives";
import { ScrollReveal, getRevealMotionProps, useInViewOnce } from "./ScrollReveal";
import { ThemeLivePreview } from "@/components/ThemeLivePreview";
import { BASE_THEMES, TOTAL_THEMES_COUNT } from "@/lib/catalog-themes-base";
import { useToast } from "@/context/ToastContext";

const TEXT_SCALE_RAMP = [
  { weight: "800", hex: "#0F172A", darkText: false },
  { weight: "700", hex: "#1E293B", darkText: false },
  { weight: "600", hex: "#334155", darkText: false },
  { weight: "500", hex: "#475569", darkText: false },
  { weight: "400", hex: "#64748B", darkText: false },
  { weight: "300", hex: "#94A3B8", darkText: true },
  { weight: "200", hex: "#CBD5E1", darkText: true },
  { weight: "100", hex: "#E2E8F0", darkText: true },
  { weight: "50", hex: "#F8FAFC", darkText: true },
];

/**
 * Module 3 — Color Palette & WCAG Guidelines inspired by Behance Module 3.
 * Combines 4 click-to-copy brand swatch cards, a 9-step Slate text ramp,
 * and Liber UI's interactive ThemeLivePreview inside a double-framed container.
 */
export function HomeColorShowcase() {
  const { toast } = useToast();
  const [swatchesRef, swatchesVisible] = useInViewOnce<HTMLDivElement>();
  const [rampRef, rampVisible] = useInViewOnce<HTMLDivElement>();

  const highlightSlugs = ["ocean", "sunset", "violet", "forest"];
  const featuredPalettes = highlightSlugs
    .map((slug) => BASE_THEMES.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast(`Copied ${hex} to clipboard`);
  };

  return (
    <section className="relative space-y-12 sm:space-y-14">
      <ScrollReveal variant="fade-up">
        <div className="space-y-10 sm:space-y-12">
          <EditorialDivider left="Color System" center="Liber UI" index="03" />

          {/* Centered Header with Circular & Badge */}
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Color palettes{" "}
              <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] text-xl sm:text-2xl font-medium align-middle mx-1 liber-floating-widget">
                &amp;
              </span>{" "}
              WCAG Tokens
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {TOTAL_THEMES_COUNT} calibrated palettes verified against WCAG AA &amp; AAA contrast ratios.
              Click any swatch to copy its HEX value or export ready-to-use CSS variables.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Double-Framed Elevated Card with Subtle Ambient Glow */}
      <ScrollReveal variant="scale-in" delay={150}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[85%] h-40 liber-ambient-glow blur-2xl"
        />
        {/* Subtle stacked card top lip */}
        <div
          aria-hidden="true"
          className="mx-6 h-3 rounded-t-[20px] border-t border-x border-border bg-surface-subtle/80"
        />

        <div className="relative rounded-[24px] border border-border bg-card p-7 sm:p-12 space-y-12 liber-showcase-frame">
          {/* Sub-section A: 4-col Curated Swatch Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Curated Theme Palettes
              </h3>
              <Link
                href="/themes"
                className="text-xs font-mono font-medium text-[#2563EB] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-1"
              >
                <span>Explore all {TOTAL_THEMES_COUNT}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div ref={swatchesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredPalettes.map((palette, pIdx) => {
                const primaryHex = palette.tokens.primary || palette.swatches[2] || "#2563EB";
                const motion = getRevealMotionProps(swatchesVisible, pIdx * 180, 1400);
                return (
                  <div
                    key={palette.slug}
                    style={motion.style}
                    className={`space-y-2 ${motion.className}`}
                  >
                    <div className="flex items-center justify-between text-xs px-0.5">
                      <span className="font-medium text-foreground">
                        {palette.name} <span className="text-muted-foreground font-mono">· {palette.wcagLevel}</span>
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {palette.contrastRatio}
                      </span>
                    </div>

                    <div className="rounded-[14px] border border-border overflow-hidden bg-surface-subtle">
                      <button
                        type="button"
                        onClick={() => copyHex(primaryHex.toUpperCase())}
                        title={`Copy ${primaryHex.toUpperCase()}`}
                        className="w-full h-24 flex items-center justify-center text-xs font-mono font-semibold text-white transition-opacity hover:opacity-95"
                        style={{ backgroundColor: primaryHex }}
                      >
                        <span className="px-2.5 py-1 rounded-[6px] bg-black/25 backdrop-blur-sm">
                          {primaryHex.toUpperCase()}
                        </span>
                      </button>

                      {/* 5-slice clickable tint ramp */}
                      <div className="h-10 flex">
                        {palette.swatches.map((swatch, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => copyHex(swatch.toUpperCase())}
                            title={`Copy ${swatch.toUpperCase()}`}
                            className="flex-1 h-full transition-transform hover:scale-y-110 focus:outline-none"
                            style={{ backgroundColor: swatch }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sub-section B: 9-Step Neutral / Midnight Slate Ramp */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                UI Surface &amp; Text Scale (Slate)
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">Click any stop to copy</span>
            </div>

            <div ref={rampRef} className="rounded-[14px] border border-border overflow-hidden">
              <div className="grid grid-cols-3 sm:grid-cols-9">
                {TEXT_SCALE_RAMP.map((stop, sIdx) => {
                  const motion = getRevealMotionProps(rampVisible, sIdx * 100, 1200);
                  return (
                  <button
                    key={stop.weight}
                    type="button"
                    onClick={() => copyHex(stop.hex)}
                    style={motion.style}
                    className={`group text-left focus:outline-none ${motion.className}`}
                  >
                    <div
                      className="h-12 sm:h-16 w-full transition-opacity group-hover:opacity-90"
                      style={{ backgroundColor: stop.hex }}
                    />
                    <div className="px-2.5 py-2 bg-card border-t border-border">
                      <div className="text-xs font-semibold font-mono text-foreground">{stop.weight}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">{stop.hex}</div>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sub-section C: Interactive Live Theme Tester */}
          <div className="pt-4 border-t border-border">
            <ThemeLivePreview />
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}

