"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu, X, Palette, Type, Check, RotateCcw } from "lucide-react";
import { GithubMono } from "@liber-ui/react";
import { useTheme } from "@/context/ThemeContext";
import { CommandPalette } from "./CommandPalette";

const QUICK_PALETTES = [
  { slug: "neutral", name: "Neutral", hex: "#171717" },
  { slug: "ocean", name: "Ocean", hex: "#2563eb" },
  { slug: "emerald", name: "Emerald", hex: "#059669" },
  { slug: "violet", name: "Violet", hex: "#7c3aed" },
  { slug: "amber", name: "Amber", hex: "#d97706" },
  { slug: "rose", name: "Rose", hex: "#e11d48" },
  { slug: "sunset", name: "Sunset", hex: "#ea580c" },
  { slug: "midnight-oled", name: "Midnight", hex: "#0284c7" },
  { slug: "catppuccin-mocha", name: "Mocha", hex: "#cba6f7" },
];

const QUICK_FONTS = [
  { slug: "inter", name: "Inter", desc: "Clean UI" },
  { slug: "geist", name: "Geist", desc: "Engineered" },
  { slug: "roboto", name: "Roboto", desc: "Classic" },
  { slug: "dm-sans", name: "DM Sans", desc: "Geometric" },
  { slug: "jetbrains-mono", name: "JetBrains", desc: "Code" },
  { slug: "space-grotesk", name: "Space Grotesk", desc: "Modern" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, activePalette, setActivePalette, activeFont, setActiveFont } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const customizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (customizerRef.current && !customizerRef.current.contains(e.target as Node)) {
        setCustomizerOpen(false);
      }
    };
    if (customizerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [customizerOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setSearchOpen(false);
    setCustomizerOpen(false);
  }

  const navLinks = [
    { href: "/logos", label: "Logos" },
    { href: "/blocks", label: "Blocks" },
    { href: "/components", label: "Components" },
    { href: "/themes", label: "Themes" },
    { href: "/fonts", label: "Fonts" },
    { href: "/docs", label: "Docs" },
  ];

  const currentThemeObj =
    QUICK_PALETTES.find((p) => p.slug === activePalette) || {
      slug: "neutral",
      name: "Neutral",
      hex: "#171717",
    };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="max-w-[1280px] mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Left Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
              <span className="text-base font-semibold">Liber UI</span>
              <span className="rounded-[6px] border border-border bg-surface-subtle px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                v0.1.0
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-[6px] text-sm transition-colors ${
                      isActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-[11px] left-2 right-2 h-[2px] bg-foreground rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-surface-subtle px-3 text-xs text-muted-foreground hover:text-foreground hover:border-neutral-400 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search catalog...</span>
              <kbd className="hidden sm:inline-block rounded-[6px] border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Global Theme & Font Customizer */}
            <div className="relative" ref={customizerRef}>
              <button
                onClick={() => setCustomizerOpen((prev) => !prev)}
                aria-label="Customize global theme and font"
                title="Global theme and font switcher"
                className={`flex h-9 items-center gap-1.5 rounded-[10px] border px-2.5 text-xs font-medium transition-colors ${
                  customizerOpen
                    ? "border-foreground bg-muted text-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span
                  className="h-2.5 w-2.5 rounded-full border border-black/10 dark:border-white/20"
                  style={{ backgroundColor: currentThemeObj?.hex ?? "#171717" }}
                />
                <span className="hidden xl:inline text-[11px] capitalize">{activePalette}</span>
              </button>

              {customizerOpen && (
                <div className="absolute right-0 top-11 w-80 rounded-[12px] border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div>
                      <div className="text-xs font-semibold text-foreground">Global Previewer</div>
                      <div className="text-[11px] text-muted-foreground">Applies live across all previews</div>
                    </div>
                    <button
                      onClick={() => {
                        setActivePalette("neutral");
                        setActiveFont("inter");
                      }}
                      title="Reset defaults"
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Palette Selector */}
                  <div className="pt-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                      <Palette className="h-3 w-3 text-muted-foreground" />
                      <span>Color Palette</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {QUICK_PALETTES.map((p) => {
                        const isSelected = activePalette === p.slug;
                        return (
                          <button
                            key={p.slug}
                            onClick={() => setActivePalette(p.slug)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-[6px] border text-left text-[11px] transition-all ${
                              isSelected
                                ? "border-foreground bg-muted font-semibold text-foreground"
                                : "border-border/60 hover:border-border hover:bg-surface-subtle text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: p.hex }}
                            />
                            <span className="truncate">{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font Selector */}
                  <div className="pt-4 border-t border-border mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                      <Type className="h-3 w-3 text-muted-foreground" />
                      <span>Typography</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {QUICK_FONTS.map((f) => {
                        const isSelected = activeFont === f.slug;
                        return (
                          <button
                            key={f.slug}
                            onClick={() => setActiveFont(f.slug)}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-[6px] border text-left text-xs transition-all ${
                              isSelected
                                ? "border-foreground bg-muted font-semibold text-foreground"
                                : "border-border/60 hover:border-border hover:bg-surface-subtle text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="truncate">{f.name}</span>
                            {isSelected && <Check className="h-3 w-3 text-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Mode */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="https://github.com/Ericjason2/Liber-UI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <GithubMono size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <Link href="/sign-in" className="hover:text-foreground">Sign in</Link>
              <Link href="/legal" className="hover:text-foreground">Legal & Trademarks</Link>
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
