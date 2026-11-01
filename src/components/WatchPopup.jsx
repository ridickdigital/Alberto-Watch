import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { asset, useData } from '../lib/data.js';
import { href } from '../lib/router.js';
import { useScrollLock } from '../lib/hooks.js';
import Icon from './Icon.jsx';
import './WatchPopup.css';

// Any component can call  const openWatch = useWatchPopup();  openWatch('rolex-datejust-41')
const WatchPopupContext = createContext(() => {});
export const useWatchPopup = () => useContext(WatchPopupContext);

export function WatchPopupProvider({ children }) {
  const [watchId, setWatchId] = useState(null);
  const openWatch = useCallback((id) => setWatchId(id), []);
  return (
    <WatchPopupContext.Provider value={openWatch}>
      {children}
      <WatchPopup watchId={watchId} onClose={() => setWatchId(null)} />
    </WatchPopupContext.Provider>
  );
}

function WatchPopup({ watchId, onClose }) {
  const catalogue = useData('products');
  const lineups = useData('lineups');
  const pages = useData('pages');
  const [activeImage, setActiveImage] = useState(0);
  const [visible, setVisible] = useState(false);

  const watch = useMemo(() => catalogue?.products.find((p) => p.id === watchId) ?? null, [catalogue, watchId]);
  const open = Boolean(watch);

  useScrollLock(open);

  // reset the gallery and play the open animation each time a watch opens
  useEffect(() => {
    if (!open) return;
    setActiveImage(0);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open, watchId]);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250); // wait for the fade-out
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % watch.thumbnails.length);
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + watch.thumbnails.length) % watch.thumbnails.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, watch]);

  if (!watch) return null;

  const images = watch.thumbnails?.length ? watch.thumbnails : [watch.image];
  const lineupName = lineups?.lineups.find((l) => l.id === watch.primaryLineup)?.name ?? watch.primaryLineup;
  const ctas = pages?.watchDetails;

  return (
    <div
      className={`popup ${visible ? 'is-visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="popup__scrim" onClick={close} />
      <div className="popup__panel">
        <button type="button" className="popup__close" onClick={close} aria-label="Close details">
          <Icon name="close" />
        </button>

        <div className="popup__gallery">
          <div className="popup__main">
            <img key={images[activeImage]} src={asset(images[activeImage])} alt={watch.fullName} />
            <span className="badge popup__badge">{lineupName}</span>
          </div>
          <div className="popup__thumbs">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={`popup__thumb ${i === activeImage ? 'is-active' : ''}`}
                onClick={() => setActiveImage(i)}
                aria-label={`Show photo ${i + 1}`}
              >
                <img src={asset(src)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="popup__info">
          <p className="popup__brand">{watch.brand}</p>
          <h2 id="popup-title" className="popup__name">
            {watch.name}
          </h2>
          <p className="popup__ref">Ref. {watch.reference}</p>
          <p className="popup__price">{watch.priceDisplay}</p>
          <p className="popup__stock">
            <span className={watch.inStock ? 'dot dot--ok' : 'dot'} />
            {watch.inStock ? 'In stock' : 'Available to order'}
            {watch.isNew && <span className="badge popup__new">New</span>}
          </p>
          <p className="popup__desc">{watch.description}</p>

          <dl className="popup__specs">
            {watch.specsDisplayed.map((row) => (
              <div key={row.label} className="popup__spec">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="popup__actions">
            <a className="btn" href={href('/contact')} onClick={close}>
              {ctas?.primaryCta ?? 'Book a viewing'}
            </a>
            <a className="btn btn--ghost" href={href('/contact')} onClick={close}>
              {ctas?.secondaryCta ?? 'Ask about this watch'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
