// Section name (first part of the URL) → page component.
// #/products/luxury → "products",  #/ → "home"
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Technology from './pages/Technology.jsx';
import Prices from './pages/Prices.jsx';
import Gallery from './pages/Gallery.jsx';
import StoreLocator from './pages/StoreLocator.jsx';
import Support from './pages/Support.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SiteMap from './pages/SiteMap.jsx';
import NotFound from './pages/NotFound.jsx';

export const routes = {
  home: Home,
  products: Products,
  technology: Technology,
  prices: Prices,
  gallery: Gallery,
  'store-locator': StoreLocator,
  support: Support,
  about: About,
  contact: Contact,
  sitemap: SiteMap,
};

export const pageFor = (section) => routes[section] ?? NotFound;
