# Matt Waseem — Portfolio

Personal portfolio site: computational chemistry × immunology · pre-med.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Fonts: Space Grotesk, IBM Plex Mono, Inter (Google Fonts)

## Local development

```bash
pnpm install
pnpm run dev
```

## Deploy to GitHub Pages (automatic)

This repo ships with a GitHub Actions workflow at `.github/workflows/deploy.yml`.

**One-time setup:**

1. Push this folder to your GitHub repo (e.g. `mattwaseem.github.io`).
2. Go to **Settings → Pages** and set Source to **GitHub Actions**.
3. Push to `main` — the workflow builds and deploys automatically.

Your site will be live at `https://mattwaseem.github.io`.

## Deploy to GitHub Pages (manual)

```bash
pnpm install
pnpm run build:gh-pages
```

Then push the contents of `dist/` to the `gh-pages` branch (or the root of your `mattwaseem.github.io` repo on `main`).

## Filling in placeholders

Search for `href="#"` in the components to find links that still need real URLs:

| Location | What to fill in |
|---|---|
| `Footer.tsx` | LinkedIn URL, Substack URL |
| `Writing.tsx` | Substack URL |
| `Projects.tsx` | Add a `link:` field to each project object once repos are public |

The email in `Footer.tsx` defaults to `mattwaseem@berkeley.edu` — update if needed.
