import type { Metadata } from "next";
import { Allura, Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const accentFont = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Phố Gia | Thiết kế và thi công nội thất",
  description:
    "Thiết kế và thi công nội thất Phố Gia mang những nét đẹp tinh tế và hoàn toàn mới lạ đến với không gian sống cho gia đình bạn.",
  keywords: [
    "phố gia",
    "thiết kế nội thất",
    "thi công nội thất",
    "phogia decor",
    "nội thất cao cấp",
  ],
  openGraph: {
    title: "Phố Gia | Thiết kế và thi công nội thất",
    description:
      "Thiết kế và thi công nội thất Phố Gia mang những nét đẹp tinh tế và hoàn toàn mới lạ đến với không gian sống cho gia đình bạn.",
    url: "https://phogiadecor.vn",
    siteName: "Phố Gia",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${accentFont.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
