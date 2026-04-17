/* eslint-disable @next/next/no-img-element */

import { PHO_GIA_PROJECTS } from "@/lib/phogia";

export function SectionHeading({
  eyebrow,
  title,
  center = true,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "ph-section-header" : ""}>
      {eyebrow ? <p className="ph-eyebrow">{eyebrow}</p> : null}
      <h2 className="ph-title mt-3">{title}</h2>
    </div>
  );
}

export function MetaIcon({ type }: { type: "area" | "bedroom" | "scale" }) {
  const src =
    type === "area"
      ? "/phogia/icons/area.svg"
      : type === "bedroom"
        ? "/phogia/icons/pn-ico.svg"
        : "/phogia/icons/scale.svg";

  return <img src={src} alt="" className="h-4 w-4 shrink-0 opacity-[0.65]" loading="lazy" />;
}

export function ProjectCard({
  item,
}: {
  item: (typeof PHO_GIA_PROJECTS)[number]["items"][number];
}) {
  return (
    <article className="group rounded-[8px] border border-[#e7ded1] bg-white p-3 shadow-[0_14px_34px_rgba(46,40,31,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(46,40,31,0.11)]">
      <div className="overflow-hidden rounded-[6px] bg-[#f3eee6]">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[458/250] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="px-1 pb-1 pt-4">
        <h3 className="min-h-[42px] text-[13px] font-semibold uppercase leading-[1.45] text-[#4f4b46]">{item.title}</h3>
        <div className="mt-4 grid gap-2 text-[12px] text-[#756d63] sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <MetaIcon type="area" />
            <span>{item.meta1}</span>
          </div>
          <div className="flex items-center gap-2">
            <MetaIcon type={item.meta2Type} />
            <span>{item.meta2}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function VideoCard({ image, title, href }: { image: string; title: string; href?: string }) {
  const content = (
    <>
      <div className="relative overflow-hidden rounded-[8px] bg-black shadow-[0_18px_46px_rgba(31,31,31,0.16)]">
        <img src={image} alt={title} className="aspect-[16/9] w-full object-cover opacity-[0.82]" loading="eager" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-2xl text-white">
            ▶
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-center text-[13px] font-semibold uppercase leading-[1.45] text-[#4f4b46]">{title}</h3>
    </>
  );

  if (!href) {
    return <div className="w-[86vw] max-w-[520px] shrink-0 lg:w-[34%]">{content}</div>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block w-[86vw] max-w-[520px] shrink-0 lg:w-[34%]">
      {content}
    </a>
  );
}
