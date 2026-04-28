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

## MDX/KaTeX gotchas

Two patterns from the original book's Markdeep source break in MDX 2 + KaTeX and must be rewritten when porting a chapter:

- `\begin{aligned}...\end{aligned}` — MDX 2 parses `{aligned}` as a JSX expression and fails with `ReferenceError: aligned is not defined` at deploy time. Replace each aligned block with separate single-line `$$...$$` equations.
- **Multi-line `$$...$$` blocks** — even with both delimiters present, splitting the contents across lines causes KaTeX to mis-tokenize and emit `ParseError: Can't use function '$' in math mode`, which cascades into the rest of the page rendering as raw MDX source (you'll see `&lt;Tab&gt;` etc. in the HTML). Always keep `$$...$$` blocks on a single line.

## Validating a ported chapter

The user expects each chapter to match the original book word-for-word (modulo Rust/C++ translation in code listings). Workflow:

1. **Edit and push.** The user prefers skipping local `pnpm build` — push and let Vercel build. Wait for deployment before verifying (poll the deployed URL with `curl` until new content appears; do not use `WebFetch`, which is cached).
2. **Fetch deployed HTML:** `curl -s https://ray-tracing-the-next-week-in-rust.vercel.app/<slug>`.
3. **Sanity-check rendering** before doing prose comparison:
   - Count `<h2` tags — should match the number of `##` headings in the MDX.
   - Grep for `&lt;Tab` or `&lt;/Tab` in the HTML. Any hit means MDX parsing broke partway down the page and the rest is rendering as raw source (usually a math syntax issue — see gotchas above).
   - If KaTeX errored, the offending block appears inside `<span class="katex-error" title="ParseError: ...">` — the `title` attribute names the cause and the span's text content shows the broken source.
4. **Word-by-word prose comparison** against the original Markdeep page (`https://raytracing.github.io/books/RayTracingTheNextWeek.html`). Strip HTML tags and code blocks from both sides, then diff the prose. The original book is the source of truth for narrative; only the code listings should differ (Rust added alongside C++).
