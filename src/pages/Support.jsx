import { useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Support.css';

// #/support — services, FAQ accordion (one open at a time) and a booking banner
export default function Support() {
  const page = useData('pages');
  const support = useData('support');
  const [openFaq, setOpenFaq] = useState(null);
  if (!page || !support) return <div className="loading">Loading…</div>;

  const defaultOpen = support.faqs.findIndex((f) => f.openByDefault);
  const openIndex = openFaq ?? defaultOpen;
  const { faqSection, ctaBanner } = support;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Support' }]}
        title={page.support.title}
        intro={page.support.intro}
      />

      <section className="section">
        <div className="container grid grid--3">
          {support.services.map((s, i) => (
            <Reveal key={s.id} delay={i * 100} className="service-card">
              <img src={asset(s.image)} alt="" loading="lazy" />
              <div className="service-card__body">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <span className="service-card__price">{s.priceLabel}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container faq">
          <Reveal className="section-head section-head--left faq__head">
            <p className="eyebrow">{faqSection.eyebrow}</p>
            <h2>{faqSection.title}</h2>
            <p>{faqSection.subtitle}</p>
            <a className="btn btn--ghost" href={href(faqSection.cta.route)}>
              {faqSection.cta.label}
            </a>
          </Reveal>

          <div className="faq__list">
            {support.faqs.map((f, i) => {
              const open = i === openIndex;
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

      <section className="section">
        <Reveal className="container">
          <div className="cta-banner">
            <Icon name="wrench" size={32} />
            <div>
              <h2>{ctaBanner.title}</h2>
              <p>{ctaBanner.text}</p>
            </div>
            <a className="btn" href={href(ctaBanner.cta.route)}>
              {ctaBanner.cta.label}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
