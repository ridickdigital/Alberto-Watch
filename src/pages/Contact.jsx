import { useState } from 'react';
import { asset } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './About.css';
import './Contact.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ]{7,15}$/;

function validate(values) {
  const errors = {};
  const name = (values.fullName ?? '').trim();
  const email = (values.email ?? '').trim();
  const phone = (values.phone ?? '').trim();
  const message = (values.message ?? '').trim();

  if (name.length < 2) errors.fullName = 'Please enter your name.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.';
  if (phone && !PHONE.test(phone)) errors.phone = 'Use digits only, e.g. +234 801 234 5678.';
  if (message.length < 10) errors.message = 'Your message needs at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    // no backend yet, so just show the thank-you message
    setSent(true);
    setValues({});
    setTimeout(() => setSent(false), 5000);
  };

  const field = (name) => ({
    id: `field-${name}`,
    name,
    className: `input ${errors[name] ? 'has-error' : ''}`,
    value: values[name] ?? '',
    onChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `field-${name}-err` : undefined,
  });

  const error = (name) =>
    errors[name] && (
      <span id={`field-${name}-err`} className="contact__error">
        {errors[name]}
      </span>
    );

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Contact Us' }]}
        title="Contact us"
        intro="Questions about a watch, a repair or an appraisal? Send us a message and we reply within one working day."
      />

      <section id="contact-details" className="section">
        <div className="container">
          <div className="grid grid--4 contact__cards">
            <Reveal>
              <a className="info-card" href="mailto:hello@albertoclocks.com">
                <span className="info-card__icon">
                  <Icon name="mail" size={22} />
                </span>
                <span className="info-card__label">Email</span>
                <span className="info-card__value">hello@albertoclocks.com</span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a className="info-card" href="tel:+2348012345678">
                <span className="info-card__icon">
                  <Icon name="phone" size={22} />
                </span>
                <span className="info-card__label">Phone</span>
                <span className="info-card__value">+234 801 234 5678</span>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <div className="info-card">
                <span className="info-card__icon">
                  <Icon name="map-pin" size={22} />
                </span>
                <span className="info-card__label">Address</span>
                <span className="info-card__value">12 Marina Road, Lagos Island, Lagos</span>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="info-card">
                <span className="info-card__icon">
                  <Icon name="clock" size={22} />
                </span>
                <span className="info-card__label">Opening hours</span>
                <span className="info-card__value">Mon – Sat · 9:00 – 19:00</span>
              </div>
            </Reveal>
          </div>

          <div className="contact__grid">
            <Reveal className="contact__image">
              <img src={asset('/images/photos/watch-on-wrist.jpg')} alt="" loading="lazy" />
            </Reveal>

            <Reveal as="form" id="enquiry" className="contact__form" noValidate onSubmit={onSubmit} delay={120}>
              <h2>Send a message</h2>

              <div className="field">
                <label htmlFor="field-fullName">
                  Full name <span className="contact__req">*</span>
                </label>
                <input {...field('fullName')} type="text" placeholder="e.g. Ada Okafor" />
                {error('fullName')}
              </div>

              <div className="field">
                <label htmlFor="field-email">
                  Email <span className="contact__req">*</span>
                </label>
                <input {...field('email')} type="email" placeholder="you@example.com" />
                {error('email')}
              </div>

              <div className="field">
                <label htmlFor="field-phone">Phone</label>
                <input {...field('phone')} type="tel" placeholder="+234 …" />
                {error('phone')}
              </div>

              <div className="field">
                <label htmlFor="field-subject">Subject</label>
                <select {...field('subject')}>
                  <option value="">Repair, appraisal, purchase…</option>
                  <option>Repair</option>
                  <option>Appraisal</option>
                  <option>Purchase</option>
                  <option>Warranty</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field field--full">
                <label htmlFor="field-message">
                  Message <span className="contact__req">*</span>
                </label>
                <textarea
                  {...field('message')}
                  rows={5}
                  placeholder="Tell us about your watch: brand, model and what you need."
                />
                {error('message')}
              </div>

              <div className="field--full contact__submit">
                <button type="submit" className="btn">
                  <Icon name="send" size={16} /> Send message
                </button>
                <span>We never share your details.</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className={`toast ${sent ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {sent && "Thanks, we'll reply within one working day."}
      </div>
    </>
  );
}
