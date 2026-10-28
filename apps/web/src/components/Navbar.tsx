"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { GithubMono } from "@liber/react";
import { useTheme } from "@/context/ThemeContext";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setSearchOpen(false);
  }

  const navLinks = [
    { href: "/logos", label: "Logos" },
    { href: "/blocks", label: "Blocks" },
    { href: "/components", label: "Components" },
    { href: "/themes", label: "Themes" },
    { href: "/fonts", label: "Fonts" },
    { href: "/docs", label: "Docs" },
  ];

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

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="https://github.com/devicons/devicon"
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
