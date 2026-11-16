"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { ComponentItem } from "@/lib/catalog-components-base";
import { ComponentLivePreview } from "@/components/ComponentLivePreview";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Code2,
  Download,
  Eye,
  FileCode2,
  Laptop,
  Maximize2,
  Minimize2,
  Moon,
  Smartphone,
  Sun,
  Tablet,
  Terminal,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  PACKAGE_MANAGERS,
  type PackageManager,
} from "@/lib/package-manager";

interface ComponentDetailViewProps {
  component: ComponentItem;
  relatedComponents: ComponentItem[];
}

function toPascalCase(str: string): string {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, " ");
  const pascal = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return pascal ? (pascal.match(/^[0-9]/) ? `Comp${pascal}` : pascal) : "Component";
}

function getShadcnStyleCommand(pm: PackageManager, slug: string): string {
  switch (pm) {
    case "pnpm":
      return `pnpm dlx @liber-ui/cli@latest add ${slug}`;
    case "npm":
      return `npx @liber-ui/cli@latest add ${slug}`;
    case "yarn":
      return `yarn dlx @liber-ui/cli@latest add ${slug}`;
    case "bun":
      return `bunx --bun @liber-ui/cli@latest add ${slug}`;
  }
}

export default function ComponentDetailView({
  component,
  relatedComponents,
}: ComponentDetailViewProps) {
  const { toast } = useToast();
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [topTab, setTopTab] = useState<"preview" | "code">("preview");
  const [codeTab, setCodeTab] = useState<"tsx" | "html" | "css" | "config">("tsx");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [manualFormat, setManualFormat] = useState<"tsx" | "html">("tsx");
  const [codeExpanded, setCodeExpanded] = useState<boolean>(false);
  const [viewport, setViewport] = useState<"100%" | "768px" | "375px">("100%");
  const [previewDark, setPreviewDark] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const pascalName = toPascalCase(component.slug);
  const exactHtml =
    component.rawHtml ||
    `<div class="p-6">\n  ${component.description}\n</div>`;

  const cssCode = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles and fonts for the component */
@layer base {
  * {
    border-color: hsl(var(--border));
  }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}`;

  const configCode = `import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config`;

  const usageImportCode = `import { ${pascalName} } from "@/components/ui/${component.slug}"`;
  const usageRenderCode = `<${pascalName} />`;
  const cliCommand = getShadcnStyleCommand(pm, component.slug);

  const getDepsCommand = (m: PackageManager) => {
    switch (m) {
      case "pnpm":
        return "pnpm add lucide-react clsx tailwind-merge";
      case "npm":
        return "npm install lucide-react clsx tailwind-merge";
      case "yarn":
        return "yarn add lucide-react clsx tailwind-merge";
      case "bun":
        return "bun add lucide-react clsx tailwind-merge";
    }
  };

  const fullUsageSnippet = `import { ${pascalName} } from "@/components/ui/${component.slug}"

export default function ExamplePage() {
  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <${pascalName} />
    </main>
  )
}`;

  // Escape key exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`File ${filename} downloaded!`);
  };

  const getCodeContent = (tab: "tsx" | "html" | "css" | "config") => {
    switch (tab) {
      case "tsx":
        return component.code;
      case "html":
        return exactHtml;
      case "css":
        return cssCode;
      case "config":
        return configCode;
    }
  };

  const getCodeFilename = (tab: "tsx" | "html" | "css" | "config") => {
    switch (tab) {
      case "tsx":
        return `components/ui/${component.slug}.tsx`;
      case "html":
        return `${component.slug}.html`;
      case "css":
        return "styles/globals.css";
      case "config":
        return "tailwind.config.ts";
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14 sm:space-y-20">
      {/* 1. Breadcrumb & Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-sans font-medium mr-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Components</span>
          </Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[280px]">
            {component.name}
          </span>
        </div>

        {/* Direct Download Buttons (.tsx & .html) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              handleDownloadFile(
                component.code,
                `${component.slug}.tsx`,
                "text/typescript;charset=utf-8"
              )
            }
            className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            <span>Download .tsx</span>
          </button>
          <button
            type="button"
            onClick={() =>
              handleDownloadFile(
                exactHtml,
                `${component.slug}.html`,
                "text/html;charset=utf-8"
              )
            }
            className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Download .html</span>
          </button>
        </div>
      </div>

      {/* 2. Component Header: Title & Description (Clean, No tags, No harsh divider) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-muted text-muted-foreground border border-border capitalize">
            {component.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          {component.name}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
          {component.description}
        </p>
      </div>

      {/* 3. Main Preview / Code Studio (Wide Canvas, Fullscreen mode, Tabs: Preview | Code) */}
      <div className="space-y-4">
        {/* Tabs Bar: Preview | Code + Viewport Controls + Fullscreen Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2.5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTopTab("preview")}
              className={`pb-2.5 -mb-[11px] text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${topTab === "preview"
                  ? "border-foreground text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setTopTab("code")}
              className={`pb-2.5 -mb-[11px] text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${topTab === "code"
                  ? "border-foreground text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Code</span>
            </button>
          </div>

          {/* Right Controls: Viewport Size, Dark/Light Toggle, and Fullscreen */}
          <div className="flex items-center gap-2">
            {topTab === "preview" ? (
              <>
                <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewport("100%")}
                    title="Desktop (100%)"
                    className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${viewport === "100%"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Laptop className="h-3.5 w-3.5" />
                    <span>100%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("768px")}
                    title="Tablet (768px)"
                    className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${viewport === "768px"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Tablet className="h-3.5 w-3.5" />
                    <span>768px</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewport("375px")}
                    title="Mobile (375px)"
                    className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${viewport === "375px"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>375px</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDark((d) => !d)}
                  className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors"
                  title="Basculer le thème Clair / Sombre"
                >
                  {previewDark ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-slate-500" />
                      <span>Dark</span>
                    </>
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors"
                  title="Afficher la prévisualisation en plein écran"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Plein écran</span>
                </button>
              </>
            ) : (
              /* Code sub-tabs: TypeScript, HTML, CSS, Config */
              <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setCodeTab("tsx")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${codeTab === "tsx"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  TypeScript (.tsx)
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("html")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${codeTab === "html"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  HTML
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("css")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${codeTab === "css"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  CSS
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("config")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${codeTab === "config"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Config
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Canvas OR Code Block */}
        {topTab === "preview" ? (
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <ComponentLivePreview
              rawHtml={exactHtml}
              title={component.name}
              mode="full"
              darkMode={previewDark}
              viewportWidth={viewport}
              minHeight={580}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <FileCode2 className="h-3.5 w-3.5 text-neutral-400" />
                <span className="text-neutral-200">{getCodeFilename(codeTab)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadFile(
                      getCodeContent(codeTab),
                      getCodeFilename(codeTab).split("/").pop() || `${component.slug}.txt`,
                      codeTab === "html"
                        ? "text/html;charset=utf-8"
                        : "text/plain;charset=utf-8"
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      getCodeContent(codeTab),
                      `code-${codeTab}`,
                      `Copied ${codeTab.toUpperCase()} code!`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
                >
                  {copiedId === `code-${codeTab}` ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <pre className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed overflow-x-auto max-h-[580px] overflow-y-auto select-all">
              <code>{getCodeContent(codeTab)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* 4. Fullscreen Modal View */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Fullscreen Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-foreground">
                {component.name}
              </h2>
              <span className="text-xs text-muted-foreground hidden md:inline">
                (Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[11px] font-mono">Esc</kbd> to exit)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                <button
                  type="button"
                  onClick={() => setViewport("100%")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono ${viewport === "100%"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground"
                    }`}
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("768px")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono ${viewport === "768px"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground"
                    }`}
                >
                  768px
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("375px")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono ${viewport === "375px"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground"
                    }`}
                >
                  375px
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDark((d) => !d)}
                className="px-2.5 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground"
              >
                {previewDark ? "Light" : "Dark"}
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 shadow-sm"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Canvas */}
          <div className="flex-1 w-full pt-3 overflow-hidden flex items-center justify-center">
            <div
              style={{ width: viewport }}
              className="h-full rounded-2xl border border-border bg-white dark:bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300"
            >
              <iframe
                title={`Fullscreen ${component.name}`}
                srcDoc={`<!DOCTYPE html>
<html lang="en" class="${previewDark ? "dark" : ""}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; width: 100%; min-height: 100vh;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body class="${previewDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}">
  <div class="min-h-screen w-full flex flex-col items-center justify-center p-6">
    <div class="w-full">
      ${exactHtml}
    </div>
  </div>
</body>
</html>`}
                sandbox="allow-scripts"
                className="w-full h-full border-0 block"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Installation Section (Exact shadcn/ui Layout: Command | Manual) */}
      <section className="space-y-8">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Installation
          </h2>
          <p className="text-sm text-muted-foreground">
            Add this component to your project via CLI or manually.
          </p>
        </div>

        {/* Command | Manual Sub-tabs */}
        <div className="flex items-center gap-6 border-b border-border">
          <button
            type="button"
            onClick={() => setInstallTab("cli")}
            className={`pb-3 -mb-px text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${installTab === "cli"
                ? "border-primary text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Command (CLI)</span>
          </button>
          <button
            type="button"
            onClick={() => setInstallTab("manual")}
            className={`pb-3 -mb-px text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${installTab === "manual"
                ? "border-primary text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            <FileCode2 className="h-4 w-4" />
            <span>Manual (Files)</span>
          </button>
        </div>

        {installTab === "cli" ? (
          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-neutral-400 mr-1.5" />
                  {PACKAGE_MANAGERS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPm(m)}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${pm === m
                          ? "bg-neutral-800 text-white font-semibold"
                          : "text-neutral-400 hover:text-neutral-200"
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(cliCommand, "cli-cmd", `Copied ${pm} command!`)
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedId === "cli-cmd" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-neutral-100 overflow-x-auto flex items-center gap-2.5 select-all">
                <span className="text-neutral-500 select-none">$</span>
                <code>{cliCommand}</code>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card/60 text-xs text-muted-foreground space-y-1.5">
              <p className="font-medium text-foreground">
                How automatic installation works:
              </p>
              <p className="leading-relaxed">
                This command automatically installs necessary dependencies and creates the source file{" "}
                <code className="font-mono text-foreground px-1.5 py-0.5 rounded bg-muted">
                  components/ui/{component.slug}.tsx
                </code>{" "}
                in your Next.js / React project with TypeScript types and Tailwind CSS styles.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 pt-2">
            {/* Step 1: Install dependencies */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold text-primary">
                  1
                </span>
                <p className="text-sm font-medium text-foreground">
                  Install the required dependencies in your terminal:
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
                <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-neutral-400 mr-1.5" />
                    {PACKAGE_MANAGERS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPm(m)}
                        className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${pm === m
                            ? "bg-neutral-800 text-white font-semibold"
                            : "text-neutral-400 hover:text-neutral-200"
                          }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        getDepsCommand(pm),
                        "manual-deps",
                        `Dependencies install command copied!`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    {copiedId === "manual-deps" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 font-mono text-xs sm:text-sm text-neutral-100 overflow-x-auto flex items-center gap-2.5 select-all">
                  <span className="text-neutral-500 select-none">$</span>
                  <code>{getDepsCommand(pm)}</code>
                </div>
              </div>
            </div>

            {/* Step 2: Copy or Download Component Source File */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold text-primary">
                    2
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    Create the component file and paste the source code:
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                  <button
                    type="button"
                    onClick={() => setManualFormat("tsx")}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${manualFormat === "tsx"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    components/ui/{component.slug}.tsx
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualFormat("html")}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${manualFormat === "html"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {component.slug}.html
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
                <div className="px-4 py-2.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="h-3.5 w-3.5 text-neutral-400" />
                    <span className="text-neutral-200">
                      {manualFormat === "tsx"
                        ? `components/ui/${component.slug}.tsx`
                        : `${component.slug}.html`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadFile(
                          manualFormat === "tsx" ? component.code : exactHtml,
                          manualFormat === "tsx"
                            ? `${component.slug}.tsx`
                            : `${component.slug}.html`,
                          manualFormat === "tsx"
                            ? "text/typescript;charset=utf-8"
                            : "text/html;charset=utf-8"
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          manualFormat === "tsx" ? component.code : exactHtml,
                          "manual-code",
                          "Source code copied!"
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
                    >
                      {copiedId === "manual-code" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div
                  className={`relative overflow-hidden transition-all ${codeExpanded ? "max-h-[900px]" : "max-h-[320px]"
                    }`}
                >
                  <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed overflow-x-auto select-all">
                    <code>
                      {manualFormat === "tsx" ? component.code : exactHtml}
                    </code>
                  </pre>

                  {!codeExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent flex items-end justify-center pb-3">
                      <button
                        type="button"
                        onClick={() => setCodeExpanded(true)}
                        className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white border border-neutral-700 shadow-md transition-colors"
                      >
                        Expand code
                      </button>
                    </div>
                  )}
                </div>

                {codeExpanded && (
                  <div className="border-t border-neutral-800 py-2 flex justify-center bg-neutral-950">
                    <button
                      type="button"
                      onClick={() => setCodeExpanded(false)}
                      className="px-3 py-1 rounded-md text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      Collapse
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Import and use */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-semibold text-primary">
                  3
                </span>
                <p className="text-sm font-medium text-foreground">
                  Import and render the component in your page or layout:
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
                <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>app/page.tsx</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(fullUsageSnippet, "manual-full-usage", "Usage example copied!")
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    {copiedId === "manual-full-usage" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 font-mono text-xs sm:text-[13px] text-neutral-200 overflow-x-auto select-all leading-relaxed">
                  <code>{fullUsageSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Usage Section (Exact shadcn/ui Layout: Import + JSX) */}
      <section className="space-y-8">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick snippets to import and instantiate this component.
          </p>
        </div>

        {/* Import Block */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Import</span>
            <button
              type="button"
              onClick={() =>
                handleCopy(usageImportCode, "usage-import", "Import snippet copied!")
              }
              className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              {copiedId === "usage-import" ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-[13px] text-neutral-200 overflow-x-auto select-all">
            <code>{usageImportCode}</code>
          </pre>
        </div>

        {/* Render Block */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>JSX</span>
            <button
              type="button"
              onClick={() =>
                handleCopy(usageRenderCode, "usage-jsx", "JSX snippet copied!")
              }
              className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              {copiedId === "usage-jsx" ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <pre className="p-4 font-mono text-xs sm:text-[13px] text-neutral-200 overflow-x-auto select-all">
            <code>{usageRenderCode}</code>
          </pre>
        </div>
      </section>

      {/* 7. Related Components Grid */}
      {relatedComponents.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                Similar Components
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Explore other components in the {component.category} category.
              </p>
            </div>
            <Link
              href="/components"
              className="text-xs font-mono text-primary hover:underline"
            >
              View full catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedComponents.map((rel) => (
              <Link
                key={rel.slug}
                href={`/components/${rel.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/35 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="px-4 py-3 border-b border-border/80 bg-muted/20 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {rel.name}
                  </h3>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 shrink-0" />
                </div>

                <div className="relative border-b border-border/80 overflow-hidden bg-slate-50 dark:bg-slate-950">
                  <ComponentLivePreview
                    rawHtml={rel.rawHtml || ""}
                    title={rel.name}
                    mode="thumbnail"
                  />
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs bg-card">
                  <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                    {rel.description}
                  </span>
                  <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors flex items-center gap-1 shrink-0">
                    View component <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
