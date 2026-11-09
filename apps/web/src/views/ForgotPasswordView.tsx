"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block text-lg font-semibold tracking-tight">
            Liber
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Reset password</h1>
          <p className="text-xs text-muted-foreground">
            Enter your email and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        <div className="p-6 rounded-[10px] border border-border bg-card space-y-4">
          {sent ? (
            <div className="text-center space-y-3 py-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
              <h2 className="text-sm font-semibold text-foreground">Check your email</h2>
              <p className="text-xs text-muted-foreground">
                We sent a password reset link to <strong className="text-foreground">{email}</strong>.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-9 px-3 text-xs rounded-[10px] border border-border bg-surface-subtle text-foreground focus:outline-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full h-9 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Send reset link
              </button>
            </form>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
