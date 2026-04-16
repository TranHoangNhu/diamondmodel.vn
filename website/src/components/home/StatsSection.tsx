import { PHO_GIA_COMPANY, PHO_GIA_VALUES } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function StatsSection() {
  return (
    <section className="bg-[#fffdfa] py-[72px] md:py-[96px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Chúng tôi đã thực hiện" title="GIÁ TRỊ CHÚNG TÔI ĐÃ TRAO ĐI" />
        <div className="relative mx-auto mt-14 max-w-[920px] min-h-[360px] md:min-h-[470px]">
          <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#efe5d5] md:h-[340px] md:w-[340px]">
            <img
              src={PHO_GIA_COMPANY.statsBackground}
              alt="Giá trị công ty"
              className="h-full w-full object-cover opacity-[0.92] contrast-110 saturate-[1.08]"
              loading="eager"
            />
          </div>

          <div className="absolute left-[5%] top-[36%] flex h-[128px] w-[128px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center md:left-[6%] md:h-[170px] md:w-[170px]">
            <div>
              <div className="text-[42px] font-semibold leading-none text-[#6b95a2] md:text-[58px]">
                {PHO_GIA_VALUES[1].value}
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[#6b95a2]">
                {PHO_GIA_VALUES[1].label}
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-0 flex h-[138px] w-[138px] -translate-x-1/2 items-center justify-center rounded-full bg-[#edbc73] text-center md:h-[190px] md:w-[190px]">
            <div>
              <div className="text-[46px] font-semibold leading-none text-[#6b95a2] md:text-[62px]">
                {PHO_GIA_VALUES[0].value}
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.12em] text-white/90">
                {PHO_GIA_VALUES[0].label}
              </div>
            </div>
          </div>

          <div className="absolute right-[6%] top-[44%] flex h-[128px] w-[128px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center md:h-[170px] md:w-[170px]">
            <div>
              <div className="text-[42px] font-semibold leading-none text-[#6b95a2] md:text-[58px]">
                {PHO_GIA_VALUES[2].value}
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[#6b95a2]">
                {PHO_GIA_VALUES[2].label}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[4%] left-[34%] flex h-[106px] w-[106px] items-center justify-center rounded-full border border-[#d7d2ca] bg-white text-center md:h-[146px] md:w-[146px]">
            <div>
              <div className="text-[38px] font-semibold leading-none text-[#6b95a2] md:text-[52px]">
                {PHO_GIA_VALUES[3].value}
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[#6b95a2]">
                {PHO_GIA_VALUES[3].label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
