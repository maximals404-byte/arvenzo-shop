const ADMIN_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-07`;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;

async function adminFetch(path: string, method = 'GET', body?: unknown) {
  const res = await fetch(`${ADMIN_URL}${path}`, {
    method,
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Admin API ${res.status}: ${await res.text()}`);
  return res.json();
}

/* ── Types ── */

export interface AdminAddress {
  id: number;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string | null;
  city: string;
  zip: string;
  country: string;
  country_code: string;
  province: string | null;
  default: boolean;
}

export interface AdminCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  default_address: AdminAddress | null;
  addresses: AdminAddress[];
}

export interface OrderFulfillment {
  id: number;
  status: string;
  tracking_company: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  tracking_numbers: string[];
  tracking_urls: string[];
  created_at: string;
}

export interface AdminOrder {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  currency: string;
  line_items: { title: string; quantity: number; price: string }[];
  fulfillments: OrderFulfillment[];
}

export interface DetailedOrderLineItem {
  id: number;
  product_id: number | null;
  variant_id: number | null;
  title: string;
  variant_title: string | null;
  sku: string | null;
  quantity: number;
  price: string;
  total_discount: string;
  image?: string | null;
}

export interface DetailedOrder {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  currency: string;
  subtotal_price: string;
  total_discounts: string;
  total_shipping_price_set: {
    shop_money: { amount: string; currency_code: string };
  };
  total_tax: string;
  total_price: string;
  taxes_included: boolean;
  discount_codes: { code: string; amount: string; type: string }[];
  line_items: DetailedOrderLineItem[];
  shipping_address: {
    first_name: string;
    last_name: string;
    address1: string;
    address2: string | null;
    city: string;
    zip: string;
    country: string;
    country_code: string;
  } | null;
  fulfillments: OrderFulfillment[];
  customer: { id: number } | null;
}

/* ── Read ── */

export async function getCustomerById(customerId: number): Promise<AdminCustomer | null> {
  try {
    const data = await adminFetch(
      `/customers/${customerId}.json`,
    );
    return data.customer ?? null;
  } catch {
    return null;
  }
}

export async function getCustomerByEmail(email: string): Promise<AdminCustomer | null> {
  const data = await adminFetch(
    `/customers/search.json?query=email:${encodeURIComponent(email)}&limit=1`,
  );
  return data.customers?.[0] ?? null;
}

export async function getOrdersByCustomerId(customerId: number): Promise<AdminOrder[]> {
  const data = await adminFetch(
    `/orders.json?customer_id=${customerId}&status=any&limit=20`,
  );
  return data.orders ?? [];
}

export async function getOrderById(
  orderId: string,
  customerId: number,
): Promise<DetailedOrder | null> {
  try {
    const data = await adminFetch(`/orders/${orderId}.json`);
    const order: DetailedOrder = data.order;
    if (!order || order.customer?.id !== customerId) return null;
    return order;
  } catch {
    return null;
  }
}

export async function getProductImagesByIds(
  productIds: number[],
): Promise<Record<number, string>> {
  if (!productIds.length) return {};
  const ids = Array.from(new Set(productIds.filter(Boolean))).join(',');
  try {
    const data = await adminFetch(`/products.json?ids=${ids}&fields=id,images&limit=250`);
    const result: Record<number, string> = {};
    for (const p of data.products ?? []) {
      if (p.images?.[0]?.src) result[p.id] = p.images[0].src;
    }
    return result;
  } catch {
    return {};
  }
}

/* ── Write ── */

export async function updateCustomer(
  customerId: number,
  fields: { first_name?: string; last_name?: string; phone?: string },
): Promise<AdminCustomer> {
  const data = await adminFetch(`/customers/${customerId}.json`, 'PUT', {
    customer: fields,
  });
  return data.customer;
}

export async function upsertDefaultAddress(
  customerId: number,
  fields: {
    first_name: string;
    last_name: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    country_code: string;
  },
  existingAddressId?: number,
): Promise<void> {
  if (existingAddressId) {
    await adminFetch(
      `/customers/${customerId}/addresses/${existingAddressId}.json`,
      'PUT',
      { address: fields },
    );
  } else {
    const data = await adminFetch(
      `/customers/${customerId}/addresses.json`,
      'POST',
      { address: { ...fields, default: true } },
    );
    const newId = data.customer_address?.id;
    if (newId) {
      await adminFetch(`/customers/${customerId}/addresses/${newId}/default.json`, 'PUT');
    }
  }
}

export interface FulfillmentEvent {
  id: number;
  status: string;
  message: string | null;
  happened_at: string;
  city: string | null;
  country: string | null;
}

/* ── Tracking ── */

export async function getFulfillmentEvents(
  orderId: number,
  fulfillmentId: number,
): Promise<FulfillmentEvent[]> {
  try {
    const data = await adminFetch(
      `/orders/${orderId}/fulfillments/${fulfillmentId}/events.json`,
    );
    return data.fulfillment_events ?? [];
  } catch {
    return [];
  }
}

export function buildTrackingUrl(
  company: string | null,
  number: string,
  existingUrl: string | null,
): string {
  if (existingUrl) return existingUrl;
  const c = (company ?? '').toLowerCase();
  if (c.includes('postnl')) return `https://jouw.postnl.nl/track-and-trace/${number}`;
  if (c.includes('bpost')) return `https://track.bpost.cloud/btr/web/#/search?itemCode=${number}&lang=nl`;
  if (c.includes('dhl')) return `https://www.dhl.com/nl-nl/home/tracking.html?tracking-id=${number}`;
  if (c.includes('asendia')) return `https://tracking.asendia.com/allorders/${number}`;
  return '#';
}
