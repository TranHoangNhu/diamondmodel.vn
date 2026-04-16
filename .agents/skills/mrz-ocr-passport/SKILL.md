---
name: mrz-ocr-passport
description: Parse Machine Readable Zone (MRZ) from passport photo images using Tesseract.js OCR and the mrz npm library. Use this skill whenever building passport scanning, MRZ reading, passport data extraction, or auto-fill from passport features. Also use when debugging OCR accuracy issues with passport photos — this skill contains hard-won knowledge about common OCR misreads, strategy scoring, and preprocessing strategies that will save significant debugging time.
---

# MRZ OCR Passport Parsing

Parse the Machine Readable Zone (MRZ) from passport photos using **Tesseract.js** (OCR) and the **mrz** npm package (MRZ field parser). This skill captures critical lessons learned from production debugging — following these patterns avoids the most common pitfalls.

## Tech Stack

- **tesseract.js** — OCR engine (server-side in Node.js/Next.js API routes)
- **mrz** — MRZ line parser (validates check digits, extracts structured fields)
- **sharp** — Image preprocessing (crop, threshold, contrast, resize)

```bash
npm install tesseract.js mrz sharp
```

## Architecture: Score-Based Multi-Strategy OCR Pipeline

A single preprocessing strategy will fail on many real-world passport photos (angled, poor lighting, low resolution). Use a **multi-strategy pipeline** — try 5+ different image preprocessing variants, **score each result**, and pick the best pair.

### ⚠️ Critical: Do NOT stop at the first strategy that returns 2 lines

The earlier (aggressive crop) strategies often return 2 lines of garbage that pass basic `isMrzLine()` checks. The later strategies (wider crop, full image) typically produce better results. **Always try ALL strategies and pick the highest-scoring pair.**

### Strategy template:

```typescript
interface OcrStrategy {
  name: string
  cropPercent: number  // Bottom N% of image (MRZ is at the bottom)
  threshold: number    // Binarization threshold (128-200)
  contrast: number     // sharp linear contrast multiplier (1.0-2.5)
  resize: boolean      // Whether to upscale for better OCR
}

const STRATEGIES: OcrStrategy[] = [
  { name: 'clean-scan',    cropPercent: 30, threshold: 160, contrast: 1.5, resize: false },
  { name: 'phone-photo',   cropPercent: 40, threshold: 140, contrast: 2.0, resize: true },
  { name: 'angled',        cropPercent: 50, threshold: 128, contrast: 1.8, resize: true },
  { name: 'full-image',    cropPercent: 100, threshold: 180, contrast: 2.5, resize: true },
  { name: 'low-threshold', cropPercent: 35, threshold: 100, contrast: 1.0, resize: false },
]
```

For each strategy: crop → grayscale → threshold → contrast → OCR → extract MRZ → **score** → keep best pair.

### Strategy Scoring

Score each MRZ line pair to pick the best result:

```typescript
function scoreMrzPair(line1: string, line2: string): number {
  let score = 0
  if (line1.startsWith('P<')) score += 20       // Has proper prefix
  if (line1.includes('<<')) score += 10          // Has name separator
  score += Math.min((line1.match(/</g) || []).length, 15)  // More < = cleaner
  if (line2.match(/^\d{9,}/)) score += 10       // Line 2 starts with passport number
  if (line2.match(/[A-Z]{3}\d{6,}/)) score += 10  // Has country code + digits
  score += Math.min((line2.match(/</g) || []).length, 10)
  if (line2.match(/<{3,}\d{2}$/)) score += 15   // Ends with <<<<NN (check digit)
  return score
}
```

**Key discriminator**: Line 2 ending with `<<<<66` (valid check digit pattern) is the strongest signal of a correctly read MRZ.

## ⚠️ Critical: OCR Misread Patterns

This is the most important section. Tesseract consistently misreads MRZ characters. Without these fixes, parsing will fail on most real passports.

### Characters Tesseract reads instead of `<` (angle bracket filler)

The `<` character in MRZ is the most problematic. Tesseract reads it as:

| Misread | Frequency | Example |
|---------|-----------|---------|
| `S` | Very common | `CHUN<CHENG` → `CHUNSCHENG` |
| `C` | Very common | `TRAVELER<<HAPPY<<<<<<` → `TRAVELER<<HAPPYCCCCC` |
| `L` | Very common | `TRAVELER<<HAPPYLLL` |
| `K` | Common | `<<<KK<<<` |
| `I` | Common | `<<<II<<<` |
| `\|` `!` `[` `]` | Rare | Various bracket-like chars |

### ⚠️ Critical: Digit-zone rules must ONLY apply to line 2

**DO NOT** apply `O→0`, `D→0`, `Q→0` etc. on line 1 (name zone). This will corrupt names:
- `KUO<<` → `KU0<<` (surname destroyed!)
- `DAVID<<` → `0AVI0<<`

Check `line.startsWith('P<')` before applying digit rules:

```typescript
const isLine1 = line.startsWith('P<')

// ONLY on line 2
if (!isLine1) {
  line = line
    .replace(/O(?=<)/g, '0')
    .replace(/(?<=\d)O/g, '0')
    .replace(/(?<=\d)D/g, '0')
    // etc.
}
```

### Fix order (this sequence matters):

```typescript
function cleanMrzLine(raw: string): string {
  let line = raw
    .replace(/\s/g, '')           // 1. Remove whitespace
    .replace(/[|!\[\]{}()«»~`\\]/g, '<')  // 2. Obvious bracket misreads
    .toUpperCase()

  // 3. Fix P< prefix
  if (line.match(/^P[^<A-Z]/)) {
    line = 'P<' + line.substring(2)
  }

  const isLine1 = line.startsWith('P<')

  // 4. Filler zone: 3+ consecutive [LKICS] → all become <
  //    Include S! SSS is almost always <<< misread
  line = line.replace(/[LKICS]{3,}/g, m => '<'.repeat(m.length))

  // 5. [LKICS] surrounded by < are misreads
  line = line.replace(/<[LKICS]{2}</g, m => '<'.repeat(m.length))
  line = line.replace(/<[LKICS]{1}</g, '<<<')

  // 6. Single [LKIS] adjacent to < (keep C — valid in names)
  line = line.replace(/[LKIS]</g, '<<')
  line = line.replace(/<[LKIS]/g, '<<')

  // 7. Digit misreads (LINE 2 ONLY!)
  if (!isLine1) {
    line = line
      .replace(/O(?=<)/g, '0')
      .replace(/(?<=\d)O/g, '0')
      .replace(/(?<=\d)D/g, '0')
      .replace(/(?<=\d)Q/g, '0')
      .replace(/Q(?=\d)/g, '0')
      .replace(/I(?=\d)/g, '1')
      .replace(/B(?=\d{3})/g, '8')
  }

  return line
}
```

### Tesseract Configuration

Use PSM 6 (single uniform text block) and whitelist ONLY valid MRZ characters:

```typescript
await worker.setParameters({
  tessedit_pageseg_mode: '6',
  tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
})
```

**DO NOT** include `>`, `|`, or lowercase in the whitelist — they're not valid MRZ chars and cause noise.

## Post-Parse Corrections

After the `mrz` library parses the lines, apply these corrections:

### 1. Line 1 Prefix Fix
If best line 1 doesn't start with `P<`, prepend it:
```typescript
if (!bestMrzLines[0].startsWith('P<')) {
  bestMrzLines[0] = 'P<' + bestMrzLines[0]
}
```

### 2. Country Code Cross-Reference
Line 2 position 10-12 contains the nationality. Use it to fix line 1's country code:
```typescript
const l2Nationality = line2.substring(10, 13)  // e.g., "TWN"
const l1Country = line1.substring(2, 5)        // e.g., "TUN" (misread)
if (l1Country !== l2Nationality) {
  line1 = line1.substring(0, 2) + l2Nationality + line1.substring(5)
}
```

### 3. Name S-Fix (consonant+S+consonant → space)
OCR reads `<` between name parts as `S`. Fix after mrz parse:
```typescript
const CONS = 'BCDFGHJKLMNPQRSTVWXYZ'
const sFixRe = new RegExp(`([${CONS}])S([${CONS}])`, 'g')
for (let i = 0; i < 3; i++) {
  firstName = firstName.replace(sFixRe, '$1 $2')
}
// CHUNSCHENG → CHUN CHENG ✅
```

### 4. Trailing Noise Removal
Remove short noise fragments at end of firstName (from padding misreads):
```typescript
firstName = firstName.replace(/(\s+[A-Z]{1,4})+\s*$/, '').trim()
firstName = firstName.replace(/\b[A-Z]\b/g, '').replace(/\s+/g, ' ').trim()
```

### 5. Fallback Name Parser
If mrz library gives empty surname, manually parse line 1 with aggressive S/C fix:
```typescript
if (!lastName || lastName.length <= 1) {
  let nameZone = normalizedLines[0].substring(5)
  // Aggressive: consonant+SC+consonant → consonant+<+consonant
  const re = /([BCDFGHJKLMNPQRSTVWXYZ])[SC]([BCDFGHJKLMNPQRSTVWXYZ])/g
  for (let i = 0; i < 5; i++) nameZone = nameZone.replace(re, '$1<$2')
  nameZone = nameZone.replace(/<{3,}.*$/, '')  // Truncate padding noise
  const parts = nameZone.split('<<').filter(p => p.length > 0)
  if (parts.length >= 2) {
    lastName = parts[0].replace(/</g, ' ').trim()
    firstName = parts.slice(1).join(' ').replace(/</g, ' ').trim()
  }
}
```

## MRZ Date Parsing Trap

Expiry dates and birth dates use 2-digit years. The century logic differs:

```typescript
function formatMrzDate(dateStr: string, isExpiry = false): string {
  const yy = parseInt(dateStr.substring(0, 2), 10)
  if (isExpiry) {
    let yyyy = 2000 + yy
    if (new Date(yyyy, mm - 1, dd) < new Date()) yyyy += 100
  } else {
    const yyyy = yy < 30 ? 2000 + yy : 1900 + yy
  }
}
```

## Field Mapping

The `mrz` library returns:
- `lastName` → Surname (before `<<` in line 1)
- `firstName` → Given/middle names (after `<<` in line 1, separated by `<`)
- `nationality` → 3-letter ISO code (needs mapping to full name)
- `sex` → "male" / "female" (needs capitalization for forms)

Map nationality codes — note **TWN → China(Taiwan)**, not just "Taiwan":
```typescript
const NATIONALITY_MAP = {
  TWN: 'China(Taiwan)',  // NOT just 'Taiwan'
  HKG: 'Hong Kong',
  // ... etc
}
```

## Next.js Integration

```typescript
// next.config.mjs — required for native modules
const nextConfig = {
  serverExternalPackages: ['sharp', 'tesseract.js', 'canvas'],
}
```

## Quick Reference: Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| `KU0` instead of `KUO` | O→0 rule ran on line 1 | Digit rules line-2 only |
| `CHUNSCHENG` instead of `CHUN CHENG` | `<` read as `S` | Name S-fix post-processing |
| `SSSCIRNAE` trailing noise | `<<<` read as letters | Add S to `[LKICS]{3,}` pattern |
| Strategy 1 (garbage) wins | Stops at first 2-line result | Score ALL strategies, pick best |
| `TUN` instead of `TWN` | OCR misread country code | Cross-reference from line 2 |
| `CCCKC` in name | `<` read as `C` | Add C to `[LKICS]{3,}` pattern |
| Year `1934` for expiry | Wrong century logic | Use isExpiry flag |
| No MRZ found | Single crop strategy | Multi-strategy pipeline |
| TWN maps to wrong country | Missing China(Taiwan) | Update NATIONALITY_MAP |
