# Combo Automation - CMS Happybook

Đây là hướng dẫn kỹ thuật **đã được xác thực** để tự động tạo Combo trên CMS.

**Trước khi bắt đầu xây dựng, hãy đọc `cms-common.md`.**

## Tổng Quan Nhóm Dữ Liệu

Combo KHÔNG có bảng thông tin "Lịch Trình" (Itinerary) hay "Phòng" (Rooms). Thay vào đó, Combo là một thực thể bao bọc lấy một **Khách Sạn (Hotel ID)** đã được tạo trước đó trên CMS.

```
Nguồn dữ liệu:  JSON hoặc Google Drive (PDF Sales combo)
                     ↓
                 Khớp tên Hotel với product_hotel_id
                     ↓
                 Upload lên CMS (Draft)
```

## Các Trường Dữ Liệu Quan Trọng (Form Fields)

URL Tạo Combo: `https://cms.happybooktravel.com/product-combos/create`

| Trường | Selector / ID | Cách Thao Tác | Ý nghĩa / Giá trị mẫu |
|--------|---------------|---------------|-----------------------|
| Tên Combo | `#name_vi` | `page.fill` | VD: "Combo 3N2Đ Vinpearl Resort" |
| Điểm khởi hành | `#start_location` | `Select2 jQuery` | `1`: Hà Nội, `2`: Hồ Chí Minh... |
| Điểm đến | `#destination_location` | `Select2 jQuery` | Thường là `5` (Phú Quốc) |
| Phương tiện | `#transportation` | `Select2 jQuery` | `1`: Ô tô, `2`: Máy bay, `3`: Cả 2 |
| **Khách sạn ID** (Quan trọng) | `#product_hotel_id` | `Select2 jQuery` | Trỏ tới ID Khách sạn đã có trên hệ thống. PHẢI cào options trước và match tên khách sạn. |
| Thời gian | `#combo_number_day`, `#combo_number_night` | `page.fill` | Số Ngày và Đêm (input type number) |
| Giá Combo | `#price`, `#discount_price` (chú ý selector `#price`) | `page.fill` | Nhập dạng số không có dấu phẩy |
| Hình ảnh (Avatar) | `#fileupload` | `set_input_files` | Hình đại diện |
| Khác (Gallery) | `#products_images` | `Fetch API` + `DOM Inject` | Xem `cms-common.md` (giống Tour/Hotel) |
| Mô tả & Phụ thu | CKEditor: `description`, `requirements` | `setData()` API | Chi tiết giới thiệu và các quy định phụ thu |

## Chiến Lược Xử Lý Kỹ Thuật

**1. Liên kết Khách Sạn (Matching Hotel):**
Bởi vì select `#product_hotel_id` chứa danh sách Khách sạn do CMS cấp ID (vd: `1720`), Autofill Script PHẢI chạy đoạn JS để vét toàn bộ options của thẻ select này:
```javascript
const opts = Array.from(document.querySelector('#product_hotel_id').options);
return opts.map(o => ({id: o.value, text: o.text.trim()}));
```
Sau đó, script dùng Python để so khớp (fuzzy match) tên Khách Sạn trong file JSON với danh sách trên CMS, để tìm ID chính xác mà inject.

**2. Giao tiếp CKEditor:**
Combo có 2 textarea chính:
- `description`: Mô tả combo
- `requirements`: Các yêu cầu/phụ thu
Dùng `CKEDITOR.instances['description'].setData(...)` để điền y như các module khác.

**3. Khởi Tạo Combo Mẫu (autofill_combo_cms.py):**
Chúng ta sẽ áp dụng các hàm tái sử dụng tương tự `autofill_hotel_cms.py`.
- Upload thư viện Fetch API
- Loop JSON
- Set Draft by default (radio status = 0).

---

## ⚠️ Checklist Triển Khai

- [x] Đã quét toàn bộ DOM tại trang Tạo Combo
- [x] Đã trích xuất cấu trúc Dropdown (Location, Transport, Hotel)
- [ ] Xây dựng file JSON `combo_contents.json` định dạng chuẩn
- [ ] Viết script `autofill_combo_cms.py` tự động map thông tin vào CMS
