# Portfolio — Yaroslav Bragin

Personal portfolio for a Middle+/Senior Vue Frontend Developer.

Live content is based on real commercial experience: enterprise admin panels, real-time monitoring UI, tourism ecosystems, Vue 2→3 / JS→TS migrations.

## Stack

- **Nuxt 4** + Vue 3 + TypeScript (strict, type-checked builds)
- **Tailwind CSS 4** + CSS variables (light/dark)
- **VueUse**, **Nuxt Fonts**
- **@nuxtjs/i18n** (RU / EN) with hreflang via `baseUrl`
- **@nuxtjs/color-mode**
- **@nuxtjs/sitemap**
- **ESLint** + **Prettier**
- **Vitest** + **@nuxt/test-utils**

## Features

- Feature-Sliced Design architecture
- Light / dark theme with smooth transitions
- Russian and English locales (`/` and `/en`)
- Scroll reveal animations with `prefers-reduced-motion` and no-JS fallback
- SEO: title, description, Open Graph, JSON-LD, canonical, favicon, sitemap, robots
- SSG-ready (`nuxt generate`)
- Case study pages for key projects
- CV download (`public/cv/bragin-yaroslav.pdf`)

## Install

```bash
cd portfolio
cp .env.example .env
# Windows PowerShell:
# Copy-Item .env.example .env
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production (static)

```bash
npm run generate
npm run preview
```

Output is in `.output/public`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test
```

## Project structure (FSD)

```text
app/
  pages/                 # routes (thin)
  layouts/
  widgets/               # page sections, header, footer
  features/              # theme, locale, scroll-reveal
  entities/              # project, experience, skill, education
  shared/                # ui, config, composables, lib
  assets/styles/         # design tokens + Tailwind
locales/                 # ru.json, en.json
public/                  # favicon, og, robots (+ optional cv/)
tests/
```

Dependency rule: `app → pages → widgets → features → entities → shared`.

## Screenshots

Place captures into [`docs/screenshots`](docs/screenshots) after a local run:

| File                 | Description                 |
| -------------------- | --------------------------- |
| `home-light.png`     | Light theme, first viewport |
| `home-dark.png`      | Dark theme                  |
| `project-detail.png` | Case study page             |
| `mobile.png`         | Mobile layout               |

## Environment

See [`.env.example`](.env.example):

- `NUXT_PUBLIC_SITE_URL` — canonical site URL for SEO/sitemap (also update `public/robots.txt` Sitemap line if you change the domain)
- `NUXT_PUBLIC_GITHUB_URL` — optional GitHub profile link in Contact

## License

Private portfolio project.
