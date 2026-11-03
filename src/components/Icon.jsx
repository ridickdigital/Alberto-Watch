import { asset } from '../lib/data.js';
import './Icon.css';

// SVG icon from public/images/icons, coloured with the text colour
export default function Icon({ name, size = 18, className = '' }) {
  return (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{
        '--icon-url': `url("${asset(`/images/icons/${name}.svg`)}")`,
        width: `${size / 16}rem`,
        height: `${size / 16}rem`,
      }}
    />
  );
}
