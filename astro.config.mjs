// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://moughamir.github.io",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark-high-contrast",
    },
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date(),
      customPages: [
        "https://moughamir.github.io/",
        "https://moughamir.github.io/about/",
        "https://moughamir.github.io/blog/",
        "https://moughamir.github.io/work/",
      ],
      entryLimit: 50000,
      filter: (page) => page !== undefined,
      serialize: (item) => {
        if (item.url === "https://moughamir.github.io/") {
          item.changefreq = "daily";
          item.lastmod = new Date();
          item.priority = 1.0;
        } else if (item.url.includes("/about/")) {
          item.changefreq = "monthly";
          item.priority = 0.8;
        } else if (item.url.includes("/blog/")) {
          item.changefreq = "weekly";
          item.priority = 0.7;
        } else if (item.url.includes("/work/")) {
          item.changefreq = "monthly";
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
