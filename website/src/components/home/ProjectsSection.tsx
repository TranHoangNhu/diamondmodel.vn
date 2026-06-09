import Link from "next/link";
import { DIAMOND_VN_PROJECTS } from "@/lib/diamond-vn";
import { PROJECT_COLLECTION, type ArticleItem } from "@/lib/site-content";
import { ProjectCard, type ProjectCardItem, SectionHeading } from "./SharedComponents";

type StaticProjectItem = (typeof DIAMOND_VN_PROJECTS)[number]["items"][number];

function articleHref(item: ArticleItem) {
  return `${item.categoryHref}/${item.slug}`.replace(/\/+/g, "/");
}

function toProjectCardItem(item: ArticleItem): ProjectCardItem {
  const scale = item.meta.find((meta) => meta.label === "Tỷ lệ")?.value;
  const location = item.meta.find((meta) => meta.label === "Địa điểm")?.value;

  return {
    title: item.title,
    href: articleHref(item),
    image: item.heroImage,
    meta1: item.categoryLabel || "Mô hình kiến trúc",
    meta2: scale || location || item.dateLabel,
    meta2Type: "scale",
  };
}

function toStaticProjectCardItem(item: StaticProjectItem): ProjectCardItem {
  const article = PROJECT_COLLECTION.items.find((candidate) => candidate.title === item.title);

  return {
    ...item,
    href: article ? articleHref(article) : "/du-an",
  };
}

export default function ProjectsSection({ items = [] }: { items?: ArticleItem[] }) {
  const featuredItems = items.filter((item) => item.isFeatured).slice(0, 8);
  const groups = featuredItems.length > 0
    ? [{
        id: "featured-projects",
        eyebrow: "Dự án thực hiện",
        title: "DỰ ÁN NỔI BẬT",
        badge: "NỔI BẬT",
        cta: "Xem thêm",
        items: featuredItems.map(toProjectCardItem),
      }]
    : DIAMOND_VN_PROJECTS.map((group) => ({
        ...group,
        items: group.items.map(toStaticProjectCardItem),
      }));

  return (
    <div className="flex flex-col gap-[50px]">
      {groups.map((group) => (
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
