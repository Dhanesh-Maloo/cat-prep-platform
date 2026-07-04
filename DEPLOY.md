# Deployed

**Live at: https://cat-prep-platform.pages.dev**

Auto-deploys on every push to `main` via Cloudflare Pages' GitHub integration
(connected under Settings → Builds). Just `git push` — no manual deploy step
needed anymore.

## How this was set up

- `npx wrangler login` — OAuth login to Cloudflare in the browser
- `npx wrangler pages project create cat-prep-platform --production-branch=main` — created the Pages project
- `public/_redirects` containing `/* /index.html 200` — required for client-side
  routing (React Router) so refreshing a deep link like `/syllabus` doesn't 404
- Pushed this repo to GitHub (`Dhanesh-Maloo/cat-prep-platform`, private)
- Connected the Cloudflare Pages project to that GitHub repo under **Settings → Builds**
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Production branch: `main`
- Added `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment variables**
  (never `SUPABASE_SERVICE_ROLE_KEY` — that key must never reach a browser-shipped build)

## Manual deploy (fallback)

If the git integration is ever disconnected, `npm run deploy` still works as a
manual fallback — it runs `vite build` then pushes `dist/` directly via wrangler.

## Notes
- The production bundle is ~910KB (mostly Recharts) — Vite warns about this but it's not a blocker. Worth revisiting with code-splitting (`React.lazy` on the Analytics/MockTestRunner routes) if load time becomes a concern.
- `scripts/seed.mjs` is a local admin tool, not part of the deployed app — it's safe that it's in the repo since it never runs in the browser, but it does require `SUPABASE_SERVICE_ROLE_KEY` locally to run, which lives only in your `.env` (gitignored).
- Remember: re-running `npm run seed` after real users exist will cascade-delete their mock test / question attempts (see the warning comment at the top of `scripts/seed.mjs`).
