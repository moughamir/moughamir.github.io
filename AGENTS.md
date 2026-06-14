# AGENTS.md

Personal portfolio site for Mohamed Moughamir. Astro 6 + Tailwind CSS v4 + DaisyUI v5, deployed to GitHub Pages.

## Commands

- `bun dev` — local dev server
- `bun build` — production build (output in `dist/`)
- `bun preview` — preview production build locally

No test suite, linter, or typecheck script is configured. CI runs `bun install && bun build` via the Astro GitHub Action.

## Project Structure

- `src/pages/` — page routes. File = URL (e.g., `src/pages/about.astro` → `/about/`)
- `src/content/blog/` and `src/content/work/` — Markdown content collections
- `src/components/` — Astro components (all `.astro`, no React)
- `src/layouts/BaseLayout.astro` — single layout wrapping every page
- `src/styles/global.css` — Tailwind v4 imports, CSS custom properties, brutalist component classes
- `src/data/pseo.json` — data for programmatic SEO pages (`/vs/` and `/blueprints/`)
- `src/content.config.ts` — content collection schemas (defines required frontmatter)
- `public/` — static assets served as-is
- `assets/logos/` — brand logos, not served directly by Vite
- `docs/brand-guidelines.md` — full brand spec (colors, typography, voice, design system)

## Content Frontmatter

Blog posts and work entries live in `src/content/`. Required fields:

```yaml
---
title: "String"
description: "String"
publishDate: YYYY-MM-DD
tags: ["Tag1", "Tag2"]
img: "/assets/image-path.jpg"
img_alt: "Alt text"          # optional on blog posts
---
```

Blog posts additionally support `subtitle: "String"` (optional).

Images referenced in frontmatter are served from `public/assets/`.

## Design System: Kinetic Brutalism

- **Orange only accent**: `#ff6719` — no other accent colors
- **Zero border-radius everywhere**: buttons, cards, inputs, images — all sharp
- **Hard hover offsets**: cards shift `translate(-4px, -4px)` with `box-shadow: 4px 4px 0 0`
- **Headings**: Archivo, weight 800, uppercase, letter-spacing -0.02em
- **Body**: Space Grotesk
- **Dark mode**: toggled via `.theme-dark` class on `:root`, not a media query

CSS custom properties are in `src/styles/global.css`. The design token system uses both Tailwind v4 variables (`--color-*`) and legacy `--gray-*` / `--accent-*` tokens.

## Key Gotchas

- **Tailwind v4**: Uses `@import "tailwindcss"` in CSS (not `@tailwind` directives). Configured via Vite plugin (`@tailwindcss/vite`), not a tailwind.config file.
- **DaisyUI v5**: Loaded as a `@plugin "daisyui"` in global.css, not via config.
- **No TypeScript strict beyond Astro defaults**: `tsconfig.json` extends `astro/tsconfigs/strict`.
- **Package manager is bun** — CI uses `bun@latest`. Don't use npm/yarn/pnpm.
- **Deploy triggers on push to `main`** — the GitHub Action at `.github/workflows/deploy.yml` builds and deploys to GitHub Pages.
- **OG image is generated at build time** via `src/pages/og.png.ts`.
- **SEO pages** (`/vs/` and `/blueprints/`) are driven by `src/data/pseo.json` — edit the JSON, not the template.
