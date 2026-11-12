"use client";

import React, { useState } from "react";
import { MousePointer2, Type, PenTool, Spline, Eye, Minus, ChevronDown } from "lucide-react";

/**
 * Editorial 3-column section divider inspired by architectural design system specs:
 * Left: section title | Center: platform label | Right: two-digit section index.
 */
export function EditorialDivider({
  left,
  center = "Liber UI",
  index,
}: {
  left: string;
  center?: string;
  index: string;
}) {
  return (
    <div className="w-full pt-4">
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-muted-foreground pb-3 border-b border-border">
        <span className="font-medium text-foreground/80">{left}</span>
        <span className="hidden sm:inline opacity-70">{center}</span>
        <span className="tabular-nums font-semibold text-foreground/80">{index}</span>
      </div>
    </div>
  );
}

/**
 * Signature tilted accent pill badge used to highlight section concepts (Overview, Pro, WCAG AA, etc.).
 */
export function TiltedPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold tracking-tight bg-[#2563EB] text-white dark:bg-[#38BDF8] dark:text-[#090D16] liber-floating-widget select-none ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Figma-style dashed selection bounding box with 4 corner resize anchor squares.
 */
export function DashedSelectionBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block px-3 sm:px-4 py-0.5 mx-1 border-[1.5px] border-dashed border-foreground/45 dark:border-[#38BDF8]/60 ${className}`}
    >
      {/* 4 Corner Anchor Handles */}
      <span
        aria-hidden="true"
        className="absolute -top-1.5 -left-1.5 h-2.5 w-2.5 rounded-[2px] bg-[#2563EB] dark:bg-[#38BDF8] border border-white dark:border-[#0B0F17]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-[2px] bg-[#2563EB] dark:bg-[#38BDF8] border border-white dark:border-[#0B0F17]"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 -left-1.5 h-2.5 w-2.5 rounded-[2px] bg-[#2563EB] dark:bg-[#38BDF8] border border-white dark:border-[#0B0F17]"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5 rounded-[2px] bg-[#2563EB] dark:bg-[#38BDF8] border border-white dark:border-[#0B0F17]"
      />
      {children}
    </span>
  );
}

/**
 * Interactive tilted Figma vector tool dock floating widget.
 */
export function FloatingToolDock({ className = "" }: { className?: string }) {
  const [activeTool, setActiveTool] = useState<"pointer" | "type" | "pen" | "bezier">("bezier");

  const tools = [
    { id: "pointer" as const, icon: MousePointer2, label: "Select tool" },
    { id: "type" as const, icon: Type, label: "Typography tool" },
    { id: "pen" as const, icon: PenTool, label: "Vector pen" },
    { id: "bezier" as const, icon: Spline, label: "Path curve" },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1 p-1.5 rounded-[16px] border border-border bg-card/95 backdrop-blur-md liber-floating-widget ${className}`}
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveTool(tool.id)}
            aria-label={tool.label}
            className={`h-9 w-9 rounded-[11px] flex items-center justify-center transition-colors ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Floating tilted Color Fill & Opacity inspector widget synced to Liber's accent tokens.
 */
export function FloatingFillInspector({
  hex = "2563EB",
  opacity = "100%",
  className = "",
}: {
  hex?: string;
  opacity?: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={`w-[210px] p-3 rounded-[16px] border border-border bg-card/95 backdrop-blur-md liber-floating-widget space-y-2.5 text-left ${className}`}
    >
      {/* Gradient opacity bar */}
      <div className="relative h-6 rounded-[8px] overflow-hidden border border-border liber-checkerboard">
        <div
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: visible ? 1 : 0.25,
            background: "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, #2563EB 100%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1 bottom-1 w-4 rounded-[5px] bg-[#2563EB] dark:bg-[#38BDF8] border-2 border-foreground"
        />
      </div>

      <div className="text-[11px] font-medium text-foreground">Fill · Accent Token</div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-between h-7 px-2 rounded-[8px] border border-border bg-surface-subtle text-[11px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-[4px] bg-[#2563EB] dark:bg-[#38BDF8] inline-block shrink-0" />
            <span className="text-foreground font-medium">{hex}</span>
          </span>
          <span className="text-muted-foreground">{opacity}</span>
        </div>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label="Toggle fill visibility"
          className="h-7 w-7 rounded-[8px] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {visible ? <Eye className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

/**
 * Floating tilted Typography inspector popover overlapping the Hero Monitor mockup.
 */
export function FloatingTypographyInspector({ className = "" }: { className?: string }) {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <div
      className={`w-[224px] p-3.5 rounded-[16px] border border-border bg-card/95 backdrop-blur-md liber-floating-widget space-y-2.5 text-left ${className}`}
    >
      <div className="text-[11px] font-medium text-foreground">Typography</div>

      <div className="h-8 px-2.5 rounded-[8px] border border-border bg-surface-subtle flex items-center justify-between text-xs font-medium text-foreground">
        <span>Geist</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setBold((b) => !b)}
            aria-label="Toggle bold"
            className={`h-7 w-7 rounded-[6px] border text-xs font-bold transition-colors ${
              bold
                ? "border-foreground/30 bg-muted text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => setItalic((i) => !i)}
            aria-label="Toggle italic"
            className={`h-7 w-7 rounded-[6px] border text-xs italic font-serif transition-colors ${
              italic
                ? "border-foreground/30 bg-muted text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => setUnderline((u) => !u)}
            aria-label="Toggle underline"
            className={`h-7 w-7 rounded-[6px] border text-xs underline transition-colors ${
              underline
                ? "border-foreground/30 bg-muted text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            U
          </button>
        </div>

        <div className="h-7 px-2 rounded-[6px] border border-border bg-surface-subtle flex items-center gap-1 text-[11px] font-mono text-foreground">
          <span>16 PX</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

