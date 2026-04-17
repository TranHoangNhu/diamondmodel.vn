/* eslint-disable @next/next/no-img-element */

import AnimatedSection from "@/components/ui/AnimatedSection";
import { PHO_GIA_CONTACT } from "@/lib/phogia";

const LEFT_ITEMS = PHO_GIA_CONTACT.commitments.slice(0, 3);
const RIGHT_ITEMS = PHO_GIA_CONTACT.commitments.slice(3);

function CommitmentItem({ title }: { title: string }) {
  return (
    <article className="max-w-[420px]">
      <h3 className="font-heading text-[26px] font-semibold uppercase leading-[1.08] text-[#5a8492] md:text-[32px]">
        {title}
      </h3>
      <div className="mt-4 h-px w-full bg-[#d8cfc4]/80" />
    </article>
  );
}

export default function ContactCommitmentsSection() {
  return (
    <section className="ph-section-tight bg-white pb-24">
      <div className="ph-container">
        <AnimatedSection>
          <div className="text-center">
            <p className="ph-eyebrow">{PHO_GIA_CONTACT.commitmentsLabel}</p>
            <h2 className="ph-title mt-3">{PHO_GIA_CONTACT.commitmentsTitle}</h2>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)_minmax(0,1fr)] lg:gap-14">
          <div className="space-y-10">
            {LEFT_ITEMS.map((item) => (
              <CommitmentItem key={item} title={item} />
            ))}
          </div>

          <div className="mx-auto w-full max-w-[360px]">
            <img
              src={PHO_GIA_CONTACT.commitmentImage}
              alt="Phố Gia cam kết"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="space-y-10">
            {RIGHT_ITEMS.map((item) => (
              <CommitmentItem key={item} title={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
