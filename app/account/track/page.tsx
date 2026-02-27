import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { decodeJwtPayload } from '@/lib/auth';
import { getCustomerByEmail, getOrdersByCustomerId, buildTrackingUrl } from '@/lib/shopifyAdmin';

export const metadata = { title: 'Track & Trace' };

const CARRIER_COLOR: Record<string, string> = {
  postnl: 'bg-orange-100 text-orange-700',
  bpost: 'bg-red-100 text-red-700',
  dhl: 'bg-yellow-100 text-yellow-800',
  asendia: 'bg-blue-100 text-blue-700',
};

function carrierKey(company: string | null): string {
  const c = (company ?? '').toLowerCase();
  if (c.includes('postnl')) return 'postnl';
  if (c.includes('bpost')) return 'bpost';
  if (c.includes('dhl')) return 'dhl';
  if (c.includes('asendia')) return 'asendia';
  return 'other';
}

const CARRIER_DISPLAY: Record<string, string> = {
  postnl: 'PostNL', bpost: 'bpost', dhl: 'DHL', asendia: 'Asendia', other: 'Vervoerder',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function TrackPage() {
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

  const orders = await getOrdersByCustomerId(customer.id).catch(() => []);

  // Collect all shipments across all orders
  const shipments = orders.flatMap((order) =>
    (order.fulfillments ?? []).flatMap((f) => {
      const numbers = f.tracking_numbers?.length ? f.tracking_numbers : f.tracking_number ? [f.tracking_number] : [];
      const urls = f.tracking_urls?.length ? f.tracking_urls : f.tracking_url ? [f.tracking_url] : [];
      return numbers.map((num, i) => ({
        orderName: order.name,
        orderId: order.id,
        fulfillmentId: f.id,
        carrier: f.tracking_company,
        trackingNumber: num,
        trackingUrl: buildTrackingUrl(f.tracking_company, num, urls[i] ?? null),
        shippedAt: f.created_at,
        fulfillmentStatus: order.fulfillment_status,
      }));
    }),
  );

  if (shipments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="font-heading font-bold text-xl text-arvenzo-ink mb-2">Geen actieve zendingen</p>
        <p className="text-sm text-arvenzo-muted font-sans mb-6">
          Zodra je bestelling verstuurd is, verschijnt het trackingnummer hier.
        </p>
        <Link href="/account/orders" className="inline-block bg-arvenzo-brown text-arvenzo-cream font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-arvenzo-ink transition-colors">
          Bekijk bestellingen
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {shipments.map((s, i) => {
        const key = carrierKey(s.carrier);
        const color = CARRIER_COLOR[key] ?? 'bg-gray-100 text-gray-600';
        return (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-arvenzo-cream-dark">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-sans font-bold px-3 py-1.5 rounded-full ${color}`}>
                  {CARRIER_DISPLAY[key]}
                </span>
                <Link href={`/account/orders/${s.orderId}`} className="text-sm font-sans font-semibold text-arvenzo-ink hover:text-arvenzo-brown transition-colors">
                  {s.orderName}
                </Link>
              </div>
              <span className="text-xs font-sans text-arvenzo-muted">{formatDate(s.shippedAt)}</span>
            </div>

            {/* Tracking number */}
            <div className="flex items-center justify-between px-6 py-4 gap-4">
              <div>
                <p className="text-xs font-sans text-arvenzo-muted uppercase tracking-wide mb-1">Trackingnummer</p>
                <p className="text-sm font-sans font-mono text-arvenzo-ink">{s.trackingNumber}</p>
              </div>
              <Link
                href={`/account/track/${s.orderId}/${s.fulfillmentId}`}
                className="shrink-0 bg-arvenzo-brown text-arvenzo-cream font-sans font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-arvenzo-ink transition-colors"
              >
                Bekijk status →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
