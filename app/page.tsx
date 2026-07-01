import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

type HomeProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;
  const keyword = q?.trim() ?? "";

  const products = await prisma.product.findMany({
    where: keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              store: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              aliases: {
                some: {
                  keyword: {
                    contains: keyword,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : undefined,
    include: {
      aliases: true,
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-6xl p-6">
        <form action="/" className="mb-8 flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={keyword}
            placeholder="商品名・コンビニ名・別名で検索..."
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-5 py-2 font-bold text-white hover:bg-emerald-700"
          >
            検索
          </button>
        </form>

        <h2 className="mb-5 text-2xl font-bold">
          {keyword ? `「${keyword}」の検索結果` : "🔥 人気の商品"}
        </h2>

        <div className="grid gap-5">
          {products.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
              商品が見つかりませんでした。
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  store: product.store,
                  name: product.name,
                  aliases: product.aliases.map((alias) => alias.keyword),
                  rating:
                    product.reviews.length === 0
                      ? 0
                      : product.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0
                        ) / product.reviews.length,
                  reviews: product.reviews.length,
                  category: product.category,
                  active: product.active,
                  price: product.price ?? 0,
                  description: product.description ?? "",
                  imageUrl: product.imageUrl ?? undefined,
                  reviewList: [],
                }}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}