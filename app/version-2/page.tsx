import type { Metadata } from "next";
import { StickyNav } from "../_components/nav";
import { VersionSwitcher } from "../_components/version-switcher";
import { CostV2 } from "./_components/cost-v2";
import { HeroV2 } from "./_components/hero-v2";
import { PlatformV2 } from "./_components/platform-v2";

export const metadata: Metadata = {
  title: "Ekumen | Version 2",
};

export default function VersionTwo() {
  return (
    <div className="bg-ink">
      <StickyNav theme="dark" />
      <main>
        <HeroV2 />
        <CostV2 />
        <PlatformV2 />
      </main>
      <VersionSwitcher current="/version-2" />
    </div>
  );
}
