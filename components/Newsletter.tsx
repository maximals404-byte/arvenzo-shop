'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-arvenzo-dark py-24">
      <Image
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2000&q=70&auto=format&fit=crop"
        alt="Mountain aerial"
        fill
        className="object-cover opacity-20"
        sizes="100vw"
      />
      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-3">
          Nieuwsbrief
        </p>
        <h2 className="font-heading font-black text-4xl sm:text-5xl text-arvenzo-cream leading-tight">
          10% korting<br />op je eerste bestelling
        </h2>
        <p className="mt-4 text-arvenzo-cream/50 font-sans">
          Schrijf je in en ontvang exclusieve aanbiedingen & nieuwe collecties als eerste.
        </p>

        {done ? (
          <div className="mt-8 inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-full font-sans text-sm">
            ✓ Bedankt! Controleer je inbox voor de kortingscode.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.be"
              required
              className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-arvenzo-cream placeholder:text-arvenzo-cream/30 font-sans text-sm focus:outline-none focus:border-arvenzo-orange transition-colors"
            />
            <button
              type="submit"
              className="bg-arvenzo-orange text-arvenzo-dark font-heading font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-arvenzo-orange-light active:scale-[0.97] transition-all whitespace-nowrap"
            >
              Inschrijven →
            </button>
          </form>
        )}
        <p className="mt-4 text-[11px] text-arvenzo-cream/25 font-sans">
          Geen spam. Uitschrijven kan altijd.
        </p>
      </div>
    </section>
  );
}
