import { PHO_GIA_BENEFITS, PHO_GIA_COMPANY } from "@/lib/phogia";

export default function TrustSection() {
  return (
    <section id="trust" className="ph-trust-section relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PHO_GIA_COMPANY.trustImage})` }}
      />
      <div className="absolute inset-0 bg-[#10100f]/50" />
      <div className="ph-container relative">
        <div className="mx-auto max-w-[1120px] text-center">
          <h2 className="ph-trust-heading">PHỐ GIA ĐEM ĐẾN CHO KHÁCH HÀNG</h2>
        </div>

        <div className="ph-trust-grid">
          {PHO_GIA_BENEFITS.map((benefit) => (
            <article key={benefit.title} className="ph-trust-item">
              <h3 className="ph-trust-title">{benefit.title}</h3>
              <p className="ph-trust-description">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
