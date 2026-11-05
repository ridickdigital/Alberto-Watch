import { useEffect, useState } from 'react';
import { parsePath, useRoute } from './lib/router.js';
import { pageFor } from './routes.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Ticker from './components/Ticker.jsx';
import { WatchPopupProvider } from './components/WatchPopup.jsx';

const FADE_OUT_MS = 200;

export default function App() {
  const path = useRoute();
  const [shownPath, setShownPath] = useState(path);
  const [leaving, setLeaving] = useState(false);

  // fade out the old page, then show the new one
  useEffect(() => {
    if (path === shownPath) return;
    const samePage = parsePath(path).section === parsePath(shownPath).section;
    if (samePage) {
      setShownPath(path); // just a tab change, no fade
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

  // links like #/technology/quartz scroll to the part of the page with that id
  useEffect(() => {
    const { param } = parsePath(shownPath);
    if (!param) return;
    let tries = 0;
    const id = setInterval(() => {
      const target = document.getElementById(param);
      if (target || ++tries > 20) clearInterval(id);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearInterval(id);
  }, [shownPath]);

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
