export interface HeroSlide {
  type: "image" | "video";
  url: string;
  poster?: string;
  alt?: string;
}

interface PublicSettingsResponse {
  values?: Record<string, string>;
}

export interface CmsContactSettings {
  companyProfileUrl: string;
  companyProfileLabel: string;
  companyProfileNote: string;
}

export interface CmsGeneralSettings {
  siteLogo: string;
  siteFavicon: string;
  footerBadge: string;
  siteName: string;
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

const cmsBaseUrl = () => CMS_BASE_URL.replace(/\/$/, "");

function normalizeCmsAssetUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/media/")) return `${cmsBaseUrl()}${trimmed}`;
  return trimmed;
}

const normalizeHeroSlide = (value: unknown): HeroSlide | null => {
  if (!value || typeof value !== "object") return null;
  const slide = value as Partial<HeroSlide>;
  if (!slide.url || typeof slide.url !== "string") return null;

  const type = slide.type === "video" || isVideoUrl(slide.url) ? "video" : "image";

  return {
    type,
    url: normalizeCmsAssetUrl(slide.url),
    poster: typeof slide.poster === "string" ? normalizeCmsAssetUrl(slide.poster) : "",
    alt: typeof slide.alt === "string" ? slide.alt : "",
  };
};

export async function getCmsHeroSlides(): Promise<HeroSlide[]> {
  try {
    const headers: HeadersInit = {};
    if (CMS_API_KEY) headers["x-api-key"] = CMS_API_KEY;

    const response = await fetch(`${cmsBaseUrl()}/api/public/settings/home`, {
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

export async function getCmsContactSettings(): Promise<CmsContactSettings | null> {
  try {
    const headers: HeadersInit = {};
    if (CMS_API_KEY) headers["x-api-key"] = CMS_API_KEY;

    const response = await fetch(`${cmsBaseUrl()}/api/public/settings/contact`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as PublicSettingsResponse;
    const values = data.values || {};

    return {
      companyProfileUrl: normalizeCmsAssetUrl(values.company_profile_url || ""),
      companyProfileLabel: values.company_profile_label || "",
      companyProfileNote: values.company_profile_note || "",
    };
  } catch {
    return null;
  }
}

export async function getCmsGeneralSettings(): Promise<CmsGeneralSettings | null> {
  try {
    const headers: HeadersInit = {};
    if (CMS_API_KEY) headers["x-api-key"] = CMS_API_KEY;

    const response = await fetch(`${cmsBaseUrl()}/api/public/settings/general`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as PublicSettingsResponse;
    const values = data.values || {};

    return {
      siteLogo: normalizeCmsAssetUrl(values.site_logo || ""),
      siteFavicon: normalizeCmsAssetUrl(values.site_favicon || ""),
      footerBadge: normalizeCmsAssetUrl(values.footer_badge || ""),
      siteName: values.site_name || "",
    };
  } catch {
    return null;
  }
}
