---
name: aeo
description: "Run AEO audits, fix site issues, validate schema, generate llms.txt, and compare sites. Use when asked to create llms.txt, optimize for AI search, improve LLM discoverability, audit AEO readiness, validate structured data, or benchmark competitor sites. Triggers: 'llms.txt', 'aeo', 'answer engine optimization', 'ai search optimization', 'llm friendly', 'ai crawler', 'create llms file', 'aeo audit', 'ai audit', 'llms.txt audit', 'ai search readiness', 'answer engine audit', 'check ai crawlers', 'structured data', 'schema validation', 'ai citation', 'compare sites aeo'."
version: 1.2.2
---

# AEO — Answer Engine Optimization

One skill for audit, fixes, schema, llms.txt, and monitoring workflows.

## Command Choice

- Use `npx @ainyc/aeo-audit@latest ...` when auditing a deployed site.
- If the CLI is unavailable or the user prefers manual flow, follow the manual instructions in the relevant mode section below.

## Argument Safety

**Never interpolate user input directly into shell commands.** Always:
1. Validate URLs match `https://` or `http://` with no shell metacharacters.
2. Quote every argument individually.
3. Reject arguments containing `;`, `|`, `&`, `$`, `` ` ``, `(`, `)`, `{`, `}`, `<`, `>`, or newlines.

## Modes

| Mode | Purpose | When to use |
|------|---------|-------------|
| `audit` | Grade and diagnose a site | Default. "audit this site", "why am I not being cited?" |
| `fix` | Apply code changes after audit | "fix my AEO", "improve my AI readiness" |
| `schema` | Validate JSON-LD and entity consistency | "check my structured data", "validate schema" |
| `llms` | Create or improve llms.txt / llms-full.txt | "create llms.txt", "generate AI manifest" |
| `monitor` | Compare changes over time or benchmark competitors | "compare with competitor", "track AEO progress" |

If no mode is provided, default to **audit**.

---

## Mode: Audit

Broad diagnosis. "Audit this site" or "why are AI engines not citing me?"

### With CLI:
```bash
npx @ainyc/aeo-audit@latest "https://example.com" --format json
```

### Manual (no CLI):
Evaluate the following factors and score each 0-100:

| Factor | What to check |
|--------|--------------|
| **AI Crawler Access** | robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai |
| **llms.txt** | Exists at /llms.txt, valid markdown, correct content-type |
| **Structured Data** | JSON-LD present (Organization, FAQPage, BreadcrumbList, Product/Service) |
| **Content Answerability** | Question-based H2/H3, snippet-ready first paragraphs (30-60 words) |
| **E-E-A-T Signals** | Author info, credentials, about page, contact details |
| **Freshness** | dateModified meta, recent content updates |
| **FAQ Markup** | FAQPage schema with 3+ Q&A pairs |
| **Entity Consistency** | Same brand name/address across all schema and pages |

### Output:
- Overall grade (A-F) and score
- Factor breakdown with scores
- Top 3 strengths
- Top 5 priority fixes (ranked by impact)

---

## Mode: Fix

Apply code changes after an audit. Always audit first if no prior results exist.

### Workflow:
1. Run audit (CLI or manual) to identify issues.
2. Find factors with status `partial` or `fail`.
3. Apply targeted fixes in priority order:
   - Structured data / schema completeness
   - `llms.txt` and `llms-full.txt` creation
   - `robots.txt` AI crawler access
   - E-E-A-T signals
   - FAQ markup
   - Freshness metadata
4. Re-run audit and report score delta.

### Rules:
- Never remove existing schema or content unless user asks.
- Preserve existing code style and patterns.
- If a fix is ambiguous or high-risk, explain the tradeoff before editing.

---

## Mode: Schema

Specifically about JSON-LD quality and Schema.org compliance.

### With CLI:
```bash
npx @ainyc/aeo-audit@latest "https://example.com" --format json --factors structured-data,schema-completeness,entity-consistency
```

### Manual checklist:

| Schema Type | Required Properties |
|-------------|-------------------|
| `Organization` | name, logo, contactPoint, sameAs, url, description |
| `FAQPage` | mainEntity with 3+ Q&A pairs |
| `BreadcrumbList` | itemListElement with position, name, item |
| `Product` / `Service` | name, description, offers (price, currency) |
| `WebSite` | name, url, potentialAction (SearchAction) |

### Validation:
- Google Rich Results Test: `https://search.google.com/test/rich-results?url=URL`
- Schema.org Validator: `https://validator.schema.org/?url=URL`

### Output:
- Schema types found
- Property completeness per type
- Missing recommended properties
- Entity consistency issues
- Corrected JSON-LD examples

---

## Mode: llms.txt

Create or improve `llms.txt` and `llms-full.txt`.

### If URL provided:
1. Crawl site to extract key content, pages, services.
2. Inspect existing llms.txt if present.
3. Generate improved versions.

### If no URL (local project):
1. Inspect the current codebase.
2. Extract brand name, services, FAQs, contact, pricing.
3. Generate both files from local sources.

### File Specifications:

**`/llms.txt`** (Summary — max 500 words):
```markdown
# {Brand Name}

> {One-sentence brand description}

## Key Pages
- [{Page Title}]({absolute URL}): {One-line description}

## Products / Services
- [{Product}]({URL}): {One-line description with pricing if available}

## Documentation
- [{Doc Title}]({URL}): {One-line description}

## Blog / Resources
- [{Post Title}]({URL}): {One-line description}

## About
- [{About Page}]({URL}): {One-line description}
```

**`/llms-full.txt`** (Full — 5,000-50,000 words):
Complete Markdown documentation with full page content, detailed descriptions, pricing tables, FAQ answers, and structured metadata.

### Generation Methods for Next.js:

**Option A: Static file** — Create `public/llms.txt` manually.

**Option B: App Router dynamic route:**
```typescript
// app/llms.txt/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const content = generateLlmsTxt()
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
```

**Option C: PostBuild script** — Generate in `next.config.js` postBuild or via `next-sitemap` plugin callback.

### After generation:
- Add `<link rel="alternate" type="text/markdown" href="/llms.txt">` to `<head>`.
- Add `/llms.txt` and `/llms-full.txt` to sitemap.
- Configure `robots.txt` to allow AI crawlers:
  ```
  User-agent: GPTBot
  Allow: /
  User-agent: ClaudeBot
  Allow: /
  User-agent: PerplexityBot
  Allow: /
  User-agent: Google-Extended
  Allow: /
  User-agent: anthropic-ai
  Allow: /
  ```

---

## Mode: Monitor

Track progress or benchmark competitors.

### Single URL (progress tracking):
1. Run audit.
2. Compare against prior results in `.aeo-audit-history/` if present.
3. Show overall and per-factor deltas.
4. Save results for next comparison.

### Comparison mode:
```bash
npx @ainyc/aeo-audit@latest "https://site-a.com" --compare "https://site-b.com" --format json
```

Or manually audit both URLs and present side-by-side:
- Factor-by-factor score comparison
- Advantages and weaknesses per site
- Priority gaps to close

---

## Best Practices

1. **Concise llms.txt** — one-line descriptions, absolute URLs, max 500 words
2. **Include pricing** — AI users want concrete numbers, not "contact us"
3. **Question-based headings** — H2/H3 phrased as real user questions
4. **Snippet-ready answers** — first 30-60 words directly answer the heading
5. **Update on deploy** — regenerate llms.txt in CI/CD
6. **Test with AI** — paste llms.txt into ChatGPT/Claude and ask about your site
7. **Monitor citations** — track when AI engines cite your content
8. **Brand consistency** — same name, address, phone across all schema

## Validation Checklist

- [ ] `/llms.txt` accessible and returns `text/plain`
- [ ] Contains brand name and tagline
- [ ] All URLs absolute and return 200
- [ ] Descriptions unique (no duplicates)
- [ ] File < 1MB
- [ ] `robots.txt` allows AI crawlers
- [ ] JSON-LD has Organization + FAQPage + BreadcrumbList
- [ ] No schema validation errors
- [ ] Open Graph and Twitter Card meta present
