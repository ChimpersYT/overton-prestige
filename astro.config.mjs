// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Live domain. Update when the production domain points at this build.
  // The site is designed to be served from the host root (no subpath), so
  // it works on any of: a custom domain, Cloudflare Pages, Netlify, Vercel.
  site: 'https://www.overtonprestige.co.uk',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});