import { useEffect, useState } from 'react';

// products.json and stores.json live in public/data. Each is fetched once.
const cache = new Map();

export function loadData(name) {
  if (!cache.has(name)) {
    const request = fetch(`${import.meta.env.BASE_URL}data/${name}.json`).then((res) => {
      if (!res.ok) throw new Error(`Could not load ${name}.json (${res.status})`);
      return res.json();
    });
    request.catch(() => cache.delete(name)); // so it can retry
    cache.set(name, request);
  }
  return cache.get(name);
}

export function useData(name) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    loadData(name)
      .then((json) => alive && setData(json))
      .catch((err) => console.error(err));
    return () => {
      alive = false;
    };
  }, [name]);
  return data;
}

// prefix image paths with the base url so the build works from any folder
export function asset(path) {
  if (!path) return '';
  if (/^https?:/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
