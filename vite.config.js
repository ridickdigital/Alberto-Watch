import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site run from any folder (or GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173, open: true },
});
