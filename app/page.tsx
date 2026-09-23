import { CostSection } from "./_components/cost-section";
import { Hero } from "./_components/hero";
import { StickyNav } from "./_components/nav";
import { PlatformSection } from "./_components/platform-section";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <Hero />
        <CostSection />
        <PlatformSection />
      </main>
    </>
  );
}
