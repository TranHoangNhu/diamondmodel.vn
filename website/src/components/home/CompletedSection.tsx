"use client";

/* eslint-disable @next/next/no-img-element */

import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { PHO_GIA_COMPLETED_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

const AUTO_ADVANCE_MS = 2000;
const DESKTOP_PAGE_SIZE = 12;
const TABLET_PAGE_SIZE = 8;
const MOBILE_PAGE_SIZE = 4;

function getPageSize() {
  if (typeof window === "undefined") return DESKTOP_PAGE_SIZE;

  const width = window.innerWidth;
  if (width >= 1280) return DESKTOP_PAGE_SIZE;
  if (width >= 768) return TABLET_PAGE_SIZE;
  return MOBILE_PAGE_SIZE;
}

function chunk<T>(items: readonly T[], size: number) {
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
}

export default function CompletedSection() {
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updatePageSize = () => setPageSize(getPageSize());

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const pages = useMemo(() => chunk(PHO_GIA_COMPLETED_LOGOS, pageSize), [pageSize]);
  const pageCount = pages.length;
  const activePage = pageCount > 0 ? currentPage % pageCount : 0;

  useEffect(() => {
    if (pageCount <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentPage((page) => (page + 1) % pageCount);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [pageCount]);

  const goToPage = (nextPage: number) => {
    if (pageCount <= 1) return;
    setCurrentPage((nextPage + pageCount) % pageCount);
  };

  return (
    <section id="completed" className="ph-section-tight scroll-mt-24">
      <div className="ph-container">
        <SectionHeading eyebrow="" title="NHỮNG DỰ ÁN NỘI THẤT ĐÃ HOÀN THIỆN" />

        <div className="mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: pageCount > 0 ? `translateX(-${(activePage * 100) / pageCount}%)` : "translateX(0%)",
              }}
            >
              {pages.map((page, pageIndex) => (
                <div key={`completed-page-${pageIndex}`} className="w-full shrink-0 px-1 sm:px-2 lg:px-3">
                  <div className="grid grid-flow-col grid-rows-2 auto-cols-fr gap-x-8 gap-y-10 lg:gap-x-14 lg:gap-y-12">
                    {page.map((logo, index) => (
                      <div key={logo} className="flex min-h-[64px] items-center justify-center px-2">
                        <img
                          src={logo}
                          alt={`Dự án nội thất ${pageIndex * pageSize + index + 1}`}
                          className="max-h-[42px] w-auto object-contain opacity-[0.9]"
                          loading={pageIndex === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Trang trước"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-[#8e8e8e] transition hover:bg-[#f4efe7] hover:text-[#d5a24f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a24f]/40"
            >
              <ArrowLongLeftIcon className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2">
              {pages.map((_, pageIndex) => {
                const active = pageIndex === activePage;

                return (
                  <button
                    key={`completed-dot-${pageIndex}`}
                    type="button"
                    onClick={() => goToPage(pageIndex)}
                    aria-label={`Chuyển tới trang ${pageIndex + 1}`}
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
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Trang sau"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] text-[#8e8e8e] transition hover:bg-[#f4efe7] hover:text-[#d5a24f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a24f]/40"
            >
              <ArrowLongRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
