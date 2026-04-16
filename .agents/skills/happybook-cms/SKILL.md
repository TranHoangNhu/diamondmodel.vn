---
name: happybook-cms
description: >-
  Master skill tự động hóa CMS Happybook Travel (cms.happybooktravel.com).
  Bao gồm quản lý Tour, Khách sạn, và Combo. Sử dụng khi được yêu cầu
  "thêm tour", "thêm khách sạn", "thêm combo", "upload sản phẩm lên CMS",
  "fill CMS", "autofill CMS", "nhập liệu CMS", hoặc bất kỳ tác vụ nào
  liên quan đến tạo/chỉnh sửa sản phẩm du lịch trên hệ thống Happybook.
  Cũng dùng khi cần hiểu cấu trúc form, selectors, hoặc cách thao tác
  jQuery/CKEditor trên CMS này.
---

# Happybook CMS - Master Automation Skill

Skill tổng hợp mọi kiến thức và kỹ thuật để tự động hóa CMS Happybook Travel.
Được thiết kế theo kiến trúc **module** để dễ mở rộng thêm sản phẩm mới (Combo, Visa...).

## Kiến Trúc

```
happybook-cms/
├── SKILL.md                    ← Bạn đang đọc file này
└── references/
    ├── cms-common.md           ← Kỹ thuật chung (Login, Upload, iCheck, Select2...)
    ├── hotel-automation.md     ← Quy trình + Kỹ thuật Khách sạn
    ├── tour-automation.md      ← Quy trình + Kỹ thuật Tour
    └── combo-automation.md     ← [PLACEHOLDER] Quy trình Combo (chưa triển khai)
```

## Khi Nào Đọc File Nào?

| Yêu cầu của User | Đọc file |
|-------------------|----------|
| Thêm/upload **Khách sạn** | `references/cms-common.md` + `references/hotel-automation.md` |
| Thêm/upload **Tour** | `references/cms-common.md` + `references/tour-automation.md` |
| Thêm/upload **Combo** | `references/cms-common.md` + `references/combo-automation.md` |
| Hỏi về cách thao tác CMS nói chung | `references/cms-common.md` |
| Debug lỗi upload ảnh, form, CKEditor | `references/cms-common.md` |

> **⚠️ Bắt buộc:** Luôn đọc `cms-common.md` trước khi đọc file cụ thể.

## Tổng Quan Nhanh

### CMS URLs
| Tính năng | URL |
|-----------|-----|
| Login | `https://cms.happybooktravel.com/login` |
| Tạo Khách sạn | `https://cms.happybooktravel.com/product-hotel/create` |
| Tạo Tour | Dùng biến `CMS_TOUR_CREATE_URL` từ `.env` |
| Upload ảnh tạm | `https://cms.happybooktravel.com/upload-temp?object=tours` |

### Biến Môi Trường (`.env`)
```
CMS_USERNAME=admin@...
CMS_PASSWORD=***
CMS_TOUR_CREATE_URL=https://cms.happybooktravel.com/...
DRIVE_COMBO_FOLDER_URL=https://drive.google.com/...
```

### Nguyên Tắc Vàng
1. **Luôn save Draft** — `status=0`, `is_featured=0`. User review + kích hoạt sau.
2. **Upload ảnh qua Fetch API** — Không dùng CKFinder. Inject hidden inputs vào DOM.
3. **CKEditor dùng `setData()`** — Không set `.value` trực tiếp trên textarea.
4. **Select2 dùng jQuery `.val().trigger('change')`** — Không dùng Playwright `select_option`.
5. **iCheck radio dùng `.parentElement.click()`** — Không dùng Playwright `check()`.
6. **Room dùng Direct Injection** — Không mở modal → tránh CKEditor serialize bug.
7. **SEO Meta set bằng JS** — Section có thể bị collapsed, `page.fill()` sẽ timeout.

### Scripts Hiện Có

| Script | Nằm ở | Chức năng |
|--------|-------|-----------|
| `autofill_hotel_cms.py` | Root project | Upload batch khách sạn từ JSON |
| `autofill_combo_cms.py` | Root project | Upload batch combo từ JSON |
| `scrape_content_playwright.py` | Root project | Crawl Booking.com → JSON |
| `crawl_all_room_names.py` | Root project | Crawl tên phòng Tiếng Anh → `hotel_rooms.json` |
| `download_images.py` | Root project | Tải ảnh từ link Markdown |

### Kết Quả Đã Đạt
- ✅ **8/9 Khách sạn Phú Quốc** upload thành công với tên phòng Tiếng Anh (14/03/2026)
- ✅ **Combo 3N2Đ Wyndham Garden** upload thành công (14/03/2026)
- ✅ **Tour HCM** tạo thành công qua agent-browser (09/03/2026)
