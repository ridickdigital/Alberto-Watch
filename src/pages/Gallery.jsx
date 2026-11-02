import { useEffect, useMemo, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { useScrollLock } from '../lib/hooks.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Gallery.css';

// #/gallery — photo grid with category filter and a full-screen lightbox
export default function Gallery() {
  const page = useData('pages');
  const gallery = useData('gallery');
  const [category, setCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(
    () => (gallery ? gallery.items.filter((g) => category === 'all' || g.category === category) : []),
    [gallery, category]
  );

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

  if (!page || !gallery) return <div className="loading">Loading…</div>;
  const current = openIndex !== null ? items[openIndex] : null;
  const step = (d) => setOpenIndex((i) => (i + d + items.length) % items.length);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Gallery' }]}
        title={page.gallery.title}
        intro={page.gallery.intro}
      />

      <section className="section gallery">
        <div className="container">
          <div className="tabs gallery__tabs">
            {gallery.categories.map((c) => (
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
              <Reveal key={g.id} delay={(i % 3) * 80} className="gallery__item">
                <button type="button" onClick={() => setOpenIndex(i)} aria-label={`Open ${g.caption}`}>
                  <img
                    src={asset(g.src)}
                    alt={g.caption}
                    loading="lazy"
                    style={{ aspectRatio: `400 / ${g.designHeight || 400}` }}
                  />
                  <span className="gallery__caption">
                    <Icon name="image" size={14} /> {g.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption}>
          <div className="lightbox__scrim" onClick={() => setOpenIndex(null)} />
          <figure className="lightbox__figure" key={current.id}>
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
        </div>
      )}
    </>
  );
}
