# Alberto Clocks: data & images

The watches and the stores are the only things loaded from JSON. Everything else on the site (page text, menus, the footer, the ticker, the hero carousel, FAQs and so on) is written straight into the React components.

```
public/
├── data/
│   ├── products.json   27 watches and clocks: price, specs, photos, line-ups, stock
│   └── stores.json     10 stores: address, phone, opening hours, map coordinates
└── images/
    ├── photos/         product and page photos (hero/ has the carousel cut-outs, more/ the extra popup shots)
    ├── brand/          logo.svg (dark backgrounds), logo-light.svg (light backgrounds), favicon
    └── icons/          SVG line icons, coloured with the text colour
```

Load a file with the `useData` hook (see the README):

```js
const catalogue = useData('products'); // null while loading
const data = useData('stores');
```

Image paths (e.g. `/images/photos/gold-watch.jpg`) point at `public/images/…`. Pass them through `asset()`.

## Where the rest lives

| What | File |
|---|---|
| Menu links | `src/menu.js` |
| Line-ups (All, Women, Vintage, Luxury, Smart Watches, Clocks) | `src/lineups.js` |
| Home carousel slides and their specs | `src/pages/heroSlides.js` |
| Footer, ticker, popup buttons | the components in `src/components/` |
| Page text, FAQs, gallery photos, timeline, contact form | each page in `src/pages/` |

## products.json → `products[]`

| Field | Type | Example | Notes |
|---|---|---|---|
| `id` | string | `rolex-datejust-41` | Unique, used to open the popup |
| `brand` | string | `Rolex` | Shown small above the name on cards |
| `name` | string | `Datejust 41, Yellow Gold` | Card title / popup title |
| `fullName` | string | `Rolex Datejust 41, Yellow Gold` | For search and the price list |
| `lineups` | string[] | `["luxury"]` | Line-up ids from `src/lineups.js`. A product can be in more than one |
| `primaryLineup` | string | `luxury` | Shown on the gold badge |
| `price` | number | `19920000` | Use for sorting |
| `priceDisplay` | string | `₦19,920,000` | Use for display |
| `reference` | string | `126333` | "Ref." line in the popup |
| `image` | string | `/images/photos/gold-watch.jpg` | Card photo and popup main photo |
| `thumbnails` | string[] | 3 paths | Popup photos: the main photo, then two extra shots from `images/photos/more/` |
| `description` | string | | Popup paragraph |
| `specs` | object | `case, material, movement, waterResistance, powerReserve, strap, warranty` | Raw values |
| `specsDisplayed` | {label,value}[] | 6 rows | Rows for the popup spec table |
| `movementType` | string | `automatic` | One of `quartz`, `automatic`, `eco-drive`, `smart`, `hand-wound`, `tourbillon`, `mechanical` |
| `isNew` | boolean | | Show a "New" badge |
| `inStock` | boolean | | |
| `availableAt` | string[] | `["lagos-island", …]` | Store ids from stores.json |

`currency.note` at the top of the file is printed under the price list.

## stores.json → `stores[]`

`hours` holds 24-hour open/close times for each day (`sun: null` means closed), used to work out "Open now". `lat`/`lng` are for the map and "Use my location" sorting. `mapsUrl` is the directions link.

## Images and credits

Photos come from **Pexels** (pexels.com) and are free to use under the Pexels License, with no attribution required. Replace them with real Alberto product photos before launch and keep the same file names, or update the `image` paths in products.json.

Brand names (Rolex, Citizen, Bulova, Michael Kors, Seiko) are retailers' stock listed for this school project. Models, prices, references and store addresses are sample data. Prices are in Nigerian naira (₦), converted from USD at ₦1,550 = $1.
