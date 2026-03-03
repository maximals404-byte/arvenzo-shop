import { NextRequest, NextResponse } from 'next/server';

const ADMIN_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-07`;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Check if customer already exists
    const searchRes = await fetch(
      `${ADMIN_URL}/customers/search.json?query=email:${encodeURIComponent(email)}&limit=1`,
      { headers: { 'X-Shopify-Access-Token': TOKEN }, cache: 'no-store' }
    );
    const searchData = await searchRes.json();
    const existing = searchData.customers?.[0];

    if (existing) {
      // Update marketing consent if not already subscribed
      if (existing.email_marketing_consent?.state !== 'subscribed') {
        await fetch(`${ADMIN_URL}/customers/${existing.id}.json`, {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: {
              id: existing.id,
              email_marketing_consent: {
                state: 'subscribed',
                opt_in_level: 'single_opt_in',
              },
            },
          }),
        });
      }
    } else {
      // Create new customer
      await fetch(`${ADMIN_URL}/customers.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            email,
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'single_opt_in',
            },
            tags: 'newsletter',
          },
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter API]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
