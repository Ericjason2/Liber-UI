"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Code2,
  Eye,
  Laptop,
  Tablet,
  Smartphone,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe,
  BarChart3,
  Terminal,
  Star,
} from "lucide-react";
import { SAMPLE_BLOCKS, type BlockItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

// Viewport sizes
type ViewportSize = "desktop" | "tablet" | "mobile";

export default function BlocksPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [viewports, setViewports] = useState<Record<string, ViewportSize>>({});
  const [modes, setModes] = useState<Record<string, "preview" | "code">>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pricingInterval, setPricingInterval] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Blocks", count: SAMPLE_BLOCKS.length },
    { id: "hero", label: "Hero Sections", count: SAMPLE_BLOCKS.filter((b) => b.category === "hero").length },
    { id: "features", label: "Features & Bento", count: SAMPLE_BLOCKS.filter((b) => b.category === "features").length },
    { id: "pricing", label: "Pricing Tiers", count: SAMPLE_BLOCKS.filter((b) => b.category === "pricing").length },
    { id: "testimonials", label: "Testimonials", count: SAMPLE_BLOCKS.filter((b) => b.category === "testimonials").length },
    { id: "cta", label: "CTA & Forms", count: SAMPLE_BLOCKS.filter((b) => b.category === "cta").length },
    { id: "headers", label: "Headers & Nav", count: SAMPLE_BLOCKS.filter((b) => b.category === "headers").length },
    { id: "footers", label: "Footers", count: SAMPLE_BLOCKS.filter((b) => b.category === "footers").length },
  ].filter((c) => c.id === "all" || c.count > 0);

  const filtered = selectedCat === "all"
    ? SAMPLE_BLOCKS
    : SAMPLE_BLOCKS.filter((b) => b.category === selectedCat);

  const handleCopyCmd = (block: BlockItem) => {
    navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/${block.slug}.json`);
    setCopiedKey(block.slug);
    toast(`Copied ${block.name} install command`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getViewportWidth = (vp: ViewportSize) => {
    switch (vp) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  const getCodeSnippet = (slug: string): string => {
    switch (slug) {
      case "hero-centered":
        return `export function HeroCentered() {\n  return (\n    <section className="py-20 text-center space-y-6 max-w-4xl mx-auto px-4">\n      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border text-xs font-mono">\n        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />\n        <span>Liber UI v2.0 Available</span>\n      </div>\n      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">\n        Open Source UI Infrastructure\n      </h1>\n      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">\n        Pure Tailwind CSS components with zero locked runtimes.\n      </p>\n      <div className="flex justify-center gap-3">\n        <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium">\n          Get Started\n        </button>\n        <button className="px-5 py-2.5 rounded-lg border font-medium hover:bg-muted">\n          Documentation\n        </button>\n      </div>\n    </section>\n  );\n}`;
      case "pricing-three-tier":
        return `export function PricingThreeTier() {\n  return (\n    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-6">\n      {/* Starter, Pro, Enterprise tiers */}\n    </div>\n  );\n}`;
      default:
        return `import React from "react";\n\nexport function ${slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")}() {\n  return (\n    <section className="p-8 rounded-lg border bg-card text-foreground">\n      {/* Clean responsive block implementation */}\n    </section>\n  );\n}`;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Breadcrumb & Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Blocks</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-muted border border-border text-muted-foreground">
            Interactive Live Previews & Code
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 pb-2 border-b border-border">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
              UI Blocks & Section Patterns
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Production-ready marketing sections, bento grids, and interactive components built with pure Tailwind CSS and accessible primitives.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px] self-start sm:self-auto">
            <span>{filtered.length} Blocks Available</span>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedCat === c.id
                ? "bg-primary text-primary-foreground font-semibold"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{c.label}</span>
            <span className="font-mono text-[10px] opacity-70">({c.count})</span>
          </button>
        ))}
      </div>

      {/* 3. High-Quality Blocks Feed with Live Rendering & Code Tabs */}
      <div className="space-y-10">
        {filtered.map((block) => {
          const currentMode = modes[block.slug] || "preview";
          const currentVp = viewports[block.slug] || "desktop";
          const isCopied = copiedKey === block.slug;

          return (
            <article
              key={block.slug}
              id={block.slug}
              className="rounded-[10px] border border-border bg-card overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all scroll-mt-20 flex flex-col"
            >
              {/* Block Card Header Bar */}
              <div className="px-5 py-3.5 border-b border-border bg-muted/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {block.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border capitalize">
                    {block.category}
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:inline">
                    {block.description}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  {/* Viewport Toggles (only in preview mode) */}
                  {currentMode === "preview" && (
                    <div className="flex items-center rounded-[8px] border border-border bg-card p-0.5 text-xs">
                      <button
                        onClick={() =>
                          setViewports((prev) => ({ ...prev, [block.slug]: "desktop" }))
                        }
                        className={`p-1.5 rounded-[6px] transition-colors ${
                          currentVp === "desktop"
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Desktop view (100%)"
                      >
                        <Laptop className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setViewports((prev) => ({ ...prev, [block.slug]: "tablet" }))
                        }
                        className={`p-1.5 rounded-[6px] transition-colors ${
                          currentVp === "tablet"
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Tablet view (768px)"
                      >
                        <Tablet className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setViewports((prev) => ({ ...prev, [block.slug]: "mobile" }))
                        }
                        className={`p-1.5 rounded-[6px] transition-colors ${
                          currentVp === "mobile"
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        title="Mobile view (375px)"
                      >
                        <Smartphone className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Mode Switcher: Preview vs Code */}
                  <div className="flex items-center rounded-[8px] border border-border bg-card p-0.5 text-xs">
                    <button
                      onClick={() =>
                        setModes((prev) => ({ ...prev, [block.slug]: "preview" }))
                      }
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                        currentMode === "preview"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() =>
                        setModes((prev) => ({ ...prev, [block.slug]: "code" }))
                      }
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] font-medium transition-colors ${
                        currentMode === "code"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Code</span>
                    </button>
                  </div>

                  {/* Install Button */}
                  <button
                    onClick={() => handleCopyCmd(block)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-mono transition-colors ml-1"
                    title="Copy shadcn add command"
                  >
                    <Terminal className="h-3 w-3 text-muted-foreground" />
                    <span>add {block.slug}</span>
                    {isCopied ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-60" />
                    )}
                  </button>
                </div>
              </div>

              {/* Block Arena: Live Visual Render or Code Tab */}
              {currentMode === "preview" ? (
                <div className="p-4 sm:p-8 bg-muted/20 flex justify-center items-center overflow-x-auto min-h-[360px]">
                  <div
                    className={`transition-all duration-300 w-full rounded-[10px] border border-border bg-background p-6 sm:p-8 shadow-sm ${getViewportWidth(
                      currentVp
                    )}`}
                  >
                    {/* Render Real Block Component based on slug */}
                    {block.slug === "hero-centered" && (
                      <div className="text-center space-y-6 py-6 sm:py-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-mono text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Liber UI v2.0 Released · Open Source</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                          Build modern interfaces with open code
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          A unified asset library of official brand logos, accessible primitives, and curated color palettes.
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button className="px-5 py-2.5 rounded-[8px] bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity">
                            Start Building Free
                          </button>
                          <button className="px-5 py-2.5 rounded-[8px] border border-border bg-card text-foreground font-medium text-xs sm:text-sm hover:bg-muted transition-colors">
                            Documentation
                          </button>
                        </div>
                      </div>
                    )}

                    {block.slug === "hero-split-terminal" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-4">
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted text-[11px] font-mono text-muted-foreground border border-border">
                            <Zap className="h-3 w-3 text-amber-500" />
                            <span>Developer Infrastructure</span>
                          </div>
                          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                            Deploy fast, reliable APIs at the edge
                          </h2>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Zero-cold-start compute functions with globally distributed key-value storage and instant rollbacks.
                          </p>
                          <div className="flex items-center gap-3 pt-1">
                            <button className="px-4 py-2 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium">
                              Create Account
                            </button>
                            <button className="px-4 py-2 rounded-[8px] border border-border text-xs font-medium hover:bg-muted">
                              View API Docs
                            </button>
                          </div>
                        </div>

                        {/* Interactive Dark Terminal */}
                        <div className="rounded-[8px] border border-neutral-800 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs shadow-xl space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400 text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                            </div>
                            <span>terminal ~ bash</span>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <div className="text-neutral-400">$ pnpm dlx liber add hero-centered</div>
                            <div className="text-emerald-400">✔ Resolving dependencies (react, tailwindcss)...</div>
                            <div className="text-emerald-400">✔ Writing components/HeroCentered.tsx</div>
                            <div className="text-neutral-300">
                              <span className="text-blue-400">Ready:</span> Component imported successfully in 142ms.
                            </div>
                            <div className="flex items-center gap-1 text-neutral-400 pt-1">
                              <span>$</span>
                              <span className="w-2 h-4 bg-primary inline-block animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.slug === "bento-features" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                        <div className="md:col-span-2 p-5 rounded-[8px] border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              Real-Time Telemetry
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-foreground">Global API Metrics & Analytics</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Granular latency distribution, edge hit ratios, and anomaly detection updated every 5 seconds.
                          </p>
                          <div className="h-16 flex items-end gap-1.5 pt-2">
                            {[30, 45, 60, 40, 75, 55, 90, 80, 100, 85].map((h, i) => (
                              <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="flex-1 bg-primary/20 hover:bg-primary rounded-t transition-colors cursor-pointer"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="p-5 rounded-[8px] border border-border bg-card space-y-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <Globe className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground">Edge CDN</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            280+ POP locations worldwide with sub-10ms response times.
                          </p>
                          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                            Avg: 8.4ms latency
                          </div>
                        </div>

                        <div className="p-5 rounded-[8px] border border-border bg-card space-y-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground">Zero-Trust Security</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            SOC2 Type II certified and TLS 1.3 enforced across all endpoints.
                          </p>
                        </div>

                        <div className="md:col-span-2 p-5 rounded-[8px] border border-border bg-card space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                              <Zap className="h-4 w-4" />
                            </div>
                            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              Auto-Scale
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-foreground">Instant Serverless Elasticity</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Scales seamlessly from 0 to 100,000 requests per second with automatic load rebalancing.
                          </p>
                        </div>
                      </div>
                    )}

                    {block.slug === "metric-stats-bar" && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        <div className="space-y-1 sm:pr-4">
                          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                            99.99%
                          </div>
                          <div className="text-xs text-muted-foreground">Uptime Guarantee</div>
                          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            +0.04% this month
                          </div>
                        </div>

                        <div className="space-y-1 pt-3 sm:pt-0 sm:px-4">
                          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                            12ms
                          </div>
                          <div className="text-xs text-muted-foreground">P99 Edge Latency</div>
                          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            -4ms speedup
                          </div>
                        </div>

                        <div className="space-y-1 pt-3 sm:pt-0 sm:px-4">
                          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                            4.8M+
                          </div>
                          <div className="text-xs text-muted-foreground">Assets Downloaded</div>
                          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            +42% growth
                          </div>
                        </div>

                        <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
                          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                            0.001%
                          </div>
                          <div className="text-xs text-muted-foreground">Error Rate</div>
                          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                            Standard AA+
                          </div>
                        </div>
                      </div>
                    )}

                    {block.slug === "pricing-three-tier" && (
                      <div className="space-y-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <span
                            className={`text-xs font-medium cursor-pointer ${
                              pricingInterval === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground"
                            }`}
                            onClick={() => setPricingInterval("monthly")}
                          >
                            Monthly billing
                          </span>
                          <button
                            onClick={() =>
                              setPricingInterval(pricingInterval === "monthly" ? "yearly" : "monthly")
                            }
                            className="w-10 h-5 rounded-full bg-muted border border-border p-0.5 relative transition-colors"
                          >
                            <span
                              className={`w-4 h-4 rounded-full bg-primary block transition-transform ${
                                pricingInterval === "yearly" ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-xs font-medium cursor-pointer ${
                              pricingInterval === "yearly" ? "text-foreground font-semibold" : "text-muted-foreground"
                            }`}
                            onClick={() => setPricingInterval("yearly")}
                          >
                            Annual billing <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">(Save 20%)</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Starter */}
                          <div className="p-5 rounded-[8px] border border-border bg-card space-y-4">
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">Hobby</h3>
                              <p className="text-xs text-muted-foreground">For side projects and experiments</p>
                            </div>
                            <div className="text-2xl font-bold font-mono text-foreground">
                              $0 <span className="text-xs font-normal text-muted-foreground">/ month</span>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">✔ Up to 10,000 monthly requests</li>
                              <li className="flex items-center gap-2">✔ Free CDN bandwidth</li>
                              <li className="flex items-center gap-2">✔ Community Discord support</li>
                            </ul>
                            <button className="w-full py-2 rounded-[6px] border border-border bg-muted hover:bg-muted/80 text-xs font-medium text-foreground transition-colors">
                              Deploy Free
                            </button>
                          </div>

                          {/* Pro */}
                          <div className="p-5 rounded-[8px] border-2 border-primary bg-card space-y-4 relative shadow-sm">
                            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary text-primary-foreground font-semibold">
                              Popular
                            </span>
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">Pro Tier</h3>
                              <p className="text-xs text-muted-foreground">For production apps and fast teams</p>
                            </div>
                            <div className="text-2xl font-bold font-mono text-foreground">
                              {pricingInterval === "monthly" ? "$29" : "$23"}{" "}
                              <span className="text-xs font-normal text-muted-foreground">/ month</span>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2 text-foreground font-medium">✔ 1 Million monthly requests</li>
                              <li className="flex items-center gap-2 text-foreground font-medium">✔ Unlimited custom domains</li>
                              <li className="flex items-center gap-2 text-foreground font-medium">✔ 99.99% Uptime SLA</li>
                              <li className="flex items-center gap-2 text-foreground font-medium">✔ Priority technical support</li>
                            </ul>
                            <button className="w-full py-2 rounded-[6px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                              Get Pro Access
                            </button>
                          </div>

                          {/* Enterprise */}
                          <div className="p-5 rounded-[8px] border border-border bg-card space-y-4">
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">Enterprise</h3>
                              <p className="text-xs text-muted-foreground">Dedicated infrastructure and compliance</p>
                            </div>
                            <div className="text-2xl font-bold font-mono text-foreground">
                              Custom
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">✔ Dedicated isolated VPC clusters</li>
                              <li className="flex items-center gap-2">✔ Custom SAML SSO & audit logs</li>
                              <li className="flex items-center gap-2">✔ 24/7 dedicated engineering SLA</li>
                            </ul>
                            <button className="w-full py-2 rounded-[6px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors">
                              Contact Sales
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {block.slug === "testimonials-grid" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                        {[
                          {
                            name: "Sarah Chen",
                            handle: "@sarah_codes",
                            role: "Staff Engineer at Supabase",
                            quote:
                              "Liber UI has saved our front-end team hundreds of hours. Having official brand logos and accessible primitives in a single CLI changed our workflow.",
                          },
                          {
                            name: "Alexandre Dupont",
                            handle: "@alex_dev",
                            role: "CTO at HyperScale",
                            quote:
                              "The color themes with verified WCAG AAA contrast are exceptional. We plugged the CSS variables directly into our design tokens in minutes.",
                          },
                          {
                            name: "Kwame Mensah",
                            handle: "@kwamem",
                            role: "Founder at PayBridge Africa",
                            quote:
                              "Having African fintech and telecom vectors like Orange Money and MTN MoMo available with matching monochrome variants is a breath of fresh air.",
                          },
                        ].map((t, idx) => (
                          <div key={idx} className="p-4 rounded-[8px] border border-border bg-card space-y-3 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-amber-500" />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed italic">
                                "{t.quote}"
                              </p>
                            </div>
                            <div className="pt-2 border-t border-border flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center font-mono">
                                {t.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-foreground">{t.name}</div>
                                <div className="text-[10px] text-muted-foreground">{t.role}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.slug === "authentication-sheet" && (
                      <div className="max-w-sm mx-auto p-6 rounded-[10px] border border-border bg-card space-y-4 shadow-sm">
                        <div className="text-center space-y-1">
                          <h3 className="text-lg font-bold text-foreground">Welcome back</h3>
                          <p className="text-xs text-muted-foreground">Sign in to your Liber account</p>
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <label className="text-[11px] font-mono text-muted-foreground">Email</label>
                            <input
                              type="email"
                              placeholder="developer@company.com"
                              className="w-full h-9 px-3 rounded-[6px] border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-muted-foreground">Password</label>
                            <input
                              type="password"
                              placeholder="••••••••••••"
                              className="w-full h-9 px-3 rounded-[6px] border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <button className="w-full h-9 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:opacity-90 transition-opacity">
                            Sign In with Email
                          </button>
                        </div>
                        <div className="relative flex items-center justify-center text-[11px] text-muted-foreground">
                          <span className="bg-card px-2">or continue with</span>
                          <div className="absolute inset-0 flex items-center -z-10">
                            <div className="w-full border-t border-border" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="h-8 rounded-[6px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors">
                            GitHub
                          </button>
                          <button className="h-8 rounded-[6px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors">
                            Google SSO
                          </button>
                        </div>
                      </div>
                    )}

                    {block.slug === "footer-technical" && (
                      <div className="py-4 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                          <div className="space-y-2">
                            <div className="font-mono font-semibold text-foreground uppercase tracking-wider text-[11px]">
                              Products
                            </div>
                            <ul className="space-y-1.5 text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground">Logos Catalog</a></li>
                              <li><a href="#" className="hover:text-foreground">UI Blocks</a></li>
                              <li><a href="#" className="hover:text-foreground">Color Themes</a></li>
                              <li><a href="#" className="hover:text-foreground">Web Fonts</a></li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="font-mono font-semibold text-foreground uppercase tracking-wider text-[11px]">
                              Developers
                            </div>
                            <ul className="space-y-1.5 text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground">CLI Guide</a></li>
                              <li><a href="#" className="hover:text-foreground">Registry API</a></li>
                              <li><a href="#" className="hover:text-foreground">GitHub Repo</a></li>
                              <li><a href="#" className="hover:text-foreground">Changelog</a></li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="font-mono font-semibold text-foreground uppercase tracking-wider text-[11px]">
                              Legal
                            </div>
                            <ul className="space-y-1.5 text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground">Trademark Notice</a></li>
                              <li><a href="#" className="hover:text-foreground">Takedown Policy</a></li>
                              <li><a href="#" className="hover:text-foreground">Privacy Terms</a></li>
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="font-mono font-semibold text-foreground uppercase tracking-wider text-[11px]">
                              System Status
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>All Systems Operational</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              CDN edge caches operating at 99.99% availability.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 font-mono">
                          <span>© 2026 Liber UI. Free Open Source Developer Asset Library.</span>
                          <span>MIT Licensed Code · Trademarks belong to their owners.</span>
                        </div>
                      </div>
                    )}

                    {block.slug === "faq-accordion-grid" && (
                      <div className="space-y-4 max-w-2xl mx-auto py-2">
                        <div className="text-center space-y-1 pb-2">
                          <h3 className="text-lg font-bold text-foreground">Frequently Asked Questions</h3>
                          <p className="text-xs text-muted-foreground">Everything you need to know about licensing, installation, and usage.</p>
                        </div>
                        {[
                          {
                            q: "Is Liber UI 100% free for commercial use?",
                            a: "Yes. All code for blocks, components, themes, and font configurations is distributed under the MIT license with zero subscription fees or locked tiers.",
                          },
                          {
                            q: "What is the legal status of technology brand logos?",
                            a: "Logos are registered trademarks of their respective owners. They are distributed in SVG format solely to identify technologies in your tech stacks according to official brand guidelines.",
                          },
                          {
                            q: "Can I use Liber with Next.js, Vite, or Remix?",
                            a: "Absolutely. Resources are installed directly as source code into your project or imported from @liber/react.",
                          },
                        ].map((faq, i) => (
                          <div
                            key={i}
                            className="rounded-[8px] border border-border bg-card p-3.5 transition-colors cursor-pointer"
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          >
                            <div className="flex items-center justify-between font-medium text-xs text-foreground">
                              <span>{faq.q}</span>
                              <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform ${
                                  openFaq === i ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                            {openFaq === i && (
                              <p className="pt-2 text-xs text-muted-foreground leading-relaxed border-t border-border/60 mt-2">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {block.slug === "cta-newsletter-card" && (
                      <div className="p-6 sm:p-8 rounded-[10px] border border-border bg-card text-center space-y-4 max-w-xl mx-auto">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-foreground">Stay updated on new developer assets</h3>
                          <p className="text-xs text-muted-foreground">
                            Receive notifications when new tech logos, blocks, and palettes are published. Zero spam.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                          <input
                            type="email"
                            placeholder="Enter your work email..."
                            className="w-full h-10 px-3.5 rounded-[8px] border border-border bg-muted/30 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <button
                            onClick={() => toast("Subscribed to release notes!")}
                            className="w-full sm:w-auto h-10 px-4 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                          >
                            Subscribe Free
                          </button>
                        </div>
                      </div>
                    )}

                    {block.slug === "header-navigation-bar" && (
                      <header className="rounded-[8px] border border-border bg-card p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 font-mono font-bold text-foreground">
                            <span className="w-5 h-5 rounded-[4px] bg-primary text-primary-foreground flex items-center justify-center text-[11px]">
                              L
                            </span>
                            <span>Liber</span>
                          </div>
                          <nav className="hidden sm:flex items-center gap-4 text-muted-foreground font-medium">
                            <span className="text-foreground">Logos</span>
                            <span className="hover:text-foreground cursor-pointer">Blocks</span>
                            <span className="hover:text-foreground cursor-pointer">Themes</span>
                            <span className="hover:text-foreground cursor-pointer">Fonts</span>
                          </nav>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-muted-foreground bg-muted px-2 py-1 rounded-[6px] border border-border">
                            <span>⌘K Search</span>
                          </div>
                          <button className="h-7 px-2.5 rounded-[6px] bg-primary text-primary-foreground font-medium text-[11px]">
                            Get Started
                          </button>
                        </div>
                      </header>
                    )}
                  </div>
                </div>
              ) : (
                /* Code Tab with Syntax Preview */
                <div className="p-4 sm:p-6 bg-neutral-950 font-mono text-xs overflow-x-auto relative">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-neutral-400 text-[11px] mb-3">
                    <span>{block.slug}.tsx</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getCodeSnippet(block.slug));
                        toast("Copied component source code");
                      }}
                      className="flex items-center gap-1 text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy JSX</span>
                    </button>
                  </div>
                  <pre className="text-neutral-200 leading-relaxed select-all">
                    {getCodeSnippet(block.slug)}
                  </pre>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
