import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Maatgids | Arvenzo',
  description: 'Vind de perfecte maat met onze uitgebreide maatgids voor hoodies, sweatshirts en shirts.',
};

export default function SizingPage() {
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

  return (
    <div className="bg-arvenzo-light min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-[100px] pb-24">
        <nav className="flex items-center gap-2 text-xs font-sans text-arvenzo-muted mb-10">
          <Link href="/" className="hover:text-arvenzo-brown transition-colors">Home</Link>
          <span>/</span>
          <span className="text-arvenzo-ink">Maatgids</span>
        </nav>

        <h1 className="font-heading font-black text-4xl text-arvenzo-ink mb-3">Maatgids</h1>
        <p className="text-arvenzo-muted font-sans mb-12">Alle maten in centimeters (cm). Twijfel je? Kies een maat groter.</p>

        <div className="space-y-10">
          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-2">Hoodies & Sweatshirts</h2>
            <p className="font-sans text-sm text-arvenzo-muted mb-5">Unisex pasvorm. Onze modellen dragen standaard maat M.</p>
            <div className="overflow-x-auto rounded-2xl border border-arvenzo-cream-dark">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="bg-arvenzo-cream-dark text-arvenzo-ink">
                    <th className="text-left px-5 py-3 font-semibold">Maat</th>
                    <th className="text-left px-5 py-3 font-semibold">Borsomtrek (cm)</th>
                    <th className="text-left px-5 py-3 font-semibold">Lengte (cm)</th>
                    <th className="text-left px-5 py-3 font-semibold">Schouder (cm)</th>
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
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Hoe meet je jezelf op?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Borsomtrek', tekst: 'Meet horizontaal rond het breedste deel van je borst, onder je oksels.' },
                { label: 'Lengte', tekst: 'Meet van de schoudernaad (nek) tot de onderkant van het kledingstuk.' },
                { label: 'Schouder', tekst: 'Meet van schoudernaad tot schoudernaad, over je rug.' },
              ].map(({ label, tekst }) => (
                <div key={label} className="bg-arvenzo-cream rounded-2xl p-5">
                  <p className="font-heading font-semibold text-arvenzo-ink text-sm mb-2">{label}</p>
                  <p className="font-sans text-xs text-arvenzo-muted leading-relaxed">{tekst}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-xl text-arvenzo-ink mb-4">Pasvorm</h2>
            <div className="bg-arvenzo-cream rounded-2xl p-6 font-sans text-sm text-arvenzo-muted space-y-2 leading-relaxed">
              <p>• Onze hoodies en sweatshirts hebben een <strong className="text-arvenzo-ink">oversized tot regular fit</strong>.</p>
              <p>• Voor een regular fit kies je je normale maat.</p>
              <p>• Voor een iets ruimere, streetwear-look ga je één maat groter.</p>
              <p>• Na het eerste wassen kunnen producten <strong className="text-arvenzo-ink">maximaal 1-2% krimpen</strong>. Was altijd op 30°C.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
