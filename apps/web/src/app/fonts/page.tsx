import type { Metadata } from "next";
import FontsView from "@/views/FontsView";

export const metadata: Metadata = {
  title: "Typography & Font System (7,382+ Fonts) — Liber UI",
  description:
    "Explore 7,382+ open-license and 100% free commercial typefaces classified alphabetically and by themes with live custom text previews.",
};

export default function FontsRoute() {
  return <FontsView />;
}
