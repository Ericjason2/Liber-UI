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
import { SAMPLE_ANIMATIONS } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

type CodeTab = "css" | "tailwind";
type PlaybackSpeed = "0.5x" | "1x" | "2x";

export default function AnimationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [speed, setSpeed] = useState<PlaybackSpeed>("1x");
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
      { id: "attention", label: "Attention & Micro", count: counts["attention"] || 0 },
      { id: "entrances", label: "Entrances & Reveals", count: counts["entrances"] || 0 },
      { id: "hover", label: "Hover & 3D Depth", count: counts["hover"] || 0 },
      { id: "text", label: "Text & Typography", count: counts["text"] || 0 },
      { id: "background", label: "Ambient & Marquee", count: counts["background"] || 0 },
      { id: "loaders", label: "Loaders & Spinners", count: counts["loaders"] || 0 },
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
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-muted border border-border text-muted-foreground">
            CSS & Tailwind Motion
          </span>
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
                  className={`px-2.5 py-1 rounded-[6px] text-xs transition-colors ${
                    speed === s
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
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
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
                  key={`${item.slug}-${replayCount}`}
                  speedMultiplier={getSpeedMultiplier()}
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
                      className={`px-2 py-0.5 rounded-[4px] transition-colors ${
                        currentTab === "css"
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
                      className={`px-2 py-0.5 rounded-[4px] transition-colors ${
                        currentTab === "tailwind"
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
                        if (currentTab === "css") {
                          const code = `${item.cssKeyframes}\n\n${item.cssClasses}`;
                          copyToClipboard(code, `Copied ${item.name} CSS`, `${item.slug}-css`);
                        } else {
                          const code = `// Tailwind Classes:\n${item.tailwindClasses}\n\n${item.tailwindConfig}`;
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
                        ? `${item.cssKeyframes}\n\n${item.cssClasses}`
                        : `/* Tailwind Classes */\n${item.tailwindClasses}\n\n/* Tailwind Config */\n${item.tailwindConfig}`}
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

// Interactive Previews for each animation item
function InteractivePreview({
  slug,
  speedMultiplier,
}: {
  slug: string;
  speedMultiplier: number;
}) {
  const [clicked, setClicked] = useState(false);

  switch (slug) {
    case "shimmer-skeleton":
      return (
        <div className="w-full max-w-[240px] space-y-2.5">
          <div
            className="h-7 w-3/4 rounded-[6px] bg-muted relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite_ease-in-out] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent"
            style={{ animationDuration: `${2 * speedMultiplier}s` }}
          />
          <div
            className="h-4 w-full rounded-[4px] bg-muted relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite_ease-in-out] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent"
            style={{ animationDuration: `${2 * speedMultiplier}s` }}
          />
          <div
            className="h-4 w-1/2 rounded-[4px] bg-muted relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite_ease-in-out] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent"
            style={{ animationDuration: `${2 * speedMultiplier}s` }}
          />
        </div>
      );

    case "glowing-border-beam":
      return (
        <div className="relative rounded-[10px] p-[1.5px] overflow-hidden group cursor-pointer">
          <div
            className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_360deg)]"
            style={{ animationDuration: `${4 * speedMultiplier}s` }}
          />
          <div className="relative rounded-[9px] bg-card px-5 py-3 text-xs font-mono font-medium text-foreground border border-border">
            <span>Laser Border Beam</span>
          </div>
        </div>
      );

    case "radar-beacon-pulse":
      return (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card">
          <span className="relative flex h-3 w-3">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              style={{ animationDuration: `${1.5 * speedMultiplier}s` }}
            />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-medium text-foreground">Operational Status</span>
        </div>
      );

    case "heartbeat-ripple":
      return (
        <div
          className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center text-white cursor-pointer shadow-lg animate-[heartbeat_2s_ease-in-out_infinite]"
          style={{ animationDuration: `${2 * speedMultiplier}s` }}
        >
          <Zap className="h-5 w-5 fill-current" />
        </div>
      );

    case "wobble-elastic":
      return (
        <div className="px-5 py-2.5 rounded-[8px] bg-primary text-primary-foreground font-mono text-xs font-semibold cursor-pointer hover:animate-[wobble_0.8s_ease-in-out] transition-transform">
          <span>Hover to Wobble</span>
        </div>
      );

    case "neon-flicker-glow":
      return (
        <div
          className="text-2xl font-bold tracking-wider text-purple-400 font-mono animate-[neon-flicker_3s_infinite] select-none"
          style={{ animationDuration: `${3 * speedMultiplier}s` }}
        >
          <span>CYBERPUNK</span>
        </div>
      );

    case "blur-scale-reveal":
      return (
        <div
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer"
        >
          <div
            key={clicked ? "a" : "b"}
            className="px-5 py-3 rounded-[10px] border border-border bg-card text-xs font-mono text-foreground font-medium animate-[blur-in_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-sm"
            style={{ animationDuration: `${0.6 * speedMultiplier}s` }}
          >
            <span>Click to Re-reveal</span>
          </div>
        </div>
      );

    case "slide-fade-up":
      return (
        <div
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer"
        >
          <div
            key={clicked ? "a" : "b"}
            className="px-5 py-3 rounded-[10px] border border-border bg-card text-xs font-mono text-foreground font-medium animate-[slide-up_0.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards] shadow-sm"
            style={{ animationDuration: `${0.5 * speedMultiplier}s` }}
          >
            <span>Spring Slide Up</span>
          </div>
        </div>
      );

    case "flip-3d-drop":
      return (
        <div
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer"
        >
          <div
            key={clicked ? "a" : "b"}
            className="px-5 py-3 rounded-[10px] border border-border bg-card text-xs font-mono text-foreground font-medium animate-[drop-3d_0.55s_cubic-bezier(0.34,1.56,0.64,1)_forwards] shadow-sm"
            style={{ animationDuration: `${0.55 * speedMultiplier}s` }}
          >
            <span>3D Tumble Drop</span>
          </div>
        </div>
      );

    case "magnetic-levitation":
      return (
        <div
          className="px-5 py-3 rounded-[10px] border border-border bg-card text-xs font-mono text-foreground font-medium animate-[float_3.5s_ease-in-out_infinite] shadow-sm"
          style={{ animationDuration: `${3.5 * speedMultiplier}s` }}
        >
          <span>Zero Gravity Float</span>
        </div>
      );

    case "card-tilt-3d":
      return (
        <div className="group cursor-pointer [perspective:800px]">
          <div className="px-5 py-4 rounded-[10px] border border-border bg-card text-xs font-mono text-foreground font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateX(12deg)_rotateY(-12deg)_translateZ(16px)] group-hover:border-primary">
            <span>Hover 3D Perspective</span>
          </div>
        </div>
      );

    case "elastic-tap-press":
      return (
        <button className="px-5 py-2.5 rounded-[8px] bg-primary text-primary-foreground font-mono text-xs font-semibold cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.93]">
          <span>Press & Release</span>
        </button>
      );

    case "spotlight-hover-glow":
      return (
        <div className="group relative overflow-hidden px-6 py-4 rounded-[10px] border border-border bg-card cursor-pointer before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.25),transparent_65%)] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300">
          <span className="relative z-10 text-xs font-mono font-medium text-foreground">
            Hover for Spotlight
          </span>
        </div>
      );

    case "text-gradient-flow":
      return (
        <div
          className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-[text-flow_6s_ease_infinite]"
          style={{ animationDuration: `${6 * speedMultiplier}s` }}
        >
          <span>Fluid Gradient Wave</span>
        </div>
      );

    case "terminal-typewriter":
      return (
        <div className="px-3 py-2 rounded-[6px] bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-xs max-w-[220px]">
          <div
            className="overflow-hidden whitespace-nowrap border-r-2 border-blue-400 animate-[typing_3s_steps(24,end)_infinite_alternate,blink_0.75s_step-end_infinite]"
            style={{ animationDuration: `${3 * speedMultiplier}s, 0.75s` }}
          >
            <span>$ liber init app</span>
          </div>
        </div>
      );

    case "metallic-text-wipe":
      return (
        <div
          className="text-xl font-bold font-mono tracking-wider bg-[linear-gradient(90deg,rgba(150,150,150,0.4)_0%,rgba(255,255,255,1)_50%,rgba(150,150,150,0.4)_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[text-shimmer_3s_linear_infinite]"
          style={{ animationDuration: `${3 * speedMultiplier}s` }}
        >
          <span>CHROME SPECULAR</span>
        </div>
      );

    case "infinite-marquee":
      return (
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div
            className="flex w-max gap-4 animate-[marquee_12s_linear_infinite]"
            style={{ animationDuration: `${12 * speedMultiplier}s` }}
          >
            {["React", "Next.js", "Tailwind", "TypeScript", "Vite", "React", "Next.js", "Tailwind"].map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-[6px] bg-muted border border-border text-[11px] font-mono text-foreground font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      );

    case "aurora-gradient-mesh":
      return (
        <div className="relative h-28 w-28 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 blur-2xl opacity-60 animate-[aurora-spin_10s_ease-in-out_infinite]"
            style={{ animationDuration: `${10 * speedMultiplier}s` }}
          />
          <span className="relative z-10 text-xs font-mono font-semibold text-foreground">
            Aurora
          </span>
        </div>
      );

    case "orbital-conic-spinner":
      return (
        <div
          className="h-9 w-9 rounded-full animate-spin [background:conic-gradient(from_0deg,transparent_0%,#3b82f6_100%)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#fff_calc(100%-3px))]"
          style={{ animationDuration: `${0.85 * speedMultiplier}s` }}
        />
      );

    case "bouncing-triple-dots":
      return (
        <div className="flex items-center gap-1.5 p-3 rounded-[8px] bg-card border border-border text-primary">
          <div
            className="h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out]"
            style={{ animationDuration: `${1.2 * speedMultiplier}s` }}
          />
          <div
            className="h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out_0.2s]"
            style={{ animationDuration: `${1.2 * speedMultiplier}s` }}
          />
          <div
            className="h-2 w-2 rounded-full bg-current animate-[dot-bounce_1.2s_infinite_ease-in-out_0.4s]"
            style={{ animationDuration: `${1.2 * speedMultiplier}s` }}
          />
        </div>
      );

    default:
      return (
        <div className="text-xs font-mono text-muted-foreground">
          Animation Preview
        </div>
      );
  }
}
