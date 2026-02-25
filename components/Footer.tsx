import Link from 'next/link';
import MerchantBadge from '@/components/MerchantBadge';

export default function Footer() {
  return (
    <footer className="bg-arvenzo-ink text-arvenzo-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-heading font-black text-2xl tracking-[0.12em]">ARVENZO</div>
            <p className="mt-3 text-arvenzo-cream/40 text-sm font-sans leading-relaxed">
              Avontuur en rust in elk ontwerp. Belgisch merk, gedrukt in Europa.
            </p>
            <div className="flex gap-3 mt-5">
              {['Instagram', 'Facebook', 'TikTok'].map(s => (
                <a key={s} href={`https://${s.toLowerCase()}.com/arvenzo.be`} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-arvenzo-cream/30 hover:text-arvenzo-orange transition-colors font-sans tracking-widest uppercase">
                  {s}
                </a>
              ))}
            </div>
            <MerchantBadge />
          </div>

          {[
            {
              title: 'Shop',
              links: [
                ['Alle producten', '/products'],
                ['Hoodies', '/products?type=Hoodies'],
                ['Sweatshirts', '/products?type=Sweatshirts'],
                ['Shirts', '/products?type=Unisex-Shirts'],
                ['Mugs', '/products?type=Trinkgef%C3%A4%C3%9Fe'],
              ],
            },
            {
              title: 'Service',
              links: [
                ['Verzending', '/shipping'],
                ['Retourneren', '/returns'],
                ['Maatgids', '/sizing'],
                ['Contact', '/contact'],
                ['FAQ', '/faq'],
              ],
            },
            {
              title: 'Info',
              links: [
                ['Ons verhaal', '/about'],
                ['Privacybeleid', '/privacy'],
                ['Algemene voorwaarden', '/terms'],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-arvenzo-cream/30 mb-5">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-arvenzo-cream/50 hover:text-arvenzo-orange transition-colors font-sans">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-arvenzo-cream/20 font-sans">
          <span>© {new Date().getFullYear()} Arvenzo · Van Eylen Jonas, 3130 Begijnendijk, België</span>
          <div className="flex gap-3">
            {['Visa', 'Mastercard', 'Maestro', 'Bancontact'].map(p => (
              <span key={p} className="px-2 py-1 border border-white/10 rounded text-[10px] font-sans">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
