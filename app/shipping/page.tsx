import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verzending & levering | Arvenzo',
  description: 'Alles over verzendtijden, tarieven en levering bij Arvenzo.',
};

export default function ShippingPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Verzending</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Verzending & levering</h1>
        <p className="text-arvenzo-muted font-sans mb-12">Alles wat je moet weten over je bestelling.</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Verzendtarieven</h2>
            <div className="overflow-x-auto rounded-2xl border border-arvenzo-cream-dark">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-arvenzo-cream-dark text-arvenzo-ink">
                    <th className="text-left px-5 py-3 font-semibold">Land</th>
                    <th className="text-left px-5 py-3 font-semibold">Standaard</th>
                    <th className="text-left px-5 py-3 font-semibold">Gratis verzending v.a.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arvenzo-cream-dark">
                  {[
                    ['België', '€3,95', '€50'],
                    ['Nederland', '€4,95', '€50'],
                    ['Duitsland', '€5,95', '€75'],
                    ['Frankrijk', '€5,95', '€75'],
                    ['Overig EU', '€7,95', '€100'],
                  ].map(([land, prijs, gratis]) => (
                    <tr key={land} className="bg-arvenzo-cream hover:bg-arvenzo-cream-dark/40 transition-colors">
                      <td className="px-5 py-3 text-arvenzo-ink font-medium">{land}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{prijs}</td>
                      <td className="px-5 py-3 text-arvenzo-brown font-semibold">{gratis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Levertijden</h2>
            <div className="bg-arvenzo-cream rounded-2xl p-6 space-y-4 font-sans text-sm text-arvenzo-muted">
              <p>Omdat onze producten on-demand worden gedrukt in Europa, gelden de volgende levertijden:</p>
              <ul className="space-y-2">
                <li className="flex gap-3"><span className="text-arvenzo-brown font-bold shrink-0">2-4 werkdagen</span><span>Productietime (drukken + afwerking)</span></li>
                <li className="flex gap-3"><span className="text-arvenzo-brown font-bold shrink-0">1-3 werkdagen</span><span>Verzending binnen België en Nederland</span></li>
                <li className="flex gap-3"><span className="text-arvenzo-brown font-bold shrink-0">3-5 werkdagen</span><span>Verzending naar de rest van Europa</span></li>
              </ul>
              <p className="pt-2 border-t border-arvenzo-cream-dark">Totale levertijd: <strong className="text-arvenzo-ink">3-7 werkdagen</strong> voor België en Nederland, <strong className="text-arvenzo-ink">5-9 werkdagen</strong> voor overig Europa.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Tracking</h2>
            <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">
              Zodra je bestelling verzonden is, ontvang je een bevestigingsmail met een trackingnummer. Hiermee kun je de status van je pakket live volgen via de website van de vervoerder.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Productie in Europa</h2>
            <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">
              Alle Arvenzo-producten worden on-demand gedrukt in onze printpartnersfaciliteiten in Europa. Dit betekent dat er geen overproductie is, wat goed is voor het milieu. Elk stuk wordt speciaal voor jou gemaakt.
            </p>
          </section>

          <div className="bg-arvenzo-brown/5 border border-arvenzo-brown/10 rounded-2xl p-5 flex gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-heading font-semibold text-arvenzo-ink text-sm">Vragen over je bestelling?</p>
              <p className="font-sans text-xs text-arvenzo-muted mt-1">Neem contact op via <Link href="/contact" className="text-arvenzo-brown hover:underline">ons contactformulier</Link> of mail naar <a href="mailto:info@arvenzo.be" className="text-arvenzo-brown hover:underline">info@arvenzo.be</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
