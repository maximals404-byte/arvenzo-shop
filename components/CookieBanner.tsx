'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

declare global {
  function gtag(...args: unknown[]): void;
}

export default function CookieBanner() {
  const { t } = useLanguage();
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('arvenzo_consent');
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('arvenzo_consent', 'granted');
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    setConsent('granted');
  }

  function handleDecline() {
    localStorage.setItem('arvenzo_consent', 'denied');
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setConsent('denied');
  }

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-arvenzo-ink text-arvenzo-cream px-4 py-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm leading-relaxed">
          {t('cookie.text')}{' '}
          <Link href="/privacy" className="underline hover:text-arvenzo-orange transition-colors">
            {t('cookie.privacy')}
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-arvenzo-cream rounded hover:bg-arvenzo-cream hover:text-arvenzo-ink transition-colors"
          >
            {t('cookie.decline')}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-arvenzo-orange text-white rounded hover:opacity-90 transition-opacity"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
