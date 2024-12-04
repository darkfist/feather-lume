import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [injectHTML()],
});
