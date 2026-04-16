import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function MissionSection() {
  return (
    <section id="mission" className="scroll-mt-24 bg-[#fffdfa] py-[72px] md:py-[96px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img
            src={PHO_GIA_COMPANY.yearsBadge}
            alt="9 năm"
            className="mx-auto w-[120px] md:w-[150px]"
          />
          <p className="ph-script mt-5">Với Sứ Mệnh</p>
          <h2 className="mt-1 font-heading text-[32px] font-semibold uppercase leading-none text-[#45413d] md:text-[54px]">
            “KHỞI TẠO GIÁ TRỊ SỐNG LÝ TƯỞNG”
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-[920px] gap-8 lg:grid-cols-[1fr_0.96fr] lg:items-start">
          <img
            src={PHO_GIA_COMPANY.missionImage}
            alt="Không gian nội thất"
            className="w-full rounded-[6px] object-cover"
            loading="lazy"
          />
          <div className="text-[14px] leading-7 text-[#645e58]">
            <p className="mb-4 text-[13px] uppercase tracking-[0.18em] text-[#7f7a74]">Với Phố Gia</p>
            <p className="mb-4">
              Để biến tấu một không gian hiện hữu trở nên hài hoà, thẩm mỹ, thoả GU của
              Gia Chủ thì yếu tố quan trọng nhất là giai đoạn Thiết Kế. Việc Kiến Trúc Sư
              khai phá được nội tâm, phong cách và sở thích thực sự của Gia Chủ sẽ là tiền
              đề để tạo nên một không gian nội thất với xúc cảm trọn vẹn.
            </p>
            <p className="mb-4">
              Thiết Kế & Thi Công trong lĩnh vực nội thất là cả một quá trình mà ở đó cần sự
              sáng tạo, cảm hứng, đam mê và tận tâm thật sự. Khi không còn tồn tại sự vội
              vàng, áp đặt, sự gói ghém tằn tiện thì nguồn cảm hứng cho kiến trúc sư sẽ
              thăng hoa.
            </p>
            <p>
              Hãy cộng hưởng cùng Chúng Tôi để bạn thấy được giá trị trọn vẹn của một không
              gian sống ĐỘC BẢN đúng nghĩa, tạo nên sự gắn kết Chúng Tôi và Bạn vững bền.
            </p>
            <a href="#footer" className="ph-button mt-8 inline-flex">
              Về Chúng Tôi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
