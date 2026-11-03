# Alberto Watch: Alberto Clocks website

Team repository for the **Alberto Clocks** eProject: a single-page, responsive website for a watch repair, appraisal and retail company in Lagos.

- **Stack:** React 18 + plain CSS. [Vite](https://vitejs.dev) runs and bundles it.
- **No frameworks:** no Next.js, no Bootstrap, no Tailwind, no router library. Routing is a small hash router in `src/lib/router.js`.
- **Data store:** JSON files in `public/data/` (as the brief asks), loaded with `fetch`.

The shell is already built and working: header, menu, visitor count, light/dark mode, scrolling ticker, footer, routing, section fade, watch popup and all data and images. All pages are now fully built too. [docs/TASKS.md](docs/TASKS.md) shows who owns each page: improve, test and fix your own pages there.

---

## 1. Get started (5 minutes)

You need **Node.js 18 or newer** (20 recommended; `node -v` to check) and **Git**.

```bash
git clone https://github.com/ridickdigital/Alberto-Watch.git
cd Alberto-Watch
npm install
npm run dev
```

The site opens at **http://localhost:5173**. Edits reload instantly.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` (must pass before you open a PR) |
| `npm run preview` | Serve the production build |
| `npm run format` | Format all code with Prettier (run before every commit) |
| `npm run format:check` | Check formatting (CI runs this) |

**Seeing `npm warn allow-scripts … esbuild`?** That is a harmless notice from newer npm versions. Everything still works.

---

## 2. Find your task

Open **[docs/TASKS.md](docs/TASKS.md)**. Every page has one owner, one branch and a checklist:

| Developer | Pages |
|---|---|
| Dev A | Home |
| Dev B | Products, Price List |
| Dev C | Technology, Gallery |
| Dev D | Store Locator, Support |
| Dev E | About Us, Contact Us, Site Map |
| Lead | Shell (done) and reviews every PR |

Each page is two files: `src/pages/<Page>.jsx` and `src/pages/<Page>.css`. **Only edit your own page files.** Because nobody shares a file, there are no merge conflicts.

Then read **[CONTRIBUTING.md](CONTRIBUTING.md)** for the branch → PR workflow.

---

## 3. Project structure

```
public/
  data/            ← all text, prices, products, stores… (JSON). Field guide: docs/DATA.md
  images/          ← photos/, brand/ (logos), icons/ (SVG)
src/
  main.jsx         entry point
  App.jsx          layout + fade between sections            (shared: lead only)
  routes.js        URL → page component                      (shared: lead only)
  lib/
    data.js        useData('products'), asset('/images/…')
    router.js      useRoute(), href('/prices'), navigate('/prices')
    hooks.js       useTheme, useVisitorCount, useNow, useLocation, useReveal, useScrollLock
    format.js      formatNaira, formatDate, formatTime, distanceKm
  components/      Header, Footer, Ticker, WatchCard, WatchPopup, PageHeader, Icon, Reveal
  pages/           ← YOUR WORK: one .jsx + one .css per page
  styles/
    tokens.css     colours (dark + light), fonts, spacing: always use these variables
    base.css       shared classes: .container .section .grid .btn .tab .badge .input .eyebrow .reveal
docs/              tasks, requirements, data guide, design guide, diagrams, reference documents
```

---

## 4. The building blocks you will use

```jsx
import { useData, asset } from '../lib/data.js';
import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import WatchCard from '../components/WatchCard.jsx';
import { useWatchPopup } from '../components/WatchPopup.jsx';

export default function Example() {
  const catalogue = useData('products');      // public/data/products.json (null while loading)
  const openWatch = useWatchPopup();          // openWatch('rolex-datejust-41') shows the details popup
  if (!catalogue) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', route: '/' }, { label: 'Example' }]} title="Example" intro="…" />
      <section className="section">
        <div className="container grid grid--4">
          {catalogue.products.map((w, i) => (
            <Reveal key={w.id} delay={i * 80}>
              <WatchCard watch={w} />
            </Reveal>
          ))}
        </div>
        <a className="btn" href={href('/contact')}>
          Contact us <Icon name="arrow-right" size={14} />
        </a>
        <img src={asset('/images/photos/gold-watch.jpg')} alt="" />
      </section>
    </>
  );
}
```

- **Colours:** never hard-code them. Use `var(--text-primary)`, `var(--accent-gold)`, `var(--bg-surface)` and the rest, so dark **and** light mode both work.
- **Icons:** `<Icon name="phone" />` uses any file in `public/images/icons/` (it takes the text colour).
- **Links:** use `href('/route')`. URLs look like `#/products/luxury`.

---

## 5. Requirements

The brief and how each point is covered: **[docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)**.
Design (Figma, colours, fonts, screens): **[docs/DESIGN.md](docs/DESIGN.md)**.

## 6. Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails | Check `node -v` is 18 or newer. Delete `node_modules` and run `npm install` again |
| Port 5173 is busy | `npm run dev -- --port 5174` |
| Blank page | Open the browser console. Usually a typo in your page, and the error names the file and line |
| Images or data missing | Paths must start with `/images/…` and go through `asset()`. Data names have no `.json`: `useData('stores')` |
| Git says CRLF/LF | `.gitattributes` handles it. Run `git add --renormalize .` once |
| CI "format:check" failed | Run `npm run format`, commit, push |
