---
name: cms-tour-mapping
description: Automation instructions for mapping and importing tour data from Google Drive Sales PDF files into the Happybook Travel CMS. Use when asked to construct, fill, or upload tours to the CMS.
---

# Hướng Dẫn Nhập Liệu Sản Phẩm Tour (Từ Sales File lên CMS)

Tài liệu này là bộ nguyên tắc (Skill) hướng dẫn Agent hoặc người dùng cách đọc thông tin từ file cấu hình của bộ phận Sales (trên Google Drive) và nhập liệu tự động/thủ công chuẩn xác vào hệ thống CMS Happybook Travel.

> **Lưu ý:** Các trường có dấu (*) là bắt buộc trên hệ thống CMS.

## 1. Mở xem dữ liệu Sales
**Nguồn:** Google Drive (Sử dụng skill `google-drive` hoặc xem trực tiếp).
**Hướng dẫn truy cập:** Đọc biến `DRIVE_COMBO_FOLDER_URL` từ file `.env` ở thư mục gốc để lấy link thư mục chứ không dùng link cố định.
Truy cập vào File PDF/Word mô tả tour trong link Folder đã tải. Đọc quét (extract text) để lấy các thông tin chính yếu trước.

## 2. Điền Form Cơ Bản (Tab Tiếng Việt) tại CMS
**Chứng thực:** Lấy định danh `CMS_USERNAME` & `CMS_PASSWORD` từ file `.env` để tiến hành đăng nhập.
Truy cập CMS sử dụng `agent-browser` qua link từ biến `CMS_TOUR_CREATE_URL` trong file `.env`.

| Trường trên CMS | Lấy từ File Sales (Drive) & Tối ưu SEO | Ví dụ cụ thể |
| --- | --- | --- |
| **Tiêu đề*** | **Tối ưu SEO:** Phải chứa từ khóa chính (Địa danh + Dịch vụ). Không bê nguyên tên nội bộ từ PDF. Giới hạn 50-65 ký tự. | `Tour Hồ Chí Minh 1 Ngày - Ngắm Cảnh Xe Bus 2 Tầng & Buffet Du Thuyền` |
| **Điểm đi / Điểm đến***| Dựa vào địa điểm thực hiện tour | `Hồ Chí Minh` |
| **Các địa điểm** | Các điểm nối bật trong lịch trình | `Bưu điện Trung tâm, Bến Bạch Đằng` |
| **Số ngày / Số đêm*** | Tra cứu ở phần giới thiệu hoặc đếm theo lịch trình | `1 Ngày` / `0 Đêm` |
| **Phương tiện đi lại** | Xem phương tiện nhắc đến trong chương trình | `Xe bus 2 tầng`, `Du thuyền` |

## 3. Quá Trình Tái Cấu Trúc Content (Chuẩn SEO)

Hệ thống bắt buộc phải áp dụng nguyên tắc SEO (skill `seo-content-optimizer`) để viết lại nội dung, **TUYỆT ĐỐI KHÔNG COPY Y HỆT TỪ FILE PDF**. Nội dung cần đảm bảo Trải nghiệm Người Dùng (UX) và Tối ưu Công cụ Tìm kiếm.

### 3.1. Phân tích Keyword (Bắt buộc)
*   Trước khi viết, xác định 2-3 **Từ khóa mục tiêu (Focal Keywords)** liên quan đến tour.
*   **Ví dụ:** `Tour Hồ Chí Minh`, `Xe bus 2 tầng Sài Gòn`, `Ăn tối du thuyền Indochina Queen`.

### 3.2. Tổng quan (Overview)
*   **Cách làm:** Viết mới một đoạn 3-5 câu (chuẩn User Experience).
*   **Yêu cầu SEO:** Mật độ từ khóa đạt 2-3%. Bắt buộc chèn Keyword chính ngay ở câu đầu tiên.
*   **Ví dụ:** "Khám phá vẻ đẹp rực rỡ của Sài Gòn về đêm với **Tour Hồ Chí Minh 1 ngày** độc đáo. Hành trình kết hợp hoàn hảo giữa trải nghiệm ngắm cảnh toàn thành phố trên không gian mở của **xe bus 2 tầng** và thưởng thức **buffet tối sang trọng tại du thuyền Indochina Queen** hoa lệ..."

### 3.3. Lịch trình chi tiết (Itinerary Builder)
Sử dụng chức năng Thêm Ngày/Thêm Giờ (Add item) trong DOM.
*   **Tiêu đề Lịch trình:** KHÔNG chỉ ghi hành động thô (VD: 18:30 - Ăn tối). BẮT BUỘC gắn tag trải nghiệm hoặc tên thương hiệu để tăng SEO (VD: `18:30 - Thưởng thức Buffet Tối trên Du Thuyền Indochina Queen`).
*   **Mô tả Lịch trình:** Viết lại sinh động, thuyết phục nhằm kích thích hành động (Call to Action/Sale).

### 3.4. Quy định dịch vụ
*   **Bao gồm (Inclusions):** Lọc danh sách "Giá tour bao gồm" từ file PDF (Ví dụ: Vé xe bus, Buffet, Bảo hiểm...). Dùng danh sách (bullet format) để dễ đọc.
*   **Không bao gồm (Exclusions):** Lọc danh sách "Giá chưa bao gồm" (Thuế VAT, Nước uống ngoài menu...). Dùng danh sách (bullet format).

## 4. Bảng Giá & Hình Ảnh (Tab Gallery & Price)

### Thiết lập giá
1. Quét đến cuối dữ liệu file PDF để tìm bảng **Giá niêm yết**.
2. Phân tách rõ giá cho **Người Lớn** và giá cho **Trẻ Em** theo đúng độ tuổi quy định trong file.
3. Nhập vào mục `Giá gốc` và `Giá Cửa Hàng / Khuyến Mãi` tương ứng trên bảng CMS.

### Hình đại diện (Thumbnails)
1. Tải về 2-3 bức ảnh đẹp nhất từ Google Drive (hoặc crop từ file PDF).
2. Ảnh đại diện (Cover) chọn ảnh tổng quan (VD: Hình xe bus đỏ hoặc Du Thuyền lộng lẫy).
3. Đăng tải vào mục **Gallery** tối đa 10 ảnh. Bắt buộc phải 1 ảnh thiết lập làm Cover.

## 5. Cấu hình Cài đặt & Lưu (CRITICAL)
1. Trong form điền, tìm mục **Trạng thái** và tích chọn **Ngừng kích hoạt** (Tránh public tour khi chưa hoàn thiện).
2. Tìm mục **Tour hot** và tích chọn **Ngừng kích hoạt**.
3. **Lưu ý quan trọng:** Hệ thống yêu cầu bắt buộc phải upload Hình đại diện (Avatar) và Hình Gallery trước khi lưu. Nếu bỏ trống, quá trình **Lưu lại** sẽ báo lỗi và bị chặn.
