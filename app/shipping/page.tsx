import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';
import { getShipping } from '@/lib/page-content/shipping';

export const metadata: Metadata = {
  title: 'Verzendbeleid | Arvenzo',
  description: 'Verzendbeleid van Arvenzo conform Belgisch Wetboek van Economisch Recht en EU-richtlijnen voor e-commerce.',
  alternates: { canonical: 'https://www.arvenzo.be/shipping' },
  robots: { index: true, follow: true },
};

export default function ShippingPage() {
  const locale = getLocale();
  const s = getShipping(locale);

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">{t('page.home', locale)}</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">{t('shipping.breadcrumb', locale)}</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">{s.title}</h1>
        <p className="text-arvenzo-muted font-sans mb-2 text-sm">{s.intro}</p>
        <p className="text-arvenzo-muted font-sans mb-12 text-xs">{t('shipping.updated', locale)}</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-10">

          {/* Section 1: Processing time */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec1.heading}</h2>
            <p className="mb-3">{s.sec1.intro}</p>
            <ul className="space-y-2">
              {s.sec1.bullets.map((b, i) => (
                <li key={i}>• <strong className="text-arvenzo-ink">{b.strong}</strong> {b.rest}</li>
              ))}
            </ul>
          </section>

          {/* Section 2: Delivery times + table */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec2.heading}</h2>
            <p className="mb-4">{s.sec2.intro}</p>
            <div className="overflow-x-auto rounded-2xl border border-arvenzo-cream-dark">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-arvenzo-cream-dark text-arvenzo-ink">
                    <th className="text-left px-5 py-3 font-semibold">{s.sec2.colDest}</th>
                    <th className="text-left px-5 py-3 font-semibold">{s.sec2.colTime}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-arvenzo-cream-dark">
                  {s.sec2.table.map(([dest, time]) => (
                    <tr key={dest} className="bg-arvenzo-cream hover:bg-arvenzo-cream-dark/40 transition-colors">
                      <td className="px-5 py-3 text-arvenzo-ink font-medium">{dest}</td>
                      <td className="px-5 py-3 text-arvenzo-muted">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs italic">{s.sec2.note}</p>
          </section>

          {/* Section 3: Shipping costs */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec3.heading}</h2>
            <p>{s.sec3.body}</p>
          </section>

          {/* Section 4: Carriers & tracking */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec4.heading}</h2>
            <p className="mb-3">{s.sec4.p1}</p>
            <p>{s.sec4.p2}</p>
          </section>

          {/* Section 5: Delivery options */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec5.heading}</h2>
            <ul className="space-y-2">
              {s.sec5.bullets.map((b, i) => (
                <li key={i}>• <strong className="text-arvenzo-ink">{b.strong}</strong> {b.rest}</li>
              ))}
            </ul>
          </section>

          {/* Section 6: Delivery issues */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec6.heading}</h2>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{s.sec6.sub1.heading}</h3>
            <p className="mb-4">{s.sec6.sub1.content}</p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{s.sec6.sub2.heading}</h3>
            <p className="mb-4">
              {(() => {
                const [before, after] = s.sec6.sub2.content.split('support@arvenzo.eu');
                return <>{before}<a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>{after}</>;
              })()}
            </p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{s.sec6.sub3.heading}</h3>
            <p>{s.sec6.sub3.content}</p>
          </section>

          {/* Section 7: International */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{s.sec7.heading}</h2>
            <ul className="space-y-2">
              {s.sec7.bullets.map((b, i) => (
                <li key={i}>• <strong className="text-arvenzo-ink">{b.strong}</strong> {b.rest}</li>
              ))}
            </ul>
          </section>

          {/* Contact box */}
          <div className="bg-arvenzo-brown/5 border border-arvenzo-brown/10 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-arvenzo-ink text-sm mb-3">{s.contactBox.heading}</h3>
            <div className="space-y-1 text-xs text-arvenzo-muted">
              <p><strong className="text-arvenzo-ink">Arvenzo</strong> · Van Eylen Jonas</p>
              <p>Pandhoevestraat 62, 3130 Begijnendijk, België</p>
              <p>E-mail: <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a></p>
              <p>Tel: <a href="tel:+32456882518" className="text-arvenzo-brown hover:underline">+32 456 88 25 18</a></p>
              <p>Website: www.arvenzo.be</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
