import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { asset } from '../lib/data.js';
import { useScrollLock } from '../lib/hooks.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Gallery.css';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'watches', label: 'Watches' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'boutique', label: 'Boutique' },
  { id: 'clocks', label: 'Clocks' },
];

// height = tile height at 400px wide
const photos = [
  { src: '/images/photos/gold-watch.jpg', caption: 'Datejust 41, yellow gold', category: 'watches', height: 520 },
  {
    src: '/images/photos/watchmaker-at-work.jpg',
    caption: 'Our workshop, Lagos Island',
    category: 'workshop',
    height: 320,
  },
  { src: '/images/photos/pocket-watch.jpg', caption: 'Heritage pocket chronometer', category: 'watches', height: 360 },
  { src: '/images/photos/boutique-interior.jpg', caption: 'The boutique', category: 'boutique', height: 340 },
  { src: '/images/photos/rose-gold-watch.jpg', caption: 'Royale, rose gold', category: 'watches', height: 420 },
  { src: '/images/photos/wall-clock.jpg', caption: 'Station wall clock', category: 'clocks', height: 440 },
  { src: '/images/photos/watch-on-wrist.jpg', caption: 'Worn every day', category: 'watches', height: 420 },
  { src: '/images/photos/watch-movement.jpg', caption: 'Hand-finished movement', category: 'workshop', height: 300 },
  { src: '/images/photos/table-clock.jpg', caption: 'Bracket mantel clock', category: 'clocks', height: 480 },
];

export default function Gallery() {
  const [category, setCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(() => photos.filter((p) => category === 'all' || p.category === category), [category]);

  useScrollLock(openIndex !== null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, items.length]);

  const current = openIndex !== null ? items[openIndex] : null;
  const step = (d) => setOpenIndex((i) => (i + d + items.length) % items.length);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Gallery' }]}
        title="Gallery"
        intro="Inside our boutique and workshop, and a closer look at the pieces we love."
      />

      <section className="section gallery">
        <div className="container">
          <div className="tabs gallery__tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`tab ${category === c.id ? 'is-active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="gallery__grid" key={category}>
            {items.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 80} className="gallery__item">
                <button type="button" onClick={() => setOpenIndex(i)} aria-label={`Open ${g.caption}`}>
                  <img src={asset(g.src)} alt={g.caption} loading="lazy" style={{ aspectRatio: `400 / ${g.height}` }} />
                  <span className="gallery__caption">
                    <Icon name="image" size={14} /> {g.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* portal to <body>, otherwise the page transform clips it */}
      {current &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption}>
            <div className="lightbox__scrim" onClick={() => setOpenIndex(null)} />
            <figure className="lightbox__figure" key={current.src}>
              <img src={asset(current.src)} alt={current.caption} />
              <figcaption>
                {current.caption}
                <span>
                  {openIndex + 1} / {items.length}
                </span>
              </figcaption>
            </figure>
            <button
              type="button"
              className="lightbox__btn lightbox__close"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
            >
              <Icon name="close" />
            </button>
            <button
              type="button"
              className="lightbox__btn lightbox__prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <Icon name="arrow-right" />
            </button>
            <button
              type="button"
              className="lightbox__btn lightbox__next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <Icon name="arrow-right" />
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
