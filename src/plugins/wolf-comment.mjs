// 「🐺」で始まる段落に .wolf-comment を付与する Sätteri hast プラグイン
// AI執筆記事に、きーちゃん(狼さん)の合いの手を差し込むための表記
const MARK = "🐺";

export const wolfComment = {
  name: "wolf-comment",
  element: {
    filter: ["p"],
    visit(node, ctx) {
      if (!ctx.textContent(node).trimStart().startsWith(MARK)) return;
      const current = node.properties?.className ?? [];
      ctx.setProperty(node, "className", [...current, "wolf-comment"]);
    },
  },
};
