import { useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './SiteMap.css';

// #/sitemap: every section of the site in one place
export default function SiteMap() {
  const page = useData('pages');
  const sitemap = useData('sitemap');
  if (!page || !sitemap) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Site Map' }]}
        title={page.sitemap.title}
        intro={page.sitemap.intro}
      />
      <section className="section">
        <div className="container grid grid--4 sitemap">
          {sitemap.siteMapPageGroups.map((g, i) => (
            <Reveal key={g.name} delay={(i % 4) * 80} className="sitemap__group">
              <a className="sitemap__title" href={href(g.route)}>
                {g.name} <Icon name="arrow-right" size={14} />
              </a>
              <ul>
                {g.links.map((l) => (
                  <li key={l}>
                    <a href={href(g.route)}>{l}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
