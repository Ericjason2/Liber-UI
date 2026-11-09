"use client";

import { useSyncExternalStore } from "react";

/** Canonical production origin, used during SSR / static prerendering. */
export const PRODUCTION_ORIGIN = "https://liber-ui-delta.vercel.app";

function subscribe(): () => void {
  // The origin never changes during a page's lifetime.
  return () => {};
}

function getClientOrigin(): string {
  return window.location.origin;
}

function getServerOrigin(): string {
  return PRODUCTION_ORIGIN;
}

/**
 * Returns the origin the site is currently served from (localhost, Vercel preview, production).
 *
 * Uses `useSyncExternalStore` so the server snapshot (production origin) is used during
 * hydration, then React re-renders with the real browser origin — no hydration mismatch.
 */
export function useSiteOrigin(): string {
  return useSyncExternalStore(subscribe, getClientOrigin, getServerOrigin);
}

