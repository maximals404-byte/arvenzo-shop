import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductByHandle, getAllProducts, formatPrice, getDiscountPercentage } from '@/lib/shopify';
import { getProductReviews } from '@/lib/judgeme';
import ProductGallery from '@/components/ProductGallery';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/ProductCard';
import ProductUpsell from '@/components/ProductUpsell';
import ReviewSection from '@/components/ReviewSection';
import type { Product } from '@/lib/types';

interface PageProps { params: { handle: string } }

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export const revalidate = 300;

export default async function ProductPage({ params }: PageProps) {
  const [product, allProducts, reviewData] = await Promise.all([
    getProductByHandle(params.handle),
    getAllProducts(),
    getProductReviews(params.handle),
  ]);

  if (!product) notFound();

  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const related = allProducts
    .filter(p => p.productType === product.productType && p.handle !== product.handle)
    .slice(0, 4);

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-[100px] pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <a href="/" className="hover:text-arvenzo-brown transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-arvenzo-brown transition-colors">Shop</a>
          <span>/</span>
          <span className="text-arvenzo-ink">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {discount && (
                <span className="bg-arvenzo-brown text-arvenzo-cream text-[11px] font-heading font-bold px-3 py-1 rounded-full tracking-wide">
                  -{discount}% KORTING
                </span>
              )}
              <span className="bg-arvenzo-orange/15 text-arvenzo-brown text-[11px] font-semibold px-3 py-1 rounded-full border border-arvenzo-orange/20">
                Limited Edition
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-arvenzo-ink leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-heading font-black text-2xl text-arvenzo-ink">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="font-sans text-lg text-arvenzo-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Stars */}
            <ReviewSection data={reviewData} variant="inline" />

            <div className="border-t border-arvenzo-cream-dark my-6" />

            {/* Variants + Add to cart */}
            <ProductDetailClient product={product} />

            <div className="border-t border-arvenzo-cream-dark my-6" />

            {/* Trust mini-bar */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { e: '🚚', t: 'Gratis v.a. €50' },
                { e: '↩️', t: '14 dagen retour' },
                { e: '🌍', t: 'Gedrukt in Europa' },
              ].map(i => (
                <div key={i.t} className="flex flex-col items-center text-center p-3 bg-arvenzo-cream rounded-xl gap-1.5">
                  <span className="text-xl">{i.e}</span>
                  <span className="text-[11px] font-sans text-arvenzo-muted leading-snug">{i.t}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer py-3 border-t border-arvenzo-cream-dark font-heading font-semibold text-arvenzo-ink text-sm select-none">
                Productomschrijving
                <span className="group-open:rotate-180 transition-transform text-arvenzo-muted">↓</span>
              </summary>
              <div
                className="product-description pb-4 text-sm text-arvenzo-muted font-sans leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || `<p>${product.description}</p>` }}
              />
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer py-3 border-t border-arvenzo-cream-dark font-heading font-semibold text-arvenzo-ink text-sm select-none">
                Verzending & retouren
                <span className="group-open:rotate-180 transition-transform text-arvenzo-muted">↓</span>
              </summary>
              <div className="pb-4 text-sm text-arvenzo-muted font-sans leading-relaxed space-y-2">
                <p>• Gratis standaard verzending bij bestellingen vanaf €50</p>
                <p>• Levertijd: 3-7 werkdagen binnen België en Nederland</p>
                <p>• Retourneren binnen 14 dagen na ontvangst</p>
              </div>
            </details>

            <ProductUpsell currentProduct={product} allProducts={allProducts} />

            <ReviewSection data={reviewData} variant="full" />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-heading font-black text-2xl text-arvenzo-ink mb-8">Gerelateerde producten</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
