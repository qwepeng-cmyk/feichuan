# GSC Indexing Follow-up - 2026-06-11

Source: `Google Search Console` exports dated 2026-06-10.

Arabic note: `/ar` was merged after this export. Apply the same public-page signal fixes and restricted-path checks to Arabic URLs before requesting indexing.

## Current Buckets

| GSC status | URLs | Main interpretation | Action |
| --- | ---: | --- | --- |
| Crawled - currently not indexed | 127 | Mix of public locale pages, default English pages, and old restricted URLs | Improve public page signals across locales; return 410 for restricted legacy paths |
| Page with redirect | 62 | Mostly `/en/...` default-locale redirects | Keep canonical clean URLs; no index request needed |
| Alternate page with proper canonical | 13 | Mostly `_rsc` router payload URLs | No direct action; keep canonical and sitemap clean |
| Excluded by noindex | 12 | Mostly restricted/soft-404 legacy URLs before the 2026-06-11 fix | Rebuild and deploy; verify live restricted URLs return 410/404 |

## Crawled - Currently Not Indexed Split

| Segment | Count | Treatment |
| --- | ---: | --- |
| Russian public URLs | 58 | Improve language/canonical/hreflang and localized metadata signals |
| Arabic public URLs | New after export | Apply the same language/canonical/hreflang, RTL, and internal-link checks before index requests |
| English/default public URLs | 57 | Strengthen internal links and keep sitemap canonical |
| Restricted historical URLs | 9 | Keep out of public SEO; return 410 Gone |
| Default-locale `/en/...` redirects | 3 | Leave as redirects to canonical no-prefix English URLs |

## Implemented Fixes

- Detail metadata now emits `en`, `ru`, `es`, `ar`, and `x-default` alternates for canonical public paths.
- Product metadata now uses locale-aware fallback descriptions, avoiding localized titles followed by English template copy.
- Public detail pages now include a small related-pages block linking to safe adjacent sections.
- Restricted historical product, solution, case, and media handles now return `410 Gone` from middleware before locale redirects.
- `audit-public-site-risk` now checks representative clean, `/en`, `/ru`, and `/ar` restricted legacy paths.

## Search Console Handling

- For public product, solution, case, and media pages: request indexing only after deployment and live verification of canonical/hreflang.
- For `/en/...` redirect rows: do not request indexing; let Google consolidate into no-prefix English canonical URLs.
- For `_rsc` rows: do not request indexing; they are alternate payload URLs with canonical pages.
- For restricted historical rows: do not request indexing; validate removal through 410/404 status and wait for recrawl.
