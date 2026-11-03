import { useEffect, useState } from 'react';
import { asset } from '../lib/data.js';
import { href } from '../lib/router.js';
import { useScrollLock, useTheme, useVisitorCount } from '../lib/hooks.js';
import { formatVisitors } from '../lib/format.js';
import { menu } from '../menu.js';
import Icon from './Icon.jsx';
import './Header.css';

export default function Header({ section }) {
  const [theme, toggleTheme] = useTheme();
  const visitors = useVisitorCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollLock(menuOpen);

  // close the menu when the page changes
  useEffect(() => setMenuOpen(false), [section]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logo = theme === 'dark' ? '/images/brand/logo.svg' : '/images/brand/logo-light.svg';

  const ThemeButton = ({ className = '' }) => (
    <button
      type="button"
      className={`header__icon-btn ${className}`}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header__inner container">
          <a className="header__logo" href={href('/')} aria-label="Alberto Clocks home">
            <img src={asset(logo)} alt="Alberto Clocks" width="170" height="40" />
          </a>

          <nav className="header__nav" aria-label="Main menu">
            {menu.map((item) => (
              <a
                key={item.id}
                href={href(item.route)}
                className={`nav-link ${section === item.id ? 'is-active' : ''}`}
                aria-current={section === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__tools">
            <span className="visitors" title="Visitor count">
              <Icon name="eye" size={14} />
              <span className="visitors__label">Visitors</span>
              <strong>{visitors ? formatVisitors(visitors) : '…'}</strong>
            </span>
            <ThemeButton className="header__theme" />
            <button
              type="button"
              className="header__icon-btn header__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* kept outside <header>: its backdrop blur would trap the fixed drawer */}
      <div className={`drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer__scrim" onClick={() => setMenuOpen(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__top">
            <img src={asset(logo)} alt="Alberto Clocks" width="140" height="33" />
            <button
              type="button"
              className="header__icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <Icon name="close" />
            </button>
          </div>
          <nav className="drawer__nav">
            {menu.map((item, i) => (
              <a
                key={item.id}
                href={href(item.route)}
                className={`drawer__link ${section === item.id ? 'is-active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 35}ms` : '0ms' }}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
                <Icon name="chevron-right" size={14} />
              </a>
            ))}
          </nav>
          <div className="drawer__bottom">
            <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
            <ThemeButton />
          </div>
        </div>
      </div>
    </>
  );
}
