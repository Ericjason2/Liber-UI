"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { ComponentItem } from "@/lib/catalog-components-base";
import { ComponentLivePreview } from "@/components/ComponentLivePreview";
import {
  ArrowLeft,
  Check,
  Copy,
  Code2,
  Download,
  Eye,
  FileCode2,
  Laptop,
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
  const [topCodeFormat, setTopCodeFormat] = useState<"tsx" | "html">("tsx");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [manualFormat, setManualFormat] = useState<"tsx" | "html">("tsx");
  const [codeExpanded, setCodeExpanded] = useState<boolean>(false);
  const [viewport, setViewport] = useState<"100%" | "768px" | "375px">("100%");
  const [previewDark, setPreviewDark] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const pascalName = toPascalCase(component.slug);
  const exactHtml =
    component.rawHtml ||
    `<div class="p-6">\n  ${component.description}\n</div>`;

  const demoTsxCode = `import { ${pascalName} } from "@/components/ui/${component.slug}"

export function ${pascalName}Demo() {
  return (
    <${pascalName} />
  )
}`;

  const usageImportCode = `import { ${pascalName} } from "@/components/ui/${component.slug}"`;

  const usageRenderCode = `<${pascalName} />`;

  const cliCommand = getShadcnStyleCommand(pm, component.slug);

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
    toast(`Fichier ${filename} téléchargé !`);
  };

  return (
    <div className="max-w-[1040px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
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
          <span className="text-foreground font-medium truncate max-w-[260px]">
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
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            <span>Télécharger .tsx</span>
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
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Télécharger .html</span>
          </button>
        </div>
      </div>

      {/* 2. Component Title & Description (Clean shadcn/ui Header) */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {component.name}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            {component.description}
          </p>
        </div>

        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {component.tags.map((tag) => (
              <Link
                key={tag}
                href={`/components?tag=${encodeURIComponent(tag)}`}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 3. Main Preview / Code Studio (shadcn/ui Top Section) */}
      <div className="space-y-3">
        {/* Tabs Bar: Preview | Code + Responsive Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTopTab("preview")}
              className={`pb-2 -mb-[9px] text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                topTab === "preview"
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
              className={`pb-2 -mb-[9px] text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                topTab === "code"
                  ? "border-foreground text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Code</span>
            </button>
          </div>

          {/* Right Controls: Viewport Size & Light/Dark Toggle */}
          <div className="flex items-center gap-2">
            {topTab === "preview" ? (
              <>
                <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewport("100%")}
                    title="Desktop (100%)"
                    className={`px-2 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${
                      viewport === "100%"
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
                    className={`px-2 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${
                      viewport === "768px"
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
                    className={`px-2 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors ${
                      viewport === "375px"
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
              </>
            ) : (
              <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                <button
                  type="button"
                  onClick={() => setTopCodeFormat("tsx")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                    topCodeFormat === "tsx"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  React (TSX)
                </button>
                <button
                  type="button"
                  onClick={() => setTopCodeFormat("html")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                    topCodeFormat === "html"
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Tailwind HTML
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Canvas OR Demo Code Block */}
        {topTab === "preview" ? (
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <ComponentLivePreview
              rawHtml={exactHtml}
              title={component.name}
              mode="full"
              darkMode={previewDark}
              viewportWidth={viewport}
              minHeight={520}
            />
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>
                {topCodeFormat === "tsx"
                  ? `${component.slug}-demo.tsx`
                  : `${component.slug}.html`}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    topCodeFormat === "tsx" ? demoTsxCode : exactHtml,
                    "top-code",
                    "Code copié dans le presse-papiers !"
                  )
                }
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
              >
                {copiedId === "top-code" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>Copier</span>
              </button>
            </div>
            <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-neutral-200 leading-relaxed overflow-x-auto max-h-[520px] overflow-y-auto select-all">
              <code>{topCodeFormat === "tsx" ? demoTsxCode : exactHtml}</code>
            </pre>
          </div>
        )}
      </div>

      {/* 4. Installation Section (Exact shadcn/ui Layout: Command | Manual) */}
      <section className="space-y-4 pt-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-2">
          Installation
        </h2>

        {/* Command | Manual Sub-tabs */}
        <div className="flex items-center gap-4 border-b border-border">
          <button
            type="button"
            onClick={() => setInstallTab("cli")}
            className={`pb-2.5 -mb-px text-sm font-medium border-b-2 transition-colors ${
              installTab === "cli"
                ? "border-foreground text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Command
          </button>
          <button
            type="button"
            onClick={() => setInstallTab("manual")}
            className={`pb-2.5 -mb-px text-sm font-medium border-b-2 transition-colors ${
              installTab === "manual"
                ? "border-foreground text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Manual
          </button>
        </div>

        {installTab === "cli" ? (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5 text-neutral-400 mr-1.5" />
                {PACKAGE_MANAGERS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPm(m)}
                    className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
                      pm === m
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
                  handleCopy(cliCommand, "cli-cmd", `Commande ${pm} copiée !`)
                }
                className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                title="Copier la commande"
              >
                {copiedId === "cli-cmd" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="p-4 font-mono text-xs sm:text-sm text-neutral-100 overflow-x-auto select-all">
              <code>{cliCommand}</code>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Step 1: Copy or Download Component Source File */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted border border-border text-xs font-mono font-semibold text-foreground">
                    1
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    Copiez et collez le code suivant dans votre projet ou téléchargez le fichier.
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
                  <button
                    type="button"
                    onClick={() => setManualFormat("tsx")}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      manualFormat === "tsx"
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    components/ui/{component.slug}.tsx
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualFormat("html")}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      manualFormat === "html"
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
                      <span>Télécharger</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          manualFormat === "tsx" ? component.code : exactHtml,
                          "manual-code",
                          "Code source copié !"
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 transition-colors"
                    >
                      {copiedId === "manual-code" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>Copier</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`relative overflow-hidden transition-all ${
                    codeExpanded ? "max-h-[900px]" : "max-h-[320px]"
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

            {/* Step 2: Update import paths */}
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted border border-border text-xs font-mono font-semibold text-foreground">
                2
              </span>
              <p className="text-sm font-medium text-foreground">
                Mettez à jour les chemins d&apos;importation selon la configuration de votre projet.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 5. Usage Section (Exact shadcn/ui Layout: Import + JSX) */}
      <section className="space-y-4 pt-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-2">
          Usage
        </h2>

        {/* Import Block */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden shadow-sm">
          <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Import</span>
            <button
              type="button"
              onClick={() =>
                handleCopy(usageImportCode, "usage-import", "Import copié !")
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
          <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>JSX</span>
            <button
              type="button"
              onClick={() =>
                handleCopy(usageRenderCode, "usage-jsx", "JSX copié !")
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

      {/* 6. Related Components Grid */}
      {relatedComponents.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Composants similaires
              </h2>
              <p className="text-xs text-muted-foreground">
                Cliquez sur un composant pour ouvrir sa prévisualisation et ses instructions d&apos;installation.
              </p>
            </div>
            <Link
              href="/components"
              className="text-xs font-mono text-primary hover:underline"
            >
              Voir tout le catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedComponents.map((rel) => (
              <Link
                key={rel.slug}
                href={`/components/${rel.slug}`}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="relative border-b border-border overflow-hidden">
                  <ComponentLivePreview
                    rawHtml={rel.rawHtml || ""}
                    title={rel.name}
                    mode="thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-md">
                      Voir le composant →
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {rel.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize shrink-0">
                    {rel.category}
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
