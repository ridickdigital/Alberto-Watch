import { useEffect, useState } from 'react';
import { parsePath, useRoute } from './lib/router.js';
import { pageFor } from './routes.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Ticker from './components/Ticker.jsx';
import { WatchPopupProvider } from './components/WatchPopup.jsx';

const FADE_OUT_MS = 200; // site.json → transitions.sectionFadeOutMs

export default function App() {
  const path = useRoute();
  const [shownPath, setShownPath] = useState(path);
  const [leaving, setLeaving] = useState(false);

  // fade the old section out, then swap in the new one (it fades in via CSS)
  useEffect(() => {
    if (path === shownPath) return;
    const samePage = parsePath(path).section === parsePath(shownPath).section;
    if (samePage) {
      setShownPath(path); // e.g. switching product tabs: no full-page fade
      return;
    }
    setLeaving(true);
    const id = setTimeout(() => {
      setShownPath(path);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, FADE_OUT_MS);
    return () => clearTimeout(id);
  }, [path, shownPath]);

  const { section, param } = parsePath(shownPath);
  const Page = pageFor(section);

  return (
    <WatchPopupProvider>
      <Header section={parsePath(path).section} />
      <main key={section} className={`page ${leaving ? 'is-leaving' : ''}`}>
        <Page param={param} />
      </main>
      <Footer />
      <Ticker />
    </WatchPopupProvider>
  );
}
