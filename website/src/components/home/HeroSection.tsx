"use client";

import { useEffect, useRef } from "react";
import { PHO_GIA_COMPANY } from "@/lib/phogia";

const HERO_FRAME_TIME = 15;

export default function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const lockHeroFrame = () => {
      const targetTime = Math.min(HERO_FRAME_TIME, Math.max(0, (video.duration || HERO_FRAME_TIME) - 0.1));

      try {
        video.currentTime = targetTime;
      } catch {
        // Ignore timing issues while metadata is still loading.
      }

      const pauseFrame = () => {
        video.pause();
      };

      if (video.readyState >= 2) {
        pauseFrame();
      } else {
        video.addEventListener("seeked", pauseFrame, { once: true });
      }
    };

    if (video.readyState >= 1) {
      lockHeroFrame();
    } else {
      video.addEventListener("loadedmetadata", lockHeroFrame, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", lockHeroFrame);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <video
        ref={heroVideoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={PHO_GIA_COMPANY.heroPoster}
      >
        <source src={PHO_GIA_COMPANY.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />
      <a href="#mission" className="ph-scroll-indicator">
        <span className="ph-scroll-copy">
          <span>SCROLL</span>
          <span>DOWN</span>
        </span>
        <span className="ph-scroll-chevrons" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </a>
    </section>
  );
}
