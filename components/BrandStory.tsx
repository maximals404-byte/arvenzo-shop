import Image from 'next/image';
import Link from 'next/link';

export default function BrandStory() {
  return (
    <section className="bg-arvenzo-cream overflow-hidden">
      {/* Top: editorial full-bleed image block */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=85&auto=format&fit=crop"
          alt="Mountain landscape"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-arvenzo-dark/80 via-arvenzo-dark/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 max-w-7xl mx-auto">
          <div className="max-w-lg">
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-4">
              Ons verhaal
            </p>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-arvenzo-cream leading-[0.95]">
              Gemaakt voor<br />
              <em className="not-italic text-arvenzo-orange">avonturiers.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom: text + features */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-arvenzo-ink font-sans text-lg leading-relaxed">
            Arvenzo is geboren uit een passie voor de natuur en moderne esthetiek. Elk ontwerp is een ode aan de rust van berglandschappen en het avontuur dat daarin schuilt.
          </p>
          <p className="text-arvenzo-muted font-sans leading-relaxed mt-4">
            Elke collectie — van <strong className="text-arvenzo-ink font-medium">Crescent Peak</strong> tot <strong className="text-arvenzo-ink font-medium">Starry Compass</strong> — vertelt een eigen verhaal van exploratie. Onze designs combineren minimalisme met krachtige grafische verhalen, gedrukt met de hoogste kwaliteitsstandaarden.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 font-heading font-bold text-arvenzo-brown hover:gap-4 transition-all group"
          >
            Ontdek alle collecties
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { n: '7', label: 'Unieke collecties', sub: 'Elk met eigen identiteit' },
            { n: '28', label: 'Producten', sub: 'Hoodies, shirts, mugs & meer' },
            { n: '100%', label: 'Gedrukt in 🇩🇪', sub: 'Premium Duits vakmanschap' },
            { n: '15%', label: 'Korting', sub: 'Op het volledige assortiment' },
          ].map((s) => (
            <div key={s.label} className="bg-arvenzo-cream-dark rounded-2xl p-6">
              <div className="font-heading font-black text-3xl text-arvenzo-brown">{s.n}</div>
              <div className="font-heading font-semibold text-arvenzo-ink text-sm mt-1">{s.label}</div>
              <div className="font-sans text-xs text-arvenzo-muted mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
