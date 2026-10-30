"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubMono } from "@liber-ui/react";
import { useToast } from "@/context/ToastContext";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Mock sign-up: Verification link simulated.");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-lg font-semibold tracking-tight">
            Liber
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create your account</h1>
          <p className="text-xs text-muted-foreground">
            Save custom palettes and track library additions.
          </p>
        </div>

        <div className="p-6 rounded-[10px] border border-border bg-card space-y-4">
          <button
            onClick={() => toast("GitHub OAuth: UI mock preview only.")}
            className="w-full h-10 px-4 rounded-[10px] border border-border bg-surface-subtle text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <GithubMono size={16} />
            <span>Sign up with GitHub</span>
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-2 text-[10px] uppercase font-mono text-muted-foreground">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-9 px-3 text-xs rounded-[10px] border border-border bg-surface-subtle text-foreground focus:outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-9 px-3 text-xs rounded-[10px] border border-border bg-surface-subtle text-foreground focus:outline-none placeholder:text-muted-foreground"
              />
              <p className="text-[10px] text-muted-foreground">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              className="w-full h-9 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <span>Create account</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-foreground font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
