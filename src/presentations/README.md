# presentations

Each folder owns a talk: its pages, assets, canvas, and visual language. Event appearances belong to the site catalog, so a talk can be given more than once.

- `talk.ts` defines the talk; `index.ts` lists its pages in order.
- `common/` holds presentation types, theme helpers, and local fonts.
- `docs/` inside each talk is private preparation and is gitignored.
- `src/features/talks/registry/` registers catalog metadata and a separate lazy loader for each talk.

The site theme controls the catalog and player. Slide styles stay scoped to the presentation. The player exports all pages through the browser’s print-to-PDF dialog.
