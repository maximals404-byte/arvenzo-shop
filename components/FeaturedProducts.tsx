import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';

export default function FeaturedProducts({ products }: { products: Product[] }) {
  // Pick the 4 "flagship" products — one hoodie per collection (first 4)
  const featured = products
    .filter(p => p.productType === 'Hoodies')
    .slice(0, 4);

  return (
    <section className="py-20 bg-arvenzo-light">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-2">
              Bestsellers
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-arvenzo-ink">
              Meest geliefd
            </h2>
          </div>
          <Link href="/products?type=Hoodies" className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-brown transition-colors">
            Alle hoodies →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
