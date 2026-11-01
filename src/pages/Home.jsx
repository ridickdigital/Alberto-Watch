import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Home.css';

/*
  HOME PAGE
  Owner:   Dev A
  Branch:  feature/home
  Figma:   D-01 Home · M-01 Home
  Data:    public/data/ home.json, products.json, lineups.json
  Tasks:   docs/TASKS.md → Home

  Only edit this file and Home.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Home() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }]}
        title="Alberto Clocks"
        intro="Home page — hero carousel, line-ups, featured watches and more."
      />
      <TaskList
        owner="Dev A"
        branch="feature/home"
        figma="D-01 Home · M-01 Home"
        data="home.json, products.json, lineups.json"
        tasks={[
          'Hero carousel from home.json → hero.carousel.slides (6 slides): eyebrow, title, reference, price, transparent watch PNG, specification tabs and chips.',
          'Carousel controls: autoplay every intervalMs (6 s), pause on hover, previous / next arrows, 01–06 buttons, keyboard ← →, swipe on phones.',
          '"View details" opens the watch popup: const openWatch = useWatchPopup(); openWatch(slide.cta.productId).',
          'Stats strip (hero.stats) and the 4.9 rating chip.',
          'Line-up tiles for lineupSection.lineupIds: photo with the name on it, extra text on hover (desktop) and always visible on touch screens. Each tile links to #/products/<id>.',
          'Featured watches (featuredSection.productIds) as <WatchCard>s + "View all products" link.',
          '"For her" section (home.forHer) with 4 cards, the Workshop section and the Testimonial.',
          'Fade sections up on scroll with <Reveal>; check 1440, 1024, 768 and 390 px widths in dark and light mode.',
        ]}
      />
    </>
  );
}
