// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { wolfComment } from "./src/plugins/wolf-comment.mjs";
import { callout } from "./src/plugins/callout.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.gekka-o.xyz",
  integrations: [
    sitemap({
      // タグ別一覧は記事リストの重複で中身が薄く、Google に「検出 - インデックス未登録」扱いされるため
      // noindex にしたうえでサイトマップからも外す(タグ一覧 /tags/ 自体は残す)
      filter: (page) => !/\/tags\/[^/]+\/$/.test(new URL(page).pathname),
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [wolfComment, callout] }),
  },
});
