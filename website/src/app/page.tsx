import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import TrustSection from "@/components/home/TrustSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import VideosSection from "@/components/home/VideosSection";
import PressSection from "@/components/home/PressSection";
import CompletedSection from "@/components/home/CompletedSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <TrustSection />
      <ProjectsSection />
      <ProcessSection />
      <StatsSection />
      <VideosSection />
      <PressSection />
      <CompletedSection />
    </>
  );
}
