import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Building2, Server, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Notice — Liber UI",
  description: "Legal notice, publisher, infrastructure hosting, and open-source governance of the Liber UI platform.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Compliance &amp; Transparency</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Legal Notice
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Statutory information and legal notices regarding the Liber UI open-source project and registry.
        </p>
      </div>

      {/* 1. Platform Publisher */}
      <section className="space-y-4" id="publisher">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Building2 className="h-5 w-5 text-primary" />
          <h2>1. Platform Publisher</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-card">
          <p>
            The website and component registry for <strong className="text-foreground">Liber UI</strong> are published as an open-source community initiative.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-foreground">
            <li><span className="text-muted-foreground">Project Name:</span> Liber UI</li>
            <li><span className="text-muted-foreground">Lead Maintainers:</span> The Liber UI Core Team</li>
            <li><span className="text-muted-foreground">Contact Email:</span> contact@liber-ui.dev</li>
            <li><span className="text-muted-foreground">Official Repository:</span> https://github.com/liber-ui/liber</li>
          </ul>
        </div>
      </section>

      {/* 2. Infrastructure & Hosting */}
      <section className="space-y-4" id="hosting">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Server className="h-5 w-5 text-primary" />
          <h2>2. Infrastructure &amp; Hosting</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-card">
          <p>
            Liber UI applications and APIs are hosted and distributed globally through high-performance Edge content delivery networks:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-foreground">
            <li><span className="text-muted-foreground">Hosting Providers:</span> Vercel Inc. / Cloudflare Inc.</li>
            <li><span className="text-muted-foreground">Address:</span> 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
            <li><span className="text-muted-foreground">Data Transfer Guarantees:</span> Standard Contractual Clauses (SCC) and EU-US Data Privacy Framework compliance.</li>
          </ul>
        </div>
      </section>

      {/* 3. Intellectual Property & Licenses */}
      <section className="space-y-4" id="intellectual-property">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <FileText className="h-5 w-5 text-primary" />
          <h2>3. Intellectual Property &amp; Open-Source Licenses</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Source code for UI components, CLI packages, and utilities is released under the permissive <strong className="text-foreground">MIT License</strong>. You are free to copy, modify, embed, and distribute them in commercial and personal projects with zero royalty fees.
          </p>
          <p>
            CSS animations are adapted under the FreeBSD open license (Animista). Distributed typographies rely strictly on permissive open licenses (SIL Open Font License 1.1 or Apache 2.0).
          </p>
          <p>
            Third-party brand logos referenced in the catalog remain the intellectual property of their respective trademark holders and are utilized solely for nominative fair use identification.
          </p>
        </div>
      </section>

      {/* 4. Personal Data & Privacy */}
      <section className="space-y-4" id="data-protection">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Mail className="h-5 w-5 text-primary" />
          <h2>4. Data Protection &amp; Contact</h2>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            In compliance with the General Data Protection Regulation (GDPR 2016/679), you retain full rights to access, rectify, or delete any personal data.
          </p>
          <p>
            For compliance inquiries, trademark requests, or legal notices, reach us directly at: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px] text-foreground">legal@liber-ui.dev</code>.
          </p>
        </div>
      </section>

      <div className="pt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>Last updated: November 2026</span>
        <div className="flex items-center gap-3">
          <Link href="/legal/terms" className="hover:text-foreground underline transition-colors">
            Terms of Service
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
