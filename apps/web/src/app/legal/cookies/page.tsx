"use client";

import React from "react";
import Link from "next/link";
import { Cookie, Sliders } from "lucide-react";

export default function CookiesPolicyPage() {
  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("liber:open-cookie-settings"));
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <Cookie className="h-3.5 w-3.5 text-primary" />
          <span>Privacy &amp; Trackers</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Cookie &amp; Local Storage Policy
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Transparent explanation of client-side storage technologies and cookies used on Liber UI in compliance with GDPR standards.
        </p>
      </div>

      {/* Direct Preference Configuration Button */}
      <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sliders className="h-4 w-4 text-primary" />
            Manage your cookie preferences anytime
          </h2>
          <p className="text-xs text-muted-foreground">
            You can modify or withdraw your preferences at any moment with a single click.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCookieSettings}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Customize cookie settings
        </button>
      </div>

      {/* 1. What is a cookie / local storage? */}
      <section className="space-y-4" id="definition">
        <h2 className="text-base font-semibold text-foreground">
          1. What is a cookie and local storage?
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            A cookie is a small text file saved to your device when visiting an online service. Local storage (LocalStorage / SessionStorage) is an equivalent client-side key-value technology that preserves preferences securely on your device without transmitting data in headers with every HTTP request.
          </p>
          <p>
            On Liber UI, we prioritize local <strong className="text-foreground">LocalStorage</strong> to persist your interface preferences (light/dark theme, package manager preference pnpm/npm) strictly on your own device.
          </p>
        </div>
      </section>

      {/* 2. Trackers & Data Table */}
      <section className="space-y-4" id="table">
        <h2 className="text-base font-semibold text-foreground">
          2. Inventory of keys and data stored
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="p-3">Key / Name</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Storage Type</th>
                <th className="p-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground font-mono text-[11px]">
              <tr>
                <td className="p-3 text-foreground font-semibold">theme</td>
                <td className="p-3 font-sans">Stores your display appearance preference (light or dark mode).</td>
                <td className="p-3">LocalStorage (Essential)</td>
                <td className="p-3">Persistent</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">liber_cookie_consent</td>
                <td className="p-3 font-sans">Stores your GDPR consent decisions (acceptance or refusal).</td>
                <td className="p-3">LocalStorage (Essential)</td>
                <td className="p-3">6 months</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">preferred_pm</td>
                <td className="p-3 font-sans">Remembers your preferred package manager (pnpm, npm, yarn, bun) for CLI commands.</td>
                <td className="p-3">LocalStorage (Functional)</td>
                <td className="p-3">Persistent</td>
              </tr>
              <tr>
                <td className="p-3 text-foreground font-semibold">_edge_perf</td>
                <td className="p-3 font-sans">Aggregated, anonymous latency metrics for Edge CDN delivery (optional).</td>
                <td className="p-3">First-Party Cookie</td>
                <td className="p-3">13 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Third-party advertising trackers */}
      <section className="space-y-4" id="third-party">
        <h2 className="text-base font-semibold text-foreground">
          3. Zero third-party ad tracking
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Liber UI includes no ad networks, no retargeting pixels (Facebook, Google Ads, TikTok), and no cross-site user trackers.
          </p>
          <p>
            Your browsing data is never sold, leased, or transmitted to third parties for marketing or behavioral profiling.
          </p>
        </div>
      </section>

      {/* 4. Consent validity */}
      <section className="space-y-4" id="retention">
        <h2 className="text-base font-semibold text-foreground">
          4. Consent validity period
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Your privacy choices are retained for a maximum duration of <strong className="text-foreground">6 months</strong>. After this period, the preference banner will prompt you again to renew or update your preferences.
          </p>
        </div>
      </section>

      <div className="pt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>Updated: November 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/mentions-legales" className="hover:text-foreground underline transition-colors">
            Legal Notice
          </Link>
          <span>•</span>
          <Link href="/legal/terms" className="hover:text-foreground underline transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
