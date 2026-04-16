import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dự Án Tiêu Biểu | Diamond Model",
  description:
    "Các dự án mô hình kiến trúc sa bàn tiêu biểu đã được Diamond Model thực hiện.",
};

const categories = [
  { label: "Tất cả", slug: "all" },
  { label: "Quy Hoạch", slug: "quy-hoach" },
  { label: "Chung cư Cao cấp", slug: "chung-cu" },
  { label: "Biệt thự Nhà phố", slug: "biet-thu" },
  { label: "Nhà máy", slug: "nha-may" },
  { label: "Nội thất", slug: "noi-that" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80"
          alt="Dự án Diamond Model"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-gold-300/80 text-xs tracking-luxury uppercase font-body mb-3">
            Công trình thực hiện
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-white font-medium">
            Dự Án Tiêu Biểu
          </h1>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-28 md:py-32 bg-cream-50">
        <div className="container-custom section-padding">
          {/* Category filter */}
          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`px-6 py-[8px] rounded-full text-xs font-body tracking-wider uppercase transition-all duration-300 ${
                  cat.slug === "all"
                    ? "bg-primary-400 text-white border border-primary-400"
                    : "border border-primary-400/20 text-primary-400 hover:bg-primary-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </AnimatedSection>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={project.id} animation="fade-up" delay={i * 100}>
                <Link
                  href={`/du-an/${project.slug}`}
                  className="group block card-lift"
                >
                  <div className="img-zoom relative aspect-[4/3] bg-cream-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary-400/0 group-hover:bg-primary-400/50 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-xs tracking-wider uppercase">Xem chi tiết</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-gold-300/90 px-3 py-1 text-dark-900 text-[10px] font-body font-medium tracking-wider">
                      TL: {project.scale}
                    </div>
                  </div>
                  <div className="pt-5 pb-3">
                    <h3 className="font-heading text-xl text-dark-800 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-700/50 text-xs font-body mt-2 tracking-wider uppercase">
                      Tỷ lệ: {project.scale}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
