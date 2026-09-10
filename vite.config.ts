import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site is served from /<repo>/
  base: '/diagnostic-mockup/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // field diagnostic mockup
        main: 'index.html',
        // web-based parameter authoring tool (Option D) — separate page
        authoring: 'authoring.html',
      },
    },
  },
})
