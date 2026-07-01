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
    price: 648,
    description: "香ばしく炙った牛カルビを楽しめる弁当。",
    reviewList: [
      {
        id: 1,
        userName: "名無しレビュー",
        rating: 5,
        comment: "味が濃くてご飯が進む。普通にまた買う。",
        wouldBuyAgain: true,
      },
      {
        id: 2,
        userName: "コンビニ好き",
        rating: 4,
        comment: "うまいけど少し高い。量はちょうどいい。",
        wouldBuyAgain: true,
      },
    ],
  },
  {
    id: 2,
    store: "ファミリーマート",
    name: "ファミチキ",
    rating: 4.8,
    reviews: 542,
    category: "ホットスナック",
    active: true,
    price: 240,
    description: "ファミリーマート定番の骨なしフライドチキン。",
    reviewList: [
      {
        id: 1,
        userName: "揚げ物民",
        rating: 5,
        comment: "安定。小腹が空いたらこれ。",
        wouldBuyAgain: true,
      },
    ],
  },
  {
    id: 3,
    store: "ローソン",
    name: "プレミアムロールケーキ",
    rating: 4.6,
    reviews: 301,
    category: "スイーツ",
    active: true,
    price: 227,
    description: "クリームをたっぷり楽しめる定番スイーツ。",
    reviewList: [
      {
        id: 1,
        userName: "甘党",
        rating: 5,
        comment: "クリームがうまい。疲れた日にちょうどいい。",
        wouldBuyAgain: true,
      },
    ],
  },
];