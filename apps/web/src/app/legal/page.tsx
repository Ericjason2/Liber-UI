import React from "react";
import { ShieldCheck, Scale, AlertCircle } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Legal, Trademarks & Takedown
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Liber is dedicated to maintaining high legal and intellectual property standards across
          all distributed software assets, logos, and typographies.
        </p>
      </div>

      {/* 1. Trademarks Section */}
      <section className="space-y-4" id="trademarks">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2>Trademark Notice & Nominative Fair Use</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            All brand logos and names displayed in the Liber catalog (such as GitHub, Docker, Vercel,
            Next.js, TypeScript, etc.) are registered trademarks of their respective owners.
          </p>
          <p>
            These assets are distributed strictly for nominative identification (e.g. displaying
            a technology stack on a portfolio or partner footer). Their inclusion in Liber does not
            imply sponsorship, affiliation, or endorsement by the trademark holders.
          </p>
          <p>
            Users of Liber are responsible for ensuring their usage complies with each brand’s official
            guidelines, linked directly on each logo’s detail page.
          </p>
        </div>
      </section>

      {/* 2. Licenses Section */}
      <section className="space-y-4 border-t border-border pt-8" id="licenses">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2>Open Source Code Licenses</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            The software source code developed for Liber (including build scripts, React logo
            components, UI blocks, components, and CSS theme definitions) is licensed under the
            <strong className="text-foreground font-semibold"> MIT License</strong>.
          </p>
          <div className="p-4 rounded-[10px] border border-border bg-surface-subtle font-mono text-[11px] text-foreground leading-relaxed">
            Copyright (c) 2026 Liber contributors.<br /><br />
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the &quot;Software&quot;), to deal
            in the Software without restriction...
          </div>
          <p>
            All font families provided through Liber are licensed under permissive open font licenses
            (SIL Open Font License 1.1 or Apache 2.0). No commercial or proprietary fonts are distributed.
          </p>
        </div>
      </section>

      {/* 3. Takedown Requests Section */}
      <section className="space-y-4 border-t border-border pt-8" id="takedown">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2>Notice & Takedown Procedure (7-Day SLA)</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            If you are a trademark owner (or their designated agent) and wish to have an asset removed
            or its visual representation corrected, we respect your rights and offer a swift removal process:
          </p>

          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Send an email to <code className="bg-muted px-1.5 py-0.5 rounded-[6px] font-mono text-[11px] text-foreground">takedown@liber.dev</code> with the subject line <strong className="text-foreground">Takedown: [Logo Slug]</strong>.
            </li>
            <li>
              Specify the asset identifier, URL, and the requested action (full removal or guideline fix).
            </li>
            <li>
              Provide contact details establishing your authority to represent the trademark owner.
            </li>
          </ol>

          <div className="p-4 rounded-[10px] border border-border bg-card space-y-2">
            <span className="font-semibold text-foreground block">Our Guarantees</span>
            <ul className="list-disc pl-5 space-y-1">
              <li>Receipt acknowledgment within 2 business days.</li>
              <li>Asset removed from website, registry, CDN and packages within <strong>7 days</strong>.</li>
              <li>Removing a trademarked logo is shipped as a major semver package bump.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
