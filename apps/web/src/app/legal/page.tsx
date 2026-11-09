import type { Metadata } from "next";
import LegalView from "@/views/LegalView";

export const metadata: Metadata = {
  title: "Legal, Trademarks & Takedown Policy — Liber UI",
  description:
    "Trademark policy, MIT and Open Font licenses, and 7-day notice and takedown procedure for Liber UI.",
};

export default function LegalRoute() {
  return <LegalView />;
}
