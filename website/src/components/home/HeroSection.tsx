"use client";

import { useEffect, useRef, useState } from "react";
import { PHO_GIA_COMPANY } from "@/lib/phogia";

const HERO_CAPTIONS = [
  { time: 0, title: "Khởi nguồn cảm hứng" },
  { time: 6, title: "Thiết kế độc bản" },
  { time: 14, title: "Kết tinh giá trị" },
] as const;

export default function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [caption, setCaption] = useState<string>(HERO_CAPTIONS[0].title);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const seekToReferenceFrame = () => {
      try {
        video.currentTime = 0;
      } catch {
        // Ignore timing issues while metadata is still loading.
      }
    };

    const syncCaption = () => {
      const activeCaption = [...HERO_CAPTIONS].reverse().find((item) => video.currentTime >= item.time);
      setCaption(activeCaption?.title ?? HERO_CAPTIONS[0].title);
    };

    if (video.readyState >= 1) {
      seekToReferenceFrame();
    } else {
      video.addEventListener("loadedmetadata", seekToReferenceFrame, { once: true });
    }

    video.addEventListener("timeupdate", syncCaption);
    return () => {
      video.removeEventListener("loadedmetadata", seekToReferenceFrame);
      video.removeEventListener("timeupdate", syncCaption);
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
        poster={PHO_GIA_COMPANY.heroPoster}
      >
        <source src={PHO_GIA_COMPANY.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />
      <div className="ph-container absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center">
        <p className="font-heading text-[38px] font-semibold uppercase leading-[1.05] text-white drop-shadow md:text-[68px]">
          {caption}
        </p>
      </div>
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
