---
name: html-3d-flipbook-pdf
description: Implement an interactive 3D bookshelf and a dynamic PDF flipbook reader powered by pdf.js and stPageFlip. Use for LMS, Digital Libraries, or Document Previews.
author: User & Assistant
---

# 3D Bookshelf & PDF Flipbook Integration

This skill outlines how to build an immersive digital library featuring a 3D bookshelf CSS layout and a full-screen interactive 3-dimensional PDF reader.

## 1. 3D Bookshelf (CSS Only)

To make book covers look like an authentic physical shelf item with 3D interactions upon hover:
```html
<style>
.book-container { perspective: 1000px; }
.book { transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); }
.book:hover { transform: translateY(-10px) rotateX(10deg) rotateZ(-3deg) scale(1.05); box-shadow: 0 20px 25px rgba(0,0,0,0.3); }
</style>
```

Add a realistic structure:
```html
<div class="book-container group flex flex-col items-center">
    <div class="book relative w-48 h-64 bg-white rounded-r-md shadow-2xl border-l-4 border-l-gray-300 overflow-hidden cursor-pointer open-book-btn" data-pdflink="example.pdf">
        <!-- Book cover img logic -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
</div>
```

## 2. Interactive Flipbook Engine

**Dependencies** (CDNs):
1. `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js`
2. `https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.js`

**Initialization Flow:**
- Pre-set `pdfjsLib.GlobalWorkerOptions.workerSrc` to the matching CDN version.
- Build a full-screen Fixed Modal (`fixed inset-0 z-[100]`).
- Within the modal, have a container (`#flipbook`) where pages will render dynamically.

**Rendering Logic:**
1. Fetch PDF with `pdfjsLib.getDocument()`.
2. Clear any old instances of `#flipbook` HTML.
3. For loop over all pages (1 up to `pdf.numPages`).
4. Generate a `<canvas>` inside `<div class="page bg-white shadow-lg overflow-hidden flex items-center justify-center">` for each page.
5. Setup a viewport (scale based on `width`, normally 1.5 - 2.0 depending on high-dpi settings).
6. Asynchronously queue `page.render()` for all pages in order. `await Promise.all(renderTasks)`.
7. **Initialize StPageFlip** on `#flipbook` ONLY AFTER all DOM/Canvas elements have finished rendering:
```javascript
const pageFlipInstance = new St.PageFlip(flipbookEl, {
    width: viewport.width,
    height: viewport.height,
    size: "fixed",
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: window.innerWidth < 768
});
pageFlipInstance.loadFromHTML(document.querySelectorAll('#flipbook .page'));
```

## 3. Bug Handling (Known Issues)

- **Empty Book Cover Bug:** StPageFlip needs at least 2 pages. If you supply more, it renders correctly. Ensure rendering order finishes BEFORE `loadFromHTML`.
- **Canvas Scaling:** When calling `page.getViewport({ scale })`, dynamically calculate scale so that the height matches ~90vh for optimal presentation.
- **Scroll Hijacking:** Set `document.body.style.overflow = "hidden"` when modal opens, and empty it out when `closeBookModal()` runs to pause scrolling underneath.
