# Design guide

## Figma

Design file: https://www.figma.com/design/bxEaYDfUBs7fjkywWsKLmc (ask the lead for access)

| Page in Figma | What's there |
|---|---|
| 01 — Start Here | Guide, foundations (colours, type), components |
| 02 — Desktop Screens · Dark & Light | D-01 … D-11 (1440 px), each in dark and light |
| 03 — Mobile Screens & Sitemap | M-01 … M-11 (390 px) and the sitemap |

The screen code in `docs/TASKS.md` (for example "D-06 Gallery") tells you which frame to open.

## Colours

All colours are CSS variables in `src/styles/tokens.css`. Dark values sit on `:root` and light values on `[data-theme="light"]`. **Always use the variable**, never the hex code.

| Variable | Use |
|---|---|
| `--bg-page` / `--bg-surface` / `--bg-elevated` | Page background / cards / raised areas |
| `--text-primary` / `--text-secondary` / `--text-muted` | Headings / body / captions |
| `--accent-gold` / `--accent-gold-hover` / `--accent-gold-soft` | Brand gold, hover gold, soft gold fills |
| `--accent-on-gold` | Text on a gold button |
| `--border-subtle` / `--border-strong` | Dividers / input borders |
| `--overlay-scrim` | Behind popups |

Text that sits **on a photo** (cards, tiles) stays light (`#f3ede2`) in both modes, over a dark gradient.

## Type

| Role | Font | Example |
|---|---|---|
| Display / headings | Cormorant Garamond 600 (`var(--font-display)`) | Page titles, card titles, prices |
| Body / UI | Manrope 400–700 (`var(--font-body)`) | Paragraphs, buttons, labels |
| Hero title | Roboto Condensed Bold Italic (`var(--font-hero)`) | "SELF-WINDING SKELETON" |

Labels and eyebrows are uppercase with letter spacing: use `.eyebrow`.

## Layout

- Content width 1312 px + 64 px side padding (`.container`). Padding drops to 32 px at 1024 px and 20 px at 768 px.
- Grid gap 32 px (`.grid`, `.grid--2/3/4`, which already collapse on smaller screens).
- Breakpoints: **1100** (header turns into the burger menu), **1024**, **768** (phone), **480**.
- Sections: `.section` gives 96 px top/bottom (64 px on phones). `.section--alt` uses the surface colour.

## Motion

- Section change: 200 ms fade out, 300 ms fade in (built into `App.jsx`).
- Hover: 200 ms (`var(--hover-ms)`).
- Popups: 250 ms (`var(--popup-ms)`).
- Scroll reveal: wrap blocks in `<Reveal>` and stagger cards with `delay={i * 80}`.
- Everything respects "reduce motion".

## Diagrams

`docs/diagrams/`: sitemap, page layout, user flow and component map (PNG + SVG).
