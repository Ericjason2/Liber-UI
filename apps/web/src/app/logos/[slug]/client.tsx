"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  Download,
  ExternalLink,
  AlertTriangle,
  ChevronRight,
  Check,
  Sun,
  Moon,
} from "lucide-react";
import type { LogoItem } from "@/lib/catalog";
import { useToast } from "@/context/ToastContext";

interface Props {
  logo: LogoItem;
  relatedLogos: LogoItem[];
}

type CodeTab = "react" | "svg" | "cdn" | "cli";

export function LogoDetailClient({ logo, relatedLogos }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<"color" | "mono" | "wordmark">("color");
  const [previewSize, setPreviewSize] = useState(128);
  const [previewDarkBg, setPreviewDarkBg] = useState(false);
  const [monoColor, setMonoColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState<CodeTab>("react");
  const [svgContent, setSvgContent] = useState<string>("");
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [pngSize, setPngSize] = useState<number>(256);
  const { toast } = useToast();

  const variantKeys = Object.keys(logo.variants) as ("color" | "mono" | "wordmark")[];
  const currentVariant = logo.variants[selectedVariant] ? selectedVariant : "color";

  useEffect(() => {
    fetch(`/svg/${logo.slug}/${currentVariant}.svg`)
      .then((r) => r.text())
      .then((text) => setSvgContent(text))
      .catch(() => setSvgContent(""));
  }, [logo.slug, currentVariant]);

  const pascalName = logo.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const pascalVariant = currentVariant.charAt(0).toUpperCase() + currentVariant.slice(1);
  const reactComponentName = `${pascalName}${pascalVariant}`;

  const getCodeSnippet = () => {
    const effectiveSvg =
      currentVariant === "mono" && monoColor !== "#000000"
        ? svgContent.replace(/currentColor/g, monoColor)
        : svgContent;

    switch (activeTab) {
      case "react":
        return `import { ${reactComponentName} } from "@liber-ui/react";\n\nexport function TechStack() {\n  return <${reactComponentName} size={32}${currentVariant === "mono" && monoColor !== "#000000" ? ` color="${monoColor}"` : ""} />;\n}`;
      case "svg":
        return effectiveSvg;
      case "cdn":
        return `https://liber-ui-delta.vercel.app/r/${logo.slug}.json`;
      case "cli":
        return `npx @liber-ui/cli add ${logo.slug}`;
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast(`Copied ${type}`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadSvg = () => {
    const effectiveSvg =
      currentVariant === "mono" && monoColor !== "#000000"
        ? svgContent.replace(/currentColor/g, monoColor)
        : svgContent;

    const blob = new Blob([effectiveSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${logo.slug}-${currentVariant}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast(`Downloaded ${logo.name} SVG`);
  };

  const handleDownloadPng = (size: number) => {
    if (!svgContent) return;
    const effectiveSvg =
      currentVariant === "mono" && monoColor !== "#000000"
        ? svgContent.replace(/currentColor/g, monoColor)
        : svgContent;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const blob = new Blob([effectiveSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${logo.slug}-${currentVariant}-${size}px.png`;
      a.click();
      toast(`Downloaded PNG (${size}×${size}px)`);
    };
    img.src = url;
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Liber
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/logos" className="hover:text-foreground">
          Logos
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{logo.name}</span>
      </nav>

      {/* Main 2-column layout (7 / 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Large Preview & Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`relative aspect-[4/3] rounded-xl border border-border flex items-center justify-center p-8 transition-colors ${
              previewDarkBg ? "bg-neutral-950 text-white" : "bg-card text-neutral-900"
            } bg-grid-dots`}
            style={{ color: currentVariant === "mono" ? monoColor : undefined }}
          >
            {svgContent ? (
              <div
                className="max-w-full max-h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full transition-all"
                style={{
                  width: `${previewSize}px`,
                  height: `${previewSize}px`,
                  color: currentVariant === "mono" ? monoColor : undefined,
                }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <img
                src={`/svg/${logo.slug}/${currentVariant}.svg`}
                alt={`${logo.name} preview`}
                style={{
                  width: `${previewSize}px`,
                  height: `${previewSize}px`,
                }}
                className="max-w-full max-h-full object-contain transition-all"
              />
            )}

            {/* Top-right preview mode toggle */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setPreviewDarkBg((prev) => !prev)}
                title="Toggle preview background"
                className="h-8 w-8 rounded-[10px] border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {previewDarkBg ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Variant Selection Thumbnails */}
          <div className="flex items-center gap-3">
            {variantKeys.map((vKey) => (
              <button
                key={vKey}
                onClick={() => setSelectedVariant(vKey)}
                className={`flex-1 p-3 rounded-[10px] border text-left transition-all flex items-center justify-between ${
                  currentVariant === vKey
                    ? "border-primary bg-card ring-1 ring-primary"
                    : "border-border bg-surface-subtle hover:bg-card"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold capitalize text-foreground">{vKey}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {vKey === "color" ? logo.variants.color.hex : ".svg"}
                  </div>
                </div>
                <img
                  src={`/svg/${logo.slug}/${vKey}.svg`}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </button>
            ))}
          </div>

          {/* Toolbar: Size Slider & Mono Color Picker */}
          <div className="p-4 rounded-[10px] border border-border bg-surface-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">Size</span>
              <input
                type="range"
                min="16"
                max="256"
                step="8"
                value={previewSize}
                onChange={(e) => setPreviewSize(Number(e.target.value))}
                className="w-32 accent-primary cursor-pointer"
              />
              <span className="font-mono text-muted-foreground w-12">{previewSize}px</span>
            </div>

            {currentVariant === "mono" && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Color</span>
                <input
                  type="color"
                  value={monoColor}
                  onChange={(e) => setMonoColor(e.target.value)}
                  className="h-6 w-7 p-0 border border-border rounded cursor-pointer bg-transparent"
                />
                <span className="font-mono text-muted-foreground">{monoColor}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Details, Code Tabs & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">{logo.name}</h1>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                {logo.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{logo.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {logo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-muted-foreground border border-border rounded px-2 py-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Code Tabbed View */}
          <div className="rounded-[10px] border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-2">
              <div className="flex items-center">
                {(["react", "svg", "cdn", "cli"] as CodeTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === tab
                        ? "border-primary text-foreground font-semibold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(getCodeSnippet(), activeTab)}
                className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground"
              >
                {copiedType === activeTab ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedType === activeTab ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="p-3 bg-card overflow-x-auto max-h-48 text-xs font-mono leading-relaxed text-foreground whitespace-pre">
              {getCodeSnippet()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(svgContent, "SVG code")}
                className="flex-1 h-10 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy SVG</span>
              </button>
              <button
                onClick={handleDownloadSvg}
                className="flex-1 h-10 rounded-[10px] border border-border bg-card text-foreground text-xs font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download SVG</span>
              </button>
            </div>

            {/* PNG Download row with sizes */}
            <div className="flex items-center gap-2">
              <select
                value={pngSize}
                onChange={(e) => setPngSize(Number(e.target.value))}
                className="h-9 px-2 text-xs font-mono rounded-[10px] border border-border bg-card text-foreground focus:outline-none"
              >
                <option value={64}>64×64 px</option>
                <option value={128}>128×128 px</option>
                <option value={256}>256×256 px</option>
                <option value={512}>512×512 px</option>
              </select>
              <button
                onClick={() => handleDownloadPng(pngSize)}
                className="flex-1 h-9 rounded-[10px] border border-border bg-surface-subtle text-foreground text-xs font-medium hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="h-3 w-3" />
                <span>Download PNG ({pngSize}px)</span>
              </button>
            </div>
          </div>

          {/* Brand Usage Compliance Box */}
          <div className="p-4 rounded-[10px] border border-border bg-surface-subtle space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-foreground">Brand Usage & Trademarks</span>
                <p className="text-muted-foreground leading-relaxed">
                  {logo.name} is a registered trademark of {logo.author}. Use is strictly intended to refer to the technology. Do not imply sponsorship or endorsement.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex flex-col gap-1.5 text-xs">
              <a
                href={logo.brandGuidelinesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Official brand guidelines</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={logo.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <span>Source of this file</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="pt-1 text-[11px] text-muted-foreground">
              Something wrong?{" "}
              <Link href="/legal#takedown" className="underline hover:text-foreground">
                Request removal or a fix under 7 days
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Logos */}
      {relatedLogos.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Related logos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {relatedLogos.map((rel) => (
              <Link
                key={rel.slug}
                href={`/logos/${rel.slug}`}
                className="p-4 rounded-xl border border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-500 transition-all flex flex-col items-center justify-between text-center gap-3 aspect-square"
              >
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={`/svg/${rel.slug}/color.svg`}
                    alt={rel.name}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-foreground truncate w-full">
                  {rel.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
