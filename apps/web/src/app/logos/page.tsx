import type { Metadata } from "next";
import LogosView from "@/views/LogosView";

export const metadata: Metadata = {
  title: "Tech & Brand Logos — Liber UI",
  description:
    "150+ official developer tool, language, cloud, and framework SVG logos in Color, Monochrome, and Wordmark variants.",
};

export default function LogosRoute() {
  return <LogosView />;
}
