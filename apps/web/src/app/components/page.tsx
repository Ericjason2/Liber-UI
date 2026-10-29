"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_COMPONENTS, type ComponentItem } from "@/lib/catalog";
import {
  Copy,
  Check,
  Terminal,
  Search,
  ChevronDown,
  Info,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ComponentsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [componentModes, setComponentModes] = useState<Record<string, "preview" | "code">>({});

  // Interactive specimen states
  const [inputValue, setInputValue] = useState("Search documentation...");
  const [activeTab, setActiveTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [progressVal, setProgressVal] = useState(68);

  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Components", count: SAMPLE_COMPONENTS.length },
    { id: "buttons", label: "Buttons", count: SAMPLE_COMPONENTS.filter((c) => c.category === "buttons").length },
    { id: "inputs", label: "Inputs & Form", count: SAMPLE_COMPONENTS.filter((c) => c.category === "inputs").length },
    { id: "data-display", label: "Data Display", count: SAMPLE_COMPONENTS.filter((c) => c.category === "data-display").length },
    { id: "feedback", label: "Feedback & Status", count: SAMPLE_COMPONENTS.filter((c) => c.category === "feedback").length },
  ].filter((c) => c.id === "all" || c.count > 0);

  const filtered = SAMPLE_COMPONENTS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q);
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleCopyCmd = (c: ComponentItem) => {
    navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/${c.slug}.json`);
    setCopiedKey(c.slug);
    toast(`Copied ${c.name} command`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getComponentCode = (slug: string): string => {
    switch (slug) {
      case "button":
        return `import { Button } from "@/components/ui/button";\n\nexport function ButtonDemo() {\n  return (\n    <div className="flex gap-2">\n      <Button variant="default">Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="outline">Outline</Button>\n      <Button variant="destructive">Destructive</Button>\n    </div>\n  );\n}`;
      case "input":
        return `import { Input } from "@/components/ui/input";\nimport { Search } from "lucide-react";\n\nexport function InputDemo() {\n  return (\n    <div className="relative">\n      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />\n      <Input className="pl-9" placeholder="Search..." />\n    </div>\n  );\n}`;
      case "toggle-switch":
        return `import { Switch } from "@/components/ui/switch";\n\nexport function SwitchDemo() {\n  const [checked, setChecked] = useState(true);\n  return <Switch checked={checked} onCheckedChange={setChecked} />;\n}`;
      default:
        return `import React from "react";\n\nexport function ${slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")}() {\n  return (\n    <div className="p-4 rounded-lg border bg-card">\n      {/* Accessible component implementation */}\n    </div>\n  );\n}`;
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
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-muted border border-border text-muted-foreground">
            Radix Primitives · Pure Tailwind CSS
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Core UI Components
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Micro-engineered accessible primitives with interactive states, dark mode compliance, and standard shadcn registry manifests.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-foreground bg-muted border border-border px-3.5 h-10 rounded-[10px] self-start sm:self-auto">
            <span>{filtered.length} Components Available</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search & Category Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter components (button, input, badge, tabs, switch, avatar)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3 py-2 rounded-[8px] text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCat === c.id
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
      </div>

      {/* 3. Interactive Component Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((item) => {
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
                      className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
                        currentMode === "preview"
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
                      className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
                        currentMode === "code"
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Code
                    </button>
                  </div>

                  {/* Copy shadcn command */}
                  <button
                    onClick={() => handleCopyCmd(item)}
                    className="p-1 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-1"
                    title={`Copy shadcn add ${item.slug}`}
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
                            className={`flex-1 py-1 rounded-[6px] capitalize font-medium transition-colors ${
                              activeTab === tab
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
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            accordionOpen ? "rotate-180" : ""
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
                        className={`w-11 h-6 rounded-full p-0.5 border transition-colors ${
                          switchChecked ? "bg-primary border-primary" : "bg-muted border-border"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full block transition-transform ${
                            switchChecked
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
                </div>
              ) : (
                /* Code View */
                <div className="p-4 bg-neutral-950 font-mono text-xs overflow-x-auto relative">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400 text-[11px] mb-2">
                    <span>{item.slug}.tsx</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getComponentCode(item.slug));
                        toast("Copied code snippet");
                      }}
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      Copy JSX
                    </button>
                  </div>
                  <pre className="text-neutral-200 select-all leading-relaxed">
                    {getComponentCode(item.slug)}
                  </pre>
                </div>
              )}

              {/* Card Footer: Metadata & Install Action */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <p className="text-muted-foreground line-clamp-1">{item.description}</p>
                <button
                  onClick={() => handleCopyCmd(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-muted hover:bg-muted/80 text-foreground font-mono text-xs whitespace-nowrap transition-colors"
                >
                  <Terminal className="h-3 w-3 text-muted-foreground" />
                  <span>pnpm dlx shadcn add {item.slug}</span>
                  {isCopied && <Check className="h-3 w-3 text-emerald-500 ml-1" />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
