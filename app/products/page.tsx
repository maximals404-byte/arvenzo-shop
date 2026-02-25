import { getAllProducts } from '@/lib/shopify';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';
import type { Product } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Collectie',
  description: 'Ontdek de volledige Arvenzo collectie: hoodies, sweatshirts en accessoires.',
};

export const revalidate = 60;

interface PageProps {
  searchParams: { type?: string; sort?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  let allProducts: Product[] = MOCK_PRODUCTS;

  if (
    process.env.SHOPIFY_STORE_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
    try {
      allProducts = await getAllProducts(50);
    } catch (err) {
      console.warn('Using mock data:', err);
    }
  }

  // Filter by type
  const typeFilter = searchParams.type;
  const products = typeFilter
    ? allProducts.filter((p) =>
        p.productType.toLowerCase() === typeFilter.toLowerCase()
      )
    : allProducts;

  const categories = Array.from(new Set(allProducts.map((p) => p.productType).filter(Boolean)));

  return (
    <div className="pt-24 pb-20 min-h-screen bg-arvenzo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="py-12 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-arvenzo-dark">
            {typeFilter ?? 'Onze Collectie'}
          </h1>
          <p className="mt-3 text-arvenzo-muted font-sans text-lg">
            {products.length} {products.length === 1 ? 'product' : 'producten'}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <a
            href="/products"
            className={`px-5 py-2 rounded-full border text-sm font-medium font-sans transition-all ${
              !typeFilter
                ? 'bg-arvenzo-brown text-arvenzo-cream border-arvenzo-brown'
                : 'border-arvenzo-cream-dark text-arvenzo-dark hover:border-arvenzo-brown/50'
            }`}
          >
            Alles
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/products?type=${encodeURIComponent(cat)}`}
              className={`px-5 py-2 rounded-full border text-sm font-medium font-sans transition-all ${
                typeFilter === cat
                  ? 'bg-arvenzo-brown text-arvenzo-cream border-arvenzo-brown'
                  : 'border-arvenzo-cream-dark text-arvenzo-dark hover:border-arvenzo-brown/50'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-heading font-semibold text-xl text-arvenzo-dark">
              Geen producten gevonden
            </p>
            <a
              href="/products"
              className="mt-4 inline-block text-arvenzo-brown font-sans hover:text-arvenzo-orange transition-colors"
            >
              Bekijk alle producten
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
