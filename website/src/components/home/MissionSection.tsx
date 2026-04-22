import Image from "next/image";
import Link from "next/link";
import { PHO_GIA_COMPANY } from "@/lib/phogia";

export default function MissionSection() {
  return (
    <section id="mission" className="ph-section-surface scroll-mt-24">
      <div className="ph-container-wide">
        <div className="ph-section-header">
            <Image
              src={PHO_GIA_COMPANY.yearsBadge}
              alt="9 năm"
              width={142}
              height={52}
              className="mx-auto h-auto w-[112px] md:w-[142px]"
              style={{ height: "auto" }}
              quality={90}
            />
          <p className="ph-script mt-6">Với Sứ Mệnh</p>
          <h2 className="font-display mt-3 text-[44px] font-semibold uppercase leading-[1.05] text-[#45413d]">
            “KIẾN TẠO GIÁ TRỊ SA BÀN”
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1360px] gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-14">
          <div className="overflow-hidden rounded-[8px] bg-[#f0ebe2]">
            <div className="relative aspect-[4/5] w-full md:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={PHO_GIA_COMPANY.missionImage}
                alt="Mô hình sa bàn Diamond Model"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
          <div className="max-w-[520px] text-[15px] leading-8 text-[#5d5751]">
            <p className="mb-5 text-[13px] font-semibold uppercase text-[#7f7a74]">Với Diamond Model</p>
            <p className="mb-5">
              Diamond Model tập trung vào sa bàn dự án, mô hình kiến trúc và phối cảnh trưng bày cho các công trình
              nhà ở, chung cư, khu đô thị và quy hoạch.
            </p>
            <p className="mb-5">
              Mỗi mô hình được triển khai theo hướng rõ tỷ lệ, sạch bề mặt và dễ đọc bố cục, để chủ đầu tư và khách
              hàng có thể hình dung nhanh tinh thần công trình trước khi bước vào giai đoạn thi công thực tế.
            </p>
            <p>
              Mục tiêu là tạo ra một sản phẩm trưng bày chỉn chu, chính xác và đủ nổi bật để phục vụ trình bày, bán
              hàng và phê duyệt phương án.
            </p>
            <Link href="/gioi-thieu" className="ph-about-button mt-9 inline-flex">
              <Image
                src="/diamondmodel/brand/icon-diamondmodel-drop.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
                aria-hidden="true"
              />
              <span>Về Diamond Model</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

