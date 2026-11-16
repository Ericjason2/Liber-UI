"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings, X } from "lucide-react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_STORAGE_KEY = "liber_cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
        if (!stored) {
          setShowBanner(true);
        } else {
          const parsed: CookiePreferences = JSON.parse(stored);
          setAnalyticsAllowed(Boolean(parsed.analytics));
          setMarketingAllowed(Boolean(parsed.marketing));
        }
      } catch {
        setShowBanner(true);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Listen for footer or user triggers to re-open the settings modal
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowCustomizeModal(true);
      setShowBanner(false);
    };

    window.addEventListener("liber:open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("liber:open-cookie-settings", handleOpenSettings);
    };
  }, []);

  // Escape key handler for accessible modal closing
  useEffect(() => {
    if (!showCustomizeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCustomizeModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCustomizeModal]);

  const savePreferences = (preferences: CookiePreferences) => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // storage unavailable or private mode
    }
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    setAnalyticsAllowed(true);
    setMarketingAllowed(true);
    savePreferences(prefs);
  };

  const handleRefuseAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    setAnalyticsAllowed(false);
    setMarketingAllowed(false);
    savePreferences(prefs);
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    };
    savePreferences(prefs);
  };

  return (
    <>
      {/* --- Floating Bottom Consent Banner (RGPD / ePrivacy) --- */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Cookie and privacy settings"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl transition-all duration-300 animate-[liber-reveal-up_400ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary mt-0.5">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  We value your privacy
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use essential cookies for basic site functionality and, with your consent, anonymous analytics to measure performance and improve your experience.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={handleRefuseAll}
                  className="px-3.5 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Decline optional
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBanner(false);
                    setShowCustomizeModal(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                  Customize
                </button>
              </div>

              <div className="pt-1 text-[11px] text-muted-foreground/80 flex items-center gap-2">
                <Link
                  href="/legal/cookies"
                  className="underline hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
                <span>•</span>
                <Link
                  href="/legal/mentions-legales"
                  className="underline hover:text-foreground transition-colors"
                >
                  Legal Notice
                </Link>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* --- Accessible Customization Modal --- */}
      {showCustomizeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setShowCustomizeModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-5 sm:p-6 space-y-5 animate-[scale-up-center_250ms_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 id="cookie-modal-title" className="text-base font-semibold text-foreground">
                  Cookie Preferences
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomizeModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              You can configure your preferences for each category. Strictly necessary cookies cannot be disabled as they ensure the security and core features of the site.
            </p>

            <div className="space-y-3.5">
              {/* Category 1: Necessary (Always active) */}
              <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      Strictly Necessary Cookies
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      Always Active
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Required</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Required to remember your theme choice (light/dark), session state, and GDPR privacy settings.
                </p>
              </div>

              {/* Category 2: Audience Measurement */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-1.5 hover:border-border/80 transition-colors">
                <div className="flex items-center justify-between">
                  <label htmlFor="cookie-analytics" className="text-xs font-semibold text-foreground cursor-pointer">
                    Analytics &amp; Performance
                  </label>
                  <input
                    id="cookie-analytics"
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Anonymous metrics to monitor site traffic, CDN speed, and optimize component loading latency.
                </p>
              </div>

              {/* Category 3: Personalization & Marketing */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-1.5 hover:border-border/80 transition-colors">
                <div className="flex items-center justify-between">
                  <label htmlFor="cookie-marketing" className="text-xs font-semibold text-foreground cursor-pointer">
                    Personalization &amp; External Embeds
                  </label>
                  <input
                    id="cookie-marketing"
                    type="checkbox"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Enables rich interactive previews and embedded developer guides from external partner platforms.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-border">
              <button
                type="button"
                onClick={handleRefuseAll}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Reject all
              </button>
              <div className="w-full sm:w-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg border border-border bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Save preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

