# ARCHITECTURE-CMS-LOOMS-VN

Tài liệu này mô tả kiến trúc frontend hiện tại của dự án Diamond Model để bên CMS đối chiếu khi cấu hình chỉnh sửa tổng quan source frontend, đồng thời ghi rõ các điểm SEO hiện chưa chuẩn theo hướng vận hành bằng CMS.

## 1) Bức tranh tổng thể

| Tầng | File / Folder chính | Vai trò | CMS chỉnh sửa được không | Ghi chú SEO / vận hành |
| --- | --- | --- | --- | --- |
| App Router shell | `website/src/app/layout.tsx`, `website/src/components/layout/AppShell.tsx`, `Header.tsx`, `Footer.tsx`, `FloatingContact.tsx` | Tạo khung giao diện toàn site, gắn font, header, footer, CTA nổi và metadata gốc | Hầu như không | `metadata` gốc đang hardcode trong code, CMS chưa can thiệp được theo từng trang |
| Route pages | `website/src/app/*/page.tsx` | Mỗi route ghép section / layout tương ứng | Một phần | Một số route có `metadata` hoặc `generateMetadata`, nhưng dữ liệu nguồn vẫn là hằng số TS |
| Home sections | `website/src/components/home/*` | Hero, mission, trust, projects, process, stats, videos, completed, press | Không | Nội dung, slider, thứ tự section và CTA đang đi từ code, không phải CMS |
| Content layouts | `website/src/components/content/PageLayouts.tsx` | Render trang chi tiết, archive list, breadcrumb, JSON-LD | Một phần | Có JSON-LD, nhưng schema cũng lấy từ object tĩnh trong code |
| Content registry | `website/src/lib/site-content.ts` | Articles, archive collections, service/news/project content, sitemap source | Không | Đây là nguồn nội dung chính hiện tại; chỉnh sửa phải rebuild code |
| Brand registry | `website/src/lib/diamond-vn.ts` | Thông tin công ty, logo, nav, project groups, contact block, assets | Không | Dùng như data layer trung tâm nhưng vẫn là code-managed |
| Navigation config | `website/src/lib/site-nav.ts` | Menu điều hướng header | Không | CMS chưa điều khiển được thứ tự / nhãn / link menu |
| Styling system | `website/src/app/globals.css`, `website/tailwind.config.ts` | Container, typography, card styles, tokens, responsive scale | Không | Chỉ là lớp trình bày, không chứa content SEO |
| Assets | `website/public/diamondmodel`, `website/public/diamond-vn` | Ảnh hero, logo, badge, video thumb, icon | Không | Ảnh đang là file local hoặc remote allowlist, CMS chưa có media library |
| SEO infra | `website/src/app/robots.ts`, `website/src/app/sitemap.ts` | Tạo robots.txt và sitemap.xml | Không | Sitemap lấy từ array tĩnh, chưa tự phản ánh nội dung CMS mới |

## 2) Bản đồ route frontend

| URL | Kiểu trang | Component / Layout chính | Nguồn dữ liệu | SEO hiện tại | CMS gap |
| --- | --- | --- | --- | --- | --- |
| `/` | Trang chủ | `HeroSection`, `MissionSection`, `TrustSection`, `ProjectsSection`, `ProcessSection`, `StatsSection`, `VideosSection` | `DIAMOND_VN_COMPANY`, `DIAMOND_VN_PROJECTS`, `DIAMOND_VN_VIDEOS` | Không có `metadata` riêng trong `page.tsx`, dùng metadata gốc của `layout.tsx` | Home chưa có meta title/description/OG do CMS quản lý |
| `/gioi-thieu` | Bài giới thiệu dạng article | `ArticleLayout` + `ABOUT_ARTICLE` + `ArticleJsonLd` | `site-content.ts` | Có `metadata`, breadcrumb schema, article schema | Nội dung bài giới thiệu vẫn hardcoded, CMS chưa chỉnh được body / SEO fields |
| `/du-an` | Trang archive / listing | `ArchiveLayout` + `PROJECT_COLLECTION` + `CollectionJsonLd` | `site-content.ts` | Có `metadata`, breadcrumb schema, collection schema | Tên, mô tả, filters, hero, CTA đều chưa lấy từ CMS |
| `/du-an/[slug]` | Trang chi tiết dự án | `ArticleLayout` + `generateMetadata` + `ArticleJsonLd` | `site-content.ts` | SEO tốt hơn vì có metadata theo slug, nhưng vẫn build-time | CMS chưa cấp slug/article body/related items trực tiếp |
| `/dich-vu` | Trang archive / listing | `ArchiveLayout` + `SERVICE_COLLECTION` + `CollectionJsonLd` | `site-content.ts` | Có `metadata`, breadcrumb schema, collection schema | Danh mục dịch vụ chưa được quản lý bằng CMS |
| `/dich-vu/[slug]` | Trang chi tiết dịch vụ | `ArticleLayout` + `generateMetadata` + `ArticleJsonLd` | `site-content.ts` | Có metadata động theo slug ở mức code | CMS chưa điều khiển title, summary, media, schema |
| `/tin-tuc` | Trang archive / listing | `ArchiveLayout` + `NEWS_COLLECTION` + `CollectionJsonLd` | `site-content.ts` | Có `metadata`, breadcrumb schema, collection schema | Bài viết mới không thể publish từ CMS nếu không sửa code |
| `/tin-tuc/[slug]` | Trang chi tiết tin tức | `ArticleLayout` + `generateMetadata` + `ArticleJsonLd` | `site-content.ts` | Có metadata động theo slug ở mức code | CMS chưa điều khiển body, tags, publish date, related content |
| `/lien-he` | Trang liên hệ | Contact blocks + form + commitments | `diamond-vn.ts` + `ContactForm` | Có `metadata`, nhưng chưa có schema liên hệ riêng | Thông tin liên hệ, logo, social, địa chỉ vẫn hardcoded trong code |

## 3) Luồng dữ liệu hiện tại

| Nguồn | Dữ liệu chứa | Đi đến đâu | Tình trạng |
| --- | --- | --- | --- |
| `website/src/lib/diamond-vn.ts` | Brand, logo, phone, email, address, nav, hero slides, project groups, videos, badges | Header, Footer, Home, Contact, Project cards | Code-managed, chưa phải CMS |
| `website/src/lib/site-content.ts` | Article objects, archive collections, service/news/project content, JSON-LD data | `gioi-thieu`, `du-an`, `dich-vu`, `tin-tuc` | Code-managed, build-time render |
| `website/public/diamondmodel/*` | Logo, hero images, icon, slide assets | Header, hero, cards, contact, footer | Static assets, chưa có media library CMS |
| `website/src/components/content/PageLayouts.tsx` | Layout logic cho article/archive + schema scripts | Các route detail và listing | Có tái sử dụng tốt, nhưng nội dung đầu vào vẫn là TS |
| `website/src/app/sitemap.ts` | Static list page + article URLs | `sitemap.xml` | Chỉ phản ánh các route có trong code |

## 4) Những điểm hiện chưa chuẩn SEO theo hướng CMS

| Vấn đề | Hiện trạng code | Tác động SEO | Vì sao CMS chưa xử lý được |
| --- | --- | --- | --- |
| Metadata root / home chưa do CMS quản lý | `layout.tsx` đang giữ metadata gốc; home page không tự xuất metadata riêng | Home page dễ bị thiếu tiêu đề / mô tả tối ưu theo chiến dịch | CMS chưa có model `page_seo` để đổi title, description, OG cho trang chủ |
| Title / description của archive pages còn hardcoded | `/du-an`, `/dich-vu`, `/tin-tuc` export `metadata` cố định trong page file | Không tối ưu theo mùa vụ hoặc chiến dịch nội dung | CMS chưa có trường SEO cho mỗi collection |
| Nội dung bài viết / dự án / dịch vụ là object TS | `site-content.ts` đang chứa toàn bộ body, summary, tags, hero image | Bài mới phải sửa code, không thể publish từ CMS | CMS chưa có model article / service / project |
| JSON-LD lấy từ object tĩnh | `ArticleJsonLd`, `CollectionJsonLd`, `BreadcrumbJsonLd` render từ data hardcoded | Schema đúng kỹ thuật, nhưng không linh hoạt theo dữ liệu mới | CMS chưa cấp schema fields như author, updatedAt, FAQ, service type, local business |
| Sitemap sinh từ danh sách tĩnh | `sitemap.ts` map từ `SITE_PAGES` và `ALL_ARTICLES` | Nội dung CMS mới không tự có trong sitemap | CMS chưa sync URL registry với frontend |
| Media / image host bị allowlist code | `next.config.ts` chỉ cho phép vài domain cụ thể | Thêm CDN hoặc media host mới phải deploy code | CMS media library chưa đồng bộ với image pipeline |
| Alt text / caption / hero image hardcoded | `heroAlt`, `caption`, `summary`, `tags` đều nằm trong TS | Giảm khả năng tối ưu on-page SEO từ CMS | CMS chưa có media metadata chuẩn hóa |
| Internal linking / related content sinh trong code | `relatedSlugs` và related cards được nối từ mảng code | Không tối ưu theo category/topic mới | CMS chưa có taxonomy / relation model |
| Header / footer / contact info hardcoded | Logo, địa chỉ, hotline, social links lấy từ `diamond-vn.ts` | Khi đổi brand/contact phải sửa code | CMS chưa có global settings hoặc site settings |
| Mỗi thay đổi nội dung cần rebuild | Frontend hiện là static-first, nội dung đi từ source files | Publish chậm, không phù hợp workflow CMS | Chưa có data fetch layer từ CMS API hoặc ISR hợp chuẩn |

## 5) CMS nên có những field nào để frontend này vận hành đúng

| CMS entity | Field tối thiểu | Frontend sử dụng ở đâu |
| --- | --- | --- |
| Global settings | `siteName`, `logo`, `phone`, `email`, `addresses`, `socialLinks`, `defaultMetaTitle`, `defaultMetaDescription`, `defaultOgImage` | `layout.tsx`, `Header`, `Footer`, `Contact`, share preview |
| Page SEO | `slug`, `title`, `description`, `canonical`, `noindex`, `ogTitle`, `ogDescription`, `ogImage` | Home, about, contact, archive pages |
| Collection | `slug`, `label`, `title`, `description`, `eyebrow`, `heroImage`, `filters`, `ctaLabel`, `seoTitle`, `seoDescription` | `/du-an`, `/dich-vu`, `/tin-tuc` |
| Article / Project / Service item | `slug`, `category`, `title`, `summary`, `body`, `heroImage`, `heroAlt`, `publishedAt`, `updatedAt`, `tags`, `relatedItems`, `schemaType` | Detail pages, cards, JSON-LD, sitemap |
| Media asset | `url`, `alt`, `caption`, `credit`, `width`, `height`, `folder`, `tags` | Images, thumbnails, hero banners, logo |
| Navigation | `label`, `href`, `order`, `visible`, `target` | Header / footer menu |
| Schema settings | `type`, `author`, `publisher`, `organization`, `sameAs`, `faq`, `serviceArea` | JSON-LD output |

## 6) Kết luận ngắn

Frontend hiện tại phù hợp cho demo và marketing tĩnh, nhưng chưa phải kiến trúc CMS-ready theo chuẩn SEO đầy đủ.

Điểm nghẽn chính là:

- Nội dung đang nằm trong file TypeScript, không phải CMS.
- Metadata và OpenGraph phần lớn hardcoded hoặc build-time.
- Sitemap và JSON-LD chưa phát sinh từ nguồn CMS thật.
- Media, navigation và global settings chưa tách thành model quản trị.

Nếu bên CMS muốn chỉnh tổng quan source frontend mà không chạm code thường xuyên, cần ưu tiên tách 3 lớp sau:

- Lớp `Global settings` cho brand / contact / logo / social / default SEO.
- Lớp `Content models` cho page, article, project, service, collection.
- Lớp `SEO models` cho title, description, canonical, OG, schema, robots, sitemap.
