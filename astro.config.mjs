// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://moughamir.github.io",
  integrations: [tailwind(), partytown(
    {
      config: {
        forward: ["dataLayer.push"],
      }
    }
  ), sitemap()],
});