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
  registryDependencies: string[];
  dependencies: string[];
  code: string;
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

export const SAMPLE_COMPONENTS: ComponentItem[] = [
  {
    slug: "button",
    kind: "component",
    name: "Button",
    description: "Primary, outline, secondary, ghost and destructive button primitives.",
    category: "buttons",
    tags: ["button", "interactive", "form"],
    license: "MIT",
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: ["card"],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: ["lucide-react"],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
    author: "core",
    registryDependencies: [],
    dependencies: ["lucide-react"],
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
    author: "core",
    registryDependencies: [],
    dependencies: [],
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
];

