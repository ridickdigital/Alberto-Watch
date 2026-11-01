import { asset, useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import Icon from './Icon.jsx';
import './Footer.css';

export default function Footer() {
  const nav = useData('navigation');
  const site = useData('site');
  if (!nav || !site) return null;
  const { explore, company, visitUs } = nav.footer;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo footer__logo--dark"
            src={asset(site.brand.logo.onDark)}
            alt="Alberto Clocks"
            width="170"
            height="40"
          />
          <img
            className="footer__logo footer__logo--light"
            src={asset(site.brand.logo.onLight)}
            alt=""
            width="170"
            height="40"
          />
          <p>{site.brand.summary}</p>
        </div>

        {[explore, company].map((group) => (
          <nav key={group.title} className="footer__col" aria-label={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <a key={link.label} href={href(link.route)}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}

        <div className="footer__col">
          <h3>{visitUs.title}</h3>
          {visitUs.items.map((item) => (
            <p key={item.text} className="footer__contact">
              <Icon name={item.icon} size={16} />
              {item.text}
            </p>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{site.footer.copyright}</span>
        <span className="footer__legal">
          {site.footer.legalLinks.map((l) => (
            <a key={l.label} href={href(l.route)}>
              {l.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
