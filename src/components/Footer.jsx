import { asset } from '../lib/data.js';
import { href } from '../lib/router.js';
import Icon from './Icon.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo footer__logo--dark"
            src={asset('/images/brand/logo.svg')}
            alt="Alberto Clocks"
            width="170"
            height="40"
          />
          <img
            className="footer__logo footer__logo--light"
            src={asset('/images/brand/logo-light.svg')}
            alt=""
            width="170"
            height="40"
          />
          <p>
            Full-service watch repair, appraisal and retail since 1987. Rolex, Citizen Eco-Drive, Bulova, Michael Kors
            and our own Alberto collection.
          </p>
        </div>

        <nav className="footer__col" aria-label="Explore">
          <h3>Explore</h3>
          <a href={href('/products/luxury')}>Products</a>
          <a href={href('/products/women')}>Women</a>
          <a href={href('/technology')}>Technology</a>
          <a href={href('/prices')}>Price List</a>
          <a href={href('/gallery')}>Gallery</a>
        </nav>

        <nav className="footer__col" aria-label="Company">
          <h3>Company</h3>
          <a href={href('/about')}>About Us</a>
          <a href={href('/contact')}>Contact Us</a>
          <a href={href('/store-locator')}>Store Locator</a>
          <a href={href('/support')}>Support</a>
          <a href={href('/sitemap')}>Site Map</a>
        </nav>

        <div className="footer__col">
          <h3>Visit us</h3>
          <p className="footer__contact">
            <Icon name="map-pin" size={16} />
            12 Marina Road, Lagos Island, Lagos
          </p>
          <p className="footer__contact">
            <Icon name="phone" size={16} />
            +234 801 234 5678
          </p>
          <p className="footer__contact">
            <Icon name="mail" size={16} />
            hello@albertoclocks.com
          </p>
          <p className="footer__contact">
            <Icon name="clock" size={16} />
            Mon – Sat · 9:00 – 19:00
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Alberto Clocks. All rights reserved.</span>
        <span className="footer__legal">
          <a href={href('/sitemap')}>Site Map</a>
        </span>
      </div>
    </footer>
  );
}
