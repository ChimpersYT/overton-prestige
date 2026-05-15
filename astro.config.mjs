// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Live domain by default. The SITE env var overrides it: the GitHub Pages
  // preview workflow sets SITE=https://chimpersyt.github.io so absolute URLs
  // (OG image, canonical, sitemap) point at the preview host.
  site: process.env.SITE || 'https://www.overtonprestige.co.uk',

  // No base path by default. The GitHub Pages preview workflow sets
  // BASE_PATH=/overton-prestige/ so internal links resolve under the project
  // subpath. Unset for the real domain.
  base: process.env.BASE_PATH || undefined,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});