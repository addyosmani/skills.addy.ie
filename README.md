# skills.addy.ie

The developer site for **[agent-skills](https://github.com/addyosmani/agent-skills)** - production-grade
engineering skills for AI coding agents.

Built with [Astro](https://astro.build). Zero client-side framework, a small amount of
vanilla JS for search, tabs, and copy buttons. Dark, Vercel-inspired design system.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # static output to ./dist
npm run preview  # preview the production build
```

## Deploy

The site is fully static - deploy `dist/` anywhere. On **Vercel**, no config is needed:
import the repo and it auto-detects Astro (`npm run build`, output `dist`). Set the custom
domain to `skills.addy.ie`.

## Structure

```
src/
├── data/
│   ├── skills.ts        # the 24-skill catalog: phases, tags, commands
│   └── agents.ts        # review personas, slash commands, reference checklists
├── components/          # Nav, Footer, CopyCommand, SkillCard, Lifecycle
├── layouts/Base.astro   # <head>, SEO/OG, nav + footer shell
├── pages/
│   ├── index.astro          # landing
│   ├── skills/index.astro   # searchable / filterable catalog
│   ├── skills/[slug].astro  # generated detail page per skill
│   ├── lifecycle.astro      # phases + commands
│   ├── compare.astro        # honest positioning
│   ├── docs/getting-started.astro
│   └── 404.astro
└── styles/global.css    # design tokens + primitives
```

## Updating the catalog

Skill content is sourced from the [agent-skills](https://github.com/addyosmani/agent-skills)
repo. To add or edit a skill card, update [`src/data/skills.ts`](src/data/skills.ts) - detail
pages, the explorer, the lifecycle page, and the sitemap all regenerate from that single file.

## Teach / media kit assets

The `/teach` page serves reusable resources from `public/teach/`:

- **Diagrams** (`public/teach/diagrams/*.svg`) are hand-authored. Their `.png` twins are
  rasterized with resvg (see the OG one-liner below, pointed at the diagrams folder).
- **Decks** (`public/teach/decks/`) are generated from one source of truth,
  [`scripts/deck-data.mjs`](scripts/deck-data.mjs):

  ```bash
  node scripts/build-decks.mjs      # writes the self-contained HTML decks + deck-data.json
  python3 scripts/build_pptx.py     # writes the PPTX decks (needs python-pptx)
  ```

  Edit the slide content in `deck-data.mjs`, then rerun both. HTML decks inline the diagram
  SVGs so they work offline; PPTX decks embed the PNGs. Keep all of it free of em dashes.

## Regenerating the OG image

The social card lives at `public/og.png`, rasterized from `scripts/og.svg`:

```bash
npm i -D @resvg/resvg-js
node -e "const{Resvg}=require('@resvg/resvg-js');const fs=require('fs');const r=new Resvg(fs.readFileSync('scripts/og.svg'),{fitTo:{mode:'width',value:1200},font:{loadSystemFonts:true}});fs.writeFileSync('public/og.png',r.render().asPng())"
npm uninstall @resvg/resvg-js
```

## License

MIT - same as agent-skills.
