"use client";

import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  FileCode,
  Sparkles,
  Zap,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

type Manager = "pnpm" | "npm" | "yarn" | "bun";

interface SidebarLink {
  id: string;
  label: string;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { id: "introduction", label: "Introduction" },
  { id: "quickstart", label: "Quick Start & CLI" },
  { id: "cli-reference", label: "CLI Reference" },
  { id: "fonts-guide", label: "Typography & Fonts" },
  { id: "logos-guide", label: "Brand & Tech Logos" },
  { id: "themes-guide", label: "Color Themes & WCAG" },
  { id: "animations-guide", label: "CSS & Tailwind Animations" },
  { id: "trademarks", label: "Trademark Policy" },
];

export default function DocsPage() {
  const [manager, setManager] = useState<Manager>("pnpm");
  const [activeSection, setActiveSection] = useState<string>("introduction");
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

  // Scrollspy: update active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = SIDEBAR_LINKS.length - 1; i >= 0; i--) {
        const item = SIDEBAR_LINKS[i];
        if (!item) continue;
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (3 cols, sticky with scrollspy) */}
        <aside className="hidden md:block md:col-span-3 sticky top-24 space-y-4 pr-4 border-r border-border text-xs">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1">
            {SIDEBAR_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block px-3 py-1.5 text-xs font-mono transition-all duration-200 origin-left ${
                    isActive
                      ? "text-foreground font-semibold scale-105"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Center Article (9 cols) */}
        <article className="md:col-span-9 space-y-14 max-w-[820px]">
          {/* 1. Introduction */}
          <section className="space-y-6 scroll-mt-24" id="introduction">
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
                Liber UI is a free, open-source asset, typography, and code catalog built for UI/UX designers, front-end engineers, and product creators. It provides clean vector logos, WCAG-compliant color themes, over 7,300 self-hostable open typographies, and responsive UI section blocks — with zero vendor lock-in and zero runtime overhead.
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
                  <Zap className="h-3.5 w-3.5 text-purple-500" />
                  <span>3. Zero Runtime Lock-in</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You own the code. All assets live right in your project files with zero third-party telemetry, tracking, or network calls.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Quickstart & Installation */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="quickstart">
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

          {/* 3. CLI Command Reference */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="cli-reference">
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
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Installs a resource (logo, font, theme, or component) directly into your project.</td>
                    <td className="py-2.5 px-4 text-foreground">liber add font-geist</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber search &lt;query&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Searches the catalog from the terminal.</td>
                    <td className="py-2.5 px-4 text-foreground">liber search minecraft</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber view &lt;slug&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Inspects metadata and dependencies before adding.</td>
                    <td className="py-2.5 px-4 text-foreground">liber view inter</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber init</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Creates a liber.json configuration file.</td>
                    <td className="py-2.5 px-4 text-foreground">liber init</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-primary font-semibold">liber diff &lt;slug&gt;</td>
                    <td className="py-2.5 px-4 font-sans text-muted-foreground">Checks for upstream updates to an installed resource.</td>
                    <td className="py-2.5 px-4 text-foreground">liber diff react</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Typography & Fonts System Guide */}
          <section className="space-y-6 pt-6 border-t border-border scroll-mt-24" id="fonts-guide">
            <div className="flex items-center gap-2">
              <Type className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Typography & Font System
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Liber UI hosts a catalog of over 7,300 typographies classified alphabetically (A–Z) and by authentic themes (Basic, Fancy, Script, Techno, Gothic, Bitmap). Every font in the catalog is 100% free for commercial and personal use (SIL Open Font License, Apache 2.0, or Public Domain).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-[10px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>Method 1 · Liber CLI Installation</span>
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Run <code className="text-primary font-mono">npx @liber-ui/cli add font-&lt;slug&gt;</code>. The CLI automatically writes the font style definition in <code className="font-mono text-foreground">styles/fonts/&lt;slug&gt;.css</code> and links dependencies.
                </p>
              </div>

              <div className="p-4 rounded-[10px] border border-border bg-card space-y-2">
                <span className="font-mono font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>Method 2 · Direct Download (.zip)</span>
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Click the direct &quot;Download&quot; button on any font card to retrieve the authentic <code className="font-mono text-foreground">.zip</code> archive containing the <code className="font-mono text-foreground">.ttf</code> or <code className="font-mono text-foreground">.otf</code> font files.
                </p>
              </div>
            </div>

            {/* Next.js Local Font Code Example */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-foreground">
                How to Self-Host with Next.js (next/font/local):
              </span>
              <div className="rounded-[10px] border border-border bg-card p-4 font-mono text-xs relative group">
                <pre className="text-foreground overflow-x-auto leading-relaxed">
{`// app/layout.tsx
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/fonts/minecraft/Minecraft-Regular.woff2",
  variable: "--font-minecraft",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}`}
                </pre>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import localFont from "next/font/local";\nconst myFont = localFont({\n  src: "../public/fonts/minecraft/Minecraft-Regular.woff2",\n  variable: "--font-minecraft",\n  display: "swap",\n});`,
                      "next-font-snippet",
                      "Next.js local font snippet copied"
                    )
                  }
                  className="absolute top-3 right-3 p-1.5 rounded-[6px] bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedKey === "next-font-snippet" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* CSS @font-face Snippet */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-foreground">
                Standard CSS @font-face Definition:
              </span>
              <div className="rounded-[10px] border border-border bg-card p-4 font-mono text-xs relative group">
                <pre className="text-foreground overflow-x-auto leading-relaxed">
{`@font-face {
  font-family: 'Minecraft';
  src: url('/fonts/minecraft/Minecraft-Regular.woff2') format('woff2'),
       url('/fonts/minecraft/Minecraft-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-minecraft: 'Minecraft', sans-serif;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* 5. Tech & Brand Logos Guide */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="logos-guide">
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

          {/* 6. Color Themes & WCAG AA */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="themes-guide">
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

          {/* 7. CSS & Tailwind Animations */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="animations-guide">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                CSS & Tailwind Animations
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Liber UI replaces generic static blocks with lightweight, hardware-accelerated CSS and Tailwind keyframe animations. Every animation is designed for instant copy-pasting into your project — either as raw CSS <code className="text-foreground">@keyframes</code> or as ready-to-use Tailwind CSS utility classes and configuration snippets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-[10px] border border-border bg-card text-xs space-y-2">
                <div className="flex items-center gap-2 font-mono font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Option 1: Pure CSS</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Copy self-contained <code className="text-foreground">@keyframes</code> declarations and class selectors directly into your global stylesheet. Zero dependencies, pure GPU acceleration.
                </p>
              </div>

              <div className="p-4 rounded-[10px] border border-border bg-card text-xs space-y-2">
                <div className="flex items-center gap-2 font-mono font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Option 2: Tailwind CSS</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Use built-in arbitrary utility classes like <code className="text-foreground">animate-[shimmer_2s_infinite]</code> or copy the modular <code className="text-foreground">tailwind.config.js</code> keyframes extension.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Brand Trademark Policy */}
          <section className="space-y-4 pt-6 border-t border-border scroll-mt-24" id="trademarks">
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
              href="/fonts"
              className="text-foreground font-medium flex items-center gap-1 hover:underline"
            >
              <span>Explore Fonts Catalog</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
