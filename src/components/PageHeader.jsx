import { href } from '../lib/router.js';
import Icon from './Icon.jsx';
import './PageHeader.css';

// Breadcrumb + title + intro used at the top of every inner page.
// crumbs: [{ label, route }]  (the last crumb is the current page and has no route)
export default function PageHeader({ crumbs = [], title, intro, children }) {
  return (
    <header className="page-header">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label} className="breadcrumb__item">
              {c.route ? <a href={href(c.route)}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
              {i < crumbs.length - 1 && <Icon name="chevron-right" size={12} />}
            </span>
          ))}
        </nav>
        <h1 className="page-header__title">{title}</h1>
        {intro && <p className="page-header__intro">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
