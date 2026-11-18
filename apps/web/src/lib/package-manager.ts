"use client";

import { useCallback, useSyncExternalStore } from "react";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

const STORAGE_KEY = "preferred_pm";
const PM_CHANGE_EVENT = "liber:pm-change";

function isPackageManager(value: unknown): value is PackageManager {
  return (
    value === "pnpm" ||
    value === "npm" ||
    value === "yarn" ||
    value === "bun"
  );
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const onChange = (event: Event) => {
    if (event instanceof StorageEvent && event.key !== null && event.key !== STORAGE_KEY) {
      return;
    }
    callback();
  };
  window.addEventListener(PM_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PM_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Shared React hook persisting the user's preferred package manager (`preferred_pm`)
 * in `localStorage` and keeping all mounted UI blocks synchronized.
 */
export function usePackageManager(
  defaultPm: PackageManager = "pnpm"
): [PackageManager, (next: PackageManager) => void] {
  const pm = useSyncExternalStore(
    subscribe,
    () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return isPackageManager(stored) ? stored : defaultPm;
      } catch {
        return defaultPm;
      }
    },
    () => defaultPm
  );

  const setPm = useCallback((next: PackageManager) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage quota / privacy mode errors
    }
    window.dispatchEvent(new CustomEvent<PackageManager>(PM_CHANGE_EVENT, { detail: next }));
  }, []);

  return [pm, setPm];
}

export function getPackageInstallCommand(manager: PackageManager, pkg: string): string {
  switch (manager) {
    case "pnpm":
      return `pnpm add ${pkg}`;
    case "npm":
      return `npm install ${pkg}`;
    case "yarn":
      return `yarn add ${pkg}`;
    case "bun":
      return `bun add ${pkg}`;
  }
}

export function getCliCommand(manager: PackageManager, args: string): string {
  switch (manager) {
    case "pnpm":
      return `pnpm dlx @liber-ui/cli ${args}`;
    case "npm":
      return `npx @liber-ui/cli ${args}`;
    case "yarn":
      return `yarn dlx @liber-ui/cli ${args}`;
    case "bun":
      return `bunx @liber-ui/cli ${args}`;
  }
}
