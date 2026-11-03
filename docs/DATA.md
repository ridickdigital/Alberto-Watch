# Alberto Clocks: website data & images

All the content shown in the Figma design (Alberto Clocks website, desktop and mobile, dark and light), as JSON files, plus every image the site uses.

## How to use it in the React app

In this repo they already live in `public/data/` and `public/images/`:

```
public/
├── data/      ← the JSON files below
└── images/    ← photos, logo, icons
```

Load a file with the `useData` hook (see the README), or with `fetch`:

```js
const { products } = await fetch('/data/products.json').then(r => r.json());
```

Image paths inside the JSON (e.g. `/images/photos/gold-watch.jpg`) already point at `public/images/…`.

## Folder contents

```
data/
  site.json         brand, contact details, footer, visitor counter, theme, SEO, transitions, breakpoints
  navigation.json   main menu (9 items + routes), menu hover/active states, footer link groups, mobile menu
  home.json         hero, stats, featured tag, rating chip, line-up section, featured watches, workshop band, testimonial
  lineups.json      All / Vintage / Luxury / Smart Watches / Clocks / Women: names, routes, headings, tile images
  products.json     27 products (men and women) with price, specs, photos, line-ups, stock; sort options
  pages.json        page titles, intro text, breadcrumbs and behaviour notes for every page
  technology.json   movement feature, 4 movement types, 3 materials
  gallery.json      9 gallery photos with captions and categories, lightbox controls
  stores.json       3 stores with address, phone, opening hours, map coordinates
  support.json      3 services, 5 FAQs, "Book a repair" banner
  about.json        story, founder quote, 4-step timeline, email / address / phone cards
  contact.json      contact cards + enquiry form fields with validation rules and messages
  ticker.json       bottom ticker: date, time, location (with fallback) and promos
  theme.json        16 colour tokens (dark + light hex, CSS variable names), fonts, type scale, spacing
  sitemap.json      site tree + the groups shown on the Site Map page
  images.json       list of every image, what it shows and which files use it, plus credits
images/
  photos/   14 JPG photos (max 1600 px on the long side)
  brand/    logo.svg (for dark backgrounds), logo-light.svg (for light backgrounds),
            logo@2x.png, logo-mark.svg, logo-mark@4x.png (favicon)
  icons/    23 SVG line icons: they use currentColor, so they take the text colour
```

## Data dictionary

### products.json → `products[]`

| Field | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `rolex-datejust-41` | Unique, used in URLs and links from other files |
| `brand` | string | `Rolex` | Shown small above the name on cards |
| `name` | string | `Datejust 41, Yellow Gold` | Card title / popup title |
| `fullName` | string | `Rolex Datejust 41, Yellow Gold` | For search and the price list |
| `lineups` | string[] | `["luxury"]` | Line-up ids from lineups.json. A product can be in more than one |
| `primaryLineup` | string | `luxury` | Shown on the gold badge |
| `price` | number | `19920000` | Use for sorting |
| `priceDisplay` | string | `₦19,920,000` | Use for display |
| `currency` | string | `NGN` | Prices converted at ₦1,550 = $1 |
| `reference` | string | `126333` | "Ref." line in the popup |
| `image` | string | `/images/photos/gold-watch.jpg` | Card photo and popup main photo |
| `thumbnails` | string[] | 4 paths | Popup thumbnails (the first is the main photo) |
| `description` | string | | Popup paragraph |
| `specs` | object | `case, material, movement, waterResistance, powerReserve, strap, warranty` | Raw values |
| `specsDisplayed` | {label,value}[] | 6 rows | Ready-made rows for the popup spec table |
| `movementType` | string | `automatic` | One of `quartz`, `automatic`, `eco-drive`, `smart`, `hand-wound`, `tourbillon`, `mechanical` |
| `features` | string[] | | Bullet list (optional in UI) |
| `featuredOrder` | number \| null | `1` | Order in "This season's pieces" on Home; `null` = not featured |
| `isNew` | boolean | | Show a "New" badge |
| `inStock` | boolean | | |
| `availableAt` | string[] | `["lagos-island", …]` | Store ids from stores.json |

### Other key fields

- **lineups.json**: `id`, `name`, `route`, `heading` (e.g. "The Luxury line-up"), `description`, `tileImage`. `designPieceCount` is the number printed on the Home tiles in the design (18 / 24 / 12 / 15). In code, count the products in each line-up instead.
- **stores.json**: `hours` holds 24-hour open/close times for each day (`sun: null` means closed), used to work out "Open now". `lat`/`lng` are for the map pins and "Use my location" sorting.
- **contact.json → form.fields**: `name`, `label`, `type`, `placeholder`, `required`, plus `minLength` / `pattern` and an `error` message. These map directly to HTML5 validation attributes.
- **ticker.json**: `date` and `time` items update every second. `location` comes from `navigator.geolocation`; show `fallback` ("Location unavailable") if permission is refused.
- **site.json → visitorCounter**: localStorage key, start value and display format (zero-padded, e.g. `01,284`). Count once per browser session.
- **theme.json → colors**: each token has a `cssVar` (e.g. `--bg-page`) with a `dark` and a `light` value. Put the dark values on `:root` and the light values on `[data-theme="light"]`.

## Requirement checklist (eProject brief → data)

| Requirement | Where |
|---|---|
| Logo and colour scheme | site.json `brand.logo`, theme.json |
| Menu: Products, Technology, Store Locator, Support… | navigation.json `mainMenu` |
| Menu changes colour on hover and after click | navigation.json `menuStates`, theme.json gold tokens |
| Watches and clocks by line-up (Vintage, Luxury, Smart…) | lineups.json, products.json `lineups` |
| Full list per line-up | products.json (filter by `lineups`) |
| Watch details in a popup | products.json `description`, `specsDisplayed`, `thumbnails`; pages.json `watchDetails` |
| Price list for all watches | products.json `price` / `priceDisplay`; pages.json `prices.columns` |
| Gallery | gallery.json |
| Site map, gallery, about us, contact us links | navigation.json `footer`, sitemap.json |
| About / Contact show email, address, phone | site.json `contact`, about.json `contactSection`, contact.json `infoCards` |
| Scrolling ticker with date, time, location | ticker.json |
| Visitor count at the top right | site.json `visitorCounter` |
| Fade in / fade out between sections | site.json `transitions` |
| Light and dark mode | site.json `theme`, theme.json |

## Images and credits

Photos come from **Pexels** (pexels.com), inserted with the Figma Pexels plugin. They are free to use under the Pexels License, with no attribution required. Several products share a photo because they are placeholders: replace them with real Alberto product photos before launch and keep the same file names, or update the `image` paths. See images.json for which file uses each photo.

Brand names (Rolex, Citizen, Bulova, Michael Kors, Seiko) are retailers' stock listed for this school project. Models, prices, references and store addresses are sample data.

## Latest changes

- **Prices are in Nigerian naira (₦).** They were converted from USD at ₦1,550 = $1, rounded to the nearest ₦10,000 from ₦1,000,000 up and to the nearest ₦1,000 below that.
- **All stores are in Lagos:** Lagos Island (flagship), Lekki and Ikeja (14 Allen Avenue).
- **New Women line-up** (`women`) with 6 ladies' watches.
- **Home hero carousel:** `home.json → hero.carousel` holds 6 slides. Each slide's watch is a transparent PNG cut-out in `images/photos/hero/` (cut from large photos, never enlarged), and its button ("View details") opens the watch popup.
- `women-on-wrist.jpg`, `women-rose-gold.jpg` and `women-bracelet.jpg` are temporary copies of other photos. Replace them with the Figma women photos (same file names).
