import { asset, useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Technology.css';

// #/technology — movements and materials used in the watches
export default function Technology() {
  const page = useData('pages');
  const tech = useData('technology');
  if (!page || !tech) return <div className="loading">Loading…</div>;
  const { feature, typesSection, movementTypes, materials } = tech;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Technology' }]}
        title={page.technology.title}
        intro={page.technology.intro}
      />

      <section className="section">
        <div className="container tech-feature">
          <Reveal className="tech-feature__image">
            <img src={asset(feature.image)} alt="Inside a mechanical watch movement" loading="lazy" />
          </Reveal>
          <Reveal className="tech-feature__text" delay={120}>
            <p className="eyebrow">{feature.eyebrow}</p>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
            <dl className="tech-feature__facts">
              {feature.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">{typesSection.eyebrow}</p>
            <h2>{typesSection.title}</h2>
            <p>{typesSection.subtitle}</p>
          </Reveal>
          <div className="grid grid--4">
            {movementTypes.map((m, i) => (
              <Reveal key={m.id} delay={i * 100} className="movement-card">
                <span className="movement-card__icon">
                  <Icon name={m.icon} size={22} />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <p className="movement-card__found">
                  <span>Found in</span>
                  {m.foundInLabel}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Materials</p>
            <h2>What our watches are made of</h2>
          </Reveal>
          <div className="grid grid--3">
            {materials.map((m, i) => (
              <Reveal key={m.id} delay={i * 100} className="material-card">
                <img src={asset(m.image)} alt="" loading="lazy" />
                <div className="material-card__body">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
