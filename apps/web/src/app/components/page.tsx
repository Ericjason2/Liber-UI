"use client";

import React, { useState } from "react";
import { SAMPLE_COMPONENTS, type ComponentItem } from "@/lib/catalog";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ComponentsPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (c: ComponentItem) => {
    navigator.clipboard.writeText(`pnpm dlx shadcn add https://liber.dev/r/${c.slug}.json`);
    setCopiedSlug(c.slug);
    toast(`Copied ${c.name} command`);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="space-y-1 pb-4 border-b border-border">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Components</h1>
        <p className="text-sm text-muted-foreground">
          Core accessible UI primitives engineered with Radix headless primitives and Tailwind styling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_COMPONENTS.map((item) => (
          <div
            key={item.slug}
            id={item.slug}
            className="rounded-[10px] border border-border bg-card p-6 space-y-4 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-500 transition-all scroll-mt-20"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">MIT</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-2 border-t border-border">
              <button
                onClick={() => handleCopy(item)}
                className="w-full flex items-center justify-between h-9 px-3 rounded-[6px] border border-border bg-surface-subtle text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>add {item.slug}</span>
                {copiedSlug === item.slug ? (
                  <Check className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
