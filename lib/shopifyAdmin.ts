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

export interface AdminOrder {
  id: number;
  name: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  currency: string;
  line_items: {
    title: string;
    quantity: number;
    price: string;
  }[];
}

/* ── Read ── */

export async function getCustomerByEmail(email: string): Promise<AdminCustomer | null> {
  const data = await adminFetch(
    `/customers/search.json?query=email:${encodeURIComponent(email)}&limit=1&fields=id,first_name,last_name,email,phone,default_address,addresses`,
  );
  return data.customers?.[0] ?? null;
}

export async function getOrdersByCustomerId(customerId: number): Promise<AdminOrder[]> {
  const data = await adminFetch(
    `/orders.json?customer_id=${customerId}&status=any&limit=20`,
  );
  return data.orders ?? [];
}

/* ── Write ── */

export async function updateCustomer(
  customerId: number,
  fields: { first_name?: string; last_name?: string; email?: string; phone?: string },
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
      await adminFetch(
        `/customers/${customerId}/addresses/${newId}/default.json`,
        'PUT',
      );
    }
  }
}
