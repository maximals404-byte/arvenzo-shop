'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { ShopifyProductVariant, Product } from '@/lib/types';

interface Props {
  variant: ShopifyProductVariant | null;
  product: Product;
}

export default function AddToCart({ variant, product }: Props) {
  const { addItem } = useCart();
  const [state, setState] = useState<'idle' | 'added'>('idle');

  const unavailable = !variant || !variant.availableForSale;

  function handleAdd() {
    if (!variant || state !== 'idle') return;
    addItem({
      variantId: variant.id,
      title: product.title,
      handle: product.handle,
      price: parseFloat(variant.price.amount),
      image: product.images[0]?.url ?? null,
      selectedOptions: variant.selectedOptions,
    });
    setState('added');
    setTimeout(() => setState('idle'), 2200);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={unavailable}
      className={`w-full flex items-center justify-center gap-2.5 py-4 px-8 rounded-full font-heading font-bold text-[15px] tracking-wide transition-all active:scale-[0.98] ${
        unavailable
          ? 'bg-arvenzo-cream-dark text-arvenzo-muted cursor-not-allowed'
          : state === 'added'
          ? 'bg-green-600 text-white'
          : 'bg-arvenzo-brown text-arvenzo-cream hover:bg-arvenzo-brown-light'
      }`}
    >
      {state === 'added' ? (
        <><Check size={18} /> Toegevoegd aan winkelwagen</>
      ) : unavailable ? (
        'Uitverkocht'
      ) : (
        <><ShoppingBag size={18} strokeWidth={1.5} /> Toevoegen aan winkelwagen</>
      )}
    </button>
  );
}
