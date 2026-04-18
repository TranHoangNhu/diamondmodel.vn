/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function MissionSection() {
  return (
    <section id="mission" className="ph-section scroll-mt-24">
      <div className="ph-container">
        <div className="ph-section-header">
          <img src={PHO_GIA_COMPANY.yearsBadge} alt="9 năm" className="mx-auto w-[112px] md:w-[142px]" />
          <p className="ph-script mt-6">Với Sứ Mệnh</p>
          <h2 className="mt-3 font-heading text-[31px] font-semibold uppercase leading-[1.05] text-[#45413d] md:text-[44px] lg:text-[48px]">
            “KHỞI TẠO GIÁ TRỊ SỐNG LÝ TƯỞNG”
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1040px] gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-14">
          <div className="overflow-hidden rounded-[8px] bg-[#f0ebe2]">
            <img
              src={PHO_GIA_COMPANY.missionImage}
              alt="Không gian nội thất Phố Gia"
              className="aspect-[4/5] w-full object-cover md:aspect-[5/4] lg:aspect-[4/5]"
              loading="lazy"
            />
          </div>
          <div className="max-w-[520px] text-[15px] leading-8 text-[#5d5751]">
            <p className="mb-5 text-[13px] font-semibold uppercase text-[#7f7a74]">Với Phố Gia</p>
            <p className="mb-5">
              Để biến tấu một không gian hiện hữu trở nên hài hòa, thẩm mỹ, thoả GU của Gia Chủ thì yếu tố quan trọng
              nhất là giai đoạn Thiết Kế. Việc Kiến Trúc Sư khai phá được nội tâm, phong cách và sở thích thực sự của
              Gia Chủ sẽ là tiền đề để tạo nên một không gian nội thất với xúc cảm trọn vẹn.
            </p>
            <p className="mb-5">
              Thiết Kế & Thi Công trong lĩnh vực nội thất là cả một quá trình cần sự sáng tạo, cảm hứng, đam mê và tận
              tâm thật sự. Khi không còn tồn tại sự vội vàng, áp đặt, sự gói ghém tận tiện thì nguồn cảm hứng cho kiến
              trúc sư sẽ thăng hoa.
            </p>
            <p>
              Hãy cộng hưởng cùng Chúng Tôi để bạn thấy được giá trị trọn vẹn của một không gian sống ĐỘC BẢN đúng
              nghĩa, tạo nên sự gắn kết Chúng Tôi và Bạn vững bền.
            </p>
            <a href="#footer" className="ph-about-button mt-9 inline-flex">
              <img src="/phogia/brand/logo_symbol_gold.svg" alt="" className="h-7 w-7" aria-hidden="true" />
              <span>Về Phố Gia</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
