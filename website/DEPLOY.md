# Deploying the AARR-bench website to Vercel

The site is a statically-exported Next.js app in this `website/` directory.
Because the repo root contains both the benchmark (`AARRI-bench/`) and the site
(`website/`), Vercel must be pointed at the `website` subdirectory.

## One-time setup

1. **Push the repo to GitHub** (from the repository root, `D:\organizations\AARR-bench`):

   ```bash
   git remote add origin https://github.com/AARR-bench/AARR-bench.git
   git push -u origin main
   ```

2. **Import into Vercel**
   - Go to https://vercel.com/new and select the `AARR-bench` repository.
   - Under **Configure Project**, set:
     - **Root Directory** → `website`
     - **Framework Preset** → Next.js (auto-detected)
     - **Build Command** → `npm run build` (default; runs the task generator via `prebuild`)
     - **Output** → handled automatically by Next.js
   - Click **Deploy**.

3. Vercel gives you a `*.vercel.app` URL. Every push to `main` triggers a
   redeploy automatically. Pull requests get preview deployments.

## How the build works

- `npm run build` runs `scripts/generate-tasks.mjs` first (via the `prebuild`
  hook). That script reads every `../AARRI-bench/tasks/*/task.toml` and
  `instruction.md` and writes `data/tasks.generated.json`.
- Because Vercel checks out the **whole repo** (not just `website/`), the
  relative path to `../AARRI-bench/tasks` resolves correctly during the build.
- `next build` then statically prerenders all pages, including one page per
  task via `generateStaticParams`.

## Custom domain

When you have a domain, add it in Vercel under **Project → Settings → Domains**
and follow the DNS instructions. No code changes are required; update
`metadataBase` in `website/app/layout.tsx` to the final URL for correct SEO/OG
metadata.

## Alternative: deploy via Vercel CLI

```bash
npm i -g vercel
cd website
vercel            # first run links/creates the project
vercel --prod     # production deploy
```

## Alternative hosts (static export)

`next.config.mjs` uses `output: "export"`, so `website/out/` is a fully static
site. It can also be hosted on GitHub Pages or Cloudflare Pages by publishing
the `out/` directory. For those hosts, run `npm run build` in CI and deploy the
`out/` folder.
