import { PHO_GIA_COMPANY, PHO_GIA_BENEFITS } from "@/lib/phogia";

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden py-16 text-white md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PHO_GIA_COMPANY.trustImage})` }}
      />
      <div className="absolute inset-0 bg-[#000]/40" />
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-[34px] font-semibold uppercase leading-none md:text-[52px]">
          PHỐ GIA ĐEM ĐẾN CHO KHÁCH HÀNG
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {PHO_GIA_BENEFITS.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`relative rounded-[6px] border border-white/15 bg-black/[0.12] px-6 py-7 backdrop-blur-[1px] ${
                index % 2 === 1 ? "md:translate-y-6" : ""
              }`}
            >
              <h3 className="text-[26px] font-semibold uppercase leading-none md:text-[34px]">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-[420px] text-[14px] leading-7 text-white/80">
                {benefit.description}
              </p>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-5xl text-white/90">›</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
