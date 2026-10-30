import React from "react";
import Link from "next/link";

export function Footer() {
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
                  Tech & Brand Logos
                </Link>
              </li>
              <li>
                <Link href="/themes" className="hover:text-foreground transition-colors">
                  Color Palettes & Themes
                </Link>
              </li>
              <li>
                <Link href="/fonts" className="hover:text-foreground transition-colors">
                  Fonts & Typography
                </Link>
              </li>
              <li>
                <Link href="/blocks" className="hover:text-foreground transition-colors">
                  UI Blocks & Sections
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-foreground transition-colors">
                  Components
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Developers & CLI
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
                  Using @liber-ui/react
                </Link>
              </li>
              <li>
                <a
                  href="/downloads/liber-svg-collection.zip"
                  download="liber-svg-collection.zip"
                  className="hover:text-foreground transition-colors"
                >
                  Offline SVG Archive (.zip)
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Legal & Brands
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/legal" className="hover:text-foreground transition-colors">
                  Trademark Guidelines
                </Link>
              </li>
              <li>
                <Link href="/legal#takedown" className="hover:text-foreground transition-colors">
                  7-Day Takedown Procedure
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Ericjason2/Liber-UI/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Liber UI
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Open source asset catalog for designers, developers, and product creators. Free copy-paste, zero runtime lock-in.
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
          <p>
            Logos are trademarks of their respective owners. Usage must respect brand guidelines.
          </p>
          <p className="font-mono opacity-80">
            © 2026 Liber UI. Copy, paste, own your code.
          </p>
        </div>
      </div>
    </footer>
  );
}
