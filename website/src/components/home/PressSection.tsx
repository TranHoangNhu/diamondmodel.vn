/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_PRESS_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function PressSection() {
  return (
    <section id="press" className="ph-section-tight scroll-mt-24 bg-[#f7f3ec]">
      <div className="ph-container">
        <SectionHeading eyebrow="" title="BÁO CHÍ NÓI VỀ CHÚNG TÔI" />
        <div className="mt-12 grid grid-cols-2 items-center gap-5 md:grid-cols-3 lg:grid-cols-6">
          {PHO_GIA_PRESS_LOGOS.map((logo, index) => (
            <div
              key={logo}
              className="flex min-h-[82px] items-center justify-center rounded-[8px] border border-[#e7ded1] bg-white px-5"
            >
              <img src={logo} alt={`Báo chí ${index + 1}`} className="max-h-[42px] w-auto" loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
