# @liber/cli

> Official CLI for **Liber UI** – Install logos, components, color themes, and fonts directly into your React, Next.js, and Vite projects.

[![npm version](https://img.shields.io/npm/v/@liber/cli.svg)](https://www.npmjs.com/package/@liber/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ Quick Start

You don't need to install anything globally. Run directly with `npx`:

```bash
# Initialize liber configuration in your project
npx @liber/cli init

# Add a logo or component directly to your project
npx @liber/cli add docker
npx @liber/cli add react github typescript

# Search for available resources
npx @liber/cli search database

# Inspect a component before downloading
npx @liber/cli view docker
```

---

## 🛠 Commands

| Command | Description | Example |
|---|---|---|
| `init` | Initializes a `liber.json` config file | `npx @liber/cli init` |
| `add <slug...>` | Downloads components and writes them to your project | `npx @liber/cli add docker --variant color` |
| `search <term>` | Searches the catalog for logos and components | `npx @liber/cli search devops` |
| `view <slug>` | Displays metadata and available variants for an item | `npx @liber/cli view postgresql` |
| `diff <slug>` | Compares your local file with the upstream registry | `npx @liber/cli diff docker` |

### Options for `add`
- `--format react|svg` : Component format (default: `react`)
- `--variant color|mono|wordmark` : Visual variant (default: `color`)
- `--outDir <path>` : Custom destination directory (default: `src/components/ui/logos`)
- `--overwrite` : Force overwrite if the file already exists

---

## ⚙️ Configuration (`liber.json`)

Running `liber init` creates a configuration file in your project root:

```json
{
  "$schema": "https://liber-ui.vercel.app/schema.json",
  "format": "react",
  "variant": "color",
  "outDir": "src/components/ui/logos",
  "registryUrl": "https://liber-ui.vercel.app/r"
}
```

---

## 📦 Monorepo Packages

- [`@liber/react`](https://www.npmjs.com/package/@liber/react) : Pre-compiled tree-shakeable React components
- [`@liber/svg`](https://www.npmjs.com/package/@liber/svg) : Raw optimized SVG assets
- [`@liber/core`](https://www.npmjs.com/package/@liber/core) : Catalog metadata, Zod schemas, and types
- [`@liber/cli`](https://www.npmjs.com/package/@liber/cli) : This CLI package

---

## 📄 License

MIT © [Liber UI](https://liber-ui.vercel.app)
