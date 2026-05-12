# Ray Tracing: The Next Week in Rust

A Rust adaptation of [*Ray Tracing: The Next Week*](https://raytracing.github.io/books/RayTracingTheNextWeek.html) by Peter Shirley, Trevor David Black, and Steve Hollasch — the second book in the [Ray Tracing in One Weekend](https://raytracing.github.io/) series.

The site is deployed at https://ray-tracing-the-next-week-in-rust.vercel.app/.

## What this is

A follow-up to [The Ray Tracing Road to Rust](https://the-ray-tracing-road-to-rust.vercel.app/), which adapted the first book in the series (*Ray Tracing in One Weekend*) into Rust. Both the original books and this adaptation are released under [CC0](https://github.com/RayTracing/raytracing.github.io/blob/release/COPYING.txt).

Each chapter keeps the original narrative intact and presents the code in Rust and C++ side-by-side using a tab switcher, so a reader can compare implementations without losing their place. The Rust translations live alongside the unchanged C++ listings rather than replacing them.

## Why this exists

This is a learning exercise for the author. The goal is to work through the second book and translate each idea into idiomatic Rust — moving the rendering loop into the camera, swapping `shared_ptr` for `Rc`/`Box`, turning C++ output parameters into `Option<HitRecord>` and `Option<ScatterRecord>`, and so on — while keeping the book's narrative readable as a teaching text.

The accompanying Rust source lives in a sibling repository (`code_for_next_week_in_rust`), and the listings in this site are kept in sync with that repo as the author works through each chapter.

## Running the site locally

```bash
pnpm dev       # Start dev server at localhost:3000
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # ESLint via next lint
```

The site is a [Next.js 13](https://nextjs.org/) + [Nextra 2](https://nextra.site/) documentation site. Content is authored in MDX under `pages/`.

## Acknowledgements

All credit for the original book, the diagrams, and the rendered images goes to Peter Shirley, Trevor David Black, and Steve Hollasch. This adaptation only adds the Rust translations of the code listings and minor commentary about Rust-specific concerns.
