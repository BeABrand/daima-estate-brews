# Resume Instructions — Daima Coffee Estate Frontend

If you are a fresh Claude Code session continuing this work, read this file first, then `documents/SESSION_RECOVERY.md` for the full conversation log, then `README.md` for canonical project orientation.

## Project at a glance

- **Path:** `/var/www/html/contract/james_projects/daima-estate-brews`
- **Stack:** TanStack Start (React 19 + Vite 7 + Cloudflare Workers + Tailwind v4)
- **Build platform:** Lovable (lovable.dev) — **DO NOT touch** `@lovable.dev/*` deps, `.lovable/` dir, or the `vite.config.ts` wrapper. The user actively uses Lovable to develop the UI.
- **HTML root:** rendered server-side from `src/routes/__root.tsx` `RootShell` (no `index.html`).
- **Canonical README:** `/var/www/html/contract/james_projects/daima-estate-brews/README.md` — project structure, brand tokens, SEO architecture, deployment.

## Current state

All five tracks complete and committed locally (NOT pushed to origin):

| # | Branch | Commit | What landed |
|---|--------|--------|-------------|
| 1 | `fix/css-import-order` | `47a2da5` | Moved Google Fonts `@import` from CSS to `<link>` in root head + preconnect hints |
| 2 | `chore/remove-lovable-apply-daima-theme` | `1941d91` | Daima coffee bean SVG as favicon + header/footer logo (sourced from `daima_coffee_payments/public/favicon.svg`) |
| 3 | `feat/seo-optimization` | `da87e24` | Centralized SEO config, per-route canonical/og/twitter, JSON-LD Organization+WebSite+Blog+Article+BreadcrumbList, robots.txt, sitemap.xml |
| 4 | `feat/seo-optimization` | `4dd10a3` | Initial `documents/SESSION_RECOVERY.md` and `documents/RESUME_INSTRUCTIONS.md` |
| 5 | `docs/readme-and-session-resume` | _(latest)_ | `README.md` + comprehensive doc refresh through Turn 4 |

Each branch is **cumulative** on the previous — `docs/readme-and-session-resume` HEAD carries every prior change.

## Branch chain

```
main                                              (origin/main, untouched)
└── fix/css-import-order                47a2da5   CSS @import fix
    └── chore/remove-lovable-apply-daima-theme   1941d91   Daima brand SVG
        └── feat/seo-optimization      da87e24   SEO + JSON-LD + sitemap
            └── feat/seo-optimization  4dd10a3   initial session docs
                └── docs/readme-and-session-resume  <pending>   README + doc refresh
```

## How to verify

```bash
cd /var/www/html/contract/james_projects/daima-estate-brews
git checkout docs/readme-and-session-resume
npx vite build --mode development      # ~3s, no PostCSS errors, ~85 kB CSS
npm run dev                            # serves on :8080 (or :8081 if 8080 busy)
```

Then open the dev URL and `View Source` on `/`, `/blog`, and `/blog/<slug>` to confirm:
- `<title>` and `<meta name="description">` present
- `<link rel="canonical">` present and absolute
- `<meta property="og:image">` is an absolute URL
- `<script type="application/ld+json">` blocks render (Organization + WebSite always; Blog on `/blog`; Article + BreadcrumbList on `/blog/<slug>`)

## How to continue

### To merge or PR

The user has NOT asked for any merge or push. Their global rules forbid touching `main`/`master`/`production` and forbid autonomous pushes. **Wait for explicit instruction.**

If asked to PR: each branch is independent enough to PR separately, but because they are stacked, the simplest path is one PR from `docs/readme-and-session-resume` → `main` covering all five commits.

### To extend SEO

- Add social links → `Organization.sameAs` in `src/routes/__root.tsx`.
- Add a real Twitter handle → `SITE_TWITTER` in `src/lib/site-config.ts`.
- Override prod domain → set `VITE_SITE_URL=https://your-domain.com` in the deploy env, then update the literal URLs in `public/robots.txt` and `public/sitemap.xml` to match.
- New blog post → append to `src/lib/blog-posts.ts`, then add a `<url>` entry in `public/sitemap.xml`. Sitemap is currently static; if posts churn frequently, generate it dynamically via a TanStack Server route or a build-time script.

### To add new pages

- Use `buildSeoMeta` + `buildSeoLinks` from `@/lib/seo` in the route's `head` callback so meta stays consistent across the site.
- Add the new path to `public/sitemap.xml`.
- Update `README.md` "Project structure" tree if the route is significant.

### To document new work

- Append a "Turn N — User" / "Turn N — Assistant" section to `documents/SESSION_RECOVERY.md`.
- Update the branch chain diagram and the cumulative file-change list at the bottom of the same file.
- Update the table in this file with the new branch + commit + summary.
- Update the "Recent change log" table at the bottom of `README.md`.

## Memory pointers

- `/home/kimemia/.claude/projects/-var-www-html-contract-james-projects-daima-estate-brews/memory/feedback_lovable_scope.md` — "remove lovable" in this project means VISUAL/BRANDING assets only, NEVER the build tooling. Always check this before touching anything `lovable`-related.

## Hard rules to respect

- No `git checkout`/merge/push on `main`/`master`/`production`.
- No `git stash`.
- No `--amend` of pushed/shared commits; create new commits when fixing.
- No Claude attribution lines in commit messages or code comments.
- No `any` TS type — use proper interfaces.
- For Laravel logs (other org projects), use latest-timestamp file, not `storage/logs/laravel.log` literally.
- Do not regenerate `src/routeTree.gen.ts` manually — it's produced by the TanStack router plugin during dev/build.
- Do not touch the Lovable build wrapper or `.lovable/` directory.
- Every fix/refactor lives on its own branch off the current head.
- Every conversation appends to `documents/SESSION_RECOVERY.md` and updates this file.
