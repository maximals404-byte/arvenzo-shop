import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { customerAccountQuery, CUSTOMER_ORDERS_QUERY, type Order } from '@/lib/customerAccount';

export const metadata = { title: 'Mijn bestellingen' };

const STATUS_LABEL: Record<string, string> = {
  PAID: 'Betaald', PENDING: 'In behandeling', REFUNDED: 'Terugbetaald',
  PARTIALLY_REFUNDED: 'Gedeeltelijk terugbetaald', VOIDED: 'Geannuleerd',
  FULFILLED: 'Verstuurd', UNFULFILLED: 'Nog niet verstuurd',
  PARTIALLY_FULFILLED: 'Gedeeltelijk verstuurd', IN_PROGRESS: 'In behandeling',
};

const STATUS_COLOR: Record<string, string> = {
  PAID: 'bg-green-100 text-green-700',
  FULFILLED: 'bg-blue-100 text-blue-700',
  UNFULFILLED: 'bg-yellow-100 text-yellow-700',
  PENDING: 'bg-gray-100 text-gray-600',
  REFUNDED: 'bg-red-100 text-red-600',
  VOIDED: 'bg-red-100 text-red-600',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-BE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat('nl-BE', { style: 'currency', currency }).format(Number(amount));
}

export default async function OrdersPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('arvenzo_access_token')?.value;

  if (!accessToken) redirect('/api/auth/login');

  let orders: Order[] = [];

  try {
    const data = await customerAccountQuery<{ customer: { orders: { nodes: Order[] } } }>(
      accessToken,
      CUSTOMER_ORDERS_QUERY,
    );
    orders = data.customer.orders.nodes;
  } catch (e) {
    console.error('Failed to fetch orders:', e);
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <p className="font-heading font-bold text-xl text-arvenzo-ink mb-2">Nog geen bestellingen</p>
        <p className="text-sm text-arvenzo-muted font-sans mb-6">Je hebt nog niets besteld bij Arvenzo.</p>
        <a href="/products"
          className="inline-block bg-arvenzo-brown text-arvenzo-cream font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-arvenzo-ink transition-colors"
        >
          Shop nu
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Order header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-arvenzo-cream-dark">
            <div>
              <span className="font-heading font-bold text-arvenzo-ink">{order.name}</span>
              <span className="ml-3 text-sm text-arvenzo-muted font-sans">{formatDate(order.processedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge status={order.financialStatus} />
              <Badge status={order.fulfillmentStatus} />
            </div>
          </div>

          {/* Line items */}
          <ul className="divide-y divide-arvenzo-cream-dark px-6">
            {order.lineItems.nodes.map((item, i) => (
              <li key={i} className="flex items-center justify-between py-3 gap-4">
                <span className="text-sm font-sans text-arvenzo-ink">
                  {item.quantity}× {item.title}
                </span>
                <span className="text-sm font-sans text-arvenzo-muted shrink-0">
                  {formatPrice(item.price.amount, item.price.currencyCode)}
                </span>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-end px-6 py-3 border-t border-arvenzo-cream-dark">
            <span className="text-sm font-sans font-semibold text-arvenzo-ink">
              Totaal: {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const label = STATUS_LABEL[status] ?? status;
  const color = STATUS_COLOR[status] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
}
