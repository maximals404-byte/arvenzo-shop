'use client';

import { useState, useCallback } from 'react';
import VariantSelector from '@/components/VariantSelector';
import AddToCart from '@/components/AddToCart';
import type { Product, ShopifyProductVariant } from '@/lib/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    product.variants.find(v => v.availableForSale) ?? product.variants[0] ?? null
  );

  const handleVariantChange = useCallback((v: ShopifyProductVariant | null) => {
    setSelectedVariant(v);
  }, []);

  return (
    <div className="space-y-6">
      <VariantSelector
        options={product.options}
        variants={product.variants}
        onVariantChange={handleVariantChange}
      />
      <AddToCart variant={selectedVariant} product={product} />
    </div>
  );
}
