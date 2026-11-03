import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './SiteMap.css';

const groups = [
  { name: 'Home', route: '/', links: ['Hero', 'Shop by line-up', 'Featured watches', 'Our workshop'] },
  {
    name: 'Products',
    route: '/products/luxury',
    links: ['Vintage', 'Luxury', 'Smart Watches', 'Clocks', 'Watch details popup'],
  },
  { name: 'Technology', route: '/technology', links: ['Quartz', 'Automatic', 'Eco-Drive', 'Smart', 'Materials'] },
  { name: 'Price List', route: '/prices', links: ['All watches', 'Filter by line-up', 'Search'] },
  { name: 'Gallery', route: '/gallery', links: ['Watches', 'Workshop', 'Boutique', 'Clocks'] },
  { name: 'Store Locator', route: '/store-locator', links: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'] },
  { name: 'Support', route: '/support', links: ['Repair & servicing', 'Battery & strap', 'Warranty', 'FAQ'] },
  { name: 'Company', route: '/about', links: ['About Us', 'Contact Us', 'Site Map'] },
];

export default function SiteMap() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Site Map' }]}
        title="Site map"
        intro="Every section of the Alberto Clocks website in one place."
      />
      <section className="section">
        <div className="container grid grid--4 sitemap">
          {groups.map((g, i) => (
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
