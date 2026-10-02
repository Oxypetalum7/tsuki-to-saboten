// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { wolfComment } from "./src/plugins/wolf-comment.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.gekka-o.xyz",
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [wolfComment] }),
  },
});
