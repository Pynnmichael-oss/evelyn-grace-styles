import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel and the custom domain serve from the root. GitHub Pages serves
  // project sites from /<repo-name>/, so the gh-pages deploy script sets
  // GITHUB_PAGES=true to prefix asset URLs with the repo name.
  base: process.env.GITHUB_PAGES ? '/evelyn-grace-styles/' : '/',
})
