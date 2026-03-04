import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacybeleid | Arvenzo',
  description: 'Privacybeleid van Arvenzo conform de AVG/GDPR en Belgische privacywetgeving.',
  alternates: { canonical: 'https://www.arvenzo.be/privacy' },
  robots: { index: false, follow: false },
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
        <p className="text-arvenzo-muted font-sans mb-12 text-xs">Laatste update: 25 februari 2026</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-8">

          <section>
            <p>Arvenzo exploiteert deze webshop en website om u een gepersonaliseerde winkelervaring te bieden. Arvenzo maakt gebruik van het Shopify-platform. Dit Privacybeleid beschrijft hoe wij uw persoonsgegevens verzamelen, gebruiken en openbaar maken wanneer u onze website bezoekt, gebruik maakt van onze diensten, een aankoop plaatst of anderszins contact met ons opneemt. In geval van conflict tussen onze Algemene Voorwaarden en dit Privacybeleid, heeft dit Privacybeleid voorrang met betrekking tot de verzameling, verwerking en openbaarmaking van uw persoonsgegevens.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">1. Verantwoordelijke voor de verwerking</h2>
            <ul className="space-y-1.5">
              <li>• <strong className="text-arvenzo-ink">Handelsnaam:</strong> Arvenzo</li>
              <li>• <strong className="text-arvenzo-ink">Officiële bedrijfsnaam:</strong> Van Eylen Jonas</li>
              <li>• <strong className="text-arvenzo-ink">Adres:</strong> Pandhoevestraat 62, 3130 Begijnendijk, België</li>
              <li>• <strong className="text-arvenzo-ink">KBO:</strong> 1027.570.389</li>
              <li>• <strong className="text-arvenzo-ink">BTW:</strong> BE1027.570.389</li>
              <li>• <strong className="text-arvenzo-ink">E-mail:</strong> <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">2. Welke persoonsgegevens verzamelen wij?</h2>
            <p className="mb-3">Wanneer we spreken over &ldquo;persoonsgegevens&rdquo;, bedoelen we informatie die u identificeert of redelijkerwijs aan u kan worden gekoppeld. Afhankelijk van hoe u onze diensten gebruikt, verzamelen of verwerken wij de volgende categorieën:</p>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Contactgegevens:</strong> naam, adres, factureringsadres, leveringsadres, telefoonnummer en e-mailadres.</li>
              <li>• <strong className="text-arvenzo-ink">Financiële informatie:</strong> betaalkaartgegevens en transactiedetails — verwerkt via Shopify Payments, nooit rechtstreeks door ons opgeslagen.</li>
              <li>• <strong className="text-arvenzo-ink">Accountinformatie:</strong> gebruikersnaam, wachtwoord, beveiligingsvragen en voorkeuren.</li>
              <li>• <strong className="text-arvenzo-ink">Transactie-informatie:</strong> bekeken artikelen, winkelmandje, verlanglijst, aankopen, retours en annuleringen.</li>
              <li>• <strong className="text-arvenzo-ink">Communicatie:</strong> de inhoud van uw berichten aan ons, bijv. via klantenondersteuning.</li>
              <li>• <strong className="text-arvenzo-ink">Apparaatinformatie:</strong> IP-adres, browser, netwerk en unieke identificatoren.</li>
              <li>• <strong className="text-arvenzo-ink">Gebruiksgegevens:</strong> hoe en wanneer u onze website bezoekt en gebruikt.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">3. Bronnen van persoonsgegevens</h2>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Rechtstreeks van u</strong> — wanneer u een account aanmaakt, de website bezoekt of contact met ons opneemt.</li>
              <li>• <strong className="text-arvenzo-ink">Automatisch via de website</strong> — via uw apparaat, cookies en vergelijkbare technologieën.</li>
              <li>• <strong className="text-arvenzo-ink">Via onze dienstverleners</strong> — wanneer zij namens ons persoonsgegevens verzamelen of verwerken.</li>
              <li>• <strong className="text-arvenzo-ink">Via partners of andere derden.</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">4. Waarvoor gebruiken wij uw persoonsgegevens?</h2>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Verlening van diensten:</strong> betalingen verwerken, bestellingen uitvoeren, account beheren, verzending regelen, retours en omruilingen faciliteren.</li>
              <li>• <strong className="text-arvenzo-ink">Marketing en reclame:</strong> het verzenden van promotionele communicatie per e-mail of post, en het tonen van online advertenties op basis van uw activiteit.</li>
              <li>• <strong className="text-arvenzo-ink">Veiligheid en fraudepreventie:</strong> verificatie van accounts, detectie van frauduleuze of illegale activiteiten.</li>
              <li>• <strong className="text-arvenzo-ink">Communicatie:</strong> klantenondersteuning en onderhoud van de zakelijke relatie.</li>
              <li>• <strong className="text-arvenzo-ink">Wettelijke verplichtingen:</strong> naleving van toepasselijke wetgeving en gerechtelijke verzoeken.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">5. Met wie delen wij uw persoonsgegevens?</h2>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Shopify</strong> en andere dienstverleners die namens ons diensten verlenen (IT-beheer, betalingsverwerking, data-analyse, klantenondersteuning, opslag, verzending).</li>
              <li>• <strong className="text-arvenzo-ink">Marketing- en zakenpartners</strong> voor het leveren van marketingdiensten — overeenkomstig hun eigen privacybeleid.</li>
              <li>• <strong className="text-arvenzo-ink">Op uw verzoek</strong> of met uw toestemming, bijv. voor de verzending van producten of via sociale media-integraties.</li>
              <li>• <strong className="text-arvenzo-ink">In het kader van bedrijfstransacties</strong> (zoals een fusie), wettelijke verplichtingen of handhaving van toepasselijke voorwaarden.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">6. Relatie met Shopify</h2>
            <p>De diensten worden gehost door Shopify, dat persoonsgegevens over uw toegang tot en gebruik van onze webshop verzamelt en verwerkt. Informatie die u indient, wordt overgedragen aan en gedeeld met Shopify en mogelijke derde partijen. Shopify is verantwoordelijk voor de verwerking van uw persoonsgegevens voor haar eigen doeleinden. Meer informatie: <a href="https://privacy.shopify.com/en" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">Shopify Consumer Privacy Policy</a>.</p>
          </section>

          <section id="cookies">
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">7. Cookies</h2>
            <p>Onze webshop maakt gebruik van:</p>
            <ul className="space-y-2 mt-2">
              <li>• <strong className="text-arvenzo-ink">Functionele cookies:</strong> noodzakelijk voor de werking van de winkel (winkelmandje, sessie).</li>
              <li>• <strong className="text-arvenzo-ink">Analytische cookies:</strong> voor het meten van het websitebezoek (Google Analytics).</li>
              <li>• <strong className="text-arvenzo-ink">Marketing cookies:</strong> Facebook Pixel, Klaviyo voor gepersonaliseerde reclame.</li>
            </ul>
            <p className="mt-3">U kunt cookies beheren via uw browserinstellingen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">8. Bewaartermijn</h2>
            <p>Wij bewaren uw persoonsgegevens zolang als nodig voor de uitvoering van de overeenkomst en maximaal 7 jaar conform de Belgische boekhoudwetgeving, of langer indien een wettelijke bewaarplicht van toepassing is.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">9. Uw rechten (AVG/GDPR)</h2>
            <p className="mb-3">Afhankelijk van uw verblijfplaats heeft u de volgende rechten:</p>
            <ul className="space-y-2">
              <li>• <strong className="text-arvenzo-ink">Recht op inzage:</strong> u kunt opvragen welke gegevens wij over u bewaren.</li>
              <li>• <strong className="text-arvenzo-ink">Recht op rectificatie:</strong> onjuiste gegevens laten corrigeren.</li>
              <li>• <strong className="text-arvenzo-ink">Recht op verwijdering:</strong> verzoek tot wissing van uw gegevens.</li>
              <li>• <strong className="text-arvenzo-ink">Recht op overdraagbaarheid:</strong> een kopie van uw gegevens ontvangen.</li>
              <li>• <strong className="text-arvenzo-ink">Recht van bezwaar en beperking</strong> van de verwerking voor bepaalde doeleinden.</li>
              <li>• <strong className="text-arvenzo-ink">Intrekking van toestemming:</strong> voor verwerkingen gebaseerd op toestemming kunt u deze te allen tijde intrekken.</li>
              <li>• <strong className="text-arvenzo-ink">Afmelden marketing:</strong> gebruik de afmeldlink in elke e-mail.</li>
            </ul>
            <p className="mt-3">Verzoeken kunt u richten aan <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>. U kunt ook een klacht indienen bij de <strong>Gegevensbeschermingsautoriteit (GBA)</strong> via <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">gegevensbeschermingsautoriteit.be</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">10. Internationale doorgifte</h2>
            <p>Uw persoonsgegevens kunnen worden overgedragen naar landen buiten de EER. Indien van toepassing, baseren wij ons op erkende doorgifte-mechanismen zoals de Standaardcontractbepalingen van de Europese Commissie.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">11. Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen. Geen enkel systeem is echter volledig onfeilbaar. Wij adviseren u geen gevoelige informatie via onbeveiligde kanalen te versturen.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">12. Kinderen</h2>
            <p>Onze diensten zijn niet gericht op kinderen jonger dan 16 jaar. Wij verzamelen niet bewust persoonsgegevens van minderjarigen. Bent u ouder of voogd en heeft uw kind gegevens verstrekt? Neem dan contact op via <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">13. Wijzigingen aan dit beleid</h2>
            <p>Wij kunnen dit Privacybeleid te allen tijde bijwerken. De meest recente versie is altijd beschikbaar op onze website. Bij substantiële wijzigingen informeren wij u via e-mail of een prominente mededeling op de website.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
