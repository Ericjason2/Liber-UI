"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Liber runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-4">
        <div className="h-12 w-12 rounded-full border border-border bg-surface-subtle flex items-center justify-center mx-auto text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="text-3xl font-mono font-semibold tracking-tight text-foreground">500</div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Something went wrong</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          An unexpected error occurred while loading this resource.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-border bg-card text-foreground text-xs font-medium hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
