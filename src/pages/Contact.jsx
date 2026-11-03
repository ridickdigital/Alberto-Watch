import { useState } from 'react';
import { asset, useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './About.css';
import './Contact.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validation rules come from contact.json (required, minLength, pattern, error)
function validate(fields, values) {
  const errors = {};
  for (const f of fields) {
    const v = (values[f.name] ?? '').trim();
    if (f.required && !v) errors[f.name] = f.error;
    else if (v && f.minLength && v.length < f.minLength) errors[f.name] = f.error;
    else if (v && f.type === 'email' && !EMAIL.test(v)) errors[f.name] = f.error;
    else if (v && f.pattern && !new RegExp(f.pattern).test(v)) errors[f.name] = f.error;
  }
  return errors;
}

// #/contact: email, address, phone and an enquiry form
export default function Contact() {
  const page = useData('pages');
  const contact = useData('contact');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  if (!page || !contact) return <div className="loading">Loading…</div>;
  const { form } = contact;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(form.fields, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    // No backend in this project: show the success message and clear the form.
    setSent(true);
    setValues({});
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Contact Us' }]}
        title={page.contact.title}
        intro={page.contact.intro}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--4 contact__cards">
            {contact.infoCards.map((c, i) => {
              const Tag = c.href ? 'a' : 'div';
              return (
                <Reveal key={c.label} delay={i * 80}>
                  <Tag className="info-card" {...(c.href ? { href: c.href } : {})}>
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

          <div className="contact__grid">
            <Reveal className="contact__image">
              <img src={asset(contact.image)} alt="" loading="lazy" />
            </Reveal>

            <Reveal as="form" className="contact__form" noValidate onSubmit={onSubmit} delay={120}>
              <h2>{form.title}</h2>
              {form.fields.map((f) => {
                const id = `field-${f.name}`;
                const common = {
                  id,
                  name: f.name,
                  className: `input ${errors[f.name] ? 'has-error' : ''}`,
                  value: values[f.name] ?? '',
                  onChange,
                  'aria-invalid': Boolean(errors[f.name]),
                  'aria-describedby': errors[f.name] ? `${id}-err` : undefined,
                };
                return (
                  <div key={f.name} className={`field ${f.type === 'textarea' ? 'field--full' : ''}`}>
                    <label htmlFor={id}>
                      {f.label} {f.required && <span className="contact__req">*</span>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea {...common} rows={5} placeholder={f.placeholder} />
                    ) : f.type === 'select' ? (
                      <select {...common}>
                        <option value="">{f.placeholder}</option>
                        {f.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input {...common} type={f.type} placeholder={f.placeholder} />
                    )}
                    {errors[f.name] && (
                      <span id={`${id}-err`} className="contact__error">
                        {errors[f.name]}
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="field--full contact__submit">
                <button type="submit" className="btn">
                  <Icon name="send" size={16} /> {form.submitLabel}
                </button>
                <span>{form.privacyNote}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className={`toast ${sent ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {sent && form.successMessage}
      </div>
    </>
  );
}
