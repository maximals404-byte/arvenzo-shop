import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { decodeJwtPayload } from '@/lib/auth';
import {
  getCustomerByEmail, getOrderById, getProductImagesByIds,
  buildTrackingUrl, type DetailedOrder,
} from '@/lib/shopifyAdmin';

export const metadata = { title: 'Bestelling' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatPrice(amount: string | number, currency: string) {
  return new Intl.NumberFormat('nl-BE', { style: 'currency', currency }).format(Number(amount));
}

const FINANCIAL_LABEL: Record<string, string> = {
  paid: 'Betaald', pending: 'In behandeling', refunded: 'Terugbetaald',
  partially_refunded: 'Gedeeltelijk terugbetaald', voided: 'Geannuleerd',
  authorized: 'Geautoriseerd', partially_paid: 'Gedeeltelijk betaald',
};
const FULFILLMENT_LABEL: Record<string, string> = {
  fulfilled: 'Verstuurd', unfulfilled: 'Nog niet verstuurd',
  partial: 'Gedeeltelijk verstuurd', restocked: 'Teruggestuurd',
};
const STATUS_COLOR: Record<string, string> = {
  paid: 'bg-green-100 text-green-700', fulfilled: 'bg-blue-100 text-blue-700',
  unfulfilled: 'bg-yellow-100 text-yellow-700', pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-red-100 text-red-600', voided: 'bg-red-100 text-red-600',
  partial: 'bg-orange-100 text-orange-700', authorized: 'bg-blue-100 text-blue-700',
};

const CARRIER_NAMES: Record<string, string> = {
  postnl: 'PostNL', bpost: 'bpost', dhl: 'DHL', asendia: 'Asendia',
};

const COUNTRY_NAMES: Record<string, string> = {
  BE: 'België', NL: 'Nederland', LU: 'Luxemburg',
  DE: 'Duitsland', FR: 'Frankrijk', GB: 'Verenigd Koninkrijk',
};

function carrierLabel(company: string | null): string {
  if (!company) return 'Onbekend';
  const key = company.toLowerCase();
  for (const [k, v] of Object.entries(CARRIER_NAMES)) {
    if (key.includes(k)) return v;
  }
  return company;
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const idToken = cookieStore.get('arvenzo_id_token')?.value;
  if (!idToken) redirect('/api/auth/login');

  let email = '';
  try {
    const p = decodeJwtPayload(idToken);
    email = (p.email as string) ?? '';
  } catch { redirect('/api/auth/login'); }

  const customer = await getCustomerByEmail(email).catch(() => null);
  if (!customer) redirect('/api/auth/login');

  const order = await getOrderById(params.id, customer.id);
  if (!order) notFound();

  // Fetch product images
  const productIds = order.line_items.map((i) => i.product_id).filter(Boolean) as number[];
  const images = await getProductImagesByIds(productIds);

  const currency = order.currency;
  const shipping = Number(order.total_shipping_price_set?.shop_money?.amount ?? 0);
  const hasDiscount = Number(order.total_discounts) > 0;
  const hasFulfillments = order.fulfillments?.length > 0;

  return (
    <div className="grid gap-4">
      {/* Back + header */}
      <div className="flex items-center justify-between">
        <Link href="/account/orders" className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-brown transition-colors flex items-center gap-1">
          ← Bestellingen
        </Link>
        <div className="flex items-center gap-2">
          <Badge status={order.financial_status} labels={FINANCIAL_LABEL} />
          {order.fulfillment_status && <Badge status={order.fulfillment_status} labels={FULFILLMENT_LABEL} />}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-arvenzo-cream-dark">
          <h2 className="font-heading font-bold text-xl text-arvenzo-ink">{order.name}</h2>
          <p className="text-sm text-arvenzo-muted font-sans mt-0.5">{formatDate(order.created_at)}</p>
        </div>

        {/* Line items */}
        <ul className="divide-y divide-arvenzo-cream-dark">
          {order.line_items.map((item) => {
            const img = item.product_id ? images[item.product_id] : null;
            return (
              <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-16 h-16 rounded-xl bg-arvenzo-cream shrink-0 overflow-hidden">
                  {img ? (
                    <Image src={img} alt={item.title} width={64} height={64} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-arvenzo-muted text-xs font-sans">
                      Foto
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sans font-medium text-arvenzo-ink truncate">{item.title}</p>
                  {item.variant_title && item.variant_title !== 'Default Title' && (
                    <p className="text-xs font-sans text-arvenzo-muted">{item.variant_title}</p>
                  )}
                  <p className="text-xs font-sans text-arvenzo-muted mt-0.5">Aantal: {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-sans font-semibold text-arvenzo-ink">
                    {formatPrice(item.price, currency)}
                  </p>
                  {Number(item.total_discount) > 0 && (
                    <p className="text-xs font-sans text-green-600">
                      -{formatPrice(item.total_discount, currency)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pricing summary */}
        <div className="border-t border-arvenzo-cream-dark px-6 py-4 flex flex-col gap-2">
          <PricingRow label="Subtotaal" value={formatPrice(order.subtotal_price, currency)} />
          {hasDiscount && (
            <PricingRow label={`Korting${order.discount_codes?.[0] ? ` (${order.discount_codes[0].code})` : ''}`} value={`-${formatPrice(order.total_discounts, currency)}`} highlight />
          )}
          <PricingRow label="Verzendkosten" value={shipping === 0 ? 'Gratis' : formatPrice(shipping, currency)} />
          <PricingRow label={`BTW${order.taxes_included ? ' (inbegrepen)' : ''}`} value={formatPrice(order.total_tax, currency)} />
          <div className="border-t border-arvenzo-cream-dark pt-2 mt-1">
            <PricingRow label="Totaal" value={formatPrice(order.total_price, currency)} bold />
          </div>
        </div>
      </div>

      {/* Track & Trace */}
      {hasFulfillments && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-arvenzo-cream-dark">
            <h3 className="font-heading font-bold text-lg text-arvenzo-ink">Track & Trace</h3>
          </div>
          <div className="divide-y divide-arvenzo-cream-dark">
            {order.fulfillments.map((f) => {
              const trackingNumbers = f.tracking_numbers?.length ? f.tracking_numbers : f.tracking_number ? [f.tracking_number] : [];
              const trackingUrls = f.tracking_urls?.length ? f.tracking_urls : f.tracking_url ? [f.tracking_url] : [];

              return (
                <div key={f.id} className="px-6 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-sans font-semibold text-arvenzo-ink">
                      {carrierLabel(f.tracking_company)}
                    </span>
                    <span className="text-xs font-sans text-arvenzo-muted">{formatDate(f.created_at)}</span>
                  </div>
                  {trackingNumbers.map((num, i) => (
                    <div key={i} className="flex items-center justify-between bg-arvenzo-cream rounded-lg px-4 py-3">
                      <span className="text-sm font-sans text-arvenzo-ink font-mono">{num}</span>
                      <a
                        href={buildTrackingUrl(f.tracking_company, num, trackingUrls[i] ?? null)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-sans font-semibold text-arvenzo-brown hover:text-arvenzo-ink transition-colors"
                      >
                        Volg pakket →
                      </a>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Shipping address */}
      {order.shipping_address && (
        <div className="bg-white rounded-2xl shadow-sm px-6 py-4">
          <h3 className="font-heading font-bold text-lg text-arvenzo-ink mb-3">Verzonden naar</h3>
          <p className="text-sm font-sans text-arvenzo-ink leading-relaxed">
            {[order.shipping_address.first_name, order.shipping_address.last_name].filter(Boolean).join(' ')}<br />
            {order.shipping_address.address1}
            {order.shipping_address.address2 && <>, {order.shipping_address.address2}</>}<br />
            {order.shipping_address.zip} {order.shipping_address.city}<br />
            {COUNTRY_NAMES[order.shipping_address.country_code] ?? order.shipping_address.country}
          </p>
        </div>
      )}
    </div>
  );
}

function Badge({ status, labels }: { status: string; labels: Record<string, string> }) {
  return (
    <span className={`text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {labels[status] ?? status}
    </span>
  );
}

function PricingRow({ label, value, highlight, bold }: {
  label: string; value: string; highlight?: boolean; bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-sans ${bold ? 'font-semibold text-arvenzo-ink' : 'text-arvenzo-muted'}`}>{label}</span>
      <span className={`text-sm font-sans ${bold ? 'font-bold text-arvenzo-ink text-base' : highlight ? 'text-green-600 font-medium' : 'text-arvenzo-ink'}`}>{value}</span>
    </div>
  );
}
