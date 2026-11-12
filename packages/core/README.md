# @liber-ui/core

> Core catalog index, Zod schemas, and TypeScript interfaces for **Liber UI**.

[![npm version](https://img.shields.io/npm/v/@liber-ui/core.svg)](https://www.npmjs.com/package/@liber-ui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## What's Inside

- **`index.json`** : Complete catalog listing of all 150+ logos, color palettes, and fonts with categories, tags, and license metadata.
- **`@liber-ui/core/schema`** : Zod validation schemas for Liber assets and registry entries.
- **TypeScript Types** : `LogoMetadata`, `LiberTheme`, `FontMetadata`, `LiberRegistryIndex`, etc.

---

## Installation

```bash
pnpm add @liber-ui/core
# or
npm install @liber-ui/core
# or
yarn add @liber-ui/core
# or
bun add @liber-ui/core
```

---

## Usage

```ts
import catalog from "@liber-ui/core/index.json" with { type: "json" };
import type { LogoMetadata, LiberTheme } from "@liber-ui/core";
import { logoSchema } from "@liber-ui/core/schema";

// Access all logos
console.log(`Liber UI contains ${catalog.logos.length} logos.`);

// Validate custom item
const result = logoSchema.safeParse(customLogo);
```

---

## License

MIT © [Liber UI](https://liber-ui-delta.vercel.app)
