'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

export default function CartCrossSell() {
  const { items, addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .catch(() => {});
  }, []);

  const cartHandles = new Set(items.map(i => i.handle));

  // Prioritise mugs (impulse-buy), then other types not yet in cart
  const suggestions = [
    ...products.filter(p => p.productType === 'Trinkgefäße' && !cartHandles.has(p.handle)),
    ...products.filter(p => p.productType !== 'Trinkgefäße' && !cartHandles.has(p.handle)),
  ].slice(0, 3);

  if (!items.length || suggestions.length === 0) return null;

  function handleAdd(product: Product) {
    const variant = product.variants[0];
    if (!variant) return;
    addItem({
      variantId: variant.id,
      title: product.title,
      handle: product.handle,
      price: product.price,
      image: product.images[0]?.url ?? null,
      selectedOptions: variant.selectedOptions,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  }

  return (
    <div className="px-6 py-4 border-t border-arvenzo-cream-dark">
      <p className="text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-arvenzo-muted mb-3">
        Klanten kochten ook
      </p>
      <div className="flex flex-col gap-2">
        {suggestions.map(p => (
          <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-arvenzo-cream-dark transition-colors group">
            <Link href={`/products/${p.handle}`} className="shrink-0 w-12 h-12 rounded-lg bg-[#F0EAE4] overflow-hidden">
              {p.images[0] && (
                <Image src={p.images[0].url} alt={p.title} width={48} height={48}
                  className="w-full h-full object-contain p-1" />
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${p.handle}`}
                className="font-heading font-semibold text-arvenzo-ink text-xs leading-snug hover:text-arvenzo-brown transition-colors block truncate">
                {p.title}
              </Link>
              <p className="text-xs text-arvenzo-muted font-sans">{formatPrice(p.price)}</p>
            </div>
            <button
              onClick={() => handleAdd(p)}
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                added === p.id ? 'bg-green-600 text-white' : 'bg-arvenzo-brown text-arvenzo-cream hover:bg-arvenzo-brown-light'
              }`}
              aria-label={`${p.title} toevoegen`}
            >
              {added === p.id ? <Check size={13} /> : <Plus size={13} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
