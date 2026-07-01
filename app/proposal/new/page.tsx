import Link from "next/link";
import { Header } from "@/components/Header";

export default function NewProposalPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
        <Link href="/" className="text-emerald-700 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">商品情報の編集提案</h1>
          <p className="mt-2 text-gray-600">
            商品名の修正、販売終了、リニューアルなどを提案できます。
          </p>

<div className="mt-5">
  <Link
    href="/proposal/new"
    className="text-emerald-700 hover:underline"
  >
    商品情報の修正を提案する
  </Link>
</div>
          <form className="mt-6 grid gap-5">
            <div>
              <label className="font-bold">提案の種類</label>
              <select className="mt-2 w-full rounded-lg border p-3">
                <option>商品名の修正</option>
                <option>販売終了</option>
                <option>リニューアル</option>
                <option>写真変更</option>
                <option>その他</option>
              </select>
            </div>

            <div>
              <label className="font-bold">対象商品名</label>
              <input
                type="text"
                placeholder="例：牛カルビ弁当"
                className="mt-2 w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-bold">変更後の内容</label>
              <input
                type="text"
                placeholder="例：炙りカルビ弁当"
                className="mt-2 w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-bold">理由・補足</label>
              <textarea
                placeholder="例：パッケージの商品名が変更されていたため"
                className="mt-2 min-h-32 w-full rounded-lg border p-3"
              />
            </div>

            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
            >
              提案を送信
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}