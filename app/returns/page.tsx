import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retourneren | Arvenzo',
  description: 'Hoe werkt het retourproces bij Arvenzo? Lees alles over onze 14-dagengarantie.',
};

export default function ReturnsPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Retourneren</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Retourneren</h1>
        <p className="text-arvenzo-muted font-sans mb-12">14 dagen bedenktijd, geen gedoe.</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Retourbeleid</h2>
            <div className="bg-arvenzo-cream rounded-2xl p-6 font-sans text-sm text-arvenzo-muted space-y-3 leading-relaxed">
              <p>Je kunt een artikel retourneren binnen <strong className="text-arvenzo-ink">14 dagen</strong> na ontvangst. Het artikel moet ongedragen, ongewassen en voorzien van het originele label zijn.</p>
              <p>Omdat onze producten op aanvraag worden geprint, accepteren wij <strong className="text-arvenzo-ink">geen retours op maat of kleur</strong> als de bestelling correct is uitgevoerd. Zie onze <Link href="/sizing" className="text-arvenzo-brown hover:underline">maatgids</Link> voor de juiste keuze.</p>
              <p>Bij <strong className="text-arvenzo-ink">fabricagefouten</strong> of beschadigde producten vergoeden we uiteraard het volledige aankoopbedrag of sturen we kosteloos een vervangend product.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-5">Hoe retourneer je?</h2>
            <div className="space-y-4">
              {[
                { stap: '01', titel: 'Neem contact op', tekst: 'Stuur een mail naar info@arvenzo.be met je ordernummer en de reden van retour. Wij reageren binnen 1 werkdag.' },
                { stap: '02', titel: 'Stuur het pakket op', tekst: 'Verpak het artikel goed en stuur het naar het adres dat wij je geven. De verzendkosten voor de retour zijn voor de klant.' },
                { stap: '03', titel: 'Terugbetaling', tekst: 'Na ontvangst en controle van het artikel, betalen wij het aankoopbedrag terug via de oorspronkelijke betaalmethode. Dit duurt maximaal 5 werkdagen.' },
              ].map(({ stap, titel, tekst }) => (
                <div key={stap} className="flex gap-5 p-5 bg-arvenzo-cream rounded-2xl">
                  <span className="font-heading font-black text-3xl text-arvenzo-brown/20 shrink-0 leading-none">{stap}</span>
                  <div>
                    <p className="font-heading font-semibold text-arvenzo-ink text-sm mb-1">{titel}</p>
                    <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Niet van toepassing op</h2>
            <ul className="font-sans text-sm text-arvenzo-muted space-y-2 leading-relaxed">
              <li>• Gedragen of gewassen kledingstukken</li>
              <li>• Artikelen zonder origineel label</li>
              <li>• Producten besteld in een verkeerde maat (gebruik de maatgids)</li>
              <li>• Sale-artikelen</li>
            </ul>
          </section>

          <div className="bg-arvenzo-brown/5 border border-arvenzo-brown/10 rounded-2xl p-5 flex gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-heading font-semibold text-arvenzo-ink text-sm">Retour aanmelden</p>
              <p className="font-sans text-xs text-arvenzo-muted mt-1">Mail naar <a href="mailto:info@arvenzo.be" className="text-arvenzo-brown hover:underline">info@arvenzo.be</a> of gebruik <Link href="/contact" className="text-arvenzo-brown hover:underline">ons contactformulier</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
