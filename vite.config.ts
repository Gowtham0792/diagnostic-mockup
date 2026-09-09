import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site is served from /<repo>/
  base: '/diagnostic-mockup/',
  plugins: [react()],
})
