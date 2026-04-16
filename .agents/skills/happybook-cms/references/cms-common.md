# CMS Happybook - Kỹ Thuật Chung

Tài liệu này chứa các kỹ thuật nền tảng áp dụng cho MỌI loại sản phẩm
trên CMS Happybook Travel. Đọc file này TRƯỚC KHI đọc file sản phẩm cụ thể.

## 1. Đăng Nhập

```python
from dotenv import load_dotenv
load_dotenv()
USERNAME = os.environ.get("CMS_USERNAME")
PASSWORD = os.environ.get("CMS_PASSWORD")

page.goto("https://cms.happybooktravel.com/login")
page.fill("input[name='email']", USERNAME)
page.fill("input[name='password']", PASSWORD)
page.click("button[type='submit']")
page.wait_for_load_state("networkidle")
```

## 2. Upload Ảnh Qua Fetch API

CMS dùng jQuery File Upload + CKFinder. Playwright `set_input_files` chỉ hoạt động
ổn định với **Avatar** (`#fileupload`). Với **Gallery** và **Room**, PHẢI dùng Fetch API.

### Vì sao?
- `set_input_files` không trigger đúng jQuery events cho gallery/room
- CKFinder modal rất khó automate
- Fetch API nhanh hơn và đáng tin cậy 100%

### Hàm Upload:

```python
import base64

UPLOAD_URL = "https://cms.happybooktravel.com/upload-temp?object=tours"

def upload_via_fetch(page, file_path):
    """Upload file qua browser Fetch API. Trả về server path hoặc None."""
    with open(file_path, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode('ascii')
    
    fname = os.path.basename(file_path)
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
            const json = await resp.json();
            delete window.__upload_b64;
            delete window.__upload_fname;
            return json;
        }
    """)
    
    if result and "files" in result:
        return result["files"][0]["name"]  # VD: "tmp/tours/abc123.jpg"
    return None
```

### Upload Avatar (set_input_files hoạt động OK):
```python
page.locator("#fileupload").set_input_files(avatar_path)
page.wait_for_timeout(3000)
# Kiểm tra: document.querySelector('#image_location').value phải có giá trị
```

### Inject Gallery Images Vào DOM:
```python
for server_path in gallery_paths:
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

## 3. jQuery Select2

CMS dùng Select2 cho tất cả dropdown/combobox. KHÔNG dùng `page.select_option()`.

```python
# Single select
page.evaluate("jQuery('#field_id').val('value').trigger('change');")

# Multi-select
page.evaluate("jQuery('#field_id').val(['1','2','3']).trigger('change');")
```

## 4. iCheck Radio/Checkbox

CMS dùng plugin iCheck — input gốc bị ẩn, thay bằng styled div.
KHÔNG dùng `page.check()`. PHẢI click parent element:

```python
page.evaluate("""
    var el = document.querySelector('input[name="status"][value="0"]');
    if(el) el.parentElement.click();
""")
```

## 5. CKEditor

CMS dùng CKEditor cho các trường mô tả (about, policy, information...).
KHÔNG set `.value` trực tiếp trên textarea — CKEditor sẽ không nhận ra.

```python
# Set nội dung:
page.evaluate(f"""
    if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances['about']) {{
        CKEDITOR.instances['about'].setData('{escaped_html}');
    }}
""")

# Quan trọng: Update element trước khi submit form
page.evaluate("""
    if (typeof CKEDITOR !== 'undefined') {
        for (var name in CKEDITOR.instances) {
            CKEDITOR.instances[name].updateElement();
        }
    }
""")
```

**⚠️ BUG: `room_description` CKEditor trong Modal**

Khi mở modal "Thêm phòng", CKEditor khởi tạo trên `#room_description`.
Khi serialize, jQuery `.val()` trả về `[object HTMLTextAreaElement]` thay vì nội dung.
**Giải pháp:** KHÔNG mở modal — inject hidden inputs trực tiếp (xem hotel-automation.md).

## 6. SEO Meta Fields

Section Meta thường bị collapsed → `page.fill()` sẽ timeout vì element không visible.
PHẢI dùng JS:

```python
page.evaluate(f"""
    document.querySelector('#meta_title').value = '{meta_title}';
    document.querySelector('#meta_description').value = '{meta_desc}';
    document.querySelector('#meta_keywords').value = '{meta_kw}';
""")
```

## 7. Submit Form

CMS submit form qua AJAX (`request_ajax`). Bắt response để kiểm tra:

```python
with page.expect_response(
    lambda r: "product-hotel" in r.url and r.request.method == 'POST',
    timeout=15000
) as resp_info:
    page.click("button:has-text('Lưu lại')")

res = resp_info.value
body = res.text()
success = '"rs":1' in body
# {"rs":1,"msg":"Thêm mới thành công"} = OK
# {"rs":0,"msg":"..."} = FAIL
```

## 8. Trạng Thái Bắt Buộc = Draft

**LUÔN LUÔN** set trạng thái là "Ngừng kích hoạt":

```python
page.evaluate("""
    var s = document.querySelector('input[name="status"][value="0"]');
    if(s) s.parentElement.click();
    var f = document.querySelector('input[name="is_featured"][value="0"]');
    if(f) f.parentElement.click();
""")
```

## 9. Windows Console Encoding

Khi chạy trên Windows, tiếng Việt sẽ gây lỗi UnicodeEncodeError.
Thêm vào đầu mọi script:

```python
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
```
