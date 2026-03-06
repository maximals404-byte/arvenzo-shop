'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/shopify';
import CartCrossSell from './CartCrossSell';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, checkoutUrl, totalQuantity } = useCart();
  const { t } = useLanguage();

  const shippingNote = subtotal >= 50
    ? t('cart.free_shipping')
    : t('cart.towards_free', { amount: (50 - subtotal).toFixed(2) });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-arvenzo-dark/50 backdrop-blur-sm animate-fade-in" onClick={closeCart} />
      )}

      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-arvenzo-cream flex flex-col shadow-2xl transition-transform duration-[350ms] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-arvenzo-cream-dark">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-arvenzo-brown" strokeWidth={1.5} />
            <span className="font-heading font-bold text-arvenzo-ink">
              {t('cart.title')} {totalQuantity > 0 && <span className="text-arvenzo-muted font-normal">({totalQuantity})</span>}
            </span>
          </div>
          <button onClick={closeCart} className="p-2 text-arvenzo-muted hover:text-arvenzo-ink rounded-full hover:bg-arvenzo-cream-dark transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart items */}
          <div className="px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-arvenzo-cream-dark flex items-center justify-center">
                  <ShoppingBag size={24} className="text-arvenzo-muted" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-arvenzo-ink">{t('cart.empty')}</p>
                  <p className="text-arvenzo-muted text-sm font-sans mt-0.5">{t('cart.empty_sub')}</p>
                </div>
                <Link href="/products" onClick={closeCart}
                  className="bg-arvenzo-brown text-arvenzo-cream font-heading font-semibold px-6 py-3 rounded-full text-sm hover:bg-arvenzo-brown-light transition-colors">
                  {t('cart.shop_now')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 group">
                    <Link href={`/products/${item.handle}`} onClick={closeCart}
                      className="shrink-0 w-[72px] h-[72px] rounded-xl bg-[#F0EAE4] overflow-hidden">
                      {item.image && (
                        <Image src={item.image} alt={item.title} width={72} height={72}
                          className="w-full h-full object-contain p-1" />
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link href={`/products/${item.handle}`} onClick={closeCart}
                            className="font-heading font-semibold text-arvenzo-ink text-sm leading-snug hover:text-arvenzo-brown transition-colors block truncate">
                            {item.title}
                          </Link>
                          <p className="text-xs text-arvenzo-muted font-sans mt-0.5">
                            {item.selectedOptions.map(o => o.value).join(' · ')}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.variantId)}
                          className="p-1 text-arvenzo-muted hover:text-arvenzo-ink opacity-0 group-hover:opacity-100 transition-all shrink-0">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-arvenzo-cream-dark rounded-lg">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-ink transition-colors">
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-sm font-medium text-arvenzo-ink">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-ink transition-colors">
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-sans font-semibold text-arvenzo-ink text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cross-sell block */}
          <CartCrossSell />
        </div>

        {/* Footer checkout */}
        {items.length > 0 && (
          <div className="border-t border-arvenzo-cream-dark px-6 py-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-arvenzo-muted">{t('cart.subtotal')}</span>
              <span className="font-heading font-bold text-arvenzo-ink text-lg">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-arvenzo-muted font-sans">{shippingNote}</p>
            <a href={checkoutUrl}
              className="w-full flex items-center justify-center bg-arvenzo-brown text-arvenzo-cream font-heading font-bold py-4 rounded-full hover:bg-arvenzo-brown-light active:scale-[0.98] transition-all text-[15px] tracking-wide">
              {t('cart.checkout')} →
            </a>
            <button onClick={closeCart}
              className="w-full text-center text-sm text-arvenzo-muted hover:text-arvenzo-ink transition-colors font-sans">
              {t('cart.continue')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
