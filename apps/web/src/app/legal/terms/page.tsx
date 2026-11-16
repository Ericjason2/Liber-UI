import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertTriangle, FileCode2, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service (ToS) — Liber UI",
  description: "Terms of service, source code licensing, and liability framework for Liber UI.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <Scale className="h-3.5 w-3.5 text-primary" />
          <span>Terms &amp; Framework</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By accessing this website, using the CLI, or copying Liber UI components, you agree to these terms of service.
        </p>
      </div>

      {/* 1. Purpose & Service Scope */}
      <section className="space-y-4" id="scope">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Globe2 className="h-5 w-5 text-primary" />
          <h2>1. Purpose &amp; Service Scope</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Liber UI provides developers, designers, and engineering teams with an open-source registry of React components, design tokens, CSS keyframe animations, open typographies, and command-line developer tools.
          </p>
          <p>
            Components are supplied as source code files (TypeScript / Tailwind CSS) engineered to be copied, embedded, or modified directly within your application codebases.
          </p>
        </div>
      </section>

      {/* 2. License & Granted Rights */}
      <section className="space-y-4" id="license">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <FileCode2 className="h-5 w-5 text-primary" />
          <h2>2. Open Source License &amp; Usage Rights</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            All components created and maintained by Liber UI are released under the terms of the <strong className="text-foreground">MIT License</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Permitted
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Commercial and personal projects, full code modification, proprietary closed-source integration, royalty-free distribution.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Conditions
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Retain original copyright headers and MIT license notices where substantial portions of files are reused.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Warranty Disclaimer & Liability */}
      <section className="space-y-4" id="liability">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2>3. Warranty Disclaimer &amp; Limitation of Liability</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            THE SOFTWARE, COMPONENTS, SCRIPTS, AND ASSETS ARE PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            IN NO EVENT SHALL THE AUTHORS, MAINTAINERS, OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM OR IN CONNECTION WITH THE SOFTWARE OR THE USE OF THE REGISTRY.
          </p>
        </div>
      </section>

      {/* 4. Service Evolution */}
      <section className="space-y-4" id="evolution">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Scale className="h-5 w-5 text-primary" />
          <h2>4. Service Modifications &amp; Updates</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Liber UI reserves the right to expand, update, or deprecate components and registry features. These terms may be revised periodically to reflect evolving legal or architectural standards.
          </p>
        </div>
      </section>

      <div className="pt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>Version 1.2 — November 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/mentions-legales" className="hover:text-foreground underline transition-colors">
            Legal Notice
          </Link>
          <span>•</span>
          <Link href="/legal/cookies" className="hover:text-foreground underline transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
