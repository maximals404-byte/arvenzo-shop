import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';
import type { Product } from '@/lib/types';

interface Props {
  currentProduct: Product;
  allProducts: Product[];
}

// Suggest 2 products from the same collection but different type
export default function ProductUpsell({ currentProduct, allProducts }: Props) {
  // Find collection name (first 1-2 words of title)
  const collectionWords = currentProduct.title.split(' ').slice(0, 2).join(' ').toLowerCase();

  const suggestions = allProducts
    .filter(p =>
      p.handle !== currentProduct.handle &&
      p.title.toLowerCase().startsWith(collectionWords) &&
      p.productType !== currentProduct.productType
    )
    .slice(0, 3);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 p-5 bg-arvenzo-cream-dark rounded-2xl border border-arvenzo-cream-dark">
      <p className="text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-arvenzo-muted mb-4">
        Compleet de look
      </p>
      <div className="flex flex-col gap-3">
        {suggestions.map(p => (
          <Link
            key={p.id}
            href={`/products/${p.handle}`}
            className="flex items-center gap-4 bg-arvenzo-cream rounded-xl p-3 hover:shadow-sm transition-all group"
          >
            {p.images[0] && (
              <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-[#F0EAE4]">
                <Image
                  src={p.images[0].url}
                  alt={p.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-arvenzo-ink text-sm group-hover:text-arvenzo-brown transition-colors truncate">
                {p.title}
              </p>
              <p className="text-xs text-arvenzo-muted font-sans mt-0.5">{p.productType}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-heading font-bold text-arvenzo-ink text-sm">{formatPrice(p.price)}</p>
              <p className="text-[10px] text-arvenzo-orange font-sans mt-0.5">+ toevoegen →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
