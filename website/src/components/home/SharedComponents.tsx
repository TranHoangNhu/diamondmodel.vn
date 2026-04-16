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
    <div className={center ? "text-center" : ""}>
      {eyebrow ? <p className="ph-eyebrow">{eyebrow}</p> : null}
      <h2 className="ph-title mt-2">{title}</h2>
    </div>
  );
}

export function MetaIcon({ type }: { type: "area" | "bedroom" | "scale" }) {
  const src =
    type === "area"
      ? "https://phogiadecor.vn/wp-content/themes/phogiav3/images/area.svg"
      : type === "bedroom"
      ? "https://phogiadecor.vn/wp-content/themes/phogiav3/images/pn-ico.svg"
      : "https://phogiadecor.vn/wp-content/themes/phogiav3/images/scale.svg";

  return <img src={src} alt="" className="h-4 w-4 shrink-0 opacity-70" loading="lazy" />;
}

export function ProjectCard({
  item,
}: {
  item: (typeof PHO_GIA_PROJECTS)[number]["items"][number];
}) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-[6px] bg-[#f3eee6]">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[458/250] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="pt-3">
        <h3 className="line-clamp-2 text-[13px] font-medium uppercase leading-[1.45] text-[#4f4b46]">
          {item.title}
        </h3>
        <div className="mt-2 grid gap-1 text-[12px] text-[#7c7469] md:grid-cols-2">
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

export function VideoCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="w-[86vw] max-w-[520px] shrink-0 lg:w-[34%]">
      <div className="relative overflow-hidden rounded-[6px] bg-black">
        <img src={image} alt={title} className="aspect-[16/9] w-full object-cover opacity-80" loading="eager" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.45] text-2xl text-white">
            ▶
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-center text-[13px] uppercase leading-[1.45] text-[#4f4b46]">{title}</h3>
    </div>
  );
}
