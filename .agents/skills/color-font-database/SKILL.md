---
name: color-font-database
description: Searchable database of 80+ color palettes by industry/product type and 22 curated font pairings with Google Fonts URLs. Use when choosing colors for a new project, selecting font pairings, or needing industry-specific design recommendations. Triggers on "what colors for", "color palette", "font pairing", "choose fonts", "recommend palette", "industry colors".
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Color & Font Database

> **Purpose:** Curated, WCAG-compliant color palettes and font pairings searchable by industry/product type.
> **Philosophy:** Data-driven decisions, not guessing. Every palette is tested for contrast accessibility.

---

## 🎯 When to Use

| Scenario | Action |
|----------|--------|
| New project — need colors | Search `data/colors.csv` by product type |
| Need font pairing | Search `data/typography.csv` by mood/industry |
| Choosing between palettes | Compare options from CSV, check with project context |
| Client provides industry | Filter both CSVs by industry keywords |

> 🔴 **IMPORTANT:** These are starting points, NOT dogma. Always ASK user preferences first (per `frontend-design` Socratic Gate). Use this data to present OPTIONS, not impose choices.

---

## 📁 Data Files

| File | Records | Description |
|------|---------|-------------|
| [data/colors.csv](data/colors.csv) | 80+ | Full color systems by product type (Primary, Secondary, Accent, BG, FG, Card, Muted, Border, Destructive) |
| [data/typography.csv](data/typography.csv) | 22 | Font pairings with Google Fonts URLs, CSS imports, Tailwind config, mood keywords |

---

## 🎨 Color Palette Lookup

### CSV Structure
Each row contains a **complete color system** with these tokens:

| Token | Purpose |
|-------|---------|
| `Primary` / `On Primary` | Brand color + text on it |
| `Secondary` / `On Secondary` | Supporting brand color |
| `Accent` / `On Accent` | CTA buttons, highlights |
| `Background` / `Foreground` | Page background + main text |
| `Card` / `Card Foreground` | Card containers |
| `Muted` / `Muted Foreground` | Subtle backgrounds, secondary text |
| `Border` | Dividers, input borders |
| `Destructive` / `On Destructive` | Error states, delete actions |
| `Ring` | Focus rings |

### Quick Lookup by Industry

| Industry | Row # | Key Colors | Notes |
|----------|-------|------------|-------|
| **Travel/Tourism** | 37 | Sky blue `#0EA5E9` + Orange `#EA580C` | ⭐ Relevant for visagovietnam |
| **Hotel/Hospitality** | 38 | Navy `#1E3A8A` + Gold `#A16207` | ⭐ Relevant for Happybook |
| SaaS | 1 | Blue `#2563EB` + Orange `#EA580C` | Trust + CTA contrast |
| E-commerce | 3 | Green `#059669` + Orange `#EA580C` | Success + urgency |
| E-commerce Luxury | 4 | Black `#1C1917` + Gold `#A16207` | Premium dark |
| Healthcare | 8 | Cyan `#0891B2` + Green `#059669` | Calm + health |
| Financial | 6 | Navy `#0F172A` + Green `#22C55E` | Dark + indicators |
| Creative Agency | 10 | Pink `#EC4899` + Cyan `#0891B2` | Bold + fresh |
| Beauty/Spa | 32 | Pink `#EC4899` + Lavender `#8B5CF6` | Soft + luxury |
| Restaurant | 34 | Red `#DC2626` + Gold `#A16207` | Appetizing + warm |
| Fitness | 35 | Orange `#F97316` + Green `#22C55E` | Energy + success |
| Real Estate | 36 | Teal `#0F766E` + Blue `#0369A1` | Trust + professional |

### Usage in CSS Variables

```css
:root {
  /* From colors.csv row 37 (Travel/Tourism) */
  --color-primary: #0EA5E9;
  --color-on-primary: #0F172A;
  --color-secondary: #38BDF8;
  --color-accent: #EA580C;
  --color-background: #F0F9FF;
  --color-foreground: #0C4A6E;
  --color-card: #FFFFFF;
  --color-muted: #E8F2F8;
  --color-border: #BAE6FD;
  --color-destructive: #DC2626;
}
```

---

## 🔤 Font Pairing Lookup

### Quick Reference by Mood

| # | Name | Heading → Body | Best For | Mood |
|---|------|---------------|----------|------|
| 1 | Classic Elegant | Playfair Display → Inter | Luxury, spa, editorial | Sophisticated, premium |
| 2 | Modern Professional | Poppins → Open Sans | SaaS, corporate, startups | Clean, approachable |
| 3 | Tech Startup | Space Grotesk → DM Sans | Tech, AI, dev tools | Innovative, bold |
| 5 | Minimal Swiss | Inter → Inter | Dashboards, admin, docs | Minimal, functional |
| 6 | Playful Creative | Fredoka → Nunito | Kids apps, games, fun | Friendly, warm |
| 7 | Bold Statement | Bebas Neue → Source Sans 3 | Marketing, portfolios | Impactful, dramatic |
| 8 | Wellness Calm | Lora → Raleway | Health, spa, yoga | Calm, organic |
| 11 | Geometric Modern | Outfit → Work Sans | Landing pages, agencies | Balanced, contemporary |
| 12 | Luxury Serif | Cormorant → Montserrat | Fashion, jewelry | Elegant, refined |
| 13 | Friendly SaaS | Plus Jakarta Sans | SaaS, web apps | Modern, approachable |
| 16 | Corporate Trust | Lexend → Source Sans 3 | Enterprise, government | Accessible, trustworthy |
| 18 | Fashion Forward | Syne → Manrope | Fashion, art galleries | Avant-garde, edgy |
| 21 | Vietnamese Friendly | Be Vietnam Pro → Noto Sans | Vietnamese sites ⭐ | Clean, multilingual |

### Usage Example

```css
/* From typography.csv row 21 (Vietnamese Friendly) */
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --font-heading: 'Be Vietnam Pro', 'Noto Sans', sans-serif;
  --font-body: 'Noto Sans', 'Be Vietnam Pro', sans-serif;
}
```

```js
// Tailwind config
fontFamily: {
  sans: ['Be Vietnam Pro', 'Noto Sans', 'sans-serif']
}
```

---

## 🔍 How to Search

### By Product Type (Colors)
```
Search colors.csv for "travel" → Row 37: Travel/Tourism Agency
Search colors.csv for "hotel" → Row 38: Hotel/Hospitality
Search colors.csv for "beauty" → Row 32: Beauty/Spa/Wellness
```

### By Mood/Style (Fonts)
```
Search typography.csv for "luxury" → Rows 1, 12: Classic Elegant, Luxury Serif
Search typography.csv for "modern" → Rows 2, 11, 13: Professional, Geometric, SaaS
Search typography.csv for "vietnamese" → Row 21: Vietnamese Friendly
```

---

## ⚠️ Important Notes

1. **All accent colors are WCAG-adjusted** — Each palette has been tested for minimum 3:1 contrast ratio
2. **These are STARTING POINTS** — Always ask user preferences first
3. **Don't use these blindly** — Consider brand guidelines, target audience, and context
4. **Dark mode** — Swap Background/Foreground values for dark themes
5. **Combine with `frontend-design`** — Use principles from that skill to customize further

---

## Related Skills

| Skill | Relationship |
|-------|-------------|
| `frontend-design` | Design principles + decision framework (use BEFORE this skill) |
| `tailwind-patterns` | Implementation with Tailwind CSS |
| `brand-identity` | Full brand system including voice + assets |
| `web-design-guidelines` | Audit after implementation |
