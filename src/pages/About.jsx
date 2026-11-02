import { asset, useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './About.css';

// #/about — story, timeline and the email / address / phone cards
export default function About() {
  const page = useData('pages');
  const about = useData('about');
  const site = useData('site');
  if (!page || !about || !site) return <div className="loading">Loading…</div>;
  const { hero, timelineSection, timeline, contactSection } = about;

  const linkFor = (card) => {
    const label = card.label.toLowerCase();
    if (label.includes('mail')) return `mailto:${site.contact.email}`;
    if (label.includes('phone') || label.includes('call')) return site.contact.phoneHref;
    return null;
  };

  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', route: '/' }, { label: 'About Us' }]} title={hero.title} />

      <section className="section">
        <div className="container about-story">
          <Reveal className="about-story__image">
            <img src={asset(hero.image)} alt="Inside the Alberto boutique" loading="lazy" />
          </Reveal>
          <Reveal className="about-story__text" delay={120}>
            <p className="eyebrow">Since {site.brand.founded}</p>
            <p className="about-story__lead">{hero.story}</p>
            <blockquote>
              “{hero.quote}”<cite>— {hero.quoteAuthor}</cite>
            </blockquote>
            <p className="about-story__brands">
              Brands we carry: <strong>{site.brand.brandsCarried.join(' · ')}</strong>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">{timelineSection.eyebrow}</p>
            <h2>{timelineSection.title}</h2>
          </Reveal>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 120} className="timeline__item">
                <span className="timeline__year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">{contactSection.eyebrow}</p>
            <h2>{contactSection.title}</h2>
          </Reveal>
          <div className="grid grid--3">
            {contactSection.cards.map((c, i) => {
              const link = linkFor(c);
              const Tag = link ? 'a' : 'div';
              return (
                <Reveal key={c.label} delay={i * 100}>
                  <Tag className="info-card" {...(link ? { href: link } : {})}>
                    <span className="info-card__icon">
                      <Icon name={c.icon} size={22} />
                    </span>
                    <span className="info-card__label">{c.label}</span>
                    <span className="info-card__value">{c.value}</span>
                  </Tag>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
