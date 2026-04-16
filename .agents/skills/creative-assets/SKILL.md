---
name: creative-assets
description: Design banners, logos, presentation slides, icons, and social media images with AI. Multi-format creative asset generation across social, ads, web, and print. Triggers on "design banner", "create logo", "make slides", "presentation", "icon design", "social media image", "banner sizes", "pitch deck".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Creative Assets Design System

> **Purpose:** Generate professional creative assets — banners, logos, slides, icons, and social images.
> **Scope:** Design direction + AI image generation prompting. Does NOT handle video editing or print production.

---

## 🎯 When to Use

| Scenario | Sub-section |
|----------|-------------|
| Design a banner (social/ads/web) | → Banner Design |
| Create a logo | → Logo Design |
| Build presentation slides | → Slides Design |
| Design icons/icon sets | → Icon Design |
| Social media images | → Social Photos |

---

## 1. Banner Design

### Standard Sizes

| Platform | Size (px) | Aspect | Use Case |
|----------|-----------|--------|----------|
| **Facebook Cover** | 1640 × 924 | 16:9 | Profile/page cover |
| **Facebook Post** | 1200 × 630 | 1.91:1 | Feed posts |
| **Instagram Post** | 1080 × 1080 | 1:1 | Square feed |
| **Instagram Story** | 1080 × 1920 | 9:16 | Stories/Reels |
| **Twitter/X Header** | 1500 × 500 | 3:1 | Profile header |
| **Twitter/X Post** | 1200 × 675 | 16:9 | Feed posts |
| **LinkedIn Banner** | 1584 × 396 | 4:1 | Profile header |
| **LinkedIn Post** | 1200 × 627 | 1.91:1 | Feed posts |
| **YouTube Thumbnail** | 1280 × 720 | 16:9 | Video thumbnail |
| **Google Ads Display** | 1200 × 628 | 1.91:1 | Display network |
| **Google Ads Square** | 1200 × 1200 | 1:1 | Display network |
| **Website Hero** | 1920 × 1080 | 16:9 | Hero section |
| **Website Hero Mobile** | 750 × 1334 | 9:16 | Mobile hero |
| **Email Header** | 600 × 200 | 3:1 | Newsletter |

### Art Direction Styles (Top 10)

| # | Style | Description | Best For |
|---|-------|-------------|----------|
| 1 | **Clean Minimal** | White space, single focal point, bold type | SaaS, tech, professional |
| 2 | **Lifestyle Photography** | Real people, authentic moments | Travel, wellness, food |
| 3 | **Bold Typography** | Oversized text, high contrast | Marketing, events |
| 4 | **Duotone** | Two-color treatment on photos | Music, creative, startups |
| 5 | **Gradient Overlay** | Color gradient on photography | Apps, fintech, modern |
| 6 | **Illustrated** | Custom illustrations, hand-drawn | Kids, education, playful |
| 7 | **Product Showcase** | Clean product on solid/gradient bg | E-commerce, electronics |
| 8 | **Collage / Mosaic** | Multiple images in grid layout | Portfolio, social media |
| 9 | **Dark & Dramatic** | Dark bg, spotlight on subject | Luxury, gaming, film |
| 10 | **Retro / Vintage** | Grain, warm tones, classic type | Food, fashion, craft |

### Banner Design Rules

| ✅ Do | ❌ Don't |
|-------|----------|
| Single focal point | Clutter with too much info |
| CTA visible and contrasting | Hide CTA in complex imagery |
| Text readable at 50% zoom | Tiny text that disappears on mobile |
| Brand colors consistent | Random colors for "variety" |
| Leave safe zones for cropping | Edge-to-edge important text |
| Design mobile-first, then scale | Design desktop-only |

### Banner Workflow

```
1. GATHER    → What platform? What message? What CTA?
2. SIZE      → Pick from size chart above
3. DIRECTION → Choose art direction style
4. LAYOUT    → Sketch: focal point + text zones + CTA
5. GENERATE  → Use AI image tool or photo
6. ITERATE   → Multiple options → user picks → refine
```

---

## 2. Logo Design

### Logo Types

| Type | Description | Best For |
|------|-------------|----------|
| **Wordmark** | Brand name in custom typography | Google, Coca-Cola |
| **Lettermark** | Initials only | IBM, HP, CNN |
| **Brandmark** | Symbol/icon only | Apple, Nike, Twitter |
| **Combination** | Text + symbol together | Adidas, Burger King |
| **Emblem** | Text inside symbol/badge | Starbucks, harley |
| **Mascot** | Character-based | KFC, Mailchimp |

### Logo Design Process

```
1. BRIEF     → Industry, values, target audience, competitors
2. RESEARCH  → Competitor logos, industry conventions
3. DIRECTION → Choose logo type + 2-3 style concepts
4. GENERATE  → AI generate multiple options
5. REFINE    → Pick winner → iterate details
6. VARIANTS  → Create: full, icon-only, monochrome, reversed
```

### Logo Rules

- **Simplicity first** — must work at 16px (favicon) and 500px (billboard)
- **Vector format** — Always SVG for web, provide PNG fallbacks
- **Color versions** — Full color, monochrome, reversed (white on dark)
- **Clear space** — Minimum padding = height of logo's "x" character

---

## 3. Slides / Presentation Design

### Slide Strategies by Purpose

| Purpose | Strategy | Slides | Key Technique |
|---------|----------|--------|---------------|
| **Pitch Deck** | Problem → Solution → Market → Revenue | 10-15 | Data charts, emotional contrast |
| **Sales Deck** | Pain → Benefit → Proof → CTA | 8-12 | Social proof, urgency |
| **Product Demo** | Overview → Features → Demo → Pricing | 10-15 | Screenshots, comparisons |
| **Team Meeting** | Status → Metrics → Blockers → Next | 5-8 | Charts, KPIs |
| **Conference Talk** | Hook → Story → Insight → Recap | 15-30 | Big typography, minimal |

### Copywriting Formulas for Slides

| Formula | Structure | Best For |
|---------|-----------|----------|
| **PAS** | Problem → Agitation → Solution | Sales, pitch decks |
| **AIDA** | Attention → Interest → Desire → Action | Marketing |
| **FAB** | Feature → Advantage → Benefit | Product demos |
| **Before/After** | Current state → Future state | Transformation |
| **STAR** | Situation → Task → Action → Result | Case studies |

### Slide Design Rules

| ✅ Do | ❌ Don't |
|-------|----------|
| One idea per slide | Cramming 3 points in one |
| 6 words max per bullet | Full sentences |
| Full-bleed images | Tiny images with borders |
| Consistent typography scale | Random font sizes |
| Dark text on light OR light on dark | Low contrast combinations |
| Use Chart.js for charts | CSS-only bar charts |

### Pattern Breaking (Duarte Sparkline)

Premium presentations alternate emotional beats:

```
"What Is" (frustration) ↔ "What Could Be" (hope)
├── Slide 1-3: Current pain (dark, data-heavy)
├── Slide 4-5: Vision of better future (bright, aspirational)
├── Slide 6-8: How we get there (structured, professional)
└── Slide 9-10: CTA + proof (confident, social proof)
```

---

## 4. Icon Design

### Icon Styles

| Style | Description | Best For |
|-------|-------------|----------|
| **Outlined** | Thin strokes, no fill | Modern UIs, light themes |
| **Filled** | Solid shapes | Dark themes, mobile apps |
| **Duotone** | Two-color layered | Marketing, feature sections |
| **Flat** | Single color, no gradients | Minimal, docs, dashboards |

### Recommended Libraries (no need to design custom)

| Library | Icons | Style | License |
|---------|-------|-------|---------|
| **Lucide** | 1500+ | Outlined | MIT |
| **Heroicons** | 300+ | Outlined + Filled | MIT |
| **Phosphor** | 7000+ | 6 styles | MIT |
| **Tabler Icons** | 5000+ | Outlined | MIT |
| **Material Symbols** | 3000+ | Multiple | Apache 2.0 |

### Custom Icon Rules

- Consistent stroke width across entire set
- Same optical size (even if actual sizes differ)
- Corner radius consistent
- 2px minimum detail at 24×24
- Test at 16px, 24px, 32px, 48px

---

## 5. Social Photos

### Key Platform Sizes

| Platform | Profile Pic | Cover/Header | Feed Post |
|----------|-------------|--------------|-----------|
| Facebook | 170×170 | 1640×924 | 1200×630 |
| Instagram | 110×110 | — | 1080×1080 |
| Twitter/X | 400×400 | 1500×500 | 1200×675 |
| LinkedIn | 400×400 | 1584×396 | 1200×627 |
| TikTok | 200×200 | — | 1080×1920 |
| Pinterest | 165×165 | — | 1000×1500 |
| YouTube | 800×800 | 2560×1440 | 1280×720 |

### Photography Direction

| Type | Lighting | Composition | Post-processing |
|------|----------|-------------|-----------------|
| Professional | Studio or natural | Rule of thirds | Clean, consistent |
| Lifestyle | Golden hour, natural | Candid, authentic | Warm, minimal edits |
| Product | Bright, even | Center or flat lay | High contrast, sharp |
| Food | Side light, warm | Overhead or 45° | Warm, appetizing |
| Travel | Natural, varied | Wide/candid | Vibrant, not over-saturated |

---

## AI Image Generation Tips

### Effective Prompt Structure

```
[Subject/Scene], [Style/Medium], [Lighting], [Mood/Atmosphere],
[Color palette: brand colors], [Composition], [Quality keywords]
```

### Quality Keywords

| Purpose | Keywords |
|---------|----------|
| High quality | "professional, high-resolution, detailed, sharp" |
| Photography | "DSLR photo, 85mm lens, shallow depth of field" |
| Illustration | "digital illustration, vector art, flat design" |
| Minimalist | "clean, white space, simple, elegant" |
| Dramatic | "cinematic, moody, dramatic lighting, high contrast" |

### Brand-Specific Prompt Template

```
"[Scene description], [brand mood keywords],
color palette: [primary hex], [secondary hex], [accent hex],
[style: photography/illustration/3D],
professional quality, [platform: web/social/print]"
```

---

## Related Skills

| Skill | Relationship |
|-------|-------------|
| `brand-identity` | Brand guidelines first, then create assets |
| `color-font-database` | Pick colors/fonts for new brands |
| `frontend-design` | UI design principles |
| `enhance-prompt` | Enhance prompts for AI generation |
