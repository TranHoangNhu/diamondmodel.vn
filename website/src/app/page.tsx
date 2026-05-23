import type { ReactNode } from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import TrustSection from "@/components/home/TrustSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import VideosSection from "@/components/home/VideosSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getCmsCollection } from "@/lib/cms-content";
import { getCmsHeroSlides } from "@/lib/cms-settings";

export const dynamic = "force-dynamic";

function HomeReveal({ children }: { children: ReactNode }) {
  return <AnimatedSection animation="fade-top">{children}</AnimatedSection>;
}

export default async function Home() {
  const [heroSlides, projectCollection, serviceCollection] = await Promise.all([
    getCmsHeroSlides(),
    getCmsCollection("du-an"),
    getCmsCollection("dich-vu"),
  ]);

  return (
    <>
      <HeroSection slides={heroSlides} />
      <HomeReveal>
        <MissionSection />
      </HomeReveal>
      <HomeReveal>
        <TrustSection />
      </HomeReveal>
      <HomeReveal>
        <ProjectsSection items={projectCollection.items} />
      </HomeReveal>
      <HomeReveal>
        <ProcessSection />
      </HomeReveal>
      <HomeReveal>
        <StatsSection />
      </HomeReveal>
      <HomeReveal>
        <VideosSection items={serviceCollection.items} />
      </HomeReveal>
    </>
  );
}
