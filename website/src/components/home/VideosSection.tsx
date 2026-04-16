import { PHO_GIA_VIDEOS } from "@/lib/phogia";
import { SectionHeading, VideoCard } from "./SharedComponents";

export default function VideosSection() {
  return (
    <section className="bg-[#fffdfa] py-[72px] md:py-[96px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Năng lực của chúng tôi" title="KHÁM PHÁ CÔNG TY" />
        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PHO_GIA_VIDEOS.map((video) => (
              <VideoCard key={video.title} image={video.image} title={video.title} />
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
