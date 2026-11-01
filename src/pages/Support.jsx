import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Support.css';

/*
  SUPPORT PAGE
  Owner:   Dev D
  Branch:  feature/support
  Figma:   D-08 Support · M-08
  Data:    public/data/ support.json, pages.json → support
  Tasks:   docs/TASKS.md → Support

  Only edit this file and Support.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Support() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Support' }]}
        title={page.support.title}
        intro={page.support.intro}
      />
      <TaskList
        owner="Dev D"
        branch="feature/support"
        figma="D-08 Support · M-08"
        data="support.json, pages.json → support"
        tasks={[
          '3 service cards (photo, title, text, price label).',
          'FAQ accordion: one question open at a time; the one with openByDefault starts open; smooth open / close.',
          'FAQ intro column with the "Contact us" button.',
          '"Book a repair" banner linking to #/contact.',
        ]}
      />
    </>
  );
}
