import Link from 'next/link';
import MerchantBadge from '@/components/MerchantBadge';

/* ─── Payment icons ──────────────────────────────────────────────────────────
   Only the methods active on Belgian Shopify Payments.
   All icons: 46×30px, rounded corners, flat design.
   ─────────────────────────────────────────────────────────────────────────── */

function IconVisa() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="Visa">
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
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="Mastercard">
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
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="Bancontact">
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
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="Maestro">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      <circle cx="19" cy="13" r="8" fill="#0099DF"/>
      <circle cx="27" cy="13" r="8" fill="#EB001B" fillOpacity=".88"/>
      <text x="23" y="27" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="6.5" fill="#555">Maestro</text>
    </svg>
  );
}

function IconAmex() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="American Express">
      <rect width="46" height="30" rx="4" fill="#2E77BC"/>
      <text x="23" y="19" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="9" fill="white" letterSpacing="1">AMEX</text>
    </svg>
  );
}

function IconPayPal() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="PayPal">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      <text x="10" y="20" fontFamily="Arial Black,sans-serif" fontWeight="900" fontStyle="italic" fontSize="13" fill="#003087">P</text>
      <text x="17" y="20" fontFamily="Arial Black,sans-serif" fontWeight="900" fontStyle="italic" fontSize="13" fill="#009CDE">P</text>
      <text x="23" y="19.5" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="8.5" fill="#003087">ayPal</text>
    </svg>
  );
}

function IconUnionPay() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="UnionPay">
      <rect width="46" height="30" rx="4" fill="#CC0000"/>
      <rect x="14" y="0" width="32" height="30" rx="4" fill="#CC0000"/>
      <rect x="0" y="0" width="18" height="30" rx="4" fill="#C41230"/>
      <text x="23" y="13" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="6" fill="white" letterSpacing=".3">UNION</text>
      <text x="23" y="23" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="6" fill="white" letterSpacing=".3">PAY</text>
    </svg>
  );
}

function IconUSDC() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="USDC Crypto">
      <rect width="46" height="30" rx="4" fill="#2775CA"/>
      <circle cx="18" cy="15" r="9" fill="#2775CA" stroke="white" strokeWidth="1.5"/>
      <text x="18" y="19" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="white">$</text>
      <text x="32" y="13" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="6.5" fill="white">USD</text>
      <text x="32" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="6.5" fill="white">COIN</text>
    </svg>
  );
}

function IconIdeal() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="iDEAL">
      <rect width="46" height="30" rx="4" fill="white"/>
      <rect x=".5" y=".5" width="45" height="29" rx="3.5" stroke="#E0E0E0" strokeWidth=".7"/>
      <text x="23" y="20" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="12" fill="#C0006D">iDEAL</text>
    </svg>
  );
}

function IconKBC() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="KBC Direct Pay">
      <rect width="46" height="30" rx="4" fill="#1B4284"/>
      <text x="23" y="14" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="10" fill="white" letterSpacing=".5">KBC</text>
      <text x="23" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="6" fill="#7EC8E3" letterSpacing=".2">Direct Pay</text>
    </svg>
  );
}

function IconBelfius() {
  return (
    <svg width="58" height="38" viewBox="0 0 46 30" fill="none" aria-label="Belfius Direct Pay">
      <rect width="46" height="30" rx="4" fill="#CC0033"/>
      <text x="23" y="14" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="8" fill="white" letterSpacing=".3">Belfius</text>
      <text x="23" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="6" fill="white" letterSpacing=".2">Direct Pay</text>
    </svg>
  );
}

const PAYMENT_ICONS = [
  <IconBancontact key="bc" />,
  <IconVisa key="visa" />,
  <IconMastercard key="mc" />,
  <IconMaestro key="maestro" />,
  <IconUnionPay key="unionpay" />,
  <IconAmex key="amex" />,
  <IconPayPal key="paypal" />,
  <IconUSDC key="usdc" />,
  <IconIdeal key="ideal" />,
  <IconKBC key="kbc" />,
  <IconBelfius key="belfius" />,
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/arvenzo_eu' },
  { label: 'Facebook', href: 'https://facebook.com/arvenzo' },
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
