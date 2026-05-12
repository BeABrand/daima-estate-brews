# Resume Instructions — Daima Coffee Estate Frontend

If you are a fresh Claude Code session continuing this work, read this file first, then `documents/SESSION_RECOVERY.md` for the full conversation log, then `README.md` for canonical project orientation.

## Project at a glance

- **Path:** `/var/www/html/contract/james_projects/daima-estate-brews`
- **Stack:** TanStack Start (React 19 + Vite 7 + Cloudflare Workers + Tailwind v4)
- **Build platform:** Lovable (lovable.dev) — **DO NOT touch** `@lovable.dev/*` deps, `.lovable/` dir, or the `vite.config.ts` wrapper. The user actively uses Lovable to develop the UI.
- **HTML root:** rendered server-side from `src/routes/__root.tsx` `RootShell` (no `index.html`).
- **Canonical README:** `/var/www/html/contract/james_projects/daima-estate-brews/README.md` — project structure, brand tokens, SEO architecture, deployment.

## Current state

All tracks complete and committed locally (NOT pushed to origin):

| # | Branch | Commit | What landed |
|---|--------|--------|-------------|
| 1 | `fix/css-import-order` | `47a2da5` | Moved Google Fonts `@import` from CSS to `<link>` in root head + preconnect hints |
| 2 | `chore/remove-lovable-apply-daima-theme` | `1941d91` | Daima coffee bean SVG as favicon + header/footer logo |
| 3 | `feat/seo-optimization` | `da87e24` | Centralized SEO config, per-route canonical/og/twitter, JSON-LD, robots.txt, sitemap.xml |
| 4 | `feat/seo-optimization` | `4dd10a3` | Initial `documents/SESSION_RECOVERY.md` and `documents/RESUME_INSTRUCTIONS.md` |
| 5 | `docs/readme-and-session-resume` | `04cf966` | `README.md` + comprehensive doc refresh |
| 6 | `chore/re-configuration` | `f5cb385` | (what landed — prior session) |
| 7 | `fix/netlify-deployment` | `167bff3` | SSG prerendering + `netlify.toml` — first attempt (prerender crashed on Cloudflare adapter conflict) |
| 8 | `fix/netlify-cloudflare-adapter-conflict` | `ec38d66` | Detect Netlify env, disable Cloudflare adapter, gate prerender — resolves 500 on prerender |

Each branch is **cumulative** on the previous — `fix/netlify-cloudflare-adapter-conflict` HEAD carries every prior change.

## Branch chain

```
main                                              (origin/main, untouched)
└── fix/css-import-order                47a2da5   CSS @import fix
    └── chore/remove-lovable-apply-daima-theme   1941d91   Daima brand SVG
        └── feat/seo-optimization      da87e24   SEO + JSON-LD + sitemap
            └── feat/seo-optimization  4dd10a3   initial session docs
                └── docs/readme-and-session-resume  04cf966   README + doc refresh
                    └── chore/re-configuration   f5cb385   (prior session)
                        └── fix/netlify-deployment  167bff3   netlify.toml + prerender attempt 1
                            └── fix/netlify-cloudflare-adapter-conflict  ec38d66   CF adapter fix
```

## How to verify

```bash
cd /var/www/html/contract/james_projects/daima-estate-brews
git checkout fix/netlify-cloudflare-adapter-conflict

# Simulate what Netlify does:
NETLIFY=true npm run build
# Should show "Prerendering pages..." with Node.js SSR (no miniflare/workerd).
# dist/client/ should contain:
#   index.html
#   about/index.html  produce/index.html  logistics/index.html
#   contact/index.html  blog/index.html
#   blog/<slug>/index.html  (×5 — discovered by link crawl from /blog)

# Local dev (unchanged — Cloudflare Worker path):
npm run build    # no prerender, outputs dist/server/index.js as before
npm run dev      # miniflare SSR on :8080
```

## How to continue

### To deploy the Netlify fix

Merge `fix/netlify-cloudflare-adapter-conflict` into the branch Netlify watches (likely `main`) and push. Netlify will re-deploy automatically. The next deploy will:
1. Run `npm run build` with `NETLIFY=true` set by Netlify's build environment
2. Disable Cloudflare adapter, use Node.js SSR adapter
3. Pre-render all 11 routes to HTML via Node.js preview server
4. Serve from `dist/client/` — every route returns 200 with pre-rendered HTML

The user has NOT asked for any merge or push. Their global rules forbid touching `main`/`master`/`production` and forbid autonomous pushes. **Wait for explicit instruction.**

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
