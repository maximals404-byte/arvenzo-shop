import { NextRequest, NextResponse } from 'next/server';
import { decodeJwtPayload } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authDomain = process.env.SHOPIFY_AUTH_DOMAIN!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const clientId = process.env.SHOPIFY_CLIENT_ID!;

  const idToken = req.cookies.get('arvenzo_id_token')?.value;

  const response = NextResponse.redirect(appUrl);

  // Clear all session cookies
  for (const name of [
    'arvenzo_access_token',
    'arvenzo_refresh_token',
    'arvenzo_id_token',
    'arvenzo_auth_state',
    'arvenzo_auth_nonce',
    'arvenzo_code_verifier',
  ]) {
    response.cookies.delete(name);
  }

  if (idToken) {
    try {
      // Build Shopify logout URL with id_token_hint
      const logoutParams = new URLSearchParams({
        id_token_hint: idToken,
        post_logout_redirect_uri: appUrl,
        client_id: clientId,
      });
      const logoutUrl = `${authDomain}/logout?${logoutParams.toString()}`;
      return NextResponse.redirect(logoutUrl);
    } catch {
      // If token is invalid, just redirect home
    }
  }

  return response;
}
