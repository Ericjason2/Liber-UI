"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  ChevronRight,
  Layers,
  Shield,
  Palette,
  Type,
  BookOpen,
  Terminal,
  Download,
  Laptop,
  CheckCircle2,
  FileCode,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

type Manager = "pnpm" | "npm" | "yarn" | "bun";

export default function DocsPage() {
  const [manager, setManager] = useState<Manager>("pnpm");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (code: string, id: string, label = "Code copied to clipboard") => {
    navigator.clipboard.writeText(code);
    setCopiedKey(id);
    toast(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getAddCommand = (slug = "react") => {
    switch (manager) {
      case "pnpm":
        return `pnpm dlx @liber-ui/cli add ${slug}`;
      case "npm":
        return `npx @liber-ui/cli add ${slug}`;
      case "yarn":
        return `yarn dlx @liber-ui/cli add ${slug}`;
      case "bun":
        return `bunx @liber-ui/cli add ${slug}`;
    }
  };

  const sidebarLinks = [
    { label: "Introduction", href: "#introduction" },
    { label: "Quick Start & CLI", href: "#quickstart" },
    { label: "Tech & Brand Logos", href: "#logos" },
    { label: "Color Themes & WCAG", href: "#themes" },
    { label: "Typography & Fonts", href: "#fonts" },
    { label: "Blocks & Components", href: "#blocks" },
    { label: "CLI Reference", href: "#cli-reference" },
    { label: "Brand Trademark Policy", href: "#trademarks" },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (3 cols, sticky) */}
        <aside className="hidden md:block md:col-span-3 sticky top-20 space-y-4 pr-4 border-r border-border text-xs">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Documentation</span>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-2.5 py-1.5 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-border space-y-2">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              Downloads
            </span>
            <a
              href="/downloads/liber-svg-collection.zip"
              download="liber-svg-collection.zip"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-3 w-3" />
              <span>Full SVG Pack (.zip)</span>
            </a>
          </div>
        </aside>

        {/* Center Article (9 cols) */}
        <article className="md:col-span-9 space-y-12 max-w-[820px]">
          {/* 1. Introduction */}
          <section className="space-y-4" id="introduction">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-tight">
              <Link href="/" className="hover:text-foreground transition-colors">
                Catalog
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Documentation</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Welcome to Liber UI
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Liber UI is a free, open-source asset and code catalog built for UI/UX designers, front-end engineers, and product creators. It provides clean vector logos, WCAG-compliant color themes, self-hosted open typographies, and responsive UI section blocks — with zero vendor lock-in and zero runtime overhead.
              </p>
            </div>

            {/* Three Pillars Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-[10px] border border-border bg-card space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
                  <Copy className="h-3.5 w-3.5 text-blue-500" />
                  <span>1. Copy & Paste</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Grab clean SVG markup, React JSX components, CSS variables, or Tailwind snippets directly from the browser.
                </p>
              </div>

              <div className="p-4 rounded-[10px] border border-border bg-card space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
                  <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                  <span>2. CLI & Registry</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Install any resource directly into your project repository using <code className="text-primary font-mono">@liber-ui/cli</code> or standard <code className="text-primary font-mono">shadcn add</code>.
                </p>
              </div>

              <div className="p-4 rounded-[10px] border border-border bg-card space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
                  <Download className="h-3.5 w-3.5 text-purple-500" />
                  <span>3. Offline Download</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Export individual raw `.svg` files, high-resolution PNGs, or download the full 150+ logos zip archive for Figma and Illustrator.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Quickstart & Installation */}
          <section className="space-y-4 pt-4 border-t border-border" id="quickstart">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Quick Start with CLI
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use our official lightweight CLI to add resources directly into your project without cloning or manual file copying.
            </p>

            <div className="rounded-[10px] border border-border bg-card overflow-hidden text-xs">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
                <div className="flex items-center gap-1">
                  {(["pnpm", "npm", "yarn", "bun"] as Manager[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setManager(m)}
                      className={`px-2.5 py-1 font-mono text-[11px] rounded-[6px] transition-colors ${
                        manager === m
                          ? "bg-card text-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(getAddCommand("react"), "quick-add-cmd", "CLI command copied")
                  }
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copiedKey === "quick-add-cmd" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{copiedKey === "quick-add-cmd" ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="p-3.5 font-mono text-xs select-all text-foreground bg-card">
                $ {getAddCommand("react")}
              </div>
            </div>
          </section>

          {/* 3. Tech & Brand Logos Guide */}
          <section className="space-y-4 pt-4 border-t border-border" id="logos">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Tech & Brand Logos
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Liber UI contains over 150 official technology and tool logos, carefully normalized and optimized via SVGO. Every logo comes with consistent dimensions, role attributes, and three official variants:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-[8px] border border-border bg-card space-y-1.5">
                <div className="font-mono font-bold text-foreground">1. Color (`color.svg`)</div>
                <p className="text-muted-foreground leading-relaxed">
                  Official brand colors matching the company&apos;s brand guidelines. Ideal for marketing pages, hero tech stacks, and showcase grids.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-border bg-card space-y-1.5">
                <div className="font-mono font-bold text-foreground">2. Monochrome (`mono.svg`)</div>
                <p className="text-muted-foreground leading-relaxed">
                  Single-color vector configured with <code className="text-primary font-mono">fill="currentColor"</code>. Inherits text color seamlessly across light and dark modes.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-border bg-card space-y-1.5">
                <div className="font-mono font-bold text-foreground">3. Wordmark (`wordmark.svg`)</div>
                <p className="text-muted-foreground leading-relaxed">
                  Combines the official logomark symbol with the brand&apos;s typographic logotype for partner and sponsor sections.
                </p>
              </div>
            </div>

            {/* Code Examples: React & Raw SVG */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs font-semibold text-foreground">
                Usage Example in React / Next.js:
              </span>

              <div className="rounded-[8px] border border-border bg-card p-4 font-mono text-xs relative group">
                <pre className="text-foreground overflow-x-auto leading-relaxed">
{`// Option A: Using the @liber-ui/react package (tree-shakeable, < 2 KB)
import { ReactColor, FigmaColor, GithubMono } from "@liber-ui/react";

export function TechStack() {
  return (
    <div className="flex items-center gap-4">
      {/* Set custom size, color, or pass standard SVG props */}
      <ReactColor size={28} />
      <FigmaColor size={28} />
      <GithubMono size={28} className="text-foreground hover:text-primary transition-colors" />
    </div>
  );
}

// Option B: Using raw static SVG files in HTML / Vue / Svelte
<img src="/svg/react/color.svg" alt="React" width="28" height="28" />`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import { ReactColor, FigmaColor, GithubMono } from "@liber-ui/react";\n<ReactColor size={28} />`,
                      "react-logo-snippet",
                      "Logo code snippet copied"
                    )
                  }
                  className="absolute top-3 right-3 p-1.5 rounded-[6px] bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy snippet"
                >
                  {copiedKey === "react-logo-snippet" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 4. Color Themes & WCAG AA */}
          <section className="space-y-4 pt-4 border-t border-border" id="themes">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Color Themes & Palettes
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Liber UI includes 72 curated color palettes across warm, cool, nature, pastel, neon, and high-contrast styles. Every single palette is tested for WCAG AA compliance (4.5:1 minimum contrast ratio) and generates light and dark mode CSS variables.
            </p>

            <div className="p-4 rounded-[10px] border border-border bg-card space-y-3 text-xs">
              <span className="font-mono font-semibold text-foreground">
                How to integrate into Tailwind CSS (app/globals.css):
              </span>
              <pre className="p-3 rounded bg-muted/40 font-mono text-[11px] text-foreground overflow-x-auto leading-relaxed select-all">
{`/* 1. Paste palette CSS variables into your root stylesheet */
:root {
  --background: #fbfbfd;
  --foreground: #1d1d1f;
  --primary: #0071e3;
  --primary-foreground: #ffffff;
  --card: #ffffff;
  --card-foreground: #1d1d1f;
  --border: #d2d2d7;
}

.dark {
  --background: #000000;
  --foreground: #f5f5f7;
  --primary: #2997ff;
  --primary-foreground: #000000;
  --card: #161617;
  --card-foreground: #f5f5f7;
  --border: #424245;
}`}
              </pre>
            </div>
          </section>

          {/* 5. Typography & Fonts System */}
          <section className="space-y-4 pt-4 border-t border-border" id="fonts">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Typography & Font System
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All 21 typographies in Liber are 100% open-license (SIL Open Font License or Apache 2.0). They are designed to be self-hosted locally within your project, eliminating third-party tracking, DNS lookups, and layout shift.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-[8px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground">
                  Option 1 · Next.js Local Font (Recommended)
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Place <span className="font-mono text-foreground">.woff2</span> files in <span className="font-mono text-foreground">public/fonts/&lt;family&gt;/</span> and load via Next.js <code className="text-primary font-mono">next/font/local</code>.
                </p>
              </div>

              <div className="p-4 rounded-[8px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground">
                  Option 2 · NPM @fontsource
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Install via npm (ex: <code className="font-mono text-primary">npm install @fontsource/inter</code>) and import the CSS in your root layout without hosting files manually.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Blocks & Components */}
          <section className="space-y-4 pt-4 border-t border-border" id="blocks">
            <div className="flex items-center gap-2">
              <Laptop className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                UI Blocks & Components
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Section templates and micro-components crafted with Tailwind CSS and Radix UI primitives. Available categories include Hero sections, Bento features, Pricing tables, Testimonial walls, Headers, and Footers.
            </p>

            <div className="p-4 rounded-[10px] border border-border bg-card text-xs space-y-2">
              <div className="flex items-center gap-2 font-mono font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Pure Code, No Blackbox</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                When you install or copy a block, you get standard, clean React JSX code that lives in your project. You can customize colors, responsive breakpoints, typography, and layout freely.
              </p>
            </div>
          </section>

          {/* 7. CLI Command Reference */}
          <section className="space-y-4 pt-4 border-t border-border" id="cli-reference">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                CLI Command Reference (@liber-ui/cli)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The <code className="font-mono text-primary">@liber-ui/cli</code> package allows quick terminal interaction with the Liber registry:
            </p>

            <div className="overflow-x-auto rounded-[10px] border border-border">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/50 border-b border-border font-mono text-[11px] text-foreground">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Command</th>
                    <th className="py-2.5 px-4 font-semibold">Description</th>
                    <th className="py-2.5 px-4 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-[11px]">
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber add &lt;slug&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Installs a resource directly into your project.</td>
                    <td className="py-2.5 px-4 text-foreground">liber add react</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber search &lt;query&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Searches the catalog from the terminal.</td>
                    <td className="py-2.5 px-4 text-foreground">liber search database</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber view &lt;slug&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Inspects metadata and dependencies before adding.</td>
                    <td className="py-2.5 px-4 text-foreground">liber view docker</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber init</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Creates a liber.json configuration file.</td>
                    <td className="py-2.5 px-4 text-foreground">liber init</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber diff &lt;slug&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Checks for upstream updates to an installed resource.</td>
                    <td className="py-2.5 px-4 text-foreground">liber diff hero-centered</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. Brand Trademark Policy */}
          <section className="space-y-4 pt-4 border-t border-border" id="trademarks">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Brand & Trademark Policy
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All technology, company, and tool logos distributed on Liber UI are registered trademarks of their respective owners.
            </p>

            <div className="p-4 rounded-[10px] border border-border bg-muted/20 text-xs text-muted-foreground space-y-2">
              <p className="leading-relaxed">
                Logos are distributed exclusively for nominative reference — to identify technologies in developer portfolios, client partner showcases, and technology stack listings. Their inclusion does not imply endorsement, affiliation, or sponsorship.
              </p>
              <p className="leading-relaxed">
                If you represent a brand and wish to request removal or provide an updated official vector, please review our{" "}
                <Link href="/legal#takedown" className="text-primary hover:underline font-medium">
                  7-Day Takedown Procedure
                </Link>{" "}
                or submit an issue on GitHub.
              </p>
            </div>
          </section>

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-border flex items-center justify-between text-xs">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              ← Return Home
            </Link>
            <Link
              href="/logos"
              className="text-foreground font-medium flex items-center gap-1 hover:underline"
            >
              <span>Explore Logos Catalog</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
