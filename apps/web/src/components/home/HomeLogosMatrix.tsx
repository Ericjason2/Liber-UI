"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialDivider, TiltedPill } from "./HomePrimitives";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";

/**
 * Module 2 — Full-width Official Logos tile matrix inspired by Behance Module 7 (Icons Grid).
 * Displays 48 real Liber vector logos with rhythmic accent tiles and a bottom gradient fade CTA.
 */
export function HomeLogosMatrix() {
  const displayLogos = OFFICIAL_LOGOS.slice(0, 48);
  const accentIndices = new Set([2, 10, 17, 29, 34, 42]);

  return (
    <section className="space-y-12 sm:space-y-14">
      <EditorialDivider left="Logos & Vectors" center="Liber UI" index="02" />

      {/* Asymmetric Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="relative inline-flex items-center flex-wrap gap-3">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              150 Official Tech Logos
            </h2>
            <TiltedPill className="rotate-3 -translate-y-1 sm:-translate-y-2">
              SVG &amp; TSX
            </TiltedPill>
          </div>
        </div>

        <div className="max-w-md space-y-2">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Sanitized SVGO vectors delivered in Color, Monochrome (<code>currentColor</code>), and
            Wordmark variants—installable via React components, CSS classes, or direct CDN.
          </p>
          <Link
            href="/logos"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
          >
            <span>Explore all {OFFICIAL_LOGOS.length} logos</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 12 x 4 Responsive Squircle Matrix with Bottom Fade */}
      <div className="relative">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3.5 sm:gap-4">
          {displayLogos.map((logo, idx) => {
            const isAccent = accentIndices.has(idx);
            return (
              <Link
                key={logo.slug}
                href={`/logos/${logo.slug}`}
                title={`${logo.name} — View SVG, React & CDN`}
                className={`group aspect-square rounded-[14px] border flex items-center justify-center p-3 transition-all hover:-translate-y-0.5 ${
                  isAccent
                    ? "bg-[#2563EB] dark:bg-[#38BDF8] border-[#2563EB] dark:border-[#38BDF8] liber-floating-widget"
                    : "bg-card border-border hover:border-foreground/40"
                }`}
              >
                {isAccent ? (
                  <div
                    aria-label={logo.name}
                    className="h-7 w-7 sm:h-8 sm:w-8 bg-white dark:bg-[#090D16] transition-transform group-hover:scale-110"
                    style={{
                      WebkitMaskImage: `url('/svg/${logo.slug}/mono.svg')`,
                      maskImage: `url('/svg/${logo.slug}/mono.svg')`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`/svg/${logo.slug}/color.svg`}
                    alt={logo.name}
                    className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform group-hover:scale-110"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Soft Fade Overlay & Centered Pill Action */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/85 to-transparent flex items-end justify-center pb-2">
          <Link
            href="/logos"
            className="pointer-events-auto h-10 px-5 rounded-full border border-border bg-card text-foreground text-xs font-mono font-medium hover:border-foreground/50 transition-colors inline-flex items-center gap-2 liber-floating-widget"
          >
            <span>Browse all {OFFICIAL_LOGOS.length} official logos</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

