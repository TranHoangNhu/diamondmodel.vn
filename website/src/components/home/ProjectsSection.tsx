import Link from "next/link";
import { PHO_GIA_PROJECTS } from "@/lib/phogia";
import { ProjectCard, SectionHeading } from "./SharedComponents";

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-[50px]">
      {PHO_GIA_PROJECTS.map((group) => (
        <section key={group.id} id={group.id} className="ph-section-surface scroll-mt-24">
          <div className="ph-container-wide">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <ProjectCard key={`${group.id}-${item.title}`} item={item} badge={group.badge} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/du-an" className="ph-button inline-flex">
                {group.cta}
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
