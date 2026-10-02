// GitHub式の「> [!NOTE]」引用ブロックをコールアウト(.callout)に変換する Sätteri hast プラグイン
const LABELS = {
  NOTE: "補足",
  TIP: "ヒント",
  IMPORTANT: "重要",
  WARNING: "注意",
  CAUTION: "警告",
};
const MARKER = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/i;

export const callout = {
  name: "callout",
  element: {
    filter: ["blockquote"],
    visit(node, ctx) {
      const first = node.children.find((c) => c.type === "element");
      if (first?.tagName !== "p") return;
      const head = first.children[0];
      const match = head?.type === "text" && head.value.match(MARKER);
      if (!match) return;

      const kind = match[1].toUpperCase();
      const rest = head.value.slice(match[0].length);
      const firstChildren = rest
        ? [{ ...head, value: rest }, ...first.children.slice(1)]
        : first.children.slice(1);
      const body = node.children.map((c) =>
        c === first ? { ...first, children: firstChildren } : c,
      );

      ctx.replaceNode(node, {
        type: "element",
        tagName: "aside",
        properties: { className: ["callout", `callout-${kind.toLowerCase()}`] },
        children: [
          {
            type: "element",
            tagName: "p",
            properties: { className: ["callout-title"] },
            children: [{ type: "text", value: LABELS[kind] }],
          },
          ...body,
        ],
      });
    },
  },
};
