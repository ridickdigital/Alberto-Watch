import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Technology.css';

/*
  TECHNOLOGY PAGE
  Owner:   Dev C
  Branch:  feature/technology
  Figma:   D-04 Technology · M-04
  Data:    public/data/ technology.json, pages.json → technology
  Tasks:   docs/TASKS.md → Technology

  Only edit this file and Technology.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Technology() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Technology' }]}
        title={page.technology.title}
        intro={page.technology.intro}
      />
      <TaskList
        owner="Dev C"
        branch="feature/technology"
        figma="D-04 Technology · M-04"
        data="technology.json, pages.json → technology"
        tasks={[
          'Feature block: movement photo, eyebrow, title, text and the facts list (technology.json → feature).',
          '"Four ways to keep time": 4 movement-type cards with their icon (<Icon name={m.icon} />), text and "Found in" line.',
          'Materials: 3 cards with photo, title and text.',
          'Cards fade up one after another (<Reveal delay={i * 100}>).',
          'Responsive: 4 → 2 → 1 columns.',
        ]}
      />
    </>
  );
}
