# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git

Do not mention Claude or AI in commit messages.

## Commands

```bash
pnpm dev       # Start dev server at localhost:3000
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # ESLint via next lint
```

## Purpose

This site is a **Rust teaching adaptation** of [Ray Tracing: The Next Week](https://raytracing.github.io/books/RayTracingTheNextWeek.html) by Peter Shirley, Trevor David Black, and Steve Hollasch. The original book uses C++; this version translates every code listing into Rust while keeping the narrative intact.

It is modeled after [The Ray Tracing Road to Rust](https://the-ray-tracing-road-to-rust.vercel.app/), which does the same for the first book in the series (*Ray Tracing in One Weekend*). Content, tone, component usage, and structure should stay consistent with that site.

Each chapter presents Rust and C++ side-by-side using the `<Tabs>` / `<Tab>` components so readers can compare implementations. The default tab key is `"tab.lang"`, which persists across chapters so a reader who selects Rust once doesn't have to re-select it.

## Architecture

This is a **Next.js 13 + Nextra 2** documentation site using the `nextra-theme-docs` theme. Content is authored in MDX under `pages/`. Navigation order and sidebar labels are controlled by `pages/_meta.json`.

**Content structure:**
- `pages/index.mdx` — Introduction
- `pages/1-motion-blur.mdx` through `pages/9-final-scene.mdx` — Chapters
- `pages/acknowledgements.mdx` — Acknowledgements
- `pages/appendix/` — Appendix pages

**Custom components** (registered globally in `theme.config.jsx` → `components`):
- `<Fig src="..." caption="..." />` — Fixed 600px-wide figures, images resolved from `images/`
- `<Img src="..." caption="..." style={...} />` — Responsive figures; PNG files get `image-rendering: pixelated` and skip Next.js optimization
- `<Tabs storageKey="..." labels={[...]}>` / `<Tab label="...">` — Tab switcher that persists the selected tab to `localStorage` and compensates scroll position on tab change; default `storageKey` is `"tab.lang"`

**Image handling:** All images live in `images/`. The `Img`/`Fig` components use `require("../images/" + src)`, so Next.js handles static import (blur placeholder, etc.). Add new images to `images/` before referencing them in MDX.

**Deployment:** The site is deployed to https://ray-tracing-the-next-week-in-rust.vercel.app/. After pushing changes, verify them there.

**Global config:** `theme.config.jsx` sets SEO metadata, OG image, GitHub repo link, footer, and injects the custom components. The base URL is derived from `NEXT_PUBLIC_VERCEL_URL` for Vercel preview deployments.

**Styling:** Tailwind CSS (dark mode via `class`), with `postcss.config.js` and `styles.css` for globals.

**Analytics:** Vercel Analytics is injected in `pages/_app.mdx`.

**LaTeX support** is enabled via `nextra` config (`latex: true`). Use standard `$...$` / `$$...$$` in MDX.
