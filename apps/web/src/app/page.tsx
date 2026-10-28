"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Layout,
  Box,
  Palette,
  Type,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { InstallStrip } from "@/components/InstallStrip";
import { ThemeLivePreview } from "@/components/ThemeLivePreview";
import { CommandPalette } from "@/components/CommandPalette";
import { useToast } from "@/context/ToastContext";
import {
  OFFICIAL_LOGOS,
  SAMPLE_BLOCKS,
  SAMPLE_COMPONENTS,
  SAMPLE_THEMES,
  SAMPLE_FONTS,
} from "@/lib/catalog";

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCmd = (cmd: string, slug: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedSlug(slug);
    toast("Copied install command");
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const familyCards = [
    {
      name: "Logos",
      desc: "Developer tool & framework SVGs.",
      count: `${OFFICIAL_LOGOS.length} logos`,
      href: "/logos",
      icon: Sparkles,
    },
    {
      name: "Blocks",
      desc: "Full page compositions and layouts.",
      count: `${SAMPLE_BLOCKS.length} blocks`,
      href: "/blocks",
      icon: Layout,
    },
    {
      name: "Components",
      desc: "Accessible UI primitive elements.",
      count: `${SAMPLE_COMPONENTS.length} components`,
      href: "/components",
      icon: Box,
    },
    {
      name: "Themes",
      desc: "Semantic token palette configs.",
      count: `${SAMPLE_THEMES.length} themes`,
      href: "/themes",
      icon: Palette,
    },
    {
      name: "Fonts",
      desc: "Tested open-license typographies.",
      count: `${SAMPLE_FONTS.length} fonts`,
      href: "/fonts",
      icon: Type,
    },
  ];

  const featuredLogo = OFFICIAL_LOGOS[0];
  const featuredBlock = SAMPLE_BLOCKS[0];
  const featuredTheme = SAMPLE_THEMES[0];
  const featuredFont = SAMPLE_FONTS[0];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-28 sm:space-y-36">
      {/* 1. Centered Hero */}
      <section className="text-center space-y-8 max-w-3xl mx-auto pt-8 sm:pt-12">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.12]">
          Open code for polished interfaces.
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Logos, blocks, components, themes and fonts. Copy the code or install it with one command.
        </p>

        {/* Wide Search Bar */}
        <div className="pt-2 max-w-[640px] mx-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between h-12 px-4 rounded-[10px] border border-border bg-card text-sm text-muted-foreground hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4" />
              <span>Search logos, blocks, themes, fonts...</span>
            </div>
            <kbd className="hidden sm:inline-block rounded-[6px] border border-border bg-surface-subtle px-2 py-0.5 text-xs font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/logos"
            className="h-10 px-5 rounded-[10px] bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            Browse catalog
          </Link>
          <Link
            href="/docs"
            className="h-10 px-5 rounded-[10px] border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center"
          >
            Read the docs
          </Link>
        </div>
      </section>

      {/* 2. Install Strip */}
      <section>
        <InstallStrip />
      </section>

      {/* 3. Five Family Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {familyCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="group p-6 rounded-[10px] border border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-[10px] border border-border bg-surface-subtle flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{card.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs font-mono text-muted-foreground">
                <span>{card.count}</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* 4. Value Proposition Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 border-y border-border">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Open code: you own what you install</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every component and block lands directly in your repository. No hidden black box
            dependencies, no version locks, and no runtime overhead.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            Composable: every block is built from the same primitives
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Constructed with standard Tailwind utility classes and battle-tested headless primitives.
            Refactor and customize without fighting conflicting CSS abstractions.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Themeable: semantic tokens, light and dark</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every asset references consistent semantic tokens. Switch entire palettes or adapt
            seamlessly between light and dark modes with simple CSS variables.
          </p>
        </div>
      </section>

      {/* 5. Recently Added Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Recently Added</h2>
            <p className="text-sm text-muted-foreground">Fresh additions across all asset families.</p>
          </div>
          <Link
            href="/logos"
            className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <span>View all assets</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Logo Card */}
          {featuredLogo && (
            <div className="p-4 rounded-[10px] border border-border bg-card space-y-4 flex flex-col justify-between">
              <Link href={`/logos/${featuredLogo.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-[10px] border border-border bg-surface-subtle flex items-center justify-center p-1">
                    <img
                      src={`/svg/${featuredLogo.slug}/color.svg`}
                      alt={featuredLogo.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Logo
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {featuredLogo.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{featuredLogo.description}</p>
                </div>
              </Link>
              <button
                onClick={() =>
                  handleCopyCmd(
                    `pnpm dlx shadcn add https://liber.dev/r/${featuredLogo.slug}.json`,
                    featuredLogo.slug,
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">add {featuredLogo.slug}</span>
                {copiedSlug === featuredLogo.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          )}

          {/* Block Card */}
          {featuredBlock && (
            <div className="p-4 rounded-[10px] border border-border bg-card space-y-4 flex flex-col justify-between">
              <Link href={`/blocks#${featuredBlock.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-7 rounded bg-neutral-900 dark:bg-neutral-100" />
                    <div className="h-2 w-5 rounded bg-neutral-300 dark:bg-neutral-700" />
                    <div className="h-2 w-4 rounded bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground uppercase">
                    Block
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {featuredBlock.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{featuredBlock.description}</p>
                </div>
              </Link>
              <button
                onClick={() =>
                  handleCopyCmd(
                    `pnpm dlx shadcn add https://liber.dev/r/${featuredBlock.slug}.json`,
                    featuredBlock.slug,
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">add {featuredBlock.slug}</span>
                {copiedSlug === featuredBlock.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          )}

          {/* Theme Card */}
          {featuredTheme && (
            <div className="p-4 rounded-[10px] border border-border bg-card space-y-4 flex flex-col justify-between">
              <Link href={`/themes#${featuredTheme.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {featuredTheme.swatches.slice(0, 4).map((c, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-[4px] border border-border"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Theme
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {featuredTheme.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{featuredTheme.description}</p>
                </div>
              </Link>
              <button
                onClick={() =>
                  handleCopyCmd(
                    `pnpm dlx shadcn add https://liber.dev/r/theme-${featuredTheme.slug}.json`,
                    featuredTheme.slug,
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">copy tokens</span>
                {copiedSlug === featuredTheme.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          )}

          {/* Font Card */}
          {featuredFont && (
            <div className="p-4 rounded-[10px] border border-border bg-card space-y-4 flex flex-col justify-between">
              <Link href={`/fonts#${featuredFont.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-medium">Aa</span>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Font
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {featuredFont.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{featuredFont.description}</p>
                </div>
              </Link>
              <button
                onClick={() =>
                  handleCopyCmd(
                    `pnpm dlx shadcn add https://liber.dev/r/font-${featuredFont.slug}.json`,
                    featuredFont.slug,
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">add font-{featuredFont.slug}</span>
                {copiedSlug === featuredFont.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Try a theme live */}
      <section>
        <ThemeLivePreview />
      </section>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
