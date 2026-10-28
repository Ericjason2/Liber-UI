"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info, Copy, Check, ChevronRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type Manager = "pnpm" | "npm" | "yarn" | "bun";

export default function DocsPage() {
  const [manager, setManager] = useState<Manager>("pnpm");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    toast("Copied code to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const getAddCommand = () => {
    switch (manager) {
      case "pnpm":
        return "pnpm dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "npm":
        return "npx shadcn add https://liber.dev/r/hero-centered.json";
      case "yarn":
        return "yarn dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "bun":
        return "bunx --bun shadcn add https://liber.dev/r/hero-centered.json";
    }
  };

  const sidebarLinks = [
    { label: "Getting Started", href: "#getting-started" },
    { label: "Installation", href: "#installation", active: true },
    { label: "Using Logos", href: "#logos" },
    { label: "Registry Architecture", href: "#registry" },
    { label: "Contributing", href: "#contributing" },
    { label: "Changelog", href: "#changelog" },
  ];

  const tocLinks = [
    { label: "Overview", href: "#overview" },
    { label: "shadcn CLI setup", href: "#shadcn-cli" },
    { label: "Installing React Logos", href: "#react-logos" },
    { label: "Raw SVG usage", href: "#raw-svg" },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (3 cols, sticky) */}
        <aside className="hidden md:block md:col-span-3 sticky top-20 space-y-4 pr-4 border-r border-border text-xs">
          <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] font-mono">
            Documentation
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-2.5 py-1.5 rounded-[6px] transition-colors ${
                  item.active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Center Article (7 cols) */}
        <article className="md:col-span-6 space-y-8 max-w-[680px]">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground" id="overview">
              Installation & Usage
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Liber distributes resources as open code directly into your repository. There is no
              monolithic runtime library or locked package.
            </p>
          </div>

          {/* Info Callout */}
          <div className="flex items-start gap-3 p-4 rounded-[10px] border border-border bg-surface-subtle text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
            <div className="space-y-1">
              <span className="font-medium text-foreground">Zero Runtime Overhead</span>
              <p className="leading-relaxed">
                When you add a block, component or logo, the clean source code lands in your project
                so you can inspect, refactor, and adapt it without constraints.
              </p>
            </div>
          </div>

          {/* Section: shadcn CLI */}
          <section className="space-y-4" id="shadcn-cli">
            <h2 className="text-xl font-medium tracking-tight text-foreground">Installing via shadcn CLI</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every Liber resource is packaged in standard shadcn registry format. You can install any
              asset by providing the resource registry URL:
            </p>

            <div className="rounded-[10px] border border-border bg-card overflow-hidden text-xs">
              <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-3 py-1.5">
                <div className="flex items-center gap-1">
                  {(["pnpm", "npm", "yarn", "bun"] as Manager[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setManager(m)}
                      className={`px-2 py-0.5 font-mono text-[11px] rounded-[6px] transition-colors ${
                        manager === m
                          ? "bg-muted text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyCode(getAddCommand(), "cmd")}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copied === "cmd" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied === "cmd" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 font-mono text-xs select-all text-foreground bg-card">
                $ {getAddCommand()}
              </div>
            </div>
          </section>

          {/* Section: React package */}
          <section className="space-y-4" id="react-logos">
            <h2 className="text-xl font-medium tracking-tight text-foreground">Using React Logo Components</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you prefer installing logos as a package, install <code className="bg-muted px-1.5 py-0.5 rounded-[6px] text-[11px] font-mono">@liber/react</code>.
              It is tree-shakeable: importing one logo adds less than 2 KB to your bundle.
            </p>

            <div className="rounded-[10px] border border-border bg-card overflow-hidden text-xs">
              <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-3 py-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">Terminal</span>
                <button
                  onClick={() => copyCode("pnpm add @liber/react", "install-react")}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copied === "install-react" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied === "install-react" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3 font-mono text-xs select-all text-foreground bg-card">
                $ pnpm add @liber/react
              </div>
            </div>

            <div className="rounded-[10px] border border-border bg-card overflow-hidden text-xs">
              <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-3 py-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">Component.tsx</span>
                <button
                  onClick={() =>
                    copyCode(
                      'import { GithubColor, DockerColor } from "@liber/react";\n\nexport function Stack() {\n  return (\n    <div className="flex gap-4">\n      <GithubColor size={24} />\n      <DockerColor size={24} />\n    </div>\n  );\n}',
                      "import-react",
                    )
                  }
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copied === "import-react" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied === "import-react" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-3 font-mono text-xs text-foreground bg-card overflow-x-auto leading-relaxed">
{`import { GithubColor, DockerColor } from "@liber/react";

export function Stack() {
  return (
    <div className="flex gap-4">
      <GithubColor size={24} />
      <DockerColor size={24} />
    </div>
  );
}`}
              </pre>
            </div>
          </section>

          {/* Section: Raw SVG */}
          <section className="space-y-4" id="raw-svg">
            <h2 className="text-xl font-medium tracking-tight text-foreground">Raw SVGs & CDN</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every logo is accessible via public static URLs on the CDN or downloadable as raw SVGs from the website:
            </p>
            <div className="p-3 rounded-[10px] border border-border bg-card font-mono text-xs text-foreground select-all">
              https://cdn.liber.dev/logos/github/color.svg
            </div>
          </section>

          {/* Section: Offline Backups & Bulk Downloads */}
          <section className="space-y-4" id="backups">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Offline Backups & Bulk Downloads
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For offline design systems, internal air-gapped environments, or Figma library imports, full catalog asset packages are available for direct download.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/downloads/liber-svg-collection.zip"
                download="liber-svg-collection.zip"
                className="p-4 rounded-[10px] border border-border bg-card hover:bg-muted/40 transition-colors flex flex-col justify-between space-y-2 group"
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    SVG Logos Collection (.zip)
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    All optimized SVGs in color, monochrome, and wordmark.
                  </div>
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  ↓ Download archive
                </div>
              </a>

              <a
                href="/downloads/liber-catalog-backup.json"
                download="liber-catalog-backup.json"
                className="p-4 rounded-[10px] border border-border bg-card hover:bg-muted/40 transition-colors flex flex-col justify-between space-y-2 group"
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    Full Catalog Index (.json)
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Complete schema metadata of all logos, themes, and fonts.
                  </div>
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  ↓ Download JSON
                </div>
              </a>
            </div>
          </section>

          {/* Pagination */}
          <div className="pt-6 border-t border-border flex items-center justify-between text-xs">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              ← Home
            </Link>
            <Link href="/logos" className="text-foreground font-medium flex items-center gap-1 hover:underline">
              <span>Browse logos</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>

        {/* Right "On this page" TOC (3 cols, sticky) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 pl-4 space-y-3 text-xs border-l border-border">
          <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] font-mono">
            On this page
          </div>
          <nav className="space-y-1.5">
            {tocLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
