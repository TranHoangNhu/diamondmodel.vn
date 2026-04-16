import { PHO_GIA_COMPANY } from "@/lib/phogia";
import { SectionHeading } from "./SharedComponents";

export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 bg-[#fffdfa] py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quy trình chuyên nghiệp"
          title="QUY TRÌNH CHUYÊN NGHIỆP & RÕ RÀNG"
        />
        <div className="mt-10">
          <img
            src={PHO_GIA_COMPANY.processDesktop}
            alt="Quy trình thiết kế và thi công nội thất"
            className="hidden w-full lg:block"
          />
          <img
            src={PHO_GIA_COMPANY.processMobile}
            alt="Quy trình thiết kế và thi công nội thất"
            className="mx-auto block max-w-[420px] lg:hidden"
          />
        </div>
        <div
          id="consultation"
          className="mx-auto mt-12 grid max-w-[760px] items-center gap-8 md:grid-cols-[240px_1fr]"
        >
          <img
            src={PHO_GIA_COMPANY.processThumb}
            alt="Đặt lịch tư vấn"
            className="w-full rounded-[6px]"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <a href="#footer" className="ph-button inline-flex">
              Đặt lịch tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
