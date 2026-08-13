# SoloHer Quick-Win SEO Plan

## Current State (Verified)

- Homepage is indexed in Google Search Console (1 click, 4 impressions in the last 28 days).
- All SEO scanner findings are passing or already fixed, but the scans are stale.
- The site has only 3 crawlable routes: `/`, `/guide`, and `/saved`.
- The highest-opportunity keywords for SoloHer are:
  - `travel safety tips for women` — 1,900/mo, difficulty 44
  - `best places to travel for solo female travelers` — 1,300/mo, difficulty 20 (easy)
  - `safest countries for women` — 480/mo, difficulty 27 (easy)
  - `is it safe to travel alone as a woman` — 20/mo, difficulty 0 (very easy)

## Quick Wins (Can Be Implemented in One Session)

### 1. Add FAQ Section + FAQPage Schema to the Homepage
Add a compact FAQ section to `/` that answers the exact questions people search for. This improves AEO (Answer Engine Optimization) and can trigger Google's "People also ask" rich results.

Questions to include:
- "Is it safe to travel alone as a woman?"
- "What are the best travel safety tips for women?"
- "Which destinations are safest for solo female travelers?"
- "How does SoloHer help solo female travelers?"

Implementation:
- Add the section to `src/pages/Home.tsx` below the form.
- Add JSON-LD `FAQPage` schema via `<Helmet>`.
- Keep the visual design unchanged (muted text, existing card styles).

### 2. Create a Static `/safety-tips-for-women` Page
Target the highest-volume keyword. The page will contain 8-12 practical, original safety tips grouped by theme (before you go, on arrival, out and about, emergencies). Each tip uses a heading and a short paragraph. A CTA at the bottom invites users to generate a destination-specific guide.

Implementation:
- Create `src/pages/SafetyTipsPage.tsx`.
- Add route in `src/App.tsx`.
- Add unique title, description, canonical, and Open Graph tags via `<Helmet>`.
- Add `Article` JSON-LD schema.
- Add the page to `scripts/generate-sitemap.ts` and `public/llms.txt`.

### 3. Create a Static `/best-places-for-solo-female-travel` Page
Target the easy-difficulty, high-volume keyword. The page will list 10-12 curated destinations with a one-line confidence note and link to the guide generator for each.

Implementation:
- Create `src/pages/BestPlacesPage.tsx`.
- Add route in `src/App.tsx`.
- Add unique metadata and `Article` JSON-LD schema.
- Add to sitemap and `llms.txt`.

### 4. Update Internal Linking
Add subtle links from the home page to the two new content pages so Google discovers them and users stay longer. This also helps reduce the current 88% bounce rate.

Implementation:
- Add "Top safety tips for women" and "Best places for solo travel" links in the home page footer or below the hero.
- Keep styling consistent with the existing muted secondary text.

### 5. Trigger a Fresh SEO Scan
After the changes, start a new SEO review so the findings reflect the current state and confirm nothing is broken.

## Expected Outcome

Within 2-4 weeks of Google indexing these changes, SoloHer should be eligible for:
- Google's "People also ask" and FAQ rich results for the home page FAQ.
- Ranking for long-tail variations of `travel safety tips for women` and `best places for solo female travel`.
- More internal links and lower bounce rate, which sends stronger engagement signals to Google.

This is not a traffic guarantee — it expands the site's surface area for search engines and answer engines from 3 pages to 5 crawlable, keyword-targeted pages.