"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { SAMPLE_THEMES, SAMPLE_FONTS } from "@/lib/catalog";

type Theme = "light" | "dark";

export interface GlobalCustomizerContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  activePalette: string;
  setActivePalette: (slug: string) => void;
  activeFont: string;
  setActiveFont: (slug: string) => void;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let currentTheme: Theme = "light";
let currentPalette = "neutral";
let currentFont = "inter";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function applyPaletteToDom(slug: string) {
  if (typeof document === "undefined") return;
  const found = SAMPLE_THEMES.find((t) => t.slug === slug);
  if (!found || !found.tokens) return;
  const root = document.documentElement;
  if (found.tokens.primary) {
    root.style.setProperty("--primary", found.tokens.primary);
    root.style.setProperty("--ring", found.tokens.primary);
  }
  if (found.tokens.accent) {
    root.style.setProperty("--accent", found.tokens.accent);
  }
  if (found.tokens.border) {
    root.style.setProperty("--border", found.tokens.border);
  }
}

function applyFontToDom(slug: string) {
  if (typeof document === "undefined") return;
  const fontObj = SAMPLE_FONTS.find((f) => f.slug === slug);
  const root = document.documentElement;
  if (fontObj) {
    const familyStr = `"${fontObj.name}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    root.style.setProperty("--font-sans", familyStr);
  } else {
    root.style.removeProperty("--font-sans");
  }
}

function applyThemeToDom(t: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", t === "dark");
  }
}

const ThemeContext = createContext<GlobalCustomizerContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  activePalette: "neutral",
  setActivePalette: () => {},
  activeFont: "inter",
  setActiveFont: () => {},
});

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = useSyncExternalStore(subscribe, () => currentTheme, () => "light" as Theme);
  const activePalette = useSyncExternalStore(subscribe, () => currentPalette, () => "neutral");
  const activeFont = useSyncExternalStore(subscribe, () => currentFont, () => "inter");

  useEffect(() => {
    const storedTheme = localStorage.getItem("liber-theme") as Theme | null;
    currentTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme();
    applyThemeToDom(currentTheme);

    const storedPalette = localStorage.getItem("liber-palette");
    if (storedPalette) {
      currentPalette = storedPalette;
      applyPaletteToDom(storedPalette);
    }

    const storedFont = localStorage.getItem("liber-font");
    if (storedFont) {
      currentFont = storedFont;
      applyFontToDom(storedFont);
    }

    notify();

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("liber-theme")) {
        currentTheme = e.matches ? "dark" : "light";
        applyThemeToDom(currentTheme);
        notify();
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const setTheme = (t: Theme) => {
    currentTheme = t;
    localStorage.setItem("liber-theme", t);
    applyThemeToDom(t);
    notify();
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const setActivePalette = (slug: string) => {
    currentPalette = slug;
    localStorage.setItem("liber-palette", slug);
    applyPaletteToDom(slug);
    notify();
  };

  const setActiveFont = (slug: string) => {
    currentFont = slug;
    localStorage.setItem("liber-font", slug);
    applyFontToDom(slug);
    notify();
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        activePalette,
        setActivePalette,
        activeFont,
        setActiveFont,
      }}
    >
      <div className={mounted ? "" : "invisible"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
