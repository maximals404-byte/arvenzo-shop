import type { JudgeMeAggregated, JudgeMeReview } from '@/lib/types';

const FALLBACK_REVIEWS: JudgeMeReview[] = [
  { id: 1, title: '', body: 'Fantastische kwaliteit! De stof is superzacht en het design is prachtig. Zeker voor herhaling vatbaar.', rating: 5, reviewer: { name: 'Lena V.' }, created_at: '2024-11-01', verified_buyer: true },
  { id: 2, title: '', body: 'Snel geleverd en de kwaliteit is echt top. De print is scherp en helder — ziet er premium uit.', rating: 5, reviewer: { name: 'Thomas B.' }, created_at: '2024-11-15', verified_buyer: true },
  { id: 3, title: '', body: 'Heerlijk comfortabel. Goede maatvoering en de stof voelt echt premium aan. Aanrader!', rating: 5, reviewer: { name: 'Sarah M.' }, created_at: '2024-12-03', verified_buyer: true },
  { id: 4, title: '', body: 'Geweldig shirt, het design is erg uniek. Veel complimentjes gekregen. Top service ook!', rating: 5, reviewer: { name: 'Pieter D.' }, created_at: '2025-01-10', verified_buyer: true },
];

const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-arvenzo-orange' : 'text-arvenzo-cream-dark'}`}
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

function ReviewCard({ review }: { review: JudgeMeReview }) {
  const date = new Date(review.created_at).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-arvenzo-cream-dark rounded-2xl p-6 flex flex-col gap-4">
      <Stars rating={review.rating} />
      {review.body && (
        <p className="font-sans text-[14px] text-arvenzo-ink leading-relaxed flex-1">
          &ldquo;{review.body}&rdquo;
        </p>
      )}
      <div className="border-t border-arvenzo-cream pt-4 flex items-center justify-between">
        <div>
          <div className="font-heading font-semibold text-arvenzo-ink text-sm">{review.reviewer.name}</div>
          <div className="font-sans text-xs text-arvenzo-muted">{date}</div>
        </div>
        {review.verified_buyer && (
          <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-arvenzo-brown/10 text-arvenzo-brown border border-arvenzo-brown/20">
            Geverifieerd
          </span>
        )}
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${Math.floor(n / 100) * 100}+`;
  if (n >= 100)  return `${Math.floor(n / 10) * 10}+`;
  return String(n);
}

interface ReviewsProps {
  data: JudgeMeAggregated;
}

export default function Reviews({ data }: ReviewsProps) {
  const hasReal = data.reviews.length > 0;
  const reviews      = hasReal ? data.reviews      : FALLBACK_REVIEWS;
  const averageRating = hasReal ? data.averageRating : 4.9;
  const totalCount    = hasReal ? data.totalCount    : 0;

  return (
    <section className="py-20 bg-arvenzo-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-2">Reviews</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-arvenzo-ink">Wat klanten zeggen</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars rating={averageRating} />
            <span className="font-heading font-bold text-arvenzo-ink">{averageRating.toFixed(1)}</span>
            <span className="text-arvenzo-muted font-sans text-sm">
              {hasReal
                ? `op basis van ${formatCount(totalCount)} reviews`
                : 'op basis van klantreviews'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
