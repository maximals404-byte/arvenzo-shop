import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/shopify';

interface Props {
  products: Product[];
}

// Show the 3 collections as editorial large tiles
const COLLECTION_META: Record<string, { label: string; desc: string; bg: string }> = {
  'Crescent Peak': {
    label: 'Crescent Peak',
    desc: 'Maan boven een berglandschap',
    bg: 'from-stone-900 to-stone-700',
  },
  'Lunar Horizon': {
    label: 'Lunar Horizon',
    desc: 'De horizon onder sterrenhemel',
    bg: 'from-slate-900 to-blue-900',
  },
  'Rustic Retreat': {
    label: 'Rustic Retreat',
    desc: 'Terugkeer naar de natuur',
    bg: 'from-amber-900 to-stone-800',
  },
  'Pathfinder Edition': {
    label: 'Pathfinder Edition',
    desc: 'Voor wie zijn eigen weg gaat',
    bg: 'from-green-900 to-stone-800',
  },
  'Natura Compass': {
    label: 'Natura Compass',
    desc: 'Geleid door de natuur',
    bg: 'from-emerald-900 to-teal-800',
  },
  'Starry Compass': {
    label: 'Starry Compass',
    desc: 'Navigeer op de sterren',
    bg: 'from-indigo-900 to-slate-900',
  },
  'Mountain nature': {
    label: 'Mountain Nature',
    desc: 'De berg als thuis',
    bg: 'from-neutral-800 to-stone-700',
  },
};

export default function CollectionSpotlight({ products }: Props) {
  // Build collection → representative hoodie map
  const collections = Object.entries(COLLECTION_META).map(([name, meta]) => {
    const rep = products.find(
      (p) => p.title.toLowerCase().startsWith(name.toLowerCase()) &&
             (p.productType === 'Hoodies' || p.handle.includes('hoodie'))
    ) ?? products.find((p) => p.title.toLowerCase().startsWith(name.toLowerCase()));
    return { name, meta, product: rep };
  }).filter((c) => c.product);

  return (
    <section className="py-24 bg-arvenzo-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-2">
              Collecties
            </p>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-arvenzo-cream leading-tight">
              Elke collectie<br />vertelt een verhaal
            </h2>
          </div>
          <Link href="/products" className="text-arvenzo-cream/50 text-sm font-sans hover:text-arvenzo-orange transition-colors whitespace-nowrap">
            Bekijk alles →
          </Link>
        </div>

        {/* Grid: 3 large + 4 smaller */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {collections.slice(0, 3).map(({ name, meta, product }, i) => (
            <Link
              key={name}
              href={`/products/${product!.handle}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] ${i === 0 ? 'col-span-2 lg:col-span-1 aspect-[16/9] lg:aspect-[3/4]' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${meta.bg}`} />
              {product!.images[0] && (
                <Image
                  src={product!.images[0].url}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 mix-blend-luminosity opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-heading font-black text-xl text-arvenzo-cream">{meta.label}</div>
                <div className="text-arvenzo-cream/60 text-xs font-sans mt-0.5">{meta.desc}</div>
                <div className="text-arvenzo-orange text-sm font-sans font-medium mt-3">
                  {formatPrice(product!.price)} →
                </div>
              </div>
            </Link>
          ))}
          {collections.slice(3).map(({ name, meta, product }) => (
            <Link
              key={name}
              href={`/products/${product!.handle}`}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${meta.bg}`} />
              {product!.images[0] && (
                <Image
                  src={product!.images[0].url}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-contain p-5 mix-blend-luminosity opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-heading font-bold text-sm text-arvenzo-cream leading-tight">{meta.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
