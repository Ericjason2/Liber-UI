"use client";

import React, { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { HomeHeroShowcase } from "@/components/home/HomeHeroShowcase";
import { HomeBentoCatalog } from "@/components/home/HomeBentoCatalog";
import { HomeLogosMatrix } from "@/components/home/HomeLogosMatrix";
import { HomeColorShowcase } from "@/components/home/HomeColorShowcase";
import { HomeTypographyShowcase } from "@/components/home/HomeTypographyShowcase";
import { HomeComponentsShowcase } from "@/components/home/HomeComponentsShowcase";
import { HomeClosingCta } from "@/components/home/HomeClosingCta";

/**
 * Editorial Design-System showcase homepage inspired by Behance Case Study 227427711,
 * crafted strictly with Liber UI's Geist / Midnight Slate visual identity and real catalog data.
 */
export default function HomeView() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-24 sm:space-y-32 overflow-x-clip">
      <HomeHeroShowcase onOpenSearch={() => setSearchOpen(true)} />
      <HomeBentoCatalog />
      <HomeLogosMatrix />
      <HomeColorShowcase />
      <HomeTypographyShowcase />
      <HomeComponentsShowcase />
      <HomeClosingCta />

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
