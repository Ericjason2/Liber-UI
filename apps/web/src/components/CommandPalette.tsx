"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, Sparkles, Box, Layout, Palette, Type } from "lucide-react";
import { searchCatalog, type SearchDoc } from "@/lib/search";
import { useToast } from "@/context/ToastContext";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const results = useMemo(() => {
    return searchCatalog(query, 8);
  }, [query]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : 0,
        );
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        const item = results[selectedIndex];
        router.push(item.url);
        if (item.url.includes("#")) {
          onClose();
        }
      } else if (e.key === "Tab" && results[selectedIndex]) {
        e.preventDefault();
        const item = results[selectedIndex];
        navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/${item.slug}.json`);
        toast(`Copied install command for ${item.name}`);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, router, onClose, toast]);

  if (!open) return null;

  const getIcon = (kind: SearchDoc["kind"]) => {
    switch (kind) {
      case "logo":
        return <Sparkles className="h-4 w-4 text-neutral-400" />;
      case "block":
        return <Layout className="h-4 w-4 text-neutral-400" />;
      case "component":
        return <Box className="h-4 w-4 text-neutral-400" />;
      case "theme":
        return <Palette className="h-4 w-4 text-neutral-400" />;
      case "font":
        return <Type className="h-4 w-4 text-neutral-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/40 dark:bg-black/80 backdrop-blur-none animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] mx-4 rounded-[14px] border border-border bg-card overflow-hidden animate-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-border h-12">
          <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search logos, blocks, components, themes, fonts..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono border border-border rounded-[6px] px-1.5 py-0.5 text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={() => {
                      if (item.url.includes("#")) {
                        onClose();
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[6px] text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-accent text-accent-foreground border border-border/80"
                        : "text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-border bg-surface-subtle">
                        {getIcon(item.kind)}
                      </div>
                      <div className="truncate">
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground truncate hidden sm:inline">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
                        {item.kind}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface-subtle text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Tab Copy command</span>
          </div>
          <span>Liber catalog</span>
        </div>
      </div>
    </div>
  );
}
