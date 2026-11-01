import { asset } from '../lib/data.js';
import { useWatchPopup } from './WatchPopup.jsx';
import Icon from './Icon.jsx';
import './WatchCard.css';

// Product card: photo with the text on top of it. Click → Watch Details popup.
export default function WatchCard({ watch, lineupName }) {
  const openWatch = useWatchPopup();
  return (
    <button type="button" className="watch-card" onClick={() => openWatch(watch.id)}>
      <img className="watch-card__img" src={asset(watch.image)} alt={watch.fullName} loading="lazy" />
      <span className="watch-card__shade" />
      <span className="badge watch-card__badge">{lineupName ?? watch.primaryLineup}</span>
      {watch.isNew && <span className="watch-card__new">New</span>}
      <span className="watch-card__body">
        <span className="watch-card__brand">{watch.brand}</span>
        <span className="watch-card__name">{watch.name}</span>
        <span className="watch-card__row">
          <span className="watch-card__price">{watch.priceDisplay}</span>
          <span className="watch-card__more">
            View details <Icon name="arrow-right" size={14} />
          </span>
        </span>
      </span>
    </button>
  );
}
