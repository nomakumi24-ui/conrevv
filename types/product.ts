export type Review = {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  wouldBuyAgain: boolean;
};

export type Product = {
  id: number;
  store: string;
  name: string;
  rating: number;
  reviews: number;
  category: string;
  active: boolean;
  price: number;
  description: string;
  imageUrl?: string;
  reviewList: Review[];
};