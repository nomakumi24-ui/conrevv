import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-6xl p-6">
        <input
          type="text"
          placeholder="商品名で検索..."
          className="mb-8 w-full rounded-lg border p-3"
        />

        <h2 className="mb-5 text-2xl font-bold">🔥 人気の商品</h2>

        <div className="grid gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}