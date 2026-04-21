import type { Metadata } from "next";
import {
  ArchiveLayout,
  BreadcrumbJsonLd,
  CollectionJsonLd,
} from "@/components/content/PageLayouts";
import { NEWS_COLLECTION } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tin tức | Diamond Model",
  description:
    "Tin tức và bài viết cảm hứng về nội thất, vật liệu, ánh sáng và ngân sách, trình bày theo dạng bài blog chuẩn SEO.",
  openGraph: {
    title: "Tin tức | Diamond Model",
    description:
      "Tin tức và bài viết cảm hứng về nội thất, vật liệu, ánh sáng và ngân sách, trình bày theo dạng bài blog chuẩn SEO.",
    url: "/tin-tuc",
    type: "website",
  },
};

export default function TinTucPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={NEWS_COLLECTION} url="/tin-tuc" />
      <ArchiveLayout collection={NEWS_COLLECTION} items={NEWS_COLLECTION.items} breadcrumbs={breadcrumbs} />
    </>
  );
}

