export interface OrderShippingAddress {
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  zip: string | null;
  territoryCode: string | null;
}

const ORDER_ADDRESS_QUERY = `
  query GetOrderAddress($id: ID!) {
    order(id: $id) {
      shippingAddress {
        firstName
        lastName
        address1
        address2
        city
        zip
        territoryCode
      }
    }
  }
`;

export interface CustomerAccountProfile {
  firstName: string | null;
  lastName: string | null;
  emailAddress: { emailAddress: string } | null;
  phoneNumber: { phoneNumber: string } | null;
  defaultAddress: {
    firstName: string | null;
    lastName: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    zip: string | null;
  } | null;
}

const QUERY = `
  query CustomerProfile {
    customer {
      firstName
      lastName
      emailAddress { emailAddress }
      phoneNumber { phoneNumber }
      defaultAddress {
        firstName
        lastName
        address1
        address2
        city
        zip
      }
    }
  }
`;

// Discover the GraphQL endpoint from Shopify's well-known config
let cachedEndpoint: string | null = null;

async function resolveEndpoint(): Promise<string | null> {
  if (cachedEndpoint) return cachedEndpoint;
  try {
    const res = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/.well-known/customer-account-api`,
      { cache: 'force-cache' },
    );
    if (!res.ok) return null;
    const data = await res.json() as { graphql_api?: string };
    cachedEndpoint = data.graphql_api ?? null;
    console.log('[CustomerAccountAPI] discovered endpoint:', cachedEndpoint);
    return cachedEndpoint;
  } catch {
    return null;
  }
}

export async function getCustomerAccountProfile(
  accessToken: string,
): Promise<CustomerAccountProfile | null> {
  const endpoint = await resolveEndpoint();
  if (!endpoint) {
    console.error('[CustomerAccountAPI] Could not discover endpoint');
    return null;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('[CustomerAccountAPI] HTTP error:', res.status, await res.text());
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error('[CustomerAccountAPI] GraphQL errors:', JSON.stringify(json.errors));
      return null;
    }

    return json?.data?.customer ?? null;
  } catch (e) {
    console.error('[CustomerAccountAPI] fetch failed:', e);
    return null;
  }
}

export async function getOrderShippingAddress(
  accessToken: string,
  numericOrderId: string,
): Promise<OrderShippingAddress | null> {
  const endpoint = await resolveEndpoint();
  if (!endpoint) return null;
  const id = `gid://shopify/Order/${numericOrderId}`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: accessToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ORDER_ADDRESS_QUERY, variables: { id } }),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) return null;
    return json?.data?.order?.shippingAddress ?? null;
  } catch {
    return null;
  }
}
