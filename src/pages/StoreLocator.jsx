import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './StoreLocator.css';

/*
  STORE LOCATOR PAGE
  Owner:   Dev D
  Branch:  feature/store-locator
  Figma:   D-07 Store Locator · M-07
  Data:    public/data/ stores.json, pages.json → storeLocator
  Tasks:   docs/TASKS.md → Store Locator

  Only edit this file and StoreLocator.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function StoreLocator() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Store Locator' }]}
        title={page.storeLocator.title}
        intro={page.storeLocator.intro}
      />
      <TaskList
        owner="Dev D"
        branch="feature/store-locator"
        figma="D-07 Store Locator · M-07"
        data="stores.json, pages.json → storeLocator"
        tasks={[
          'Store cards: photo, name, address, phone, hours label and services.',
          '"Open now" / "Closed" worked out from stores.json hours and the current time.',
          'Search box filtering by name, address and city.',
          '"Use my location" button: navigator.geolocation, then sort stores by distanceKm() (src/lib/format.js) and show "2.4 km away".',
          'Clicking a store selects it (gold border) and shows it on a Google Maps iframe: https://maps.google.com/maps?q=LAT,LNG&z=15&output=embed',
          '"Get directions" link (store.mapsUrl, opens in a new tab).',
        ]}
      />
    </>
  );
}
