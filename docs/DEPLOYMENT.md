# NAPCO Aqua — Deployment

**Host:** Vercel · **Repo:** `nobel-business/napco-frontend` · **Production branch:** `main`
**Live:** auto-deploys on every push to `main` (Vercel native Git integration).

---

## TL;DR

> **Push to `main` → Vercel builds & deploys to production automatically.**
> Open a Pull Request → Vercel posts a **Preview** URL for that PR.
> No GitHub Actions YAML is needed for deploys — Vercel's Git integration *is* the deploy workflow.

---

## 1. How the deploy works

Vercel is connected to the GitHub repo via its **native Git integration**. Once connected:

| Event | What Vercel does |
|---|---|
| Push to `main` | Builds (`next build`) and deploys to **Production** (the live URL updates). |
| Open / update a Pull Request | Builds and deploys a **Preview** with its own URL, for review before merge. |
| Other branches | Preview deploys (if pushed). |

The build runs on Vercel's servers (Linux, Node 20), which have internet access — so `next/font`
(Google Fonts: Inter / Cairo / JetBrains Mono) fetches fine at build time.

---

## 2. First-time setup (already done — recorded for reference)

Performed once on `vercel.com/new`:

1. **Install the Vercel GitHub app** → granted access to `nobel-business/napco-frontend`.
2. **Import** the repository.
3. **Configure** (all auto-detected — no changes):
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `next build` · Install: `npm install` · Output: auto
   - Environment Variables: **none** (the app uses no `process.env` values)
   - Node: honors `20.x` (see `.nvmrc` / `package.json` → `engines`)
4. **Deploy.** Vercel produced the production URL (e.g. `napco-frontend.vercel.app`).

After this, the auto-deploy in §1 is active — nothing else to wire.

---

## 3. Repo settings that support the deploy

| Item | Where | Why |
|---|---|---|
| Node 20 pin | `.nvmrc` + `package.json` → `"engines": { "node": "20.x" }` | Vercel & CI build on the same runtime as local. |
| `.vercel` ignored | `.gitignore` | Local `vercel link` artifacts never get committed. |
| `.figma-audit` untracked | `.gitignore` (`/.figma-audit/`) | 138 MB of design-reference PDFs/exports are kept local-only, so Vercel doesn't clone them each deploy. |
| No env vars | — | `process.env` is unused; nothing to configure in Vercel. |

---

## 4. CI quality gate (separate from deploy)

`.github/workflows/ci.yml` runs on **every push to `main`** and **every PR**:

- `npx tsc --noEmit` (type-check)
- `npm run build` (production build)

It runs on **Linux (ubuntu)**, which is case-sensitive — so it catches import-casing bugs that
Windows hides, *before* Vercel deploys. It does **not** deploy; it's just a ✓/✗ signal on commits.

---

## 5. Day-to-day workflow

```bash
# make changes on a branch
git checkout -b my-change
# ... edit ...
git commit -m "…"
git push origin my-change          # → opens to a PR → Vercel Preview URL

# when ready, merge to main (PR merge or fast-forward)
git checkout main && git merge my-change && git push origin main
#                                  ↑ this push triggers the Production deploy
```

Or commit directly to `main` and push — that immediately deploys to production.

**Before pushing to `main`,** a quick local gate mirrors CI:

```bash
npx tsc --noEmit && npm run build      # expect 39/39 pages
```

---

## 6. Custom domain (optional)

Vercel project → **Settings → Domains** → add the domain (e.g. `napcoaqua.com`) and point DNS to
the records Vercel shows (usually an `A` record to `76.76.21.21` or a `CNAME` to `cname.vercel-dns.com`).
Vercel provisions HTTPS automatically.

---

## 7. Alternative: deploy from GitHub Actions (not used)

We use Vercel's native Git integration (simplest, gives PR previews, zero secrets). If a future
need requires the deploy to run *from* GitHub Actions instead (e.g. custom gating), the pattern is:

1. `vercel link` locally to get **Project ID** and **Org ID**, and create a **Vercel token**.
2. Add repo **secrets**: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
3. A workflow on `push: main` runs: `vercel pull --environment=production` → `vercel build --prod`
   → `vercel deploy --prebuilt --prod`.
4. **Turn OFF** Vercel's native auto-deploy (Project → Settings → Git) to avoid double deploys.

Use **one** mechanism, not both. Native is recommended unless there's a specific reason.

---

## 8. Troubleshooting

- **Build fails on Vercel but works locally:** almost always import **case-sensitivity** (Linux) or a
  missing dep. The CI workflow (§4) reproduces the Linux build and will flag it first.
- **Fonts/build network errors locally** are environmental (local Google Fonts reachability) — Vercel's
  build servers are unaffected.
- **Docs-only pushes still deploy** (a no-op rebuild). Harmless; ignore, or add an "Ignored Build Step"
  in Vercel if you want to skip them.
- **Dependabot alerts** shown on push are pre-existing dependency advisories, unrelated to deployment.
