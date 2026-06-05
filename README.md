# fatihguzel.dev

personal site for [fatih guzel](https://fatihguzel.dev) — minimal, static, seo-first.

## stack

- next.js 15.5.18 (static export)
- react 19.2.6
- typescript
- vemi for article compilation
- cloudflare pages

## development

```bash
npm install
npm run dev
```

## build

```bash
npm run build
```

output is written to `out/` for cloudflare pages.

## content

editable json lives in `content/`:

- `content/site.json` — site metadata
- `content/projects.json` — all projects
- `content/pages/home.json` — landing content and featured slugs
- `content/now.json` — current focus
- `content/articles/*.md` — articles with yaml frontmatter

## deploy (cloudflare pages)

- build command: `npm run build`
- output directory: `out`
