import { href } from '../lib/router.js';
import PageHeader from '../components/PageHeader.jsx';

export default function NotFound() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Not found' }]}
        title="Page not found"
        intro="This page doesn't exist (yet). Try the menu above or go back home."
      />
      <section className="section">
        <div className="container">
          <a className="btn" href={href('/')}>
            Back to home
          </a>
        </div>
      </section>
    </>
  );
}
