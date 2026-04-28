export interface HeroSlide {
  type: "image" | "video";
  url: string;
  poster?: string;
  alt?: string;
}

interface PublicSettingsResponse {
  values?: Record<string, string>;
}

const CMS_BASE_URL =
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  "https://admin.minnam.asia";

const CMS_API_KEY =
  process.env.CMS_API_KEY ||
  process.env.NEXT_PUBLIC_CMS_API_KEY ||
  "";

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

const normalizeHeroSlide = (value: unknown): HeroSlide | null => {
  if (!value || typeof value !== "object") return null;
  const slide = value as Partial<HeroSlide>;
  if (!slide.url || typeof slide.url !== "string") return null;

  const type = slide.type === "video" || isVideoUrl(slide.url) ? "video" : "image";

  return {
    type,
    url: slide.url,
    poster: typeof slide.poster === "string" ? slide.poster : "",
    alt: typeof slide.alt === "string" ? slide.alt : "",
  };
};

export async function getCmsHeroSlides(): Promise<HeroSlide[]> {
  try {
    const headers: HeadersInit = {};
    if (CMS_API_KEY) headers["x-api-key"] = CMS_API_KEY;

    const response = await fetch(`${CMS_BASE_URL.replace(/\/$/, "")}/api/public/settings/home`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as PublicSettingsResponse;
    const rawValue = data.values?.home_hero_slides;
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeHeroSlide)
      .filter((slide): slide is HeroSlide => Boolean(slide));
  } catch {
    return [];
  }
}
