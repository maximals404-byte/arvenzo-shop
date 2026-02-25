import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Arvenzo',
  description: 'Algemene verkoopsvoorwaarden van Arvenzo conform Belgisch Wetboek van Economisch Recht en EU-consumentenwetgeving.',
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

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Algemene Voorwaarden</h1>
        <p className="text-arvenzo-muted font-sans mb-2 text-sm">
          Deze algemene voorwaarden zijn opgesteld in overeenstemming met het Belgisch Wetboek van Economisch Recht (WER), het Burgerlijk Wetboek en de relevante Europese richtlijnen inzake consumentenbescherming.
        </p>
        <p className="text-arvenzo-muted font-sans mb-12 text-xs">Laatste update: 14 januari 2026</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-8">

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">1. Identiteit van de onderneming</h2>
            <p className="mb-3">De website www.arvenzo.be en de bijbehorende diensten worden geëxploiteerd door:</p>
            <ul className="space-y-1.5">
              <li>• <strong className="text-arvenzo-ink">Handelsnaam:</strong> Arvenzo</li>
              <li>• <strong className="text-arvenzo-ink">Officiële bedrijfsnaam:</strong> Van Eylen Jonas</li>
              <li>• <strong className="text-arvenzo-ink">Rechtsvorm:</strong> Eenmanszaak</li>
              <li>• <strong className="text-arvenzo-ink">Maatschappelijke zetel:</strong> Pandhoevestraat 62, 3130 Begijnendijk, België</li>
              <li>• <strong className="text-arvenzo-ink">Ondernemingsnummer (KBO):</strong> 1027.570.389</li>
              <li>• <strong className="text-arvenzo-ink">BTW-nummer:</strong> BE1027.570.389</li>
              <li>• <strong className="text-arvenzo-ink">E-mail:</strong> <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a></li>
              <li>• <strong className="text-arvenzo-ink">Telefoon:</strong> +32 456 88 25 18 (geen telefonisch klantcontact)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">2. Toepassingsgebied</h2>
            <p className="mb-3">2.1. Deze algemene voorwaarden zijn van toepassing op elk aanbod van Arvenzo en op elke tot stand gekomen overeenkomst tussen de onderneming en de consument (elke natuurlijke persoon die handelt voor doeleinden die buiten zijn handels-, bedrijfs-, ambachts- of beroepsactiviteit vallen).</p>
            <p className="mb-3">2.2. Door een bestelling te plaatsen, erkent de consument kennis te hebben genomen van deze voorwaarden en deze uitdrukkelijk te aanvaarden.</p>
            <p>2.3. Arvenzo behoudt zich het recht voor deze voorwaarden te allen tijde te wijzigen. De versie die van kracht is op het moment van de bestelling blijft van toepassing op de gesloten overeenkomst.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">3. Aanbod en Bestelling</h2>
            <p className="mb-3">3.1. Indien een aanbod een beperkte geldigheidsduur heeft of onder voorwaarden geschiedt, wordt dit nadrukkelijk in het aanbod vermeld.</p>
            <p className="mb-3">3.2. Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten. Kennelijke vergissingen of fouten in het aanbod (zoals evidente typefouten in prijzen of specificaties) binden Arvenzo niet.</p>
            <p>3.3. De overeenkomst komt tot stand op het moment dat de consument de bestelling definitief bevestigt en voldoet aan de daarbij gestelde voorwaarden. Arvenzo bevestigt de ontvangst van de bestelling onverwijld via e-mail.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">4. Prijzen en Betaling</h2>
            <p className="mb-3">4.1. Alle prijzen op de website zijn uitgedrukt in Euro en zijn inclusief de wettelijke Belgische BTW, tenzij anders vermeld.</p>
            <p className="mb-3">4.2. Verzendkosten worden duidelijk vermeld vóór het definitief plaatsen van de bestelling.</p>
            <p className="mb-3">4.3. Betaling kan geschieden via de op de website aangeboden betaalmethoden.</p>
            <p>4.4. Bij niet-betaling op de vervaldatum is de consument van rechtswege en zonder voorafgaande ingebrekestelling een verwijlinterest verschuldigd conform de Wet betreffende de bestrijding van de betalingsachterstand bij handelstransacties, onverminderd het recht op een forfaitaire schadevergoeding van 10% op het factuurbedrag (met een minimum van €40).</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">5. Levering</h2>
            <p className="mb-3">5.1. Arvenzo zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en uitvoeren van bestellingen.</p>
            <p className="mb-3">5.2. Tenzij anders overeengekomen, worden producten geleverd binnen de termijn vermeld in de orderbevestiging. In overeenstemming met Boek VI van het WER bedraagt de uiterste leveringstermijn 30 dagen, tenzij anders bepaald.</p>
            <p>5.3. Het risico van verlies of beschadiging van de goederen gaat over op de consument op het moment dat de consument (of een door hem aangewezen derde) de goederen fysiek in bezit heeft gekregen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">6. Herroepingsrecht</h2>
            <p className="mb-3">6.1. De consument heeft het recht om binnen een termijn van 14 kalenderdagen zonder opgave van redenen de overeenkomst te herroepen, conform artikel VI.47 WER.</p>
            <p className="mb-3">6.2. De herroepingstermijn verstrijkt 14 dagen na de dag waarop de consument de goederen fysiek in bezit krijgt.</p>
            <p className="mb-3">6.3. Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Het uitgangspunt is dat de consument het product slechts mag hanteren en inspecteren zoals hij dat in een fysieke winkel zou mogen doen.</p>
            <p>6.4. <strong className="text-arvenzo-ink">Uitzonderingen:</strong> Het herroepingsrecht geldt niet voor producten die volgens specificaties van de consument zijn vervaardigd (maatwerk), producten die snel bederven of een beperkte houdbaarheid hebben, of verzegelde goederen die om redenen van gezondheidsbescherming of hygiëne niet geschikt zijn om te worden teruggezonden en waarvan de verzegeling na levering is verbroken. Zie ons volledig <Link href="/returns" className="text-arvenzo-brown hover:underline">retourbeleid</Link>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">7. Conformiteit en Garantie</h2>
            <p className="mb-3">7.1. Arvenzo garandeert dat de producten voldoen aan de overeenkomst en de in het aanbod vermelde specificaties.</p>
            <p className="mb-3">7.2. Consumenten genieten van de wettelijke garantie van 2 jaar voor elk gebrek aan overeenstemming dat bestaat bij de levering van het goed en dat zich manifesteert binnen een termijn van twee jaar na levering (Art. 1649bis t.e.m. 1649octies Burgerlijk Wetboek).</p>
            <p>7.3. Elk gebrek dient binnen een termijn van 2 maanden na vaststelling schriftelijk te worden gemeld aan <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">8. Aansprakelijkheid en Overmacht</h2>
            <p className="mb-3">8.1. Arvenzo is niet aansprakelijk voor indirecte schade, gevolgschade of schade door onjuist gebruik van de producten.</p>
            <p>8.2. In geval van overmacht (zoals stakingen, pandemieën, transportstoringen of brand) is Arvenzo niet gehouden haar verplichtingen na te komen. De uitvoering van de overeenkomst wordt in dat geval opgeschort voor de duur van de overmacht.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">9. Intellectuele Eigendom</h2>
            <p>De inhoud van de website (logo&apos;s, teksten, afbeeldingen, video&apos;s) is beschermd door intellectuele eigendomsrechten die toebehoren aan Arvenzo of de rechthebbende partners. Gehele of gedeeltelijke reproductie is verboden zonder voorafgaande schriftelijke toestemming.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">10. Privacy</h2>
            <p>Arvenzo verwerkt de persoonsgegevens van de consument in overeenstemming met de General Data Protection Regulation (GDPR) en de Belgische Privacywet. Voor meer informatie verwijzen wij naar ons <Link href="/privacy" className="text-arvenzo-brown hover:underline">Privacybeleid</Link>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">11. Klachten en Geschillen</h2>
            <p className="mb-3">11.1. Klachten over de uitvoering van de overeenkomst moeten volledig en duidelijk omschreven worden ingediend bij <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>.</p>
            <p className="mb-3">11.2. Bij buitengerechtelijke regeling van geschillen kan de Consumentenombudsdienst van de Federale Overheid worden gecontacteerd via: <a href="https://consumentenombudsdienst.be" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">consumentenombudsdienst.be</a>.</p>
            <p className="mb-3">11.3. Voor grensoverschrijdende geschillen kan de consument gebruikmaken van het Online Dispute Resolution (ODR) platform van de Europese Unie: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">ec.europa.eu/consumers/odr</a>.</p>
            <p className="mb-3">11.4. Op alle rechtsbetrekkingen tussen Arvenzo en de consument is uitsluitend het Belgisch recht van toepassing.</p>
            <p>11.5. In geval van betwisting zijn enkel de rechtbanken van het arrondissement Leuven bevoegd.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
