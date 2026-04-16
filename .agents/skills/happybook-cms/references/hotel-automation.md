# Hotel Automation - CMS Happybook

Quy trình tự động hóa upload Khách sạn lên CMS Happybook Travel.
**Trước khi đọc file này, hãy đọc `cms-common.md`.**

## Tổng Quan Quy Trình

```
1. Scrape Booking.com URLs  → hotel_contents.json
2. Crawl tên phòng Tiếng Anh → hotel_rooms.json
3. Download hình ảnh         → hotel_images/<tên KS>/*.jpg
4. Upload lên CMS            → autofill_hotel_cms.py (Draft)
```

## Scripts

| Script | Chức năng |
|--------|-----------|
| `scrape_content_playwright.py` | Crawl Booking.com → `hotel_contents.json` |
| `crawl_all_room_names.py` | Crawl tên phòng Tiếng Anh → `hotel_rooms.json` |
| `download_images.py` | Tải ảnh từ markdown links → `hotel_images/` |
| `autofill_hotel_cms.py` | **Script chính** — Upload batch lên CMS |

## Data Schema: `hotel_rooms.json`

Lưu tên phòng Tiếng Anh cho mỗi KS, dùng để inject vào CMS thay vì generic "Phong 1".

```json
{
  "Wyndham Garden Grandworld Phu Quoc": [
    "Superior King Room",
    "Superior Twin Room",
    "Superior Twin Room with Pool View"
  ]
}
```

## FOLDER_MAP (Ánh xạ tên KS → tên folder ảnh)

Do tên KS trong `hotel_contents.json` có thể khác tên folder trên ổ cứng (dấu, viết hoa, viết tắt), nên PHẢI dùng map cứng:

```python
FOLDER_MAP = {
    "Wyndham Grand Phu Quoc": None,  # Không có folder ảnh
    "Mövenpick Resort Waverly Phu Quoc": "Movenpick Resort Waverly Phu Quoc",
    "Premier Residences Phu Quoc Emerald Bay Managed by Accor": "Premier Residences Phu Quoc",
    "SOL by Meliá Phu Quoc": "Sol by Meliá Phu Quoc",
    "Muong Thanh Luxury Phu Quoc Hotel": "Muong Thanh Luxury Phu Quoc",
    "Wyndham Garden Grandworld Phu Quoc": "Wyndham Garden Grandworld Phu Quoc",
    "An Phu Hotel": "An Phu Hotel Phu Quoc",
    "Aquasun Hotel Phu Quoc": "Aquasun Hotel Phu Quoc",
    "Praha Hotel": "Praha Hotel Phu Quoc",
}
```

> ⚠️ **Bẫy kỹ thuật:** Key phải trùng KHỚP CHÍNH XÁC với trường `title` trong `hotel_contents.json`.

## Data Schema: `hotel_contents.json`

```json
[{
  "url": "https://www.booking.com/hotel/vn/...",
  "title": "Tên khách sạn",
  "location": "Phú Quốc, Việt Nam",
  "stars": 5,
  "description": "<h3>...</h3><p>Mô tả HTML</p>",
  "meta_title": "Tên KS | Đặt phòng giá rẻ Happybook",
  "meta_desc": "Tận hưởng kỳ nghỉ...",
  "meta_keywords": "đặt phòng ..., happybook"
}]
```

## Cấu Trúc Ảnh: `hotel_images/<Tên KS>/`

| Pattern tên file | Loại ảnh | Cách dùng |
|------------------|----------|-----------|
| `01_*` hoặc `*avatar*` | Avatar (đại diện) | `set_input_files('#fileupload')` |
| `*phong*` hoặc `*phòng*` | Ảnh phòng (Room) | Upload via Fetch → Inject vào room TR |
| Còn lại | Gallery | Upload via Fetch → Inject hidden inputs |

> ⚠️ **Bẫy dấu tiếng Việt:** Folder ảnh cũ dùng `phòng` (có dấu `ò`), Wyndham Garden mới crawl dùng `phong` (không dấu). Script phải check CẢ HAI.

## CMS Form: Tạo Khách Sạn

**URL:** `https://cms.happybooktravel.com/product-hotel/create`

### Field Mapping

| Trường | Selector | Kỹ thuật | Ghi chú |
|--------|----------|----------|---------|
| Tên | `#name_vi` | `page.fill()` | Bắt buộc |
| Alias | Readonly | Bỏ qua | Tự sinh |
| Danh mục | `#category_id` | Select2 | `'12'` = Trong nước |
| Số sao | `#star` | Select2 | `'3'` đến `'5'` |
| Loại cư trú | `#residence_type_ids` | Select2 multi | Bắt buộc |
| Tiện nghi KS | `#hotel_amenities_ids` | Select2 multi | Bắt buộc |
| Dịch vụ KS | `#hotel_amenity_service_ids` | Select2 multi | |
| Địa điểm | `#location_id` | Select2 | `'5'` = Phú Quốc |
| Tiền tệ | `#currency_id` | Select2 | `'1'` = VND |
| Mô tả | CKEditor `about` | `setData()` | HTML content |
| Địa chỉ | `#address` | JS `.value` | |
| Avatar | `#fileupload` | `set_input_files()` | Bắt buộc |
| Gallery | `#products_images` | Fetch API + DOM | Max 10 ảnh |
| Trạng thái | `input[name=status]` | iCheck parent click | Bắt buộc = 0 |
| KS Hot | `input[name=is_featured]` | iCheck parent click | Bắt buộc = 0 |
| Meta Title | `#meta_title` | JS `.value` | Section ẩn |
| Meta Desc | `#meta_description` | JS `.value` | Section ẩn |
| Meta KW | `#meta_keywords` | JS `.value` | Section ẩn |

### Tham khảo giá trị CMS

```python
LOCATION_PHU_QUOC = "5"
CATEGORY_TRONG_NUOC = "12"
CURRENCY_VND = "1"
RESIDENCE_KHACH_SAN = "2"
DEFAULT_AMENITIES = ["1", "2", "3", "4", "5", "6", "8", "10", "12"]
DEFAULT_SERVICES = ["1", "2", "5", "10", "14"]
```

## Phòng: Direct Injection (CRITICAL)

**KHÔNG mở modal "Thêm mới".** CKEditor `room_description` serialize lỗi.

Inject trực tiếp vào `.object_relationship_list tbody`:

```python
timestamp = str(int(time.time() * 1000))
page.evaluate(f"""
    (function() {{
        var j = '{timestamp}';
        var html = `
        <tr class="item item_${{j}}">
            <td class="stt">1</td>
            <td><span class="roomName">{room_name}</span></td>
            <td><span class="roomPrice">{price}</span></td>
            <td><span class="roomDiscountPrice">{discount}</span></td>
            <td>
                <a class="edit_position_images" href="javascript:void(0)" data-item="${{j}}">
                    <span class="glyphicon glyphicon-edit"></span>
                </a>
                <a class="remove_object_relation" href="javascript:void(0)">
                    <span class="glyphicon glyphicon-trash"></span>
                </a>
            </td>
            <input type="hidden" class="room_name" value="{room_name}" name="room[${{j}}][name]">
            <input type="hidden" class="image_location" value="{room_img_path}" name="room[${{j}}][image_location]">
            <input type="hidden" class="room_price" value="{price}" name="room[${{j}}][price]">
            <input type="hidden" class="room_discount_price" value="{discount}" name="room[${{j}}][discount_price]">
            <input type="hidden" class="room_description" value="{desc}" name="room[${{j}}][room_description]">
        </tr>`;
        document.querySelector('.object_relationship_list tbody')
            .insertAdjacentHTML('beforeend', html);
        document.querySelector('.object_relationship_list').style.display = '';
    }})();
""")
```

## Validate (Server Response)

```
POST /product-hotel → {"rs":1,"msg":"Thêm mới thành công"} = OK
POST /product-hotel → {"rs":0,"msg":"..."} = FAIL

Nguyên nhân fail phổ biến:
- room_description = "[object HTMLTextAreaElement]" → Dùng modal thay vì inject
- image_location rỗng → Avatar chưa upload
- hotel_amenities_ids rỗng → Select2 multi chưa trigger change
```

## Kết Quả Thực Tế

✅ **8/9 khách sạn Phú Quốc** thành công — 14/03/2026 (Wyndham Grand bỏ qua do không có ảnh)

| KS | Gallery | Phòng (Ảnh) | Phòng (Tên Tiếng Anh) |
|----|---------|-------------|----------------------|
| Mövenpick Resort Waverly | 10 | 4 | Superior Twin/King Room... (6 tên) |
| Premier Residences Emerald Bay | 10 | 4 | Standard Twin, Superior King Suite... (5 tên) |
| SOL by Meliá | 10 | 4 | Standard Room, Superior Room... (6 tên) |
| Wyndham Garden Grandworld | 10 | 3 | Superior King/Twin Room... (3 tên) |
| Muong Thanh Luxury | 10 | 4 | Deluxe Twin/King Room... (4 tên) |
| Aquasun Hotel | 10 | 4 | Double/Twin Room... (5 tên) |
| An Phu Hotel | 10 | 4 | Standard/Superior Double/Twin... (7 tên) |
| Praha Hotel | 10 | 4 | Standard/Deluxe/Family Room (3 tên) |
