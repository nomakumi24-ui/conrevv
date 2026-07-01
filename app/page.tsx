import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
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
        <h2 className="mb-5 text-2xl font-bold">🔥 人気の商品</h2>

        <div className="grid gap-5">
          {products.map((product) => (
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
          ))}
        </div>
      </section>
    </main>
  );
}