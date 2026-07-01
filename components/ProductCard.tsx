import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <p className="text-gray-500">{product.store}</p>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {product.category}
        </span>
      </div>

      <h3 className="mt-2 text-2xl font-bold">{product.name}</h3>

      <p className="mt-2 text-gray-600">{product.description}</p>

      <p className="mt-3 text-lg">⭐ {product.rating}</p>

      <p className="text-gray-500">{product.reviews}件のレビュー</p>

      <p className="mt-2 font-bold">{product.price}円</p>

      <p className="mt-2 text-sm">
        {product.active ? "販売中" : "販売終了"}
      </p>

      <Link
        href={`/product/${product.id}`}
        className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
      >
        レビューを見る
      </Link>
    </div>
  );
}