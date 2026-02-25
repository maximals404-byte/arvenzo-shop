'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ naam: '', email: '', onderwerp: '', bericht: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Contact</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Contact</h1>
        <p className="text-arvenzo-muted font-sans mb-12">
          Vragen over een bestelling, product of levering? We helpen je graag verder.
        </p>

        <div className="grid sm:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div className="space-y-7">
            <div>
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-2">E-mail</p>
              <a href="mailto:support@arvenzo.eu" className="font-heading font-semibold text-arvenzo-ink hover:text-arvenzo-brown transition-colors">
                support@arvenzo.eu
              </a>
            </div>

            <div>
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-2">Openingstijden</p>
              <p className="font-sans text-sm text-arvenzo-ink">Maandag – vrijdag: 09:00 – 18:00</p>
              <p className="font-sans text-sm text-arvenzo-muted">Zaterdag & zondag: gesloten</p>
              <p className="font-sans text-xs text-arvenzo-muted/60 mt-1">Reactietijd: binnen 24 uur op werkdagen</p>
            </div>

            <div>
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-2">Waar gaat uw vraag over?</p>
              <ul className="font-sans text-sm text-arvenzo-muted space-y-1.5">
                <li>📦 <strong className="text-arvenzo-ink">Bestelling/levering</strong> — vermeld uw ordernummer</li>
                <li>↩️ <strong className="text-arvenzo-ink">Retour</strong> — zie eerst ons <Link href="/returns" className="text-arvenzo-brown hover:underline">retourbeleid</Link></li>
                <li>📐 <strong className="text-arvenzo-ink">Maat</strong> — bekijk de <Link href="/sizing" className="text-arvenzo-brown hover:underline">maatgids</Link></li>
                <li>💬 <strong className="text-arvenzo-ink">Overig</strong> — stuur een bericht via het formulier</li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-2">Volg ons</p>
              <div className="flex gap-3">
                <a href="https://instagram.com/arvenzo_eu" target="_blank" rel="noopener noreferrer"
                  className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-brown transition-colors">
                  Instagram
                </a>
                <a href="https://facebook.com/arvenzo" target="_blank" rel="noopener noreferrer"
                  className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-brown transition-colors">
                  Facebook
                </a>
                <a href="https://tiktok.com/@arvenzo" target="_blank" rel="noopener noreferrer"
                  className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-brown transition-colors">
                  TikTok
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-arvenzo-cream-dark">
              <p className="text-xs text-arvenzo-muted/60 font-sans">
                Op zoek naar onze wettelijke bedrijfsgegevens?{' '}
                <Link href="/bedrijfsgegevens" className="text-arvenzo-brown hover:underline">Klik hier →</Link>
              </p>
            </div>
          </div>

          {/* Right: form */}
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">✓</div>
              <p className="font-heading font-bold text-arvenzo-ink">Bericht verstuurd!</p>
              <p className="font-sans text-sm text-arvenzo-muted">We nemen zo snel mogelijk contact op.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'naam', label: 'Naam', type: 'text', placeholder: 'Je naam' },
                { id: 'email', label: 'E-mail', type: 'email', placeholder: 'je@email.be' },
                { id: 'onderwerp', label: 'Onderwerp', type: 'text', placeholder: 'Bijv. vraag over bestelling #1234' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-sans font-medium text-arvenzo-ink mb-1.5">{label}</label>
                  <input
                    id={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-arvenzo-cream-dark bg-arvenzo-cream text-arvenzo-ink text-sm font-sans placeholder:text-arvenzo-muted/50 focus:outline-none focus:border-arvenzo-brown transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="bericht" className="block text-xs font-sans font-medium text-arvenzo-ink mb-1.5">Bericht</label>
                <textarea
                  id="bericht"
                  required
                  rows={5}
                  placeholder="Je bericht..."
                  value={form.bericht}
                  onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-arvenzo-cream-dark bg-arvenzo-cream text-arvenzo-ink text-sm font-sans placeholder:text-arvenzo-muted/50 focus:outline-none focus:border-arvenzo-brown transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-arvenzo-brown text-arvenzo-cream font-heading font-bold py-3.5 rounded-full hover:bg-arvenzo-brown-light active:scale-[0.98] transition-all text-sm tracking-wide"
              >
                Verstuur bericht
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
