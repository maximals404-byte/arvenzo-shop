import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SESSION_COOKIES = [
  'arvenzo_access_token',
  'arvenzo_refresh_token',
  'arvenzo_id_token',
  'arvenzo_auth_state',
  'arvenzo_auth_nonce',
  'arvenzo_code_verifier',
];

export async function GET(req: NextRequest) {
  const authDomain = process.env.SHOPIFY_AUTH_DOMAIN!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const clientId = process.env.SHOPIFY_CLIENT_ID!;

  const idToken = req.cookies.get('arvenzo_id_token')?.value;

  // Determine redirect target
  let redirectUrl = appUrl;
  if (idToken) {
    const logoutParams = new URLSearchParams({
      id_token_hint: idToken,
      post_logout_redirect_uri: appUrl,
      client_id: clientId,
    });
    redirectUrl = `${authDomain}/logout?${logoutParams.toString()}`;
  }

  const response = NextResponse.redirect(redirectUrl);

  // Clear all session cookies on the response that is actually returned
  for (const name of SESSION_COOKIES) {
    response.cookies.delete(name);
  }

  return response;
}
