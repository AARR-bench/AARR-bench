# AARR-bench

<a href="https://aarr-bench.com/">
  <img src="https://img.shields.io/badge/Project-AARR Bench-e4bd78" alt="AARR Bench">
</a>

**Act As a Real Researcher** — a benchmark series evaluating how well LLM agents
close the gap with human researchers across the research lifecycle.

This repository contains the benchmark content and the project website.

## Repository layout

```
AARRI-bench/        # Stage 1 benchmark: Act As a Real Research Intern (the live benchmark)
website/            # Project website (Next.js + Tailwind, static export)
.github/            # Org profile
```

The AARR series has three stages:

| Stage | Code  | Name                          | Status      |
| ----- | ----- | ----------------------------- | ----------- |
| 1     | AARRI | Act As a Real Research Intern | Live        |
| 2     | AARRA | Act As a Real Research Assistant | Coming soon |
| 3     | AARRS | Act As a Real Research Scientist | Coming soon |

## Website

The website lives in [`website/`](./website) and is a statically-exported
Next.js app. Task pages are generated automatically from the `task.toml` and
`instruction.md` files in `AARRI-bench/tasks/`, so the site stays in sync as
tasks are added.

### Local development

```bash
cd website
npm install
npm run dev          # http://localhost:3000
```

`npm run dev` and `npm run build` both run the task generator first
(`scripts/generate-tasks.mjs`), which writes `data/tasks.generated.json`.

### Build a static export

```bash
cd website
npm run build        # outputs to website/out/
```

### Editing site data

- **Leaderboard** — edit `website/data/leaderboard.json` (one row per
  harness/model, with per-category and overall scores).
- **Benchmarks / series copy** — edit `website/data/benches.json`.
- **Tasks** — no manual editing; they are generated from `AARRI-bench/tasks/`.

## Deployment (Vercel)

See [`website/DEPLOY.md`](./website/DEPLOY.md) for full instructions. In short:

1. Push this repository to GitHub.
2. Import the repo in Vercel and set **Root Directory** to `website`.
3. Vercel auto-detects Next.js. Every push to `main` redeploys.
