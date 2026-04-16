---
name: optimize-lighthouse
description: Optimize Lighthouse scores (Performance, Accessibility, SEO, Best Practices) without violating UI/UX integrity. Runs audits, auto-fixes issues, and enforces hard guardrails to prevent visual regressions.
version: 2.0.0
author: HappyBook Team (evolved from Kemeny Studio roier-seo v1)
license: MIT
tags: [Lighthouse, Performance, SEO, Accessibility, Core Web Vitals, WCAG, Next.js, React, WebP, next/image]
dependencies: [lighthouse, chrome-launcher]
---

# Optimize Lighthouse — Score Maximizer with UI/UX Guardrails

Audit websites with Lighthouse, identify issues, and auto-implement fixes — **without breaking the visual design**.

> ⚠️ **CORE PRINCIPLE**: Lighthouse score is a MEANS, not the END. A 100-score page that looks broken is **worse** than a 85-score page that looks perfect. Never sacrifice visible UI quality for marginal score gains.

## When to use this skill

- User wants to "improve Lighthouse scores" or "optimize performance"
- User mentions "SEO audit", "accessibility check", or "core web vitals"
- User wants to fix meta tags, structured data, color contrast, or image optimization
- User has a local dev server or live URL and wants comprehensive audit

## 🚨 HARD GUARDRAILS (NEVER VIOLATE)

These are absolute rules learned from real production incidents. Breaking any of these is a **critical failure**.

### 🔴 G1: NEVER Defer Icon Fonts
**What happened**: Material Symbols font was deferred via `media="print"` + `onLoad` swap to improve FCP. Result: All icons rendered as raw text strings (`"bolt"`, `"arrow_forward"`, `"shield_lock"`) — completely destroying the UI.

**Rule**: Icon fonts (Material Symbols, Font Awesome, Ionicons, etc.) **MUST** load as render-blocking `rel="stylesheet"`. They are NOT optional — they ARE the UI.

```html
<!-- ✅ CORRECT: Icon font loads immediately -->
<link href="https://fonts.googleapis.com/.../Material+Symbols+Outlined..." rel="stylesheet" />

<!-- 🚫 NEVER DO: Defer icon font loading -->
<link href="...Material+Symbols..." rel="stylesheet" media="print" onLoad="this.media='all'" />
```

**Exception**: Only defer fonts that are purely decorative text fonts AND where fallback system font looks acceptable during swap.

### 🔴 G2: NEVER Change Brand Colors Without Asking
**What happened**: To meet WCAG contrast ratios, brand orange `#FA7131` was darkened to `#BF360C` across buttons and headings. While technically correct for accessibility, this significantly altered the brand identity.

**Rule**: 
- When contrast fails, **always present the user with options** before changing:
  1. Darken/lighten the foreground color
  2. Change the background instead
  3. Increase font size/weight (large text has lower contrast requirement: 3:1)
  4. Accept the trade-off with user's explicit approval
- For primary brand colors, **ask first**: *"Your brand color #FA7131 doesn't meet WCAG AA contrast on white background. I can darken it to #BF360C — is that acceptable?"*

### 🔴 G3: NEVER Delete or Replace Images Without Confirmation
**Rule**: If Lighthouse flags image size/format issues:
- Convert to `next/image` (automatic WebP) ✅
- Add `width`/`height` attributes ✅
- Add `loading="lazy"` to below-fold images ✅
- **DO NOT** delete images, replace with placeholders, or remove decorative images without asking

### 🔴 G4: Visual Verification REQUIRED After Every Change
**Rule**: After implementing fixes, **always** take a browser screenshot and visually verify:
- All icons render correctly (not as text)
- Layout hasn't shifted or broken
- Colors look as intended
- Images load properly
- Fonts display correctly (no FOUT/FOIT issues)

### 🔴 G5: Dev Mode vs Production Score Awareness
**What happened**: Performance scored 47 in dev mode, causing panic optimization. After `next build`, it jumped to 95 without additional changes.

**Rule**:
- **Dev mode scores are UNRELIABLE for Performance** (no minification, no tree-shaking, source maps, WebSocket bfcache issues)
- Accessibility, SEO, Best Practices scores ARE reliable in dev mode
- **Always build production** (`npm run build && npm start`) before reporting Performance scores
- Never panic-optimize based on dev mode Performance numbers

| Category | Dev Mode Reliable? | Notes |
|----------|-------------------|-------|
| Performance | ❌ NO | Build production first |
| Accessibility | ✅ YES | Accurate in dev |
| Best Practices | ✅ YES | Accurate in dev |
| SEO | ✅ YES | Accurate in dev |

## Workflow

### Phase 1: Audit (Dev Mode — SEO/A11y/BP only)

```bash
# Start dev server first
npm run dev

# Run audit
node .agent/skills/optimize-lighthouse/scripts/audit.js http://localhost:3000 --output=summary
```

Fix **Accessibility**, **SEO**, and **Best Practices** issues in dev mode. These scores are reliable.

### Phase 2: Fix SEO Issues

**Priority order:**
1. `robots` meta → ensure `index: true, follow: true` (not `noindex`!)
2. Title tag → 50-60 chars, keyword-rich
3. Meta description → 150-160 chars, compelling
4. Canonical URL
5. Open Graph + Twitter Card tags
6. JSON-LD structured data (Organization, WebSite, BreadcrumbList)

### Phase 3: Fix Accessibility Issues

**Priority order (with guardrails):**
1. **Form labels**: Add `htmlFor`/`id` pairs to `<label>` + `<input>`/`<select>`
2. **Image alt text**: Descriptive for content images, `alt=""` for decorative
3. **Skip link**: Add "Skip to main content" for keyboard nav
4. **Color contrast** ⚠️: Check against WCAG AA (4.5:1 normal, 3:1 large) — **ASK before changing brand colors**
5. **Image dimensions**: Add `width`/`height` to prevent CLS
6. **Aria attributes**: Fix mismatches, remove redundant labels

### Phase 4: Fix Performance Issues (PRODUCTION BUILD ONLY)

```bash
# Build production
npm run build && npm start

# Then audit
node .agent/skills/optimize-lighthouse/scripts/audit.js http://localhost:3000 --output=summary
```

**Safe optimizations (do without asking):**
- ✅ Convert `<img>` → `next/image` (auto WebP, lazy loading, responsive)
- ✅ Add `width`/`height` to images
- ✅ Add `preconnect`/`dns-prefetch` for external origins
- ✅ Add `preload` for LCP image
- ✅ Convert CSS `background-image` to `next/image fill + priority` for hero/LCP
- ✅ Enable Next.js image optimization in `next.config` (`formats: ['image/webp']`)

**Dangerous optimizations (ask first):**
- ⚠️ Deferring ANY font loading (especially icon fonts)
- ⚠️ Removing/replacing images
- ⚠️ Changing colors for contrast
- ⚠️ Code splitting that affects above-fold content
- ⚠️ Removing third-party scripts (analytics, chat widgets)

### Phase 5: Visual Verification

Take screenshots of all major sections after changes. Compare with pre-change state. Report any visual differences to user.

### Phase 6: Re-audit & Report

Run final audit on production build. Present comparison table:

```
| Category       | Before | After | Target | Status |
|----------------|--------|-------|--------|--------|
| Performance    |   48   |  95   |  ≥70   |   ✅   |
| Accessibility  |   92   | 100   |  100   |   ✅   |
| Best Practices |  100   | 100   |  100   |   ✅   |
| SEO            |   66   | 100   |  100   |   ✅   |
```

## Technical Reference

### next.config.mjs — Image Optimization

```js
const nextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      // Add all external image domains used
    ],
  },
}
```

> ⚠️ Remove `unoptimized: true` if present — this disables all Next.js image optimization!

### LCP Hero Image — The #1 Performance Win

Converting CSS background-image to `next/image` is typically the single biggest LCP improvement:

```tsx
// 🚫 BAD: CSS background-image (invisible to preload scanner)
<section style={{ backgroundImage: `url('...')` }}>

// ✅ GOOD: next/image with priority (preload scanner discovers it)
<section className="relative overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-xxx"
    alt="Hero background"
    fill
    priority
    fetchPriority="high"
    sizes="100vw"
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
  <div className="relative z-10">{/* content */}</div>
</section>
```

Also add preload in `<head>`:
```html
<link rel="preload" as="image" href="..." fetchPriority="high" />
```

### Color Contrast Quick Reference

| Text Type | Min Ratio | Example Pass | Example Fail |
|-----------|-----------|------------|------------|
| Normal text | 4.5:1 | `#475569` on `#ffffff` | `#94a3b8` on `#ffffff` |
| Large text (18px+) | 3:1 | `#64748b` on `#ffffff` | `#cbd5e1` on `#ffffff` |
| UI components | 3:1 | Buttons, icons | — |

**Tailwind slate scale contrast on white:**
- `text-slate-400` → ❌ Fails (3.1:1)
- `text-slate-500` → ⚠️ Borderline (4.6:1 — may fail on light bg)
- `text-slate-600` → ✅ Pass (5.9:1)
- `text-slate-700` → ✅ Safe (8.5:1)

### Meta Tags (Next.js App Router)

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Primary Keyword - Secondary | Brand',
  description: '150-160 char compelling description with keywords',
  robots: { index: true, follow: true },  // ⚠️ NEVER set noindex on production!
  openGraph: {
    title: 'Page Title',
    description: 'Description',
    url: 'https://example.com',
    siteName: 'Brand',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://example.com' },
}
```

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": { "@type": "ContactPoint", "telephone": "+1-xxx", "contactType": "customer service" }
}
</script>
```

### Font Loading — Safe vs Dangerous

```html
<!-- ✅ SAFE: Text font with display=swap (fallback looks OK) -->
<link href="...family=Public+Sans...&display=swap" rel="stylesheet" />

<!-- ✅ SAFE: Preconnect to font origin -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- 🚫 DANGEROUS: Deferring icon fonts -->
<link href="...Material+Symbols..." media="print" onload="this.media='all'" />

<!-- ✅ SAFE: Preload specific critical font file -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
```

### Accessibility Patterns

```html
<!-- Skip link -->
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
<main id="main-content">...</main>

<!-- Form labels (REQUIRED for every input/select) -->
<label htmlFor="nationality">Nationality</label>
<select id="nationality">...</select>

<!-- Image with explicit dimensions (prevents CLS) -->
<Image src="/photo.jpg" alt="Descriptive text" width={800} height={450} />

<!-- Decorative icon (hide from screen readers) -->
<span className="material-symbols-outlined" aria-hidden="true">check</span>
```

## Audit Script Setup & Usage

**Dependencies**: `lighthouse`, `chrome-launcher` (installed on-demand, NOT bundled with skill).

> ⚠️ `node_modules/` MUST NOT be committed to the skill folder. The `scripts/.gitignore` excludes it. Dependencies are installed on first use.

```bash
# Step 1: Install dependencies (first time only — do NOT commit node_modules)
cd .agent/skills/optimize-lighthouse/scripts && npm install

# Step 2: Quick summary audit
node .agent/skills/optimize-lighthouse/scripts/audit.js http://localhost:3000 --output=summary

# Step 3: Save detailed JSON for analysis
node .agent/skills/optimize-lighthouse/scripts/audit.js http://localhost:3000 --save=lighthouse-results.json

# Parse specific issues from saved JSON
node -e "const d=JSON.parse(require('fs').readFileSync('lighthouse-results.json'));
const a11y=[...d.issues.critical,...d.issues.serious].filter(i=>i.category==='accessibility');
a11y.forEach(i=>console.log(i.id,':',i.items?.map(it=>it.node?.selector).filter(Boolean).join(', ')))"
```

## Checklist Before Declaring "Done"

- [ ] Production build scores meet targets
- [ ] All icons render as icons (not text)
- [ ] All images load correctly
- [ ] Layout matches pre-optimization state
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Brand colors preserved or explicitly approved changes
- [ ] Mobile layout verified
- [ ] Skip link works
- [ ] Form labels associated

## Version History

**v2.0.0** (March 2026)
- Renamed from `roier-seo` to `optimize-lighthouse`
- Added 5 HARD GUARDRAILS from real production incidents:
  - G1: Never defer icon fonts (FOUC disaster)
  - G2: Never change brand colors without asking
  - G3: Never delete images without confirmation
  - G4: Visual verification required after every change
  - G5: Dev vs production score awareness
- Added LCP hero image optimization pattern (CSS bg → next/image)
- Added next.config image optimization reference
- Added Tailwind contrast quick reference
- Restructured workflow into 6 phases with guardrail checkpoints
- Added "Done" checklist

**v1.0.0** (January 2026)
- Initial release by Kemeny Studio
- Lighthouse audit integration
- 50+ SEO fix patterns
- Framework support for Next.js, React, Vue, Nuxt
