import type { Metadata } from "next";
import {
  ABOUT_ARTICLE,
  getRelatedArticles,
  SITE_URL,
} from "@/lib/site-content";
import {
  ArticleJsonLd,
  ArticleLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";

export const metadata: Metadata = {
  title: "Giới thiệu | Diamond Model",
  description:
    "Bài viết giới thiệu Diamond Model theo dạng blog chi tiết với breadcrumb, table of contents và share social chuẩn SEO.",
  openGraph: {
    title: "Giới thiệu | Diamond Model",
    description:
      "Bài viết giới thiệu Diamond Model theo dạng blog chi tiết với breadcrumb, table of contents và share social chuẩn SEO.",
    url: "/gioi-thieu",
    type: "article",
  },
};

export default function GioiThieuPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd article={ABOUT_ARTICLE} url="/gioi-thieu" />
      <ArticleLayout
        article={ABOUT_ARTICLE}
        breadcrumbs={breadcrumbs}
        relatedItems={getRelatedArticles(ABOUT_ARTICLE)}
        shareUrl={`${SITE_URL}/gioi-thieu`}
        ctaHref="/lien-he"
        ctaLabel="Đặt lịch tư vấn"
      />
    </>
  );
}

