# Project Migration Map: visagovietnam.com

## Final Structure (After Migration)

```
visagovietnam.com/
├── next.config.mjs              # Next.js config
├── postcss.config.mjs           # Tailwind v4 PostCSS
├── next-sitemap.config.cjs      # Sitemap + robots.txt (.cjs for ESM!)
├── tsconfig.json                # Unified TypeScript config
├── package.json                 # Scripts: next dev/build/start
├── .gitignore                   # Added .next, next-env.d.ts
├── public/
│   ├── sitemap.xml              # Auto-generated
│   ├── robots.txt               # Auto-generated
│   └── logo-visagovn.svg        # Static assets (unchanged)
└── src/
    ├── app/                     # ✨ NEW: App Router
    │   ├── layout.tsx           # Root layout (from index.html)
    │   ├── client-layout.tsx    # Header + Footer wrapper
    │   ├── page.tsx             # / (Home)
    │   ├── apply/
    │   │   ├── layout.tsx       # SEO metadata
    │   │   └── page.tsx         # /apply
    │   ├── review/
    │   │   ├── layout.tsx
    │   │   └── page.tsx         # /review
    │   ├── checkout/
    │   │   ├── layout.tsx       # noindex robots
    │   │   └── page.tsx         # /checkout
    │   ├── success/
    │   │   └── page.tsx         # /success
    │   ├── tracking/
    │   │   └── page.tsx         # /tracking (Suspense wrapped!)
    │   └── contact/
    │       ├── layout.tsx
    │       └── page.tsx         # /contact
    ├── views/                   # ⚠️ RENAMED from src/pages/
    │   ├── Home.tsx
    │   ├── ApplicationForm.tsx
    │   ├── ReviewAndExtraServices.tsx
    │   ├── SecureCheckout.tsx
    │   ├── Success.tsx
    │   ├── Tracking.tsx
    │   └── Contact.tsx
    ├── components/              # Unchanged (Header, Footer, Stepper)
    ├── store/                   # Unchanged (Zustand)
    └── index.css                # Unchanged (Tailwind v4)
```

## Deleted Files
- `vite.config.ts` → replaced by `next.config.mjs`
- `tsconfig.app.json` → merged into `tsconfig.json`
- `tsconfig.node.json` → merged into `tsconfig.json`
- `index.html` → replaced by `src/app/layout.tsx`
- `src/App.tsx` → replaced by App Router
- `src/main.tsx` → replaced by App Router

## Navigation Migration

| Before (react-router-dom) | After (next/navigation) |
|---|---|
| `import { useNavigate } from 'react-router-dom'` | `import { useRouter } from 'next/navigation'` |
| `const navigate = useNavigate()` | `const router = useRouter()` |
| `navigate('/apply')` | `router.push('/apply')` |
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `<Link to="/apply">` | `<Link href="/apply">` |
| `import { useSearchParams } from 'react-router-dom'` | `import { useSearchParams } from 'next/navigation'` |
| `const [searchParams] = useSearchParams()` | `const searchParams = useSearchParams()` |

## Dependencies Changed
```diff
+ next@16.1.6
+ @tailwindcss/postcss@4.2.1
+ next-sitemap@4.2.3
- vite
- @vitejs/plugin-react
- @tailwindcss/vite
- react-router-dom
- eslint-plugin-react-refresh
```

## Key Gotchas Encountered
1. **`src/pages/` → `src/views/`**: MUST rename or Next.js treats it as Pages Router
2. **`.cjs` extension**: Config files need `.cjs` when `package.json` has `"type": "module"`
3. **Suspense boundary**: `useSearchParams()` requires `<Suspense>` for SSG build
4. **Delete old files first**: `App.tsx` and `main.tsx` cause TS errors if left behind
5. **Clean `.next` cache**: Required after renaming directories
