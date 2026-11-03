import { useMemo, useState } from 'react';
import { useData } from '../lib/data.js';
import { href, navigate } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import WatchCard from '../components/WatchCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { lineupName, lineups } from '../lineups.js';
import './Products.css';

const sorters = {
  'price-desc': (a, b) => b.price - a.price,
  'price-asc': (a, b) => a.price - b.price,
  newest: (a, b) => Number(b.isNew) - Number(a.isNew) || b.price - a.price,
};

export default function Products({ param }) {
  const catalogue = useData('products');
  const [sort, setSort] = useState('price-desc');

  const current = lineups.find((l) => l.id === param) ?? lineups.find((l) => l.id === 'luxury');

  const watches = useMemo(() => {
    if (!catalogue) return [];
    const list =
      current.id === 'all' ? catalogue.products : catalogue.products.filter((p) => p.lineups.includes(current.id));
    return [...list].sort(sorters[sort]);
  }, [catalogue, current, sort]);

  if (!catalogue) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Products', route: '/products/all' }, { label: current.name }]}
        title={current.heading}
        intro={current.description}
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
                  href={href(`/products/${l.id}`)}
                  className={`tab ${l.id === current.id ? 'is-active' : ''}`}
                >
                  {l.name}
                </a>
              ))}
            </div>
            <label className="products__sort">
              <span>Sort by</span>
              <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="price-desc">Price, high → low</option>
                <option value="price-asc">Price, low → high</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>

          <p className="products__count">
            {watches.length} {current.id !== 'all' && current.name} watches
          </p>

          {watches.length ? (
            <div className="grid grid--4" key={current.id}>
              {watches.map((w, i) => (
                <Reveal key={w.id} delay={(i % 4) * 70}>
                  <WatchCard watch={w} lineupName={lineupName(current.id === 'all' ? w.primaryLineup : current.id)} />
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
