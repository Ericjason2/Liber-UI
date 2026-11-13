"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubMono } from "@liber-ui/logo";
import { useTheme } from "@/context/ThemeContext";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu and search on pathname change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }

  // Close mobile menu automatically on window resize >= 768px (md)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/logos", label: "Logos" },
    { href: "/animations", label: "Animations" },
    { href: "/components", label: "Components" },
    { href: "/themes", label: "Themes" },
    { href: "/fonts", label: "Fonts" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Left Brand + Desktop Nav (starts at md: 768px with calibrated density) */}
          <div className="flex items-center gap-3 lg:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[6px]"
            >
              <span className="text-base font-semibold">Liber UI</span>
              <span className="rounded-[6px] border border-border bg-surface-subtle px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                v0.1.0
              </span>
            </Link>

            {/* Desktop Navigation (>= 768px) with responsive compact density */}
            <nav
              aria-label="Navigation principale"
              className="hidden md:flex items-center gap-0.5 lg:gap-1 text-sm font-medium"
            >
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2 lg:px-3 py-1.5 rounded-[6px] text-xs lg:text-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-[11px] left-1.5 right-1.5 h-[2px] bg-foreground rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Tools (Responsive: icon-only on mobile & md, expanded on lg 1024px+) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher dans le catalogue (Ctrl K)"
              className="flex h-9 items-center gap-2 rounded-[10px] border border-border bg-surface-subtle px-2.5 lg:px-3 text-xs text-muted-foreground hover:text-foreground hover:border-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden lg:inline text-xs">Search catalog...</span>
              <kbd className="hidden lg:inline-block rounded-[6px] border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Changer de thème (clair/sombre)"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* GitHub Link (>= 1024px desktop) */}
            <a
              href="https://github.com/Ericjason2/Liber-UI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dépôt GitHub de Liber UI"
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GithubMono size={16} />
            </a>

            {/* Mobile Menu Trigger (< 768px) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile-first Navigation Drawer (< 768px) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Menu mobile"
            className="md:hidden border-b border-border bg-card/98 backdrop-blur-lg px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            {/* Main Section Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-3">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-muted-foreground">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions & Legal Footer */}
            <div className="pt-3 border-t border-border space-y-2">
              <a
                href="https://github.com/Ericjason2/Liber-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-mono text-foreground bg-surface-subtle border border-border hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubMono size={14} />
                  <span>GitHub Repository</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </a>

              <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-1 text-[11px] text-muted-foreground">
                <Link
                  href="/legal/mentions-legales"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-foreground hover:underline"
                >
                  Mentions légales
                </Link>
                <span>·</span>
                <Link
                  href="/legal/terms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-foreground hover:underline"
                >
                  Conditions (CGU)
                </Link>
                <span>·</span>
                <Link
                  href="/legal/cookies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-foreground hover:underline"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
