import { PHO_GIA_COMPLETED_LOGOS } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function CompletedSection() {
  return (
    <section className="bg-[#fffdfa] py-[72px] md:py-[96px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="" title="NHỮNG DỰ ÁN NỘI THẤT ĐÃ HOÀN THIỆN" />
        <div className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 md:grid-cols-5">
          {PHO_GIA_COMPLETED_LOGOS.map((logo, index) => (
            <div key={logo} className="flex min-h-[48px] items-center justify-center">
              <img
                src={logo}
                alt={`Dự án ${index + 1}`}
                className="max-h-[42px] w-auto opacity-[0.82]"
                loading="eager"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 text-[#cbb78d]">
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
