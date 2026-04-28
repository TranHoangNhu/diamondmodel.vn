"use client";

import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/cms-settings";
import { DIAMOND_VN_COMPANY } from "@/lib/diamond-vn";

const HERO_AUTO_MS = 3000;

const fallbackSlides: HeroSlide[] = (DIAMOND_VN_COMPANY.heroSlides ?? [DIAMOND_VN_COMPANY.heroPoster]).map(
  (url) => ({ type: "image", url, alt: "Diamond Model hero" }),
);

export default function HeroSection({ slides: cmsSlides = [] }: { slides?: HeroSlide[] }) {
  const slides = cmsSlides.length > 0 ? cmsSlides : fallbackSlides;
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
            key={`${slide.url}-${index}`}
            className={[
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {slide.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload={index === 0 ? "auto" : "metadata"}
                poster={slide.poster || undefined}
                aria-label={slide.alt || undefined}
              >
                <source src={slide.url} />
              </video>
            ) : (
              <img
                src={slide.url}
                alt={slide.alt || ""}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                aria-hidden={slide.alt ? undefined : "true"}
              />
            )}
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
