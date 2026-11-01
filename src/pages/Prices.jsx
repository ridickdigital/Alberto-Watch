import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Prices.css';

/*
  PRICE LIST PAGE
  Owner:   Dev B
  Branch:  feature/prices
  Figma:   D-05 Price List · M-05
  Data:    public/data/ products.json, lineups.json, pages.json → prices
  Tasks:   docs/TASKS.md → Price List

  Only edit this file and Prices.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Prices() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Price List' }]}
        title={page.prices.title}
        intro={page.prices.intro}
      />
      <TaskList
        owner="Dev B"
        branch="feature/prices"
        figma="D-05 Price List · M-05"
        data="products.json, lineups.json, pages.json → prices"
        tasks={[
          'Table of every product with the columns in pages.json prices.columns (Watch, Brand, Line-up, Size · Movement, Price).',
          'Line-up filter tabs and a search box that matches name + brand.',
          'Click the Price column header to sort high → low / low → high.',
          'Clicking a row (or Enter on it) opens the watch popup with useWatchPopup().',
          'On phones each row becomes a small card (hide the table head, label each value).',
          'Footnote under the table: count of pieces, currency note and pages.json footnote.',
        ]}
      />
    </>
  );
}
