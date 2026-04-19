# Background Patterns

This reference captures reusable patterns for website background systems.

## Core model

Treat the page as three layers:

1. Canvas
2. Background texture or overlay
3. Content surfaces

The goal is to keep those layers separate so the background can be changed without breaking readability.

## Canvas

- Use `html` and `body` to define the baseline page color.
- Prefer a warm neutral fallback over pure white when the design should feel softer.
- Set a predictable stacking context when the page uses negative z-index background layers.

## Texture layer

- Use a fixed pseudo-element or dedicated wrapper when the same texture should span the full page.
- Keep decorative background layers non-interactive.
- Use `image-set()` when multiple image formats are available.
- Position the texture so it complements the layout, usually `center top`.

## Content surfaces

- Keep page-level wrappers transparent when the canvas should show through.
- Use solid or lightly tinted surfaces for cards, panels, modals, and controls.
- Do not apply `opacity` to content containers if only the background should soften.

## Common failure modes

- White section wrappers hiding the canvas.
- Content accidentally dimmed by container opacity.
- Reveal or animation wrappers that start hidden and make screenshots look blank.
- Background layers escaping the stacking context.
- Decorative layers intercepting pointer events.
- The page feeling flat because every surface is paper white.

## Verification checklist

- Check the top of the page and at least one lower scroll position.
- Capture a browser screenshot, not just a code diff.
- Confirm text contrast on cards and overlays.
- Confirm the background still reads well on long pages.

## Safe defaults

```css
html,
body {
  background-color: var(--page-canvas, #f7f1e8);
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
  background-image: var(--page-texture, none);
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
