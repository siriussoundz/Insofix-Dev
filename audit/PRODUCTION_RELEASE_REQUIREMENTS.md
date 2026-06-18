# Production Release Requirements

Replace placeholder canonical and sitemap domains with the production domain, confirm legal and privacy text, connect a secure form backend, verify all contact details, review accessibility manually, and confirm GitHub Pages settings. Do not modify production DNS or CNAME without owner approval.

## Production domain and indexing checklist

Before production release, replace the development noindex/disallow configuration with the confirmed production domain strategy:

- Confirm the live production domain and whether a `CNAME` file is required in the production repository only.
- Add production canonical URLs consistently across public HTML pages.
- Rebuild `sitemap.xml` with production URLs only.
- Update `robots.txt` to the approved production crawl policy.
- Remove development-only `noindex, nofollow` metadata only after the production domain, privacy contact details and commercial terms have been approved.
