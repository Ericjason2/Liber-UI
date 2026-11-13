"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SAMPLE_COMPONENTS, type ComponentItem } from "@/lib/catalog-components";
import {
  Copy,
  Check,
  Terminal,
  Search,
  ChevronDown,
  ChevronRight,
  Code2,
  Info,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  PACKAGE_MANAGERS,
  getCliCommand,
  type PackageManager,
} from "@/lib/package-manager";

const BASE_SLUGS = [
  "button",
  "input",
  "stat-card",
  "badge-pill",
  "tabs-control",
  "accordion-item",
  "avatar-stack",
  "toggle-switch",
  "alert-banner",
  "progress-bar",
  "modal-dialog",
  "dropdown-menu",
  "tooltip-hint",
  "toast-snackbar",
  "skeleton-shimmer",
  "breadcrumb-trail",
];

const PAGE_SIZE = 12;

export default function ComponentsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [componentModes, setComponentModes] = useState<Record<string, "preview" | "code">>({});
  const [pm, setPm] = useState<PackageManager>("pnpm");

  // Interactive specimen states
  const [inputValue, setInputValue] = useState("Search documentation...");
  const [activeTab, setActiveTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [progressVal, setProgressVal] = useState(68);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { toast } = useToast();

  // Compute all available tags with frequency
  const availableTags = useMemo(() => {
    const map = new Map<string, number>();
    for (const comp of SAMPLE_COMPONENTS) {
      for (const t of comp.tags || []) {
        map.set(t, (map.get(t) || 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const categories = useMemo(() => {
    return [
      { id: "all", label: "All Components", count: SAMPLE_COMPONENTS.length },
      { id: "buttons", label: "Buttons", count: SAMPLE_COMPONENTS.filter((c) => c.category === "buttons").length },
      { id: "inputs", label: "Inputs & Form", count: SAMPLE_COMPONENTS.filter((c) => c.category === "inputs").length },
      { id: "data-display", label: "Data Display", count: SAMPLE_COMPONENTS.filter((c) => c.category === "data-display").length },
      { id: "feedback", label: "Feedback & Status", count: SAMPLE_COMPONENTS.filter((c) => c.category === "feedback").length },
    ].filter((c) => c.id === "all" || c.count > 0);
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SAMPLE_COMPONENTS.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = selectedCat === "all" || item.category === selectedCat;
      const matchesTag = selectedTag === "all" || item.tags.includes(selectedTag);
      return matchesSearch && matchesCat && matchesTag;
    });
  }, [searchQuery, selectedCat, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleCopyCmd = (c: ComponentItem) => {
    navigator.clipboard.writeText(getCliCommand(pm, `add ${c.slug}`));
    setCopiedKey(c.slug);
    toast(`Copied ${pm} command for ${c.name}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getComponentCode = (slug: string): string => {
    switch (slug) {
      case "button":
        return `import React from "react";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="px-3.5 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm">
        Primary
      </button>
      <button className="px-3.5 py-1.5 rounded-[8px] bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border">
        Secondary
      </button>
      <button className="px-3.5 py-1.5 rounded-[8px] border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors">
        Outline
      </button>
      <button className="px-3.5 py-1.5 rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
        Ghost
      </button>
      <button className="px-3.5 py-1.5 rounded-[8px] bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors">
        Destructive
      </button>
    </div>
  );
}`;
      case "input":
        return `import React, { useState } from "react";
import { Search } from "lucide-react";

export function InputDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="relative flex items-center max-w-sm">
      <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search documentation..."
        className="w-full h-9 pl-9 pr-8 rounded-[8px] border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}`;
      case "stat-card":
        return `import React from "react";

export function StatCard() {
  return (
    <div className="w-full max-w-xs p-4 rounded-[10px] border border-border bg-card space-y-2 shadow-sm">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Total Edge Traffic</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-[4px]">
          +24.8%
        </span>
      </div>
      <div className="text-2xl font-bold font-mono text-foreground">1,429,820</div>
      <div className="h-2 rounded-full bg-muted overflow-hidden flex">
        <div className="w-3/4 bg-primary rounded-full" />
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span>71% of quota</span>
        <span>Next reset in 8d</span>
      </div>
    </div>
  );
}`;
      case "badge-pill":
        return `import React from "react";

export function StatusBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Operational
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Degraded
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Outage
      </span>
    </div>
  );
}`;
      case "tabs-control":
        return `import React, { useState } from "react";

export function TabsControl() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "analytics", "deployments", "settings"];

  return (
    <div className="flex items-center rounded-[8px] border border-border bg-muted/40 p-1 text-xs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={\`flex-1 py-1 rounded-[6px] capitalize font-medium transition-colors \${
            activeTab === tab
              ? "bg-card text-foreground font-semibold shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }\`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}`;
      case "accordion-item":
        return `import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionItem() {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full max-w-sm rounded-[8px] border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors"
      >
        <span>How are assets installed?</span>
        <ChevronDown className={\`h-4 w-4 text-muted-foreground transition-transform \${open ? "rotate-180" : ""}\`} />
      </button>
      {open && (
        <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/60">
          Assets are copied directly into your codebase as TypeScript and Tailwind source files with zero runtime lock-in.
        </div>
      )}
    </div>
  );
}`;
      case "avatar-stack":
        return `import React from "react";

export function AvatarStack() {
  const initials = ["SC", "AD", "KM", "EL"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {initials.map((initial, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full border-2 border-card bg-muted text-foreground flex items-center justify-center font-mono text-xs font-semibold shadow-sm"
          >
            {initial}
          </div>
        ))}
        <div className="w-9 h-9 rounded-full border-2 border-card bg-primary text-primary-foreground flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
          +12
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-mono">Active contributors</span>
    </div>
  );
}`;
      case "toggle-switch":
        return `import React, { useState } from "react";

export function SwitchDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={\`w-11 h-6 rounded-full p-0.5 border transition-colors \${
        checked ? "bg-primary border-primary" : "bg-muted border-border"
      }\`}
    >
      <span
        className={\`w-5 h-5 rounded-full block transition-transform \${
          checked ? "bg-primary-foreground translate-x-5" : "bg-muted-foreground/60 translate-x-0"
        }\`}
      />
    </button>
  );
}`;
      case "alert-banner":
        return `import React, { useState } from "react";
import { Info } from "lucide-react";

export function AlertBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="p-3.5 rounded-[8px] border border-blue-500/20 bg-blue-500/10 text-xs text-foreground flex items-start justify-between gap-2.5">
      <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
      <div className="space-y-0.5 flex-1">
        <span className="font-semibold block">Notice: API rate limits updated</span>
        <span className="text-muted-foreground text-[11px] leading-relaxed block">
          Standard tier quotas have been doubled to 20,000 requests/hour.
        </span>
      </div>
      <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground text-xs">
        ✕
      </button>
    </div>
  );
}`;
      case "progress-bar":
        return `import React from "react";

export function ProgressBar({ value = 68 }: { value?: number }) {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground">Compilation Progress</span>
        <span className="font-semibold text-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden flex">
        <div
          style={{ width: \`\${Math.min(100, Math.max(0, value))}%\` }}
          className="bg-primary rounded-full transition-all duration-300"
        />
      </div>
    </div>
  );
}`;
      default: {
        const found = SAMPLE_COMPONENTS.find((c) => c.slug === slug);
        if (found?.code) return found.code;
        return `import React from "react";\n\nexport function ${slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")}() {\n  return (\n    <div className="p-4 rounded-lg border bg-card">\n      {/* Accessible component implementation */}\n    </div>\n  );\n}`;
      }
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Breadcrumb & Top Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Components</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Core UI Components
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Micro-engineered accessible primitives with interactive states, dark mode compliance, and direct @liber-ui/cli registry manifests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1 rounded-[10px] border border-border bg-card p-1">
              {PACKAGE_MANAGERS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPm(m)}
                  className={`px-2 py-1 font-mono text-[11px] rounded-[6px] transition-colors ${
                    pm === m
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px]">
              <span>{filtered.length} Components Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search & Category Chips */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search components by tag, name, or slug (e.g. #modal, #button, #navbar, #pricing)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCat(c.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-[8px] text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${selectedCat === c.id
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span>{c.label}</span>
                <span className="font-mono text-[10px] opacity-70">({c.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tag Cloud Pills Bar (Scraped from TailwindFlex tags) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedTag("all");
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors whitespace-nowrap flex items-center gap-1 ${
              selectedTag === "all"
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            <span>All Tags</span>
          </button>
          {availableTags.slice(0, 30).map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(selectedTag === tag ? "all" : tag);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors whitespace-nowrap flex items-center gap-1 ${
                selectedTag === tag
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>#{tag}</span>
              <span className="text-[9px] opacity-70">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Interactive Component Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {paginatedItems.map((item) => {
          const currentMode = componentModes[item.slug] || "preview";
          const isCopied = copiedKey === item.slug;

          return (
            <article
              key={item.slug}
              id={item.slug}
              className="rounded-[10px] border border-border bg-card overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all scroll-mt-20 flex flex-col justify-between"
            >
              {/* Header Bar */}
              <div className="px-5 py-3 border-b border-border bg-muted/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border capitalize">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Mode Toggle */}
                  <div className="flex items-center rounded-[6px] border border-border bg-card p-0.5 text-xs">
                    <button
                      onClick={() =>
                        setComponentModes((prev) => ({ ...prev, [item.slug]: "preview" }))
                      }
                      className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${currentMode === "preview"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() =>
                        setComponentModes((prev) => ({ ...prev, [item.slug]: "code" }))
                      }
                      className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${currentMode === "code"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Code
                    </button>
                  </div>

                  {/* Copy CLI command */}
                  <button
                    onClick={() => handleCopyCmd(item)}
                    className="p-1 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-1"
                    title={`Copy liber add ${item.slug}`}
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Component Arena: Interactive Visualization or Code */}
              {currentMode === "preview" ? (
                <div className="p-6 sm:p-8 bg-muted/10 min-h-[200px] flex items-center justify-center">
                  {/* 1. BUTTONS */}
                  {item.slug === "button" && (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button className="px-3.5 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm">
                        Primary
                      </button>
                      <button className="px-3.5 py-1.5 rounded-[8px] bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors border border-border">
                        Secondary
                      </button>
                      <button className="px-3.5 py-1.5 rounded-[8px] border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors">
                        Outline
                      </button>
                      <button className="px-3.5 py-1.5 rounded-[8px] hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
                        Ghost
                      </button>
                      <button className="px-3.5 py-1.5 rounded-[8px] bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors">
                        Destructive
                      </button>
                    </div>
                  )}

                  {/* 2. INPUT */}
                  {item.slug === "input" && (
                    <div className="w-full max-w-sm space-y-2">
                      <div className="relative flex items-center">
                        <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type something to test..."
                          className="w-full h-9 pl-9 pr-8 rounded-[8px] border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                        />
                        {inputValue && (
                          <button
                            onClick={() => setInputValue("")}
                            className="absolute right-2.5 text-xs text-muted-foreground hover:text-foreground"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        Active live text input with leading icon adornment.
                      </p>
                    </div>
                  )}

                  {/* 3. STAT CARD */}
                  {item.slug === "stat-card" && (
                    <div className="w-full max-w-xs p-4 rounded-[10px] border border-border bg-card space-y-2 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Total Edge Traffic</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-[4px]">
                          +24.8%
                        </span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        1,429,820
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden flex">
                        <div className="w-3/4 bg-primary rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                        <span>71% of quota</span>
                        <span>Next reset in 8d</span>
                      </div>
                    </div>
                  )}

                  {/* 4. BADGE PILL */}
                  {item.slug === "badge-pill" && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Operational
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Degraded
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Outage
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
                        v2.4.0
                      </span>
                    </div>
                  )}

                  {/* 5. TABS CONTROL */}
                  {item.slug === "tabs-control" && (
                    <div className="w-full max-w-sm space-y-3">
                      <div className="flex items-center rounded-[8px] border border-border bg-muted/40 p-1 text-xs">
                        {["overview", "analytics", "deployments", "settings"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-1 rounded-[6px] capitalize font-medium transition-colors ${activeTab === tab
                                ? "bg-card text-foreground font-semibold shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 rounded-[8px] border border-border bg-card text-xs text-muted-foreground text-center">
                        Active Tab: <span className="font-mono text-foreground font-semibold capitalize">{activeTab}</span>
                      </div>
                    </div>
                  )}

                  {/* 6. ACCORDION */}
                  {item.slug === "accordion-item" && (
                    <div className="w-full max-w-sm rounded-[8px] border border-border bg-card overflow-hidden">
                      <div
                        onClick={() => setAccordionOpen(!accordionOpen)}
                        className="px-4 py-3 flex items-center justify-between text-xs font-semibold text-foreground cursor-pointer hover:bg-muted/40 transition-colors"
                      >
                        <span>How are assets installed?</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${accordionOpen ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                      {accordionOpen && (
                        <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/60">
                          Assets are copied directly into your codebase as TypeScript and Tailwind source files with zero runtime lock-in.
                        </div>
                      )}
                    </div>
                  )}

                  {/* 7. AVATAR STACK */}
                  {item.slug === "avatar-stack" && (
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {["SC", "AD", "KM", "EL"].map((initial, i) => (
                          <div
                            key={i}
                            className="w-9 h-9 rounded-full border-2 border-card bg-muted text-foreground flex items-center justify-center font-mono text-xs font-semibold shadow-sm"
                          >
                            {initial}
                          </div>
                        ))}
                        <div className="w-9 h-9 rounded-full border-2 border-card bg-primary text-primary-foreground flex items-center justify-center font-mono text-[11px] font-bold shadow-sm">
                          +12
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        Active contributors
                      </span>
                    </div>
                  )}

                  {/* 8. TOGGLE SWITCH */}
                  {item.slug === "toggle-switch" && (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-foreground">
                        {switchChecked ? "Auto-deployment Enabled" : "Manual Deploy Only"}
                      </span>
                      <button
                        onClick={() => setSwitchChecked(!switchChecked)}
                        className={`w-11 h-6 rounded-full p-0.5 border transition-colors ${switchChecked ? "bg-primary border-primary" : "bg-muted border-border"
                          }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full block transition-transform ${switchChecked
                              ? "bg-primary-foreground translate-x-5"
                              : "bg-muted-foreground/60 translate-x-0"
                            }`}
                        />
                      </button>
                    </div>
                  )}

                  {/* 9. ALERT BANNER */}
                  {item.slug === "alert-banner" && (
                    <div className="w-full max-w-sm">
                      {showAlert ? (
                        <div className="p-3.5 rounded-[8px] border border-blue-500/20 bg-blue-500/10 text-xs text-foreground flex items-start justify-between gap-2.5">
                          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 flex-1">
                            <span className="font-semibold block">Notice: API rate limits updated</span>
                            <span className="text-muted-foreground text-[11px] leading-relaxed block">
                              Standard tier quotas have been doubled to 20,000 requests/hour.
                            </span>
                          </div>
                          <button
                            onClick={() => setShowAlert(false)}
                            className="text-muted-foreground hover:text-foreground text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAlert(true)}
                          className="px-3 py-1.5 rounded-[6px] border border-border text-xs text-muted-foreground hover:text-foreground"
                        >
                          Show Alert Again
                        </button>
                      )}
                    </div>
                  )}

                  {/* 10. PROGRESS BAR */}
                  {item.slug === "progress-bar" && (
                    <div className="w-full max-w-sm space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">Compilation Progress</span>
                        <span className="font-semibold text-foreground">{progressVal}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden flex">
                        <div
                          style={{ width: `${progressVal}%` }}
                          className="bg-primary rounded-full transition-all duration-300"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setProgressVal(Math.max(0, progressVal - 15))}
                          className="px-2 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground"
                        >
                          -15%
                        </button>
                        <button
                          onClick={() => setProgressVal(Math.min(100, progressVal + 15))}
                          className="px-2 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground"
                        >
                          +15%
                        </button>
                        <button
                          onClick={() => setProgressVal(100)}
                          className="px-2 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground ml-auto"
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 11. MODAL DIALOG */}
                  {item.slug === "modal-dialog" && (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={() => setModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
                      >
                        Open Live Modal
                      </button>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Supports backdrop dismiss &amp; Escape key trap.
                      </span>

                      {modalOpen && (
                        <div
                          role="dialog"
                          aria-modal="true"
                          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
                          onClick={() => setModalOpen(false)}
                        >
                          <div
                            className="w-full max-w-md p-6 rounded-xl border border-border bg-card shadow-2xl space-y-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between border-b border-border pb-3">
                              <h3 className="text-sm font-semibold text-foreground">Deploy to Edge Cluster</h3>
                              <button
                                onClick={() => setModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground text-xs p-1 rounded hover:bg-muted"
                                aria-label="Fermer la modal"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              This action will trigger an immediate rollout across 24 edge regions. Traffic will switch seamlessly with zero downtime.
                            </p>
                            <div className="flex items-center justify-end gap-2 pt-2">
                              <button
                                onClick={() => setModalOpen(false)}
                                className="px-3 py-1.5 rounded-[8px] border border-border text-xs text-foreground hover:bg-muted transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  setModalOpen(false);
                                  toast("Deployment initiated successfully");
                                }}
                                className="px-3.5 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                              >
                                Confirm Deployment
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 12. DROPDOWN MENU */}
                  {item.slug === "dropdown-menu" && (
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                        className="px-3.5 py-1.5 rounded-[8px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <span>Project Actions</span>
                        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-20 text-xs">
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              toast("Cloned repository URL");
                            }}
                            className="w-full text-left px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
                          >
                            Clone repository
                          </button>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              toast("Configuring build webhooks");
                            }}
                            className="w-full text-left px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
                          >
                            Webhook settings
                          </button>
                          <div className="h-px bg-border my-1" />
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              toast("Archive created");
                            }}
                            className="w-full text-left px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            Archive project
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 13. TOOLTIP HINT */}
                  {item.slug === "tooltip-hint" && (
                    <div className="relative inline-block">
                      <button
                        onMouseEnter={() => setTooltipOpen(true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                        onFocus={() => setTooltipOpen(true)}
                        onBlur={() => setTooltipOpen(false)}
                        className="px-3.5 py-1.5 rounded-[8px] border border-border bg-card text-xs text-foreground hover:bg-muted transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
                      >
                        Hover or Focus Me
                      </button>
                      {tooltipOpen && (
                        <div
                          role="tooltip"
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[11px] font-medium rounded shadow-md whitespace-nowrap z-30 pointer-events-none"
                        >
                          WCAG compliant hover tip
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* 14. TOAST SNACKBAR */}
                  {item.slug === "toast-snackbar" && (
                    <div className="w-full max-w-sm">
                      {toastOpen ? (
                        <div
                          role="status"
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card shadow-md text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-foreground font-medium">Assets synced to node cache</span>
                          </div>
                          <button
                            onClick={() => setToastOpen(false)}
                            className="text-muted-foreground hover:text-foreground text-xs px-1"
                            aria-label="Dismiss snackbar"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setToastOpen(true)}
                          className="px-3 py-1.5 rounded-[8px] border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Trigger toast again
                        </button>
                      )}
                    </div>
                  )}

                  {/* 15. SKELETON SHIMMER */}
                  {item.slug === "skeleton-shimmer" && (
                    <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3 w-3/5 rounded bg-muted animate-pulse" />
                          <div className="h-2.5 w-2/5 rounded bg-muted animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="h-3 w-full rounded bg-muted animate-pulse" />
                        <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* 16. BREADCRUMB TRAIL */}
                  {item.slug === "breadcrumb-trail" && (
                    <nav aria-label="Fil d'Ariane" className="flex items-center text-xs text-muted-foreground">
                      <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                          <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
                        </li>
                        <li className="inline-flex items-center">
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span className="hover:text-foreground cursor-pointer transition-colors ml-1">Documentation</span>
                        </li>
                        <li className="inline-flex items-center">
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span className="font-semibold text-foreground ml-1" aria-current="page">Components</span>
                        </li>
                      </ol>
                    </nav>
                  )}

                  {/* TailwindFlex scraped components */}
                  {!BASE_SLUGS.includes(item.slug) && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                        <Code2 className="h-5 w-5" />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <span className="text-sm font-semibold text-foreground block">
                          {item.name}
                        </span>
                        {item.author && (
                          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                            <span>Créé par</span>
                            {item.authorUrl ? (
                              <a
                                href={item.authorUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-foreground hover:underline"
                              >
                                {item.author}
                              </a>
                            ) : (
                              <span className="font-medium text-foreground">{item.author}</span>
                            )}
                            {item.sourceUrl && (
                              <a
                                href={item.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-primary/80 hover:underline"
                              >
                                ↗ TailwindFlex
                              </a>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {item.tags.slice(0, 5).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setSelectedTag(t);
                              setCurrentPage(1);
                            }}
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setComponentModes((prev) => ({ ...prev, [item.slug]: "code" }))}
                          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors shadow-sm"
                        >
                          Voir le code
                        </button>
                        {item.rawHtml && (
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(item.rawHtml || "");
                              toast("Code HTML brut copié !");
                            }}
                            className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors shadow-sm"
                          >
                            Copier HTML
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopyCmd(item)}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
                        >
                          liber add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Code View */
                <div className="p-4 bg-neutral-950 font-mono text-xs overflow-x-auto relative">
                  <div className="flex flex-wrap items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400 text-[11px] mb-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-200">{item.slug}.tsx</span>
                      {item.mention && (
                        <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          {item.mention}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.rawHtml && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.rawHtml || "");
                            toast("HTML brut copié !");
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors text-[10px]"
                        >
                          Copier HTML brut
                        </button>
                      )}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(getComponentCode(item.slug));
                          toast("Code React copié !");
                        }}
                        className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors text-[10px]"
                      >
                        Copier React TSX
                      </button>
                    </div>
                  </div>
                  <pre className="text-neutral-200 select-all leading-relaxed max-h-96 overflow-y-auto">
                    {getComponentCode(item.slug)}
                  </pre>
                </div>
              )}

              {/* Card Footer: Metadata & Install Action */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-muted-foreground line-clamp-1">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.author && (
                      <span className="text-[11px] text-muted-foreground font-mono">
                        by{" "}
                        <a
                          href={item.authorUrl || `https://tailwindflex.com/${item.author}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-foreground hover:underline"
                        >
                          {item.author}
                        </a>
                      </span>
                    )}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags.slice(0, 4).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setSelectedTag(t);
                            setCurrentPage(1);
                          }}
                          className="text-[10px] font-mono text-muted-foreground/80 hover:text-foreground underline transition-colors"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyCmd(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-muted hover:bg-muted/80 text-foreground font-mono text-xs whitespace-nowrap transition-colors shrink-0"
                >
                  <Terminal className="h-3 w-3 text-muted-foreground" />
                  <span>liber add {item.slug}</span>
                  {isCopied && <Check className="h-3 w-3 text-emerald-500 ml-1" />}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. Pagination Controls (Instant sub-50ms render, smooth 60fps) */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground font-mono">
            Affichage de {((currentPage - 1) * PAGE_SIZE) + 1} à {Math.min(currentPage * PAGE_SIZE, filtered.length)} sur {filtered.length} composants disponibles
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Only show around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 2
                ) {
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (Math.abs(pageNum - currentPage) === 3) {
                  return <span key={pageNum} className="px-1 text-xs text-muted-foreground">...</span>;
                }
                return null;
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
