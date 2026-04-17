import { PHO_GIA_VIDEOS } from "@/lib/phogia";
import { SectionHeading, VideoCard } from "./SharedComponents";

export default function VideosSection() {
  return (
    <section className="ph-section ph-section-band">
      <div className="ph-container">
        <SectionHeading eyebrow="Năng lực của chúng tôi" title="KHÁM PHÁ PHỐ GIA" />
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-7 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PHO_GIA_VIDEOS.map((video) => (
              <VideoCard key={video.title} image={video.image} title={video.title} href={video.href} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 text-[#cbb78d]">
            <span>←</span>
            <span className="h-2 w-2 rounded-full bg-[#edbc73]" />
            <span className="h-2 w-2 rounded-full bg-[#e6ded0]" />
            <span className="h-2 w-2 rounded-full bg-[#e6ded0]" />
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
