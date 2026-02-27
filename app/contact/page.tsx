'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ naam: '', email: '', onderwerp: '', bericht: '' });

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'MAXIMALS_ADD_TO_CART') {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: event.data.variantId, quantity: event.data.quantity || 1 }),
        })
          .then(res => res.json())
          .then(data => document.dispatchEvent(new CustomEvent('cart:updated', { detail: data })))
          .catch(err => console.error('Failed to add to cart:', err));
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-arvenzo-light min-h-screen">

      {/* Hero header */}
      <div className="bg-arvenzo-ink pt-[96px] pb-14 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-cream/40 mb-4">
            <Link href="/" className="hover:text-arvenzo-cream/70 transition-colors">{t('page.home')}</Link>
            <span>/</span>
            <span>{t('contact.title')}</span>
          </nav>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-arvenzo-cream">
            {t('contact.title')}
          </h1>
          <p className="text-arvenzo-muted font-sans mt-4 max-w-lg">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">

        {/* Quick-info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark">
            <span className="text-xl">✉️</span>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mt-3 mb-1.5">
              {t('contact.email.label')}
            </p>
            <a
              href="mailto:support@arvenzo.eu"
              className="font-heading font-semibold text-arvenzo-ink hover:text-arvenzo-brown transition-colors text-sm"
            >
              support@arvenzo.eu
            </a>
          </div>

          <div className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark">
            <span className="text-xl">🕐</span>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mt-3 mb-1.5">
              {t('contact.hours.title')}
            </p>
            <p className="font-sans text-sm text-arvenzo-ink">{t('contact.hours.weekdays')}</p>
            <p className="font-sans text-xs text-arvenzo-muted/70 mt-0.5">{t('contact.hours.response')}</p>
          </div>

          <div className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark">
            <span className="text-xl">📱</span>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mt-3 mb-1.5">
              {t('contact.socials.title')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/arvenzo_eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans font-medium text-arvenzo-ink hover:text-arvenzo-brown transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586099254919"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans font-medium text-arvenzo-ink hover:text-arvenzo-brown transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left: form */}
          <div className="lg:col-span-2 bg-arvenzo-cream rounded-2xl border border-arvenzo-cream-dark p-8">
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-6">Stuur een bericht</h2>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">✓</div>
                <p className="font-heading font-bold text-arvenzo-ink">{t('contact.form.success')}</p>
                <p className="font-sans text-sm text-arvenzo-muted">{t('contact.form.success_sub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'naam', labelKey: 'contact.form.name', type: 'text', phKey: 'contact.form.ph.name' },
                  { id: 'email', labelKey: 'contact.form.email', type: 'email', phKey: 'contact.form.ph.email' },
                  { id: 'onderwerp', labelKey: 'contact.form.subject', type: 'text', phKey: 'contact.form.ph.subject' },
                ].map(({ id, labelKey, type, phKey }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-sans font-medium text-arvenzo-ink mb-1.5">
                      {t(labelKey)}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      placeholder={t(phKey)}
                      value={form[id as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-arvenzo-cream-dark bg-white text-arvenzo-ink text-sm font-sans placeholder:text-arvenzo-muted/50 focus:outline-none focus:border-arvenzo-brown transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="bericht" className="block text-xs font-sans font-medium text-arvenzo-ink mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="bericht"
                    required
                    rows={5}
                    placeholder={t('contact.form.ph.message')}
                    value={form.bericht}
                    onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-arvenzo-cream-dark bg-white text-arvenzo-ink text-sm font-sans placeholder:text-arvenzo-muted/50 focus:outline-none focus:border-arvenzo-brown transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-arvenzo-brown text-arvenzo-cream font-heading font-bold py-3.5 rounded-full hover:bg-arvenzo-brown-light active:scale-[0.98] transition-all text-sm tracking-wide"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            )}

            {/* Categories */}
            <div className="mt-8 pt-6 border-t border-arvenzo-cream-dark">
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-3">
                {t('contact.categories.title')}
              </p>
              <ul className="font-sans text-sm text-arvenzo-muted space-y-2">
                <li>📦 <strong className="text-arvenzo-ink">{t('contact.cat.1.label')}</strong> {t('contact.cat.1.desc')}</li>
                <li>↩️ <strong className="text-arvenzo-ink">{t('contact.cat.2.label')}</strong> {t('contact.cat.2.intro')}{' '}
                  <Link href="/returns" className="text-arvenzo-brown hover:underline">{t('footer.link.returns')}</Link>
                </li>
                <li>📐 <strong className="text-arvenzo-ink">{t('contact.cat.3.label')}</strong> {t('contact.cat.3.intro')}{' '}
                  <Link href="/sizing" className="text-arvenzo-brown hover:underline">{t('footer.link.sizing')}</Link>
                </li>
                <li>💬 <strong className="text-arvenzo-ink">{t('contact.cat.4.label')}</strong> {t('contact.cat.4.desc')}</li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-arvenzo-cream-dark">
              <p className="text-xs text-arvenzo-muted/60 font-sans">
                {t('contact.legal')}{' '}
                <Link href="/bedrijfsgegevens" className="text-arvenzo-brown hover:underline">
                  {t('contact.legal.cta')}
                </Link>
              </p>
            </div>
          </div>

          {/* Right: live chat */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-arvenzo-ink">Chat met ons</h2>
              <span className="flex items-center gap-1.5 text-xs font-sans text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-arvenzo-cream-dark shadow-sm">
              <iframe
                src="https://rivodesk.com/embed?shopId=198d22cb-fb0c-4b84-96db-1a6b2cdbc12d"
                className="w-full border-none"
                style={{ height: 620 }}
                title="Arvenzo Chat"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
