import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    store: "セブン-イレブン",
    name: "炙り焼き牛カルビ弁当",
    rating: 4.7,
    reviews: 123,
    category: "弁当",
    active: true,
  },
  {
    id: 2,
    store: "ファミリーマート",
    name: "ファミチキ",
    rating: 4.8,
    reviews: 542,
    category: "ホットスナック",
    active: true,
  },
  {
    id: 3,
    store: "ローソン",
    name: "プレミアムロールケーキ",
    rating: 4.6,
    reviews: 301,
    category: "スイーツ",
    active: true,
  },
];