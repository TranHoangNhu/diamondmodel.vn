---
name: kyc-upload-nextjs
description: Build a complete KYC (Know Your Customer) upload flow for e-visa or identity verification applications in Next.js. Includes a 3-column upload UI (portrait + passport + face compare), progressive validation workflow, MRZ auto-fill into form fields, and face comparison integration. Use this skill when building document upload UX, identity verification flows, passport upload features, or any form that needs to extract and validate data from identity documents with live user feedback.
---

# KYC Upload Flow for Next.js

Build a complete Know Your Customer (KYC) document upload experience with portrait photo, passport scan, and face comparison — integrated into a form that auto-fills from MRZ data.

**Depends on**: `mrz-ocr-passport` skill (for MRZ parsing) and `face-comparison-faceapi` skill (for face matching).

## UX Architecture

### 3-Column Layout (Desktop)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Portrait   │  │   Passport   │  │ Face Compare │
│   4x6 photo  │  │  data page   │  │   results    │
│              │  │              │  │              │
│  [Preview]   │  │  [Preview]   │  │ [thumb] [thumb] │
│              │  │   ✅ parsed  │  │  Match: 73%  │
│              │  │              │  │  ⚠ Head tilt │
│ [Choose file]│  │ [Choose file]│  │ [Re-compare] │
│              │  │  ┌─ MRZ ──┐ │  │              │
│              │  │  │Surname │ │  │              │
│              │  │  │Given   │ │  │              │
│              │  │  │PP#     │ │  │              │
│              │  │  └────────┘ │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Progressive Validation Flow

This is the key UX insight — don't validate everything immediately:

1. **Portrait upload** → Preview only (no API call yet)
2. **Passport upload** → Parse MRZ immediately, auto-fill form
3. **Both uploaded** → Auto-trigger face comparison
4. **Re-upload either** → Reset comparison, re-trigger when ready

```
Portrait uploaded ──┐
                    ├──→ Both ready? ──→ Auto face compare
Passport uploaded ──┘
         │
         └──→ Parse MRZ immediately ──→ Auto-fill form
```

### Why progressive?
- Portrait-only upload needs no API call (just a preview)
- Users often upload passport first to see if MRZ works
- Face comparison is slow (8-30s) — only trigger when necessary
- If either photo is re-uploaded, old comparison is invalidated

## Component Structure

```
KycUploadSection.tsx
  ├── Portrait zone (preview only until passport ready)
  ├── Passport zone (immediate MRZ parsing)
  ├── Face compare zone (auto-triggered when both ready)
  └── Warning banner (low match %)
```

### State Management

```typescript
// Portrait: just file + preview, no validation state
const [portraitFile, setPortraitFile] = useState<File | null>(null)
const [portraitPreview, setPortraitPreview] = useState<string | null>(null)

// Passport: file + preview + MRZ parsing status
const [passportFile, setPassportFile] = useState<File | null>(null)
const [passportStatus, setPassportStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
const [passportFields, setPassportFields] = useState<MrzFields | null>(null)

// Face compare: auto-triggered when both files present
const [compareStatus, setCompareStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
const [compareResult, setCompareResult] = useState<FaceCompareResult | null>(null)
```

### Auto-trigger pattern

```typescript
useEffect(() => {
  if (portraitFile && passportFile && compareStatus === 'idle') {
    runFaceCompare()
  }
}, [portraitFile, passportFile])
```

Reset comparison when either image changes:
```typescript
const handlePortraitUpload = (e) => {
  setPortraitFile(file)
  setCompareStatus('idle')  // Reset!
  setCompareResult(null)
}
```

## Form Integration: Surname vs Given Name

### ⚠️ Government Portal Pattern

The Vietnam e-visa portal (and most government forms) use **separate fields**:
- **Surname (Last name)**: `TRAVELER`
- **Middle and given name (First name)**: `HAPPY`

Do NOT combine into a single "Full Name" field — this doesn't match real forms.

### MRZ → Form mapping

```typescript
// From MRZ library:
// fields.lastName  = "TRAVELER"     ← before << in MRZ line 1
// fields.firstName = "HAPPY"        ← after << in MRZ line 1

// Map to form:
setApplicantSurname(fields.lastName)      // Surname field
setApplicantGivenName(fields.firstName)   // Given name field
```

### Form layout (matching government portal):

```
Row 1: [Surname *] [Given name *] [Date of birth *] [Sex *]
Row 2: [Nationality *]            [Passport Number *]
```

Sex should be a dropdown (Male/Female/Other), not radio buttons — matches government portal and is more compact.

## Visual Feedback Patterns

### Auto-fill indicator
When MRZ auto-fills a field, show:
- Green border + green background tint
- ✨ (auto_awesome) icon inside the input
- Banner: "Fields auto-filled from passport scan. Please verify and correct if needed."

### Face comparison results
- ✅ Green checkmark + "Match: 73%" for same person
- ⚠️ Amber warning + "Match: 12%" for different person
- Display cropped face thumbnails side by side
- Show validation warnings (tilted head, low confidence, etc.)

### Warning banner (when match < threshold)
```
⚠️ Portrait photo may not match the passport photo. 
   Your application may be rejected. Please upload matching photos.
```

## MRZ Feedback Panel

Show extracted data immediately below the passport upload:

```
✅ Passport data extracted
Surname:     TRAVELER
Given name:  HAPPY
Passport №:  E00007734
DOB:         1965-02-05
Nationality: United States
```

## API Endpoints Summary

| Endpoint | Input | Output | Timing |
|----------|-------|--------|--------|
| `POST /api/kyc/parse-passport` | passport image | MRZ fields | 2-10s |
| `POST /api/kyc/compare-faces` | portrait + passport | match %, thumbnails | 8-30s |
| `POST /api/kyc/validate-portrait` | portrait image | validation result | 3-7s |

## Quick Reference: UX Gotchas

| Issue | Solution |
|-------|----------|
| Face compare triggered before both images | Use `useEffect` with both file states |
| Old comparison shown after re-upload | Reset compareStatus to 'idle' on any upload |
| Form says "Full Name" | Split into Surname + Given name (gov portal pattern) |
| No auto-fill indicator | Green border + auto_awesome icon |
| User confused about MRZ status | Show extraction results immediately under passport preview |
| Long face comparison time | Show spinner + "This may take a moment" |
| Nationality code "USA" | Map to "United States" via lookup table |
