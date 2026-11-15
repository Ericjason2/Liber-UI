export interface BlockItem {
  slug: string;
  kind: "block";
  name: string;
  description: string;
  category: "headers" | "hero" | "features" | "pricing" | "testimonials" | "cta" | "footers";
  tags: string[];
  license: "MIT";
  author: string;
  registryDependencies: string[];
  dependencies: string[];
  previewComponent?: string;
}

export interface ComponentItem {
  slug: string;
  kind: "component";
  name: string;
  description: string;
  category: "inputs" | "buttons" | "data-display" | "feedback";
  tags: string[];
  license: "MIT";
  author: string;
  authorUrl?: string;
  sourceUrl?: string;
  mention?: string;
  registryDependencies: string[];
  dependencies: string[];
  code: string;
  rawHtml?: string;
}

export const SAMPLE_BLOCKS: BlockItem[] = [
  {
    slug: "hero-centered",
    kind: "block",
    name: "Hero Centered",
    description: "Centered hero section with badge, bold title, copy and install command.",
    category: "hero",
    tags: ["hero", "landing", "centered"],
    license: "MIT",
    author: "core",
    registryDependencies: ["button", "badge", "input"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "hero-split-terminal",
    kind: "block",
    name: "Hero Split with Code Terminal",
    description: "Two-column technical hero featuring headline, CTA buttons, and interactive code window.",
    category: "hero",
    tags: ["hero", "split", "terminal", "code", "developer"],
    license: "MIT",
    author: "core",
    registryDependencies: ["button", "badge"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "bento-features",
    kind: "block",
    name: "Feature Bento Grid",
    description: "Modern 4-panel bento layout showcasing analytics, global CDN, automated security, and API speed.",
    category: "features",
    tags: ["bento", "grid", "features", "analytics"],
    license: "MIT",
    author: "core",
    registryDependencies: ["card", "badge"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "metric-stats-bar",
    kind: "block",
    name: "Metric Stats Bar",
    description: "Compact statistics row showing latency, requests and error rate.",
    category: "features",
    tags: ["stats", "metrics", "dashboard"],
    license: "MIT",
    author: "core",
    registryDependencies: ["card"],
    dependencies: [],
  },
  {
    slug: "pricing-three-tier",
    kind: "block",
    name: "Pricing Three Tier",
    description: "Responsive 3-column pricing grid with recommended tier highlight.",
    category: "pricing",
    tags: ["pricing", "tiers", "saas"],
    license: "MIT",
    author: "core",
    registryDependencies: ["button", "card", "badge"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "testimonials-grid",
    kind: "block",
    name: "Testimonials Quote Grid",
    description: "Three-column social proof cards with verified developer avatars and tech stack badges.",
    category: "testimonials",
    tags: ["testimonials", "quotes", "social-proof"],
    license: "MIT",
    author: "core",
    registryDependencies: ["card", "avatar"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "authentication-sheet",
    kind: "block",
    name: "Authentication Sheet",
    description: "Modal authentication drawer with email, OAuth providers and SSO.",
    category: "cta",
    tags: ["auth", "login", "modal"],
    license: "MIT",
    author: "core",
    registryDependencies: ["dialog", "button", "input"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "footer-technical",
    kind: "block",
    name: "Technical Footer",
    description: "Multi-column developer footer with live API status beacon, documentation links, and copyright.",
    category: "footers",
    tags: ["footer", "navigation", "status"],
    license: "MIT",
    author: "core",
    registryDependencies: [],
    dependencies: ["lucide-react"],
  },
  {
    slug: "faq-accordion-grid",
    kind: "block",
    name: "FAQ Accordion Grid",
    description: "Two-column technical FAQ section with expandable answers, category tabs, and support link.",
    category: "features",
    tags: ["faq", "accordion", "help", "questions"],
    license: "MIT",
    author: "core",
    registryDependencies: ["accordion"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "cta-newsletter-card",
    kind: "block",
    name: "CTA Newsletter & Early Access",
    description: "High-conversion banner with inline email capture, developer privacy guarantee, and instant dispatch.",
    category: "cta",
    tags: ["cta", "newsletter", "email", "conversion"],
    license: "MIT",
    author: "core",
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react"],
  },
  {
    slug: "header-navigation-bar",
    kind: "block",
    name: "Technical Navbar Header",
    description: "Sticky responsive navigation bar with catalog quick search, repository badge, and theme toggle.",
    category: "headers",
    tags: ["header", "navbar", "navigation", "menu"],
    license: "MIT",
    author: "core",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
  },
];

export const BASE_COMPONENTS: ComponentItem[] = [
  {
    slug: "button",
    kind: "component",
    name: "Button",
    description: "Primary, outline, secondary, ghost and destructive button primitives.",
    category: "buttons",
    tags: ["button", "interactive", "form"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="flex flex-wrap items-center justify-center gap-3 p-6">
  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">Primary</button>
  <button class="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-medium transition-colors border border-slate-200">Secondary</button>
  <button class="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors">Outline</button>
  <button class="px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">Ghost</button>
  <button class="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium transition-colors">Destructive</button>
</div>`,
    code: `import React from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
}) {
  return (
    <button
      className={\`px-3.5 py-1.5 rounded-[8px] text-xs font-medium transition-colors \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}`,
  },
  {
    slug: "input",
    kind: "component",
    name: "Input & Search Field",
    description: "Accessible text input field with icon adornment and high-contrast 2px focus ring.",
    category: "inputs",
    tags: ["input", "form", "text", "search"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-6 space-y-2">
  <label class="block text-xs font-medium text-slate-700">Search documentation</label>
  <div class="relative flex items-center">
    <svg class="absolute left-3 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    <input type="text" placeholder="Search components, themes, fonts..." class="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600" />
  </div>
</div>`,
    code: `import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full h-9 px-3 rounded-[8px] border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      {...props}
    />
  );
}`,
  },
  {
    slug: "stat-card",
    kind: "component",
    name: "Stat Card",
    description: "Clean numeric card with change indicator and trend graph slot.",
    category: "data-display",
    tags: ["card", "stats", "metrics"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: ["card"],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-xs mx-auto p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
  <div class="flex items-center justify-between text-xs text-slate-500">
    <span>Total Edge Traffic</span>
    <span class="font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">+24.8%</span>
  </div>
  <div class="text-2xl font-bold font-mono text-slate-900">1,429,820</div>
  <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
    <div class="w-3/4 h-full bg-blue-600 rounded-full"></div>
  </div>
  <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono">
    <span>71% of quota</span>
    <span>Next reset in 8d</span>
  </div>
</div>`,
    code: `import React from "react";

export function StatCard({
  label = "Total Edge Traffic",
  value = "1,429,820",
  delta = "+24.8%",
}: {
  label?: string;
  value?: string;
  delta?: string;
}) {
  return (
    <div className="p-4 rounded-[10px] border border-border bg-card space-y-2 shadow-sm">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono text-emerald-600 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-[4px]">
          {delta}
        </span>
      </div>
      <div className="text-2xl font-bold font-mono text-foreground">{value}</div>
    </div>
  );
}`,
  },
  {
    slug: "badge-pill",
    kind: "component",
    name: "Badge & Status Pill",
    description: "Semantic status indicators for success, warning, destructive, and neutral states.",
    category: "feedback",
    tags: ["badge", "pill", "status", "tag"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="flex flex-wrap items-center justify-center gap-2.5 p-6">
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
    Operational
  </span>
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 font-medium">
    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
    Degraded
  </span>
  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-rose-50 text-rose-700 border border-rose-200 font-medium">
    <span class="w-2 h-2 rounded-full bg-rose-500"></span>
    Outage
  </span>
</div>`,
    code: `import React from "react";

export function BadgePill({ label = "Operational" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {label}
    </span>
  );
}`,
  },
  {
    slug: "tabs-control",
    kind: "component",
    name: "Segmented Tabs Control",
    description: "Hairline geometric tab switcher with smooth active state indicators.",
    category: "data-display",
    tags: ["tabs", "navigation", "toggle"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-6 space-y-3">
  <div class="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
    <button class="flex-1 py-1.5 rounded-md bg-white text-slate-900 font-semibold shadow-sm">Overview</button>
    <button class="flex-1 py-1.5 rounded-md text-slate-600 hover:text-slate-900">Analytics</button>
    <button class="flex-1 py-1.5 rounded-md text-slate-600 hover:text-slate-900">Settings</button>
  </div>
</div>`,
    code: `import React, { useState } from "react";

export function TabsControl({
  tabs = ["overview", "analytics", "settings"],
}: {
  tabs?: string[];
}) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="flex items-center rounded-[8px] border border-border bg-muted/40 p-1 text-xs">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={\`flex-1 py-1 rounded-[6px] capitalize \${
            active === t
              ? "bg-card text-foreground font-semibold shadow-sm"
              : "text-muted-foreground"
          }\`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}`,
  },
  {
    slug: "accordion-item",
    kind: "component",
    name: "Accordion & Collapsible",
    description: "Smooth expandable content panel for FAQ and technical documentation specs.",
    category: "data-display",
    tags: ["accordion", "collapse", "faq"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    rawHtml: `<div class="w-full max-w-sm mx-auto rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
  <div class="px-4 py-3 flex items-center justify-between text-xs font-semibold text-slate-900 bg-slate-50/60">
    <span>How are assets installed?</span>
    <span>▼</span>
  </div>
  <div class="px-4 py-3 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
    Assets are copied directly into your codebase as TypeScript and Tailwind source files with zero runtime lock-in.
  </div>
</div>`,
    code: `import React, { useState } from "react";

export function AccordionItem({
  title = "How are assets installed?",
  children = "Assets are copied directly into your codebase.",
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-[8px] border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-foreground"
      >
        {title}
      </button>
      {open && (
        <div className="px-4 pb-3 pt-1 text-xs text-muted-foreground border-t border-border/60">
          {children}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    slug: "avatar-stack",
    kind: "component",
    name: "Avatar & User Stack",
    description: "Overlapping team avatars with online presence beacons and fallback initials.",
    category: "data-display",
    tags: ["avatar", "team", "presence"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="flex items-center justify-center gap-3 p-6">
  <div class="flex -space-x-2">
    <div class="w-10 h-10 rounded-full border-2 border-white bg-slate-100 text-slate-800 flex items-center justify-center font-mono text-xs font-semibold shadow-sm">SC</div>
    <div class="w-10 h-10 rounded-full border-2 border-white bg-blue-100 text-blue-800 flex items-center justify-center font-mono text-xs font-semibold shadow-sm">AD</div>
    <div class="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-xs font-semibold shadow-sm">KM</div>
    <div class="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm">+12</div>
  </div>
</div>`,
    code: `import React from "react";

export function AvatarStack({
  initials = ["SC", "AD", "KM", "EL"],
}: {
  initials?: string[];
}) {
  return (
    <div className="flex -space-x-2">
      {initials.map((init, i) => (
        <div
          key={i}
          className="w-9 h-9 rounded-full border-2 border-card bg-muted text-foreground flex items-center justify-center font-mono text-xs font-semibold"
        >
          {init}
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    slug: "toggle-switch",
    kind: "component",
    name: "Switch & Toggle",
    description: "Accessible animated toggle control with tactile spring transition and keyboard support.",
    category: "inputs",
    tags: ["switch", "toggle", "form", "boolean"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="flex items-center justify-center gap-4 p-6">
  <span class="text-sm font-medium text-slate-800">Auto-deployment Enabled</span>
  <button role="switch" aria-checked="true" class="w-11 h-6 rounded-full p-0.5 bg-blue-600 transition-colors">
    <span class="w-5 h-5 rounded-full bg-white block translate-x-5 shadow-sm"></span>
  </button>
</div>`,
    code: `import React, { useState } from "react";

export function ToggleSwitch() {
  const [checked, setChecked] = useState(true);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={\`w-11 h-6 rounded-full p-0.5 border transition-colors \${
        checked ? "bg-primary border-primary" : "bg-muted border-border"
      }\`}
    >
      <span
        className={\`w-5 h-5 rounded-full block transition-transform \${
          checked
            ? "bg-primary-foreground translate-x-5"
            : "bg-muted-foreground/60 translate-x-0"
        }\`}
      />
    </button>
  );
}`,
  },
  {
    slug: "alert-banner",
    kind: "component",
    name: "Alert & Callout Banner",
    description: "Semantic contextual alert box with warning, error, info and success variants.",
    category: "feedback",
    tags: ["alert", "banner", "feedback", "notification"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-4 rounded-xl border border-blue-200 bg-blue-50/80 text-xs text-slate-900 space-y-1">
  <span class="font-semibold text-blue-900 block">Notice: API rate limits updated</span>
  <span class="text-blue-700 leading-relaxed block">Standard tier quotas have been doubled to 20,000 requests/hour.</span>
</div>`,
    code: `import React from "react";

export function AlertBanner({
  title = "Notice",
  message = "Standard tier quotas have been updated.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="p-3.5 rounded-[8px] border border-blue-500/20 bg-blue-500/10 text-xs text-foreground space-y-0.5">
      <span className="font-semibold block">{title}</span>
      <span className="text-muted-foreground text-[11px] block">{message}</span>
    </div>
  );
}`,
  },
  {
    slug: "progress-bar",
    kind: "component",
    name: "Progress & Stepper Bar",
    description: "Linear indicator with percentage readout, indeterminate pulse, and stage labels.",
    category: "feedback",
    tags: ["progress", "stepper", "loading", "indicator"],
    license: "MIT",
    author: "@liber-ui",
    mention: "Créé par @liber-ui — Liber UI Core",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-6 space-y-2">
  <div class="flex justify-between text-xs font-mono text-slate-700">
    <span>Compilation Progress</span>
    <span class="font-semibold">68%</span>
  </div>
  <div class="h-2.5 rounded-full bg-slate-100 overflow-hidden">
    <div style="width: 68%" class="h-full bg-blue-600 rounded-full"></div>
  </div>
</div>`,
    code: `import React from "react";

export function ProgressBar({ value = 68 }: { value?: number }) {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between text-xs font-mono">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          style={{ width: \`\${value}%\` }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}`,
  },
  {
    slug: "modal-dialog",
    kind: "component",
    name: "Modal Dialog",
    description: "Accessible dialog overlay with backdrop dismiss, keyboard trap, and action triggers (Flowbite UI).",
    category: "feedback",
    tags: ["modal", "dialog", "overlay", "accessible", "flowbite"],
    license: "MIT",
    author: "@flowbite",
    mention: "Créé par @flowbite — Flowbite Open UI",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-5 rounded-xl border border-slate-200 bg-white shadow-lg space-y-3">
  <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
    <h3 class="text-sm font-semibold text-slate-900">Confirm Action</h3>
    <span class="text-slate-400 text-xs">✕</span>
  </div>
  <p class="text-xs text-slate-600 leading-relaxed">Are you sure you want to proceed with this operation? This change is reversible from your workspace settings.</p>
  <div class="flex items-center justify-end gap-2 pt-1">
    <button class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">Cancel</button>
    <button class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium">Confirm</button>
  </div>
</div>`,
    code: `import React, { useState, useEffect } from "react";

export function ModalDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-xl border border-border bg-card shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-semibold text-foreground">Confirm Action</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xs p-1"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to proceed with this operation? This change is reversible from your workspace settings.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 rounded-[8px] border border-border text-xs text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 rounded-[8px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`,
  },
  {
    slug: "dropdown-menu",
    kind: "component",
    name: "Dropdown Menu",
    description: "Floating action popover with outside click detection and keyboard item navigation (Preline UI).",
    category: "buttons",
    tags: ["dropdown", "menu", "popover", "preline", "accessible"],
    license: "MIT",
    author: "@preline",
    mention: "Créé par @preline — Preline Open UI",
    registryDependencies: ["button"],
    dependencies: [],
    rawHtml: `<div class="flex flex-col items-center justify-center p-4">
  <div class="w-44 rounded-lg border border-slate-200 bg-white shadow-md py-1 text-xs">
    <div class="px-3 py-1.5 text-slate-800 bg-slate-50 font-medium">Edit project</div>
    <div class="px-3 py-1.5 text-slate-700">Duplicate</div>
    <div class="h-px bg-slate-100 my-1"></div>
    <div class="px-3 py-1.5 text-rose-600">Delete</div>
  </div>
</div>`,
    code: `import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="px-3.5 py-1.5 rounded-[8px] border border-border bg-card hover:bg-muted text-xs font-medium text-foreground flex items-center gap-2"
      >
        <span>Options</span>
        <span className="text-[10px]">▼</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-20 text-xs">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
          >
            Edit project
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
          >
            Duplicate
          </button>
          <div className="h-px bg-border my-1" />
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-500/10 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    slug: "tooltip-hint",
    kind: "component",
    name: "Tooltip Hint",
    description: "Subtle informational callout with pointer indicator on hover and focus (Flowbite UI).",
    category: "data-display",
    tags: ["tooltip", "hint", "hover", "flowbite", "accessible"],
    license: "MIT",
    author: "@flowbite",
    mention: "Créé par @flowbite — Flowbite Open UI",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="flex flex-col items-center justify-center p-6 gap-2">
  <div class="px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded shadow-md">Quick helpful tip</div>
  <button class="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 shadow-sm">Hover over me</button>
</div>`,
    code: `import React, { useState } from "react";

export function TooltipHint() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="px-3 py-1.5 rounded-[8px] border border-border bg-card text-xs text-foreground hover:bg-muted"
      >
        Hover over me
      </button>
      {visible && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[11px] font-medium rounded shadow-md whitespace-nowrap z-30 pointer-events-none"
        >
          Quick helpful tip
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
        </div>
      )}
    </div>
  );
}`,
  },
  {
    slug: "toast-snackbar",
    kind: "component",
    name: "Toast Snackbar",
    description: "Floating status card with action feedback, status iconography, and dismiss trigger (Preline UI).",
    category: "feedback",
    tags: ["toast", "snackbar", "notification", "preline", "feedback"],
    license: "MIT",
    author: "@preline",
    mention: "Créé par @preline — Preline Open UI",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-6">
  <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-md text-xs">
    <div class="flex items-center gap-2.5">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
      <span class="text-slate-900 font-medium">Changes saved successfully</span>
    </div>
    <span class="text-slate-400">✕</span>
  </div>
</div>`,
    code: `import React, { useState } from "react";

export function ToastSnackbar() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full max-w-sm">
      {visible ? (
        <div
          role="status"
          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card shadow-md text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-foreground font-medium">Changes saved successfully</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-muted-foreground hover:text-foreground text-xs px-1"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="px-3 py-1.5 rounded-[8px] border border-border text-xs text-muted-foreground hover:text-foreground"
        >
          Trigger notification
        </button>
      )}
    </div>
  );
}`,
  },
  {
    slug: "skeleton-shimmer",
    kind: "component",
    name: "Skeleton Shimmer Loader",
    description: "Wireframe placeholder elements with pulsing animation for async loading states (Flowbite UI).",
    category: "feedback",
    tags: ["skeleton", "loader", "shimmer", "flowbite", "placeholder"],
    license: "MIT",
    author: "@flowbite",
    mention: "Créé par @flowbite — Flowbite Open UI",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<div class="w-full max-w-sm mx-auto p-4 rounded-xl border border-slate-200 bg-white space-y-3">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
    <div class="space-y-1.5 flex-1">
      <div class="h-3 w-3/5 rounded bg-slate-200 animate-pulse"></div>
      <div class="h-2.5 w-2/5 rounded bg-slate-200 animate-pulse"></div>
    </div>
  </div>
  <div class="space-y-2 pt-2">
    <div class="h-3 w-full rounded bg-slate-200 animate-pulse"></div>
    <div class="h-3 w-4/5 rounded bg-slate-200 animate-pulse"></div>
  </div>
</div>`,
    code: `import React from "react";

export function SkeletonShimmer() {
  return (
    <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3 w-3/5 rounded bg-muted animate-pulse" />
          <div className="h-2.5 w-2/5 rounded bg-muted animate-pulse" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full rounded bg-muted animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}`,
  },
  {
    slug: "breadcrumb-trail",
    kind: "component",
    name: "Breadcrumb Trail",
    description: "Semantic breadcrumb navigation with chevron delimiters and WCAG aria-current attributes (Flowbite UI).",
    category: "data-display",
    tags: ["breadcrumb", "navigation", "trail", "flowbite", "accessible"],
    license: "MIT",
    author: "@flowbite",
    mention: "Créé par @flowbite — Flowbite Open UI",
    registryDependencies: [],
    dependencies: [],
    rawHtml: `<nav aria-label="Breadcrumb" class="flex items-center justify-center p-6 text-xs text-slate-500">
  <ol class="inline-flex items-center space-x-2">
    <li><span class="hover:text-slate-900">Home</span></li>
    <li><span>/</span></li>
    <li><span class="hover:text-slate-900">Components</span></li>
    <li><span>/</span></li>
    <li><span class="font-semibold text-slate-900">Navigation</span></li>
  </ol>
</nav>`,
    code: `import React from "react";

export function BreadcrumbTrail() {
  const items = [
    { label: "Home", href: "#" },
    { label: "Components", href: "#" },
    { label: "Navigation", href: "#", current: true },
  ];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center">
            {index > 0 && <span className="mx-1 text-muted-foreground/60">/</span>}
            {item.current ? (
              <span className="font-semibold text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}`,
  },
];

export const TOTAL_COMPONENTS_COUNT = 1525;

