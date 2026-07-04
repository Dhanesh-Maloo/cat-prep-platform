# Deployed

**Live at: https://cat-prep-platform.pages.dev**

Deployed via the Cloudflare Pages CLI (wrangler), logged in as your Cloudflare
account (`Dhaneshmaloo09@gmail.com's Account`). To ship a new deployment after
making changes:

```
npm run deploy
```

That runs `vite build` (which bakes in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
from your local `.env`) and pushes `dist/` straight to the `main` production branch.

## How this was set up

- `npx wrangler login` — OAuth login to Cloudflare in the browser
- `npx wrangler pages project create cat-prep-platform --production-branch=main` — created the Pages project
- `public/_redirects` containing `/* /index.html 200` — required for client-side
  routing (React Router) so refreshing a deep link like `/syllabus` doesn't 404
- `npx wrangler pages deploy dist --project-name=cat-prep-platform --branch=main` — the actual deploy

## Want git-connected auto-deploy instead?

Right now every deploy is a manual `npm run deploy`. If you'd rather have every
`git push` auto-deploy:

1. Push this repo to GitHub (a remote isn't configured yet — `git remote add origin <url>` then `git push -u origin main`).
2. In the Cloudflare dashboard: **Workers & Pages → cat-prep-platform → Settings → Builds** → connect it to the GitHub repo.
3. Build command: `npm run build`, output directory: `dist`.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment variables** (never add `SUPABASE_SERVICE_ROLE_KEY` here — that key must never reach a browser-shipped build).

## Notes
- The production bundle is ~910KB (mostly Recharts) — Vite warns about this but it's not a blocker. Worth revisiting with code-splitting (`React.lazy` on the Analytics/MockTestRunner routes) if load time becomes a concern.
- `scripts/seed.mjs` is a local admin tool, not part of the deployed app — it's safe that it's in the repo since it never runs in the browser, but it does require `SUPABASE_SERVICE_ROLE_KEY` locally to run, which lives only in your `.env` (gitignored).
- Remember: re-running `npm run seed` after real users exist will cascade-delete their mock test / question attempts (see the warning comment at the top of `scripts/seed.mjs`).
