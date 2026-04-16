---
name: auto-fill-hotel-skill
description: >-
  Tự động hóa quá trình tạo sản phẩm Khách sạn trên CMS Happybook Travel
  bằng Playwright. Bao gồm scraping Booking.com, download ảnh, và upload
  toàn bộ lên CMS (avatar, gallery, phòng, SEO meta) dưới dạng bản nháp.
  Sử dụng khi được yêu cầu "thêm khách sạn", "upload khách sạn lên CMS",
  "fill hotel", "autofill hotel", hoặc bất kỳ tác vụ nào liên quan đến
  nhập liệu khách sạn vào hệ thống Happybook CMS.
---

# Tự Động Tải Khách Sạn Lên CMS Happybook (Playwright)

Skill này hướng dẫn toàn bộ quy trình 3 bước: **Scrape → Download Ảnh → Upload CMS**.
Đã được kiểm chứng thành công **9/9 khách sạn** vào ngày 14/03/2026.

## Kiến Trúc Tổng Quan

```
Quy trình:  Booking.com URLs
                ↓
            scrape_content_playwright.py  →  hotel_contents.json
                ↓
            crawl_all_room_names.py       →  hotel_rooms.json (Tên phòng Tiếng Anh)
                ↓
            download_images.py            →  hotel_images/<tên KS>/*.jpg
                ↓
            autofill_hotel_cms.py         →  CMS product-hotel (Draft)
```

**File được sử dụng:**

| File | Vai trò |
|------|---------|
| `scrape_content_playwright.py` | Crawl Booking.com → tạo `hotel_contents.json` |
| `crawl_all_room_names.py` | Script phụ: Tìm tên phòng chi tiết → `hotel_rooms.json` |
| `download_images.py` | Tải ảnh từ links trong file `.md` → `hotel_images/` |
| `autofill_hotel_cms.py` | **Script chính** — Upload lên CMS |
| `hotel_contents.json` | Data JSON chứa title, stars, description, SEO meta |
| `hotel_rooms.json` | Data JSON định dạng `{"Tên KS": ["Room 1", "Room 2"]}` |
| `hotel_images/` | Thư mục chứa ảnh phân theo tên khách sạn |

## Bước 1: Scrape Nội Dung Từ Booking.com

**Script:** `scrape_content_playwright.py`

- Nhận danh sách URLs Booking.com
- Trích xuất: Title, Số sao, Mô tả, Vị trí
- **Sanitize SEO:** Thay "Booking.com" → "Happybook"
- Tạo: Meta Title, Meta Description, Meta Keywords
- **Output:** `hotel_contents.json`

### Cấu trúc JSON:
```json
{
  "url": "https://www.booking.com/hotel/vn/...",
  "title": "Tên khách sạn",
  "location": "Phú Quốc, Việt Nam",
  "stars": 5,
  "description": "<h3>...</h3><p>...</p>",
  "meta_title": "Tên KS | Đặt phòng giá rẻ Happybook",
  "meta_desc": "...",
  "meta_keywords": "đặt phòng ..., happybook"
}
```

## Bước 2: Download Ảnh & Quản Lý File

**Script:** `download_images.py`

- Đọc file Markdown chứa image links (định dạng `[name](url)`)
- Tải về thư mục `hotel_images/<Tên khách sạn>/`
- Đặt tên: `01_link-avatar.jpg`, `02_link-hinh-1.jpg`, `12_link-phong-1.jpg`

### Quy ước kiểm tra folder:
Do Booking.com có thể để tên KS khác với file JSON, **PHẢI** map chính xác tên folder trước khi chạy Autofill. Hệ thống sẽ:
1. Tra cứu trong biến `FOLDER_MAP` (Map cứng "Tên JSON" → "Tên Folder Thực Tế").
2. Hoặc Fuzzy logic (nếu map không có).

### Regex nhận diện ảnh:
- **`01_*avatar*`** → Ảnh đại diện (Avatar)
- **`*phong*` hoặc `*phòng*`** → Ảnh phòng (Room images — cẩn thận dấu tiếng Việt)
- **Còn lại** → Gallery (tối đa 10 ảnh)

## Bước 3: Upload Lên CMS (Script Chính)

**Script:** `autofill_hotel_cms.py`

### Biến môi trường (`.env`):
```
CMS_USERNAME=admin@...
CMS_PASSWORD=***
```

### Các URL CMS:
- Login: `https://cms.happybooktravel.com/login`
- Tạo KS: `https://cms.happybooktravel.com/product-hotel/create`
- Upload ảnh: `https://cms.happybooktravel.com/upload-temp?object=tours`

---

## ⚠️ Kỹ Thuật Quan Trọng (Lessons Learned)

Đây là các "bẫy" đã gặp và cách giải quyết — **PHẢI tuân theo** để tránh lỗi:

### 1. Upload Ảnh: Dùng Fetch API, KHÔNG dùng CKFinder

CMS dùng jQuery File Upload plugin + CKFinder, nhưng `set_input_files` cho avatar 
chỉ hoạt động với `#fileupload`. Với Gallery và Room, **phải dùng Fetch API**:

```python
# Encode file → base64 → đẩy qua window variable → fetch()
page.evaluate(f"window.__upload_b64 = '{b64_data}';")
page.evaluate(f"window.__upload_fname = '{fname}';")
result = page.evaluate("""
    async () => {
        const b64 = window.__upload_b64;
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        const fd = new FormData();
        fd.append('files[]', blob, window.__upload_fname);
        const token = document.querySelector('input[name="_token"]')?.value;
        const resp = await fetch('/upload-temp?object=tours', {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': token },
            body: fd
        });
        return await resp.json();
    }
""")
# Response: {"files": [{"name": "tmp/tours/abc123.jpg"}]}
```

### 2. Gallery: Inject Hidden Inputs Vào DOM

Sau khi upload, tạo `<input type="hidden" name="products_images[]">` thủ công:

```python
page.evaluate(f"""
    var container = document.querySelector('#list');
    var span = document.createElement('span');
    span.className = 'image-output';
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'products_images[]';
    input.value = '{server_path}';
    span.appendChild(input);
    container.appendChild(span);
""")
page.evaluate("document.querySelector('#products_images_is_change').value = '1';")
```

### 3. Room: Phối hợp `hotel_rooms.json` và Inject DOM

**Nguyên nhân lỗi Cũ:** Modal phòng dùng CKEditor cho `#room_description`. Khi serialize, nó trả về `[object HTMLTextAreaElement]` thay vì nội dung → Server reject. Đồng thời tên phòng bị gán cứng (`"Phong 1"`) thiếu chuyên nghiệp.

**Giải pháp MỚI:**
1. Crawl trước danh sách hạng phòng Tiếng Anh từ Booking.com bằng `crawl_all_room_names.py` (Lưu vào `hotel_rooms.json`).
2. Trong lúc tạo KS (`autofill_hotel_cms.py`), đọc `hotel_rooms.json` và gán tên phòng tiếng Anh tương ứng với ảnh.
3. Bỏ qua modal CMS hoàn toàn, inject trực tiếp `<tr>` với các hidden inputs xuống `#list` table. Lưu ý mô tả phòng sử dụng chuỗi tiếng Việt **có dấu**.

```python
# Lấy tên phòng từ JSON
room_name = hotel_room_names[r_idx] if r_idx < len(hotel_room_names) else f"Room {r_idx + 1}"
room_desc = "Phòng thiết kế sang trọng, đầy đủ tiện nghi hiện đại."

page.evaluate(f"""
    (function() {{
        var j = '{timestamp}';
        var html = `
        <tr class="item item_${{j}}">
            <td class="stt">{r_idx + 1}</td>
            <td><span class="roomName">{room_name}</span></td>
            ...
            <input type="hidden" class="room_name" value="{room_name}" name="room[${{j}}][name]">
            <input type="hidden" class="image_location" value="{img}" name="room[${{j}}][image_location]">
            <input type="hidden" class="room_price" value="{price}" name="room[${{j}}][price]">
            <input type="hidden" class="room_discount_price" value="{dprice}" name="room[${{j}}][discount_price]">
            <input type="hidden" class="room_description" value="{room_desc}" name="room[${{j}}][room_description]">
        </tr>`;
        document.querySelector('.object_relationship_list tbody')
            .insertAdjacentHTML('beforeend', html);
    }})();
""")
```

### 4. Select2 & iCheck: Dùng jQuery

```python
# Select2 dropdown
page.evaluate("jQuery('#star').val('5').trigger('change');")

# Select2 multi-select
page.evaluate("jQuery('#hotel_amenities_ids').val(['1','2','3']).trigger('change');")

# iCheck radio (click parent div)
page.evaluate("""
    var s = document.querySelector('input[name="status"][value="0"]');
    if(s) s.parentElement.click();
""")
```

### 5. CKEditor Description: setData() API

```python
page.evaluate(f"""
    if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances['about']) {{
        CKEDITOR.instances['about'].setData('{escaped_html}');
    }}
""")
```

### 6. SEO Meta: Set Bằng JS (Section Bị Ẩn)

```python
page.evaluate(f"""
    document.querySelector('#meta_title').value = '{meta_title}';
    document.querySelector('#meta_description').value = '{meta_desc}';
    document.querySelector('#meta_keywords').value = '{meta_kw}';
""")
```

### 7. Submit: Dùng expect_response

```python
with page.expect_response(
    lambda r: "product-hotel" in r.url and r.request.method == 'POST',
    timeout=15000
) as resp_info:
    page.click("button:has-text('Lưu lại')")
res = resp_info.value
body = res.text()
success = '"rs":1' in body  # {"rs":1,"msg":"Thêm mới thành công"}
```

### 8. Trạng thái: BẮT BUỘC Draft

Mọi khách sạn phải **Ngừng kích hoạt** (status=0, is_featured=0).
User sẽ review và kích hoạt thủ công sau.

---

## CMS Field Mapping

| Trường CMS | Selector / ID | Cách thao tác |
|------------|---------------|---------------|
| Tên KS | `#name_vi` | `page.fill()` |
| Danh mục | `#category_id` | jQuery Select2 |
| Số sao | `#star` | jQuery Select2 |
| Loại cư trú | `#residence_type_ids` | jQuery Select2 multi |
| Tiện nghi KS | `#hotel_amenities_ids` | jQuery Select2 multi |
| Dịch vụ KS | `#hotel_amenity_service_ids` | jQuery Select2 multi |
| Địa điểm | `#location_id` | jQuery Select2 |
| Tiền tệ | `#currency_id` | jQuery Select2 |
| Avatar | `#fileupload` | `set_input_files()` |
| Gallery | `#products_images` | Fetch API + DOM inject |
| Mô tả | CKEditor `about` | `setData()` |
| Địa chỉ | `#address` | JS `.value` |
| Trạng thái | `input[name="status"]` | iCheck click parent |
| Hotel hot | `input[name="is_featured"]` | iCheck click parent |
| Meta Title | `#meta_title` | JS `.value` |
| Meta Desc | `#meta_description` | JS `.value` |
| Meta KW | `#meta_keywords` | JS `.value` |
| Phòng | `.object_relationship_list tbody` | Direct TR inject |

## Kết Quả Đạt Được

✅ **9/9 khách sạn Phú Quốc** đã upload thành công dưới dạng Draft (14/03/2026):
Wyndham Grand, Mövenpick, Premier Residences, SOL by Meliá, Wyndham Garden,
Muong Thanh Luxury, Aquasun, An Phu, Praha Hotel.
