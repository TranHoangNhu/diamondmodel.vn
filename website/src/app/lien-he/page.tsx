import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { COMPANY } from "@/lib/constants";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên Hệ | Diamond Model - Mô Hình Kiến Trúc Sa Bàn",
  description:
    "Liên hệ Diamond Model để được tư vấn thiết kế và thi công mô hình kiến trúc sa bàn. Hotline: 0901 62 62 82",
};

export default function ContactPage() {
  const commitments = [
    "Mô hình Độc Bản",
    "Dịch vụ Trọn Đời",
    "Thi công Tỉ Mỉ",
    "Giá Thành Tốt Nhất",
    "Quy trình Chuyên Nghiệp",
    "Vật liệu An Toàn",
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
          alt="Liên hệ Diamond Model"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-gold-300/80 text-xs tracking-luxury uppercase font-body mb-3">
            Liên hệ
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-white font-medium">
            Diamond Model
          </h1>
          <p className="text-white/50 font-accent italic text-lg mt-3">
            Khởi Tạo Giá Trị Kiến Trúc
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-28 md:py-32 bg-cream-50">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <AnimatedSection animation="fade-right">
              <div>
                {/* Company card */}
                <div className="bg-white p-8 border border-cream-200 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 border-2 border-gold-300 rotate-45 flex items-center justify-center">
                      <span className="text-gold-300 font-heading text-lg font-bold -rotate-45">D</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-dark-800">{COMPANY.name}</h3>
                      <p className="text-xs text-dark-700/50 tracking-wider uppercase">{COMPANY.fullName}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold-300/10 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-dark-700/40 uppercase tracking-wider mb-1">Hotline</p>
                        <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-primary-400 font-heading text-xl hover:text-gold-400 transition-colors">
                          {COMPANY.phone}
                        </a>
                        <span className="text-dark-700/30 mx-2">-</span>
                        <a href={`tel:${COMPANY.phone2.replace(/\s/g, "")}`} className="text-primary-400 font-heading text-xl hover:text-gold-400 transition-colors">
                          {COMPANY.phone2}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold-300/10 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-dark-700/40 uppercase tracking-wider mb-1">Email</p>
                        <a href={`mailto:${COMPANY.email}`} className="text-dark-700/70 text-sm hover:text-primary-400 transition-colors">
                          {COMPANY.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 border border-cream-200">
                    <h4 className="font-heading text-sm text-dark-800 uppercase tracking-wide mb-2">
                      Văn phòng
                    </h4>
                    <p className="text-dark-700/50 text-xs font-body leading-relaxed">
                      {COMPANY.address}
                    </p>
                    <p className="text-dark-700/50 text-xs font-body mt-1">
                      ĐT: {COMPANY.phone}
                    </p>
                  </div>
                  <div className="bg-white p-6 border border-cream-200">
                    <h4 className="font-heading text-sm text-dark-800 uppercase tracking-wide mb-2">
                      Xưởng Sản Xuất
                    </h4>
                    <p className="text-dark-700/50 text-xs font-body leading-relaxed">
                      {COMPANY.workshop}
                    </p>
                    <p className="text-dark-700/50 text-xs font-body mt-1">
                      ĐT: {COMPANY.phone2}
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs text-dark-700/40 uppercase tracking-wider">Social:</span>
                  <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-primary-400/20 flex items-center justify-center text-primary-400/60 hover:text-gold-400 hover:border-gold-400 transition-all" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-primary-400/20 flex items-center justify-center text-primary-400/60 hover:text-gold-400 hover:border-gold-400 transition-all" aria-label="YouTube">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Contact Form */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div>
                <h2 className="section-title mb-2">Form Liên Hệ</h2>
                <p className="text-dark-700/50 font-body text-sm mb-8">
                  Bạn vui lòng điền thông tin cần giải đáp / tư vấn vào form liên hệ bên dưới.
                  Đội ngũ hỗ trợ sẽ phản hồi cho bạn nhanh nhất có thể.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 6 Commitments circle */}
      <section className="py-28 md:py-32 bg-white">
        <div className="container-custom section-padding text-center">
          <AnimatedSection>
            <span className="font-heading text-5xl text-gold-400">6</span>
            <span className="text-xs text-dark-700/50 tracking-wider uppercase font-body ml-1">Điều</span>
            <h2 className="section-title mt-2 mb-12">Diamond Model <span className="text-primary-400">Cam Kết</span></h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {commitments.map((item, i) => (
              <AnimatedSection key={item} animation="scale-in" delay={i * 100}>
                <div className="flex items-center gap-3 p-4 border border-cream-200 hover:border-gold-300/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary-400/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-heading text-sm text-dark-800">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
