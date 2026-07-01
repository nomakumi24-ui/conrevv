import Link from "next/link";
import { Header } from "@/components/Header";
import { products } from "@/data/products";

export default function NewReviewPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
        <Link href="/" className="text-emerald-700 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">レビューを書く</h1>
          <p className="mt-2 text-gray-600">
            食べた商品の感想を投稿できます。
          </p>

          <form className="mt-6 grid gap-5">
            <div>
              <label className="font-bold">商品</label>
              <select className="mt-2 w-full rounded-lg border p-3">
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.store} / {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold">評価</label>
              <select className="mt-2 w-full rounded-lg border p-3">
                <option value="5">★★★★★ 5</option>
                <option value="4">★★★★☆ 4</option>
                <option value="3">★★★☆☆ 3</option>
                <option value="2">★★☆☆☆ 2</option>
                <option value="1">★☆☆☆☆ 1</option>
              </select>
            </div>

            <div>
              <label className="font-bold">コメント</label>
              <textarea
                placeholder="例：味が濃くてご飯が進む。また買いたい。"
                className="mt-2 min-h-32 w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-bold">また買う？</label>
              <select className="mt-2 w-full rounded-lg border p-3">
                <option value="true">はい</option>
                <option value="false">いいえ</option>
              </select>
            </div>

            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
            >
              レビューを投稿
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}