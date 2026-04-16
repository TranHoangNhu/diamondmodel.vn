import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PROJECTS, COMPANY } from "@/lib/constants";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | Diamond Model`,
    description: `Dự án mô hình kiến trúc ${project.title} - Tỷ lệ ${project.scale}. Thiết kế và thi công bởi Diamond Model.`,
  };
}

// Extra images for project details
const detailImages = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
];

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter(
    (p) => p.category === project.category && p.id !== project.id
  ).slice(0, 3);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 pb-16 section-padding container-custom w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-xs font-body mb-4">
            <Link href="/" className="hover:text-gold-300 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/du-an" className="hover:text-gold-300 transition-colors">
              Dự án
            </Link>
            <span>/</span>
            <span className="text-gold-300">{project.title}</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-5xl text-white font-medium mb-2">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="bg-gold-300/20 text-gold-300 px-3 py-1 text-xs font-body tracking-wider">
              Tỷ lệ: {project.scale}
            </span>
            <span className="bg-primary-400/20 text-primary-200 px-3 py-1 text-xs font-body tracking-wider uppercase">
              {project.category}
            </span>
          </div>
        </div>
      </section>

      {/* Project Detail Content */}
      <section className="py-28 md:py-32 bg-cream-50">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl text-dark-800 mb-6">
                  Thông Tin Dự Án
                </h2>
                <div className="space-y-4 text-dark-700/70 font-body text-sm leading-relaxed mb-10">
                  <p>
                    Dự án <strong className="text-primary-400">{project.title}</strong> được 
                    Diamond Model thiết kế và thi công với tỷ lệ {project.scale}. Đây là một 
                    trong những dự án tiêu biểu thể hiện năng lực và sự tỉ mỉ trong từng chi 
                    tiết của đội ngũ nghệ nhân Diamond Model.
                  </p>
                  <p>
                    Mô hình được thực hiện với vật liệu cao cấp, kết hợp công nghệ CNC hiện 
                    đại và kỹ thuật thủ công truyền thống. Mỗi chi tiết đều được chế tác cẩn 
                    thận, đảm bảo độ chính xác tối đa theo bản vẽ thiết kế.
                  </p>
                  <p>
                    Thời gian thực hiện: 30-45 ngày làm việc. Bao gồm dịch vụ vận chuyển và 
                    lắp đặt tại công trường trưng bày.
                  </p>
                </div>
              </AnimatedSection>

              {/* Gallery */}
              <AnimatedSection delay={200}>
                <h3 className="font-heading text-xl text-dark-800 mb-6">
                  Hình Ảnh Dự Án
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {detailImages.map((img, i) => (
                    <div key={i} className="img-zoom aspect-[4/3] relative bg-cream-100">
                      <Image
                        src={img}
                        alt={`${project.title} - Hình ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div>
              <AnimatedSection animation="fade-left" delay={300}>
                {/* Project specs */}
                <div className="bg-white p-8 border border-cream-200 mb-6">
                  <h3 className="font-heading text-lg text-dark-800 mb-6">
                    Thông Số Kỹ Thuật
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Tên dự án", value: project.title },
                      { label: "Tỷ lệ", value: project.scale },
                      { label: "Chất liệu", value: "Acrylic, ABS, Gỗ" },
                      { label: "Thời gian", value: "30-45 ngày" },
                      { label: "Bảo hành", value: "12 tháng" },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-center border-b border-cream-200 pb-3"
                      >
                        <span className="text-dark-700/50 text-xs font-body tracking-wider uppercase">
                          {spec.label}
                        </span>
                        <span className="text-dark-800 text-sm font-body font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary-400 p-8 text-center">
                  <p className="text-white/80 font-body text-sm mb-2">
                    Bạn quan tâm dự án này?
                  </p>
                  <h4 className="text-gold-300 font-heading text-xl mb-4">
                    Liên hệ tư vấn ngay
                  </h4>
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="btn-outline border-white text-white hover:bg-white hover:text-primary-400 w-full"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 md:py-28 bg-white">
          <div className="container-custom section-padding">
            <AnimatedSection className="text-center mb-10">
              <h2 className="section-title">
                Dự Án <span className="text-primary-400">Liên Quan</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((proj, i) => (
                <AnimatedSection key={proj.id} animation="fade-up" delay={i * 100}>
                  <Link href={`/du-an/${proj.slug}`} className="group block card-lift">
                    <div className="img-zoom relative aspect-[4/3] bg-cream-100">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="pt-4">
                      <h3 className="font-heading text-lg text-dark-800 group-hover:text-primary-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-dark-700/50 text-xs font-body mt-1 tracking-wider uppercase">
                        TL: {proj.scale}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
