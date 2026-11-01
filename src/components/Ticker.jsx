import { useData } from '../lib/data.js';
import { useLocation, useNow } from '../lib/hooks.js';
import { formatDate, formatTime } from '../lib/format.js';
import Icon from './Icon.jsx';
import './Ticker.css';

// Continuous scrolling ticker fixed to the bottom of the page:
// current date, current time and the visitor's location (HTML5 geolocation).
export default function Ticker() {
  const data = useData('ticker');
  const now = useNow();
  const location = useLocation();
  if (!data) return null;

  const textFor = (item) => {
    if (item.type === 'date') return formatDate(now);
    if (item.type === 'time') return formatTime(now);
    if (item.type === 'location') return location.status === 'error' ? item.fallback : location.text;
    return item.text;
  };

  // the list is rendered twice so the scroll loops without a gap
  const run = (copy) => (
    <ul className="ticker__run" aria-hidden={copy > 0}>
      {data.items.map((item, i) => (
        <li key={`${copy}-${i}`} className="ticker__item">
          <Icon name={item.icon} size={14} />
          <span>{textFor(item)}</span>
          <span className="ticker__sep">{data.separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" role="marquee" aria-label="Date, time and location">
      <span className="ticker__live">
        <span className="ticker__dot" />
        {data.liveLabel}
      </span>
      <div className="ticker__track" style={{ '--ticker-duration': `${data.scroll.durationSeconds}s` }}>
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
