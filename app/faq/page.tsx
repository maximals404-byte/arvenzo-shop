'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    v: 'Wanneer wordt mijn bestelling geleverd?',
    a: 'Onze producten worden on-demand gedrukt. Reken op 2–4 werkdagen productietijd + 1–3 werkdagen verzending voor België en Nederland. Totaal: 3–7 werkdagen.',
  },
  {
    v: 'Is er gratis verzending?',
    a: 'Ja! Bestellingen vanaf €50 worden gratis verzonden naar België en Nederland. Voor andere EU-landen geldt gratis verzending vanaf €75 of €100, afhankelijk van het land.',
  },
  {
    v: 'Welke maat moet ik kiezen?',
    a: 'Bekijk onze uitgebreide maatgids voor exacte centimetermaten. Bij twijfel adviseren wij een maat groter te kiezen voor een comfortabele, streetwear-geïnspireerde pasvorm.',
  },
  {
    v: 'Kan ik mijn bestelling retourneren?',
    a: 'Ja, je kunt retourneren binnen 14 dagen na ontvangst. Het product moet ongedragen en ongewassen zijn. Neem contact op via info@arvenzo.be om een retour aan te melden.',
  },
  {
    v: 'Hoe worden de producten gemaakt?',
    a: 'Alle Arvenzo-producten worden on-demand geprint in Europa door onze printpartner. Dit betekent geen overproductie en een lagere ecologische voetafdruk. Elk stuk wordt speciaal voor jou gemaakt.',
  },
  {
    v: 'Kan ik mijn bestelling wijzigen of annuleren?',
    a: 'Neem zo snel mogelijk contact op via info@arvenzo.be. Zodra de productie gestart is, kan een bestelling niet meer worden gewijzigd of geannuleerd.',
  },
  {
    v: 'Hoe was ik mijn Arvenzo-producten?',
    a: 'Was op maximaal 30°C en keer het kledingstuk binnenstebuiten. Gebruik geen bleek. Strijk niet direct op de print. Zo bewaar je de kwaliteit zo lang mogelijk.',
  },
  {
    v: 'Welke betaalmethoden accepteren jullie?',
    a: 'We accepteren Visa, Mastercard, Maestro en Bancontact. De afrekening verloopt veilig via Shopify Payments.',
  },
  {
    v: 'Ik heb een defect product ontvangen. Wat nu?',
    a: 'Stuur een foto van het defect naar info@arvenzo.be met je ordernummer. We sturen gratis een vervangend product of betalen het volledige bedrag terug.',
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">FAQ</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Veelgestelde vragen</h1>
        <p className="text-arvenzo-muted font-sans mb-12">Staat je vraag er niet bij? <Link href="/contact" className="text-arvenzo-brown hover:underline">Neem contact op</Link>.</p>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-arvenzo-cream rounded-2xl overflow-hidden border border-arvenzo-cream-dark">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
              >
                <span className="font-heading font-semibold text-arvenzo-ink text-sm">{faq.v}</span>
                <span className={`text-arvenzo-muted transition-transform shrink-0 ${open === i ? 'rotate-180' : ''}`}>↓</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
