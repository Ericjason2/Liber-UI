# @liber-ui/svg

> Raw, optimized SVGs for developer tools, languages, and cloud logos from **Liber UI**.

[![npm version](https://img.shields.io/npm/v/@liber-ui/svg.svg)](https://www.npmjs.com/package/@liber-ui/svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Use Cases

Designed for developers and designers who need raw SVG files without React bindings:
- **Vue, Svelte, Angular, Astro, Solid**
- **Static HTML & CSS**
- **Figma & Penpot imports**
- **Server-side icon generation**

---

## Installation

```bash
pnpm add @liber-ui/svg
# or
npm install @liber-ui/svg
# or
yarn add @liber-ui/svg
# or
bun add @liber-ui/svg
```

---

## Directory Structure

```
node_modules/@liber-ui/svg/logos/
├── docker/
│   ├── color.svg
│   ├── mono.svg
│   └── wordmark.svg
├── react/
│   ├── color.svg
│   └── mono.svg
└── ... (150+ logos)
```

---

## Usage Examples

### Vite / Webpack (import as SVG URL or raw string)

```ts
import dockerLogoUrl from "@liber-ui/svg/logos/docker/color.svg";
// or with ?raw in Vite:
import dockerSvgRaw from "@liber-ui/svg/logos/docker/color.svg?raw";
```

### In Astro / Svelte / Vue

```html
<!-- Astro -->
---
import dockerRaw from "@liber-ui/svg/logos/docker/color.svg?raw";
---
<Fragment set:html={dockerRaw} />
```

---

## License

MIT © [Liber UI](https://liber-ui-delta.vercel.app)
