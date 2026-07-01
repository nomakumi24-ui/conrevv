import type { Proposal } from "@/types/proposal";

export const proposals: Proposal[] = [
  {
    id: 1,
    type: "商品名の修正",
    productName: "牛カルビ弁当",
    newValue: "炙りカルビ弁当",
    reason: "パッケージの商品名が変更されていたため",
    status: "PENDING",
    createdAt: "2026-07-01",
  },
  {
    id: 2,
    type: "販売終了",
    productName: "旧チョコスイーツ",
    newValue: "販売終了",
    reason: "店頭で見かけなくなったため",
    status: "PENDING",
    createdAt: "2026-07-01",
  },
];