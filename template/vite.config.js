import { defineConfig } from "vite";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [AlpineVitePlugin()], // Hot Reload Plugin for Vite
});

function AlpineVitePlugin() {
  return {
    name: "alpine-vite-plugin",
    handleHotUpdate({ file, server }) {
      // hot reload for any file change
      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    },
  };
}
