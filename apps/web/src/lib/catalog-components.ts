import { TAILWINDFLEX_COMPONENTS } from "../data/tailwindflex-components";

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

const BASE_COMPONENTS: ComponentItem[] = [
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
  {
    slug: "modal-dialog",
    kind: "component",
    name: "Modal Dialog",
    description: "Accessible dialog overlay with backdrop dismiss, keyboard trap, and action triggers (Flowbite UI).",
    category: "feedback",
    tags: ["modal", "dialog", "overlay", "accessible", "flowbite"],
    license: "MIT",
    author: "flowbite",
    registryDependencies: ["button"],
    dependencies: ["lucide-react"],
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
    author: "preline",
    registryDependencies: ["button"],
    dependencies: [],
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
    author: "flowbite",
    registryDependencies: [],
    dependencies: [],
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
    author: "preline",
    registryDependencies: [],
    dependencies: [],
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
    author: "flowbite",
    registryDependencies: [],
    dependencies: [],
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
    author: "flowbite",
    registryDependencies: [],
    dependencies: [],
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

export const SAMPLE_COMPONENTS: ComponentItem[] = [
  ...BASE_COMPONENTS,
  ...TAILWINDFLEX_COMPONENTS.filter(
    (tf) => !BASE_COMPONENTS.some((base) => base.slug === tf.slug)
  ),
];

