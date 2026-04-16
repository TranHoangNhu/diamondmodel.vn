import { PHO_GIA_PRESS_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function PressSection() {
  return (
    <section id="press" className="scroll-mt-24 bg-[#fffdfa] py-[72px] md:py-[96px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="" title="BÁO CHÍ NÓI VỀ CHÚNG TÔI" />
        <div className="mt-12 grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {PHO_GIA_PRESS_LOGOS.map((logo, index) => (
            <div key={logo} className="flex min-h-[46px] items-center justify-center">
              <img src={logo} alt={`Báo chí ${index + 1}`} className="max-h-[40px] w-auto" loading="eager" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
