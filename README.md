# Liber

A free, open catalog of **logos, blocks, components, color themes and fonts**
for developers. Copy the code, download the file, or install it with one command.

> **Trademark notice.** Logos are trademarks of their respective owners; their
> use must follow each owner's brand guidelines. They are provided only to refer
> to the brand, never to suggest a partnership or endorsement. To request a
> removal or a fix, see [TAKEDOWN.md](./TAKEDOWN.md).

## Repository layout

```text
content/      source of truth, one folder per resource (hand-written)
packages/
  core/       index JSON + TypeScript types (generated)
  svg/        optimized raw SVG files (generated)
  react/      React logo components (generated, do not edit)
apps/web/     the Next.js static website
scripts/      validation and build scripts (Zod schemas, SVGO, SVGR, registry)
```

Golden rule: **adding a resource = adding a folder in `content/<family>/`**.
Everything else (index, components, pages, registry) is produced by `npm run build`.

## Commands

| Command             | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm install`       | Install dependencies                                         |
| `npm run validate`  | Check every resource's metadata, license and SVG safety      |
| `npm run generate`  | Validate, optimize SVGs, generate React components, registry |
| `npm run build`     | `generate` then build every package and the website          |
| `npm test`          | Unit tests (Vitest)                                          |
| `npm run test:e2e`  | End-to-end tests of the website (Playwright)                 |
| `npm run dev`       | Run the website locally                                      |

## Licenses

- Code: [MIT](./LICENSE).
- Logos: trademarks of their owners (`license: "trademark"` in each `meta.json`).
- Third-party material: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
