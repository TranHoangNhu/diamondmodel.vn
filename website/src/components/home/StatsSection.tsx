/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_VALUES } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function StatsSection() {
  return (
    <section className="ph-section bg-[#f7f3ec]">
      <div className="ph-container">
        <SectionHeading eyebrow="Phố Gia đã thực hiện" title="GIÁ TRỊ CHÚNG TÔI ĐÃ TRAO ĐI" />
        <div className="relative mx-auto mt-14 max-w-[920px] min-h-[390px] md:min-h-[500px]">
          <div className="absolute left-1/2 top-1/2 grid h-[248px] w-[248px] -translate-x-1/2 -translate-y-1/2 grid-cols-2 overflow-hidden rounded-full bg-[#efe5d5] md:h-[360px] md:w-[360px]">
            {PHO_GIA_VALUES.map((value) => (
              <img
                key={value.label}
                src={value.image}
                alt=""
                className="h-full w-full object-cover opacity-[0.9] contrast-110 saturate-[1.08]"
                loading="eager"
              />
            ))}
          </div>

          <div className="absolute left-0 top-[38%] flex h-[132px] w-[132px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center shadow-[0_14px_34px_rgba(46,40,31,0.08)] md:left-[4%] md:h-[174px] md:w-[174px]">
            <Metric value={PHO_GIA_VALUES[1].value} label={PHO_GIA_VALUES[1].label} />
          </div>

          <div className="absolute left-1/2 top-0 flex h-[144px] w-[144px] -translate-x-1/2 items-center justify-center rounded-full bg-[#edbc73] text-center shadow-[0_14px_34px_rgba(46,40,31,0.1)] md:h-[196px] md:w-[196px]">
            <Metric value={PHO_GIA_VALUES[0].value} label={PHO_GIA_VALUES[0].label} light />
          </div>

          <div className="absolute right-0 top-[42%] flex h-[132px] w-[132px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center shadow-[0_14px_34px_rgba(46,40,31,0.08)] md:right-[4%] md:h-[174px] md:w-[174px]">
            <Metric value={PHO_GIA_VALUES[2].value} label={PHO_GIA_VALUES[2].label} />
          </div>

          <div className="absolute bottom-0 left-[34%] flex h-[112px] w-[112px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center shadow-[0_14px_34px_rgba(46,40,31,0.08)] md:h-[150px] md:w-[150px]">
            <Metric value={PHO_GIA_VALUES[3].value} label="Công trình tiêu biểu" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div>
      <div className="text-[40px] font-semibold leading-none text-[#6b95a2] md:text-[58px]">{value}</div>
      <div className={`mt-2 text-[12px] uppercase leading-tight ${light ? "text-white/90" : "text-[#6b95a2]"}`}>
        {label}
      </div>
    </div>
  );
}
