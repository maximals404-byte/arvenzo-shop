import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden | Arvenzo',
  description: 'De algemene verkoopsvoorwaarden van Arvenzo.',
};

export default function TermsPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Algemene voorwaarden</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Algemene voorwaarden</h1>
        <p className="text-arvenzo-muted font-sans mb-12">Laatste update: januari 2025</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-8">
          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">1. Identiteit van de onderneming</h2>
            <p>Van Eylen Jonas, handelend onder de naam <strong className="text-arvenzo-ink">Arvenzo</strong>, gevestigd te 3130 Begijnendijk, België. E-mail: info@arvenzo.be. BTW-nummer: op aanvraag.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">2. Toepasselijkheid</h2>
            <p>Deze algemene voorwaarden zijn van toepassing op alle bestellingen die via onze webshop worden geplaatst. Door een bestelling te plaatsen, aanvaard je deze voorwaarden.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">3. Prijzen en betaling</h2>
            <ul className="space-y-1.5">
              <li>• Alle prijzen zijn inclusief BTW.</li>
              <li>• Verzendkosten worden apart vermeld bij het afrekenen.</li>
              <li>• Betaling verloopt via Shopify Payments (Visa, Mastercard, Bancontact, Maestro).</li>
              <li>• Arvenzo behoudt zich het recht voor om prijzen te wijzigen.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">4. Bestelling en levering</h2>
            <p>Een bestelling is definitief na betalingsbevestiging. Onze producten worden on-demand gedrukt en geleverd binnen 3–7 werkdagen voor België en Nederland. Arvenzo is niet aansprakelijk voor vertragingen door derden (vervoerders, printpartners).</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">5. Herroepingsrecht</h2>
            <p>Je hebt het recht om je bestelling te annuleren binnen 14 dagen na ontvangst, conform de Belgische wet op de consumentenbescherming. Dit recht geldt niet voor producten die speciaal voor jou zijn gemaakt (op-demand print) conform art. VI.53 WER, tenzij er sprake is van een fabricagefout.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">6. Garantie en klachten</h2>
            <p>Bij defecte producten of fabricagefouten kun je een vervanging of terugbetaling aanvragen binnen 30 dagen na ontvangst via info@arvenzo.be. Voeg een foto van het defect en je ordernummer toe.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">7. Intellectuele eigendom</h2>
            <p>Alle ontwerpen, foto's en teksten op deze website zijn eigendom van Arvenzo. Kopiëren of hergebruiken zonder toestemming is niet toegestaan.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">8. Toepasselijk recht</h2>
            <p>Op alle overeenkomsten is het Belgisch recht van toepassing. Geschillen worden beslecht door de bevoegde rechtbank in het arrondissement Leuven.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">9. Contact</h2>
            <p>Voor vragen over deze voorwaarden: <a href="mailto:info@arvenzo.be" className="text-arvenzo-brown hover:underline">info@arvenzo.be</a> of <Link href="/contact" className="text-arvenzo-brown hover:underline">contactformulier</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
