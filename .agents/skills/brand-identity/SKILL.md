---
name: brand-identity
description: Brand voice, visual identity, messaging frameworks, asset management, and brand consistency. Use for brand guidelines, tone of voice, visual identity standards, color management, typography specs, logo usage rules, and brand consistency audits. Triggers on "brand guidelines", "brand voice", "visual identity", "brand consistency", "style guide", "brand audit", "messaging framework".
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Brand Identity System

> **Purpose:** Define, document, and enforce brand identity — from voice to visual to code.
> **Source:** Adapted from claudekit/brand skill + original frameworks.

---

## 🎯 When to Use

| Scenario | Action |
|----------|--------|
| **New project** — no brand exists | Use Brand Guidelines Template below |
| **Existing brand** — need documentation | Audit + document into `brand-guidelines.md` |
| **Brand consistency check** | Run consistency checklist |
| **Need brand context for AI** | Read `brand-guidelines.md` for context injection |
| **Color/font changes** | Update `brand-guidelines.md` → sync to tokens |

---

## 📁 File Structure

```
project-root/
├── docs/
│   └── brand-guidelines.md       ← Source of truth (you create this)
├── assets/
│   ├── design-tokens.json        ← Generated from brand-guidelines
│   ├── design-tokens.css         ← CSS variables
│   └── logos/                    ← Logo files (SVG preferred)
│       ├── logo-primary.svg
│       ├── logo-icon.svg
│       └── logo-white.svg
```

---

## 1. Voice Framework

### Voice vs. Tone

**Voice** = Brand's personality (CONSISTENT across all channels)
**Tone** = How voice adapts to context (VARIABLE)

### Voice Dimensions

```
Formal ←――――――――――――――→ Casual
Simple ←――――――――――――――→ Complex
Serious ←――――――――――――――→ Playful
Reserved ←――――――――――――――→ Expressive
```

### Voice Development Process

**Step 1: Define 3-5 Personality Traits**
```
Format: "[Trait], not [anti-trait]"
Example:
- Confident, not arrogant
- Friendly, not unprofessional
- Knowledgeable, not condescending
```

**Step 2: Create Voice Chart**

| Trait | Description | Do ✅ | Don't ❌ |
|-------|-------------|--------|----------|
| Confident | We know our stuff | "Here's what works best..." | "Maybe you could try..." |
| Friendly | Approachable | "Hey there! Let's..." | "Dear Sir/Madam" |
| Clear | Simple language | "This saves you 2 hours" | "Optimized operational efficiency" |

**Step 3: Context Adaptation**

| Context | Tone Shift | Example |
|---------|------------|---------|
| Social media | More casual | "Hey there! 🎉" |
| Support | More empathetic | "We understand this is frustrating..." |
| Legal | More formal | "In accordance with..." |
| Sales | More confident | "You'll see results within..." |
| Error messages | Reassuring | "Something went wrong. Let's fix it." |

---

## 2. Visual Identity

### Core Visual Elements

```
Logo System:
├── Primary     → Full logo (horizontal/stacked)
├── Secondary   → Abbreviated version
├── Icon/Mark   → Symbol only (favicons, app icons)
├── Clear space → Minimum padding around logo
└── Minimum size → Smallest readable size

Color Palette:
├── Primary Colors (1-2)    → Main brand color
├── Secondary Colors (2-3)  → Accent, supporting
├── Neutrals (3-4)          → Text, backgrounds, UI
└── Semantic (4)            → Success, Warning, Error, Info

Typography:
├── Heading font  → Display/serif for impact
├── Body font     → Sans-serif for readability
├── Code font     → Monospace (if needed)
└── Scale         → Consistent size ratios
```

### Logo Usage Rules

| ✅ Do | ❌ Don't |
|-------|----------|
| Use approved versions only | Stretch or distort |
| Maintain clear space | Place on busy backgrounds |
| Use correct color for context | Change brand colors |
| SVG format for web | Use raster at small sizes |
| Minimum size: 32px height web | Add effects (shadows, glow) |

---

## 3. Brand Guidelines Template

Use this template to create `docs/brand-guidelines.md`:

```markdown
# Brand Guidelines — [Brand Name] v1.0

> Last updated: {DATE}
> Status: Draft | Active

## Quick Reference
| Element | Value |
|---------|-------|
| Primary Color | #XXXXXX |
| Secondary Color | #XXXXXX |
| Accent Color | #XXXXXX |
| Heading Font | [Font Name] |
| Body Font | [Font Name] |
| Voice | [3 traits] |
| Logo | See assets/logos/ |

## 1. Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| [Name] | #XXXXXX | r,g,b | Primary actions, headers |

### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| [Name] | #XXXXXX | r,g,b | Supporting elements |

### Semantic Colors
| Purpose | Hex | Usage |
|---------|-----|-------|
| Success | #22C55E | Confirmations |
| Warning | #F59E0B | Caution states |
| Error | #EF4444 | Error states |
| Info | #3B82F6 | Informational |

### Accessibility
- Text contrast ratio: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- Button contrast: WCAG AA compliant

## 2. Typography

### Font Stack
| Usage | Font | Weight | Size |
|-------|------|--------|------|
| H1 | [Font] | Bold (700) | 36-48px |
| H2 | [Font] | Semibold (600) | 28-36px |
| H3 | [Font] | Medium (500) | 22-28px |
| Body | [Font] | Regular (400) | 16-18px |
| Caption | [Font] | Regular (400) | 12-14px |

### Font Loading
[CSS import or Google Fonts URL]

## 3. Logo Usage
[Reference assets/logos/ directory]

## 4. Voice & Tone
### Brand Personality
- [Trait 1]: [Description]
- [Trait 2]: [Description]
- [Trait 3]: [Description]

### We Sound Like
[Example phrases]

### We Don't Sound Like
[Anti-examples]

## 5. Imagery Guidelines
### Photography Style
- [Lighting, mood, composition rules]
### Icons
- Style: [outlined/filled/duotone]
- Library: [Lucide/Heroicons/custom]

## 6. AI Image Generation Prompt Template
[Base prompt template with brand-specific keywords]
```

---

## 4. Brand → Design Tokens Sync

### Manual Sync Process

When updating brand colors/fonts, update these files in order:

```
1. docs/brand-guidelines.md      ← Edit source of truth
2. assets/design-tokens.json     ← Update token definitions
3. assets/design-tokens.css      ← Update CSS variables
4. tailwind.config / @theme      ← Update framework config
```

### Token JSON Structure

```json
{
  "color": {
    "primitive": {
      "blue-500": "#3B82F6",
      "blue-600": "#2563EB"
    },
    "semantic": {
      "primary": "{color.primitive.blue-600}",
      "on-primary": "#FFFFFF",
      "background": "#F8FAFC",
      "foreground": "#0F172A"
    },
    "component": {
      "button-primary-bg": "{color.semantic.primary}",
      "button-primary-text": "{color.semantic.on-primary}"
    }
  },
  "typography": {
    "font-heading": "Be Vietnam Pro, sans-serif",
    "font-body": "Noto Sans, sans-serif"
  }
}
```

### Token CSS Output

```css
:root {
  /* From brand-guidelines.md */
  --color-primary: #2563EB;
  --color-on-primary: #FFFFFF;
  --color-secondary: #3B82F6;
  --color-accent: #EA580C;
  --color-background: #F8FAFC;
  --color-foreground: #0F172A;
  
  --font-heading: 'Be Vietnam Pro', sans-serif;
  --font-body: 'Noto Sans', sans-serif;
}
```

---

## 5. Brand Consistency Checklist

### Visual Consistency
- [ ] Logo: correct version for context
- [ ] Logo: sufficient clear space
- [ ] Colors: from approved palette only
- [ ] Colors: accessible contrast ratios
- [ ] Typography: correct fonts loaded
- [ ] Typography: proper hierarchy (H1→H6)
- [ ] Icons: consistent style (all outlined or all filled)
- [ ] Imagery: matches brand mood/style

### Voice Consistency
- [ ] Tone matches context (marketing/support/legal)
- [ ] Personality traits reflected
- [ ] No competitor-like language
- [ ] No prohibited terms
- [ ] Clear, jargon-free (unless B2B technical)

### Technical Consistency
- [ ] CSS variables used (no hardcoded colors)
- [ ] Design tokens synchronized
- [ ] Font loading optimized (preload/swap)
- [ ] Dark mode tokens defined

---

## 6. Voice Testing Questions

1. Does this sound like our brand?
2. Would a competitor say this?
3. Does it resonate with our audience?
4. Is it consistent with our values?
5. Would a real human at our company say this?

---

## Related Skills

| Skill | Relationship |
|-------|-------------|
| `color-font-database` | Pick colors/fonts BY INDUSTRY before branding |
| `frontend-design` | Design principles for implementing brand |
| `tailwind-patterns` | Configure Tailwind theme with brand tokens |
| `web-design-guidelines` | Audit brand implementation |
