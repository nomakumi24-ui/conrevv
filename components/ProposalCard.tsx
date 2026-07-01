import type { Proposal } from "@/types/proposal";

type ProposalCardProps = {
  proposal: Proposal;
};

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{proposal.createdAt}</p>
          <h3 className="mt-1 text-xl font-bold">{proposal.type}</h3>
        </div>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
          承認待ち
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-gray-700">
        <p>
          <span className="font-bold">対象商品：</span>
          {proposal.productName}
        </p>
        <p>
          <span className="font-bold">変更後：</span>
          {proposal.newValue}
        </p>
        <p>
          <span className="font-bold">理由：</span>
          {proposal.reason}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          承認
        </button>
        <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          却下
        </button>
      </div>
    </article>
  );
}