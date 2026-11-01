import { useEffect, useState } from 'react';

// All content lives in public/data/*.json (the brief's "JSON data store").
// Each file is fetched once and cached for the rest of the session.
const cache = new Map();

export function loadData(name) {
  if (!cache.has(name)) {
    const request = fetch(`${import.meta.env.BASE_URL}data/${name}.json`).then((res) => {
      if (!res.ok) throw new Error(`Could not load ${name}.json (${res.status})`);
      return res.json();
    });
    request.catch(() => cache.delete(name)); // allow a retry after a failure
    cache.set(name, request);
  }
  return cache.get(name);
}

// const site = useData('site')  →  null while loading, then the parsed JSON
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

// Paths in the JSON start with "/images/…". This makes them work from any base URL.
export function asset(path) {
  if (!path) return '';
  if (/^https?:/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
