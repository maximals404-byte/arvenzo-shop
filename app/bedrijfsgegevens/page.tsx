import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bedrijfsgegevens & Wettelijke Vermeldingen | Arvenzo',
  description: 'Officiële bedrijfsgegevens van Arvenzo (Van Eylen Jonas), conform Belgische wetgeving.',
};

export default function BedrijfsgegevensPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Bedrijfsgegevens</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Bedrijfsgegevens & Wettelijke Vermeldingen</h1>
        <p className="text-arvenzo-muted font-sans mb-2 text-sm">
          Conform de Belgische Wet van 11 maart 2003 betreffende bepaalde juridische aspecten van de diensten van de informatiemaatschappij en Boek VI van het Wetboek van Economisch Recht (WER).
        </p>
        <p className="text-arvenzo-muted font-sans mb-12 text-xs">Laatste update: 14 januari 2026</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-10">

          <section className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark">
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-5">Identificatie van de onderneming</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Winkelnaam', 'Arvenzo'],
                ['Officiële bedrijfsnaam', 'Van Eylen Jonas'],
                ['Rechtsvorm', 'Eenmanszaak'],
                ['Eigenaar / Zaakvoerder', 'Jonas Van Eylen'],
                ['Maatschappelijke zetel', 'Pandhoevestraat 62, 3130 Begijnendijk, België'],
                ['Ondernemingsnummer (KBO)', '1027.570.389'],
                ['BTW-identificatienummer', 'BE1027.570.389'],
                ['RPR (Rechtbank van Koophandel)', 'RPR Leuven'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider text-arvenzo-muted/60 mb-0.5">{label}</p>
                  <p className="text-arvenzo-ink font-medium text-sm">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Contactgegevens</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Website', 'www.arvenzo.be'],
                ['E-mailadres', 'support@arvenzo.eu'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider text-arvenzo-muted/60 mb-0.5">{label}</p>
                  <p className="text-arvenzo-ink font-medium text-sm">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Intellectuele Eigendom</h2>
            <p>De inhoud van deze website, waaronder begrepen maar niet beperkt tot logo&apos;s, merken, lay-out, teksten, afbeeldingen, video&apos;s en software, is beschermd door intellectuele eigendomsrechten die toebehoren aan Arvenzo (Van Eylen Jonas) of aan derden die hiervoor een licentie hebben verleend. Het is de gebruiker niet toegestaan om elementen van de website geheel of gedeeltelijk te kopiëren, te reproduceren of te verspreiden zonder de uitdrukkelijke schriftelijke toestemming van de eigenaar.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Beperking van Aansprakelijkheid</h2>
            <p className="mb-3">Arvenzo streeft naar de grootst mogelijke nauwkeurigheid van de verstrekte informatie. Wij kunnen echter niet garanderen dat de website te allen tijde volledig foutloos of actueel is. Arvenzo behoudt zich het recht voor om de inhoud op elk moment en zonder voorafgaande kennisgeving te wijzigen.</p>
            <p>Indien deze website links bevat naar websites van derden, is Arvenzo niet verantwoordelijk voor de inhoud, het privacybeleid of het beheer van dergelijke websites.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Toezichthoudende Autoriteit</h2>
            <p>FOD Economie, K.M.O., Middenstand en Energie — Algemene Directie Economische Inspectie.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Online Geschillenbeslechting (ODR)</h2>
            <p className="mb-2">De Europese Commissie biedt een platform voor online geschillenbeslechting aan voor consumenten:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">ec.europa.eu/consumers/odr</a>.
            </p>
            <p>In België kunt u ook terecht bij de{' '}
              <a href="https://consumentenombudsdienst.be/nl" target="_blank" rel="noopener noreferrer" className="text-arvenzo-brown hover:underline">Consumentenombudsdienst</a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">Toepasselijk Recht en Bevoegde Rechtbank</h2>
            <p>Alle geschillen met betrekking tot deze website zijn onderworpen aan het Belgisch recht en vallen onder de uitsluitende bevoegdheid van de rechtbanken van het arrondissement Leuven.</p>
          </section>

          <div className="bg-arvenzo-cream rounded-2xl p-5 border border-arvenzo-cream-dark text-xs">
            <p className="font-heading font-semibold text-arvenzo-ink text-sm mb-2">Gerelateerde pagina&apos;s</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/privacy" className="text-arvenzo-brown hover:underline">Privacybeleid</Link>
              <Link href="/terms" className="text-arvenzo-brown hover:underline">Algemene voorwaarden</Link>
              <Link href="/returns" className="text-arvenzo-brown hover:underline">Herroepingsrecht</Link>
              <Link href="/shipping" className="text-arvenzo-brown hover:underline">Verzendbeleid</Link>
              <Link href="/contact" className="text-arvenzo-brown hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
