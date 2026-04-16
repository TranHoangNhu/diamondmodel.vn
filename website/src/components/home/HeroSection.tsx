"use client";

import { useEffect, useRef } from "react";
import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const seekToReferenceFrame = () => {
      try {
        video.currentTime = 8.5;
      } catch {
        // Ignore timing issues while metadata is still loading.
      }
    };

    if (video.readyState >= 1) {
      seekToReferenceFrame();
      return;
    }

    video.addEventListener("loadedmetadata", seekToReferenceFrame, { once: true });
    return () => video.removeEventListener("loadedmetadata", seekToReferenceFrame);
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
        poster={PHO_GIA_COMPANY.heroPoster}
      >
        <source src={PHO_GIA_COMPANY.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/[0.45]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/[0.65]">
        <span>Scroll down</span>
        <div className="flex flex-col items-center gap-1 text-white/60">
          <span>⌄</span>
          <span>⌄</span>
          <span>⌄</span>
        </div>
      </div>
    </section>
  );
}
