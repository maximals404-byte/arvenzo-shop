import type { JudgeMeAggregated, JudgeMeReview } from '@/lib/types';

// ─── Star helpers ─────────────────────────────────────────────────────────────

const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const dim = size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${dim} ${i < Math.round(rating) ? 'text-arvenzo-orange' : 'text-arvenzo-cream-dark'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

// ─── Review card (used in full variant) ──────────────────────────────────────

function ReviewCard({ review }: { review: JudgeMeReview }) {
  const date = new Date(review.created_at).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-arvenzo-cream-dark space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <StarRow rating={review.rating} size="xs" />
          {review.title && (
            <p className="font-heading font-semibold text-arvenzo-ink text-sm">{review.title}</p>
          )}
        </div>
        {review.verified_buyer && (
          <span className="shrink-0 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-arvenzo-brown/10 text-arvenzo-brown border border-arvenzo-brown/20">
            Geverifieerde koper
          </span>
        )}
      </div>

      {review.body && (
        <p className="text-sm text-arvenzo-muted font-sans leading-relaxed">
          &ldquo;{review.body}&rdquo;
        </p>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-arvenzo-cream-dark">
        <span className="text-xs font-sans font-medium text-arvenzo-ink">{review.reviewer.name}</span>
        <span className="text-[11px] font-sans text-arvenzo-muted">{date}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ReviewSectionProps {
  data: JudgeMeAggregated;
  variant: 'inline' | 'full';
}

export default function ReviewSection({ data, variant }: ReviewSectionProps) {
  const { averageRating, totalCount, reviews } = data;

  // ── Inline variant: replaces the hardcoded stars block ───────────────────
  if (variant === 'inline') {
    if (totalCount === 0) {
      return (
        <div className="flex items-center gap-2 mt-3 mb-7">
          <StarRow rating={0} />
          <span className="text-xs text-arvenzo-muted font-sans">Nog geen reviews</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-3 mb-7">
        <StarRow rating={averageRating} />
        <span className="text-xs text-arvenzo-muted font-sans">
          {averageRating.toFixed(1)} ({totalCount} {totalCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>
    );
  }

  // ── Full variant: review cards section ───────────────────────────────────
  if (reviews.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="font-heading font-bold text-lg text-arvenzo-ink">Klantreviews</h3>
        <div className="flex items-center gap-1.5">
          <StarRow rating={averageRating} size="xs" />
          <span className="text-xs text-arvenzo-muted font-sans">
            {averageRating.toFixed(1)} / 5 &middot; {totalCount} {totalCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
