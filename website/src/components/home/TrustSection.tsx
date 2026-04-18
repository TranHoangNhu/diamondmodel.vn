/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_BENEFITS, PHO_GIA_COMPANY } from "@/lib/phogia";

type Benefit = (typeof PHO_GIA_BENEFITS)[number];

const LEFT_COLUMN: Benefit[] = [PHO_GIA_BENEFITS[0], PHO_GIA_BENEFITS[2]];
const RIGHT_COLUMN: Benefit[] = [PHO_GIA_BENEFITS[1], PHO_GIA_BENEFITS[3]];

function TrustArrow({ reverse = false }: { reverse?: boolean }) {
  return (
    <img
      src="/phogia/icons/arrow_right_trust.svg"
      alt=""
      aria-hidden="true"
      className={["h-[58px] w-[44px] shrink-0 opacity-90", reverse ? "rotate-180" : ""].join(" ")}
      loading="lazy"
    />
  );
}

function TrustItem({ benefit, reverse = false }: { benefit: Benefit; reverse?: boolean }) {
  return (
    <article className="w-full max-w-[520px]">
      <h3 className="font-heading text-[24px] font-semibold uppercase leading-[1.08] text-white md:text-[27px] lg:text-[32px]">
        {benefit.title}
      </h3>

      <div className="mt-4 flex items-center gap-4">
        {reverse ? <TrustArrow reverse /> : null}
        <span className="h-px flex-1 bg-white/30" />
        {!reverse ? <TrustArrow /> : null}
      </div>

      <p className="mt-5 max-w-[520px] text-[15px] leading-[1.75] text-white/90">{benefit.description}</p>
    </article>
  );
}

export default function TrustSection() {
  return (
    <section id="trust" className="ph-trust-section relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PHO_GIA_COMPANY.trustImage})` }}
      />
      <div className="absolute inset-0 bg-[#10100f]/50" />

      <div className="ph-container relative">
        <div className="mx-auto max-w-[1140px] pt-8 text-center lg:pt-4">
          <h2 className="font-heading text-[30px] font-semibold uppercase leading-[1.08] md:text-[38px] lg:text-[44px]">
            PHỐ GIA ĐEM ĐẾN CHO KHÁCH HÀNG
          </h2>
        </div>

        <div className="mt-12 grid gap-y-12 lg:mt-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
          <div className="space-y-12 lg:space-y-14">
            {LEFT_COLUMN.map((benefit) => (
              <TrustItem key={benefit.title} benefit={benefit} />
            ))}
          </div>

          <div className="space-y-12 lg:space-y-14">
            {RIGHT_COLUMN.map((benefit) => (
              <TrustItem key={benefit.title} benefit={benefit} reverse />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
