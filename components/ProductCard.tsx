'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const img1 = product.images[0];
  const img2 = product.images[1] ?? img1;
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const firstVariant = product.variants[0];

  async function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!firstVariant || added) return;
    addItem({
      variantId: firstVariant.id,
      title: product.title,
      handle: product.handle,
      price: product.price,
      image: img1?.url ?? null,
      selectedOptions: firstVariant.selectedOptions,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F0EAE4] aspect-square">
        {discount && (
          <div className="absolute top-3 left-3 z-10 bg-arvenzo-brown text-arvenzo-cream text-[11px] font-heading font-bold px-2.5 py-1 rounded-full tracking-wide">
            -{discount}%
          </div>
        )}

        {img1 && (
          <>
            <Image
              src={img1.url}
              alt={img1.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-contain p-5 transition-all duration-700 ${hovered && img2 !== img1 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            />
            {img2 && img2 !== img1 && (
              <Image
                src={img2.url}
                alt={img2.altText ?? product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-contain p-5 absolute inset-0 transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              />
            )}
          </>
        )}

        {/* Quick add */}
        <div className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <button
            onClick={handleQuickAdd}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-heading font-semibold tracking-wide transition-all active:scale-[0.97] ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-arvenzo-ink text-arvenzo-cream hover:bg-arvenzo-brown'
            }`}
          >
            {added ? <><Check size={15} /> Toegevoegd</> : <><ShoppingBag size={15} /> Snel toevoegen</>}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3.5 space-y-1">
        <h3 className="font-heading font-semibold text-arvenzo-ink text-[15px] leading-snug group-hover:text-arvenzo-brown transition-colors">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-sans font-medium text-arvenzo-ink text-[15px]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="font-sans text-sm text-arvenzo-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {product.options.find(o => o.name === 'Color' || o.name === 'Kleur') && (
          <div className="flex gap-1.5 pt-0.5">
            {product.options.find(o => o.name === 'Color' || o.name === 'Kleur')!
              .values.slice(0, 5).map((c) => (
                <div key={c} title={c} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: colorHex(c) }} />
              ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function colorHex(name: string): string {
  const map: Record<string, string> = {
    'arctic white': '#F5F5F3', 'white': '#FFFFFF', 'baby pink': '#F4A5C0',
    burgundy: '#8B2244', 'bottle green': '#1E4D2B', 'deep black': '#1A1A1A',
    'hot chocolate': '#5C3317', 'heather grey': '#B5B5B5', 'royal blue': '#1E40AF',
    'oxford navy': '#1B2A4A', 'steel grey': '#708090', 'airforce blue': '#5D8AA8',
    'hot pink': '#FF69B4', 'jet black': '#0D0D0D', 'urban navy': '#2C3E6B',
    navy: '#001F5B', sand: '#C2A882', gold: '#D4AF37', red: '#CC2222',
    'kelly green': '#4CBB17', 'sky blue': '#87CEEB', 'swimming pool': '#00B5CC',
    'urban purple': '#6B4C7A', 'sports grey (meliert)': '#9E9E9E', sorbet: '#FFAD9F',
    black: '#111111',
  };
  return map[name.toLowerCase()] ?? '#CCCCCC';
}
