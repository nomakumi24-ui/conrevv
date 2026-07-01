import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { prisma } from "@/lib/prisma";

type AdminProposalsPageProps = {
  searchParams: Promise<{
    secret?: string;
  }>;
};

async function approveProposal(formData: FormData) {
  "use server";

  const proposalId = String(formData.get("proposalId"));

  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId },
  });

  if (!proposal || proposal.status !== "PENDING") {
    return;
  }

  if (proposal.type === "商品名変更" && proposal.newValue) {
    await prisma.product.update({
      where: { id: proposal.productId },
      data: { name: proposal.newValue },
    });
  }

  if (proposal.type === "販売終了") {
    await prisma.product.update({
      where: { id: proposal.productId },
      data: { active: false },
    });
  }

  if (proposal.type === "価格変更" && proposal.newValue) {
    await prisma.product.update({
      where: { id: proposal.productId },
      data: { price: Number(proposal.newValue) },
    });
  }

  if (proposal.type === "Alias追加" && proposal.newValue) {
    await prisma.productAlias.create({
      data: {
        productId: proposal.productId,
        keyword: proposal.newValue,
      },
    });
  }

  await prisma.proposal.update({
    where: { id: proposalId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/");
  revalidatePath(`/product/${proposal.productId}`);
  revalidatePath("/admin/proposals");
}

async function rejectProposal(formData: FormData) {
  "use server";

  const proposalId = String(formData.get("proposalId"));

  await prisma.proposal.update({
    where: { id: proposalId },
    data: { status: "REJECTED" },
  });

  revalidatePath("/admin/proposals");
}

export default async function AdminProposalsPage({
  searchParams,
}: AdminProposalsPageProps) {
  const { secret } = await searchParams;

  if (secret !== process.env.ADMIN_SECRET) {
    redirect("/");
  }

  const proposals = await prisma.proposal.findMany({
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="mx-auto max-w-5xl p-6">
        <Link href="/" className="text-emerald-600 hover:underline">
          ← トップへ戻る
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">編集提案の承認</h1>
          <p className="mt-2 text-gray-600">
            ユーザーから届いた商品情報の修正提案を確認します。
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {proposals.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
              まだ提案はありません。
            </div>
          ) : (
            proposals.map((proposal) => (
              <article key={proposal.id} className="rounded-xl bg-white p-5 shadow">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {proposal.createdAt.toLocaleDateString("ja-JP")}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{proposal.type}</h3>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {proposal.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-gray-700">
                  <p>
                    <span className="font-bold">対象商品：</span>
                    {proposal.product.name}
                  </p>
                  <p>
                    <span className="font-bold">変更後：</span>
                    {proposal.newValue || "なし"}
                  </p>
                  <p>
                    <span className="font-bold">理由：</span>
                    {proposal.reason}
                  </p>
                </div>

                {proposal.status === "PENDING" && (
                  <div className="mt-5 flex gap-3">
                    <form action={approveProposal}>
                      <input type="hidden" name="proposalId" value={proposal.id} />
                      <button className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-600">
                        承認
                      </button>
                    </form>

                    <form action={rejectProposal}>
                      <input type="hidden" name="proposalId" value={proposal.id} />
                      <button className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
                        却下
                      </button>
                    </form>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}