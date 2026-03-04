import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';

export default function BrandStory() {
  const locale = getLocale();

  const stats = [
    { numKey: 'brand.stat1.num', labelKey: 'brand.stat1.label', subKey: 'brand.stat1.sub' },
    { numKey: 'brand.stat2.num', labelKey: 'brand.stat2.label', subKey: 'brand.stat2.sub' },
    { numKey: 'brand.stat3.num', labelKey: 'brand.stat3.label', subKey: 'brand.stat3.sub' },
    { numKey: 'brand.stat4.num', labelKey: 'brand.stat4.label', subKey: 'brand.stat4.sub' },
  ];

  return (
    <section className="bg-arvenzo-cream overflow-hidden">
      {/* Top: editorial full-bleed image block */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=85&auto=format&fit=crop"
          alt="Berglandschap – inspiratie achter het Arvenzo merk"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-arvenzo-dark/80 via-arvenzo-dark/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 max-w-7xl mx-auto">
          <div className="max-w-lg">
            <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-4">
              {t('brand.label', locale)}
            </p>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-arvenzo-cream leading-[0.95]">
              {t('brand.heading1', locale)}<br />
              <em className="not-italic text-arvenzo-orange">{t('brand.heading2', locale)}</em>
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom: text + features */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-arvenzo-ink font-sans text-lg leading-relaxed">
            {t('brand.body1', locale)}
          </p>
          <p className="text-arvenzo-muted font-sans leading-relaxed mt-4">
            {t('brand.body2', locale)}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 font-heading font-bold text-arvenzo-brown hover:gap-4 transition-all group"
          >
            {t('brand.cta', locale)}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ numKey, labelKey, subKey }) => (
            <div key={labelKey} className="bg-arvenzo-cream-dark rounded-2xl p-6">
              <div className="font-heading font-black text-3xl text-arvenzo-brown">{t(numKey, locale)}</div>
              <div className="font-heading font-semibold text-arvenzo-ink text-sm mt-1">{t(labelKey, locale)}</div>
              <div className="font-sans text-xs text-arvenzo-muted mt-0.5">{t(subKey, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
