"use client";

import React from "react";

/**
 * SkipToContent provides a high-contrast accessibility link allowing
 * keyboard-only and screen reader users to skip navigation chrome and jump
 * directly to the primary page contents.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] px-4 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold text-xs tracking-tight shadow-2xl ring-2 ring-primary ring-offset-2 ring-offset-background transition-all outline-none"
    >
      Passer au contenu principal
    </a>
  );
}

