"use client";

import React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function Footer() {
  const handleOpenCookieManager = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("liber:open-cookie-settings"));
    }
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 text-xs text-muted-foreground mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border/60">
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/logos" className="hover:text-foreground transition-colors">
                  Tech &amp; Brand Logos
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-foreground transition-colors">
                  Color Themes &amp; Palettes
                </Link>
              </li>
              <li>
                <Link href="/fonts" className="hover:text-foreground transition-colors">
                  Typography &amp; Fonts
                </Link>
              </li>
              <li>
                <Link href="/animations" className="hover:text-foreground transition-colors">
                  CSS &amp; Tailwind Animations
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-foreground transition-colors">
                  Open-Source Components
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Developers &amp; CLI
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs#installation" className="hover:text-foreground transition-colors">
                  CLI Installation
                </Link>
              </li>
              <li>
                <Link href="/docs#logos-guide" className="hover:text-foreground transition-colors">
                  @liber-ui/logo Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Legal &amp; Brands
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/mentions-legales" className="hover:text-foreground transition-colors">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookieManager}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 text-left"
                >
                  <Cookie className="h-3 w-3 text-primary" />
                  <span>Manage cookies</span>
                </button>
              </li>
              <li>
                <Link href="/legal" className="hover:text-foreground transition-colors">
                  Brands &amp; Takedown Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Liber UI
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Open-source resource catalog for designers and developers. Free, copy-paste primitives with zero vendor lock-in.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/Ericjason2/Liber-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground hover:underline"
              >
                <span>GitHub Repository</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 Liber UI. Source code under MIT License.</span>
            <Link href="/legal/mentions-legales" className="hover:text-foreground underline transition-colors">
              Legal Notice
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground underline transition-colors">
              Terms
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground underline transition-colors">
              Cookies
            </Link>
            <button
              type="button"
              onClick={handleOpenCookieManager}
              className="hover:text-foreground underline transition-colors"
            >
              Cookie preferences
            </button>
          </div>
          <p className="font-mono opacity-80">
            Copy, customize, own your code.
          </p>
        </div>
      </div>
    </footer>
  );
}
