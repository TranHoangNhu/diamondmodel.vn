"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PHO_GIA_COMPANY } from "@/lib/phogia";

const HERO_AUTO_MS = 5500;

export default function HeroSection() {
  const slides = PHO_GIA_COMPANY.heroSlides ?? [PHO_GIA_COMPANY.heroPoster];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, HERO_AUTO_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={[
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <Image
              src={slide}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden="true"
              priority={index === 0}
              quality={92}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/35" />

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
