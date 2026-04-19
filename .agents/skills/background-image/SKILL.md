---
name: background-image
description: Implement and debug website background layering, texture overlays, transparent section wrappers, and white-page fixes. Use when a site background should sit behind content, a texture or overlay is getting covered by white sections, or browser screenshots still look flat or empty.
---

# Background Image

This skill is for website code, not for generating new raster art.
Use it when the task is about how the page background is layered, how textures show through, or why a page still looks flat/white.

## What this skill should solve

- Global page canvas and texture layers
- Section transparency vs. solid surfaces
- Archive/article pages that look too white
- Hero or full-bleed background treatments
- Overlay and stacking-context issues
- Visual verification with browser screenshots

## Trigger situations

Use this skill when the user asks for any of the following:

- background image
- site background
- texture background
- white page / white slab / white boxed sections
- transparent section wrappers
- body background or body::before
- layering or z-index fixes for backgrounds
- making the page feel less flat

## Workflow

1. Inspect the current background stack.
   - Include any reveal or animation wrappers that can hide content in screenshots.
2. Decide which layer should own the look:
   - global canvas
   - section background
   - surface/card background
3. Keep outer wrappers transparent when the background should pass through.
4. Avoid using opacity on containers that also hold text or images.
5. Verify the result with a browser screenshot and a scroll pass.

## Implementation notes

- `html` and `body` define the baseline canvas.
- `body::before` is the right place for a fixed texture layer when the whole site shares one backdrop.
- Section wrappers that should inherit the canvas should stay `transparent`.
- Cards, modals, and inline surfaces can still use solid fills when contrast is needed.
- Use a warm neutral fallback instead of pure white if the site should feel softer.
- Use project-specific class names only when the codebase already has a background utility system.

## Recommended implementation pattern

```css
html {
  background: var(--page-canvas, #f7f1e8);
}

body {
  position: relative;
  isolation: isolate;
  background-color: var(--page-canvas, #f7f1e8);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-color: var(--page-canvas, #f7f1e8);
  background-image: image-set(
    url("/backgrounds/example.avif") type("image/avif"),
    url("/backgrounds/example.jpg") type("image/jpeg")
  );
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}

.page-section,
.page-section--tight,
.page-section--surface {
  background-color: transparent;
}
```

## Guardrails

- Do not hide content wrappers with `opacity-0` just to animate them.
- Do not put `bg-white` on page-level wrappers unless the page is supposed to be paper-white.
- Do not use `opacity` on a container if you only want to soften its background.
- Prefer pseudo-elements or dedicated background layers for overlays.
- Prefer `image-set()` when AVIF and JPG variants exist.
- Use `pointer-events: none` on decorative background layers.

## Verification

After a change, always check:

- the page above the fold
- a full-page screenshot
- one or two scroll positions where the background should continue
- readability of text, cards, and navigation

If the page still looks white, inspect in this order:

1. Outer wrapper backgrounds
2. Pseudo-element or fixed background layer
3. Animation wrappers adding opacity
4. Card/surface colors that are too bright
5. Stacking context issues from `z-index` or missing `isolation`

## Output expectations

When finishing, report:

- files changed
- what layer owns the background now
- what remains transparent
- how you verified the visual result
- any follow-up risks

## Reference files

- `references/background-patterns-generic.md`
- `evals/evals.json`
