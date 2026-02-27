import Link from 'next/link';
import Image from 'next/image';
import MerchantBadge from '@/components/MerchantBadge';
import LanguageSelector from '@/components/LanguageSelector';
import { getLocale } from '@/lib/locale';
import { t } from '@/lib/translations';

const PAYMENT_METHODS = [
  { src: '/images/payments/Bancontact_logo.png',   alt: 'Bancontact' },
  { src: '/images/payments/VISA-logo.png',          alt: 'Visa' },
  { src: '/images/payments/Mastercard-logo.png',    alt: 'Mastercard' },
  { src: '/images/payments/Maestro-Logo-1992.png',  alt: 'Maestro' },
  { src: '/images/payments/amex.png',               alt: 'American Express' },
  { src: '/images/payments/Paypal_2014_logo.png',   alt: 'PayPal' },
  { src: '/images/payments/ideal.png',              alt: 'iDEAL' },
  { src: '/images/payments/kbc.png',                alt: 'KBC' },
  { src: '/images/payments/belfius.png',            alt: 'Belfius' },
  { src: '/images/payments/UnionPay_logo.svg.png',  alt: 'UnionPay' },
  { src: '/images/payments/usdc-coin.png',          alt: 'USDC' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/arvenzo_eu' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61586099254919' },
];

export default function Footer() {
  const locale = getLocale();
  const tr = (key: string) => t(key, locale);

  const columns = [
    {
      title: tr('footer.col.shop'),
      links: [
        [tr('footer.link.all_products'), '/products'],
        [tr('footer.link.hoodies'), '/products?type=Hoodies'],
        [tr('footer.link.sweatshirts'), '/products?type=Sweatshirts'],
        [tr('footer.link.shirts'), '/products?type=Unisex-Shirts'],
        [tr('footer.link.mugs'), '/products?type=Trinkgef%C3%A4%C3%9Fe'],
      ],
    },
    {
      title: tr('footer.col.service'),
      links: [
        [tr('footer.link.shipping'), '/shipping'],
        [tr('footer.link.returns'), '/returns'],
        [tr('footer.link.sizing'), '/sizing'],
        [tr('footer.link.contact'), '/contact'],
        [tr('footer.link.faq'), '/faq'],
      ],
    },
    {
      title: tr('footer.col.info'),
      links: [
        [tr('footer.link.story'), '/about'],
        [tr('footer.link.company'), '/bedrijfsgegevens'],
        [tr('footer.link.privacy'), '/privacy'],
        [tr('footer.link.terms'), '/terms'],
        [tr('footer.link.withdrawal'), '/returns'],
      ],
    },
  ];

  return (
    <footer className="bg-arvenzo-ink text-arvenzo-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-heading font-black text-2xl tracking-[0.12em]">ARVENZO</div>
            <p className="mt-3 text-arvenzo-cream/40 text-sm font-sans leading-relaxed">
              {tr('footer.tagline')}
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-arvenzo-cream/30 hover:text-arvenzo-orange transition-colors font-sans tracking-widest uppercase">
                  {s.label}
                </a>
              ))}
            </div>
            <MerchantBadge />
          </div>

          {columns.map((col) => (
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

        {/* Payment icons */}
        <div className="border-t border-white/5 pt-6 pb-4">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-arvenzo-cream/20 mb-3">
            {tr('footer.payment')}
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {PAYMENT_METHODS.map((m) => (
              <div key={m.alt} className="bg-white rounded-md px-2 py-1.5 flex items-center justify-center h-9 w-14">
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={48}
                  height={28}
                  className="object-contain max-h-6 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Legal bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-arvenzo-cream/20 font-sans">
          <div className="space-y-1">
            <span className="block">© {new Date().getFullYear()} Arvenzo · Van Eylen Jonas · Pandhoevestraat 62, 3130 Begijnendijk, België</span>
            <span className="block">KBO: 1027.570.389 · BTW: BE1027.570.389 · support@arvenzo.eu</span>
            <span className="block">
              Belgisch recht van toepassing · Bevoegde rechtbank: arrondissement Leuven ·{' '}
              <Link href="/bedrijfsgegevens" className="hover:text-arvenzo-orange/60 transition-colors">Bedrijfsgegevens</Link>
              {' · '}
              <Link href="/privacy" className="hover:text-arvenzo-orange/60 transition-colors">{tr('footer.link.privacy')}</Link>
              {' · '}
              <Link href="/terms" className="hover:text-arvenzo-orange/60 transition-colors">{tr('footer.link.terms')}</Link>
            </span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-arvenzo-cream/10 text-[10px]">{tr('footer.secure')}</div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
