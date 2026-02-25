import { getAllProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collectie',
  description: 'Ontdek alle 28 Arvenzo producten: hoodies, sweatshirts, shirts en mugs.',
};

export const revalidate = 300;

const TYPE_LABELS: Record<string, string> = {
  Hoodies: 'Hoodies',
  Sweatshirts: 'Sweatshirts',
  'Unisex-Shirts': 'Shirts',
  'Trinkgefäße': 'Mugs',
};

interface Props {
  searchParams: { type?: string; collection?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const allProducts = await getAllProducts();

  const typeFilter = searchParams.type;
  const filtered = typeFilter
    ? allProducts.filter(p => p.productType === typeFilter)
    : allProducts;

  const types = Array.from(new Set(allProducts.map(p => p.productType).filter(Boolean)));

  return (
    <div className="min-h-screen bg-arvenzo-light">
      {/* Header */}
      <div className="bg-arvenzo-ink pt-[96px] pb-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-3">
            {filtered.length} producten
          </p>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-arvenzo-cream">
            {typeFilter ? (TYPE_LABELS[typeFilter] ?? typeFilter) : 'Alle producten'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <a href="/products" className={`px-5 py-2 rounded-full border text-sm font-sans font-medium transition-all ${!typeFilter ? 'bg-arvenzo-ink text-arvenzo-cream border-arvenzo-ink' : 'border-arvenzo-cream-dark text-arvenzo-ink hover:border-arvenzo-ink/40'}`}>
            Alles ({allProducts.length})
          </a>
          {types.map(type => (
            <a
              key={type}
              href={`/products?type=${encodeURIComponent(type)}`}
              className={`px-5 py-2 rounded-full border text-sm font-sans font-medium transition-all ${typeFilter === type ? 'bg-arvenzo-ink text-arvenzo-cream border-arvenzo-ink' : 'border-arvenzo-cream-dark text-arvenzo-ink hover:border-arvenzo-ink/40'}`}
            >
              {TYPE_LABELS[type] ?? type} ({allProducts.filter(p => p.productType === type).length})
            </a>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-heading font-semibold text-2xl text-arvenzo-ink">Geen producten gevonden</p>
            <a href="/products" className="mt-4 inline-block text-arvenzo-brown hover:text-arvenzo-orange transition-colors font-sans">
              Bekijk alles →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
