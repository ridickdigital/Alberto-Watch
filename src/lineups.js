// a watch is in a line-up when its "lineups" list in products.json has the id
export const lineups = [
  {
    id: 'all',
    name: 'All',
    heading: 'All watches & clocks',
    description: 'Every piece we stock, across all line-ups.',
  },
  {
    id: 'women',
    name: 'Women',
    heading: 'Women\'s Watches',
    description: "Dress watches, bracelet watches and ladies' sizes from 28 to 34 mm.",
    tile: '/images/photos/women-on-wrist.jpg',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    heading: 'The Vintage line-up',
    description: 'Hand-wound reissues and restored classics with cream dials and leather straps.',
    tile: '/images/photos/vintage-watch.jpg',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    heading: 'The Luxury line-up',
    description: 'Precious metals, in-house movements and watches built to be handed down.',
    tile: '/images/photos/rose-gold-watch.jpg',
  },
  {
    id: 'smart-watches',
    name: 'Smart Watches',
    heading: 'The Smart Watches line-up',
    description: 'Heart rate, GPS, notifications and contactless payment, on your wrist.',
    tile: '/images/photos/smart-heart-rate.jpg',
  },
  {
    id: 'clocks',
    name: 'Clocks',
    heading: 'The Clocks line-up',
    description: 'Wall, mantel and bracket clocks for the home and office.',
    tile: '/images/photos/wall-clock.jpg',
  },
];

export const lineupName = (id) => lineups.find((l) => l.id === id)?.name ?? id;
