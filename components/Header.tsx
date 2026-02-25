'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import clsx from 'clsx';

const NAV = [
  { href: '/products', label: 'Shop' },
  { href: '/products?type=Hoodies', label: 'Hoodies' },
  { href: '/products?type=Sweatshirts', label: 'Sweatshirts' },
  { href: '/products?type=Unisex-Shirts', label: 'Shirts' },
  { href: '/products?type=Trinkgefäße', label: 'Mugs' },
];

export default function Header() {
  const { totalQuantity, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-arvenzo-brown text-arvenzo-cream text-[11px] font-sans tracking-widest uppercase text-center py-2.5">
        Gratis verzending v.a. €50 &nbsp;·&nbsp; Limited edition &nbsp;·&nbsp; Gedrukt in Duitsland
      </div>

      {/* Main header */}
      <header
        className={clsx(
          'fixed top-[36px] left-0 right-0 z-40 transition-all duration-500',
          scrolled ? 'glass shadow-[0_1px_0_rgba(93,43,9,0.08)]' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href="/" className="font-heading font-black text-xl tracking-[0.15em] text-arvenzo-ink hover:text-arvenzo-brown transition-colors">
            ARVENZO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-sans font-medium text-arvenzo-ink/70 hover:text-arvenzo-brown transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={openCart}
              aria-label="Winkelwagen"
              className="relative p-2.5 text-arvenzo-ink hover:text-arvenzo-brown transition-colors"
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-arvenzo-brown text-arvenzo-cream text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="lg:hidden p-2.5 text-arvenzo-ink"
            >
              {mobileOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={clsx(
        'fixed inset-0 z-30 flex flex-col bg-arvenzo-cream pt-[96px] transition-transform duration-500 lg:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <nav className="flex flex-col px-8 pt-10 gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading font-bold text-4xl text-arvenzo-ink hover:text-arvenzo-brown transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-12 text-sm text-arvenzo-muted font-sans">
          Belgisch merk · Gedrukt in Duitsland
        </div>
      </div>
    </>
  );
}
