"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import {
  PACKAGE_MANAGERS,
  getCliCommand,
  getPackageInstallCommand,
  type PackageManager,
} from "@/lib/package-manager";

type InstallMode = "package" | "cli";

export function InstallStrip() {
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [mode, setMode] = useState<InstallMode>("package");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const command =
    mode === "package"
      ? getPackageInstallCommand(pm, "@liber-ui/logo")
      : getCliCommand(pm, "add react");

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    toast("Command copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[700px] mx-auto text-center space-y-2.5">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 rounded-[10px] border border-border bg-card p-1.5">
        {/* PM Tabs */}
        <div className="flex items-center gap-1">
          {PACKAGE_MANAGERS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setPm(tab)}
              className={`px-2.5 py-1 text-xs font-mono rounded-[6px] transition-colors ${
                pm === tab
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Command */}
        <code className="text-xs font-mono text-foreground px-2 truncate select-all">
          $ {command}
        </code>

        {/* Mode + Copy Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden sm:flex items-center rounded-[6px] border border-border bg-surface-subtle p-0.5 text-[10px] font-mono">
            {(["package", "cli"] as InstallMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-2 py-0.5 rounded-[4px] uppercase transition-colors ${
                  mode === m
                    ? "bg-card text-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy command"
            className="flex h-7 items-center gap-1.5 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-[11px] font-medium text-foreground hover:bg-muted transition-colors shrink-0"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Install via pnpm, npm, yarn, or bun—or pull any resource directly with @liber-ui/cli.
      </p>
    </div>
  );
}
