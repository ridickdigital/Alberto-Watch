import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import './SiteMap.css';

const groups = [
  {
    name: 'Home',
    route: '/',
    links: [
      ['Featured watches', '/home/featured'],
      ['Shop by line-up', '/home/lineups'],
      ['For her', '/home/for-her'],
      ['Our workshop', '/home/workshop'],
      ['Reviews', '/home/reviews'],
    ],
  },
  {
    name: 'Products',
    route: '/products/all',
    links: [
      ['All watches', '/products/all'],
      ['Women', '/products/women'],
      ['Vintage', '/products/vintage'],
      ['Luxury', '/products/luxury'],
      ['Smart Watches', '/products/smart-watches'],
      ['Clocks', '/products/clocks'],
    ],
  },
  {
    name: 'Technology',
    route: '/technology',
    links: [
      ['Inside the movement', '/technology/movement'],
      ['Quartz', '/technology/quartz'],
      ['Automatic', '/technology/automatic'],
      ['Eco-Drive', '/technology/eco-drive'],
      ['Smart', '/technology/smart'],
      ['Materials', '/technology/materials'],
    ],
  },
  {
    name: 'Price List',
    route: '/prices',
    links: [
      ['All prices', '/prices'],
      ['Luxury prices', '/prices/luxury'],
      ["Women's prices", '/prices/women'],
      ['Vintage prices', '/prices/vintage'],
      ['Smart watch prices', '/prices/smart-watches'],
      ['Clock prices', '/prices/clocks'],
    ],
  },
  {
    name: 'Gallery',
    route: '/gallery',
    links: [
      ['Watches', '/gallery/watches'],
      ['Workshop', '/gallery/workshop'],
      ['Boutique', '/gallery/boutique'],
      ['Clocks', '/gallery/clocks'],
    ],
  },
  {
    name: 'Store Locator',
    route: '/store-locator',
    links: [
      ['Lagos Island (flagship)', '/store-locator/lagos-island'],
      ['Victoria Island', '/store-locator/victoria-island'],
      ['Lekki', '/store-locator/lekki'],
      ['Ikeja', '/store-locator/ikeja'],
      ['Abuja', '/store-locator/abuja'],
      ['Port Harcourt', '/store-locator/port-harcourt'],
      ['Ibadan', '/store-locator/ibadan'],
      ['Kano', '/store-locator/kano'],
      ['Enugu', '/store-locator/enugu'],
      ['Benin City', '/store-locator/benin-city'],
    ],
  },
  {
    name: 'Support',
    route: '/support',
    links: [
      ['Repair & servicing', '/support/repair'],
      ['Battery & strap', '/support/battery-strap'],
      ['Warranty claims', '/support/warranty'],
      ['FAQ', '/support/faq'],
      ['Book a repair', '/support/book-a-repair'],
    ],
  },
  {
    name: 'Company',
    route: '/about',
    links: [
      ['Our story', '/about/story'],
      ['Timeline', '/about/timeline'],
      ['Contact details', '/contact/contact-details'],
      ['Send a message', '/contact/enquiry'],
    ],
  },
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
                {g.links.map(([label, route]) => (
                  <li key={route}>
                    <a href={href(route)}>{label}</a>
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
