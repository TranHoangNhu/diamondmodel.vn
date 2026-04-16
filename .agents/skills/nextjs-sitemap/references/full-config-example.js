/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  autoLastmod: true,
  exclude: ['/protected-page', '/awesome/secret-page', '/server-sitemap.xml'],
  alternateRefs: [
    {
      href: 'https://es.example.com',
      hreflang: 'es',
    },
    {
      href: 'https://fr.example.com',
      hreflang: 'fr',
    },
  ],
  // Custom transformation function
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  // Additional paths not auto-detected
  additionalPaths: async (config) => [
    await config.transform(config, '/additional-page'),
  ],
  // robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2'],
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
    ],
    additionalSitemaps: [
      'https://example.com/server-sitemap.xml',
    ],
  },
}
