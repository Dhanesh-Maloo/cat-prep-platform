# Deploying to Cloudflare Pages

The app builds cleanly (`npm run build` → `dist/`), and a local git repo is
already initialized. I can't finish this part myself — connecting Cloudflare
Pages requires your own Cloudflare account (and usually a GitHub repo), which
I don't have access to. Here's the path to finish it:

## Option A — Git-connected (recommended, auto-deploys on every push)

1. Create a new empty repo on GitHub (or GitLab).
2. Push this project to it:
   ```
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick this repo.
4. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add environment variables under **Settings → Environment variables** (Production and Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (Never add `SUPABASE_SERVICE_ROLE_KEY` here — that key must never reach a browser-shipped build.)
6. Deploy. Every future push to `main` redeploys automatically.

## Option B — Direct CLI deploy (no GitHub needed)

```
npm install -D wrangler
npx wrangler login
npm run build
npx wrangler pages deploy dist --project-name=cat-prep-platform
```
You'll need to set the same two `VITE_*` environment variables in the Cloudflare Pages project settings afterward (CLI deploys don't carry env vars automatically).

## Notes
- The production bundle is ~910KB (mostly Recharts) — Vite warns about this but it's not a blocker. Worth revisiting with code-splitting (`React.lazy` on the Analytics/MockTestRunner routes) if load time becomes a concern.
- `scripts/seed.mjs` is a local admin tool, not part of the deployed app — it's safe that it's in the repo since it never runs in the browser, but it does require `SUPABASE_SERVICE_ROLE_KEY` locally to run, which lives only in your `.env` (gitignored).
