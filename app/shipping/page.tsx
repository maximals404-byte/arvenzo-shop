import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Verzendbeleid | Arvenzo',
  description: 'Verzendbeleid van Arvenzo conform Belgisch Wetboek van Economisch Recht en EU-richtlijnen voor e-commerce.',
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

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Verzendbeleid</h1>
        <p className="text-arvenzo-muted font-sans mb-2 text-sm">
          Bij Arvenzo streven we naar een transparante en betrouwbare bezorgervaring. Dit verzendbeleid is van toepassing op alle bestellingen geplaatst via <strong>www.arvenzo.be</strong>.
        </p>
        <p className="text-arvenzo-muted font-sans mb-12 text-xs">Laatste update: 14 januari 2026</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-10">

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">1. Verwerkingstijd</h2>
            <p className="mb-3">De verwerkingstijd is de periode tussen de ontvangst van uw bestelling en het moment dat het pakket aan de vervoerder wordt overhandigd.</p>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Standaard verwerkingstijd:</strong> Alle bestellingen worden verwerkt binnen <strong className="text-arvenzo-ink">1 tot 6 werkdagen</strong> (productietijd).</li>
              <li>• <strong className="text-arvenzo-ink">Cut-off tijden:</strong> Bestellingen geplaatst na <strong className="text-arvenzo-ink">12:00 uur</strong> op werkdagen worden vanaf de eerstvolgende werkdag in behandeling genomen.</li>
              <li>• <strong className="text-arvenzo-ink">Uitzonderingen:</strong> Tijdens drukke perioden (feestdagen, acties, weekends) of bij gepersonaliseerde artikelen kan de verwerkingstijd afwijken.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">2. Leveringstermijnen</h2>
            <p className="mb-4">De geschatte levertijd is de optelsom van de verwerkingstijd en de transporttijd van de koerier. Conform de wettelijke bepalingen (Art. VI.43 WER) verbindt Arvenzo zich ertoe de goederen uiterlijk binnen <strong className="text-arvenzo-ink">30 dagen</strong> na bestelling te leveren, tenzij anders overeengekomen.</p>
            <div className="overflow-x-auto rounded-2xl border border-arvenzo-cream-dark">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-arvenzo-cream-dark text-arvenzo-ink">
                    <th className="text-left px-5 py-3 font-semibold">Bestemming</th>
                    <th className="text-left px-5 py-3 font-semibold">Leveringstermijn na verzending</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arvenzo-cream-dark">
                  {[
                    ['België', 'Gem. 3–5 werkdagen na verzending'],
                    ['Nederland', 'Gem. 3–5 werkdagen na verzending'],
                    ['Andere EU-landen', 'Gem. 3–7 werkdagen na verzending'],
                  ].map(([land, tijd]) => (
                    <tr key={land} className="bg-arvenzo-cream hover:bg-arvenzo-cream-dark/40 transition-colors">
                      <td className="px-5 py-3 text-arvenzo-ink font-medium">{land}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{tijd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs italic">Let op: Leveringstermijnen zijn indicatief. Factoren zoals stakingen bij postdiensten of extreme weersomstandigheden kunnen de bezorging vertragen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">3. Verzendkosten en Tarieven</h2>
            <p>De verzendkosten worden duidelijk weergegeven in de checkout voordat u de betaling definitief bevestigt.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">4. Bezorgdiensten en Track & Trace</h2>
            <p className="mb-3">Arvenzo werkt samen met gerenommeerde partners zoals bpost, PostNL en DHL.</p>
            <p>Zodra uw pakket ons magazijn verlaat, ontvangt u een automatische verzendbevestiging via e-mail met daarin een <strong className="text-arvenzo-ink">Track & Trace-code</strong>. Hiermee kunt u de status van uw zending online opvolgen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">5. Leveringsopties</h2>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Thuislevering:</strong> Bezorging op het door u opgegeven adres.</li>
              <li>• <strong className="text-arvenzo-ink">Afhaalpunten/Pakketautomaten:</strong> Niet beschikbaar.</li>
              <li>• <strong className="text-arvenzo-ink">Click & Collect:</strong> Afhalen op onze locatie te Begijnendijk is niet mogelijk.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">6. Problemen bij levering en Aansprakelijkheid</h2>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">6.1 Afwezigheid bij levering</h3>
            <p className="mb-4">Indien u niet aanwezig bent op het moment van levering, zal de vervoerder ofwel een tweede poging ondernemen, ofwel het pakket afleveren bij een nabijgelegen afhaalpunt. Indien een pakket retour komt omdat het niet werd afgehaald of een foutief adres werd opgegeven, behouden wij ons het recht voor om de kosten voor een herverzending aan te rekenen.</p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">6.2 Beschadigde pakketten</h3>
            <p className="mb-4">Conform de EU-wetgeving gaat het risico van verlies of beschadiging op u over zodra u (of een door u aangewezen derde) de goederen fysiek in bezit heeft gekregen.<br /><br />
            <strong className="text-arvenzo-ink">Belangrijk:</strong> Controleer de verpakking bij ontvangst. Is het pakket zichtbaar beschadigd? Weiger de zending of laat de koerier een schriftelijke aantekening maken. Meld transportschade binnen 24 uur aan ons via <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>.</p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">6.3 Verloren pakketten</h3>
            <p>Indien een pakket meer dan 10 werkdagen buiten de verwachte levertermijn vertraagd is, gelieve contact op te nemen voor een onderzoek bij de vervoerder.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">7. Internationale Verzending (buiten EU)</h2>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Invoerrechten:</strong> Alle eventuele douanerechten, invoerbelastingen en administratieve kosten vallen volledig onder de verantwoordelijkheid van de koper.</li>
              <li>• <strong className="text-arvenzo-ink">BTW:</strong> Bestellingen buiten de EU kunnen onderhevig zijn aan lokale BTW-regels bij invoer.</li>
              <li>• <strong className="text-arvenzo-ink">Vertraging:</strong> Wij zijn niet verantwoordelijk voor vertragingen veroorzaakt door douaneprocedures.</li>
            </ul>
          </section>

          <div className="bg-arvenzo-brown/5 border border-arvenzo-brown/10 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-arvenzo-ink text-sm mb-3">Contact & Klachten</h3>
            <div className="space-y-1 text-xs text-arvenzo-muted">
              <p><strong className="text-arvenzo-ink">Arvenzo</strong> · Van Eylen Jonas</p>
              <p>Pandhoevestraat 62, 3130 Begijnendijk, België</p>
              <p>E-mail: <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a></p>
              <p>Tel: <a href="tel:+32456882518" className="text-arvenzo-brown hover:underline">+32 456 88 25 18</a></p>
              <p>Website: www.arvenzo.be</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
