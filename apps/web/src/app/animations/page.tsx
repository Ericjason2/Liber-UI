import type { Metadata } from "next";
import AnimationsView from "@/views/AnimationsView";

export const metadata: Metadata = {
  title: "CSS & Tailwind Animations Playground — Liber UI",
  description:
    "24 hardware-accelerated Animista-style CSS keyframes and Tailwind utilities with live duration, delay, loop, and prefers-reduced-motion controls.",
};

export default function AnimationsRoute() {
  return <AnimationsView />;
}
