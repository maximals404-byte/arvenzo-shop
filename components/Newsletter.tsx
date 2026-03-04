'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch { /* ignore — we still show success */ }
    setLoading(false);
    setDone(true);
  }

  return (
    <section className="relative overflow-hidden bg-arvenzo-dark py-24">
      <Image
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2000&q=70&auto=format&fit=crop"
        alt="Luchtfoto van berglandschap – Arvenzo outdoor lifestyle"
        fill
        className="object-cover opacity-20"
        sizes="100vw"
      />
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-3">
          {t('newsletter.badge')}
        </p>
        <h2 className="font-heading font-black text-4xl sm:text-5xl text-arvenzo-cream leading-tight">
          {t('newsletter.heading')}
        </h2>
        <p className="mt-4 text-arvenzo-cream/50 font-sans">
          {t('newsletter.body')}
        </p>

        {done ? (
          <div className="mt-8 inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-full font-sans text-sm">
            {t('newsletter.success')}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              required
              disabled={loading}
              className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-arvenzo-cream placeholder:text-arvenzo-cream/30 font-sans text-sm focus:outline-none focus:border-arvenzo-orange transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-arvenzo-orange text-arvenzo-dark font-heading font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-arvenzo-orange-light active:scale-[0.97] transition-all whitespace-nowrap disabled:opacity-50"
            >
              {loading ? '...' : t('newsletter.submit')}
            </button>
          </form>
        )}
        <p className="mt-4 text-[11px] text-arvenzo-cream/25 font-sans">
          {t('newsletter.disclaimer')}
        </p>
      </div>
    </section>
  );
}
