# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from inside the `pay10.bh/` directory.

```bash
npm run dev      # Start dev server on port 3186 (uses Turbopack)
npm run build    # Production build
npm run lint     # Run ESLint (errors are intentionally ignored during builds)
```

No test suite is configured.

Node version: **20.20.2** (see `.nvmrc`).

## Architecture

This is a **Next.js 15 App Router** marketing/product site for Pay10 UAE (a fintech payments company). It is deployed on Netlify via `@netlify/plugin-nextjs`.

### Page pattern

Every route follows the same two-file split:
- `app/<route>/page.js` — server component, exports `metadata`, renders a `<XxxClient />` component
- `app/<route>/XxxClient.js` — `'use client'` component with the actual UI

This separation exists to allow static metadata export while keeping interactivity. Most page data is currently **hardcoded in the Client file** (not fetched from the API), except for a few pages that pull from the backend.

### Styling

- Global styles: `styles/globals.scss` (imports from `styles/globals/_*.scss`)
- CSS variables (colors, gradients, easing curves, font stacks): `app/variables.css`
- Per-component styles: CSS Modules (`.module.scss`) co-located with each component
- SCSS mixins for breakpoints in `styles/globals/_mixin.scss`:
  - `@include extra` — 1440–1920px
  - `@include large` — ≤1200px
  - `@include tab` — ≤991px
  - `@include lessTab` — ≤767px
  - `@include mobile` — ≤563px
- The `ResponsiveContext` (`app/contexts/ResponsiveContext.js`) exposes `isMobile`, `isTablet`, `isDesktop`, and `headerHeight` to any client component. Breakpoints: mobile <768, tablet 768–991, desktop ≥992.

### Animation system

Scroll-triggered animations use a global `IntersectionObserver` initialized once in `GlobalInViewInitializer` (mounted in root layout). To animate any element, add `data-animation` to it — the observer adds the `in-view` class when it enters the viewport. Attributes:
- `data-anim-offset` — per-element `rootMargin` override (e.g. `"-15%"`)
- `data-anim-re="true"` — reversible animation (class removed on scroll out)
- `data-anim-delay="300"` — delay in ms before adding `in-view`
- `data-anim-class` — custom class name instead of `in-view`

GSAP is available for imperative animation (`gsap` package). Swiper is available for carousels.

### Global state

`app/lib/animationState.js` exports a Zustand store with a single boolean `canStartAnimations` / `setCanStartAnimations`. This gates GSAP animations until the page loader completes.

### CSP & Security headers

The Content-Security-Policy is built in `next.config.js` from a structured `cspSources` object. When adding new external domains (scripts, images, fonts, API calls), add them there rather than inline. CSP sources can be extended at runtime via `CSP_*_EXTRA` environment variables. Google Analytics / GTM is currently commented out (staging environment).

### Backend proxy

The frontend never calls the backend API directly from the client. `app/api/proxy/[...path]/route.js` forwards `GET`/`POST` to `${NEXT_PUBLIC_API}/<path>` with the `BACKEND_AUTH_KEY` injected server-side. It only forwards paths listed in its `ALLOWED_PATHS` allowlist — add new entries there deliberately when a feature needs a new backend endpoint. Server components can also call the backend directly via `app/lib/fetchPageData.js` (`fetchPageData`/`fetchPageMeta`), which uses the same `NEXT_PUBLIC_API`/`BACKEND_AUTH_KEY` env vars.

### Redirects

Legacy PHP URLs and old slug variants are permanently redirected in `next.config.js` under `redirects()`. `proxy.js` (the middleware, exported as `proxy`/`config` — despite the filename it's the Next.js middleware) redirects bare `pay10.bh` → `www.pay10.bh` with a 308, and rate-limits `/api/proxy/*` (10 req/min per IP, in-memory store — valid only because this runs as a single long-lived `next start` process, not serverless/edge).

### Fonts

Outfit is loaded via `next/font/google` and exposed as CSS variable `--font-outfit`. Additional weight variants are loaded as local `.woff2` files in `fonts/` and exposed as font-family names (`extrabold`, `bold`, `semibold`, `medium`, `regular`, `light`) in `app/variables.css`.

### Security & dependency patching

See `SECURITY.md` for the full policy (critical CVEs patched within 72h, non-critical monthly). In short: `.github/dependabot.yml` opens patch PRs automatically, `.github/workflows/security-audit.yml` fails CI on any HIGH/CRITICAL CVE, and `package.json` `overrides` pins vulnerable transitive deps. Merging a Dependabot PR is sufficient — the next deploy picks up the patched version.
