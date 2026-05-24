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
  aboutPageSlug: string;
}

const CMS_BASE_URL =
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  "https://admin.minnam.asia";

const CMS_API_KEY =
  process.env.CMS_API_KEY ||
  process.env.NEXT_PUBLIC_CMS_API_KEY ||
  "";

const CMS_TIMEOUT_MS = 3500;

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
const ABOUT_DEMO_VALUE = "__demo";

const cmsBaseUrl = () => CMS_BASE_URL.replace(/\/$/, "");

function normalizeCmsAssetUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/media/")) return `${cmsBaseUrl()}${trimmed}`;
  return trimmed;
}

async function cmsFetchSettings(path: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);

  try {
    const headers = new Headers(init.headers);
    if (CMS_API_KEY) headers.set("x-api-key", CMS_API_KEY);

    const response = await fetch(`${cmsBaseUrl()}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
    });

    return response.ok ? response : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
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
    const response = await cmsFetchSettings("/api/public/settings/home", {
      next: { revalidate: 60 },
    });

    if (!response) return [];

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
    const response = await cmsFetchSettings("/api/public/settings/contact", {
      cache: "no-store",
    });

    if (!response) return null;

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
    const response = await cmsFetchSettings("/api/public/settings/general", {
      cache: "no-store",
    });

    if (!response) return null;

    const data = (await response.json()) as PublicSettingsResponse;
    const values = data.values || {};

    return {
      siteLogo: normalizeCmsAssetUrl(values.site_logo || ""),
      siteFavicon: normalizeCmsAssetUrl(values.site_favicon || ""),
      footerBadge: normalizeCmsAssetUrl(values.footer_badge || ""),
      siteName: values.site_name || "",
      aboutPageSlug: values.frontend_about_page_slug || ABOUT_DEMO_VALUE,
    };
  } catch {
    return null;
  }
}

export async function getCmsAboutPageSlug(): Promise<string | null> {
  const generalSettings = await getCmsGeneralSettings();
  const slug = generalSettings?.aboutPageSlug?.trim();

  if (!slug || slug === ABOUT_DEMO_VALUE) return null;
  return slug.replace(/^\/+|\/+$/g, "");
}
