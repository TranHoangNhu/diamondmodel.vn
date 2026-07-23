# AGENTS.md — Diamond Model Agent Rules

This file is the source of truth for AI coding agents working on the **diamondmodel.vn** repository.

Use it to keep Codex / coding agents aligned with:
- the Next.js frontend architecture,
- the LOOM CMS API contract,
- fallback-first behavior,
- Vietnamese route conventions,
- the Obsidian Brain knowledge base.

---

## 0. Core Instruction

Before making any code changes, the agent MUST read this file and treat it as binding project context.

If this file conflicts with verified source code in the repository, inspect the code and report the conflict before changing behavior.

If a task requires architecture, CMS, routing, SEO, or data-layer decisions, the agent MUST consult the Obsidian Brain notes when available.

---

## 1. Repository Boundary

```txt
diamondmodel.vn/                    ← THIS REPO / workspace root
└── website/                        ← Next.js 16 frontend
    ├── src/app/                    ← App Router routes, Vietnamese slugs only
    ├── src/components/             ← React components
    ├── src/lib/                    ← CMS integration, constants, fallback content
    └── src/hooks/                  ← Custom hooks

EXTERNAL DEPENDENCY — separate repo, do not edit from here:
LOOM-VN/cms-looms-vn/               ← CMS backend
├── cms-api/                        ← NestJS REST API, port 3002
└── cms-admin/                      ← React Admin SPA
```

This repository is the frontend workspace. The agent MUST NOT edit CMS backend files unless the CMS repository is explicitly opened and the user asks for backend changes.

For frontend tasks, treat the CMS as an external read-only API provider.

---

## 2. Live Services

| Service | URL | Tech |
|---|---|---|
| Website | `diamondmodel.vn` | Next.js 16.2.3 |
| CMS API | `admin.mohinhkimcuong.vn` / `cms.looms.vn` | NestJS |
| Media CDN | `media.looms.vn` | MinIO S3 |

---

## 3. Website Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.3 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS v4 CSS-first | ^4 |
| Animation | Framer Motion + CSS keyframes | 12.38 |
| Icons | Heroicons v2 | 2.2.0 |
| Language | TypeScript | ^5 |
| Fonts | SVN-Moneta local heading + Mulish Google body | — |

---

## 4. Route Map

Routes MUST use Vietnamese slugs without accents. Do NOT create English routes.

```txt
/                     → app/page.tsx
/gioi-thieu           → app/gioi-thieu/
/du-an                → app/du-an/
/du-an/[slug]         → app/du-an/[slug]/
/dich-vu              → app/dich-vu/
/dich-vu/[slug]       → app/dich-vu/[slug]/
/tin-tuc              → app/tin-tuc/
/tin-tuc/[slug]       → app/tin-tuc/[slug]/
/lien-he              → app/lien-he/
/sitemap.xml          → app/sitemap.ts
/robots.txt           → app/robots.txt/
/llms.txt             → app/llms.txt/
/llms-full.txt        → app/llms-full.txt/
```

---

## 5. CMS API Contract — Critical

The website is a **read-only consumer** of LOOM CMS.

Authentication uses the `x-api-key` header.

Never change the CMS response shape in the frontend without updating the corresponding mapping functions and fallback data.

### 5.1 Content APIs

Implementation file: `src/lib/cms-content.ts`

| Endpoint | Frontend Function | Fallback |
|---|---|---|
| `GET /api/public/projects?limit=100` | `getCmsCollection("du-an")` | `PROJECT_COLLECTION` |
| `GET /api/public/services?limit=100` | `getCmsCollection("dich-vu")` | `SERVICE_COLLECTION` |
| `GET /api/public/articles?limit=100` | `getCmsCollection("tin-tuc")` | `NEWS_COLLECTION` |
| `GET /api/public/projects/:slug` | `getCmsArticleBySlug("du-an", slug)` | `getArticleBySlug()` |
| `GET /api/public/services/:slug` | `getCmsArticleBySlug("dich-vu", slug)` | `getArticleBySlug()` |
| `GET /api/public/articles/:slug` | `getCmsArticleBySlug("tin-tuc", slug)` | `getArticleBySlug()` |
| `GET /api/public/pages/gioi-thieu` | `getCmsAboutArticle()` | `ABOUT_ARTICLE` |

### 5.2 Settings APIs

Implementation file: `src/lib/cms-settings.ts`

| Endpoint | Frontend Function | Cache |
|---|---|---|
| `GET /api/public/settings/home` | `getCmsHeroSlides()` | 60s ISR |
| `GET /api/public/settings/general` | `getCmsGeneralSettings()` | no-store |
| `GET /api/public/settings/contact` | `getCmsContactSettings()` | no-store |

### 5.3 SEO APIs

Implementation file: `src/lib/cms-seo.ts`

| Endpoint | Frontend Function | Cache |
|---|---|---|
| `GET /api/public/settings/seo` | `fetchCmsSeoSettings()` | 1h ISR |
| `GET /api/seo/sitemap` | `fetchCmsSitemap()` | 1h ISR |
| `GET /api/seo/robots.txt` | `fetchCmsSeoText()` | 1h ISR |
| `GET /api/seo/llms.txt` | `fetchCmsSeoText()` | 1h ISR |
| `GET /api/seo/llms-full.txt` | `fetchCmsSeoText()` | 1h ISR |
| `GET /api/seo/metadata/:type/:slug` | `fetchCmsSeoMetadata()` | 1h ISR |

### 5.4 Timeout and Fallback

```txt
CMS_TIMEOUT_MS = 3500ms
If CMS is unreachable → content fallbacks come from `src/lib/site-content.ts`, while settings and SEO routes/pages keep their local default values/builders.
```

Fallback-first behavior is mandatory.

When adding CMS-driven content or fields:
1. add or update the CMS mapper,
2. update TypeScript types,
3. add corresponding fallback data in `src/lib/site-content.ts`,
4. verify the frontend still works when CMS is offline.

---

## 6. Design System

### 6.1 Colors

| Token / Use | Value |
|---|---|
| Primary teal | `#0c3c4c` |
| Luxury gold | `#c0a483` |
| Warm cream | `#f7f1e8` |
| Body text | `#4f4b46` |

### 6.2 Typography

| Use | Font |
|---|---|
| Headings | `--font-heading` → SVN-Moneta, local serif |
| Body | `--font-body` → Mulish, Google sans-serif |

### 6.3 Key CSS Classes

Use existing project classes before creating new patterns:

```txt
.btn-primary
.btn-outline
.ph-title
.ph-eyebrow
.section-title
.ph-container
.ph-container-wide
.img-zoom
.card-lift
.link-underline
.cms-richtext
```

---

## 7. Key Files Quick Reference

| Task | File |
|---|---|
| Add or edit navigation | `website/src/lib/site-nav.ts` → `SITE_NAV_ITEMS` |
| Edit company info | `website/src/lib/diamond-vn.ts` → `DIAMOND_VN_COMPANY` |
| Edit design tokens | `website/src/app/globals.css` → `@theme {}` |
| Add image domain | `website/next.config.ts` → `remotePatterns` |
| Edit global metadata | `website/src/app/layout.tsx` → `generateMetadata()` |
| CMS content fetcher | `website/src/lib/cms-content.ts` |
| CMS SEO fetcher | `website/src/lib/cms-seo.ts` |
| CMS settings fetcher | `website/src/lib/cms-settings.ts` |
| Static fallback data | `website/src/lib/site-content.ts` |
| Home hero | `website/src/components/home/HeroSection.tsx` |
| Header / Footer | `website/src/components/layout/Header.tsx` / `Footer.tsx` |
| Floating CTA | `website/src/components/ui/FloatingContact.tsx` |

---

## 8. Obsidian Brain Integration — Required

The Obsidian Brain is the deeper architectural knowledge base.

Before making architecture-level, CMS, routing, SEO, data-layer, or cross-cutting design-system changes, the agent MUST consult Obsidian Brain notes if they are available in the environment.

Priority notes:

| Note | Purpose |
|---|---|
| `00 — System Architecture Map` | Master topology and API mapping |
| `01 — API Contract` | Exact request/response specs |
| `02 — Agent Dev Runbook` | Detailed agent workflow rules |
| `LOOM-CMS/` | CMS backend architecture |
| `Diamondmodel-Nextjs/` | Frontend architecture |

### If Obsidian Brain is accessible

The agent MUST:
1. read the relevant note(s),
2. compare the note against current source code,
3. prefer current source code if there is a conflict,
4. report any mismatch between Brain and code.

### If Obsidian Brain is not accessible

The agent MUST:
1. state that the vault is unavailable in the current environment,
2. use this `AGENTS.md` and repository source code as fallback truth,
3. avoid changing CMS contracts unless the API shape is verified from code,
4. avoid inventing paths, endpoints, fields, or architecture details.

### Recommended Brain Access

If the vault is outside the repo, expose it to agents through one of these:
- mount/copy the relevant notes into the workspace,
- a read-only `obsidian/` or `docs/brain/` folder,
- an MCP server or approved file connector.

Never copy secrets from Obsidian into source code or this file.

---

## 9. Agent Operating Protocol

### 9.1 Before editing

The agent MUST:
1. identify the task scope,
2. inspect relevant files before editing,
3. check whether the task touches CMS/API/SEO/routing/design-system,
4. consult Obsidian Brain for those areas when available,
5. plan the minimal safe change.

### 9.2 While editing

The agent MUST:
- keep changes small and local,
- follow existing code style,
- preserve TypeScript types,
- preserve fallback-first behavior,
- prefer Server Components by default,
- only add `"use client"` for browser-only behavior such as scroll state, event listeners, gestures, or client hooks,
- avoid adding dependencies unless explicitly justified.

### 9.3 After editing

The agent MUST:
1. run relevant checks,
2. summarize changed files,
3. explain any assumptions,
4. mention any checks not run and why.

---

## 10. Safety Rules

### Rule 1 — API Contract Integrity

Do NOT change CMS API response assumptions without updating:
- TypeScript types,
- mapper functions such as `toArticleItem()`,
- all affected frontend usage,
- fallback content.

Check `CmsContentBase`, `CmsProject`, and related types before adding fields.

### Rule 2 — Fallback First

When adding CMS data, always add fallback data in `src/lib/site-content.ts`.

The frontend MUST still render when CMS is offline.

### Rule 3 — Media URL Chain

```txt
CMS Upload → MinIO media-{slug} → media.looms.vn → Next.js <Image>
```

When touching media URLs, verify:
- `normalizeCmsAssetUrl()`,
- `next.config.ts` `remotePatterns`,
- image rendering with Next.js `<Image>`.

### Rule 4 — Vietnamese Slugs

Routes use Vietnamese slugs without accents:
- `/gioi-thieu`
- `/du-an`
- `/dich-vu`
- `/tin-tuc`
- `/lien-he`

Do NOT create English alternatives such as `/about`, `/projects`, `/services`, `/news`, `/contact`.

### Rule 5 — Server Components Default

Pages and layouts are Server Components by default.

Only use `"use client"` when browser APIs or interactive state are required.

### Rule 6 — Tailwind CSS v4

Tailwind tokens live in `globals.css` using the `@theme {}` block.

Do NOT introduce `tailwind.config.ts` for new tokens unless the project explicitly adopts that pattern.

Use:

```css
@import "tailwindcss";
```

Do NOT use old Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Rule 7 — No Secrets

Never commit secrets, tenant API keys, passwords, tokens, private URLs, or production credentials.

Environment variables may be documented by name only.

---

## 11. Development Commands

Run commands from the `website/` directory.

```bash
cd website
npm run dev          # Start dev server, usually port 3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

### Environment Variables

```env
CMS_API_URL=https://admin.mohinhkimcuong.vn
CMS_API_KEY=
```

Never hard-code `CMS_API_KEY`.

---

## 12. Verification Checklist

Use the smallest relevant verification set for the task.

### For most code changes

```bash
cd website
npm run lint
```

### For routing, data fetching, metadata, CMS, or build-sensitive changes

```bash
cd website
npm run build
```

### For visual or interactive changes

If possible:
1. run the dev server,
2. inspect the affected route,
3. test desktop and mobile responsive states,
4. verify hover/focus/animation states do not break layout.

### For CMS-related changes

Verify:
- CMS online path works,
- fallback path works,
- empty/missing fields do not crash the page,
- images normalize correctly,
- ISR/cache behavior remains intentional.

---

## 13. Definition of Done

A task is complete only when the agent has:

1. inspected the relevant files,
2. made the smallest safe change,
3. preserved Vietnamese routes,
4. preserved CMS read-only behavior,
5. preserved fallback-first behavior,
6. updated fallback data when CMS data changed,
7. run relevant checks or explained why checks were not run,
8. reported changed files,
9. reported assumptions or unavailable context,
10. avoided secrets and unrelated rewrites.

Final response should include:
- what changed,
- files changed,
- checks run,
- any warnings or follow-up needed.

---

## 14. PR / Review Expectations

When preparing a PR summary, include:

```txt
Summary:
- ...

Checks:
- npm run lint
- npm run build

Risk:
- ...

Fallback behavior:
- ...
```

For CMS/API changes, include:

```txt
CMS contract impact:
- Endpoint:
- Mapper:
- Fallback:
- Cache:
```

---

## 15. Common Task Playbooks

### 15.1 Add a new navigation item

1. Edit `website/src/lib/constants.ts`.
2. Update `NAV_ITEMS`.
3. Ensure route exists under `website/src/app/`.
4. Keep slug Vietnamese and no accents.
5. Check Header/Footer if nav is duplicated.

### 15.2 Add a new CMS field

1. Inspect CMS type in `cms-content.ts`, `cms-settings.ts`, or `cms-seo.ts`.
2. Update TypeScript interface.
3. Update mapper.
4. Update rendering component.
5. Add fallback in `site-content.ts`.
6. Test missing field behavior.

### 15.3 Add a new image host

1. Edit `website/next.config.ts`.
2. Add host to `remotePatterns`.
3. Check `normalizeCmsAssetUrl()`.
4. Verify affected `<Image>` usage.

### 15.4 Edit global design tokens

1. Edit `website/src/app/globals.css`.
2. Use Tailwind v4 `@theme {}`.
3. Reuse existing classes where possible.
4. Check visual regressions on home, archive, and detail pages.

### 15.5 Edit SEO / AEO

1. Inspect `website/src/lib/cms-seo.ts`.
2. Inspect `website/src/app/layout.tsx`.
3. Check sitemap, robots, `llms.txt`, and metadata generation.
4. Preserve 1h ISR unless the task explicitly changes cache policy.

---

## 16. Do Not Do

The agent MUST NOT:
- create English routes,
- edit external CMS repo from this frontend workspace,
- remove fallback data,
- assume CMS is always online,
- hard-code API keys,
- change API response shape silently,
- add client components unnecessarily,
- introduce new styling systems,
- create broad rewrites unrelated to the task,
- invent Obsidian Brain content when the vault is unavailable.

---

## 17. Agent Communication Style

When reporting back to the user:
- be concise,
- use Vietnamese if the user uses Vietnamese,
- mention real files and commands,
- clearly state uncertainties,
- do not claim a check passed unless it was actually run.

For long or risky tasks, explain the plan before editing.
