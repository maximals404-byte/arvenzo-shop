import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacybeleid | Arvenzo',
  description: 'Hoe Arvenzo omgaat met jouw persoonlijke gegevens.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Privacybeleid</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Privacybeleid</h1>
        <p className="text-arvenzo-muted font-sans mb-12">Laatste update: januari 2025</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-8">
          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">1. Verantwoordelijke</h2>
            <p>De verantwoordelijke voor de verwerking van je persoonsgegevens is Van Eylen Jonas, gevestigd te 3130 Begijnendijk, België. Je kunt contact opnemen via <a href="mailto:info@arvenzo.be" className="text-arvenzo-brown hover:underline">info@arvenzo.be</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">2. Welke gegevens verzamelen we?</h2>
            <ul className="space-y-1.5">
              <li>• <strong className="text-arvenzo-ink">Bestelgegevens:</strong> naam, leveringsadres, e-mailadres, telefoonnummer</li>
              <li>• <strong className="text-arvenzo-ink">Betalingsgegevens:</strong> worden verwerkt door Shopify Payments en nooit door ons opgeslagen</li>
              <li>• <strong className="text-arvenzo-ink">Browsegegevens:</strong> via cookies voor analytische doeleinden (Google Analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">3. Waarvoor gebruiken we je gegevens?</h2>
            <ul className="space-y-1.5">
              <li>• Verwerken en leveren van bestellingen</li>
              <li>• Communiceren over je bestelling</li>
              <li>• Verbeteren van onze webshop en klantenservice</li>
              <li>• Versturen van nieuwsbrieven (alleen met toestemming)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">4. Bewaartermijn</h2>
            <p>We bewaren je gegevens zo lang als nodig voor de uitvoering van de overeenkomst en maximaal 7 jaar conform Belgische boekhoudwetgeving.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">5. Jouw rechten</h2>
            <p>Je hebt het recht op inzage, correctie, verwijdering, beperking en overdraagbaarheid van je gegevens. Stuur een verzoek naar <a href="mailto:info@arvenzo.be" className="text-arvenzo-brown hover:underline">info@arvenzo.be</a>. Je kunt ook een klacht indienen bij de Gegevensbeschermingsautoriteit (GBA).</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">6. Cookies</h2>
            <p>Onze webshop maakt gebruik van functionele cookies (noodzakelijk voor de werking) en analytische cookies. Je kunt cookies beheren via je browserinstellingen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">7. Derde partijen</h2>
            <p>We maken gebruik van Shopify als e-commerceplatform. Shopify verwerkt bestellings- en betalingsgegevens conform hun eigen privacybeleid. We delen je gegevens niet met derde partijen voor commerciële doeleinden zonder jouw toestemming.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
