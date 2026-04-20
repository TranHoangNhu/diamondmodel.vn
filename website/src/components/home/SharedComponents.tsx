import Image from "next/image";
import { PHO_GIA_PROJECTS } from "@/lib/phogia";
import { CARD_TITLE_CLASS } from "@/components/ui/cardTypography";

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

  return <Image src={src} alt="" width={16} height={16} className="h-4 w-4 shrink-0 opacity-[0.65]" loading="lazy" />;
}

export function ProjectCard({
  item,
}: {
  item: (typeof PHO_GIA_PROJECTS)[number]["items"][number];
}) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-[8px] bg-[#f3eee6]">
        <div className="relative aspect-[458/250] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 458px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            quality={90}
          />
        </div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <h3 className={`ph-clamp-2 min-h-[3rem] ${CARD_TITLE_CLASS} text-[#4f4b46]`}>{item.title}</h3>
        <div className="mt-2.5 grid gap-2 text-[12px] text-[#756d63] sm:grid-cols-2">
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
      <div className="relative overflow-hidden rounded-[8px] bg-black">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover opacity-[0.84]"
            loading="lazy"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-2xl text-white">
            ▶
          </span>
        </div>
      </div>
      <h3 className={`ph-clamp-2 mt-3 min-h-[3rem] text-center ${CARD_TITLE_CLASS} text-[#4f4b46]`}>{title}</h3>
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
