# SoloHer SEO & AEO Visibility Plan

## Current State

SoloHer already has strong technical foundations:

- Unique titles, descriptions, canonicals, and Open Graph tags per route
- `sitemap.xml` and `robots.txt` submitted to Google Search Console
- JSON-LD structured data (Organization, WebSite, Article on `/guide`)
- `/llms.txt` for AI crawlers
- Accessibility improvements (WCAG AA) and mobile-first design
- Custom domain opportunity available (currently on `.lovable.app` subdomain)

However, the site has only **three crawlable routes** (`/`, `/guide`, `/saved`) and `/guide` loads its content from `sessionStorage`, so Google cannot index destination-specific guides like "Rome solo female travel safety." Analytics show **6 visitors and 7 pageviews over 90 days** with an **88% bounce rate**, confirming the site is not yet capturing search demand.

## Strategic Goal

Move SoloHer from a single-tool app to a **search-visible content hub** for solo female travel safety, so Google and AI engines can surface specific destination and topic pages.

## Keyword Opportunities (US, from Semrush)

| Keyword | Monthly Volume | Difficulty | Priority |
|---|---|---|---|
| travel safety tips for women | 1,900 | 44 (possible) | High |
| best places to travel for solo female travelers | 1,300 | 20 (easy) | High |
| best places for solo travel female | 1,000 | 33 (medium) | Medium |
| safest countries for women | 480 | 27 (easy) | High |
| solo female travel safety | 40 | 30 (possible) | Medium |
| is it safe to travel alone as a woman | 20 | 0 (very easy) | Medium |

Top competitors include `travel.state.gov`, `adventurouskate.com`, `solotravelerworld.com`, `bemytravelmuse.com`, and `thesoloist.travel`.

## Phase 1 — Make Existing Content Crawlable (Highest Impact)

### 1.1 Convert `/guide` into destination-specific URLs
Replace the `sessionStorage`-based guide view with shareable, crawlable routes:

```text
/guide/rome-italy
/guide/paris-france
/guide/tokyo-japan
```

Implementation options:

- **Option A (recommended):** Generate a static list of ~50 high-search destinations at build time and pre-render their guide pages using the existing Edge Function.
- **Option B:** Use URL query parameters (`/guide?city=Rome&place=Colosseum`) and rely on the current SPA rendering. This is faster to build but less SEO-friendly because content is not in the initial HTML.

### 1.2 Update metadata for each destination page
Each destination page should have unique `<title>`, `<meta name="description">`, canonical, and Open Graph tags:

```text
Title: Rome, Italy Solo Travel Safety Guide — SoloHer
Description: Is Rome safe for solo female travelers? Confidence level, safety tips, best times to visit, and emergency contacts.
```

### 1.3 Add destination pages to sitemap
Extend `scripts/generate-sitemap.ts` to include all `/guide/{slug}` URLs so Google discovers them.

## Phase 2 — Add Topical Landing Pages for High-Intent Keywords

Create static content pages that target the keyword opportunities above. Each page should include original, useful content and a CTA to generate a personalized guide.

| Route | Target Keyword | Content Outline |
|---|---|---|
| `/safety-tips-for-women` | travel safety tips for women | 10-15 practical safety tips with headings, checklists, and a "Get a destination guide" CTA |
| `/best-places-for-solo-female-travel` | best places to travel for solo female travelers | Curated list of 10-15 destinations with confidence ratings, best times, and one-sentence safety notes |
| `/safest-countries-for-women` | safest countries for women | Country-by-country confidence snapshot with safety highlights and links to destination guides |
| `/is-it-safe-to-travel-alone-as-a-woman` | is it safe to travel alone as a woman | FAQ-style article addressing common fears with data-backed reassurance |

Each page gets unique metadata, canonical, FAQ schema, and internal links to related destination guides.

## Phase 3 — AEO (Answer Engine Optimization)

### 3.1 Add FAQ sections
Add "Frequently Asked Questions" to the home page and each landing page, answering questions in concise 40-60 word paragraphs. Example questions:

- "Is it safe to travel alone as a woman?"
- "What are the safest countries for solo female travelers?"
- "How do I stay safe when traveling alone?"

### 3.2 Implement FAQ schema
Add JSON-LD `FAQPage` schema to each FAQ section so Google can surface rich results and AI engines can extract direct answers.

### 3.3 Improve content structure for AI crawlers
- Use clear H1/H2/H3 hierarchies
- Lead sections with direct answers before elaboration
- Use bullet lists and numbered steps
- Keep paragraphs short and scannable

## Phase 4 — Authority & Distribution

### 4.1 Connect a custom domain
Move from `soloher.lovable.app` to a branded domain (e.g., `soloher.com`). Custom domains build trust, improve click-through rates, and make backlink outreach easier.

### 4.2 Build backlinks
Reach out to:

- Solo female travel blogs and newsletters for guest posts or mentions
- Reddit communities (`r/solotravel`, `r/femaletravellers`) with genuinely helpful comments linking to specific guides
- Travel safety resource pages at universities and women-focused organizations

### 4.3 Social proof and sharing
The existing "Share My Plan" feature is a growth loop. Consider adding:

- "Copy link to this guide" on destination pages so users share specific URLs
- A "Save this guide" prompt after sharing

## Phase 5 — Technical Foundation Upgrades

### 5.1 Migrate to TanStack Start (SSR)
The current Vite + React SPA renders content client-side. Migrating to Lovable's TanStack Start template would:

- Make destination-specific content visible in the initial HTML to crawlers
- Enable true per-page metadata without `react-helmet-async` limitations
- Improve first-page load performance

### 5.2 Performance optimization
- Run Lighthouse and address any remaining issues
- Ensure LCP image is preloaded
- Keep bundle size low for mobile users (currently 4 of 6 visitors are on mobile)

### 5.3 Monitor and iterate
- Use Google Search Console to track impressions, clicks, and average position
- Add a simple content performance log or use Lovable Analytics to see which landing pages drive engagement

## Recommended Execution Order

1. **Week 1:** Create `/safety-tips-for-women` and `/best-places-for-solo-female-travel` landing pages
2. **Week 2:** Convert `/guide` to destination-specific URLs for top 20 destinations
3. **Week 3:** Add FAQ sections and FAQ schema to landing pages
4. **Week 4:** Connect custom domain and update canonical URLs
5. **Ongoing:** Build backlinks, add destination pages, monitor Search Console

## Expected Outcome

Within 8-12 weeks, SoloHer should have:

- 20+ crawlable destination-specific guide pages
- 4 topical landing pages targeting high-intent keywords
- Rich-result eligibility via FAQ schema
- A custom domain with stronger brand signals
- A measurable increase in organic impressions and clicks from Google Search Console

No traffic guarantees are implied — SEO depends on content quality, competition, and Google's indexing speed.