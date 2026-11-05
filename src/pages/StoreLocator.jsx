import { useEffect, useMemo, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { distanceKm } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import './StoreLocator.css';

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function isOpenNow(store, now = new Date()) {
  const today = store.hours?.[DAYS[now.getDay()]];
  if (!today) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  return minutes >= toMin(today.open) && minutes < toMin(today.close);
}

export default function StoreLocator({ param }) {
  const data = useData('stores');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [me, setMe] = useState(null);
  const [locating, setLocating] = useState('');

  // #/store-locator/abuja selects that store
  useEffect(() => {
    if (param) setSelectedId(param);
  }, [param]);

  const stores = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    let list = data.stores.filter((s) => !q || `${s.name} ${s.address} ${s.city}`.toLowerCase().includes(q));
    if (me) {
      list = list.map((s) => ({ ...s, km: distanceKm(me, s) })).sort((a, b) => a.km - b.km);
    }
    return list;
  }, [data, query, me]);

  if (!data) return <div className="loading">Loading…</div>;
  const selected = stores.find((s) => s.id === selectedId) ?? stores[0] ?? data.stores[0];

  const locateMe = () => {
    if (!('geolocation' in navigator)) {
      setLocating('Location is not supported by this browser.');
      return;
    }
    setLocating('Finding you…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMe({ lat: coords.latitude, lng: coords.longitude });
        setLocating('Sorted by distance from you.');
        setSelectedId(null);
      },
      () => setLocating('Location permission was refused.'),
      { timeout: 10000 }
    );
  };

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Store Locator' }]}
        title="Store locator"
        intro="Visit us for repairs, appraisals or to try a watch on. Ten stores across Nigeria, from Lagos and Abuja to Port Harcourt and Kano."
      />

      <section className="section stores">
        <div className="container stores__grid">
          <div className="stores__list">
            <div className="stores__tools">
              <label className="stores__search">
                <Icon name="search" size={16} />
                <span className="sr-only">Search stores</span>
                <input
                  className="input"
                  type="search"
                  placeholder="Search by city or area"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <button type="button" className="btn btn--ghost" onClick={locateMe}>
                <Icon name="map-pin" size={16} /> Use my location
              </button>
            </div>
            {locating && <p className="stores__status">{locating}</p>}

            {stores.map((s) => {
              const open = isOpenNow(s);
              return (
                <button
                  key={s.id}
                  id={s.id}
                  type="button"
                  className={`store-card ${s.image ? '' : 'store-card--no-photo'} ${selected?.id === s.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(s.id)}
                >
                  {s.image && <img src={asset(s.image)} alt="" loading="lazy" />}
                  <span className="store-card__body">
                    <span className="store-card__top">
                      <strong>{s.name}</strong>
                      <span className={`store-card__status ${open ? 'is-open' : ''}`}>
                        {open ? 'Open now' : 'Closed'}
                      </span>
                    </span>
                    <span className="store-card__line">
                      <Icon name="map-pin" size={14} /> {s.address}
                    </span>
                    <span className="store-card__line">
                      <Icon name="phone" size={14} /> {s.phone}
                    </span>
                    <span className="store-card__line">
                      <Icon name="clock" size={14} /> {s.hoursLabel}
                    </span>
                    <span className="store-card__services">
                      {s.services.join(' · ')}
                      {s.km != null && <em>{s.km.toFixed(1)} km away</em>}
                    </span>
                  </span>
                </button>
              );
            })}
            {stores.length === 0 && <p className="stores__status">No store matches “{query}”.</p>}
          </div>

          <div className="stores__map">
            {selected && (
              <>
                <iframe
                  key={selected.id}
                  title={`Map of ${selected.name}`}
                  src={`https://maps.google.com/maps?q=${selected.lat},${selected.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a className="link-arrow stores__directions" href={selected.mapsUrl} target="_blank" rel="noreferrer">
                  Get directions to {selected.name} <Icon name="arrow-right" size={14} />
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
