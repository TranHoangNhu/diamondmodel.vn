---
name: vite-to-nextjs
description: Migrate a Vite + React + TypeScript SPA to Next.js App Router. Use this skill whenever the user wants to convert a Vite project to Next.js, migrate from Vite to Next.js, switch from Vite SPA to Next.js SSR/SSG, or asks about "vite to next", "convert to nextjs", "migrate to nextjs", "nextjs migration". Also use when the user mentions wanting server-side rendering, App Router, or file-based routing for an existing Vite React project.
---

# Vite → Next.js Migration Skill

Migrate a Vite + React + TypeScript SPA to Next.js App Router following Next.js official docs. This skill provides a safe, incremental approach — first achieving a working Next.js SPA, then progressively adopting Next.js features.

**Source**: [Next.js Official Migration Guide](https://nextjs.org/docs/app/guides/migrating/from-vite)

---

## Pre-Flight: Analyze Current Project

Before starting, scan the project for migration-relevant details:

```bash
# Gather project intel
cat package.json | head -50          # Dependencies & scripts
cat vite.config.ts                   # Vite plugins & aliases
cat tsconfig.json                    # TS config shape
cat tsconfig.app.json 2>/dev/null    # Vite's app TS config  
cat tsconfig.node.json 2>/dev/null   # Vite's node TS config
ls src/                              # Source structure
cat src/main.tsx                     # Entrypoint
cat src/App.tsx                      # Router & layout
cat index.html                       # HTML template
cat .env 2>/dev/null                 # Environment vars
```

Build a migration checklist based on what you find:
- [ ] Router library? (`react-router-dom` → convert routes to App Router pages)
- [ ] Path aliases? (`@/` → update `tsconfig.json` paths)
- [ ] CSS strategy? (Tailwind v4 via `@tailwindcss/vite` → switch to `@tailwindcss/postcss`)
- [ ] State management? (Zustand, Context → keep as-is, wrap in `'use client'`)
- [ ] Environment vars? (`VITE_` prefix → `NEXT_PUBLIC_`)
- [ ] Static assets in `public/`? (Keep as-is)
- [ ] Image imports? (Vite string URLs → Next.js `Image` objects)
- [ ] External fonts? (Google Fonts `<link>` → `next/font`)
- [ ] UI libraries? (shadcn/ui, Radix → compatible, may need alias update)

---

## Phase 1: SPA Migration (Get It Running)

The goal is a working Next.js app **as fast as possible** before optimizing. Keep the existing client-side router initially.

### Step 1: Install Next.js

```bash
npm install next@latest
```

### Step 2: Create `next.config.mjs`

Create at project root. Start with SPA mode (`output: 'export'`) for a safe first migration:

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // SPA mode (static export)
  distDir: './dist',       // Keep same build output dir
  images: {
    unoptimized: true,     // Required for static export
  },
}
export default nextConfig
```

> If the project will use SSR/API routes later, remove `output: 'export'` in Phase 2.

### Step 3: Update TypeScript Configuration

Replace the multi-file tsconfig with a single merged `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["./src", "./dist/types/**/*.ts", "./next-env.d.ts"],
  "exclude": ["./node_modules"]
}
```

**Key changes from Vite tsconfig:**
- Remove `references` to `tsconfig.node.json` and `tsconfig.app.json`
- Add `plugins: [{ "name": "next" }]`
- Add `./dist/types/**/*.ts` and `./next-env.d.ts` to `include`
- Set `esModuleInterop: true`, `allowJs: true`, `incremental: true`

### Step 4: Create Root Layout (`src/app/layout.tsx`)

Create `src/app/` directory structure:

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'

// Import global CSS — adjust path relative to this file
import '../index.css'

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Move <link> tags from old index.html here, or use next/font */}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

**Migrating from `index.html`:**
- Copy `<head>` content (fonts, meta) into the layout
- Remove `<meta charset>` and `<meta viewport>` (Next.js adds them)
- Remove `<script type="module" src="/src/main.tsx">` (Next.js handles this)
- Move `robots.txt`, `favicon`, `icons` into `src/app/` for auto-detection

### Step 5: Create Entrypoint Page

Create a catch-all route that renders your existing `App` component:

```tsx
// src/app/[[...slug]]/page.tsx
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

```tsx
// src/app/[[...slug]]/client.tsx
'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

This wraps the entire Vite app as a client-only component initially. All existing routes via `react-router-dom` continue working.

### Step 6: Update Static Image Imports

Vite returns image imports as strings, Next.js returns objects.

```tsx
// Before (Vite)
import logo from './logo.png'
<img src={logo} />

// After (Next.js) — Option A: use .src
import logo from './logo.png'
<img src={logo.src} />

// After (Next.js) — Option B: use next/image
import Image from 'next/image'
import logo from './logo.png'
<Image src={logo} alt="Logo" />

// Public folder images — no change needed
<img src="/logo.png" />
```

### Step 7: Migrate Environment Variables

| Vite | Next.js |
|------|---------|
| `VITE_API_URL` | `NEXT_PUBLIC_API_URL` |
| `import.meta.env.VITE_X` | `process.env.NEXT_PUBLIC_X` |
| `import.meta.env.MODE` | `process.env.NODE_ENV` |
| `import.meta.env.PROD` | `process.env.NODE_ENV === 'production'` |
| `import.meta.env.DEV` | `process.env.NODE_ENV !== 'production'` |
| `import.meta.env.SSR` | `typeof window !== 'undefined'` |
| `import.meta.env.BASE_URL` | `process.env.NEXT_PUBLIC_BASE_PATH` |

Run a search-and-replace across the codebase:
```bash
grep -rn "import.meta.env" src/
grep -rn "VITE_" src/ .env
```

### Step 8: Update `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Step 9: Update `.gitignore`

Add Next.js artifacts:
```
.next
next-env.d.ts
dist
```

### Step 10: Handle Tailwind CSS v4

If using `@tailwindcss/vite` plugin, switch to PostCSS:

```bash
npm install @tailwindcss/postcss
npm uninstall @tailwindcss/vite
```

Create/update `postcss.config.mjs`:
```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

The `@import "tailwindcss"` in `index.css` stays the same.

### Step 11: Clean Up Vite Artifacts

After confirming `npm run dev` works:

```bash
# Delete Vite-specific files
rm -f src/main.tsx       # Next.js uses app/page.tsx
rm -f src/App.tsx        # Replaced by App Router (src/app/)
rm -f index.html         # Replaced by app/layout.tsx
rm -f vite-env.d.ts      # Replaced by next-env.d.ts
rm -f src/vite-env.d.ts  # May also exist here
rm -f tsconfig.node.json # Merged into tsconfig.json
rm -f tsconfig.app.json  # Merged into tsconfig.json
rm -f vite.config.ts     # Replaced by next.config.mjs

# Uninstall Vite dependencies
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite react-router-dom
```

> ⚠️ **CRITICAL**: Delete `src/App.tsx` and `src/main.tsx` BEFORE running `next build`. These files still import `react-router-dom` and will cause TypeScript errors.

### Step 12: Rename `src/pages/` → `src/views/` (MANDATORY)

Next.js treats `src/pages/` as Pages Router automatically. If your Vite project had components in `src/pages/`, they will conflict with App Router and appear as phantom routes in sitemaps.

```bash
# Rename to avoid Pages Router conflict
mv src/pages src/views

# Update all imports across the codebase
find src/app -name "page.tsx" -exec sed -i "s|@/pages/|@/views/|g" {} +

# Clean .next cache after rename (REQUIRED or build uses stale paths)
rm -rf .next
```

> 💡 Without this step, `next-sitemap` will generate URLs like `/ApplicationForm`, `/SecureCheckout` (component filenames) instead of actual routes like `/apply`, `/checkout`.

---

## Phase 2: Progressive Next.js Adoption (After SPA Works)

Once the SPA migration is stable, adopt Next.js features incrementally:

### Convert React Router → App Router Pages

For each route in `App.tsx`, create a corresponding Next.js page:

```
react-router-dom Route          →  Next.js App Router
─────────────────────────────      ─────────────────────
/                               →  src/app/page.tsx
/apply                          →  src/app/apply/page.tsx
/review                         →  src/app/review/page.tsx
/checkout                       →  src/app/checkout/page.tsx
/success                        →  src/app/success/page.tsx
/tracking                       →  src/app/tracking/page.tsx
/contact                        →  src/app/contact/page.tsx
```

Each page file wraps the existing component with `'use client'`:

```tsx
// src/app/apply/page.tsx
'use client'
import ApplicationForm from '@/views/ApplicationForm'
export default function ApplyPage() {
  return <ApplicationForm />
}
```

> ⚠️ **Note**: Import from `@/views/` not `@/pages/` — see Step 12 above.

#### Special Case: Pages using `useSearchParams()`

Pages that use `useSearchParams()` from `next/navigation` require a `<Suspense>` boundary, otherwise SSG prerendering will fail:

```tsx
// src/app/tracking/page.tsx
'use client'
import { Suspense } from 'react'
import Tracking from '@/views/Tracking'

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>}>
      <Tracking />
    </Suspense>
  )
}
```

Also note: Next.js `useSearchParams()` returns the object directly, NOT a tuple like react-router-dom:

```tsx
// react-router-dom (old)
const [searchParams] = useSearchParams()

// next/navigation (new) — NO destructuring
const searchParams = useSearchParams()
```

Move shared layout (`Header`, `Footer`) to `src/app/layout.tsx`.

After all routes are converted, remove `react-router-dom`:
```bash
npm uninstall react-router-dom
```

### Replace `useNavigate` with `next/navigation`

```tsx
// Before (react-router-dom)
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/apply')

// After (next/navigation)
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/apply')

// For links — IMPORTANT: `to` → `href`
// Before
import { Link } from 'react-router-dom'
<Link to="/apply">Apply</Link>

// After
import Link from 'next/link'
<Link href="/apply">Apply</Link>
```

> ⚠️ **Common mistake**: Forgetting to change `to=` to `href=` on inner `<Link>` tags (e.g., in Footer with many links). Use batch replace:
> ```bash
> sed -i 's/ to="/ href="/g' src/components/layout/Footer.tsx
> ```

### Adopt next/font (Replace Google Fonts CDN)

```tsx
// src/app/layout.tsx
import { Public_Sans } from 'next/font/google'

const publicSans = Public_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-public-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Enable SSR (Remove Static Export)

```js
// next.config.mjs — remove the `output: 'export'` line
const nextConfig = {
  // output: 'export',  ← REMOVE THIS
  images: {
    // unoptimized: true,  ← REMOVE if using optimized images
  },
}
```

### Add Metadata & SEO per Page

```tsx
// src/app/apply/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for Vietnam E-visa | VisaGoVietnam',
  description: 'Fill out your Vietnam e-visa application form...',
}
```

### Add Dynamic Sitemap

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://visagovietnam.com'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
```

---

## Common Gotchas

### 🔴 Battle-Tested (from real migration)

| Issue | Solution |
|-------|----------|
| **Phantom routes in sitemap** (`/ApplicationForm`, `/Home`) | Rename `src/pages/` → `src/views/` — Next.js treats `src/pages/` as Pages Router |
| **Config file ESM error** (`ERR_REQUIRE_ESM`) | When `package.json` has `"type": "module"`, config files need `.cjs` extension (e.g., `next-sitemap.config.cjs`) |
| **Build error: `prerender-error` on tracking page** | `useSearchParams()` requires `<Suspense>` boundary for static prerendering |
| **Stale build cache after rename** | Delete `.next/` directory: `rm -rf .next` before rebuilding |
| **Old `App.tsx`/`main.tsx` causing TS errors** | Must delete these files BEFORE `next build` — they still import `react-router-dom` |
| **`Link to=` still in code** | `next/link` uses `href=`, not `to=`. Easy to miss in files with many links — use `sed` batch replace |
| **`useSearchParams` destructuring** | Next.js returns object directly (`const sp = useSearchParams()`), NOT tuple like react-router-dom |
| **Vercel still builds as Vite** after migration | Vercel locks framework setting. Must PATCH via API: `curl -X PATCH -H "Authorization: Bearer $TOKEN" -d '{"framework":"nextjs"}' "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID"` |
| **Vercel production still serves old Vite build** | `vercel deploy` creates **preview** only. Need `vercel deploy --prod` to replace production. Git push auto-deploy also fails if framework is still `vite` |

### 🟡 Standard Issues

| Issue | Solution |
|-------|----------|
| `window is not defined` | Wrap in `'use client'` or use `dynamic(() => import(...), { ssr: false })` |
| Image imports broken | Use `logo.src` instead of `logo` for `<img>` tags |
| `@/` path alias not resolving | Ensure `tsconfig.json` has `baseUrl` and `paths` configured |
| Tailwind not working | Switch from `@tailwindcss/vite` to `@tailwindcss/postcss` |
| `useNavigate` errors | Replace with `useRouter` from `next/navigation` |
| Google Fonts FOUT | Use `next/font` instead of `<link>` CDN |
| `import.meta.env` errors | Replace with `process.env.NEXT_PUBLIC_*` |
| Build fails with `output: 'export'` + dynamic routes | Add `generateStaticParams()` to dynamic pages |
| Material Symbols Outlined | Keep as CDN `<link>` in `layout.tsx` head, or use `next/script` |

---

## Verification Checklist

After migration, verify:

- [ ] `npm run dev` starts without errors
- [ ] All routes render correctly
- [ ] CSS/Tailwind styles look correct
- [ ] Path aliases (`@/`) resolve properly
- [ ] Environment variables work
- [ ] Static assets (images, fonts) load
- [ ] `npm run build` completes without errors
- [ ] Production preview (`npm start`) works
- [ ] SEO metadata renders in HTML source
- [ ] State management (Zustand) still works
- [ ] **Vercel framework** is set to `nextjs` (not `vite`)
- [ ] **Vercel production** deploy shows Next.js in Wappalyzer
- [ ] **Wappalyzer** detects Next.js (not just React Router)

---

## Phase 3: Post-Migration Optimization

After migration is stable, run a performance audit:

### Run Performance Checker

```bash
python .agent/skills/nextjs-react-expert/scripts/react_performance_checker.py src/
```

### Apply Best Practices

Use `@[skills/react-best-practices]` to optimize:

1. **Eliminate waterfalls** — Convert sequential `await` to `Promise.all()` in API routes
2. **Optimize bundle** — Use `next/dynamic` for heavy components, avoid barrel imports
3. **Server Components** — Convert data-display components from `'use client'` to Server Components
4. **Resource hints** — Add `preload()`, `preconnect()` for fonts and API origins

### React 19 Migration Notes

If upgrading from React 18 to 19 alongside the Vite→Next.js migration:

| React 18 | React 19 |
|----------|----------|
| `forwardRef()` | `ref` as regular prop |
| `useContext(MyCtx)` | `use(MyCtx)` |
| Manual loading state | `useTransition` + `isPending` |
| `React.lazy()` | `use(promise)` for Suspense |
| `useFormState()` | `useActionState()` |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
