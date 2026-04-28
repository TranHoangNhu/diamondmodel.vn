import type { ReactNode } from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import TrustSection from "@/components/home/TrustSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import VideosSection from "@/components/home/VideosSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getCmsHeroSlides } from "@/lib/cms-settings";

function HomeReveal({ children }: { children: ReactNode }) {
  return <AnimatedSection animation="fade-top">{children}</AnimatedSection>;
}

export default async function Home() {
  const heroSlides = await getCmsHeroSlides();

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
        <ProjectsSection />
      </HomeReveal>
      <HomeReveal>
        <ProcessSection />
      </HomeReveal>
      <HomeReveal>
        <StatsSection />
      </HomeReveal>
      <HomeReveal>
        <VideosSection />
      </HomeReveal>
    </>
  );
}
