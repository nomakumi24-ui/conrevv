export default function Home() {
  const products = [
    {
      id: 1,
      store: "セブン-イレブン",
      name: "炙り焼き牛カルビ弁当",
      rating: 4.7,
      reviews: 123,
    },
    {
      id: 2,
      store: "ファミリーマート",
      name: "ファミチキ",
      rating: 4.8,
      reviews: 542,
    },
    {
      id: 3,
      store: "ローソン",
      name: "プレミアムロールケーキ",
      rating: 4.6,
      reviews: 301,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-emerald-600 text-white shadow">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold">🏪 コンレビ</h1>
          <p className="text-sm mt-2">
            コンビニ商品レビューコミュニティ
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto p-6">

        <input
          type="text"
          placeholder="商品名で検索..."
          className="w-full rounded-lg border p-3 mb-8"
        />

        <h2 className="text-2xl font-bold mb-5">
          🔥 人気の商品
        </h2>

        <div className="grid gap-5">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >

              <p className="text-gray-500">
                {product.store}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {product.name}
              </h3>

              <p className="mt-3 text-lg">
                ⭐ {product.rating}
              </p>

              <p className="text-gray-500">
                {product.reviews}件のレビュー
              </p>

              <button
                className="mt-4 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
              >
                レビューを見る
              </button>

            </div>

          ))}

        </div>

      </section>
    </main>
  );
}