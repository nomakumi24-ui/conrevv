export type Review = {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  wouldBuyAgain: boolean;
};

export type Product = {
  id: string;
  store: string;
  name: string;

  aliases: string[];   // ← ここを追加

  rating: number;
  reviews: number;
  category: string;
  active: boolean;
  price: number;
  description: string;
  imageUrl?: string;
  reviewList: Review[];
};