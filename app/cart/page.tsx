'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/shopify';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, checkoutUrl, totalQuantity } = useCart();

  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-arvenzo-light flex items-center justify-center pt-24">
        <div className="text-center px-5">
          <div className="w-20 h-20 rounded-full bg-arvenzo-cream-dark flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={36} className="text-arvenzo-muted" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading font-black text-3xl text-arvenzo-ink mb-2">Winkelwagen is leeg</h1>
          <p className="text-arvenzo-muted font-sans mb-8">Voeg producten toe om verder te gaan.</p>
          <Link href="/products" className="inline-flex bg-arvenzo-brown text-arvenzo-cream font-heading font-bold px-8 py-4 rounded-full hover:bg-arvenzo-brown-light transition-colors">
            Bekijk collectie →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arvenzo-light pt-[96px] pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-10">
          Winkelwagen <span className="text-arvenzo-muted font-normal text-2xl">({totalQuantity})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.variantId} className="flex gap-5 bg-arvenzo-cream rounded-2xl p-5 border border-arvenzo-cream-dark group">
                <Link href={`/products/${item.handle}`} className="shrink-0 w-[90px] h-[90px] rounded-xl bg-[#F0EAE4] overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.title} width={90} height={90} className="w-full h-full object-contain p-1.5" />}
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${item.handle}`} className="font-heading font-bold text-arvenzo-ink hover:text-arvenzo-brown transition-colors">
                        {item.title}
                      </Link>
                      <p className="text-sm text-arvenzo-muted font-sans mt-0.5">
                        {item.selectedOptions.map(o => o.value).join(' · ')}
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.variantId)} className="p-1.5 text-arvenzo-muted hover:text-arvenzo-ink rounded-lg hover:bg-arvenzo-cream-dark transition-all opacity-0 group-hover:opacity-100">
                      <X size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-arvenzo-cream-dark rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-2.5 text-arvenzo-muted hover:text-arvenzo-ink hover:bg-arvenzo-cream-dark transition-all">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-arvenzo-ink text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-2.5 text-arvenzo-muted hover:text-arvenzo-ink hover:bg-arvenzo-cream-dark transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-heading font-bold text-arvenzo-ink">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark sticky top-[104px]">
              <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-5">Samenvatting</h2>
              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between">
                  <span className="text-arvenzo-muted">Subtotaal</span>
                  <span className="text-arvenzo-ink font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arvenzo-muted">Verzending</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-arvenzo-ink font-medium'}>
                    {shipping === 0 ? 'Gratis ✓' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-arvenzo-muted bg-arvenzo-cream-dark rounded-lg p-2.5">
                    Voeg nog {formatPrice(50 - subtotal)} toe voor gratis verzending
                  </p>
                )}
              </div>
              <div className="border-t border-arvenzo-cream-dark my-4 pt-4 flex justify-between">
                <span className="font-heading font-bold text-arvenzo-ink">Totaal</span>
                <span className="font-heading font-black text-xl text-arvenzo-ink">{formatPrice(total)}</span>
              </div>
              <a href={checkoutUrl} className="w-full flex items-center justify-center bg-arvenzo-brown text-arvenzo-cream font-heading font-bold py-4 rounded-full hover:bg-arvenzo-brown-light active:scale-[0.98] transition-all text-[15px] tracking-wide">
                Afrekenen →
              </a>
              <Link href="/products" className="block text-center mt-3 text-sm text-arvenzo-muted hover:text-arvenzo-ink transition-colors font-sans">
                Verder winkelen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
