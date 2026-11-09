"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Search,
  RotateCcw,
  Code2,
  Play,
  Zap,
} from "lucide-react";
import { SAMPLE_ANIMATIONS } from "@/lib/catalog-animations";
import { useToast } from "@/context/ToastContext";

type CodeTab = "css" | "tailwind";
type PlaybackSpeed = "0.5x" | "1x" | "2x";

export default function AnimationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [speed, setSpeed] = useState<PlaybackSpeed>("1x");
  const [infiniteLoop, setInfiniteLoop] = useState<boolean>(false);
  const [motionSafe, setMotionSafe] = useState<boolean>(true);
  const [activeTabs, setActiveTabs] = useState<Record<string, CodeTab>>({});
  const [expandedCodes, setExpandedCodes] = useState<Record<string, boolean>>({});
  const [replayKeys, setReplayKeys] = useState<Record<string, number>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    SAMPLE_ANIMATIONS.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });

    return [
      { id: "all", label: "All Animations", count: SAMPLE_ANIMATIONS.length },
      { id: "basic", label: "Basic", count: counts["basic"] || 0 },
      { id: "entrances", label: "Entrances", count: counts["entrances"] || 0 },
      { id: "exits", label: "Exits", count: counts["exits"] || 0 },
      { id: "text", label: "Text", count: counts["text"] || 0 },
      { id: "attention", label: "Attention", count: counts["attention"] || 0 },
      { id: "background", label: "Background", count: counts["background"] || 0 },
    ].filter((c) => c.id === "all" || c.count > 0);
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SAMPLE_ANIMATIONS.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const triggerReplay = (slug: string) => {
    setReplayKeys((prev) => ({
      ...prev,
      [slug]: (prev[slug] || 0) + 1,
    }));
  };

  const getSpeedMultiplier = () => {
    if (speed === "0.5x") return 2;
    if (speed === "2x") return 0.5;
    return 1;
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Header & Breadcrumbs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
          <Link href="/" className="hover:text-foreground transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Animations</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              CSS & Tailwind Animations
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Hardware-accelerated web keyframe animations and interactive micro-interactions.
              Preview animations interactively in real time, and copy pure CSS or Tailwind CSS configuration with a single click. Zero heavy libraries, pure CSS performance.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            {/* Infinite Loop Toggle */}
            <button
              onClick={() => setInfiniteLoop((prev) => !prev)}
              className={`h-9 px-3 rounded-[10px] border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                infiniteLoop
                  ? "bg-primary text-primary-foreground border-primary font-semibold"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              title="Toggle continuous infinite loop on all animations"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{infiniteLoop ? "Loop: Infinite" : "Loop: Single"}</span>
            </button>

            {/* Accessibility Motion-Safe Toggle */}
            <button
              onClick={() => setMotionSafe((prev) => !prev)}
              className={`h-9 px-3 rounded-[10px] border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                motionSafe
                  ? "bg-primary text-primary-foreground border-primary font-semibold"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              title="Include prefers-reduced-motion accessibility guard in copied code"
            >
              <span>{motionSafe ? "a11y: motion-safe" : "a11y: standard"}</span>
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 p-1 rounded-[10px] border border-border bg-card text-xs font-mono">
              <span className="px-2 text-muted-foreground flex items-center gap-1">
                <Play className="h-3 w-3" />
                <span>Speed:</span>
              </span>
              {(["0.5x", "1x", "2x"] as PlaybackSpeed[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1 rounded-[6px] text-xs transition-colors ${speed === s
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search animations (shimmer, border beam, float, blur, marquee, heartbeat)..."
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <span className="h-10 px-3 flex items-center justify-center rounded-[10px] border border-border bg-muted/40 text-xs font-mono text-muted-foreground whitespace-nowrap">
            {filtered.length} / {SAMPLE_ANIMATIONS.length} animations
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[10px] opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Animations Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const currentTab = activeTabs[item.slug] || "css";
          const isExpanded = expandedCodes[item.slug] || false;
          const replayCount = replayKeys[item.slug] || 0;

          return (
            <article
              key={item.slug}
              id={item.slug}
              className="rounded-[12px] border border-border bg-card p-5 space-y-4 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200"
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold tracking-tight text-foreground">
                      {item.name}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => triggerReplay(item.slug)}
                    className="p-1.5 rounded-[6px] border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Replay animation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border capitalize">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted/60 text-muted-foreground border border-border">
                    {item.trigger === "loop" ? "Infinite Loop" : item.trigger === "hover" ? "Hover Trigger" : "Click Trigger"}
                  </span>
                </div>
              </div>

              {/* Interactive Live Canvas */}
              <div className="relative h-44 rounded-[10px] border border-border/80 bg-surface-subtle/50 flex items-center justify-center overflow-hidden p-4 select-none">
                <InteractivePreview
                  slug={item.slug}
                  key={`${item.slug}-${replayCount}-${infiniteLoop}`}
                  speedMultiplier={getSpeedMultiplier()}
                  infiniteLoop={infiniteLoop}
                />
              </div>

              {/* Code Tab & Actions */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 p-0.5 rounded-[6px] bg-muted/60 border border-border text-[11px] font-mono">
                    <button
                      onClick={() =>
                        setActiveTabs((prev) => ({ ...prev, [item.slug]: "css" }))
                      }
                      className={`px-2 py-0.5 rounded-[4px] transition-colors ${currentTab === "css"
                          ? "bg-card text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Pure CSS
                    </button>
                    <button
                      onClick={() =>
                        setActiveTabs((prev) => ({ ...prev, [item.slug]: "tailwind" }))
                      }
                      className={`px-2 py-0.5 rounded-[4px] transition-colors ${currentTab === "tailwind"
                          ? "bg-card text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Tailwind
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        setExpandedCodes((prev) => ({
                          ...prev,
                          [item.slug]: !isExpanded,
                        }))
                      }
                      className="px-2 py-1 rounded-[6px] border border-border text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1"
                      title={isExpanded ? "Hide Code" : "View Code"}
                    >
                      <Code2 className="h-3 w-3" />
                      <span>{isExpanded ? "Hide" : "Code"}</span>
                    </button>

                    <button
                      onClick={() => {
                        const rawClass = infiniteLoop
                          ? item.cssClasses.replace(/;\s*\}/, " infinite;\n}")
                          : item.cssClasses;
                        const finalCssClass = motionSafe
                          ? `@media (prefers-reduced-motion: no-preference) {\n  ${rawClass.replace(/\n/g, "\n  ")}\n}`
                          : rawClass;
                        const baseTwClass = infiniteLoop
                          ? item.tailwindClasses.replace(/_both\]$/, "_infinite_both]")
                          : item.tailwindClasses;
                        const finalTwClass = motionSafe
                          ? `motion-safe:${baseTwClass}`
                          : baseTwClass;

                        if (currentTab === "css") {
                          const code = `${item.cssKeyframes}\n\n${finalCssClass}`;
                          copyToClipboard(code, `Copied ${item.name} CSS`, `${item.slug}-css`);
                        } else {
                          const code = `// Tailwind Classes:\n${finalTwClass}\n\n${item.tailwindConfig}`;
                          copyToClipboard(code, `Copied ${item.name} Tailwind config`, `${item.slug}-tw`);
                        }
                      }}
                      className="px-2.5 py-1 rounded-[6px] bg-primary text-primary-foreground text-[11px] font-mono font-medium hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      {copiedKey === `${item.slug}-${currentTab === "css" ? "css" : "tw"}` ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>Copy {currentTab === "css" ? "CSS" : "Tailwind"}</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Syntax Code Snippet */}
                {isExpanded && (
                  <div className="relative rounded-[8px] bg-neutral-950 p-3 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-48 border border-neutral-800">
                    <pre className="whitespace-pre">
                      {currentTab === "css"
                        ? `${item.cssKeyframes}\n\n${
                            motionSafe
                              ? `@media (prefers-reduced-motion: no-preference) {\n  ${(infiniteLoop ? item.cssClasses.replace(/;\s*\}/, " infinite;\n}") : item.cssClasses).replace(/\n/g, "\n  ")}\n}`
                              : infiniteLoop
                                ? item.cssClasses.replace(/;\s*\}/, " infinite;\n}")
                                : item.cssClasses
                          }`
                        : `/* Tailwind Classes */\n${motionSafe ? "motion-safe:" : ""}${
                            infiniteLoop
                              ? item.tailwindClasses.replace(/_both\]$/, "_infinite_both]")
                              : item.tailwindClasses
                          }\n\n/* Tailwind Config */\n${item.tailwindConfig}`}
                    </pre>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// Interactive Previews for Animista animation items
function InteractivePreview({
  slug,
  speedMultiplier,
  infiniteLoop,
}: {
  slug: string;
  speedMultiplier: number;
  infiniteLoop: boolean;
}) {
  const item = SAMPLE_ANIMATIONS.find((a) => a.slug === slug);
  const [replayCount, setReplayCount] = useState(0);

  if (!item) {
    return <div className="text-xs font-mono text-muted-foreground">Animation Preview</div>;
  }

  const triggerAnimation = () => {
    setReplayCount((c) => c + 1);
  };

  const iterationCount = infiniteLoop || item.trigger === "loop" ? "infinite" : undefined;

  // 1. Text Animations (Animista Text)
  if (item.category === "text") {
    return (
      <div
        onClick={triggerAnimation}
        className="cursor-pointer select-none py-6 px-4 flex flex-col items-center justify-center text-center w-full"
        title="Click to replay text animation"
      >
        <span
          key={replayCount}
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground ${slug}`}
          style={{
            animationDuration: `calc(0.7s * ${speedMultiplier})`,
            animationIterationCount: iterationCount,
          }}
        >
          ANIMISTA
        </span>
        <span className="text-[10px] font-mono text-muted-foreground mt-3 opacity-60">
          Click to replay
        </span>
      </div>
    );
  }

  // 2. Background Animations (Animista Background)
  if (item.category === "background") {
    return (
      <div
        onClick={triggerAnimation}
        className="w-full h-28 rounded-[8px] overflow-hidden relative flex items-center justify-center cursor-pointer border border-border shadow-xs"
        title="Click to restart background effect"
      >
        <div
          key={replayCount}
          className={`w-full h-full flex items-center justify-center ${slug}`}
          style={{
            animationDuration: `calc(6s * ${speedMultiplier})`,
            animationIterationCount: iterationCount,
          }}
        >
          <span className="text-xs font-mono font-semibold text-white px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs">
            {item.name}
          </span>
        </div>
      </div>
    );
  }

  // 3. Attention, Basic, Entrances, Exits (Animista)
  return (
    <div
      onClick={triggerAnimation}
      className="cursor-pointer py-4 flex flex-col items-center justify-center w-full"
      title="Click to trigger animation"
    >
      <div
        key={replayCount}
        className={`px-6 py-3 rounded-[10px] bg-primary text-primary-foreground font-mono text-xs font-semibold shadow-sm flex items-center gap-2 select-none ${slug}`}
        style={{
          animationDuration: `calc(0.6s * ${speedMultiplier})`,
          animationIterationCount: iterationCount,
        }}
      >
        <Zap className="h-3.5 w-3.5 fill-current" />
        <span>{item.name}</span>
      </div>
      <span className="text-[10px] font-mono text-muted-foreground mt-2.5 opacity-60">
        Click to replay
      </span>
    </div>
  );
}
