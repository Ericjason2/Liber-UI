import type { Metadata } from "next";
import HomeView from "@/views/HomeView";

export const metadata: Metadata = {
  title: "Liber UI — Open code for polished interfaces",
  description:
    "Browse, copy and install 150+ tech logos, 24 CSS & Tailwind animations, 10 UI components, 761 color themes, and 7,382+ open-license fonts.",
};

export default function HomeRoute() {
  return <HomeView />;
}
