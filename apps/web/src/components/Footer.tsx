import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-16 sm:py-20 text-xs text-muted-foreground mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link href="/themes" className="hover:text-foreground transition-colors">
            Themes & Palettes
          </Link>
          <Link href="/fonts" className="hover:text-foreground transition-colors">
            Google Fonts
          </Link>
          <Link href="/legal" className="hover:text-foreground transition-colors">
            Legal & Trademarks
          </Link>
          <Link href="/legal#takedown" className="hover:text-foreground transition-colors">
            Takedown
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link href="/docs#changelog" className="hover:text-foreground transition-colors">
            Changelog
          </Link>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <p>Logos are trademarks of their respective owners.</p>
          <p className="text-[11px] font-mono opacity-80">
            Built for developers. Copy, paste, own your code. © 2026 Liber Open Source.
          </p>
        </div>
      </div>
    </footer>
  );
}
