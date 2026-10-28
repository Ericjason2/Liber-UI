"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_THEMES, type ThemeItem } from "@/lib/catalog";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";

function getContrastColor(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#0A0A0A" : "#FFFFFF";
}

export function ThemeLivePreview() {
  const [selected, setSelected] = useState<ThemeItem>(SAMPLE_THEMES[0] ?? ({} as ThemeItem));
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/theme-${selected.slug}.json`);
    setCopied(true);
    toast(`Copied ${selected.name} theme tokens`);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryColor = selected.swatches[2] || "#171717";
  const primaryTextColor = getContrastColor(primaryColor);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-1">
            <span>Themes</span>
            <span>·</span>
            <span>Coolors-style token preview</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Try a theme live</h2>
          <p className="text-sm text-muted-foreground">Pick a theme once, preview everything with it.</p>
        </div>

        <Link
          href="/themes"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground hover:underline"
        >
          <span>Explore all 12 themes & Studio</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Coolors Seamless Palette Strip Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SAMPLE_THEMES.slice(0, 6).map((theme) => {
          const isSelected = selected.slug === theme.slug;
          return (
            <button
              key={theme.slug}
              onClick={() => setSelected(theme)}
              className={`p-2 rounded-[10px] border text-left transition-all flex flex-col gap-2 ${
                isSelected
                  ? "border-primary bg-muted/50 ring-1 ring-primary"
                  : "border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground tracking-tight">{theme.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{theme.wcagLevel}</span>
              </div>

              {/* 5 contiguous swatches */}
              <div className="h-6 flex rounded-[6px] overflow-hidden border border-border/80">
                {theme.swatches.map((swatch, idx) => (
                  <div
                    key={idx}
                    className="flex-1"
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Preview Box */}
      <div className="rounded-[10px] border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Stat Metric */}
          <div className="p-4 rounded-[10px] border border-border bg-surface-subtle space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">Live Instances</span>
              <span
                className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-[6px]"
                style={{ backgroundColor: primaryColor, color: primaryTextColor }}
              >
                {selected.name}
              </span>
            </div>
            <div className="text-2xl font-semibold font-mono tracking-tight">2,410</div>
            <div className="text-[11px] font-mono font-medium" style={{ color: primaryColor }}>
              +14.2% from last deploy
            </div>
          </div>

          {/* Form Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Resource Identifier</label>
            <input
              type="text"
              readOnly
              value={`res_${selected.slug}_cluster_01`}
              className="w-full h-10 px-3 text-xs font-mono rounded-[10px] border border-border bg-surface-subtle text-foreground focus:outline-none"
              style={{ borderColor: primaryColor }}
            />
          </div>

          {/* Action Button */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Action Trigger</label>
            <button
              className="w-full h-10 px-4 rounded-[10px] text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: primaryColor, color: primaryTextColor }}
            >
              Deploy changes
            </button>
          </div>

          {/* Configuration Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Active Configuration</label>
              <button
                onClick={handleCopy}
                className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="h-10 px-3 flex items-center rounded-md border border-border bg-surface-subtle text-xs font-mono text-muted-foreground truncate">
              @theme/{selected.slug}.css
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
