import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://headgreen.in",
      dynamicRoutes: [
        "/",
        "/about",
        "/corporate",
        "/book"
      ],
      robots: [{
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard"]
      }],
    })
  ],
  build: { outDir: "dist" },
});
