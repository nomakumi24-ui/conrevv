import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      aliases: true,
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const averageRating =
    product.reviews.length === 0
      ? 0
      : product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length;

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

          <p className="mt-3 text-gray-700">
            {product.description ?? "商品説明はまだありません。"}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">評価</p>
              <p className="text-2xl font-bold">
                ⭐ {averageRating.toFixed(1)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">レビュー数</p>
              <p className="text-2xl font-bold">
                {product.reviews.length}件
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">価格</p>
              <p className="text-2xl font-bold">
                {product.price ? `${product.price}円` : "不明"}
              </p>
            </div>
          </div>

          <p className="mt-5">
            販売状況：{product.active ? "販売中" : "販売終了"}
          </p>

          <div className="mt-5">
            <Link
              href="/proposal/new"
              className="text-emerald-700 hover:underline"
            >
              商品情報の修正を提案する
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">レビュー</h2>

          <Link
            href={`/review/new?productId=${product.id}`}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
          >
            レビューを書く
          </Link>
        </div>

        <div className="mt-5 grid gap-4">
          {product.reviews.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-gray-600 shadow">
              まだレビューはありません。
            </div>
          ) : (
            product.reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={{
                  id: review.id,
                  userName: "匿名ユーザー",
                  rating: review.rating,
                  comment: review.comment,
                  wouldBuyAgain: review.buyAgain,
                }}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}