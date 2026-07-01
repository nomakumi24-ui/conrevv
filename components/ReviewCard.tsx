import type { Review } from "@/types/product";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-center justify-between gap-3">
        <p className="font-bold">{review.userName}</p>
        <p className="text-lg">{"⭐".repeat(review.rating)}</p>
      </div>

      <p className="mt-3 text-gray-700">{review.comment}</p>

      <p className="mt-3 text-sm text-gray-500">
        また買う？ {review.wouldBuyAgain ? "はい" : "いいえ"}
      </p>
    </article>
  );
}