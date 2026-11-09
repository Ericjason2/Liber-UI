import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runCli } from "../../packages/cli/src/index.js";

describe("@liber-ui/cli unit tests", () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = await mkdtemp(join(tmpdir(), "liber-cli-test-"));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await rm(tempDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("prints version with --version", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await runCli(["node", "liber", "--version"]);
    expect(spy).toHaveBeenCalledWith("@liber-ui/cli v0.1.1");
  });

  it("prints help with --help", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await runCli(["node", "liber", "--help"]);
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls.map((c) => c.join(" ")).join("\n");
    expect(output).toContain("npx @liber-ui/cli <command> [options]");
  });

  it("creates liber.json on 'liber init'", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    await runCli(["node", "liber", "init"]);
    const raw = await readFile(join(tempDir, "liber.json"), "utf8");
    const parsed = JSON.parse(raw);
    expect(parsed.format).toBe("react");
    expect(parsed.variant).toBe("color");
    expect(parsed.outDir).toBe("src/components/ui/logos");
    expect(spy).toHaveBeenCalled();
  });

  it("supports --dry-run on 'liber add' without writing files to disk", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          name: "react",
          type: "registry:ui",
          title: "React",
          files: [
            {
              path: "ui/logos/react.tsx",
              content: "export const ReactColor = () => <svg />;",
              type: "registry:ui",
            },
          ],
        }),
      })
    );

    await runCli(["node", "liber", "add", "react", "--dry-run"]);
    const output = spy.mock.calls.map((c) => c.join(" ")).join("\n");
    expect(output).toContain("[DRY-RUN]");
  });
});

