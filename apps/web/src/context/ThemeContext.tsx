"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let currentTheme: Theme = "light";
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

function applyThemeToDom(t: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", t === "dark");
  }
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = useSyncExternalStore(subscribe, () => currentTheme, () => "light" as Theme);

  useEffect(() => {
    // Purge legacy customizer keys to ensure the app stays locked to neutral & geist
    try {
      localStorage.removeItem("liber-palette");
      localStorage.removeItem("liber-font");
    } catch {
      // Ignore in restricted environments
    }

    const storedTheme = localStorage.getItem("liber-theme") as Theme | null;
    currentTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme();
    applyThemeToDom(currentTheme);
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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      <div className={mounted ? "" : "invisible"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
