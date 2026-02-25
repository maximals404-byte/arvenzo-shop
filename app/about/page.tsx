import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ons verhaal | Arvenzo',
  description: 'Ontdek het verhaal achter Arvenzo – een Belgisch merk voor avonturiers en natuur­liefhebbers.',
};

export default function AboutPage() {
  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Ons verhaal</span>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          <div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-arvenzo-ink leading-tight mb-6">
              Gemaakt voor mensen die buiten leven
            </h1>
            <p className="font-sans text-arvenzo-muted leading-relaxed">
              Arvenzo is een Belgisch lifestyle-merk dat avontuur en rust combineert in elk ontwerp. We geloven dat kleding meer kan zijn dan stof — het kan een gevoel oproepen, een herinnering, een uitnodiging om buiten te zijn.
            </p>
          </div>
          <div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden">
            <Image
              src="/images/woman-hoodie.jpg"
              alt="Vrouw in Arvenzo hoodie in het bos"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-8 text-center">Onze waarden</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: '🌿', titel: 'Duurzaam', tekst: 'On-demand productie betekent geen overproductie. Elk stuk wordt gemaakt voor de persoon die het draagt.' },
              { emoji: '🏔️', titel: 'Avontuurlijk', tekst: 'Elk ontwerp verwijst naar natuur, bergen en vrijheid. Kleding voor mensen die buiten zijn.' },
              { emoji: '🇧🇪', titel: 'Belgisch', tekst: 'Opgericht in Begijnendijk, gedrukt in Europa. Trots op onze roots, met een open blik op de wereld.' },
            ].map(({ emoji, titel, tekst }) => (
              <div key={titel} className="bg-arvenzo-cream rounded-3xl p-7 text-center">
                <span className="text-4xl block mb-4">{emoji}</span>
                <p className="font-heading font-bold text-arvenzo-ink mb-2">{titel}</p>
                <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">{tekst}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          <div className="relative h-72 rounded-3xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/man-sweatshirt.jpg"
              alt="Man in Arvenzo sweatshirt bij kampvuur"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-heading font-black text-3xl text-arvenzo-ink mb-5">Het begin</h2>
            <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-4">
              <p>Arvenzo ontstond vanuit een eenvoudige gedachte: waarom zijn kleding en natuur zo zelden verbonden? We wilden een merk bouwen dat mensen herinnert aan de rust van een bos, de vrijheid van een bergpad, de stilte bij een kampvuur.</p>
              <p>Elk collectienaam — Crescent Peak, Lunar Horizon, Rustic Retreat — vertelt een verhaal. Een verhaal dat jij draagt.</p>
              <p>We zijn klein, bewust en ambitieus. We groeien langzaam zodat elk product de aandacht krijgt die het verdient.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 bg-arvenzo-cream rounded-3xl">
          <p className="font-heading font-black text-3xl text-arvenzo-ink mb-4">Klaar voor het avontuur?</p>
          <p className="font-sans text-arvenzo-muted mb-8">Ontdek onze collecties en vind jouw stuk.</p>
          <Link href="/products" className="bg-arvenzo-brown text-arvenzo-cream font-heading font-bold px-10 py-4 rounded-full hover:bg-arvenzo-brown-light transition-colors text-sm tracking-wide">
            Shop nu
          </Link>
        </div>
      </div>
    </div>
  );
}
