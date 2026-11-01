import { useEffect, useState } from 'react';

// A tiny hash router — no library needed. URLs look like  #/products/luxury
// so the site stays a Single-Page Application and works from any static host.

function readPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash.startsWith('/') ? hash : '/';
}

export function useRoute() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

export function navigate(path) {
  window.location.hash = path;
}

// "#/products/luxury" for an <a href>
export const href = (path) => `#${path}`;

// "/products/luxury" → { section: "products", param: "luxury" }
export function parsePath(path) {
  const [, section = '', param = ''] = path.split('/');
  return { section: section || 'home', param };
}
