# Ray Tracing: The Next Week in Rust

A Rust adaptation of [*Ray Tracing: The Next Week*](https://raytracing.github.io/books/RayTracingTheNextWeek.html) by Peter Shirley, Trevor David Black, and Steve Hollasch — the second book in the [Ray Tracing in One Weekend](https://raytracing.github.io/) series.

The site is deployed at https://ray-tracing-the-next-week-in-rust.vercel.app/.

## What this is

A direct follow-up to [The Ray Tracing Road to Rust](https://the-ray-tracing-road-to-rust.vercel.app/) by [Sheng Chou](https://github.com/chousheng), which adapted the first book in the series (*Ray Tracing in One Weekend*) into Rust. Both the original books and this adaptation are released under [CC0](https://github.com/RayTracing/raytracing.github.io/blob/release/COPYING.txt).

**Nearly everything about how this site looks and works comes from Sheng Chou's project.** The structure, the Next.js + Nextra platform, the side-by-side Rust/C++ tab component, the styling, the chapter layout, the convention of treating the book's prose as the authoritative narrative and the Rust translation as an addition — all of it was established by *The Ray Tracing Road to Rust*. This repository starts from the same patterns and continues them into the second book. If you find anything well-designed on this site, the credit belongs to Sheng Chou; the author of this repo has mostly been carrying the same approach forward into new chapters.

Each chapter keeps the original narrative intact and presents the code in Rust and C++ side-by-side using a tab switcher, so a reader can compare implementations without losing their place. The Rust translations live alongside the unchanged C++ listings rather than replacing them.

## Why this exists

This is a learning exercise for the author. The goal is to work through the second book and translate each idea into idiomatic Rust — moving the rendering loop into the camera, swapping `shared_ptr` for `Rc`/`Box`, turning C++ output parameters into `Option<HitRecord>` and `Option<ScatterRecord>`, and so on — while keeping the book's narrative readable as a teaching text.

The accompanying Rust source lives in a sibling repository (`code_for_next_week_in_rust`), and the listings in this site are kept in sync with that repo as the author works through each chapter.

## How it was written

This site is also an experiment in collaborative authoring with an AI coding assistant. The prose in the chapters, the alignment work that keeps each chapter in sync with the upstream book, the per-listing line highlights in the Rust tabs, the project's `CLAUDE.md`, and this README itself were largely drafted by [Claude Code](https://claude.com/claude-code) — Anthropic's command-line agent — running against the repo. The author wrote the underlying Rust source that the chapter listings track, made every design decision, reviewed each diff, and committed everything by hand. Where Claude was wrong or out of step, the author redirected; where it proposed something useful, the author kept it.

So: the substance — what gets translated, how Rust idioms are chosen, which bugs are real — is the author's. The wording is largely Claude's. That trade-off is part of what's being tested.

## Running the site locally

```bash
pnpm dev       # Start dev server at localhost:3000
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # ESLint via next lint
```

The site is a [Next.js 13](https://nextjs.org/) + [Nextra 2](https://nextra.site/) documentation site. Content is authored in MDX under `pages/`.

## Acknowledgements

All credit for the original book, its narrative, the diagrams, and the rendered images goes to Peter Shirley, Trevor David Black, and Steve Hollasch.

The site's entire shape — the platform, the components, the conventions for presenting Rust alongside C++, the chapter scaffolding — is borrowed from [The Ray Tracing Road to Rust](https://the-ray-tracing-road-to-rust.vercel.app/) by [Sheng Chou](https://github.com/chousheng). This adaptation is largely an extension of that work into the second book of the series; the design decisions that make it readable were made there, not here.

What this repo adds on top of those two foundations is the Rust translation of the second book's code listings and short notes where Rust's ownership and trait system call for a different shape than the original C++.
