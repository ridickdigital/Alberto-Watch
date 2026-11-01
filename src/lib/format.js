// 1284 → "01,284"
export function formatVisitors(n, pad = 5) {
  return String(n)
    .padStart(pad, '0')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 2250000 → "₦2,250,000"
export function formatNaira(n) {
  return '₦' + Math.round(n).toLocaleString('en-NG');
}

export function formatDate(d) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatTime(d) {
  const time = d.toLocaleTimeString('en-GB', { hour12: false });
  const zone = d.toLocaleTimeString('en-GB', { timeZoneName: 'short' }).split(' ').pop();
  return `${time} ${zone}`;
}

// Distance in km between two lat/lng points (store locator "Use my location")
export function distanceKm(a, b) {
  const R = 6371;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
