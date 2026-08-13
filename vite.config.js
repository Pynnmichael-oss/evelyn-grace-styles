import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from /<repo-name>/, so the build
  // needs every asset URL prefixed with the repo name. Update this if
  // the repo is ever renamed.
  base: '/evelyn-grace-styles/',
})
