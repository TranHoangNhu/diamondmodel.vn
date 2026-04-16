# Tour Automation - CMS Happybook

Quy trình tự động hóa nhập liệu Tour lên CMS Happybook Travel.
**Trước khi đọc file này, hãy đọc `cms-common.md`.**

## Tổng Quan Quy Trình

```
1. Đọc file Sales PDF/Word từ Google Drive (qua skill google-drive)
2. Phân tích & tái cấu trúc content chuẩn SEO
3. Upload lên CMS qua agent-browser
```

## Nguồn Dữ Liệu

- **Google Drive:** Biến `DRIVE_COMBO_FOLDER_URL` từ `.env`
- **Skill hỗ trợ:** `google-drive` (đọc file), `pdf` (trích xuất PDF)
- **Công cụ thao tác:** `agent-browser` (automate browser)

## CMS Form: Tạo Tour

**URL:** Biến `CMS_TOUR_CREATE_URL` từ `.env`

> ⚠️ Không hardcode URL. Luôn đọc từ `.env`.

### Form Fields (Tab Tiếng Việt)

| Trường CMS | Lấy từ | Tối ưu SEO |
|------------|--------|------------|
| **Tiêu đề*** | File Sales | 50-65 ký tự, chứa keyword chính (Địa danh + Dịch vụ) |
| **Điểm đi / Điểm đến*** | Địa điểm trong tour | Tên tỉnh/thành |
| **Các địa điểm** | Lịch trình | Điểm nổi bật |
| **Số ngày / Số đêm*** | Đếm từ lịch trình | VD: 1 Ngày / 0 Đêm |
| **Phương tiện** | Mô tả trong chương trình | VD: Xe bus 2 tầng |

### Content SEO (BẮT BUỘC)

**TUYỆT ĐỐI KHÔNG copy nguyên văn từ PDF.** Phải viết lại theo chuẩn SEO:

1. **Xác định Focal Keywords** (2-3 từ khóa): VD: "Tour Hồ Chí Minh", "Xe bus 2 tầng"
2. **Tổng quan (Overview):**
   - 3-5 câu, mật độ từ khóa 2-3%
   - Keyword chính ở câu đầu tiên
3. **Lịch trình chi tiết:**
   - Dùng chức năng Thêm Ngày/Thêm Giờ trong DOM
   - Tiêu đề: PHẢI gắn brand/trải nghiệm (VD: "18:30 - Buffet trên Du Thuyền Indochina Queen")
   - Mô tả: Viết sinh động, có Call to Action
4. **Bao gồm / Không bao gồm:** Bullet format
5. **Bảng giá:** Người lớn / Trẻ em → Giá gốc + Giá khuyến mãi

### Hình Ảnh
- 2-3 ảnh từ Google Drive hoặc crop từ PDF
- Ảnh đại diện (Cover): chọn ảnh tổng quan
- Gallery: tối đa 10 ảnh

### Cấu Hình Trạng Thái (CRITICAL)

```python
# Dùng agent-browser:
# 1. Trạng thái → Ngừng kích hoạt
# 2. Tour hot → Ngừng kích hoạt
# 3. Upload Avatar + Gallery TRƯỚC khi Lưu (bắt buộc)
```

## Kỹ Thuật Thao Tác Với Agent-Browser

Khi dùng `agent-browser` thay vì Playwright script:

```bash
# Fill text field
npx agent-browser fill "#name_vi" "Tour Hồ Chí Minh 1 Ngày"

# Click button
npx agent-browser click "button[type='submit']"

# Execute JS (Select2, iCheck)
npx agent-browser eval "jQuery('#location_id').val('5').trigger('change');"

# Upload file
npx agent-browser fill "input#fileupload" --file "/path/to/image.jpg"

# Wait for load
npx agent-browser wait --load networkidle

# Screenshot for debugging
npx agent-browser screenshot "debug.png"
```

### Lưu Ý Agent-Browser

- Mỗi lệnh `eval` cần `--stdin <<'EVALEOF' ... EVALEOF` cho JS dài
- Luôn `wait --load networkidle` sau navigation
- Dùng `snapshot -i` để kiểm tra DOM hiện tại

## Kết Quả Thực Tế

✅ **Tour HCM Bus 2 Tầng** — 09/03/2026
- Tạo thành công qua agent-browser
- Trạng thái: Ngừng kích hoạt ✓
- Tour hot: Ngừng kích hoạt ✓
