import { useCallback, useEffect, useRef, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import WatchCard from '../components/WatchCard.jsx';
import { useWatchPopup } from '../components/WatchPopup.jsx';
import './Home.css';

export default function Home() {
  const home = useData('home');
  const catalogue = useData('products');
  const lineupData = useData('lineups');
  if (!home || !catalogue || !lineupData) return <div className="loading">Loading…</div>;

  const products = catalogue.products;
  const byId = (id) => products.find((p) => p.id === id);
  const lineupName = (id) => lineupData.lineups.find((l) => l.id === id)?.name ?? id;

  return (
    <>
      <Hero hero={home.hero} />
      <Stats hero={home.hero} />
      <LineupTiles section={home.lineupSection} lineups={lineupData.lineups} products={products} />
      <FeaturedWatches
        section={home.featuredSection}
        watches={home.featuredSection.productIds.map(byId).filter(Boolean)}
        lineupName={lineupName}
      />
      <ForHer
        section={home.forHer}
        watches={home.forHer.productIds.map(byId).filter(Boolean)}
        lineupName={lineupName}
      />
      <Workshop section={home.workshop} />
      <Testimonial t={home.testimonial} />
    </>
  );
}

/* ---------------- hero carousel ---------------- */

function Hero({ hero }) {
  const { slides, intervalMs, autoplay } = hero.carousel;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [specTab, setSpecTab] = useState(0);
  const touchX = useRef(null);
  const openWatch = useWatchPopup();
  const slide = slides[index];

  const go = useCallback(
    (i) => {
      setIndex((i + slides.length) % slides.length);
      setSpecTab(0);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => go(index + 1), intervalMs);
    return () => clearTimeout(id);
  }, [autoplay, paused, index, intervalMs, go]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const tabs = slide.specifications?.tabs ?? [];
  const chipLeft = slide.chips?.find((c) => c.position === 'left');
  const chipRight = slide.chips?.find((c) => c.position === 'right');

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured watches"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero__words" aria-hidden="true">
        {hero.backgroundWords.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="container hero__grid">
        {/* every slide sits in the same cell, so the hero keeps the height of the tallest one */}
        <div className="hero__stack">
          {slides.map((s, i) => {
            const Title = i === index ? 'h1' : 'p';
            return (
              <div key={s.slide} className={`hero__text ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
                <p className="eyebrow">{s.eyebrow}</p>
                <Title className="hero__title">{s.title}</Title>
                <p className="hero__ref">{s.reference}</p>
                <p className="hero__price">{s.priceDisplay}</p>
                <button type="button" className="btn btn--ghost" onClick={() => openWatch(s.cta.productId)}>
                  {s.cta.label} <Icon name="arrow-right" size={14} />
                </button>
                <p className="hero__intro-mobile">{hero.mobileIntro}</p>
              </div>
            );
          })}
        </div>

        <div className="hero__watch">
          <span className="hero__glow" />
          <img key={`w-${index}`} src={asset(slide.image)} alt={slide.title} width="900" height="600" />
        </div>

        <aside className="hero__side">
          <div className="hero__tagline">
            <p>{hero.tagline}</p>
            <img src={asset(hero.taglineImage)} alt="" width="96" height="72" loading="lazy" />
          </div>
          {tabs.length > 0 && (
            <div className="hero__specs">
              <h2>Specifications</h2>
              <div className="hero__spec-tabs" role="tablist">
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === specTab}
                    className={i === specTab ? 'is-active' : ''}
                    onClick={() => setSpecTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="hero__stack">
                {slides.flatMap((s, i) =>
                  (s.specifications?.tabs ?? []).map((t, j) => {
                    const active = i === index && j === specTab;
                    return (
                      <div key={`${s.slide}-${t.id}`} className={active ? 'is-active' : ''} aria-hidden={!active}>
                        {t.groups.map((g) => (
                          <div key={g.title} className="hero__spec-group">
                            <h3>{g.title}</h3>
                            {g.items ? (
                              <dl>
                                {g.items.map((it) => (
                                  <div key={it.label}>
                                    <dt>{it.label}</dt>
                                    <dd>{it.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            ) : (
                              <p>{g.text}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="container hero__bar">
        {chipLeft && <span className="hero__chip hero__chip--left">◆ {chipLeft.label}</span>}
        <div className="hero__slider">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous watch"
            className="hero__arrow hero__arrow--prev"
          >
            <Icon name="arrow-right" size={14} />
          </button>
          {slides.map((s, i) => (
            <button
              key={s.slide}
              type="button"
              className={`hero__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index}
            >
              {s.slide}
            </button>
          ))}
          <button type="button" onClick={() => go(index + 1)} aria-label="Next watch" className="hero__arrow">
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
        {chipRight && <span className="hero__chip hero__chip--right">{chipRight.label} ◆</span>}
      </div>

      {autoplay && !paused && (
        <span className="hero__progress" key={`p-${index}`} style={{ animationDuration: `${intervalMs}ms` }} />
      )}
    </section>
  );
}

function Stats({ hero }) {
  return (
    <div className="stats">
      <div className="container stats__inner">
        {hero.stats.map((s) => (
          <div key={s.label} className="stats__item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
        <div className="stats__item stats__rating">
          <strong>
            <Icon name="star" size={18} /> {hero.ratingChip.rating}
          </strong>
          <span>{hero.ratingChip.text.split('·')[1]?.trim()}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- line-ups ---------------- */

function LineupTiles({ section, lineups, products }) {
  const tiles = section.lineupIds.map((id) => lineups.find((l) => l.id === id)).filter(Boolean);
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
        </Reveal>
        <div className="grid grid--4">
          {tiles.map((l, i) => {
            const count = products.filter((p) => p.lineups.includes(l.id)).length;
            return (
              <Reveal key={l.id} delay={i * 80}>
                <a className="lineup-tile" href={href(l.route)}>
                  <img src={asset(l.tileImage)} alt="" loading="lazy" />
                  <span className="lineup-tile__shade" />
                  <span className="lineup-tile__body">
                    <span className="lineup-tile__name">{l.name}</span>
                    <span className="lineup-tile__more">
                      {count} pieces <Icon name="arrow-right" size={14} />
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedWatches({ section, watches, lineupName }) {
  return (
    <section className="section section--alt">
      <div className="container">
        <Reveal className="section-head section-head--row">
          <div>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p>{section.subtitle}</p>
          </div>
          <a className="link-arrow" href={href(section.cta.route)}>
            {section.cta.label} <Icon name="arrow-right" size={14} />
          </a>
        </Reveal>
        <div className="grid grid--4">
          {watches.map((w, i) => (
            <Reveal key={w.id} delay={i * 80}>
              <WatchCard watch={w} lineupName={lineupName(w.primaryLineup)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForHer({ section, watches, lineupName }) {
  return (
    <section className="section for-her">
      <div className="container for-her__grid">
        <Reveal className="for-her__intro">
          <img src={asset(section.image)} alt="" loading="lazy" />
          <div className="for-her__text">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p>{section.subtitle}</p>
            <a className="btn" href={href(section.cta.route)}>
              {section.cta.label}
            </a>
          </div>
        </Reveal>
        <div className="grid grid--2 for-her__cards">
          {watches.map((w, i) => (
            <Reveal key={w.id} delay={i * 80}>
              <WatchCard watch={w} lineupName={lineupName(w.primaryLineup)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workshop({ section }) {
  return (
    <section className="section section--alt">
      <div className="container workshop">
        <Reveal className="workshop__image">
          <img src={asset(section.image)} alt="Watchmaker at work" loading="lazy" />
        </Reveal>
        <Reveal className="workshop__text" delay={120}>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p className="workshop__sub">{section.subtitle}</p>
          <ul>
            {section.points.map((pt) => (
              <li key={pt.text}>
                <Icon name={pt.icon} size={20} />
                {pt.text}
              </li>
            ))}
          </ul>
          <a className="btn" href={href(section.cta.route)}>
            {section.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonial({ t }) {
  return (
    <section className="section">
      <Reveal className="container testimonial">
        <div className="testimonial__stars" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }, (_, i) => (
            <Icon key={i} name="star" size={18} />
          ))}
        </div>
        <blockquote>“{t.quote}”</blockquote>
        <p>
          <strong>{t.author}</strong> · {t.detail}
        </p>
      </Reveal>
    </section>
  );
}
