import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Products.css';

/*
  PRODUCTS PAGE
  Owner:   Dev B
  Branch:  feature/products
  Figma:   D-02 Products · D-02W Women · M-02
  Data:    public/data/ products.json, lineups.json, pages.json → products
  Tasks:   docs/TASKS.md → Products

  Only edit this file and Products.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Products({ param }) {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Products' }]}
        title={page.products.title}
        intro={page.products.intro}
      />
      <TaskList
        owner="Dev B"
        branch="feature/products"
        figma="D-02 Products · D-02W Women · M-02"
        data="products.json, lineups.json, pages.json → products"
        tasks={[
          'Read the line-up from the URL: the page receives it as the `param` prop (#/products/luxury → "luxury"). Unknown or empty → lineups.json defaultLineup.',
          'Line-up tabs from lineups.json (All, Women, Vintage, Luxury, Smart Watches, Clocks) as links to #/products/<id>; the active tab is gold.',
          'Filter products.json: product.lineups includes the line-up id ("all" shows everything). Title + description come from the line-up.',
          'Results line from pages.json resultsLabel, e.g. "6 Luxury watches".',
          'Sort dropdown from products.json sortOptions (price high → low by default).',
          'Grid of <WatchCard watch={…} lineupName={…} /> — 4 / 2 / 1 columns. Clicking a card already opens the popup.',
          'Empty state with a link to #/products/all.',
        ]}
      />
    </>
  );
}
