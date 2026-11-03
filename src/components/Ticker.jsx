import { useLocation, useNow } from '../lib/hooks.js';
import { formatDate, formatTime } from '../lib/format.js';
import Icon from './Icon.jsx';
import './Ticker.css';

export default function Ticker() {
  const now = useNow();
  const location = useLocation();

  const items = [
    { icon: 'calendar', text: formatDate(now) },
    { icon: 'clock', text: formatTime(now) },
    { icon: 'map-pin', text: location.status === 'error' ? 'Location unavailable' : location.text },
    { icon: 'wrench', text: 'Free watch appraisal every Saturday' },
    { icon: 'gem', text: 'New in: Alberto Royale Tourbillon' },
  ];

  // rendered twice so the loop is seamless
  const run = (copy) => (
    <ul className="ticker__run" aria-hidden={copy > 0}>
      {items.map((item) => (
        <li key={item.icon} className="ticker__item">
          <Icon name={item.icon} size={14} />
          <span>{item.text}</span>
          <span className="ticker__sep">◆</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" role="marquee" aria-label="Date, time and location">
      <span className="ticker__live">
        <span className="ticker__dot" />
        Live
      </span>
      <div className="ticker__track" style={{ '--ticker-duration': '40s' }}>
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
