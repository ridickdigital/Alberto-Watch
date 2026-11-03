import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site run from any folder (or GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
  // the oldest browsers we build for (JS and CSS are lowered and prefixed to match)
  build: {
    target: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
  },
  server: { port: 5173, open: true },
});
