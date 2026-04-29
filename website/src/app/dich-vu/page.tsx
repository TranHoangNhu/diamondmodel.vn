import type { Metadata } from "next";
import {
  ArchiveLayout,
  BreadcrumbJsonLd,
  CollectionJsonLd,
} from "@/components/content/PageLayouts";
import { getCmsCollection } from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dịch vụ | Diamond Model",
  description:
    "Danh mục dịch vụ Diamond Model gồm tư vấn sa bàn, thi công, thiết kế 3D phối cảnh và bảo trì mô hình, được trình bày theo dạng blog/portfolio rõ ràng.",
  openGraph: {
    title: "Dịch vụ | Diamond Model",
    description:
      "Danh mục dịch vụ Diamond Model gồm tư vấn sa bàn, thi công, thiết kế 3D phối cảnh và bảo trì mô hình, được trình bày theo dạng blog/portfolio rõ ràng.",
    url: "/dich-vu",
    type: "website",
  },
};

export default async function DichVuPage() {
  const collection = await getCmsCollection("dich-vu");
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/dich-vu" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CollectionJsonLd collection={collection} url="/dich-vu" />
      <ArchiveLayout collection={collection} items={collection.items} breadcrumbs={breadcrumbs} />
    </>
  );
}

