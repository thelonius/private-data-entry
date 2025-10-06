import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const repoName = "private-data-entry";

export default defineConfig(() => ({
  // When building for production, set base to the repository subpath so the app
  // can be served correctly from GitHub Pages: https://<user>.github.io/<repo>/
  base: process.env.NODE_ENV === "production" ? `/${repoName}/` : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
