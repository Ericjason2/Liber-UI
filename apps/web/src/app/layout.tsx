import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipToContent } from "@/components/SkipToContent";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Liber UI — The open code catalog for your web apps",
  description:
    "A curated collection of readable, copy-pasteable tech logos, CSS animations, components, color themes, and typography definitions. No dependencies, no lock-in.",
  keywords: ["developer tools", "logos", "ui components", "css animations", "animista", "themes", "fonts", "svg"],
  authors: [{ name: "Liber contributors" }],
  openGraph: {
    title: "Liber UI — The open code catalog for developers",
    description: "Browse, copy and install logos, animations, themes, and fonts with one command.",
    url: "https://liber-ui-delta.vercel.app",
    siteName: "Liber",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <ToastProvider>
            <SkipToContent />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
