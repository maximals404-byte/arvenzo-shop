import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/shopify';

export default function LifestyleSection({ products }: { products: Product[] }) {
  const hoodie = products.find(p => p.productType === 'Hoodies');
  const sweatshirt = products.find(p => p.productType === 'Sweatshirts');
  const shirt = products.find(p => p.productType === 'Unisex-Shirts');
  const mug = products.find(p => p.productType === 'Trinkgefäße');

  return (
    <section className="bg-arvenzo-cream">

      {/* Row 1: Full-bleed dark — man in sweatshirt at camping */}
      <div className="relative overflow-hidden min-h-[580px] flex items-center bg-arvenzo-dark">
        <Image
          src="/images/man-sweatshirt.jpg"
          alt="Man in Arvenzo sweatshirt"
          fill
          className="object-cover object-top opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-arvenzo-dark/85 via-arvenzo-dark/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20">
          <div className="max-w-lg">
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-4">
              Comfortabel overal
            </p>
            <h2 className="font-heading font-black text-5xl sm:text-6xl text-arvenzo-cream leading-[0.95]">
              Van camping<br />
              <em className="not-italic text-arvenzo-orange">tot stad.</em>
            </h2>
            <p className="mt-5 text-arvenzo-cream/60 font-sans text-lg max-w-sm leading-relaxed">
              Premium stof, uniek design. Gedragen door avonturiers die stijl niet vergeten.
            </p>
            {sweatshirt && (
              <Link
                href={`/products/${sweatshirt.handle}`}
                className="inline-flex items-center gap-2 mt-8 bg-arvenzo-cream text-arvenzo-ink font-heading font-bold px-7 py-3.5 rounded-full hover:bg-arvenzo-orange hover:text-arvenzo-cream transition-all text-sm tracking-wide"
              >
                Shop sweatshirts — {formatPrice(sweatshirt.price)}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Two columns — woman hoodie + woman mug */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Woman with hoodie */}
        <div className="relative overflow-hidden min-h-[500px] group">
          <Image
            src="/images/woman-hoodie.jpg"
            alt="Vrouw in Arvenzo hoodie"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-arvenzo-dark/75 via-arvenzo-dark/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-arvenzo-orange text-[11px] uppercase tracking-widest font-sans mb-1">Bestseller</p>
            <h3 className="font-heading font-black text-3xl text-arvenzo-cream leading-tight mb-3">
              De perfecte hoodie
            </h3>
            {hoodie && (
              <Link
                href={`/products/${hoodie.handle}`}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-arvenzo-cream font-sans font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white/25 transition-all"
              >
                Ontdek — {formatPrice(hoodie.price)} →
              </Link>
            )}
          </div>
        </div>

        {/* Woman with mug */}
        <div className="relative overflow-hidden min-h-[500px] group">
          <Image
            src="/images/woman-mug.jpg"
            alt="Vrouw met Arvenzo mug"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-arvenzo-dark/75 via-arvenzo-dark/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-arvenzo-orange text-[11px] uppercase tracking-widest font-sans mb-1">Cadeau tip</p>
            <h3 className="font-heading font-black text-3xl text-arvenzo-cream leading-tight mb-3">
              Begin elke dag goed
            </h3>
            {mug && (
              <Link
                href={`/products/${mug.handle}`}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-arvenzo-cream font-sans font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white/25 transition-all"
              >
                Ontdek — {formatPrice(mug.price)} →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Man in forest shirt — full-bleed light */}
      <div className="relative overflow-hidden min-h-[500px] flex items-center bg-[#EBE5DF]">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-[45%]">
          <Image
            src="/images/man-shirt.jpg"
            alt="Man in Arvenzo shirt in het bos"
            fill
            className="object-cover object-left"
            sizes="50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#EBE5DF]/20 to-[#EBE5DF]" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20">
          <div className="max-w-md">
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-4">
              Nieuw in collectie
            </p>
            <h2 className="font-heading font-black text-5xl text-arvenzo-ink leading-[0.95]">
              Stijl in<br />de natuur.
            </h2>
            <p className="mt-5 text-arvenzo-muted font-sans text-lg max-w-sm leading-relaxed">
              Lichte premium shirts met krachtige designs. Perfect voor warme avonturen.
            </p>
            {shirt && (
              <Link
                href={`/products/${shirt.handle}`}
                className="inline-flex items-center gap-2 mt-8 bg-arvenzo-ink text-arvenzo-cream font-heading font-bold px-7 py-3.5 rounded-full hover:bg-arvenzo-brown transition-all text-sm tracking-wide"
              >
                Shop shirts — {formatPrice(shirt.price)}
              </Link>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
