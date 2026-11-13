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
 * Editorial Design-System showcase homepage.
 */
export default function HomeView() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14 sm:py-24 space-y-32 sm:space-y-44 overflow-x-clip">
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
