import { describe, it, expect } from "vitest";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reactPkg = join(__dirname, "../../packages/react/src/index.ts");

describe("Tree-shaking and bundle weight of @liber/react", () => {
  it("importing an isolated logo adds less than 2 KB minified (Phase 2 requirement)", async () => {
    // Testing isolated logo import
    const inputCode = `
      import { VercelColor } from "${reactPkg.replace(/\\/g, "/")}";
      export default VercelColor;
    `;

    const result = await build({
      stdin: {
        contents: inputCode,
        resolveDir: dirname(reactPkg),
        loader: "tsx",
      },
      bundle: true,
      minify: true,
      format: "esm",
      external: ["react", "react-dom", "react/jsx-runtime"],
      write: false,
    });

    const outputBytes = result.outputFiles[0]?.contents.byteLength ?? 0;
    console.log(`Bundle size for isolated VercelColor: ${outputBytes} bytes`);

    // Specs requirement: < 2 KB (2048 bytes)
    expect(outputBytes).toBeGreaterThan(0);
    expect(outputBytes).toBeLessThan(2048);
  });
});
