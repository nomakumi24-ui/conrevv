"use client";

import { useMemo, useState } from "react";

import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { products } from "@/data/products";

export default function Home() {
  const [keyword, setKeyword] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

if (!normalizedKeyword) {
  return products;
}

return products.filter((product) => {
  const searchTargets = [
    product.name,
    product.store,
    product.category,
    ...product.aliases,
  ];

  return searchTargets.some((target) =>
    target.toLowerCase().includes(normalizedKeyword)
  );
});
  }, [keyword]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-6xl p-6">

        <SearchBar
          value={keyword}
          onChange={setKeyword}
        />

        <h2 className="mb-5 text-2xl font-bold">

          🔥 人気の商品

        </h2>

        <div className="grid gap-5">

          {filteredProducts.length === 0 && (

            <div className="rounded-xl bg-white p-10 text-center">

              商品が見つかりませんでした。

            </div>

          )}

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </section>

    </main>
  );
}