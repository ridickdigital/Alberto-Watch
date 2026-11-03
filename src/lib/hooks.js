import { useEffect, useRef, useState } from 'react';

const THEME_KEY = 'alberto_theme';
const VISITS_KEY = 'alberto_visits';
const COUNTED_KEY = 'alberto_counted';
const VISITS_START = 1283;

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    /* private mode: ignore */
  }
}

// Light / dark mode, saved in localStorage and applied as <html data-theme="…">
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0E0D0B' : '#F7F3EC');
    safeSet(localStorage, THEME_KEY, theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}

// Visitor count: +1 once per browser session, stored in localStorage
export function useVisitorCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let visits = Number(safeGet(localStorage, VISITS_KEY)) || VISITS_START;
    if (!safeGet(sessionStorage, COUNTED_KEY)) {
      visits += 1;
      safeSet(localStorage, VISITS_KEY, String(visits));
      safeSet(sessionStorage, COUNTED_KEY, '1');
    }
    setCount(visits);
  }, []);
  return count;
}

// Current date/time, updated every second
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// HTML5 geolocation + reverse geocoding to a city name
export function useLocation() {
  const [location, setLocation] = useState({ status: 'loading', text: 'Finding your location…' });
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation({ status: 'error', text: 'Location unavailable' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;
        const coordText = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? 'E' : 'W'}`;
        setLocation({ status: 'ok', text: coordText, lat, lng });
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const place = await res.json();
          const city = place.city || place.locality || place.principalSubdivision;
          if (city) setLocation({ status: 'ok', text: `${city}, ${place.countryName} · ${coordText}`, lat, lng });
        } catch {
          /* keep the coordinates */
        }
      },
      () => setLocation({ status: 'error', text: 'Location unavailable' }),
      { timeout: 10000, maximumAge: 600000 }
    );
  }, []);
  return location;
}

// Adds the class "is-visible" when an element scrolls into view (fade-up animations)
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Stop the page scrolling behind popups / menus
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
