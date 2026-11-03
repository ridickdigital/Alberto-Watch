import { asset } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './Technology.css';

const movements = [
  {
    icon: 'zap',
    title: 'Quartz',
    text: 'A battery makes a quartz crystal vibrate 32,768 times a second. Accurate to ±15 seconds a month.',
    foundIn: 'Bulova Lunar Pilot · Michael Kors',
  },
  {
    icon: 'rotate',
    title: 'Automatic',
    text: 'A weighted rotor winds the mainspring as your wrist moves. No battery needed.',
    foundIn: 'Rolex Datejust · Alberto Noir',
  },
  {
    icon: 'sun',
    title: 'Eco-Drive',
    text: "Citizen's light-powered movement charges from any light and runs 6+ months in the dark.",
    foundIn: 'Citizen Eco-Drive Classic',
  },
  {
    icon: 'watch',
    title: 'Smart',
    text: 'Heart rate, GPS, notifications and contactless payment, synced with your phone.',
    foundIn: 'Alberto Smart S2',
  },
];

const materials = [
  {
    title: '18k gold',
    text: 'Warm, heavy and hypoallergenic, polished by hand.',
    image: '/images/photos/gold-watch.jpg',
  },
  {
    title: '904L steel',
    text: 'Highly corrosion-resistant steel used on dive watches.',
    image: '/images/photos/steel-diver-watch.jpg',
  },
  {
    title: 'Leather & sapphire',
    text: 'Calfskin straps and scratch-proof sapphire crystal.',
    image: '/images/photos/leather-strap-detail.jpg',
  },
];

export default function Technology() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Technology' }]}
        title="Technology"
        intro="What makes each watch tick: the movements and materials behind every line-up we sell."
      />

      <section className="section">
        <div className="container tech-feature">
          <Reveal className="tech-feature__image">
            <img
              src={asset('/images/photos/watch-movement.jpg')}
              alt="Inside a mechanical watch movement"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="tech-feature__text" delay={120}>
            <p className="eyebrow">Inside the movement</p>
            <h2>Up to 300 parts in 3 cm</h2>
            <p>
              A mechanical calibre is a tiny machine of springs, gears and jewels. Our watchmakers open, clean, oil and
              time each one.
            </p>
            <dl className="tech-feature__facts">
              <div>
                <dt>Jewels</dt>
                <dd>Synthetic rubies reduce friction at every pivot</dd>
              </div>
              <div>
                <dt>Balance wheel</dt>
                <dd>Beats 28,800 times an hour for steady timekeeping</dd>
              </div>
              <div>
                <dt>Power reserve</dt>
                <dd>40–70 hours on a full wind</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Movement types</p>
            <h2>Four ways to keep time</h2>
            <p>Every watch in our store uses one of these. Look for the label on each product card.</p>
          </Reveal>
          <div className="grid grid--4">
            {movements.map((m, i) => (
              <Reveal key={m.title} delay={i * 100} className="movement-card">
                <span className="movement-card__icon">
                  <Icon name={m.icon} size={22} />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <p className="movement-card__found">
                  <span>Found in</span>
                  {m.foundIn}
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
              <Reveal key={m.title} delay={i * 100} className="material-card">
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
