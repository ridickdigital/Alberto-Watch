import { useState } from 'react';
import { asset } from '../lib/data.js';
import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Support.css';

const services = [
  {
    id: 'repair',
    title: 'Repair & servicing',
    text: 'Full movement service, cleaning, oiling and timing.',
    price: 'From ₦186,000 · 5–10 days',
    image: '/images/photos/watchmaker-at-work.jpg',
  },
  {
    id: 'battery-strap',
    title: 'Battery & strap',
    text: 'Battery swap, strap and bracelet sizing while you wait.',
    price: 'From ₦23,000 · 20 minutes',
    image: '/images/photos/leather-strap-detail.jpg',
  },
  {
    id: 'warranty',
    title: 'Warranty claims',
    text: 'We handle Rolex, Citizen, Bulova and Michael Kors warranties.',
    price: 'Free · with receipt',
    image: '/images/photos/watch-movement.jpg',
  },
];

const faqs = [
  {
    q: 'How long does a full service take?',
    a: "Most mechanical watches take 5–10 working days. We'll text you when it's ready.",
  },
  { q: "Do you service brands you don't sell?", a: 'Yes, we service almost every Swiss, Japanese and fashion brand.' },
  {
    q: 'Is the appraisal really free?',
    a: 'Yes, every Saturday. You get a written valuation you can use for insurance.',
  },
  { q: 'Can I pay in instalments?', a: 'Yes, on watches over ₦775,000, in 3 or 6 monthly payments.' },
  {
    q: 'How do I know a watch is authentic?',
    a: 'Every pre-owned watch is checked by our watchmakers and comes with a certificate.',
  },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Support' }]}
        title="Support"
        intro="Repairs, servicing, warranty and answers to common questions."
      />

      <section id="services" className="section">
        <div className="container grid grid--3">
          {services.map((s, i) => (
            <Reveal key={s.title} id={s.id} delay={i * 100} className="service-card">
              <img src={asset(s.image)} alt="" loading="lazy" />
              <div className="service-card__body">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <span className="service-card__price">{s.price}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="section section--alt">
        <div className="container faq">
          <Reveal className="section-head section-head--left faq__head">
            <p className="eyebrow">FAQ</p>
            <h2>Common questions</h2>
            <p>Can't find your answer? Call +234 801 234 5678 or use the contact form.</p>
            <a className="btn btn--ghost" href={href('/contact')}>
              Contact us
            </a>
          </Reveal>

          <div className="faq__list">
            {faqs.map((f, i) => {
              const open = i === openFaq;
              return (
                <div key={f.q} className={`faq__item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    {f.q}
                    <span className="faq__sign" aria-hidden="true" />
                  </button>
                  <div className="faq__a" role="region">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="book-a-repair" className="section">
        <Reveal className="container">
          <div className="cta-banner">
            <Icon name="wrench" size={32} />
            <div>
              <h2>Book a repair in 2 minutes</h2>
              <p>Pick a time, drop off your watch, and track progress by SMS.</p>
            </div>
            <a className="btn" href={href('/contact')}>
              Book a repair
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
