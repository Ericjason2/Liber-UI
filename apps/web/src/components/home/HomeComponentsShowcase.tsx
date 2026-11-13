"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Mail,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Minus,
} from "lucide-react";
import { EditorialDivider, TiltedPill } from "./HomePrimitives";
import { ScrollReveal, getRevealMotionProps, useInViewOnce } from "./ScrollReveal";
import { OFFICIAL_LOGOS } from "@/lib/catalog-logos";
import { SAMPLE_ANIMATIONS } from "@/lib/catalog-animations";
import { SAMPLE_COMPONENTS } from "@/lib/catalog-components";
import { BASE_THEMES } from "@/lib/catalog-themes-base";
import { BASE_FONTS } from "@/lib/catalog-fonts-base";
import { useToast } from "@/context/ToastContext";

/**
 * Module 5 — Interactive UI Kit Matrix & Recently Added Strip inspired by Behance Modules 8, 9 & 10.
 * Features Figma dashed component-set frames for interactive Switches/Checkboxes/Radios,
 * live semantic Alerts & Text Fields, plus Liber's 4-family Recently Added strip.
 */
export function HomeComponentsShowcase() {
  const { toast } = useToast();
  const [recentRef, recentVisible] = useInViewOnce<HTMLDivElement>();
  const [switchActive, setSwitchActive] = useState(true);
  const [checkboxState, setCheckboxState] = useState<"unchecked" | "checked" | "indeterminate">("checked");
  const [radioValue, setRadioValue] = useState<"react" | "svg">("react");
  const [emailInput, setEmailInput] = useState("design@liber.dev");
  const [dismissedAlert, setDismissedAlert] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const featuredLogo = OFFICIAL_LOGOS[0];
  const featuredAnimation = SAMPLE_ANIMATIONS[0];
  const featuredTheme = BASE_THEMES[0];
  const featuredFont = BASE_FONTS[0];

  const handleCopyCmd = (cmd: string, slug: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedSlug(slug);
    toast("Copied install command");
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <section className="space-y-20 sm:space-y-28">
      {/* Part A: Interactive UI Design Components Studio */}
      <div className="space-y-12 sm:space-y-14">
        <ScrollReveal variant="fade-up">
          <div className="space-y-10 sm:space-y-12">
            <EditorialDivider left="UI Components" center="Liber UI" index="05" />

            {/* Centered Headline with Inline Tilted Pill */}
            <div className="text-center space-y-5 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                UI Design{" "}
                <TiltedPill className="-rotate-2 mx-1 text-lg sm:text-2xl px-4 py-1 align-middle">
                  Ready
                </TiltedPill>{" "}
                Components
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {SAMPLE_COMPONENTS.length} accessible TypeScript primitives built with clean Tailwind
                utilities. Inspect states live or install straight into your repo via CLI.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Interactive Showcase Card */}
        <ScrollReveal variant="scale-in" delay={150}>
        <div className="relative rounded-[24px] border border-border bg-card p-7 sm:p-12 space-y-10 liber-showcase-frame">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (5 cols): Interactive Controls in Figma Dashed Component-Set Boxes */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Interactive Controls · Click to Test
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground">Component Set</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Dashed Figma Bounding Box: Switch & Radio */}
                <div className="rounded-[16px] border-[1.5px] border-dashed border-[#2563EB]/45 dark:border-[#38BDF8]/45 bg-surface-subtle/40 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-foreground">Toggle Switch</div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        {switchActive ? "Active · On" : "Inactive · Off"}
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={switchActive}
                      onClick={() => setSwitchActive((prev) => !prev)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        switchActive ? "bg-[#2563EB] dark:bg-[#38BDF8]" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-[#090D16] transition-transform ${
                          switchActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Radio Pair */}
                  <div className="pt-3 border-t border-dashed border-border flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-foreground">Output Format</span>
                    <div className="flex items-center gap-3">
                      {(["react", "svg"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setRadioValue(option)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground"
                        >
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                              radioValue === option
                                ? "border-[#2563EB] dark:border-[#38BDF8]"
                                : "border-muted-foreground/50"
                            }`}
                          >
                            {radioValue === option && (
                              <span className="h-2 w-2 rounded-full bg-[#2563EB] dark:bg-[#38BDF8]" />
                            )}
                          </span>
                          <span className="uppercase">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashed Figma Bounding Box: Tri-state Checkbox Matrix */}
                <div className="rounded-[16px] border-[1.5px] border-dashed border-[#2563EB]/45 dark:border-[#38BDF8]/45 bg-surface-subtle/40 p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-foreground">Tri-State Checkbox</div>
                    <div className="text-[11px] font-mono text-muted-foreground capitalize">
                      State: {checkboxState}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(["unchecked", "checked", "indeterminate"] as const).map((state) => {
                      const active = checkboxState === state;
                      return (
                        <button
                          key={state}
                          type="button"
                          onClick={() => setCheckboxState(state)}
                          aria-label={`Set checkbox ${state}`}
                          className={`h-6 w-6 rounded-[6px] border flex items-center justify-center transition-colors ${
                            state === "unchecked"
                              ? active
                                ? "border-[#2563EB] dark:border-[#38BDF8] bg-card ring-2 ring-ring/20"
                                : "border-border bg-card"
                              : active
                              ? "border-[#2563EB] bg-[#2563EB] text-white dark:border-[#38BDF8] dark:bg-[#38BDF8] dark:text-[#090D16] ring-2 ring-ring/30"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {state === "checked" && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                          {state === "indeterminate" && <Minus className="h-3.5 w-3.5 stroke-[2.5]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Text Fields & Semantic Alerts Matrix */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Text Fields &amp; Alert Notifications
                </h3>
                <Link
                  href="/components"
                  className="text-xs font-mono font-medium text-[#2563EB] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-1"
                >
                  <span>All {SAMPLE_COMPONENTS.length} components</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Input Field States */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="home-demo-email"
                    className="block text-[11px] font-mono text-muted-foreground"
                  >
                    Focused / Editable Input
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                    <input
                      id="home-demo-email"
                      name="home-demo-email"
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full h-9 pl-8 pr-3 rounded-[10px] border border-[#2563EB] dark:border-[#38BDF8] bg-card text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-[11px] font-mono text-muted-foreground">
                    Validation Feedback State
                  </span>
                  <div className="h-9 px-3 rounded-[10px] border border-emerald-500/70 bg-emerald-500/5 flex items-center justify-between text-xs text-foreground">
                    <span className="truncate font-mono">@liber-ui/logo · Ready</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Alerts Stack (Behance Module 10 inspired) */}
              <div className="space-y-2.5">
                {!dismissedAlert ? (
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] border border-emerald-500/25 bg-emerald-500/10 text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-foreground">Success!</span>{" "}
                        <span className="text-muted-foreground">Component registry manifest verified.</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDismissedAlert(true)}
                      aria-label="Dismiss success alert"
                      className="h-6 w-6 rounded-full hover:bg-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDismissedAlert(false)}
                    className="w-full py-2 rounded-[12px] border border-dashed border-border text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ↺ Restore dismissed alert
                  </button>
                )}

                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] border border-[#2563EB]/25 dark:border-[#38BDF8]/25 bg-[#2563EB]/10 dark:bg-[#38BDF8]/10 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Info className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">Information</span>{" "}
                      <span className="text-muted-foreground">
                        CDN stylesheets support Tailwind v3 &amp; native CSS.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] border border-rose-500/25 bg-rose-500/10 text-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">Warning</span>{" "}
                      <span className="text-muted-foreground">
                        Always follow brand guidelines for trademarked logos.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Copy full JSX snippets or install any primitive using{" "}
              <code className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-foreground">
                npx @liber-ui/cli add button
              </code>
            </p>
            <Link
              href="/components"
              className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <span>Open Components Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </div>

      {/* Part B: Recently Added Strip (4 Real Asset Families) */}
      <div className="space-y-8">
        <ScrollReveal variant="fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">Recently Added</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Fresh additions ready to inspect or install across all asset families.
            </p>
          </div>
          <Link
            href="/logos"
            className="text-xs font-mono font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <span>View catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        </ScrollReveal>

        <div ref={recentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredLogo && (() => {
            const m = getRevealMotionProps(recentVisible, 0, 1450);
            return (
            <div style={m.style} className={`p-4 rounded-[16px] border border-border bg-card space-y-4 flex flex-col justify-between ${m.className}`}>
              <Link href={`/logos/${featuredLogo.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-[10px] border border-border bg-surface-subtle flex items-center justify-center p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/svg/${featuredLogo.slug}/color.svg`}
                      alt={featuredLogo.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Logo
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                    {featuredLogo.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {featuredLogo.description}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() =>
                  handleCopyCmd(`npx @liber-ui/cli add ${featuredLogo.slug}`, featuredLogo.slug)
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">add {featuredLogo.slug}</span>
                {copiedSlug === featuredLogo.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            );
          })()}

          {featuredAnimation && (() => {
            const m = getRevealMotionProps(recentVisible, 170, 1450);
            return (
            <div style={m.style} className={`p-4 rounded-[16px] border border-border bg-card space-y-4 flex flex-col justify-between ${m.className}`}>
              <Link href={`/animations#${featuredAnimation.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 h-9">
                    <div className="h-2.5 w-7 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] animate-pulse" />
                    <div className="h-2.5 w-4 rounded-full bg-foreground/25" />
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground uppercase">
                    Animation
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                    {featuredAnimation.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {featuredAnimation.description}
                  </p>
                </div>
              </Link>
              <Link
                href="/animations"
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">Explore Animations</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            );
          })()}

          {featuredTheme && (() => {
            const m = getRevealMotionProps(recentVisible, 340, 1450);
            return (
            <div style={m.style} className={`p-4 rounded-[16px] border border-border bg-card space-y-4 flex flex-col justify-between ${m.className}`}>
              <Link href={`/themes#palette-${featuredTheme.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between h-9">
                  <div className="flex items-center gap-1">
                    {featuredTheme.swatches.slice(0, 4).map((c, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded-[5px] border border-border"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Theme
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                    {featuredTheme.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {featuredTheme.description}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() =>
                  handleCopyCmd(
                    `npx @liber-ui/cli add theme-${featuredTheme.slug}`,
                    featuredTheme.slug
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">copy tokens</span>
                {copiedSlug === featuredTheme.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            );
          })()}

          {featuredFont && (() => {
            const m = getRevealMotionProps(recentVisible, 510, 1450);
            return (
            <div style={m.style} className={`p-4 rounded-[16px] border border-border bg-card space-y-4 flex flex-col justify-between ${m.className}`}>
              <Link href={`/fonts/${featuredFont.slug}`} className="space-y-3 group">
                <div className="flex items-center justify-between h-9">
                  <span className="text-xl font-mono font-semibold text-foreground">Aa</span>
                  <span className="text-[10px] font-mono border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    Font
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                    {featuredFont.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {featuredFont.description}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() =>
                  handleCopyCmd(
                    `npx @liber-ui/cli add font-${featuredFont.slug}`,
                    featuredFont.slug
                  )
                }
                className="w-full flex items-center justify-between h-8 px-2.5 rounded-[8px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="truncate">add font-{featuredFont.slug}</span>
                {copiedSlug === featuredFont.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

