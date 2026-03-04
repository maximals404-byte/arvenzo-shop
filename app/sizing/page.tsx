import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Maatgids | Arvenzo',
  description: 'Vind de perfecte maat met onze uitgebreide maatgids voor hoodies, sweatshirts en shirts.',
  alternates: { canonical: 'https://www.arvenzo.be/sizing' },
  robots: { index: true, follow: true },
};

export default function SizingPage() {
  const locale = getLocale();

  const tops = [
    { maat: 'XS', borst: '86–91', lengte: '65', schouder: '42' },
    { maat: 'S', borst: '91–97', lengte: '68', schouder: '44' },
    { maat: 'M', borst: '97–102', lengte: '71', schouder: '46' },
    { maat: 'L', borst: '102–107', lengte: '74', schouder: '49' },
    { maat: 'XL', borst: '107–112', lengte: '76', schouder: '51' },
    { maat: '2XL', borst: '112–117', lengte: '79', schouder: '53' },
    { maat: '3XL', borst: '117–122', lengte: '81', schouder: '55' },
    { maat: '4XL', borst: '122–128', lengte: '83', schouder: '57' },
    { maat: '5XL', borst: '128–134', lengte: '85', schouder: '59' },
  ];

  const measures = [
    { labelKey: 'sizing.measure.1.label', descKey: 'sizing.measure.1.desc' },
    { labelKey: 'sizing.measure.2.label', descKey: 'sizing.measure.2.desc' },
    { labelKey: 'sizing.measure.3.label', descKey: 'sizing.measure.3.desc' },
  ];

  const fitBullets = ['sizing.fit.b1', 'sizing.fit.b2', 'sizing.fit.b3', 'sizing.fit.b4'];

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">{t('page.home', locale)}</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">{t('sizing.breadcrumb', locale)}</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">{t('sizing.title', locale)}</h1>
        <p className="text-arvenzo-muted font-sans mb-12">{t('sizing.note', locale)}</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-2">{t('sizing.hoodies.title', locale)}</h2>
            <p className="font-sans text-sm text-arvenzo-muted mb-5">{t('sizing.hoodies.model', locale)}</p>
            <div className="overflow-x-auto rounded-2xl border border-arvenzo-cream-dark">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-arvenzo-cream-dark text-arvenzo-ink">
                    <th className="text-left px-5 py-3 font-semibold">{t('sizing.col.size', locale)}</th>
                    <th className="text-left px-5 py-3 font-semibold">{t('sizing.col.chest', locale)}</th>
                    <th className="text-left px-5 py-3 font-semibold">{t('sizing.col.length', locale)}</th>
                    <th className="text-left px-5 py-3 font-semibold">{t('sizing.col.shoulder', locale)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arvenzo-cream-dark">
                  {tops.map(row => (
                    <tr key={row.maat} className="bg-arvenzo-cream hover:bg-arvenzo-cream-dark/40 transition-colors">
                      <td className="px-5 py-3 font-heading font-bold text-arvenzo-ink">{row.maat}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{row.borst}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{row.lengte}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{row.schouder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{t('sizing.measure.title', locale)}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {measures.map(({ labelKey, descKey }) => (
                <div key={labelKey} className="bg-arvenzo-cream rounded-2xl p-5">
                  <p className="font-heading font-semibold text-arvenzo-ink text-sm mb-2">{t(labelKey, locale)}</p>
                  <p className="font-sans text-xs text-arvenzo-muted leading-relaxed">{t(descKey, locale)}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{t('sizing.fit.title', locale)}</h2>
            <div className="bg-arvenzo-cream rounded-2xl p-6 font-sans text-sm text-arvenzo-muted space-y-2 leading-relaxed">
              {fitBullets.map(key => (
                <p key={key}>• {t(key, locale)}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
