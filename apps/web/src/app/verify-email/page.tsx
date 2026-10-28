import React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Link href="/" className="inline-block text-lg font-semibold tracking-tight">
          Liber
        </Link>

        <div className="p-8 rounded-[10px] border border-border bg-card space-y-4">
          <div className="h-12 w-12 rounded-full border border-border bg-surface-subtle flex items-center justify-center mx-auto text-foreground">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-foreground">Verify your email</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We&apos;ve sent a verification email to your address. Please click the link inside to
            activate your account.
          </p>

          <div className="pt-2">
            <Link
              href="/sign-in"
              className="w-full h-9 rounded-[10px] bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <span>Proceed to sign in</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <button className="text-foreground underline">Click to resend</button>
        </p>
      </div>
    </div>
  );
}
