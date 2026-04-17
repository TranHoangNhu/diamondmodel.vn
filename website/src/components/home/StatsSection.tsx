"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { PHO_GIA_VALUES } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

type ValueItem = (typeof PHO_GIA_VALUES)[number];

const VALUE_LAYOUT: Array<
  ValueItem & {
    className: string;
    sizeClass: string;
  }
> = [
  {
    ...PHO_GIA_VALUES[1],
    className:
      "left-0 top-[28%] sm:left-[3%] sm:top-[27%] lg:left-[4%] lg:top-[27%]",
    sizeClass: "h-[140px] w-[140px] sm:h-[176px] sm:w-[176px] lg:h-[192px] lg:w-[192px]",
  },
  {
    ...PHO_GIA_VALUES[0],
    className: "left-1/2 top-0 -translate-x-1/2",
    sizeClass: "h-[164px] w-[164px] sm:h-[198px] sm:w-[198px] lg:h-[200px] lg:w-[200px]",
  },
  {
    ...PHO_GIA_VALUES[2],
    className:
      "right-0 top-[34%] sm:right-[3%] sm:top-[34%] lg:right-[4%] lg:top-[34%]",
    sizeClass: "h-[140px] w-[140px] sm:h-[176px] sm:w-[176px] lg:h-[192px] lg:w-[192px]",
  },
  {
    ...PHO_GIA_VALUES[3],
    label: "CÔNG TRÌNH\nTIÊU BIỂU",
    className:
      "bottom-[1%] left-[25%] sm:left-[29%] lg:left-[30%]",
    sizeClass: "h-[128px] w-[128px] sm:h-[160px] sm:w-[160px] lg:h-[168px] lg:w-[168px]",
  },
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-[42px] font-semibold leading-none text-[#6b95a2] sm:text-[50px] lg:text-[58px]">{value}</div>
      <div className="whitespace-pre-line text-[12px] uppercase leading-tight text-[#6b95a2] sm:text-[13px]">
        {label}
      </div>
    </div>
  );
}

function ValueBubble({
  item,
  active,
  onActivate,
}: {
  item: (typeof VALUE_LAYOUT)[number];
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${item.value} ${item.label}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={[
        "absolute z-20 inline-flex items-center justify-center rounded-full border text-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#6b95a2]/25",
        item.className,
        item.sizeClass,
        active
          ? "border-transparent bg-[#f0bc73] shadow-[0_18px_34px_rgba(139,104,53,0.18)]"
          : "border-[#d9d3c8] bg-white shadow-[0_16px_30px_rgba(52,44,34,0.08)] hover:border-[#cfc7bb]",
      ].join(" ")}
    >
      <Metric value={item.value} label={item.label} />
    </button>
  );
}

export default function StatsSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="stats" className="ph-section bg-[#fffdfa]">
      <div className="ph-container">
        <SectionHeading eyebrow="Phố Gia đã thực hiện" title="GIÁ TRỊ CHÚNG TÔI ĐÃ TRAO ĐI" />

        <div
          className="relative mx-auto mt-6 min-h-[430px] max-w-[1240px] overflow-visible sm:min-h-[500px] lg:mt-8 lg:min-h-[580px]"
          onMouseLeave={() => setActiveImage(null)}
        >
          <div className="absolute left-1/2 top-1/2 h-[264px] w-[264px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#f1ebe2] sm:h-[378px] sm:w-[378px] lg:h-[480px] lg:w-[480px]">
            {activeImage ? (
              <img
                key={activeImage}
                src={activeImage}
                alt=""
                className="h-full w-full object-cover animate-fade-in"
                loading="eager"
              />
            ) : null}
          </div>

          <div className="absolute inset-0">
            {VALUE_LAYOUT.map((item) => (
              <ValueBubble
                key={item.label}
                item={item}
                active={activeImage === item.image}
                onActivate={() => setActiveImage(item.image)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
