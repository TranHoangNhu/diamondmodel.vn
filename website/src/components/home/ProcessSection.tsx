/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function ProcessSection() {
  return (
    <section id="process" className="ph-process-section scroll-mt-24">
      <div className="ph-container">
        <div className="ph-process-header">
          <p className="ph-eyebrow">Quy trình thiết kế & thi công nội thất</p>
          <h2 className="ph-process-title mt-3">QUY TRÌNH CHUYÊN NGHIỆP & RÕ RÀNG</h2>
        </div>
      </div>

      <div className="ph-process-flow">
        <img
          src={PHO_GIA_COMPANY.processDesktop}
          alt="Quy trình thiết kế và thi công nội thất"
          className="ph-process-flow-desktop hidden lg:block"
        />
        <div className="ph-container lg:hidden">
          <img
            src={PHO_GIA_COMPANY.processMobile}
            alt="Quy trình thiết kế và thi công nội thất"
            className="ph-process-flow-mobile mx-auto block w-full max-w-[440px]"
          />
        </div>
      </div>

      <div className="ph-container">
        <div id="consultation" className="ph-process-button">
          <div className="ph-process-button-inner">
            <div className="ph-process-button-thumb">
              <img
                src={PHO_GIA_COMPANY.processThumb}
                alt="Đặt lịch kiến trúc sư tư vấn"
                className="ph-process-consultation-thumb"
                loading="lazy"
              />
              <a href="#footer" className="ph-button ph-process-button-cta inline-flex">
              Đặt lịch KTS tư vấn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
