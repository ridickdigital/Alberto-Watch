# Requirements (Aptech eProject: Alberto Clocks)

> Alberto Watch Company is a full-service watch repair, appraisal, and retail store offering the finest selection of luxury timepieces, including brand-new watches such as Michael Kors, Rolex, Citizen Eco-Drive and Bulova. Build a **Single-Page Application** and **responsive** website that works in all leading browsers (Chrome, Edge, Firefox, Safari).

## Functional requirements → where they are built

| # | Requirement | Where | Status |
|---|---|---|---|
| 1 | Logo at the top of the page and a decent colour combination | `components/Header.jsx`, `styles/tokens.css` | ✅ Shell |
| 2 | Menu with Products, Technology, Store Locator, Support, etc. | `components/Header.jsx` ← `navigation.json` | ✅ Shell |
| 3 | Sections about different watches and clocks, and the technology used | Home, Products, Technology pages | Dev A, B, C |
| 4 | Information categorised by product line-up (Vintage, Luxury, Smart Watches…) | Products page tabs ← `lineups.json` | Dev B |
| 5 | Selecting a line-up shows the complete list of its watches | `#/products/<lineup>` | Dev B |
| 6 | Watch details shown in a popup window | `components/WatchPopup.jsx` (`useWatchPopup()`) | ✅ Shell |
| 7 | Price list for all watches | Price List page | Dev B |
| 8 | Gallery of images | Gallery page | Dev C |
| 9 | Site map, Gallery, About us and Contact us links | Footer (✅ Shell) + Site Map page | Dev E |
| 10 | About Us and Contact Us show the email, address and contact number | About + Contact pages ← `site.json`, `about.json`, `contact.json` | Dev E |
| 11 | Continuous scrolling ticker at the bottom with current date, time and location (HTML5 geolocation) | `components/Ticker.jsx` + `useLocation()` | ✅ Shell |
| 12 | Visitor count at the top right, beside the logo | `components/Header.jsx` + `useVisitorCount()` | ✅ Shell |
| 13 | Menu options change colour on hover **and** after clicking | `.nav-link:hover`, `.nav-link.is-active` | ✅ Shell |
| 14 | Fade in / fade out for the menus | Section fade (`App.jsx`), mobile menu drawer fade | ✅ Shell |
| 15 | Visually appealing fonts, colours and animations; responsive layout | `tokens.css`, `base.css`, `<Reveal>` | Everyone |

Extras in this design: light/dark mode, a Women line-up, a hero carousel, store distance sorting and a validated contact form.

## Technology rules for this team

- React + plain CSS, built with Vite. No CSS or UI frameworks, no router library.
- Data store: JSON files in `public/data/`.
- Target browsers: Edge, Chrome, Firefox, Safari (Windows is the operating platform).

## Project deliverables (from the brief)

The final submission also needs a project report. Reference material is in `docs/`:

- Problem definition and design specifications: this file + `docs/DESIGN.md`
- Diagrams (sitemap, layout, user flow, components): `docs/diagrams/`
- Requirements checklist and sitemap/flow documents: `docs/reference/`
- Source code: this repository
- Test data: `public/data/*.json`
