import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] flex items-end overflow-hidden bg-arvenzo-dark">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2400&q=85&auto=format&fit=crop"
        alt="Mountain landscape at night"
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-arvenzo-dark via-arvenzo-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-arvenzo-dark/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-arvenzo-orange/20 border border-arvenzo-orange/40 text-arvenzo-orange text-[11px] font-sans font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-arvenzo-orange animate-pulse" />
          Nieuw — Crescent Peak & Lunar Horizon
        </div>

        <h1 className="font-heading font-black text-[clamp(3.5rem,10vw,8rem)] text-arvenzo-cream leading-[0.92] tracking-tight">
          Draag het<br />
          <em className="not-italic text-arvenzo-orange">avontuur.</em>
        </h1>

        <p className="mt-6 text-arvenzo-cream/60 font-sans text-lg sm:text-xl max-w-md leading-relaxed">
          Premium streetwear voor wie de bergen voelt. Limited edition, gedrukt in Duitsland.
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-arvenzo-cream text-arvenzo-ink font-heading font-bold px-8 py-4 rounded-full text-[15px] tracking-wide hover:bg-arvenzo-orange hover:text-arvenzo-cream transition-all active:scale-[0.97]"
          >
            Shop de collectie
          </Link>
          <Link
            href="/products/crescent-peak-hoodie"
            className="inline-flex items-center gap-2 border border-arvenzo-cream/25 text-arvenzo-cream font-sans font-medium px-8 py-4 rounded-full text-[15px] hover:border-arvenzo-cream/60 transition-all"
          >
            Bestseller →
          </Link>
        </div>
      </div>

      {/* Bottom product preview */}
      <div className="absolute bottom-0 right-0 h-[85%] w-auto opacity-80 pointer-events-none hidden md:block">
        <Image
          src="https://cdn.shopify.com/s/files/1/0971/8543/1895/files/front-basic-unisex-hoodie-arctic-white-482-c070-2000x.png"
          alt="Crescent Peak Hoodie"
          width={600}
          height={600}
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
