import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { prisma } from "@/lib/prisma";

async function createProposal(formData: FormData) {
  "use server";

  const type = String(formData.get("type"));
  const productIdValue = formData.get("productId");
  const productId = productIdValue ? String(productIdValue) : null;
  const productName = String(formData.get("productName"));
  const newValue = String(formData.get("newValue"));
  const reason = String(formData.get("reason"));

  if (!type || !reason) {
    throw new Error("入力内容が不足しています。");
  }

  if (type === "商品追加") {
    if (!productName) {
      throw new Error("商品名を入力してください。");
    }

    await prisma.proposal.create({
      data: {
        type,
        newValue: productName,
        reason,
      },
    });
  } else {
    if (!productId) {
      throw new Error("対象商品が選択されていません。");
    }

    await prisma.proposal.create({
      data: {
        type,
        productId,
        newValue,
        reason,
      },
    });
  }

  redirect("/");
}

export default async function ProposalPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
        <Link href="/" className="text-emerald-600 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">商品情報の提案</h1>

          <form action={createProposal} className="mt-6 grid gap-5">
            <div>
              <label className="font-bold">提案内容</label>
              <select name="type" className="mt-2 w-full rounded-lg border p-3">
                <option>商品追加</option>
                <option>商品名変更</option>
                <option>販売終了</option>
                <option>価格変更</option>
                <option>画像変更</option>
                <option>Alias追加</option>
              </select>
            </div>

            <div>
              <label className="font-bold">対象商品（修正提案の場合）</label>
              <select name="productId" className="mt-2 w-full rounded-lg border p-3">
                <option value="">商品追加の場合は選択不要</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.store} / {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold">商品追加時の商品名</label>
              <input
                name="productName"
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="例：新作カルビ弁当"
              />
            </div>

            <div>
              <label className="font-bold">変更内容</label>
              <input
                name="newValue"
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="変更後の内容"
              />
            </div>

            <div>
              <label className="font-bold">理由</label>
              <textarea
                name="reason"
                required
                className="mt-2 min-h-32 w-full rounded-lg border p-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-emerald-500 py-3 font-bold text-white hover:bg-emerald-600"
            >
              提案を送信
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}