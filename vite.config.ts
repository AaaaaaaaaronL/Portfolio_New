import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages project site: https://aaaaaaaaaronl.github.io/Portfolio_New/
const repoBase = "/Portfolio_New/";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? repoBase : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
    },
  },
});
