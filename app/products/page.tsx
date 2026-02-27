import { getAllProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Collectie | Arvenzo',
  description: 'Ontdek alle Arvenzo producten: hoodies, sweatshirts, shirts en mugs.',
  alternates: { canonical: 'https://www.arvenzo.be/products' },
};

export const revalidate = 300;

const TYPE_LABELS: Record<string, string> = {
  Hoodies: 'Hoodies',
  Sweatshirts: 'Sweatshirts',
  'Unisex-Shirts': 'Shirts',
  'Trinkgefäße': 'Mugs',
};

const SORT_OPTIONS = [
  { value: '', label: 'Standaard' },
  { value: 'price-asc', label: 'Prijs: laag → hoog' },
  { value: 'price-desc', label: 'Prijs: hoog → laag' },
  { value: 'name-asc', label: 'Naam A → Z' },
];

function sortProducts(products: Product[], sort: string): Product[] {
  const arr = [...products];
  if (sort === 'price-asc') return arr.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return arr.sort((a, b) => b.price - a.price);
  if (sort === 'name-asc') return arr.sort((a, b) => a.title.localeCompare(b.title, 'nl'));
  return arr;
}

interface Props {
  searchParams: { type?: string; sort?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const allProducts = await getAllProducts();

  const typeFilter = searchParams.type ?? '';
  const sortParam = searchParams.sort ?? '';

  const filtered = typeFilter
    ? allProducts.filter(p => p.productType === typeFilter)
    : allProducts;

  const sorted = sortProducts(filtered, sortParam);
  const types = Array.from(new Set(allProducts.map(p => p.productType).filter(Boolean)));

  function buildUrl(type: string, sort: string) {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (sort) params.set('sort', sort);
    const q = params.toString();
    return `/products${q ? `?${q}` : ''}`;
  }

  return (
    <div className="min-h-screen bg-arvenzo-light">
      {/* Page header */}
      <div className="bg-arvenzo-ink pt-[96px] pb-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-3">
            {sorted.length} producten
          </p>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-arvenzo-cream">
            {typeFilter ? (TYPE_LABELS[typeFilter] ?? typeFilter) : 'Alle producten'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Filter + sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2">
            <a
              href={buildUrl('', sortParam)}
              className={`px-4 py-2 rounded-full border text-sm font-sans font-medium transition-all ${
                !typeFilter
                  ? 'bg-arvenzo-ink text-arvenzo-cream border-arvenzo-ink'
                  : 'border-arvenzo-cream-dark text-arvenzo-ink hover:border-arvenzo-ink/40'
              }`}
            >
              Alles ({allProducts.length})
            </a>
            {types.map(type => (
              <a
                key={type}
                href={buildUrl(type, sortParam)}
                className={`px-4 py-2 rounded-full border text-sm font-sans font-medium transition-all ${
                  typeFilter === type
                    ? 'bg-arvenzo-ink text-arvenzo-cream border-arvenzo-ink'
                    : 'border-arvenzo-cream-dark text-arvenzo-ink hover:border-arvenzo-ink/40'
                }`}
              >
                {TYPE_LABELS[type] ?? type} ({allProducts.filter(p => p.productType === type).length})
              </a>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-sans uppercase tracking-widest text-arvenzo-muted">Sorteren</span>
            <div className="flex gap-1 flex-wrap">
              {SORT_OPTIONS.map(opt => (
                <a
                  key={opt.value}
                  href={buildUrl(typeFilter, opt.value)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-sans font-medium transition-all ${
                    sortParam === opt.value
                      ? 'bg-arvenzo-brown text-arvenzo-cream border-arvenzo-brown'
                      : 'border-arvenzo-cream-dark text-arvenzo-muted hover:border-arvenzo-brown/40 hover:text-arvenzo-ink'
                  }`}
                >
                  {opt.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sorted.map(p => (
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
