import { asset } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './About.css';

const timeline = [
  {
    year: 1987,
    title: 'The first bench',
    text: 'Alberto Okon opens a small repair shop on Marina Road, Lagos Island.',
  },
  {
    year: 2005,
    title: 'Official retailer',
    text: 'We become an authorised dealer for Citizen, Bulova and Michael Kors.',
  },
  { year: 2018, title: 'Lekki & Ikeja', text: 'Two new stores and a dedicated servicing workshop open.' },
  { year: 2026, title: 'Online', text: 'Our full catalogue, price list and store locator go online.' },
];

export default function About() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'About Us' }]}
        title="Three generations of keeping time"
      />

      <section id="story" className="section">
        <div className="container about-story">
          <Reveal className="about-story__image">
            <img src={asset('/images/photos/boutique-interior.jpg')} alt="Inside the Alberto boutique" loading="lazy" />
          </Reveal>
          <Reveal className="about-story__text" delay={120}>
            <p className="eyebrow">Since 1987</p>
            <p className="about-story__lead">
              Alberto Clocks opened in 1987 as a two-bench repair shop on Marina Road. Today we are a full-service watch
              repair, appraisal and retail house, still family-run, still repairing every watch by hand.
            </p>
            <blockquote>
              “A watch should outlive its first owner.”<cite>Alberto Okon, founder</cite>
            </blockquote>
            <p className="about-story__brands">
              Brands we carry: <strong>Rolex · Citizen Eco-Drive · Bulova · Michael Kors · Seiko · Alberto</strong>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="timeline" className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Our story</p>
            <h2>From one bench to ten stores</h2>
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

      <section id="get-in-touch" className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Get in touch</p>
            <h2>Visit, call or email us</h2>
          </Reveal>
          <div className="grid grid--3">
            <Reveal>
              <a className="info-card" href="mailto:hello@albertoclocks.com">
                <span className="info-card__icon">
                  <Icon name="mail" size={22} />
                </span>
                <span className="info-card__label">Email</span>
                <span className="info-card__value">hello@albertoclocks.com</span>
              </a>
            </Reveal>
            <Reveal delay={100}>
              <div className="info-card">
                <span className="info-card__icon">
                  <Icon name="map-pin" size={22} />
                </span>
                <span className="info-card__label">Address</span>
                <span className="info-card__value">12 Marina Road, Lagos Island</span>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <a className="info-card" href="tel:+2348012345678">
                <span className="info-card__icon">
                  <Icon name="phone" size={22} />
                </span>
                <span className="info-card__label">Phone</span>
                <span className="info-card__value">+234 801 234 5678</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
