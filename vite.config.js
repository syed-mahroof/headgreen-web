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
        "/book",
        "/partner",
        "/careers",
        "/privacy",
        "/terms",
        "/blog",
        "/kochi-infopark",
        "/smartcity-kakkanad"
      ],
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
      robots: [{
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/404"]
      }],
    })
  ],
  build: { outDir: "dist" },
});
