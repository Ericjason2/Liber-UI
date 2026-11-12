# Liber UI

<div align="center">

<p align="center">
  <strong>The free, open-source asset catalog and registry for modern web developers.</strong><br>
  150+ Tech Logos • 7,382+ Free Fonts • 761 Color Themes • 24 GPU Animations • 10 Accessible UI Components
</p>

<p align="center">
  <a href="https://github.com/erickouta/liber/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT" /></a>
  <a href="https://www.npmjs.com/package/@liber-ui/cli"><img src="https://img.shields.io/npm/v/@liber-ui/cli.svg?style=flat-square&color=emerald" alt="npm version" /></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-%E2%89%A520-green.svg?style=flat-square" alt="Node.js Version" /></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black.svg?style=flat-square" alt="Next.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-v3-38bdf8.svg?style=flat-square" alt="Tailwind CSS" /></a>
  <a href="https://www.w3.org/WAI/WCAG21/quickref/"><img src="https://img.shields.io/badge/WCAG-AA%2FAAA-blueviolet.svg?style=flat-square" alt="WCAG AA/AAA" /></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-asset-catalog">Asset Catalog</a> •
  <a href="#-integration-methods">Integration Methods</a> •
  <a href="#-local-development">Local Development</a> •
  <a href="#-production-deployment">Production Deployment</a> •
  <a href="#-trademark--license">Legal & License</a>
</p>

</div>

---

## ⚡ What is Liber UI?

**Liber UI** brings together everything you need to build interfaces into a unified, zero-lock-in platform with open source primitives and brand vectors. 

Whether you need official brand logos in React JSX, free web fonts streamed via CDN, WCAG-validated color palettes, copy-paste CSS animations, or accessible UI components, Liber UI lets you **copy the code in 1 click**, **link directly via CDN**, or **install via pnpm, npm, yarn, bun, or our CLI**.

### Key Highlights
- **1-Click Copy**: Instant SVG, JSX, CSS variables, or Tailwind class snippet.
- **Direct CDN Streaming**: Zero-install URLs for SVGs, CSS stylesheets, and TTF binary fonts.
- **Packages & CLI**: Install npm packages (`@liber-ui/react`, `@liber-ui/svg`, `@liber-ui/core`) with `pnpm`, `npm`, `yarn`, or `bun`, or add individual assets with `@liber-ui/cli`.
- **Accessibility-First**: Contrast checks (WCAG AA/AAA), `currentColor` dark mode reactivity, and `prefers-reduced-motion` motion safety.
- **No Vendor Lock-in**: Raw source files live in your repo. You own your code.

---

## 📦 Asset Catalog

### 1. Brand & Tech Logos (`/logos`)
- **150 official vector logos** across 5 categories: Frontend (26), Backend & Database (28), Cloud & DevOps (28), Programming Languages (25), and Tools & Design (43).
- **3 Variants per logo**:
  - `Color`: Official brand color scheme.
  - `Monochrome`: Clean monochrome paths reactive to dark mode via `currentColor`.
  - `Wordmark`: Complete brandmark with logotype typography.
- **Multi-format Delivery**:
  - React Component (`@liber-ui/react`): `<ReactColor size={32} />`, `<GithubMono size={32} />`.
  - Raw SVG code with SVGO security sanitation.
  - Multi-resolution PNG downloads (`64px`, `128px`, `256px`, `512px`) rendered via client-side HTML5 Canvas.
  - Direct CDN link: `/svg/<slug>/<variant>.svg`.
  - CDN Stylesheets: `/api/logo-css/<slug>` or `/api/logo-css/all` for Devicon/FontAwesome-like classes (`<i class="logo-react"></i>`).

### 2. Fonts & Typographies (`/fonts`)
- **7,382+ 100% free, open-license typefaces** (SIL Open Font License, Apache 2.0, Public Domain).
- **Alphabetical Index (A–Z)** and **Thematic Classification**:
  - **Basic**: Sans serif, Serif, Fixed width.
  - **Fancy**: Cartoon, Comic, Retro, Groovy, Horror, Western, Typewriter, Eroded, Distorted.
  - **Script**: Calligraphy, Handwritten, Brush, Graffiti.
  - **Techno**: Sci-fi, 3D, Square, LCD.
  - **Gothic**: Medieval, Modern, Celtic.
  - **Bitmap**: Pixel.
- **Interactive Inspection**:
  - Live Text Specimen Preview with instant typing updates.
  - Full Author Character Map & Glyphs matrix (`U+0041` to `U+007A`).
  - Direct CDN `@import` / `<link>` stylesheet and binary `.ttf` streaming.

### 3. Color Themes & Palettes (`/themes`)
- **761 curated palettes** (77 core design themes + 684 trending palettes from Color Hunt).
- **WCAG AA / AAA Accessibility**: Verified text-on-background contrast scores.
- **Coolors-style Interactive Viewer**: Click any of the 5 vertical swatch stripes to instantly copy its HEX code.
- **Bilingual Semantic Search (FR/EN)**: Search by intent, industry, or mood (*medical*, *nature*, *luxe*, *cyber*, *minimal*, *ocean*, *sunset*).
- **Keyboard Shortcut**: Press `Space` at any time to shuffle and discover a random palette.
- **Export Options**: 1-click copy for HEX, CSS `:root` variables, Tailwind color tokens, or full JSON download.

### 4. GPU CSS & Tailwind Animations (`/animations`)
- **24 hardware-accelerated animations** inspired by Animista across 6 categories:
  - *Basic* (Scale Up, Scale Down, Rotate, Flip, Slide, Shadow Drop)
  - *Entrances* (Scale In, Slide In, Fade In, Bounce In, Roll In)
  - *Exits* (Scale Out, Slide Out, Fade Out)
  - *Text* (Tracking In Expand, Text Focus In, Text Blur Out, Text Shadow Pop)
  - *Attention* (Heartbeat, Vibrate, Jello, Wobble, Shake, Bounce, Pulsate, Blink)
  - *Background* (Ken Burns, Bg Pan, Color Change)
- **Live Controls**: Speed selector (`0.5x`, `1x`, `2x`), re-trigger button, and copy buttons for pure CSS `@keyframes` or Tailwind arbitrary classes.
- **A11y Compliant**: Includes `prefers-reduced-motion` fallbacks to respect user motion preferences.

### 5. Accessible UI Components (`/components`)
- **10 interactive core primitives**:
  - `button`: Primary, Secondary, Outline, Ghost, and Destructive variants.
  - `input`: Search field with left icon, clear button, and focus ring.
  - `stat-card`: Analytics metric card with percent trends and quota progress bar.
  - `badge-pill`: Status indicators with animated ping pulses (Operational, Degraded, Outage).
  - `tabs-control`: Animated segmented tabs control.
  - `accordion-item`: Accessible collapsible FAQ accordion.
  - `avatar-stack`: Overlapping team avatar stack with `+N` overflow counter.
  - `toggle-switch`: Keyboard-accessible boolean switch with smooth toggle animation.
  - `alert-banner`: Dismissible contextual notification banner with icons.
  - `progress-bar`: Dynamic progress bar with interactive controls.
- **Dual Mode**: Live interactive Preview tab and complete TypeScript JSX source code tab.

---

## 🚀 Quick Start & Integration Methods

### Method 1: The Official CLI (`@liber-ui/cli`)

Run directly with `pnpm dlx`, `npx`, `yarn dlx`, or `bunx` (no global installation required):

```bash
# pnpm
pnpm dlx @liber-ui/cli init
pnpm dlx @liber-ui/cli add react

# npm
npx @liber-ui/cli init
npx @liber-ui/cli add button

# yarn
yarn dlx @liber-ui/cli add font-inter

# bun
bunx @liber-ui/cli search postgres
```

#### CLI Command Reference

| Command | Description | Example |
| :--- | :--- | :--- |
| `init` | Creates `liber.json` configuration file | `pnpm dlx @liber-ui/cli init` |
| `add <slug...>` | Downloads and installs resources into your project | `pnpm dlx @liber-ui/cli add react docker typescript` |
| `search <query>` | Searches the registry by keyword or category | `npx @liber-ui/cli search tailwind` |
| `view <slug>` | Displays metadata, files, and dependencies | `yarn dlx @liber-ui/cli view github` |
| `diff <slug>` | Compares local installed files against registry | `bunx @liber-ui/cli diff button` |

#### Advanced `add` Options
- `--variant <color|mono|wordmark>`: Logo variant to install (default: `color`).
- `--format <react|svg>`: Install as React `.tsx` component or raw `.svg` file (default: `react`).
- `--out <dir>`: Custom output folder (default: `src/components/ui/logos`).
- `--dry-run`: Preview changes without writing to disk.
- `--force`: Overwrite existing files.

---

### Method 2: Direct CDN (Zero-Install)

Use assets immediately without installing any package:

#### Logos via Direct CDN
```html
<!-- Direct Image -->
<img src="https://liber-ui-delta.vercel.app/svg/react/color.svg" width="32" height="32" alt="React" />

<!-- Or using the Global CSS Stylesheet -->
<link rel="stylesheet" href="https://liber-ui-delta.vercel.app/api/logo-css/all" />
<i class="logo-react"></i>
<i class="logo-github-mono text-gray-900 dark:text-white"></i>
```

#### Fonts via Google-Fonts-like CDN
```html
<!-- HTML Link Tag -->
<link rel="stylesheet" href="https://liber-ui-delta.vercel.app/api/font-css/inter" />

<!-- In your CSS file -->
@import url('https://liber-ui-delta.vercel.app/api/font-css/inter');

body {
  font-family: var(--font-inter), sans-serif;
}
```

#### Streaming Raw `.ttf` Binary
```css
@font-face {
  font-family: 'Minecraft';
  src: url('https://liber-ui-delta.vercel.app/api/font-file/minecraft.ttf') format('truetype');
  font-display: swap;
}
```

---

### Method 3: Install via Package Managers (`pnpm`, `npm`, `yarn`, `bun`)

```bash
# pnpm
pnpm add @liber-ui/react        # Tree-shaken React components (<2KB per icon)
pnpm add @liber-ui/svg          # Raw SVGs for Vue, Svelte, Astro, HTML
pnpm add @liber-ui/core         # Core TypeScript types and catalog index
pnpm add -D @liber-ui/cli       # Official Liber CLI

# npm
npm install @liber-ui/react @liber-ui/svg @liber-ui/core

# yarn
yarn add @liber-ui/react @liber-ui/svg @liber-ui/core

# bun
bun add @liber-ui/react @liber-ui/svg @liber-ui/core
```

```tsx
import { ReactColor, GithubMono, DockerWordmark } from "@liber-ui/react";

export function TechStack() {
  return (
    <div className="flex items-center gap-4">
      <ReactColor size={32} />
      <GithubMono size={32} className="text-foreground hover:text-primary" />
      <DockerWordmark size={48} />
    </div>
  );
}
```

---

## 🛠️ Repository Layout

```text
liber/
├── apps/
│   └── web/                # Next.js 15 App Router web application & registry
│       ├── src/
│       │   ├── app/        # Server & Client routes, dynamic API endpoints
│       │   ├── components/ # Shared UI layout, Navbar, CommandPalette, Footers
│       │   ├── views/      # Dedicated family views (Logos, Fonts, Themes...)
│       │   ├── handlers/   # Decoupled serverless API handlers (font-file, font-css, logo-css)
│       │   └── lib/        # Catalog loaders, search indexing, color utilities
│       └── public/
│           ├── r/          # Generated JSON registry files (<slug>.json)
│           └── svg/        # Static optimized SVG files (/svg/<slug>/<variant>.svg)
├── packages/
│   ├── cli/                # @liber-ui/cli binary (init, add, search, view, diff)
│   ├── core/               # @liber-ui/core (index.json, Zod schemas, TypeScript types)
│   ├── react/              # @liber-ui/react (generated React icon components)
│   └── svg/                # @liber-ui/svg (raw optimized SVG distribution)
├── content/                # Source of truth (hand-curated content)
│   ├── logos/<slug>/       # meta.json + color.svg + mono.svg + wordmark.svg
│   └── fonts/<slug>/       # font.json + OFL.txt
└── scripts/                # Build and validation pipeline
    ├── lib/                # SVGO optimization, SVGR builder, registry builder
    ├── validate.ts         # Zod & SVG security validation
    ├── generate.ts         # Build orchestrator (SVGO, React, Registry, Core)
    └── check-themes.ts     # WCAG contrast validator
```

---

## 💻 Local Development

### Prerequisites
- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

### Setup Commands

```bash
# 1. Clone the repository
git clone https://github.com/erickouta/liber.git
cd liber

# 2. Install workspace dependencies
npm install

# 3. Validate content schemas and SVG security
npm run validate

# 4. Run build generator (SVGO, SVGR React components, Registry)
npm run generate

# 5. Start Next.js development server
npm run dev
# The website will be available at http://localhost:3000

# 6. Run test suite
npm test

# 7. Typecheck all workspaces
npm run typecheck

# 8. Lint the entire monorepo
npm run lint

# 9. Build for production
npm run build
```

---

## 🌐 Production Deployment

Liber UI is optimized for zero-config deployment on **Vercel** with Next.js App Router and serverless edge routes.

### Steps to Deploy with a Custom `.dev` Domain

1. **Push to GitHub**:
   Push your repository to GitHub (`main` or `develop` branch).

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your Liber UI repository.
   - Framework Preset: **Next.js**.
   - Root Directory: leave as `./` (or `apps/web` with Turborepo auto-detection).

3. **Configure Environment Variables**:
   In your Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.dev` (e.g. `https://liber.dev`)

4. **Connect your `.dev` Domain**:
   - Go to **Project Settings → Domains**.
   - Enter your domain (e.g. `liber.dev` or `liber-ui.dev`).
   - Add the recommended DNS records at your domain registrar:
     - **A Record**: `@` → `76.76.21.21`
     - **CNAME Record**: `www` → `cname.vercel-dns.com`
   > [!NOTE]
   > `.dev` domains are on the Google HSTS preload list, meaning HTTPS is strictly required. Vercel automatically provisions and renews free SSL certificates (Let's Encrypt) within minutes of DNS propagation.

---

## ⚖️ Trademark & License

- **Code & Components**: Licensed under the [MIT License](./LICENSE).
- **Logos & Brand Assets**: Logos are trademarks of their respective owners. They are provided solely for identification, reference, and nominative fair use (e.g. showcasing tech stacks in portfolio projects) and do not imply endorsement, affiliation, or sponsorship. For official guidelines, consult each brand's link provided on their detail page.
- **Takedown Policy**: In compliance with intellectual property standards, any brand owner can request removal or correction of their asset within 7 business days. See [TAKEDOWN.md](./TAKEDOWN.md) or contact `takedown@liber.dev`.
- **Third-Party Notices**: See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for open-source font licenses (SIL OFL 1.1, Apache 2.0).

---

<div align="center">
  <sub>Crafted with passion for the open-source developer community.</sub>
</div>
