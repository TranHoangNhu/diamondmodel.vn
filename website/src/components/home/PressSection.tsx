/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_PRESS_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function PressSection() {
  return (
    <section id="press" className="ph-section-tight scroll-mt-24">
      <div className="ph-container">
        <SectionHeading eyebrow="" title="BÁO CHÍ NÓI VỀ CHÚNG TÔI" />
        <div className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {PHO_GIA_PRESS_LOGOS.map((logo, index) => (
            <div key={logo} className="flex min-h-[72px] items-center justify-center px-3">
              <img src={logo} alt={`Báo chí ${index + 1}`} className="max-h-[44px] w-auto opacity-[0.95]" loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
