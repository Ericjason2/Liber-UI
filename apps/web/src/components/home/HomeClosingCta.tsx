"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialDivider, FloatingToolDock, FloatingFillInspector } from "./HomePrimitives";
import { ScrollParallax, ScrollReveal, getRevealMotionProps, useInViewOnce } from "./ScrollReveal";

/**
 * Module 6 — Value Proposition & Closing Bookend CTA inspired by Behance Module 12.
 * Reprises the floating tilted design-tool widgets flanking a bold typographic inline pill CTA.
 */
export function HomeClosingCta() {
  const [cardsRef, cardsVisible] = useInViewOnce<HTMLDivElement>();

  const cardMotion = (idx: number) => {
    const m = getRevealMotionProps(cardsVisible, idx * 90, 600);
    return {
      style: m.style,
      className: `p-6 rounded-[18px] border border-border bg-card space-y-2 ${m.className}`,
    };
  };

  return (
    <section className="space-y-20 sm:space-y-28 pb-12">
      <ScrollReveal variant="fade-up">
        <EditorialDivider left="Start Building" center="Liber UI" index="∞" />
      </ScrollReveal>

      {/* 3-Column Open Code Value Proposition */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div {...cardMotion(0)}>
          <div className="text-[11px] font-mono text-[#2563EB] dark:text-[#38BDF8]">01 · OWNERSHIP</div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Open code: you own what you install
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every logo, primitive, and token lands straight in your repository. No hidden black-box
            dependencies, no version locks, and zero runtime overhead.
          </p>
        </div>

        <div {...cardMotion(1)}>
          <div className="text-[11px] font-mono text-[#2563EB] dark:text-[#38BDF8]">02 · COMPOSABLE</div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Composable primitives across stacks
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Constructed with standard Tailwind utility classes and clean React/SVG output. Refactor
            and customize freely without fighting conflicting CSS overrides.
          </p>
        </div>

        <div {...cardMotion(2)}>
          <div className="text-[11px] font-mono text-[#2563EB] dark:text-[#38BDF8]">03 · THEMEABLE</div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Semantic tokens, light and dark
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every asset references consistent semantic CSS variables. Switch color themes or toggle
            Midnight Slate dark mode instantaneously.
          </p>
        </div>
      </div>

      {/* Closing Bookend Statement with Inline Pill CTA & Floating Tool Widgets */}
      <ScrollReveal variant="scale-in" delay={100}>
      <div className="relative max-w-4xl mx-auto py-10 sm:py-20 text-center">
        {/* Left Tilted Tool Dock */}
        <ScrollParallax speed={-0.09} className="hidden lg:block absolute top-2 -left-10 z-10">
          <div className="-rotate-12">
            <FloatingToolDock />
          </div>
        </ScrollParallax>

        {/* Right Tilted Fill Popover */}
        <ScrollParallax speed={0.08} className="hidden lg:block absolute -top-4 -right-10 z-10">
          <div className="rotate-6">
            <FloatingFillInspector hex="0F172A" opacity="100%" />
          </div>
        </ScrollParallax>

        <h2 className="text-3xl sm:text-5xl md:text-[54px] font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
          Ship your next
          <br />
          interface{" "}
          <span className="text-[#2563EB] dark:text-[#38BDF8]">faster with</span>
          <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-3 mt-1">
            <span>Liber</span>
            <Link
              href="/logos"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] text-base sm:text-xl font-medium tracking-normal liber-floating-widget hover:opacity-90 transition-opacity align-middle"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <span>UI</span>
          </span>
        </h2>
      </div>
      </ScrollReveal>
    </section>
  );
}

