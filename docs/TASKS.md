# Task board

Each developer owns whole pages, so two people never edit the same file.
Work on one branch per page, open a pull request into `main`, and tick the boxes in your PR description.

| Developer | Pages | Branches |
|---|---|---|
| Lead | Shell (already built): header, menu, visitor count, theme, ticker, footer, routing, popup, data | `main` (reviews every PR) |
| Dev A | Home | `feature/home` |
| Dev B | Products, Price List | `feature/products`, `feature/prices` |
| Dev C | Technology, Gallery | `feature/technology`, `feature/gallery` |
| Dev D | Store Locator, Support | `feature/store-locator`, `feature/support` |
| Dev E | About Us, Contact Us, Site Map | `feature/about`, `feature/contact`, `feature/sitemap` |

**Only 4 developers?** Dev A also takes Site Map, and Dev E keeps About + Contact.

Files you own for a page: `src/pages/<Page>.jsx` and `src/pages/<Page>.css`. Nothing else.
All pages are built. Use the checklists below to review and test your page, and fix anything that is missing.

## Home

- **Owner:** Dev A
- **Branch:** `feature/home`
- **Files:** `src/pages/Home.jsx`, `src/pages/Home.css`
- **Figma:** D-01 Home · M-01 Home
- **Data:** home.json, products.json, lineups.json

- [ ] Hero carousel from home.json → hero.carousel.slides (6 slides): eyebrow, title, reference, price, transparent watch PNG, specification tabs and chips.
- [ ] Carousel controls: autoplay every intervalMs (6 s), pause on hover, previous / next arrows, 01–06 buttons, keyboard ← →, swipe on phones.
- [ ] "View details" opens the watch popup: const openWatch = useWatchPopup(); openWatch(slide.cta.productId).
- [ ] Stats strip (hero.stats) and the 4.9 rating chip.
- [ ] Line-up tiles for lineupSection.lineupIds: photo with the name on it, extra text on hover (desktop) and always visible on touch screens. Each tile links to #/products/<id>.
- [ ] Featured watches (featuredSection.productIds) as <WatchCard>s + "View all products" link.
- [ ] "For her" section (home.forHer) with 4 cards, the Workshop section and the Testimonial.
- [ ] Fade sections up on scroll with <Reveal>; check 1440, 1024, 768 and 390 px widths in dark and light mode.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Products

- **Owner:** Dev B
- **Branch:** `feature/products`
- **Files:** `src/pages/Products.jsx`, `src/pages/Products.css`
- **Figma:** D-02 Products · D-02W Women · M-02
- **Data:** products.json, lineups.json, pages.json → products

- [ ] Read the line-up from the URL: the page receives it as the `param` prop (#/products/luxury → "luxury"). Unknown or empty → lineups.json defaultLineup.
- [ ] Line-up tabs from lineups.json (All, Women, Vintage, Luxury, Smart Watches, Clocks) as links to #/products/<id>; the active tab is gold.
- [ ] Filter products.json: product.lineups includes the line-up id ("all" shows everything). Title + description come from the line-up.
- [ ] Results line from pages.json resultsLabel, e.g. "6 Luxury watches".
- [ ] Sort dropdown from products.json sortOptions (price high → low by default).
- [ ] Grid of <WatchCard watch={…} lineupName={…} />: 4 / 2 / 1 columns. Clicking a card already opens the popup.
- [ ] Empty state with a link to #/products/all.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Price List

- **Owner:** Dev B
- **Branch:** `feature/prices`
- **Files:** `src/pages/Prices.jsx`, `src/pages/Prices.css`
- **Figma:** D-05 Price List · M-05
- **Data:** products.json, lineups.json, pages.json → prices

- [ ] Table of every product with the columns in pages.json prices.columns (Watch, Brand, Line-up, Size · Movement, Price).
- [ ] Line-up filter tabs and a search box that matches name + brand.
- [ ] Click the Price column header to sort high → low / low → high.
- [ ] Clicking a row (or Enter on it) opens the watch popup with useWatchPopup().
- [ ] On phones each row becomes a small card (hide the table head, label each value).
- [ ] Footnote under the table: count of pieces, currency note and pages.json footnote.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Technology

- **Owner:** Dev C
- **Branch:** `feature/technology`
- **Files:** `src/pages/Technology.jsx`, `src/pages/Technology.css`
- **Figma:** D-04 Technology · M-04
- **Data:** technology.json, pages.json → technology

- [ ] Feature block: movement photo, eyebrow, title, text and the facts list (technology.json → feature).
- [ ] "Four ways to keep time": 4 movement-type cards with their icon (<Icon name={m.icon} />), text and "Found in" line.
- [ ] Materials: 3 cards with photo, title and text.
- [ ] Cards fade up one after another (<Reveal delay={i * 100}>).
- [ ] Responsive: 4 → 2 → 1 columns.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Gallery

- **Owner:** Dev C
- **Branch:** `feature/gallery`
- **Files:** `src/pages/Gallery.jsx`, `src/pages/Gallery.css`
- **Figma:** D-06 Gallery · M-06
- **Data:** gallery.json, pages.json → gallery

- [ ] Category filter tabs from gallery.json categories.
- [ ] Masonry grid: 3 columns desktop, 2 tablet, 1 phone (CSS columns). Caption shows on hover.
- [ ] Click a photo → full-screen lightbox with the photo, caption, "3 / 9" counter, ← → buttons and ✕.
- [ ] Keyboard: ← → to move, Esc to close. Lock page scroll while open (useScrollLock).
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Store Locator

- **Owner:** Dev D
- **Branch:** `feature/store-locator`
- **Files:** `src/pages/StoreLocator.jsx`, `src/pages/StoreLocator.css`
- **Figma:** D-07 Store Locator · M-07
- **Data:** stores.json, pages.json → storeLocator

- [ ] Store cards: photo, name, address, phone, hours label and services.
- [ ] "Open now" / "Closed" worked out from stores.json hours and the current time.
- [ ] Search box filtering by name, address and city.
- [ ] "Use my location" button: navigator.geolocation, then sort stores by distanceKm() (src/lib/format.js) and show "2.4 km away".
- [ ] Clicking a store selects it (gold border) and shows it on a Google Maps iframe: https://maps.google.com/maps?q=LAT,LNG&z=15&output=embed
- [ ] "Get directions" link (store.mapsUrl, opens in a new tab).
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Support

- **Owner:** Dev D
- **Branch:** `feature/support`
- **Files:** `src/pages/Support.jsx`, `src/pages/Support.css`
- **Figma:** D-08 Support · M-08
- **Data:** support.json, pages.json → support

- [ ] 3 service cards (photo, title, text, price label).
- [ ] FAQ accordion: one question open at a time; the one with openByDefault starts open; smooth open / close.
- [ ] FAQ intro column with the "Contact us" button.
- [ ] "Book a repair" banner linking to #/contact.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## About Us

- **Owner:** Dev E
- **Branch:** `feature/about`
- **Files:** `src/pages/About.jsx`, `src/pages/About.css`
- **Figma:** D-09 About · M-09
- **Data:** about.json, site.json

- [ ] Story: boutique photo, story text, founder quote and the brands carried (site.json brand.brandsCarried).
- [ ] Timeline of 4 years (about.json timeline): horizontal on desktop, vertical on phones.
- [ ] REQUIRED by the brief: Email, address and phone cards (about.json contactSection.cards). Email → mailto:, phone → tel:.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Contact Us

- **Owner:** Dev E
- **Branch:** `feature/contact`
- **Files:** `src/pages/Contact.jsx`, `src/pages/Contact.css`
- **Figma:** D-10 Contact · M-10
- **Data:** contact.json, pages.json → contact

- [ ] REQUIRED by the brief: info cards with email, phone, address and hours (contact.json infoCards, links use href).
- [ ] Enquiry form built from contact.json form.fields (text, email, tel, select, textarea).
- [ ] Validation on submit using each field's required / minLength / pattern / email rules; show the field's error message under it.
- [ ] No backend: on success show form.successMessage as a toast and clear the form.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

## Site Map

- **Owner:** Dev E
- **Branch:** `feature/sitemap`
- **Files:** `src/pages/SiteMap.jsx`, `src/pages/SiteMap.css`
- **Figma:** D-11 Site Map · M-11
- **Data:** sitemap.json, pages.json → sitemap

- [ ] One card per group in sitemap.json siteMapPageGroups; the group title links to its route.
- [ ] List the group's links underneath (each links to the group's route).
- [ ] 4 / 2 / 1 columns.
- [ ] Works in dark and light mode, at 1440 / 1024 / 768 / 390 px, with no console errors

