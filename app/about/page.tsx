import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Ons verhaal | Arvenzo',
  description: 'Ontdek het verhaal achter Arvenzo – een Belgisch merk voor avonturiers en natuur­liefhebbers. Premium streetwear met berglandschapdesigns, gedrukt in Europa.',
  alternates: { canonical: 'https://www.arvenzo.be/about' },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  const locale = getLocale();

  const values = [
    { emoji: '🌿', titleKey: 'about.value1.title', bodyKey: 'about.value1.body' },
    { emoji: '🏔️', titleKey: 'about.value2.title', bodyKey: 'about.value2.body' },
    { emoji: '🇧🇪', titleKey: 'about.value3.title', bodyKey: 'about.value3.body' },
  ];

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">{t('page.home', locale)}</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">{t('about.breadcrumb', locale)}</span>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          <div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-arvenzo-ink leading-tight mb-6">
              {t('about.hero.title', locale)}
            </h1>
            <p className="font-sans text-arvenzo-muted leading-relaxed">
              {t('about.hero.body', locale)}
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
          <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-muted mb-8 text-center">
            {t('about.values.title', locale)}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map(({ emoji, titleKey, bodyKey }) => (
              <div key={titleKey} className="bg-arvenzo-cream rounded-3xl p-7 text-center">
                <span className="text-4xl block mb-4">{emoji}</span>
                <p className="font-heading font-bold text-arvenzo-ink mb-2">{t(titleKey, locale)}</p>
                <p className="font-sans text-sm text-arvenzo-muted leading-relaxed">{t(bodyKey, locale)}</p>
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
            <h2 className="font-heading font-black text-3xl text-arvenzo-ink mb-5">{t('about.story.title', locale)}</h2>
            <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-4">
              <p>{t('about.story.p1', locale)}</p>
              <p>{t('about.story.p2', locale)}</p>
              <p>{t('about.story.p3', locale)}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 bg-arvenzo-cream rounded-3xl">
          <p className="font-heading font-black text-3xl text-arvenzo-ink mb-4">{t('about.cta.heading', locale)}</p>
          <p className="font-sans text-arvenzo-muted mb-8">{t('about.cta.body', locale)}</p>
          <Link href="/products" className="bg-arvenzo-brown text-arvenzo-cream font-heading font-bold px-10 py-4 rounded-full hover:bg-arvenzo-brown-light transition-colors text-sm tracking-wide">
            {t('about.cta.button', locale)}
          </Link>
        </div>
      </div>
    </div>
  );
}
