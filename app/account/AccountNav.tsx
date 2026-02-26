'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const TABS = [
  { href: '/account', label: 'Gegevens', exact: true },
  { href: '/account/orders', label: 'Bestellingen', exact: false },
  { href: '/account/track', label: 'Track & Trace', exact: false },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-0 mb-6 border-b border-arvenzo-cream-dark">
      {TABS.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              'px-4 py-2.5 text-sm font-sans font-medium whitespace-nowrap transition-colors border-b-2 -mb-px',
              isActive
                ? 'border-arvenzo-brown text-arvenzo-brown'
                : 'border-transparent text-arvenzo-ink/60 hover:text-arvenzo-brown',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
