import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-4">
        <div className="text-4xl font-mono font-semibold tracking-tight text-foreground">404</div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Resource not found</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The asset or page you requested does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
