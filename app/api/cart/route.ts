import { NextRequest, NextResponse } from 'next/server';
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
  GET_CART_QUERY,
  CHECKOUT_CREATE_MUTATION,
} from '@/lib/queries';

const STOREFRONT_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

async function storefrontFetch(query: string, variables: Record<string, unknown>) {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Storefront API ${res.status}`);
  return res.json();
}

function extractCart(data: Record<string, unknown>) {
  // Handles all mutation/query response shapes
  const inner =
    (data as Record<string, Record<string, unknown>>).cartCreate?.cart ??
    (data as Record<string, Record<string, unknown>>).cartLinesAdd?.cart ??
    (data as Record<string, Record<string, unknown>>).cartLinesRemove?.cart ??
    (data as Record<string, Record<string, unknown>>).cartLinesUpdate?.cart ??
    (data as Record<string, Record<string, unknown>>).cart;
  return inner ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cartId, lines, lineIds } = body;

    let data: Record<string, unknown>;

    switch (action) {
      case 'create':
        data = await storefrontFetch(CREATE_CART_MUTATION, { lines });
        break;
      case 'add':
        data = await storefrontFetch(ADD_TO_CART_MUTATION, { cartId, lines });
        break;
      case 'remove':
        data = await storefrontFetch(REMOVE_FROM_CART_MUTATION, { cartId, lineIds });
        break;
      case 'update':
        data = await storefrontFetch(UPDATE_CART_MUTATION, { cartId, lines });
        break;
      case 'get':
        data = await storefrontFetch(GET_CART_QUERY, { cartId });
        break;
      case 'checkout': {
        const lineItems = (body.lineItems as { variantId: string; quantity: number }[]).map(
          (i) => ({ variantId: i.variantId, quantity: i.quantity })
        );
        data = await storefrontFetch(CHECKOUT_CREATE_MUTATION, { lineItems });
        const webUrl = (data?.data as Record<string, Record<string, Record<string, string>>>)
          ?.checkoutCreate?.checkout?.webUrl;
        if (webUrl) return NextResponse.json({ checkoutUrl: webUrl });
        return NextResponse.json({ error: 'No checkout URL' }, { status: 500 });
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const cart = extractCart(data.data as Record<string, unknown>);
    if (!cart) return NextResponse.json({ error: 'No cart returned' }, { status: 500 });

    return NextResponse.json({ cart });
  } catch (err) {
    console.error('[cart API]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
