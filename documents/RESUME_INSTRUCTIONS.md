# Resume Instructions — Daima Coffee Estate Frontend

If you are a fresh Claude Code session continuing this work, read this file first, then `documents/SESSION_RECOVERY.md` for full conversation context.

## Project at a glance

- **Path:** `/var/www/html/contract/james_projects/daima-estate-brews`
- **Stack:** TanStack Start (React 19 + Vite 7 + Cloudflare Workers + Tailwind v4)
- **Build platform:** Lovable (lovable.dev) — **DO NOT touch** `@lovable.dev/*` deps, `.lovable/` dir, or the `vite.config.ts` wrapper. The user actively uses Lovable to develop the UI.
- **HTML root:** rendered server-side from `src/routes/__root.tsx` `RootShell` (no `index.html`).

## Current state

All three tracks complete and committed locally (NOT pushed to origin):

| # | Branch | Commit | What landed |
|---|--------|--------|-------------|
| 1 | `fix/css-import-order` | `47a2da5` | Moved Google Fonts `@import` from CSS to `<link>` in root head + preconnect hints |
| 2 | `chore/remove-lovable-apply-daima-theme` | `1941d91` | Daima coffee bean SVG as favicon + header/footer logo (sourced from `daima_coffee_payments/public/favicon.svg`) |
| 3 | `feat/seo-optimization` | `da87e24` | Centralized SEO config, per-route canonical/og/twitter, JSON-LD Organization+WebSite+Blog+Article+BreadcrumbList, robots.txt, sitemap.xml |

Each branch is cumulative — `feat/seo-optimization` HEAD carries everything.

## How to verify

```bash
cd /var/www/html/contract/james_projects/daima-estate-brews
git checkout feat/seo-optimization
npx vite build --mode development      # should finish in ~3s, no PostCSS errors
npm run dev                            # should start cleanly on :8080 (or :8081 if 8080 in use)
```

Then open the dev URL and `View Source` on `/`, `/blog`, and `/blog/<slug>` to confirm:
- `<title>` and `<meta name="description">` present
- `<link rel="canonical">` present and absolute
- `<meta property="og:image">` is an absolute URL
- `<script type="application/ld+json">` blocks render

## How to continue

### To merge or PR

The user has NOT asked for any merge or push. Their global rules forbid touching `main`/`master`/`production` and forbid autonomous pushes. **Wait for explicit instruction.**

If asked to PR: each of the three branches is independent enough to PR separately, but because they are stacked (each builds on the prior), the simplest is one PR from `feat/seo-optimization` → `main` covering all three commits.

### To extend SEO

- Add social links → `Organization.sameAs` in `src/routes/__root.tsx`.
- Add a real Twitter handle → `SITE_TWITTER` in `src/lib/site-config.ts`.
- Override prod domain → set `VITE_SITE_URL=https://your-domain.com` in the deploy env, then update the literal URLs in `public/robots.txt` and `public/sitemap.xml` to match.
- New blog post → append to `src/lib/blog-posts.ts`, then add a `<url>` entry in `public/sitemap.xml` (sitemap is currently static; if posts churn frequently, consider generating it dynamically via a TanStack Server route or a build-time script).

### To add new pages

- Use `buildSeoMeta` + `buildSeoLinks` from `@/lib/seo` in the route's `head` callback so meta stays consistent across the site.
- Add the new path to `public/sitemap.xml`.

## Memory pointers

- `/home/kimemia/.claude/projects/-var-www-html-contract-james-projects-daima-estate-brews/memory/feedback_lovable_scope.md` — Lovable removal scope is icons/images only, NOT build tooling.

## Hard rules to respect

- No `git checkout`/merge/push on `main`/`master`/`production`.
- No `git stash`.
- No `--amend` of pushed/shared commits; create new commits when fixing.
- No Claude attribution lines in commit messages or code comments.
- No `any` TS type — use proper interfaces.
- For Laravel logs (other org projects), use latest-timestamp file, not `storage/logs/laravel.log` literally.
- Do not regenerate `src/routeTree.gen.ts` manually — it's produced by the TanStack router plugin during dev/build.
