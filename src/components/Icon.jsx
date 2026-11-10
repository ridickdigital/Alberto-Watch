import { asset } from '../lib/data.js';
import './Icon.css';

// SVG icon from public/images/icons, coloured with the text colour
export default function Icon({ name, size = 18, className = '' }) {
  // full url: a relative one inside a CSS variable resolves against the stylesheet (/assets/) in the build
  const src = new URL(asset(`/images/icons/${name}.svg`), document.baseURI).href;
  return (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{
        '--icon-url': `url("${src}")`,
        width: `${size / 16}rem`,
        height: `${size / 16}rem`,
      }}
    />
  );
}
