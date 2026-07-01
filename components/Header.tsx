import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <Link href="/" className="group inline-block">
          <h1 className="text-3xl font-bold text-emerald-600 transition group-hover:text-emerald-700">
            🏪 コンレビ
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            コンビニ商品の口コミ・レビュー
          </p>
        </Link>

        <Link
          href="/review/new"
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-gray-900 transition hover:bg-amber-500"
        >
          レビューを書く
        </Link>
      </div>
    </header>
  );
}