import type { Metadata } from "next";
import {
  ArchiveLayout,
  BreadcrumbJsonLd,
  CollectionJsonLd,
} from "@/components/content/PageLayouts";
import { getCmsCollection } from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin tức | Diamond Model",
  description:
    "Tin tức và bài viết cảm hứng về mô hình kiến trúc, sa bàn, vật liệu và cách trình bày dự án, trình bày theo dạng bài blog chuẩn SEO.",
  openGraph: {
    title: "Tin tức | Diamond Model",
    description:
      "Tin tức và bài viết cảm hứng về mô hình kiến trúc, sa bàn, vật liệu và cách trình bày dự án, trình bày theo dạng bài blog chuẩn SEO.",
    url: "/tin-tuc",
    type: "website",
  },
};

export default async function TinTucPage() {
  const collection = await getCmsCollection("tin-tuc");
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={collection} url="/tin-tuc" />
      <ArchiveLayout collection={collection} items={collection.items} breadcrumbs={breadcrumbs} />
    </>
  );
}

