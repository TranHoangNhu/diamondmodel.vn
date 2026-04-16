import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Giới Thiệu | Diamond Model - Mô Hình Kiến Trúc Sa Bàn",
  description:
    "Công ty TNHH Mô Hình Kim Cương - 18 năm kinh nghiệm trong lĩnh vực thiết kế và thi công mô hình kiến trúc sa bàn cao cấp.",
};

export default function AboutPage() {
  const commitments = [
    { icon: "💎", title: "Mô hình Độc Bản", desc: "Mỗi dự án là một tác phẩm nghệ thuật duy nhất" },
    { icon: "🔍", title: "Thi Công Tỉ Mỉ", desc: "Chi tiết từng mm, chính xác từng tỷ lệ" },
    { icon: "⚡", title: "Quy Trình Chuyên Nghiệp", desc: "Quy trình ISO chuẩn quốc tế" },
    { icon: "🛡️", title: "Bảo Hành Lâu Dài", desc: "Cam kết bảo hành và bảo trì trọn đời" },
    { icon: "💰", title: "Giá Thành Tốt Nhất", desc: "Chi phí hợp lý, chất lượng vượt kỳ vọng" },
    { icon: "🌿", title: "Vật Liệu An Toàn", desc: "100% vật liệu cao cấp, thân thiện môi trường" },
  ];

  const timeline = [
    { year: "2007", event: "Thành lập công ty Diamond Model tại TP.HCM" },
    { year: "2012", event: "Mở rộng xưởng sản xuất tại Quận 12" },
    { year: "2016", event: "Đạt 200+ dự án hoàn thành" },
    { year: "2020", event: "Ứng dụng công nghệ CNC & 3D Printing" },
    { year: "2025", event: "18 năm kinh nghiệm, 400+ khách hàng tin tưởng" },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt="Giới thiệu Diamond Model"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-gold-300/80 text-xs tracking-luxury uppercase font-body mb-3">
            Giới thiệu
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white font-medium">
            Diamond Model
          </h1>
          <p className="text-white/50 font-accent italic text-xl mt-3">
            Khởi Tạo Giá Trị Kiến Trúc
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-28 md:py-32 bg-cream-50">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80"
                  alt="Xưởng sản xuất Diamond Model"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-400 px-8 py-6 text-white">
                  <span className="font-heading text-4xl font-light block">18+</span>
                  <span className="text-xs tracking-wider uppercase font-body text-white/70">
                    Năm Kinh Nghiệm
                  </span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <p className="section-label mb-3">Về chúng tôi</p>
              <div className="gold-line mb-6" />
              <h2 className="section-title mb-6">
                Công Ty TNHH
                <br />
                <span className="text-primary-400">Mô Hình Kim Cương</span>
              </h2>
              <div className="space-y-4 text-dark-700/70 font-body text-sm leading-relaxed">
                <p>
                  Ngày nay, mô hình kiến trúc là sản phẩm không thể thiếu trong các sự kiện 
                  trưng bày, triển lãm về kiến trúc nhà ở. Thực vậy, mô hình kiến trúc là 
                  cầu nối giữa khâu thiết kế và hiện thực ý tưởng nhằm giúp cho những nhà 
                  thiết kế cũng như khách hàng có cái nhìn tổng quan, bao quát và chính xác 
                  hơn trên mọi góc độ của dự án.
                </p>
                <p>
                  Diamond Model ra đời với sứ mệnh mang đến những mô hình kiến trúc sa bàn 
                  chất lượng cao nhất, tinh xảo nhất. Với đội ngũ nghệ nhân giàu kinh nghiệm 
                  và xưởng sản xuất hiện đại, chúng tôi tự hào phục vụ hơn 400 khách hàng 
                  trên khắp Việt Nam.
                </p>
                <p>
                  <strong className="text-primary-400">Tiêu chí:</strong> Uy tín - Chất lượng - 
                  Bảo hành lâu dài là mục tiêu hàng đầu của Diamond Model.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                <div>
                  <span className="font-heading text-3xl text-gold-400">400+</span>
                  <p className="text-xs text-dark-700/50 tracking-wider uppercase mt-1">Khách hàng</p>
                </div>
                <div>
                  <span className="font-heading text-3xl text-gold-400">350+</span>
                  <p className="text-xs text-dark-700/50 tracking-wider uppercase mt-1">Dự án</p>
                </div>
                <div>
                  <span className="font-heading text-3xl text-gold-400">18+</span>
                  <p className="text-xs text-dark-700/50 tracking-wider uppercase mt-1">Năm</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 md:py-32 bg-white">
        <div className="container-custom section-padding">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label mb-3">Hành trình phát triển</p>
            <div className="gold-line-center mb-6" />
            <h2 className="section-title">Dấu Mốc <span className="text-primary-400">Quan Trọng</span></h2>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold-300/30 -translate-x-1/2 hidden md:block" />
            
            {timeline.map((item, i) => (
              <AnimatedSection
                key={item.year}
                animation={i % 2 === 0 ? "fade-right" : "fade-left"}
                delay={i * 150}
                className={`flex items-center mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <span className="font-heading text-3xl text-gold-400">{item.year}</span>
                  <p className="text-dark-700/70 text-sm font-body mt-1">{item.event}</p>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-gold-300 border-4 border-cream-50 z-10 shrink-0" />
                <div className="flex-1 hidden md:block" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Commitments */}
      <section className="py-28 md:py-32 bg-cream-100">
        <div className="container-custom section-padding">
          <AnimatedSection className="text-center mb-16">
            <span className="font-heading text-5xl text-gold-400">6</span>
            <span className="text-xs text-dark-700/50 tracking-wider uppercase font-body ml-2">
              Điều
            </span>
            <h2 className="section-title mt-2">Diamond Model <span className="text-primary-400">Cam Kết</span></h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commitments.map((item, i) => (
              <AnimatedSection key={item.title} animation="scale-in" delay={i * 100}>
                <div className="bg-white p-8 text-center border border-cream-200 hover:border-gold-300/50 transition-all card-lift">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-heading text-lg text-dark-800 mb-2">{item.title}</h3>
                  <p className="text-dark-700/50 text-sm font-body">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-20 md:py-24 bg-primary-400">
        <div className="container-custom section-padding text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl text-white font-medium mb-4">
              Liên hệ ngay để được tư vấn
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="text-gold-300 font-heading text-3xl hover:text-gold-200 transition-colors"
              >
                {COMPANY.phone}
              </a>
              <span className="text-white/30 hidden sm:block">|</span>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-white/70 font-body hover:text-gold-300 transition-colors"
              >
                {COMPANY.email}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
