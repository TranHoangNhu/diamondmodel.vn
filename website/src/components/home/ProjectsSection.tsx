import { PHO_GIA_PROJECTS } from "@/lib/phogia";
import { ProjectCard, SectionHeading } from "./SharedComponents";

export default function ProjectsSection() {
  return (
    <>
      {PHO_GIA_PROJECTS.map((group) => (
        <section key={group.id} id={group.id} className="ph-section scroll-mt-24">
          <div className="ph-container">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} />
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <ProjectCard key={`${group.id}-${item.title}`} item={item} />
              ))}
            </div>
            <div className="mt-12 text-center">
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
