import { asset } from '../lib/data.js';
import './Icon.css';

// <Icon name="phone" />: draws public/images/icons/phone.svg in the current text colour
export default function Icon({ name, size = 18, className = '' }) {
  return (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{
        '--icon-url': `url("${asset(`/images/icons/${name}.svg`)}")`,
        width: `${size / 16}rem`, // rem so icons grow with the text on big screens
        height: `${size / 16}rem`,
      }}
    />
  );
}
