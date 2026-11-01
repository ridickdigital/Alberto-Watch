import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './About.css';

/*
  ABOUT US PAGE
  Owner:   Dev E
  Branch:  feature/about
  Figma:   D-09 About · M-09
  Data:    public/data/ about.json, site.json
  Tasks:   docs/TASKS.md → About Us

  Only edit this file and About.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function About() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'About Us' }]}
        title={page.about.title}
        intro={page.about.intro}
      />
      <TaskList
        owner="Dev E"
        branch="feature/about"
        figma="D-09 About · M-09"
        data="about.json, site.json"
        tasks={[
          'Story: boutique photo, story text, founder quote and the brands carried (site.json brand.brandsCarried).',
          'Timeline of 4 years (about.json timeline): horizontal on desktop, vertical on phones.',
          'REQUIRED by the brief: Email, address and phone cards (about.json contactSection.cards). Email → mailto:, phone → tel:.',
        ]}
      />
    </>
  );
}
