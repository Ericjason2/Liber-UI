"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/context/ToastContext";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function InstallStrip() {
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getCommand = (manager: PackageManager) => {
    switch (manager) {
      case "pnpm":
        return "pnpm dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "npm":
        return "npx shadcn add https://liber.dev/r/hero-centered.json";
      case "yarn":
        return "yarn dlx shadcn add https://liber.dev/r/hero-centered.json";
      case "bun":
        return "bunx --bun shadcn add https://liber.dev/r/hero-centered.json";
    }
  };

  const handleCopy = () => {
    const cmd = getCommand(pm);
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    toast("Command copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[680px] mx-auto text-center space-y-2">
      <div className="flex items-center justify-between rounded-[10px] border border-border bg-card p-1.5">
        {/* PM Tabs */}
        <div className="flex items-center gap-1">
          {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((tab) => (
            <button
              key={tab}
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
        <code className="text-xs font-mono text-foreground px-3 truncate select-all">
          $ {getCommand(pm)}
        </code>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy command"
          className="flex h-7 items-center gap-1.5 px-2.5 rounded-[6px] border border-border bg-surface-subtle text-[11px] font-medium text-foreground hover:bg-muted transition-colors shrink-0"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        One command installs any block, theme or font directly into your codebase.
      </p>
    </div>
  );
}
