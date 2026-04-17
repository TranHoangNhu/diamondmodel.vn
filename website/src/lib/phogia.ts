export const PHO_GIA_COMPANY = {
  name: "PHỐ GIA",
  fullName: "CTY CP KIẾN TRÚC & NỘI THẤT PHỐ GIA",
  phone: "090 9490 585",
  phoneHref: "0909490585",
  email: "info@phogiadecor.vn",
  zalo: "https://zalo.me/0909490585",
  logo: "/phogia/brand/logo.svg",
  zaloIcon: "/phogia/brand/icon-zalo.svg",
  heroVideo: "/phogia/home/PHO-GIA-DECOR-2023.mp4",
  heroPoster: "/phogia/home/banner-lf.jpg",
  yearsBadge: "/phogia/home/9_Years.svg",
  missionImage: "/phogia/home/9-years-img-1.webp",
  trustImage: "/phogia/home/trust-img.webp",
  processDesktop: "/phogia/home/process_phogia_home_pc.svg",
  processMobile: "/phogia/home/process_phogia_home_mob.svg",
  processThumb: "/phogia/home/procedure-home.webp",
  statsBackground: "/phogia/home/value-customer-01.webp",
  footerBadge: "/phogia/brand/tinnhiemmang-cert.png",
  facebook: "https://www.facebook.com/phogiadecor.vn",
  youtube: "https://www.youtube.com/channel/UCWjXVgC9Khzcp4JMxE0eUsA",
  addresses: [
    {
      title: "PHỐ GIA HCM",
      lines: [
        "Toà nhà La Bonita - Tầng 4: 215 Nguyễn Gia Trí, P. 25, Q. Bình Thạnh, TP. HCM",
        "Xưởng Sản Xuất Mộc : 999/3D Võ Thị Thừa, P. An Phú Đông, Q.12, TP. HCM",
        "Xưởng Sản Xuất Sofa : 999/5D Võ Thị Thừa, P. An Phú Đông, Q.12, TP. HCM",
      ],
      phone: "090 9490 585",
      href: "0909490585",
    },
    {
      title: "PHỐ GIA CN BÌNH DƯƠNG",
      lines: ["109/5 đường Vĩnh Phú 32, P. Vĩnh Phú, TP. Thuận An, Bình Dương."],
      phone: "093 2770611",
      href: "0932770611",
    },
    {
      title: "PHỐ GIA CN NHA TRANG",
      lines: ["47 Khóm Quốc Tuấn, P. Phước Tân, TP. Nha Trang, Khánh Hòa."],
      phone: "090 9490 585",
      href: "0909490585",
    },
  ],
  policies: [
    { label: "Chính sách bảo hành, bảo trì", href: "https://phogiadecor.vn/chinh-sach-bao-hanh-bao-tri" },
    { label: "Chính sách bảo mật", href: "https://phogiadecor.vn/chinh-sach-bao-mat" },
    {
      label: "Phố Gia trên Google News",
      href: "https://news.google.com/publications/CAAqBwgKMPfWtwswhPLOAw?hl=vi&gl=VN&ceid=VN:vi",
    },
  ],
} as const;

export const PHO_GIA_NAV = [
  { label: "Giới thiệu", href: "#mission" },
  { label: "Thiết kế", href: "#design-apartment" },
  { label: "Thi công", href: "#construction" },
  { label: "Báo giá", href: "#consultation" },
  { label: "Quy trình", href: "#process" },
  { label: "Blog nhà đẹp", href: "#press" },
  { label: "Liên hệ", href: "#footer" },
] as const;

export const PHO_GIA_BENEFITS = [
  {
    title: "Thiết kế cá nhân hóa",
    description:
      "Thiết kế phù hợp với sở thích, phong cách sống của riêng bạn và gia đình. Nhưng vẫn tối ưu không gian sử dụng.",
  },
  {
    title: "Thi công tỉ mỉ",
    description:
      "Kiểm định nghiêm ngặt trong chi tiết, gói gọn tâm huyết trên từng sản phẩm hoàn thiện.",
  },
  {
    title: "Chất lượng & thẩm mỹ",
    description:
      "Đội ngũ thợ mộc lành nghề sẽ luôn hoàn thiện công trình một cách tỉ mỉ, độ thẩm mĩ cao gần với bản thiết kế nhất.",
  },
  {
    title: "Bảo trì trọn đời",
    description:
      "Tính vượt trội được thể hiện qua 2 lần chủ động bảo hành trong năm, bảo trì trọn đời.",
  },
] as const;

type ProjectItem = {
  title: string;
  image: string;
  meta1: string;
  meta2: string;
  meta2Type: "bedroom" | "scale";
};

type ProjectGroup = {
  id: string;
  eyebrow: string;
  title: string;
  cta: string;
  items: readonly ProjectItem[];
};

export const PHO_GIA_PROJECTS = [
  {
    id: "design-apartment",
    eyebrow: "Công trình thiết kế",
    title: "THIẾT KẾ NỘI THẤT CĂN HỘ",
    cta: "Xem thêm",
    items: [
      {
        title: "Nội thất Căn hộ Sunrise Riverside 2PN - Không gian tổ ấm tươi mát",
        image: "/phogia/projects/thiet-ke-noi-that-Sunrise-Riverside-2pn-thumb-458x250.jpg",
        meta1: "Diện tích: 70M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Nội thất Căn hộ Eco Green 2PN - Japandi mộc mạc, thư thái",
        image: "/phogia/projects/thiet-ke-noi-that-ch-eco-green-72m2-japandi-thumb-458x250.jpg",
        meta1: "Diện tích: 72M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Nội thất Căn hộ Richmond City 2PN - Japandi thư thái, bình yên",
        image: "/phogia/projects/thiet-ke-noi-that-Richmond-City-73M2-thumb-458x250.jpg",
        meta1: "Diện tích: 73M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thiết kế nội thất Căn hộ Cosmo City Q.7 72m2",
        image: "/phogia/projects/thiet-ke-noi-that-Cosmo-City-Q7-thumb-458x250.jpg",
        meta1: "Diện tích: 72M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thiết kế nội thất Căn hộ Palm Heights 2PN Japandi thư giãn, ấm áp",
        image: "/phogia/projects/thiet-ke-noi-that-can-ho-palm-heights-2pn-thumb-458x250.jpg",
        meta1: "Diện tích: 80M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thiết kế nội thất Căn hộ Eco Green Q.7 2PN",
        image: "/phogia/projects/thiet-ke-noi-that-ch-Eco-Green-q7-thumb-458x250.jpg",
        meta1: "Diện tích: 66M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
    ],
  },
  {
    id: "design-townhouse",
    eyebrow: "Công trình thiết kế",
    title: "THIẾT KẾ NỘI THẤT NHÀ PHỐ",
    cta: "Xem thêm",
    items: [
      {
        title: "Thiết kế nội thất villa Vạn Phúc City Gỗ Tự Nhiên Sang Trọng",
        image: "/phogia/projects/thiet-ke-noi-that-village-van-phuc-city-tan-co-dien-thumb-458x250.jpg",
        meta1: "Diện tích: 220M2",
        meta2: "Quy mô: 1 Trệt, 1 Lầu",
        meta2Type: "scale",
      },
      {
        title: "THIẾT KẾ NỘI THẤT BIỆT THỰ THẢO ĐIỀN QUẬN 2",
        image: "/phogia/projects/thiet-ke-villa-nha-pho-thao-dien-quan-2-thumb-458x250.jpg",
        meta1: "Diện tích: 200M2",
        meta2: "Quy mô: 1 Trệt, 2 Lầu",
        meta2Type: "scale",
      },
      {
        title: "THIẾT KẾ NỘI THẤT VILLA LIỀN KỀ BÌNH DƯƠNG",
        image: "/phogia/projects/thiet-ke-noi-that-villa-lien-ke-binh-duong-thumb-458x250.jpg",
        meta1: "Diện tích: 320M2",
        meta2: "Quy mô: 1 Trệt, 2 Lầu",
        meta2Type: "scale",
      },
      {
        title: "Thiết kế nội thất phòng ngủ Villa Vạn Phúc City sang trọng",
        image: "/phogia/projects/thiet-ke-noi-that-phong-ngu-village-van-phuc-city-sang-trong-thumb-2-458x250.jpg",
        meta1: "Diện tích: 90M2",
        meta2: "Quy mô: 2 Lầu",
        meta2Type: "scale",
      },
      {
        title: "Thiết kế nội thất nhà phố Vạn Phúc City sang trọng",
        image: "/phogia/projects/thiet-ke-noi-that-nha-pho-van-phuc-city-sang-trong-7-458x250.jpg",
        meta1: "Diện tích: M2",
        meta2: "Quy mô:",
        meta2Type: "scale",
      },
      {
        title: "THIẾT KẾ NỘI THẤT LAKEVIEW CITY QUẬN 2",
        image: "/phogia/projects/thiet-ke-noi-that-lakeview-city-quan-2-thumb-458x250.jpg",
        meta1: "Diện tích: 94M2",
        meta2: "Quy mô:",
        meta2Type: "scale",
      },
    ],
  },
  {
    id: "construction",
    eyebrow: "Dự án mới bàn giao",
    title: "CÔNG TRÌNH THI CÔNG NỘI THẤT",
    cta: "Xem thêm",
    items: [
      {
        title: "Thi Công Nội Thất Sunwah Pearl 2 Phòng Ngủ",
        image: "/phogia/projects/Thi-cong-noi-that-SUNWAH-PEARL-2pn-thumb-458x250.jpg",
        meta1: "Diện tích: 76M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thi Công Nội Thất Căn hộ New City Q.2",
        image: "/phogia/projects/thi-cong-noi-that-can-ho-New-City-thu-thiem-thumb-458x250.jpg",
        meta1: "Diện tích: 62M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thi Công Nội Thất căn hộ Safira Khang Điền 3 Phòng Ngủ",
        image: "/phogia/projects/thi-cong-Safira-Khang-Dien-3pn-thumb-458x250.jpg",
        meta1: "Diện tích: 90M2",
        meta2: "Phòng ngủ: 3",
        meta2Type: "bedroom",
      },
      {
        title: "Thi Công Nội Thất căn hộ Vinhomes Grand Park 2 Phòng Ngủ",
        image: "/phogia/projects/Thi-cong-noi-that-Vinhomes-Grand-Park-q9-2pn-thumb-458x250.jpg",
        meta1: "Diện tích: 76M2",
        meta2: "Phòng ngủ: 2",
        meta2Type: "bedroom",
      },
      {
        title: "Thi Công Nội Thất Nhà Phố Bình Dương Phong cách Tối Giản, Mộc Mạc",
        image: "/phogia/projects/thi-cong-nha-pho-binh-duong-toi-gian-moc-mac-thumb-458x250.jpg",
        meta1: "Diện tích: 220M2",
        meta2: "Quy mô: 1 Trệt, 1 Lầu",
        meta2Type: "scale",
      },
      {
        title: "Thi Công Nội Thất Penthouse Phú Mỹ Hưng hiện đại, sang trọng",
        image: "/phogia/projects/thi-cong-noi-that-penthouse-phu-my-hung-phogia-thumb-458x250.jpg",
        meta1: "Diện tích: 228M2",
        meta2: "Phòng ngủ: 3",
        meta2Type: "bedroom",
      },
    ],
  },
] as const satisfies readonly ProjectGroup[];

export const PHO_GIA_VALUES = [
  { label: "Khách hàng", value: "350+", image: "/phogia/home/value-customer-01.webp" },
  { label: "Dự án thiết kế", value: "400+", image: "/phogia/home/value-design-02.webp" },
  { label: "Dự án thi công", value: "380+", image: "/phogia/home/value-build-03.webp" },
  { label: "Công trình tiêu biểu", value: "18", image: "/phogia/home/value-special-04.webp" },
] as const;

export const PHO_GIA_VIDEOS = [
  {
    title: "QUY TRÌNH SẢN XUẤT TẠI XƯỞNG PHỐ GIA DECOR",
    image: "/phogia/videos/BANNER-CHINH.jpg",
    href: "https://youtu.be/87aKui2Cl-g",
  },
  {
    title: "QUÁ TRÌNH THI CÔNG TẠI CÔNG TRÌNH",
    image: "/phogia/videos/izPEwzhK04g-hqdefault.jpg",
    href: "https://youtu.be/izPEwzhK04g",
  },
  {
    title: "TRẢI NGHIỆM KHÁCH HÀNG PHỐ GIA",
    image: "/phogia/videos/trai-nghiem-kh-video-thumb.jpg",
    href: "https://vimeo.com/803366386",
  },
] as const;

export const PHO_GIA_PRESS_LOGOS = [
  "/phogia/press/logo-bao-tien-phong.jpg",
  "/phogia/press/bao-24h-com-vn.jpg",
  "/phogia/press/nguoi-dua-tin.jpg",
  "/phogia/press/bao-xay-dung-1.jpg",
  "/phogia/press/ha-noi-moi.png",
  "/phogia/press/logo-tri-thuc-moi_2021_05_12.png",
] as const;

export const PHO_GIA_COMPLETED_LOGOS = [
  "/phogia/completed/logo-20.png",
  "/phogia/completed/logo-1.png",
  "/phogia/completed/logo-2.png",
  "/phogia/completed/logo-3.png",
  "/phogia/completed/logo-4.png",
  "/phogia/completed/logo-5.png",
  "/phogia/completed/logo-6.png",
  "/phogia/completed/logo-7.png",
  "/phogia/completed/logo-8.png",
  "/phogia/completed/logo-9.png",
  "/phogia/completed/logo-10.png",
  "/phogia/completed/logo-11.png",
  "/phogia/completed/logo-12.png",
  "/phogia/completed/logo-13.png",
  "/phogia/completed/logo-14.png",
  "/phogia/completed/logo-15.png",
  "/phogia/completed/logo-16.png",
  "/phogia/completed/logo-17.png",
  "/phogia/completed/logo-18.png",
  "/phogia/completed/logo-19.png",
] as const;
