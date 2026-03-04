import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';
import { getReturns } from '@/lib/page-content/returns';

export const metadata: Metadata = {
  title: 'Herroepingsrecht & Retourbeleid | Arvenzo',
  description: 'Retourbeleid van Arvenzo conform Belgisch Wetboek van Economisch Recht en EU-richtlijn 2011/83/EU.',
  alternates: { canonical: 'https://www.arvenzo.be/returns' },
  robots: { index: true, follow: true },
};

export default function ReturnsPage() {
  const locale = getLocale();
  const r = getReturns(locale);

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">{t('page.home', locale)}</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">{t('returns.breadcrumb', locale)}</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">{r.title}</h1>
        <p className="text-arvenzo-muted font-sans mb-2 text-sm">{r.intro1}</p>
        <p className="text-arvenzo-muted font-sans mb-12 text-sm">{r.intro2}</p>

        <div className="font-sans text-sm text-arvenzo-muted leading-relaxed space-y-10">

          {/* Section 1: Right of withdrawal */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec1.heading}</h2>
            <p className="mb-4">{r.sec1.p1}</p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{r.sec1.termHeading}</h3>
            <p className="mb-4">{r.sec1.termText}</p>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{r.sec1.exerciseHeading}</h3>
            <p className="mb-3">{r.sec1.exerciseText}</p>
            <ul className="space-y-1.5 mb-4">
              <li>• <strong className="text-arvenzo-ink">E-mail:</strong> <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a></li>
              <li>• <strong className="text-arvenzo-ink">{r.sec1.exerciseMethods[1].split(':')[0]}:</strong> <Link href="/contact" className="text-arvenzo-brown hover:underline">{r.sec1.exerciseMethods[1].split(': ')[1]}</Link></li>
            </ul>
            <p>{r.sec1.exerciseNote}</p>
          </section>

          {/* Section 2: Exceptions */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec2.heading}</h2>
            <p className="mb-3">{r.sec2.intro}</p>
            <ul className="space-y-2">
              {r.sec2.exceptions.map((e, i) => (
                <li key={i}>• <strong className="text-arvenzo-ink">{e.strong}</strong> {e.rest}</li>
              ))}
            </ul>
          </section>

          {/* Section 3: Return procedure */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec3.heading}</h2>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-3">{r.sec3.stepsHeading}</h3>
            <div className="space-y-3 mb-6">
              {r.sec3.steps.map(({ step, text }) => (
                <div key={step} className="flex gap-5 p-5 bg-arvenzo-cream rounded-2xl">
                  <span className="font-heading font-black text-3xl text-arvenzo-brown/20 shrink-0 leading-none">{step}</span>
                  <p className="leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="font-heading font-semibold text-base text-arvenzo-ink mb-2">{r.sec3.conditionHeading}</h3>
            <p>{r.sec3.conditionText}</p>
          </section>

          {/* Section 4: Return costs */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec4.heading}</h2>
            <p>{r.sec4.body}</p>
          </section>

          {/* Section 5: Refund */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec5.heading}</h2>
            <p className="mb-4">{r.sec5.p1}</p>
            <p className="font-semibold text-arvenzo-ink mb-2">{r.sec5.conditionsHeading}</p>
            <ul className="space-y-2">
              {r.sec5.conditions.map((c, i) => (
                <li key={i}>• <strong className="text-arvenzo-ink">{c.strong}</strong> {c.rest}</li>
              ))}
            </ul>
          </section>

          {/* Section 6: Legal guarantee */}
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">{r.sec6.heading}</h2>
            <p className="mb-3">{r.sec6.p1}</p>
            <ul className="space-y-2">
              {r.sec6.items.map((item, i) => {
                if (!item.includes('support@arvenzo.eu')) {
                  return <li key={i}>• {item}</li>;
                }
                const [before, after] = item.split('support@arvenzo.eu');
                return (
                  <li key={i}>• {before}<a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>{after}</li>
                );
              })}
            </ul>
          </section>

          {/* Model form */}
          <section className="bg-arvenzo-cream rounded-2xl p-6 border border-arvenzo-cream-dark">
            <h2 className="font-heading font-bold text-lg text-arvenzo-ink mb-4">{r.modelForm.heading}</h2>
            <p className="italic mb-4">{r.modelForm.intro}</p>
            <div className="space-y-2">
              <p><strong>{r.modelForm.toLabel}</strong></p>
              {r.modelForm.toAddress.split('\n').map((line, i) => {
                if (!line.includes('support@arvenzo.eu')) return <p key={i}>{line}</p>;
                const [before, after] = line.split('support@arvenzo.eu');
                return <p key={i}>{before}<a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>{after}</p>;
              })}
              <p className="pt-3">{r.modelForm.bodyText}</p>
              <p className="pt-2">{r.modelForm.orderedOn}</p>
              <p>{r.modelForm.consumerName}</p>
              <p>{r.modelForm.consumerAddress}</p>
              <p>{r.modelForm.signature}</p>
              <p>{r.modelForm.date}</p>
              <p className="pt-3 text-xs">{r.modelForm.footnote}</p>
            </div>
          </section>

          {/* Return box */}
          <div className="bg-arvenzo-brown/5 border border-arvenzo-brown/10 rounded-2xl p-5 flex gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-heading font-semibold text-arvenzo-ink text-sm">{r.returnBox.heading}</p>
              <p className="font-sans text-xs text-arvenzo-muted mt-1">
                {r.returnBox.emailPre}{' '}
                <a href="mailto:support@arvenzo.eu" className="text-arvenzo-brown hover:underline">support@arvenzo.eu</a>{' '}
                {r.returnBox.orContact}{' '}
                <Link href="/contact" className="text-arvenzo-brown hover:underline">{r.returnBox.contactText}</Link>.{' '}
                {r.returnBox.orderNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
