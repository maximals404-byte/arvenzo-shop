const ENDPOINT = `${process.env.SHOPIFY_AUTH_DOMAIN}/graphql`;

export async function customerAccountQuery<T>(
  accessToken: string,
  query: string,
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Customer Account API error: ${res.status}`);
  }

  const json = await res.json() as { data: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  return json.data;
}

/* ── Types ── */

export interface CustomerAddress {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  zip: string;
  zoneCode: string | null;
  countryCode: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string } | null;
  phoneNumber: { phoneNumber: string } | null;
  defaultAddress: CustomerAddress | null;
}

export interface OrderLineItem {
  title: string;
  quantity: number;
  price: { amount: string; currencyCode: string };
}

export interface Order {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: { nodes: OrderLineItem[] };
}

/* ── Queries ── */

export const CUSTOMER_DETAILS_QUERY = `{
  customer {
    firstName
    lastName
    emailAddress { emailAddress }
    phoneNumber { phoneNumber }
    defaultAddress {
      id
      firstName
      lastName
      address1
      address2
      city
      zip
      zoneCode
      countryCode
    }
  }
}`;

export const CUSTOMER_ORDERS_QUERY = `{
  customer {
    orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
      nodes {
        id
        name
        processedAt
        financialStatus
        fulfillmentStatus
        totalPrice { amount currencyCode }
        lineItems(first: 3) {
          nodes {
            title
            quantity
            price { amount currencyCode }
          }
        }
      }
    }
  }
}`;
