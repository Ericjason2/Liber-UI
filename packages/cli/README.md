# @liber-ui/cli

> Official CLI for **Liber UI** – Install logos, components, animations, color themes, and fonts directly into your React, Next.js, and Vite projects.

[![npm version](https://img.shields.io/npm/v/@liber-ui/cli.svg)](https://www.npmjs.com/package/@liber-ui/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Quick Start

You don't need to install anything globally. Run directly with `pnpm dlx`, `npx`, `yarn dlx`, or `bunx`:

```bash
# pnpm
pnpm dlx @liber-ui/cli init
pnpm dlx @liber-ui/cli add docker

# npm
npx @liber-ui/cli add react github typescript

# yarn
yarn dlx @liber-ui/cli search database

# bun
bunx @liber-ui/cli view docker
```

Or install it as a dev dependency:

```bash
pnpm add -D @liber-ui/cli
npm install -D @liber-ui/cli
yarn add -D @liber-ui/cli
bun add -D @liber-ui/cli
```

---

## Commands

| Command | Description | Example |
|---|---|---|
| `init` | Initializes a `liber.json` config file | `npx @liber-ui/cli init` |
| `add <slug...>` | Downloads components and writes them to your project | `npx @liber-ui/cli add docker --variant color` |
| `search <term>` | Searches the catalog for logos and components | `npx @liber-ui/cli search devops` |
| `view <slug>` | Displays metadata and available variants for an item | `npx @liber-ui/cli view postgresql` |
| `diff <slug>` | Compares your local file with the upstream registry | `npx @liber-ui/cli diff docker` |

### Options for `add`
- `--format react|svg` : Component format (default: `react`)
- `--variant color|mono|wordmark` : Visual variant (default: `color`)
- `--outDir <path>` : Custom destination directory (default: `src/components/ui/logos`)
- `--overwrite` : Force overwrite if the file already exists

---

## Configuration (`liber.json`)

Running `liber init` creates a configuration file in your project root:

```json
{
  "$schema": "https://liber-ui-delta.vercel.app/schema.json",
  "format": "react",
  "variant": "color",
  "outDir": "src/components/ui/logos",
  "registryUrl": "https://liber-ui-delta.vercel.app/r"
}
```

---

## Monorepo Packages

- [`@liber-ui/react`](https://www.npmjs.com/package/@liber-ui/react) : Pre-compiled tree-shakeable React components
- [`@liber-ui/svg`](https://www.npmjs.com/package/@liber-ui/svg) : Raw optimized SVG assets
- [`@liber-ui/core`](https://www.npmjs.com/package/@liber-ui/core) : Catalog metadata, Zod schemas, and types
- [`@liber-ui/cli`](https://www.npmjs.com/package/@liber-ui/cli) : This CLI package

---

## License

MIT © [Liber UI](https://liber-ui-delta.vercel.app)
