import type { JudgeMeAggregated } from './types';

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOP_DOMAIN ?? 'arvenzo.myshopify.com';
const API_TOKEN   = process.env.JUDGEME_API_TOKEN ?? '';

export async function getProductReviews(handle: string, perPage = 10): Promise<JudgeMeAggregated> {
  const fallback: JudgeMeAggregated = { reviews: [], averageRating: 0, totalCount: 0 };

  try {
    const url = `https://judge.me/api/v1/reviews?shop_domain=${SHOP_DOMAIN}&handle=${handle}&per_page=${perPage}&api_token=${API_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) return fallback;

    const data = await res.json();

    return {
      reviews:       data.reviews ?? [],
      averageRating: data.rating  ?? 0,
      totalCount:    data.count   ?? 0,
    };
  } catch {
    return fallback;
  }
}
