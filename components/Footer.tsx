import Link from 'next/link';
import MerchantBadge from '@/components/MerchantBadge';

/* ─── Payment icons ──────────────────────────────────────────────────────────
   Only the methods active on Belgian Shopify Payments.
   All icons: 46×30px, rounded corners, flat design.
   ─────────────────────────────────────────────────────────────────────────── */

function IconVisa() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Visa">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      {/* Visa blue bar bottom */}
      <rect x="0" y="21" width="46" height="9" rx="0" fill="#1A1F71"/>
      <rect x="0" y="21" width="46" height="9" fill="#1A1F71"/>
      <path d="M0 25h46v1H0z" fill="#F7A800"/>
      {/* VISA wordmark – bold italic navy */}
      <text x="23" y="17" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontStyle="italic" fontSize="13" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function IconMastercard() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Mastercard">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      <circle cx="18" cy="15" r="9" fill="#EB001B"/>
      <circle cx="28" cy="15" r="9" fill="#F79E1B"/>
      {/* overlap blend */}
      <path d="M23 7.4a9 9 0 0 1 0 15.2A9 9 0 0 1 23 7.4z" fill="#FF5F00"/>
    </svg>
  );
}

function IconBancontact() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Bancontact">
      <rect width="46" height="30" rx="4" fill="#005498"/>
      {/* Yellow bottom */}
      <path d="M0 20h46v6a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-6z" fill="#FEC910"/>
      {/* BC text white */}
      <text x="23" y="15" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="9" fill="white" letterSpacing=".5">Bancontact</text>
      {/* BC on yellow */}
      <text x="23" y="26.5" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="8" fill="#005498">BC</text>
    </svg>
  );
}

function IconMaestro() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Maestro">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      <circle cx="19" cy="13" r="8" fill="#0099DF"/>
      <circle cx="27" cy="13" r="8" fill="#EB001B" fillOpacity=".88"/>
      <text x="23" y="27" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="6.5" fill="#555">Maestro</text>
    </svg>
  );
}

function IconApplePay() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Apple Pay">
      <rect width="46" height="30" rx="4" fill="#000"/>
      {/* Simplified Apple logo path */}
      <path d="M17.2 10.1c.7-.9 1.1-2 1-3.1-1 .1-2.2.7-2.9 1.5-.7.8-1.2 1.8-1.1 2.9 1.1.1 2.3-.5 3-1.3z" fill="white"/>
      <path d="M18.2 11.6c-1.7-.1-3.1 1-3.9 1-.8 0-2-.9-3.3-.9-1.7.1-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.3 1.9 2.7 3.3 2.7 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4-.1 2.3-1.3 3.2-2.6 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1 0-2.5 2.1-3.8 2.2-3.9-1.1-1.5-2.9-1.6-3.9-1.1z" fill="white"/>
      <text x="34" y="19" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="500" fontSize="8" fill="white">Pay</text>
    </svg>
  );
}

function IconGooglePay() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Google Pay">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      {/* G in Google colors */}
      <path d="M18 11.5h-4.5v2.1h2.6c-.3 1.5-1.5 2.4-2.6 2.4-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9c.7 0 1.3.3 1.8.7l1.5-1.5C15.7 8.5 14.6 8 13.4 8 10.5 8 8 10.5 8 13.5s2.5 5.5 5.4 5.5c3.1 0 5.1-2.2 5.1-5.4 0-.4 0-.7-.1-1.1H18z" fill="#4285F4"/>
      <text x="30" y="19" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="500" fontSize="8.5" fill="#444">Pay</text>
    </svg>
  );
}

function IconShopPay() {
  return (
    <svg width="46" height="30" viewBox="0 0 46 30" fill="none" aria-label="Shop Pay">
      <rect width="46" height="30" rx="4" fill="#5C6AC4"/>
      <text x="23" y="19" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="7.5" fill="white" letterSpacing=".3">Shop Pay</text>
    </svg>
  );
}

const PAYMENT_ICONS = [
  <IconVisa key="visa" />,
  <IconMastercard key="mc" />,
  <IconBancontact key="bc" />,
  <IconMaestro key="maestro" />,
  <IconApplePay key="applepay" />,
  <IconGooglePay key="gpay" />,
  <IconShopPay key="shoppay" />,
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/arvenzo_eu' },
  { label: 'Facebook', href: 'https://facebook.com/arvenzo' },
  { label: 'TikTok', href: 'https://tiktok.com/@arvenzo' },
];

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
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-arvenzo-cream/30 hover:text-arvenzo-orange transition-colors font-sans tracking-widest uppercase">
                  {s.label}
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
                ['Bedrijfsgegevens', '/bedrijfsgegevens'],
                ['Privacybeleid', '/privacy'],
                ['Algemene voorwaarden', '/terms'],
                ['Herroepingsrecht', '/returns'],
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

        {/* Payment icons */}
        <div className="border-t border-white/5 pt-6 pb-4">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-arvenzo-cream/20 mb-3">Veilig betalen via</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_ICONS}
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
              <Link href="/privacy" className="hover:text-arvenzo-orange/60 transition-colors">Privacy</Link>
              {' · '}
              <Link href="/terms" className="hover:text-arvenzo-orange/60 transition-colors">Voorwaarden</Link>
            </span>
          </div>
          <div className="shrink-0 text-arvenzo-cream/10 text-[10px]">
            Veilig & beveiligd via Shopify
          </div>
        </div>
      </div>
    </footer>
  );
}
