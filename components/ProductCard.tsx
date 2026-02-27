'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Check, X } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import type { Product, ShopifyProductVariant } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<'idle' | 'picking' | 'added'>('idle');
  const [selected, setSelected] = useState<Record<string, string>>({});

  const img1 = product.images[0];
  const img2 = product.images[1] ?? img1;
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);

  // Options that have more than 1 value — these need user input
  const pickableOptions = product.options.filter(o => o.values.length > 1);
  const needsPicker = pickableOptions.length > 0;

  // Pre-select options that have only one value
  useEffect(() => {
    const init: Record<string, string> = {};
    product.options.forEach(opt => {
      if (opt.values.length === 1) init[opt.name] = opt.values[0];
    });
    setSelected(init);
  }, [product]);

  // Find the variant that matches the current selection
  function findVariant(): ShopifyProductVariant | null {
    if (Object.keys(selected).length !== product.options.length) return null;
    return (
      product.variants.find(v =>
        v.selectedOptions.every(so => selected[so.name] === so.value)
      ) ?? null
    );
  }

  // Is a specific option value available given the other current selections?
  function isAvailable(optName: string, value: string): boolean {
    return product.variants.some(v => {
      if (!v.availableForSale) return false;
      if (!v.selectedOptions.some(so => so.name === optName && so.value === value)) return false;
      for (const [k, val] of Object.entries(selected)) {
        if (k === optName) continue;
        if (!v.selectedOptions.some(so => so.name === k && so.value === val)) return false;
      }
      return true;
    });
  }

  function resetSelected() {
    const init: Record<string, string> = {};
    product.options.forEach(opt => {
      if (opt.values.length === 1) init[opt.name] = opt.values[0];
    });
    setSelected(init);
  }

  function handleQuickAddClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (mode === 'added') return;
    if (!needsPicker) {
      const variant = product.variants[0];
      if (!variant?.availableForSale) return;
      addItem({
        variantId: variant.id,
        title: product.title,
        handle: product.handle,
        price: product.price,
        image: img1?.url ?? null,
        selectedOptions: variant.selectedOptions,
      });
      setMode('added');
      setTimeout(() => setMode('idle'), 2000);
    } else {
      setMode('picking');
    }
  }

  function handleConfirm(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const variant = findVariant();
    if (!variant?.availableForSale) return;
    addItem({
      variantId: variant.id,
      title: product.title,
      handle: product.handle,
      price: parseFloat(variant.price.amount),
      image: img1?.url ?? null,
      selectedOptions: variant.selectedOptions,
    });
    setMode('added');
    setTimeout(() => { setMode('idle'); resetSelected(); }, 2200);
  }

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setMode('idle');
    resetSelected();
  }

  function handleOptionSelect(e: React.MouseEvent, optName: string, value: string) {
    e.preventDefault();
    e.stopPropagation();
    setSelected(s => ({ ...s, [optName]: value }));
  }

  const selectedVariant = findVariant();
  const allSelected = Object.keys(selected).length === product.options.length;
  const canAdd = allSelected && !!selectedVariant?.availableForSale;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (mode === 'picking') {
          setMode('idle');
          resetSelected();
        }
      }}
    >
      {/* Image + quick-add area */}
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

        {/* ── Picker overlay ── */}
        {mode === 'picking' && (
          <div
            className="absolute inset-x-2 bottom-2 bg-arvenzo-cream rounded-2xl p-3 shadow-xl z-20"
            onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          >
            {/* Close */}
            <button
              onClick={handleCancel}
              className="absolute top-2 right-2 text-arvenzo-muted hover:text-arvenzo-ink transition-colors"
              aria-label="Sluiten"
            >
              <X size={13} />
            </button>

            {pickableOptions.map(opt => {
              const isColor = opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'kleur';
              return (
                <div key={opt.name} className="mb-2 last:mb-0">
                  <p className="text-[10px] font-sans font-medium text-arvenzo-muted uppercase tracking-wide mb-1.5">
                    {opt.name}{selected[opt.name] && isColor ? ` — ${selected[opt.name]}` : ''}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {opt.values.map(val => {
                      const avail = isAvailable(opt.name, val);
                      const active = selected[opt.name] === val;
                      if (isColor) {
                        return (
                          <button
                            key={val}
                            title={val}
                            onClick={e => avail && handleOptionSelect(e, opt.name, val)}
                            className={`w-5 h-5 rounded-full transition-all ${
                              active ? 'ring-2 ring-offset-1 ring-arvenzo-ink scale-110' : ''
                            } ${!avail ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                            style={{ backgroundColor: colorHex(val) }}
                          />
                        );
                      }
                      return (
                        <button
                          key={val}
                          onClick={e => avail && handleOptionSelect(e, opt.name, val)}
                          className={`px-2 py-0.5 text-[11px] font-sans rounded-lg border transition-all leading-5 ${
                            active
                              ? 'bg-arvenzo-ink text-arvenzo-cream border-arvenzo-ink'
                              : avail
                              ? 'bg-white text-arvenzo-ink border-arvenzo-cream-dark hover:border-arvenzo-ink'
                              : 'bg-arvenzo-cream-dark text-arvenzo-muted border-arvenzo-cream-dark line-through cursor-not-allowed opacity-40'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleConfirm}
              disabled={!canAdd}
              className="mt-2.5 w-full py-2 rounded-xl text-xs font-heading font-bold tracking-wide transition-all disabled:bg-arvenzo-cream-dark disabled:text-arvenzo-muted disabled:cursor-not-allowed bg-arvenzo-brown text-arvenzo-cream hover:bg-arvenzo-brown-light active:scale-[0.98]"
            >
              {canAdd ? 'Toevoegen →' : 'Kies opties'}
            </button>
          </div>
        )}

        {/* ── Quick-add button (idle / added) ── */}
        {mode !== 'picking' && (
          <div className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${hovered || mode === 'added' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <button
              onClick={handleQuickAddClick}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-heading font-semibold tracking-wide transition-all active:scale-[0.97] ${
                mode === 'added'
                  ? 'bg-green-600 text-white'
                  : 'bg-arvenzo-ink text-arvenzo-cream hover:bg-arvenzo-brown'
              }`}
            >
              {mode === 'added'
                ? <><Check size={15} /> Toegevoegd</>
                : <><ShoppingBag size={15} /> Snel toevoegen</>
              }
            </button>
          </div>
        )}
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
