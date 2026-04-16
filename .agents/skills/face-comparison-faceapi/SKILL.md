---
name: face-comparison-faceapi
description: Compare faces between two photos using face-api.js on server-side Node.js (Next.js API routes). Use this skill when building face matching, identity verification, KYC face comparison, or any feature that compares faces between a portrait and a document photo. This skill contains critical knowledge about why Cosine Similarity gives WRONG results with face-api.js and the correct Gaussian decay formula calibrated to match the Vietnam government e-visa portal. Also covers face-api.js + canvas + sharp setup in Next.js.
---

# Face Comparison with face-api.js

Server-side face comparison using **face-api.js** for Node.js. This skill captures the critical math and setup traps from building a face comparison system that matches the Vietnam government e-visa portal's accuracy.

## Tech Stack

```bash
npm install face-api.js canvas sharp
```

### Required face-api.js model files

Download to `public/models/`:
```bash
# From https://github.com/justadudewhohacks/face-api.js/tree/master/weights
# Required models:
# - tiny_face_detector_model-weights_manifest.json + shard
# - face_landmark_68_model-weights_manifest.json + shard
# - face_expression_model-weights_manifest.json + shard  
# - face_recognition_model-weights_manifest.json + shard1 + shard2
```

The `faceRecognitionNet` is the key one — it produces the 128-dimensional descriptors used for comparison.

## ⚠️ Critical: Distance-to-Percentage Formula

### DO NOT use Cosine Similarity

face-api.js descriptors are **L2-normalized** (unit vectors). This means:
- Cosine similarity = simply the dot product
- For unit vectors, cosine sim is **compressed in the high range**
- **Two completely different people** can get cosine sim of 0.85-0.95 → shows 91% match!

This was debugged extensively. Cosine Similarity gives dangerously inflated scores and is NOT suitable for face-api.js descriptors.

### DO NOT use linear mapping

The naive formula `(1 - distance / 1.5) * 100` is also wrong:
- Euclidean distance 0.8 (different people) → gives 47% — too high!
- Doesn't discriminate well between same/different person

### ✅ Correct formula: Gaussian Decay

```typescript
/**
 * Convert Euclidean distance to match percentage using Gaussian decay
 * Calibrated to match Vietnam government e-visa portal:
 *   - Same person (distance ~0.3): ~73%
 *   - Different person (distance ~1.0): ~3%
 *   - Identical image (distance 0): 100%
 * 
 * Formula: 100 * exp(-3.5 * distance²)
 */
function distanceToMatchPercentage(distance: number): number {
  const ALPHA = 3.5  // Decay steepness — calibrated to gov portal
  const raw = 100 * Math.exp(-ALPHA * distance * distance)
  return parseFloat(raw.toFixed(2))
}
```

### Calibration reference table:

| Euclidean Distance | Match % | Meaning |
|-------------------|---------|---------|
| 0.0 | 100% | Identical image |
| 0.2 | 87% | Same person, very similar |
| 0.3 | 73% | Same person, different photo |
| 0.4 | 57% | Same person, significant variation |
| 0.5 | 42% | Borderline |
| 0.6 | 28% | Likely different person |
| 0.8 | 11% | Different person |
| 1.0 | 3% | Completely different |
| 1.2+ | <1% | Unrelated |

Match threshold: **≥ 50% = same person**

## face-api.js Setup in Node.js

The setup requires monkeypatching with `canvas` because face-api.js expects browser APIs:

```typescript
async function loadFaceApi() {
  const canvasModule = await import('canvas')
  const faceapi = await import('face-api.js')
  const { join } = await import('path')

  const { Canvas, Image, ImageData, createCanvas, loadImage } = canvasModule

  // MUST monkeypatch — face-api.js expects browser APIs
  // Use `as any` to bypass TypeScript incompatibility between
  // node-canvas types and browser DOM types
  faceapi.env.monkeyPatch({ Canvas, Image, ImageData } as any)

  const modelsPath = join(process.cwd(), 'public', 'models')
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelsPath)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath)
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelsPath)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath)

  return { faceapi, canvasModule, createCanvas, loadImage }
}
```

## Face Detection with Descriptor

```typescript
async function detectFaceWithDescriptor(faceapi, canvasModule, imageBuffer, width, height) {
  const img = await canvasModule.loadImage(imageBuffer)
  const cvs = canvasModule.createCanvas(width, height)
  const ctx = cvs.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  const detection = await faceapi
    .detectSingleFace(cvs as unknown as HTMLCanvasElement,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.3 })
    )
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptor()

  return detection || null
}
```

Key: `inputSize: 416` and `scoreThreshold: 0.3` — lower threshold helps detect faces in passport photos (which are often small, low-res).

> **⚠️ WARNING**: Do NOT use `scoreThreshold: 0.5` — it causes "No face detected" errors on valid portrait photos (especially older people, lower contrast photos, or non-ideal lighting). Use `0.3` for both `validate-portrait` AND `compare-faces` routes.

## Portrait Validation Checks

After detecting a face, validate before comparison:

```typescript
// 1. Face size ratio (face area / image area)
const faceAreaRatio = (box.width * box.height) / (imgW * imgH)
if (faceAreaRatio < 0.08) error('Face too small')
if (faceAreaRatio < 0.15) warn('Face could be larger')

// 2. Detection confidence
if (detection.score < 0.8) warn('Low confidence')

// 3. Head tilt (using eye landmarks)
const leftEye = landmarks.getLeftEye()   // array of points
const rightEye = landmarks.getRightEye()
const lc = centerOf(leftEye)
const rc = centerOf(rightEye)
const tilt = Math.abs(Math.atan2(rc.y - lc.y, rc.x - lc.x) * (180 / Math.PI))
if (tilt > 15) warn('Head tilted')

// 4. Expression check
const dominant = Object.entries(expressions).reduce(/*max*/)
if (dominant !== 'neutral' && dominant !== 'happy' && confidence > 0.7) {
  warn('Maintain neutral expression')
}
```

## Cropping Face to Thumbnail

Return cropped face as base64 for UI display:

```typescript
async function cropFaceToBase64(imgBuffer, box, imgW, imgH) {
  const pad = 0.35  // 35% padding around face
  const x = Math.max(0, Math.round(box.x - box.width * pad))
  const y = Math.max(0, Math.round(box.y - box.height * pad))
  const w = Math.min(imgW - x, Math.round(box.width * (1 + 2 * pad)))
  const h = Math.min(imgH - y, Math.round(box.height * (1 + 2 * pad)))

  const cropped = await sharp(imgBuffer)
    .extract({ left: x, top: y, width: w, height: h })
    .resize(120, 120, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toBuffer()

  return `data:image/jpeg;base64,${cropped.toString('base64')}`
}
```

## Next.js Configuration

```javascript
// next.config.mjs
const nextConfig = {
  serverExternalPackages: ['sharp', 'canvas', 'face-api.js'],
}
```

Do NOT add webpack `externals` config — it breaks Turbopack. `serverExternalPackages` alone is sufficient.

## Quick Reference: Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| 91% match for different people | Used Cosine Similarity | Use Euclidean + Gaussian `100*exp(-3.5d²)` |
| 47% match for different people | Linear mapping `1-d/1.5` | Use Gaussian decay |
| `Cannot find module 'canvas'` | Missing serverExternalPackages | Add to next.config.mjs |
| TypeScript error on monkeyPatch | canvas vs DOM type mismatch | Cast `as any` |
| No face detected in passport | scoreThreshold too high | Use 0.3, inputSize 416 |
| Webpack error with Turbopack | webpack config conflicts | Remove webpack config, use serverExternalPackages only |
