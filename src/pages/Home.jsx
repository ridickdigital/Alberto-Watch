import { useCallback, useEffect, useRef, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import WatchCard from '../components/WatchCard.jsx';
import { useWatchPopup } from '../components/WatchPopup.jsx';
import { lineupName, lineups } from '../lineups.js';
import { slides } from './heroSlides.js';
import './Home.css';

export default function Home() {
  const catalogue = useData('products');
  if (!catalogue) return <div className="loading">Loading…</div>;

  const pick = (ids) => ids.map((id) => catalogue.products.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <Hero />
      <Stats />
      <LineupTiles products={catalogue.products} />
      <FeaturedWatches
        watches={pick([
          'alberto-royale-rose-gold',
          'bulova-classic-1950-reissue',
          'alberto-smart-s2-graphite',
          'rolex-submariner-date',
        ])}
      />
      <ForHer
        watches={pick([
          'rolex-lady-datejust-28',
          'alberto-lady-pearl-32',
          'citizen-silhouette-crystal',
          'michael-kors-darci-rose',
        ])}
      />
      <Workshop />
      <Testimonial />
    </>
  );
}

const SLIDE_MS = 6000;

function Hero() {
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
    if (paused) return;
    const id = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(id);
  }, [paused, index, go]);

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

  return (
    <section
      id="hero"
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
        <span>for</span>
        <span>you</span>
        <span>Watch</span>
      </div>

      <div className="container hero__grid">
        {/* all slides share one grid cell so the height doesn't jump */}
        <div className="hero__stack">
          {slides.map((s, i) => {
            const Title = i === index ? 'h1' : 'p';
            return (
              <div key={s.number} className={`hero__text ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
                <p className="eyebrow">{s.eyebrow}</p>
                <Title className="hero__title">{s.title}</Title>
                <p className="hero__ref">{s.reference}</p>
                <p className="hero__price">{s.price}</p>
                <button type="button" className="btn btn--ghost" onClick={() => openWatch(s.watchId)}>
                  View details <Icon name="arrow-right" size={14} />
                </button>
                <p className="hero__intro-mobile">Luxury watches, repairs and free appraisals in Lagos.</p>
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
            <p>DEFINE YOUR LEGACY. MAKE IT LUXURIOUS ©2026</p>
            <img src={asset('/images/photos/watchmaker-at-work.jpg')} alt="" width="96" height="72" loading="lazy" />
          </div>
          <div className="hero__specs">
            <h2>Specifications</h2>
            <div className="hero__spec-tabs" role="tablist">
              {slide.tabs.map((t, i) => (
                <button
                  key={t.label}
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
                s.tabs.map((t, j) => {
                  const active = i === index && j === specTab;
                  return (
                    <div key={`${s.number}-${t.label}`} className={active ? 'is-active' : ''} aria-hidden={!active}>
                      {t.groups.map((g) => (
                        <div key={g.title} className="hero__spec-group">
                          <h3>{g.title}</h3>
                          {g.rows ? (
                            <dl>
                              {g.rows.map(([label, value]) => (
                                <div key={label}>
                                  <dt>{label}</dt>
                                  <dd>{value}</dd>
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
        </aside>
      </div>

      <div className="container hero__bar">
        <span className="hero__chip hero__chip--left">◆ {slide.chips[0]}</span>
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
              key={s.number}
              type="button"
              className={`hero__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index}
            >
              {s.number}
            </button>
          ))}
          <button type="button" onClick={() => go(index + 1)} aria-label="Next watch" className="hero__arrow">
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
        <span className="hero__chip hero__chip--right">{slide.chips[1]} ◆</span>
      </div>

      {!paused && <span className="hero__progress" key={`p-${index}`} style={{ animationDuration: `${SLIDE_MS}ms` }} />}
    </section>
  );
}

function Stats() {
  return (
    <div className="stats">
      <div className="container stats__inner">
        <div className="stats__item">
          <strong>38 yrs</strong>
          <span>of craft</span>
        </div>
        <div className="stats__item">
          <strong>12,000+</strong>
          <span>watches serviced</span>
        </div>
        <div className="stats__item">
          <strong>4 + 1</strong>
          <span>brands & our own label</span>
        </div>
        <div className="stats__item stats__rating">
          <strong>
            <Icon name="star" size={18} /> 4.9
          </strong>
          <span>1,200+ reviews</span>
        </div>
      </div>
    </div>
  );
}

function LineupTiles({ products }) {
  const tiles = lineups.filter((l) => ['vintage', 'luxury', 'smart-watches', 'clocks'].includes(l.id));
  return (
    <section id="lineups" className="section">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Product line-up</p>
          <h2>Find your kind of time</h2>
          <p>From hand-wound vintage pieces to smart watches. Choose a line-up to see every watch in it.</p>
        </Reveal>
        <div className="grid grid--4">
          {tiles.map((l, i) => {
            const count = products.filter((p) => p.lineups.includes(l.id)).length;
            return (
              <Reveal key={l.id} delay={i * 80}>
                <a className="lineup-tile" href={href(`/products/${l.id}`)}>
                  <img src={asset(l.tile)} alt="" loading="lazy" />
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

function FeaturedWatches({ watches }) {
  return (
    <section id="featured" className="section section--alt">
      <div className="container">
        <Reveal className="section-head section-head--row">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>This season's pieces</h2>
            <p>Hand-picked by our watchmakers. Click any watch to see full details.</p>
          </div>
          <a className="link-arrow" href={href('/products/all')}>
            View all products <Icon name="arrow-right" size={14} />
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

function ForHer({ watches }) {
  return (
    <section id="for-her" className="section for-her">
      <div className="container for-her__grid">
        <Reveal className="for-her__intro">
          <img src={asset('/images/photos/women-on-wrist.jpg')} alt="" loading="lazy" />
          <div className="for-her__text">
            <p className="eyebrow">For her</p>
            <h2>Made for her wrist</h2>
            <p>Dress watches, bracelet watches and ladies' sizes from 28 to 34 mm.</p>
            <a className="btn" href={href('/products/women')}>
              Shop women's watches
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

function Workshop() {
  return (
    <section id="workshop" className="section section--alt">
      <div className="container workshop">
        <Reveal className="workshop__image">
          <img src={asset('/images/photos/watchmaker-at-work.jpg')} alt="Watchmaker at work" loading="lazy" />
        </Reveal>
        <Reveal className="workshop__text" delay={120}>
          <p className="eyebrow">Our workshop</p>
          <h2>Repaired by hand, timed to the second</h2>
          <p className="workshop__sub">
            Certified watchmakers service every movement in-house, from a quartz battery to a full tourbillon overhaul.
          </p>
          <ul>
            <li>
              <Icon name="wrench" size={20} />
              Repair & servicing, from 5 working days
            </li>
            <li>
              <Icon name="gem" size={20} />
              Free appraisal every Saturday
            </li>
            <li>
              <Icon name="shield" size={20} />
              2-year Alberto warranty on every service
            </li>
          </ul>
          <a className="btn" href={href('/support')}>
            Book a repair
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="reviews" className="section">
      <Reveal className="container testimonial">
        <div className="testimonial__stars" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <Icon key={n} name="star" size={18} />
          ))}
        </div>
        <blockquote>
          “They brought my grandfather's 1962 Bulova back to life. It keeps better time now than my phone.”
        </blockquote>
        <p>
          <strong>Chief Adewale O.</strong> · customer since 2004
        </p>
      </Reveal>
    </section>
  );
}
