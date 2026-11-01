import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './SiteMap.css';

/*
  SITE MAP PAGE
  Owner:   Dev E
  Branch:  feature/sitemap
  Figma:   D-11 Site Map · M-11
  Data:    public/data/ sitemap.json, pages.json → sitemap
  Tasks:   docs/TASKS.md → Site Map

  Only edit this file and SiteMap.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function SiteMap() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Site Map' }]}
        title={page.sitemap.title}
        intro={page.sitemap.intro}
      />
      <TaskList
        owner="Dev E"
        branch="feature/sitemap"
        figma="D-11 Site Map · M-11"
        data="sitemap.json, pages.json → sitemap"
        tasks={[
          'One card per group in sitemap.json siteMapPageGroups; the group title links to its route.',
          "List the group's links underneath (each links to the group's route).",
          '4 / 2 / 1 columns.',
        ]}
      />
    </>
  );
}
