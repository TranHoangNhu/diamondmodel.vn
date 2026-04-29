import type { Metadata } from "next";
import {
  SITE_URL,
} from "@/lib/site-content";
import { getCmsAboutArticle, getCmsRelatedArticles } from "@/lib/cms-content";
import {
  ArticleJsonLd,
  ArticleLayout,
  BreadcrumbJsonLd,
} from "@/components/content/PageLayouts";

export const dynamic = "force-dynamic";

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

export default async function GioiThieuPage() {
  const article = await getCmsAboutArticle();
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd article={article} url="/gioi-thieu" />
      <ArticleLayout
        article={article}
        breadcrumbs={breadcrumbs}
        relatedItems={await getCmsRelatedArticles(article)}
        shareUrl={`${SITE_URL}/gioi-thieu`}
        ctaHref="/lien-he"
        ctaLabel="Đặt lịch tư vấn"
      />
    </>
  );
}

