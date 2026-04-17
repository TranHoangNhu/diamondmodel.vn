/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_COMPLETED_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function CompletedSection() {
  return (
    <section className="ph-section ph-section-band">
      <div className="ph-container">
        <SectionHeading eyebrow="" title="NHỮNG DỰ ÁN NỘI THẤT ĐÃ HOÀN THIỆN" />
        <div className="mt-12 grid grid-cols-2 items-center gap-5 md:grid-cols-4 lg:grid-cols-5">
          {PHO_GIA_COMPLETED_LOGOS.map((logo, index) => (
            <div
              key={logo}
              className="flex min-h-[84px] items-center justify-center rounded-[8px] border border-[#e7ded1] bg-white px-5"
            >
              <img src={logo} alt={`Dự án ${index + 1}`} className="max-h-[42px] w-auto opacity-[0.82]" loading="eager" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 text-[#cbb78d]">
          <span>←</span>
          <span className="h-2 w-2 rounded-full bg-[#edbc73]" />
          <span className="h-2 w-2 rounded-full bg-[#e6ded0]" />
          <span className="h-2 w-2 rounded-full bg-[#e6ded0]" />
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
