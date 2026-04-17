import type { ReactNode } from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import TrustSection from "@/components/home/TrustSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import VideosSection from "@/components/home/VideosSection";
import PressSection from "@/components/home/PressSection";
import CompletedSection from "@/components/home/CompletedSection";
import AnimatedSection from "@/components/ui/AnimatedSection";

function HomeReveal({ children }: { children: ReactNode }) {
  return <AnimatedSection animation="fade-top">{children}</AnimatedSection>;
}

export default function Home() {
  return (
    <>
      <HeroSection />
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
      <HomeReveal>
        <PressSection />
      </HomeReveal>
      <HomeReveal>
        <CompletedSection />
      </HomeReveal>
    </>
  );
}
