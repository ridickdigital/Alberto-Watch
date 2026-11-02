import { useMemo, useState } from 'react';
import { useData } from '../lib/data.js';
import { href, navigate } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import WatchCard from '../components/WatchCard.jsx';
import Reveal from '../components/Reveal.jsx';
import './Products.css';

const sorters = {
  'price-desc': (a, b) => b.price - a.price,
  'price-asc': (a, b) => a.price - b.price,
  newest: (a, b) => Number(b.isNew) - Number(a.isNew) || b.price - a.price,
};

// #/products/:lineup  — every watch in the chosen line-up; click a card for the popup
export default function Products({ param }) {
  const page = useData('pages');
  const catalogue = useData('products');
  const lineupData = useData('lineups');
  const [sort, setSort] = useState('price-desc');

  const lineups = lineupData?.lineups ?? [];
  const current = lineups.find((l) => l.id === param) ?? lineups.find((l) => l.id === lineupData?.defaultLineup);

  const watches = useMemo(() => {
    if (!catalogue || !current) return [];
    const list =
      current.id === 'all' ? catalogue.products : catalogue.products.filter((p) => p.lineups.includes(current.id));
    return [...list].sort(sorters[sort]);
  }, [catalogue, current, sort]);

  if (!page || !catalogue || !current) return <div className="loading">Loading…</div>;
  const info = page.products;
  const nameOf = (id) => lineups.find((l) => l.id === id)?.name ?? id;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Products', route: '/products/all' }, { label: current.name }]}
        title={current.heading}
        intro={current.description || info.intro}
      />

      <section className="section products">
        <div className="container">
          <div className="products__bar">
            <div className="tabs" role="tablist" aria-label="Product line-ups">
              {lineups.map((l) => (
                <a
                  key={l.id}
                  role="tab"
                  aria-selected={l.id === current.id}
                  href={href(l.route)}
                  className={`tab ${l.id === current.id ? 'is-active' : ''}`}
                >
                  {l.name}
                </a>
              ))}
            </div>
            <label className="products__sort">
              <span>Sort by</span>
              <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
                {catalogue.sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="products__count">
            {info.resultsLabel
              .replace('{count}', watches.length)
              .replace('{lineup}', current.id === 'all' ? '' : current.name)
              .replace(/\s+/g, ' ')}
          </p>

          {watches.length ? (
            <div className="grid grid--4" key={current.id}>
              {watches.map((w, i) => (
                <Reveal key={w.id} delay={(i % 4) * 70}>
                  <WatchCard watch={w} lineupName={nameOf(current.id === 'all' ? w.primaryLineup : current.id)} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="products__empty">
              <p>No watches in this line-up yet.</p>
              <button type="button" className="btn btn--ghost" onClick={() => navigate('/products/all')}>
                See all watches
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
