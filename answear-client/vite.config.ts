import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",

      components: "/src/components",
      constants: "/src/constants",
      css: "/src/css",
      pages: "/src/pages",
      utils: "/src/utils",
      interfaces: "/src/interfaces",
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:5173",
  },
});
