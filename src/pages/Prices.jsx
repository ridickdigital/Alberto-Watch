import { useMemo, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import { useWatchPopup } from '../components/WatchPopup.jsx';
import { lineupName, lineups } from '../lineups.js';
import './Prices.css';

const movementLabel = {
  quartz: 'Quartz',
  automatic: 'Automatic',
  'eco-drive': 'Eco-Drive',
  smart: 'Smart',
  'hand-wound': 'Hand-wound',
  tourbillon: 'Tourbillon',
  mechanical: 'Mechanical',
};

export default function Prices() {
  const catalogue = useData('products');
  const openWatch = useWatchPopup();
  const [lineup, setLineup] = useState('all');
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const rows = useMemo(() => {
    if (!catalogue) return [];
    const q = query.trim().toLowerCase();
    return catalogue.products
      .filter((p) => lineup === 'all' || p.lineups.includes(lineup))
      .filter((p) => !q || `${p.fullName} ${p.brand}`.toLowerCase().includes(q))
      .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
  }, [catalogue, lineup, query, sortAsc]);

  if (!catalogue) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Price List' }]}
        title="Price list"
        intro="Every watch and clock we stock, in one table. Prices in Nigerian naira, VAT included."
      />

      <section className="section prices">
        <div className="container">
          <div className="prices__bar">
            <div className="tabs" role="tablist">
              {lineups.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={lineup === l.id}
                  className={`tab ${lineup === l.id ? 'is-active' : ''}`}
                  onClick={() => setLineup(l.id)}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <label className="prices__search">
              <Icon name="search" size={16} />
              <span className="sr-only">Search</span>
              <input
                className="input"
                type="search"
                placeholder="Search watches or brands"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          <div className="prices__table-wrap">
            <table className="prices__table">
              <thead>
                <tr>
                  <th>Watch</th>
                  <th>Brand</th>
                  <th>Line-up</th>
                  <th>Size · Movement</th>
                  <th className="prices__num">
                    <button type="button" className="prices__sort" onClick={() => setSortAsc((s) => !s)}>
                      Price {sortAsc ? '↑' : '↓'}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => openWatch(p.id)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openWatch(p.id)}
                  >
                    <td>
                      <span className="prices__watch">
                        <img src={asset(p.image)} alt="" loading="lazy" />
                        <span>
                          {p.name}
                          <small>Ref. {p.reference}</small>
                        </span>
                      </span>
                    </td>
                    <td data-label="Brand">{p.brand}</td>
                    <td data-label="Line-up">{lineupName(p.primaryLineup)}</td>
                    <td data-label="Size · Movement">
                      {p.specs.case?.split('·')[0].trim()} · {movementLabel[p.movementType] ?? p.movementType}
                    </td>
                    <td data-label="Price" className="prices__num prices__price">
                      {p.priceDisplay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="prices__empty">No watches match “{query}”.</p>}
          </div>

          <p className="prices__foot">
            {rows.length} of {catalogue.products.length} pieces · {catalogue.currency.note} Prices may change, so please
            confirm in store. Trade-in and instalment plans available.
          </p>
        </div>
      </section>
    </>
  );
}
