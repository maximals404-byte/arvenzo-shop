'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import clsx from 'clsx';

const NAV = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Ons verhaal' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { totalQuantity, openCart } = useCart();
  const { customer, isLoading: authLoading } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only homepage gets the transparent-hero treatment
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Non-home pages always look "scrolled" (glass + dark text)
  const effectivelyScrolled = !isHome || scrolled;

  const textColor = effectivelyScrolled ? 'text-arvenzo-ink' : 'text-arvenzo-cream';
  const navColor = effectivelyScrolled
    ? 'text-arvenzo-ink/70 hover:text-arvenzo-brown'
    : 'text-arvenzo-cream/80 hover:text-arvenzo-cream';

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-arvenzo-brown text-arvenzo-cream text-[11px] font-sans tracking-widest uppercase text-center py-2.5 px-4">
        Gratis verzending v.a. €50 &nbsp;·&nbsp; Limited edition &nbsp;·&nbsp; Gedrukt in Europa
      </div>

      {/* Main header */}
      <header
        className={clsx(
          'fixed top-[36px] left-0 right-0 z-40 transition-all duration-300',
          effectivelyScrolled
            ? 'glass shadow-[0_1px_0_rgba(93,43,9,0.08)]'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[60px]">
          <Link
            href="/"
            className={clsx('font-heading font-black text-xl tracking-[0.15em] transition-colors', textColor,
              effectivelyScrolled ? 'hover:text-arvenzo-brown' : 'hover:text-arvenzo-orange'
            )}
          >
            ARVENZO
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}
                className={clsx('text-[13px] font-sans font-medium transition-colors tracking-wide', navColor)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {authLoading ? (
              <span className={clsx('p-2.5', textColor)}>
                <User size={21} strokeWidth={1.5} />
              </span>
            ) : customer ? (
              <Link
                href="/account"
                aria-label="Mijn account"
                className={clsx('flex items-center gap-1.5 p-2.5 transition-colors', textColor,
                  effectivelyScrolled ? 'hover:text-arvenzo-brown' : 'hover:text-arvenzo-orange'
                )}
              >
                <User size={21} strokeWidth={1.5} />
                <span className="hidden sm:inline text-[13px] font-sans font-medium">
                  {customer.firstName || customer.email}
                </span>
              </Link>
            ) : (
              <a
                href="/api/auth/login"
                aria-label="Inloggen"
                className={clsx('p-2.5 transition-colors', textColor,
                  effectivelyScrolled ? 'hover:text-arvenzo-brown' : 'hover:text-arvenzo-orange'
                )}
              >
                <User size={21} strokeWidth={1.5} />
              </a>
            )}
            <button onClick={openCart} aria-label="Winkelwagen"
              className={clsx('relative p-2.5 transition-colors', textColor)}
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-arvenzo-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
              className={clsx('lg:hidden p-2.5 transition-colors', textColor)}
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
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className="font-heading font-bold text-4xl text-arvenzo-ink hover:text-arvenzo-brown transition-colors py-3 border-b border-arvenzo-cream-dark last:border-0"
            >
              {item.label}
            </Link>
          ))}
          {!authLoading && (
            customer ? (
              <Link href="/account" onClick={() => setMobileOpen(false)}
                className="font-heading font-bold text-4xl text-arvenzo-ink hover:text-arvenzo-brown transition-colors py-3 border-t border-arvenzo-cream-dark"
              >
                Mijn account
              </Link>
            ) : (
              <a href="/api/auth/login"
                className="font-heading font-bold text-4xl text-arvenzo-ink hover:text-arvenzo-brown transition-colors py-3 border-t border-arvenzo-cream-dark"
              >
                Inloggen
              </a>
            )
          )}
        </nav>
        <div className="mt-auto px-8 pb-12 text-sm text-arvenzo-muted font-sans">
          Belgisch merk · Gedrukt in Europa
        </div>
      </div>
    </>
  );
}
