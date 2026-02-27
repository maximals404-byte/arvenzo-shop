import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { decodeJwtPayload } from '@/lib/auth';
import {
  getCustomerByEmail,
  getOrderById,
  getFulfillmentEvents,
  buildTrackingUrl,
  type FulfillmentEvent,
} from '@/lib/shopifyAdmin';

export const metadata = { title: 'Zendingsstatus' };

/* ── Status labels ── */
const STATUS_LABEL: Record<string, string> = {
  label_purchased: 'Etiket aangemaakt',
  label_printed: 'Etiket afgedrukt',
  confirmed: 'Zending aangemaakt',
  carrier_picked_up: 'Afgehaald door bezorger',
  in_transit: 'Onderweg',
  out_for_delivery: 'Uit voor bezorging',
  attempted_delivery: 'Bezorgpoging mislukt',
  ready_for_pickup: 'Klaar voor afhaling',
  delivered: 'Afgeleverd',
  delayed: 'Vertraging',
  failure: 'Bezorgprobleem',
};

/* ── Progress bar ── */
const STEPS = [
  { label: 'Verwerking', statuses: ['label_purchased', 'label_printed', 'confirmed'] },
  { label: 'Opgehaald', statuses: ['carrier_picked_up'] },
  { label: 'Onderweg', statuses: ['in_transit'] },
  { label: 'Bezorging', statuses: ['out_for_delivery', 'attempted_delivery', 'ready_for_pickup'] },
  { label: 'Afgeleverd', statuses: ['delivered'] },
];

function getActiveStep(events: FulfillmentEvent[]): number {
  if (events.length === 0) return 0;
  // Use the latest event
  const lastStatus = events[events.length - 1].status;
  for (let i = STEPS.length - 1; i >= 0; i--) {
    if (STEPS[i].statuses.includes(lastStatus)) return i;
  }
  return 0;
}

/* ── Date formatting ── */
function formatEventDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('nl-BE', { weekday: 'short', day: 'numeric', month: 'short' })
    + ' · '
    + d.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
}

/* ── Carrier helpers ── */
const CARRIER_COLOR: Record<string, string> = {
  postnl: 'bg-orange-100 text-orange-700',
  bpost: 'bg-red-100 text-red-700',
  dhl: 'bg-yellow-100 text-yellow-800',
  asendia: 'bg-blue-100 text-blue-700',
};
const CARRIER_DISPLAY: Record<string, string> = {
  postnl: 'PostNL', bpost: 'bpost', dhl: 'DHL', asendia: 'Asendia', other: 'Vervoerder',
};

function carrierKey(company: string | null): string {
  const c = (company ?? '').toLowerCase();
  if (c.includes('postnl')) return 'postnl';
  if (c.includes('bpost')) return 'bpost';
  if (c.includes('dhl')) return 'dhl';
  if (c.includes('asendia')) return 'asendia';
  return 'other';
}

export default async function TrackDetailPage({
  params,
}: {
  params: { orderId: string; fulfillmentId: string };
}) {
  /* ── Auth ── */
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

  /* ── Load order (verifies ownership) ── */
  const order = await getOrderById(params.orderId, customer.id);
  if (!order) notFound();

  const fulfillmentId = Number(params.fulfillmentId);
  const fulfillment = order.fulfillments.find((f) => f.id === fulfillmentId);
  if (!fulfillment) notFound();

  /* ── Tracking events ── */
  const rawEvents = await getFulfillmentEvents(order.id, fulfillmentId);

  const displayEvents: FulfillmentEvent[] =
    rawEvents.length > 0
      ? rawEvents
      : [
          {
            id: 0,
            status: 'confirmed',
            message: 'Zending aangemaakt',
            happened_at: fulfillment.created_at,
            city: null,
            country: null,
          },
        ];

  const activeStep = getActiveStep(displayEvents);

  /* ── Tracking URL ── */
  const trackingNumber =
    fulfillment.tracking_numbers?.[0] ?? fulfillment.tracking_number ?? '';
  const trackingUrl = buildTrackingUrl(
    fulfillment.tracking_company,
    trackingNumber,
    fulfillment.tracking_urls?.[0] ?? fulfillment.tracking_url ?? null,
  );

  const key = carrierKey(fulfillment.tracking_company);
  const carrierColor = CARRIER_COLOR[key] ?? 'bg-gray-100 text-gray-600';
  const carrierName = CARRIER_DISPLAY[key];

  return (
    <div className="max-w-2xl mx-auto grid gap-4">
      {/* Back + header */}
      <div className="flex items-center justify-between">
        <Link
          href="/account/track"
          className="text-sm font-sans text-arvenzo-muted hover:text-arvenzo-ink transition-colors flex items-center gap-1"
        >
          ← Track &amp; Trace
        </Link>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-sans font-bold px-3 py-1.5 rounded-full ${carrierColor}`}>
            {carrierName}
          </span>
          <Link
            href={`/account/orders/${order.id}`}
            className="text-sm font-sans font-semibold text-arvenzo-ink hover:text-arvenzo-brown transition-colors"
          >
            {order.name}
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => {
            const reached = i <= activeStep;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                {/* Node */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                      reached
                        ? 'bg-arvenzo-brown border-arvenzo-brown'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <span
                    className={`mt-2 text-[10px] font-sans text-center whitespace-nowrap ${
                      reached ? 'text-arvenzo-ink font-semibold' : 'text-arvenzo-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {/* Connector */}
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-1 transition-colors ${
                      i < activeStep ? 'bg-arvenzo-brown' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-xs font-sans font-bold uppercase tracking-wider text-arvenzo-muted mb-4">
          Tijdlijn
        </p>
        <div className="grid gap-4">
          {[...displayEvents].reverse().map((ev, i) => (
            <div key={ev.id !== 0 ? ev.id : `fallback-${i}`} className="flex gap-4 items-start">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-arvenzo-brown shrink-0" />
              <div>
                <p className="text-xs font-sans text-arvenzo-muted mb-0.5">
                  {formatEventDate(ev.happened_at)}
                  {ev.city && <span className="ml-2">· {ev.city}{ev.country ? `, ${ev.country}` : ''}</span>}
                </p>
                <p className="text-sm font-sans font-semibold text-arvenzo-ink">
                  {ev.message ?? STATUS_LABEL[ev.status] ?? ev.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking number + external CTA */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-sans text-arvenzo-muted uppercase tracking-wide mb-1">
            Trackingnummer
          </p>
          <p className="text-sm font-mono font-sans text-arvenzo-ink">{trackingNumber}</p>
        </div>
        {trackingUrl !== '#' && (
          <a
            href={trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-arvenzo-brown text-arvenzo-cream font-sans font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-arvenzo-ink transition-colors"
          >
            Volg pakket bij {carrierName} →
          </a>
        )}
      </div>
    </div>
  );
}
