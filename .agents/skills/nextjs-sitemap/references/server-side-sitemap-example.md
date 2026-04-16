# Server-Side Dynamic Sitemap — App Router Examples

## 1. Dynamic Sitemap Route Handler

Create file at: `src/app/server-sitemap.xml/route.ts`

Access at: `https://yoursite.com/server-sitemap.xml`

```ts
import { getServerSideSitemap } from 'next-sitemap'
import type { ISitemapField } from 'next-sitemap'

export async function GET() {
  // Fetch dynamic data from CMS, DB, or API
  const response = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })
  const posts = await response.json()

  // Build sitemap fields
  const fields: ISitemapField[] = posts.map((post: any) => ({
    loc: `https://example.com/blog/${post.slug}`,
    lastmod: new Date(post.updatedAt).toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }))

  return getServerSideSitemap(fields)
}
```

## 2. Dynamic Index Sitemap (Large Datasets)

Create file at: `src/app/server-sitemap-index.xml/route.ts`

For thousands of dynamic pages, create an index that points to paginated sitemaps:

```ts
import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
  const totalPages = await fetch('https://api.example.com/count')
    .then(r => r.json())
    .then(data => Math.ceil(data.total / 5000))

  const sitemapUrls = Array.from({ length: totalPages }, (_, i) =>
    `https://example.com/sitemap-dynamic-${i}.xml`
  )

  return getServerSideSitemapIndex(sitemapUrls)
}
```

## 3. Config to Include Server-Side Sitemaps

Update `next-sitemap.config.js`:

```js
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
