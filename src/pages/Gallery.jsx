import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Gallery.css';

/*
  GALLERY PAGE
  Owner:   Dev C
  Branch:  feature/gallery
  Figma:   D-06 Gallery · M-06
  Data:    public/data/ gallery.json, pages.json → gallery
  Tasks:   docs/TASKS.md → Gallery

  Only edit this file and Gallery.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Gallery() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Gallery' }]}
        title={page.gallery.title}
        intro={page.gallery.intro}
      />
      <TaskList
        owner="Dev C"
        branch="feature/gallery"
        figma="D-06 Gallery · M-06"
        data="gallery.json, pages.json → gallery"
        tasks={[
          'Category filter tabs from gallery.json categories.',
          'Masonry grid: 3 columns desktop, 2 tablet, 1 phone (CSS columns). Caption shows on hover.',
          'Click a photo → full-screen lightbox with the photo, caption, "3 / 9" counter, ← → buttons and ✕.',
          'Keyboard: ← → to move, Esc to close. Lock page scroll while open (useScrollLock).',
        ]}
      />
    </>
  );
}
