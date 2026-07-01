import Link from "next/link";
import { Header } from "@/components/Header";
import { ProposalCard } from "@/components/ProposalCard";
import { proposals } from "@/data/proposals";

export default function AdminProposalsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-5xl p-6">
        <Link href="/" className="text-emerald-700 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">編集提案の承認</h1>
          <p className="mt-2 text-gray-600">
            ユーザーから届いた商品情報の修正提案を確認します。
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>
    </main>
  );
}