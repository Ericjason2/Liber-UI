# @liber/core

> Core catalog index, Zod schemas, and TypeScript interfaces for **Liber UI**.

[![npm version](https://img.shields.io/npm/v/@liber/core.svg)](https://www.npmjs.com/package/@liber/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## What's Inside

- **`index.json`** : Complete catalog listing of all 150+ logos, color palettes, and fonts with categories, tags, and license metadata.
- **`@liber/core/schema`** : Zod validation schemas for Liber assets and registry entries.
- **TypeScript Types** : `LogoMetadata`, `LiberTheme`, `FontMetadata`, `LiberRegistryIndex`, etc.

---

## Installation

```bash
npm install @liber/core
```

---

## Usage

```ts
import catalog from "@liber/core/index.json" with { type: "json" };
import type { LogoMetadata, LiberTheme } from "@liber/core";
import { logoSchema } from "@liber/core/schema";

// Access all logos
console.log(`Liber UI contains ${catalog.logos.length} logos.`);

// Validate custom item
const result = logoSchema.safeParse(customLogo);
```

---

## License

MIT © [Liber UI](https://liber-ui-delta.vercel.app)
