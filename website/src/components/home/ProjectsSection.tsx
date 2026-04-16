import { PHO_GIA_PROJECTS } from "@/lib/phogia";
import { SectionHeading, ProjectCard } from "./SharedComponents";

export default function ProjectsSection() {
  return (
    <>
      {PHO_GIA_PROJECTS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-24 bg-[#fffdfa] py-16 md:py-[88px]"
        >
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} />
            <div className="mt-10 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <ProjectCard key={`${group.id}-${item.title}`} item={item} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="#footer" className="ph-button inline-flex">
                {group.cta}
              </a>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
