"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialDivider, TiltedPill } from "./HomePrimitives";
import { BASE_FONTS, TOTAL_FONTS_COUNT } from "@/lib/catalog-fonts-base";

const TYPE_SCALE_ROWS = [
  { label: "H1 Headline", sample: "H1 Display Scale", size: "64px", weight: "Bold", className: "text-3xl sm:text-5xl font-bold tracking-tight" },
  { label: "H2 Headline", sample: "H2 Section Header", size: "48px", weight: "Bold", className: "text-2xl sm:text-4xl font-bold tracking-tight" },
  { label: "H3 Headline", sample: "H3 Card Title", size: "32px", weight: "Semi-Bold", className: "text-xl sm:text-2xl font-semibold tracking-tight" },
  { label: "H4 Headline", sample: "H4 Component Label", size: "24px", weight: "Medium", className: "text-lg sm:text-xl font-medium" },
  { label: "Body-Text", sample: "Body readable interface text crafted for screens.", size: "16px", weight: "Regular", className: "text-sm sm:text-base font-normal" },
  { label: "Geist Mono", sample: "npx @liber-ui/cli add font-geist", size: "14px", weight: "Mono", className: "text-xs sm:text-sm font-mono text-[#2563EB] dark:text-[#38BDF8]" },
];

/**
 * Module 4 — Typography Guidelines & Type Scale inspired by Behance Module 4.
 * Features the signature oversized faint "Aa" watermark, dashed horizontal ruler rows,
 * and quick-access links into Liber UI's 7,382+ open-license font catalog.
 */
export function HomeTypographyShowcase() {
  const featuredSlugs = ["geist", "inter", "jetbrains-mono", "playfair-display"];
  const featuredFonts = featuredSlugs
    .map((slug) => BASE_FONTS.find((f) => f.slug === slug))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section className="space-y-10">
      <EditorialDivider left="Typography" center="Liber UI" index="04" />

      {/* Asymmetric Header with Giant Background "Aa" Watermark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative py-4">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-6 left-2 text-[110px] sm:text-[140px] font-bold leading-none text-foreground/[0.04] dark:text-foreground/[0.05] tracking-tighter"
          >
            Aa
          </span>
          <div className="relative inline-flex items-center flex-wrap gap-3">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Typography
            </h2>
            <TiltedPill className="-rotate-3">
              {TOTAL_FONTS_COUNT.toLocaleString()}+ Fonts
            </TiltedPill>
          </div>
        </div>

        <div className="space-y-2.5 max-w-lg lg:ml-auto">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            About Geist &amp; Open-License Fonts
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Our interface pairs calibrated Geist &amp; Geist Mono scales with direct CSS CDN imports
            and raw <code>.ttf</code> streaming across more than {TOTAL_FONTS_COUNT.toLocaleString()} free
            typefaces (SIL OFL &amp; Apache 2.0).
          </p>
          <Link
            href="/fonts"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
          >
            <span>Explore all {TOTAL_FONTS_COUNT.toLocaleString()} fonts</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Double-Framed Type Scale Card with Dashed Dividers */}
      <div className="rounded-[24px] border border-border bg-card p-4 sm:p-8 liber-showcase-frame space-y-8">
        <div className="rounded-[16px] border border-border bg-surface-subtle/50 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 items-center px-5 py-3.5 border-b border-border bg-card text-xs font-mono font-medium text-muted-foreground">
            <div className="col-span-7 sm:col-span-8">Text Scaling</div>
            <div className="col-span-2 text-right sm:text-left">Size</div>
            <div className="col-span-3 sm:col-span-2 text-right">Weight</div>
          </div>

          {/* Dashed Horizontal Rows */}
          <div className="divide-y divide-dashed divide-border px-5 bg-card">
            {TYPE_SCALE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 items-center py-4 sm:py-5 gap-3"
              >
                <div className={`col-span-7 sm:col-span-8 truncate text-foreground ${row.className}`}>
                  {row.sample}
                </div>
                <div className="col-span-2 text-right sm:text-left text-xs font-mono text-muted-foreground">
                  {row.size}
                </div>
                <div className="col-span-3 sm:col-span-2 text-right text-xs font-medium text-foreground">
                  {row.weight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Featured Open Fonts Quick Links */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Popular Font Families · Instant CSS CDN &amp; TTF</span>
            <Link href="/fonts" className="hover:text-foreground transition-colors">
              A–Z Directory →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredFonts.map((font) => (
              <Link
                key={font.slug}
                href={`/fonts/${font.slug}`}
                className="group p-4 rounded-[14px] border border-border bg-surface-subtle/50 hover:bg-card hover:border-foreground/40 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold tracking-tight text-foreground">Aa</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-card text-muted-foreground">
                    {font.license}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                    {font.name}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{font.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

