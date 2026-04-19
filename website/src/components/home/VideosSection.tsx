"use client";

import Image from "next/image";
import { ArrowLongLeftIcon, ArrowLongRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { PHO_GIA_VIDEOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";
import { useCarouselInteraction } from "./useCarouselInteraction";

const AUTO_ADVANCE_MS = 2000;

function getSlidesPerView() {
  if (typeof window === "undefined") return 3;

  const width = window.innerWidth;
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
}

function getGapSize(slidesPerView: number) {
  if (slidesPerView >= 3) return 24;
  if (slidesPerView === 2) return 20;
  return 16;
}

function buildLoopedSlides<T>(slides: readonly T[], cloneCount: number) {
  if (cloneCount <= 0 || slides.length === 0) return [...slides];

  return [...slides.slice(-cloneCount), ...slides, ...slides.slice(0, cloneCount)];
}

function VideoSlide({
  image,
  title,
  href,
  tone,
}: {
  image: string;
  title: string;
  href: string;
  tone: "accent" | "dark";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col"
      aria-label={`Mở video ${title}`}
    >
      <div className="relative overflow-hidden rounded-[8px] bg-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover opacity-[0.88] transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/28 transition duration-500 group-hover:bg-black/18" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={[
              "flex h-14 w-20 items-center justify-center rounded-[16px] shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition duration-300 group-hover:scale-[1.05]",
              tone === "accent" ? "bg-[#ed1c24]" : "bg-[#1d1d1d]/85",
            ].join(" ")}
          >
            <PlayIcon className="h-7 w-7 translate-x-[1px] text-white" />
          </div>
        </div>
      </div>
      <h3 className="mx-auto mt-4 max-w-[92%] text-center text-[14px] font-medium uppercase leading-[1.45] tracking-[0.01em] text-[#4f4b46] md:text-[15px] lg:text-[16px]">
        {title}
      </h3>
    </a>
  );
}

function VideosCarousel({ slidesPerView }: { slidesPerView: number }) {
  const gapSize = getGapSize(slidesPerView);
  const cloneCount = Math.min(slidesPerView, PHO_GIA_VIDEOS.length);
  const loopedSlides = useMemo(() => buildLoopedSlides(PHO_GIA_VIDEOS, cloneCount), [cloneCount]);
  const [currentIndex, setCurrentIndex] = useState(() => cloneCount);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const { dragOffset, isDragging, pauseAuto, pauseUntilRef, bindDragHandlers } = useCarouselInteraction({
    onSwipeLeft: () => setCurrentIndex((index) => index + 1),
    onSwipeRight: () => setCurrentIndex((index) => index - 1),
  });

  useEffect(() => {
    if (PHO_GIA_VIDEOS.length <= 1) return;

    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setCurrentIndex((index) => index + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [pauseUntilRef]);

  const activeSlide =
    ((currentIndex - cloneCount) % PHO_GIA_VIDEOS.length + PHO_GIA_VIDEOS.length) % PHO_GIA_VIDEOS.length;

  const goToIndex = (nextIndex: number) => {
    if (PHO_GIA_VIDEOS.length <= 1) return;
    pauseAuto();
    setTransitionEnabled(true);
    setCurrentIndex(nextIndex);
  };

  const handleTransitionEnd = () => {
    if (PHO_GIA_VIDEOS.length <= 1) return;

    if (currentIndex >= cloneCount + PHO_GIA_VIDEOS.length) {
      setTransitionEnabled(false);
      setCurrentIndex(cloneCount);
      window.requestAnimationFrame(() => setTransitionEnabled(true));
      return;
    }

    if (currentIndex < cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(cloneCount + PHO_GIA_VIDEOS.length - 1);
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    }
  };

  const slideWidth = `calc((100% - ${(slidesPerView - 1) * gapSize}px) / ${slidesPerView})`;
  const slideStep = `((100% - ${(slidesPerView - 1) * gapSize}px) / ${slidesPerView} + ${gapSize}px)`;

  return (
    <div className="mt-12">
      <div
        className="overflow-hidden"
        style={{
          width: "calc(100% + (50vw - 50%))",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div
          {...bindDragHandlers}
          className="flex items-stretch select-none"
          style={{
            gap: `${gapSize}px`,
            transform: `translate3d(calc(-1 * ${currentIndex} * ${slideStep} + ${dragOffset}px), 0, 0)`,
            transition: isDragging || !transitionEnabled ? "none" : "transform 700ms ease-out",
            touchAction: "pan-y",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopedSlides.map((video, index) => {
            const realIndex = ((index - cloneCount) % PHO_GIA_VIDEOS.length + PHO_GIA_VIDEOS.length) % PHO_GIA_VIDEOS.length;
            const isFirstVisibleRealVideo = realIndex === activeSlide;

            return (
              <div key={`${video.title}-${index}`} className="shrink-0" style={{ width: slideWidth }}>
                <VideoSlide
                  image={video.image}
                  title={video.title}
                  href={video.href}
                  tone={isFirstVisibleRealVideo ? "accent" : "dark"}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goToIndex(currentIndex - 1)}
          aria-label="Trang trước"
          className="hidden h-10 w-10 items-center justify-center rounded-[8px] text-[#8e8e8e] transition hover:bg-[#f4efe7] hover:text-[#d5a24f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a24f]/40 md:inline-flex"
        >
          <ArrowLongLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-2">
          {PHO_GIA_VIDEOS.map((_, videoIndex) => {
            const active = videoIndex === activeSlide;

            return (
              <button
                key={`video-dot-${videoIndex}`}
                type="button"
                onClick={() => goToIndex(cloneCount + videoIndex)}
                aria-label={`Chuyển tới video ${videoIndex + 1}`}
                aria-current={active ? "true" : undefined}
                className={[
                  "h-2.5 w-2.5 rounded-[8px] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a24f]/40",
                  active
                    ? "border-[#d5a24f] bg-[#d5a24f] shadow-[0_0_0_3px_rgba(213,162,79,0.18)]"
                    : "border-[#eee4d6] bg-[#eee4d6] hover:border-[#d5a24f]/40 hover:bg-[#e8d7bc]",
                ].join(" ")}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goToIndex(currentIndex + 1)}
          aria-label="Trang sau"
          className="hidden h-10 w-10 items-center justify-center rounded-[8px] text-[#8e8e8e] transition hover:bg-[#f4efe7] hover:text-[#d5a24f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a24f]/40 md:inline-flex"
        >
          <ArrowLongRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default function VideosSection() {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const updateSlidesPerView = () => setSlidesPerView(getSlidesPerView());

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return (
    <section id="videos" className="ph-section-surface scroll-mt-24">
      <div className="ph-container-wide">
        <SectionHeading eyebrow="Năng lực của chúng tôi" title="KHÁM PHÁ PHỐ GIA" />
        <VideosCarousel key={slidesPerView} slidesPerView={slidesPerView} />
      </div>
    </section>
  );
}
