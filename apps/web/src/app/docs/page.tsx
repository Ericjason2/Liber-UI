import type { Metadata } from "next";
import DocsView from "@/views/DocsView";

export const metadata: Metadata = {
  title: "Documentation & CLI Guide — Liber UI",
  description:
    "Complete documentation for Liber UI, @liber-ui/cli, @liber-ui/logo, typography self-hosting, color themes, and CSS animations.",
};

export default function DocsRoute() {
  return <DocsView />;
}
