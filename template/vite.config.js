import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [injectHTML()],
});
