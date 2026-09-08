# Ondřej Všetička — Portfolio

Premium light-mode developer portfolio built with Next.js 14, Tailwind CSS, Framer Motion, and Babylon.js.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **next-intl** — Czech (default) + English
- **Tailwind CSS** + glassmorphism utilities
- **Framer Motion** — scroll reveals & transitions
- **Babylon.js** — Morpho-style interactive particle hero + mini 3D bento card
- **Lenis** — smooth scrolling

## Locales

- Czech: `/cs` (default, also `/`)
- English: `/en`

Use the **CS / EN** toggle in the navbar to switch language.

## Getting started

Requires **Node 20+** and **pnpm 10+**.

```bash
corepack enable
corepack install
pnpm install
pnpm dev
```

> **Note:** Node 22+ may print a `DEP0169 url.parse()` warning during `pnpm install`. This comes from pnpm itself (not this repo) and has no known CVE. To silence it: `NODE_OPTIONS='--disable-warning=DEP0169' pnpm install`.

If the dev server returns **500 on `/_next/static/*` manifests**, clear the stale cache:

```bash
pnpm dev:clean
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `pnpm dev`         | Development server                       |
| `pnpm dev:clean`   | Clear `.next` cache, then start dev      |
| `pnpm clean`       | Remove `.next` build cache               |
| `pnpm build`       | Production build                         |
| `pnpm start`       | Start production                         |
| `pnpm lint`        | ESLint                                   |

## Structure

```
src/
├── app/
│   └── [locale]/        # cs + en routes
├── i18n/                # next-intl routing & navigation
├── components/
messages/
├── cs.json
└── en.json
```
