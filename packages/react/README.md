# @liber-ui/react

> High-performance, tree-shakeable React logo and icon components for **Liber UI**.

[![npm version](https://img.shields.io/npm/v/@liber-ui/react.svg)](https://www.npmjs.com/package/@liber-ui/react)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@liber-ui/react)](https://bundlephobia.com/package/@liber-ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

##  Features

- **150+ developer logos and brand icons**
- **Tree-shakeable**: Import only what you use, average component size < 2 KB
- **3 Variants**: Color, Monochrome (inherits `currentColor`), and Wordmark
- **Full TypeScript support**: Complete typings included (`SVGProps<SVGSVGElement>`)
- **Zero runtime dependencies**: Pure React SVG components

---

##  Installation

```bash
npm install @liber-ui/react
# or
pnpm add @liber-ui/react
# or
yarn add @liber-ui/react
# or
bun add @liber-ui/react
```

---

##  Usage

### Basic Usage

```tsx
import { DockerColor, ReactColor, GithubMono, TypescriptColor } from "@liber-ui/react";

export function TechStack() {
  return (
    <div className="flex items-center gap-4">
      {/* Default size: 24x24 */}
      <DockerColor className="w-8 h-8 hover:scale-110 transition-transform" />

      {/* Custom size & className */}
      <ReactColor width={32} height={32} />

      {/* Monochrome inherits text color via currentColor */}
      <GithubMono className="w-6 h-6 text-zinc-900 dark:text-zinc-100" />

      <TypescriptColor className="w-8 h-8" />
    </div>
  );
}
```

---

##  Variants Naming Convention

Every icon is named with its slug in PascalCase followed by the variant:
- `<Name>Color` : Full official brand colors
- `<Name>Mono` : Single monochrome color using `currentColor`
- `<Name>Wordmark` : Logo icon accompanied by brand typography

Examples:
- `DockerColor`, `DockerMono`, `DockerWordmark`
- `PythonColor`, `PythonMono`
- `VercelColor`, `VercelMono`

---

##  License

MIT © [Liber UI](https://liber-ui-delta.vercel.app)
