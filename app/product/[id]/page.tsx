import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-6xl p-6">
        <Link href="/" className="text-emerald-700 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center justify-between gap-3">
            <p className="text-gray-500">{product.store}</p>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              {product.category}
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

          <p className="mt-3 text-gray-700">{product.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">評価</p>
              <p className="text-2xl font-bold">⭐ {product.rating}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">レビュー数</p>
              <p className="text-2xl font-bold">{product.reviews}件</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">価格</p>
              <p className="text-2xl font-bold">{product.price}円</p>
            </div>
          </div>

          <p className="mt-5">
            販売状況：{product.active ? "販売中" : "販売終了"}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">レビュー</h2>

          <Link
  href="/review/new"
  className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
>
  レビューを書く
</Link>
        </div>

        <div className="mt-5 grid gap-4">
          {product.reviewList.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </main>
  );
}