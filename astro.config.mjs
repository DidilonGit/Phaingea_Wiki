// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Phaingea se aloja en GitHub Pages bajo la cuenta del repo (DidilonGit).
// URL final: https://didilongit.github.io/Phaingea_Wiki/
export default defineConfig({
  site: 'https://didilongit.github.io',
  base: '/Phaingea_Wiki',
  output: 'static',
  integrations: [react()],
});
