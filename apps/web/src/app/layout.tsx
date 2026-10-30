import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Liber UI — The open code catalog for your web apps",
  description:
    "A curated collection of readable, copy-pasteable tech logos, UI blocks, components, color themes, and typography definitions. No dependencies, no lock-in.",
  keywords: ["developer tools", "logos", "shadcn", "ui blocks", "themes", "fonts", "svg"],
  authors: [{ name: "Liber contributors" }],
  openGraph: {
    title: "Liber UI — The open code catalog for developers",
    description: "Browse, copy and install logos, blocks, themes, and fonts with one command.",
    url: "https://liber.dev",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
