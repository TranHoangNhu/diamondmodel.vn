---
name: nextjs-sitemap
description: Generate XML sitemaps and robots.txt for Next.js projects using next-sitemap. Covers static sitemaps (postbuild), dynamic/server-side sitemaps via App Router route handlers, index sitemaps for large sites, Google News/image/video sitemaps, multi-language alternateRefs, and custom transform functions. Use this skill whenever the user asks about "sitemap", "robots.txt", "SEO sitemap", "XML sitemap", "generate sitemap", "next-sitemap", "server-side sitemap", "dynamic sitemap", or any sitemap-related task in a Next.js project. Also trigger when the user wants to submit their site to Google Search Console, improve crawlability, or configure search engine indexing.
---

# Next.js Sitemap Generation with `next-sitemap`

Generate production-ready `sitemap.xml` and `robots.txt` for Next.js apps — covering static pages, dynamic routes, server-side sitemaps, and advanced features like Google News, image, and video sitemaps.

**Package**: [`next-sitemap`](https://github.com/iamvishnusankar/next-sitemap) (4.5k+ ⭐, 240+ releases)

---

## Quick Start (3 Steps)

### 1. Install

```bash
npm install next-sitemap
```

### 2. Create Config

Create `next-sitemap.config.js` at project root:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
}
```

> `next-sitemap` auto-loads `.env` files, so `SITE_URL` from `.env` works out of the box.

> ⚠️ **ESM Projects**: If your `package.json` has `"type": "module"`, you MUST rename the config file to `next-sitemap.config.cjs` (CommonJS extension). Without this, you'll get `ERR_REQUIRE_ESM` errors silently and no sitemap will be generated.

### 3. Add Postbuild Script

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

> ⚠️ **For ESM projects** (`"type": "module"` in package.json), use:
> ```json
> "postbuild": "next-sitemap --config next-sitemap.config.cjs"
> ```

After `npm run build`, sitemaps and robots.txt are generated in `public/`.

---

## Configuration Reference

All options for `next-sitemap.config.js`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `siteUrl` | `string` | **required** | Base URL of the site |
| `generateRobotsTxt` | `boolean` | `false` | Auto-generate `robots.txt` |
| `changefreq` | `string` | `'daily'` | Default change frequency |
| `priority` | `number` | `0.7` | Default priority (0.0–1.0) |
| `sitemapSize` | `number` | `5000` | Max URLs per sitemap file (auto-splits) |
| `sitemapBaseFileName` | `string` | `'sitemap'` | Filename prefix |
| `exclude` | `string[]` | `[]` | Glob patterns to exclude (e.g. `['/admin/*', '/api/*']`) |
| `sourceDir` | `string` | `'.next'` | Next.js build directory |
| `outDir` | `string` | `'public'` | Output directory |
| `output` | `'standalone' \| 'export'` | — | Match your `next.config` output mode |
| `autoLastmod` | `boolean` | `true` | Add `<lastmod>` to entries |
| `generateIndexSitemap` | `boolean` | `true` | Create index sitemap |
| `alternateRefs` | `AlternateRef[]` | `[]` | Multi-language hreflang links |
| `transform` | `async fn` | — | Custom per-URL transformation |
| `additionalPaths` | `async fn` | — | Add extra URLs to sitemap |
| `robotsTxtOptions` | `object` | — | Policies, additional sitemaps |

---

## Common Patterns

### Pattern 1: Basic Site with Robots.txt

For a simple site with few pages:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visagovietnam.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,  // No index needed for small sites
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/admin/*', '/checkout', '/success'],
}
```

### Pattern 2: Custom Priority per Route

Use `transform` to assign different priorities based on route importance:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visagovietnam.com',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    // Home page gets highest priority
    if (path === '/') {
      return { loc: path, changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() }
    }

    // Key landing pages
    if (['/apply', '/contact'].includes(path)) {
      return { loc: path, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() }
    }

    // Exclude internal pages from sitemap
    if (['/checkout', '/success', '/tracking'].includes(path)) {
      return null  // Excluded
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
```

### Pattern 3: Multi-language (hreflang)

For sites with multiple language versions:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://visagovietnam.com',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: 'https://visagovietnam.com', hreflang: 'en' },
    { href: 'https://vi.visagovietnam.com', hreflang: 'vi' },
    { href: 'https://zh.visagovietnam.com', hreflang: 'zh' },
  ],
}
```

### Pattern 4: Large Site with Auto-Splitting

For sites with thousands of pages:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,  // Split into sitemap-0.xml, sitemap-1.xml, etc.
  // sitemap.xml becomes an index pointing to all parts
}
```

### Pattern 5: Additional Dynamic Paths

Add URLs that aren't auto-detected (e.g., from a CMS or database):

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    // Fetch from CMS, database, or API
    const blogPosts = await fetch('https://api.example.com/posts').then(r => r.json())

    return blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: post.updatedAt,
    }))
  },
}
```

### Pattern 6: Custom Robots.txt Policies

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/admin/', '/checkout', '/success', '/tracking'] },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'AdsBot-Google', disallow: '/' },
    ],
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml',
    ],
  },
}
```

---

## Server-Side Dynamic Sitemaps (App Router)

For pages generated from a database or CMS at request time (not at build time).

### Dynamic Sitemap Route Handler

```ts
// src/app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  // Fetch dynamic URLs from your data source
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())

  const fields = posts.map((post: any) => ({
    loc: `https://example.com/blog/${post.slug}`,
    lastmod: new Date(post.updatedAt).toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))

  return getServerSideSitemap(fields)
}
```

### Dynamic Index Sitemap Route Handler

For very large dynamic datasets, create an index sitemap that points to paginated sitemaps:

```ts
// src/app/server-sitemap-index.xml/route.ts
import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
  // Generate sitemap URLs for pagination
  const totalPages = 50
  const sitemapUrls = Array.from({ length: totalPages }, (_, i) =>
    `https://example.com/sitemap-dynamic-${i}.xml`
  )

  return getServerSideSitemapIndex(sitemapUrls)
}
```

### Config to Include Server-Side Sitemaps

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],  // Exclude from static generation
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml',  // Add to robots.txt
    ],
  },
}
```

---

## Google News, Image & Video Sitemaps

Extend sitemap entries with special Google XML tags:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  transform: async (config, path) => {
    // Add image sitemap data
    if (path.startsWith('/gallery')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        images: [
          { loc: `https://cdn.example.com${path}/hero.jpg` },
          { loc: `https://cdn.example.com${path}/thumb.jpg` },
        ],
      }
    }

    // Add Google News data
    if (path.startsWith('/news')) {
      return {
        loc: path,
        lastmod: new Date().toISOString(),
        news: {
          title: 'Article Title',
          publicationName: 'Example News',
          publicationLanguage: 'en',
          date: new Date(),
        },
      }
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
```

---

## Environment Variables

Add to `.env`:

```env
SITE_URL=https://visagovietnam.com
```

For different environments:

```env
# .env.production
SITE_URL=https://visagovietnam.com

# .env.development
SITE_URL=http://localhost:3000
```

---

## Verification Checklist

After setup, verify:

- [ ] `npm run build` generates `public/sitemap.xml` (or `public/sitemap-0.xml` + `public/sitemap.xml` index)
- [ ] `public/robots.txt` is generated with correct policies
- [ ] Visit `https://yoursite.com/sitemap.xml` — valid XML
- [ ] Visit `https://yoursite.com/robots.txt` — correct Sitemap reference
- [ ] Excluded pages (checkout, admin) are NOT in the sitemap
- [ ] Dynamic sitemap endpoint returns valid XML (if using server-side)
- [ ] Submit sitemap URL to [Google Search Console](https://search.google.com/search-console)
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Troubleshooting

### 🔴 Battle-Tested (from real migration)

| Issue | Solution |
|-------|----------|
| **Sitemap generates component names** (`/ApplicationForm`, `/Home`) instead of routes (`/apply`, `/`) | Your `src/pages/` folder conflicts with Next.js Pages Router. Rename to `src/views/`. See `vite-to-nextjs` skill Step 12 |
| **Config silently fails** (no sitemap generated) | If `package.json` has `"type": "module"`, rename config to `.cjs` extension and use `--config next-sitemap.config.cjs` |
| **Stale routes in sitemap after refactoring** | Delete `.next/` cache (`rm -rf .next`) and rebuild before regenerating sitemap |
| **`transform()` function not applying custom priorities** | Ensure you return the full object including `loc`, `lastmod`, `changefreq`, and `priority` — partial returns are ignored |
| **robots.txt overwritten by old file** | `next-sitemap` overwrites `public/robots.txt` — delete any manually created one first |

### 🟡 Standard Issues

| Issue | Solution |
|-------|----------|
| Sitemap not generated | Ensure `postbuild` script is in `package.json` |
| `pnpm` postbuild not running | Add `enable-pre-post-scripts=true` to `.npmrc` |
| Dynamic sitemap returns 404 | Check route file is at `app/server-sitemap.xml/route.ts` (not `.tsx`) |
| Wrong URLs in sitemap | Verify `siteUrl` in config (no trailing slash) |
| `output: 'export'` mode | Set `output: 'export'` in next-sitemap config to match `next.config` |
| Pages showing in sitemap that shouldn't | Add to `exclude` array or return `null` from `transform` |
| Index sitemap not needed | Set `generateIndexSitemap: false` |
| Duplicate URLs (static + server) | Use `exclude` for server-side paths + `additionalSitemaps` in `robotsTxtOptions` |
