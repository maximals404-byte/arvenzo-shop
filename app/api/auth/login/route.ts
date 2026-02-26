import { NextResponse } from 'next/server';
import { generateRandomString, generateCodeChallenge } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.SHOPIFY_CLIENT_ID!;
  const authDomain = process.env.SHOPIFY_AUTH_DOMAIN!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const state = generateRandomString(32);
  const nonce = generateRandomString(32);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: `${appUrl}/api/auth/callback`,
    scope: 'openid email',
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const authorizeUrl = `${authDomain}/oauth/authorize?${params.toString()}`;

  const response = NextResponse.redirect(authorizeUrl);

  const cookieOpts = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    maxAge: 300,
    path: '/',
  };

  response.cookies.set('arvenzo_auth_state', state, cookieOpts);
  response.cookies.set('arvenzo_auth_nonce', nonce, cookieOpts);
  response.cookies.set('arvenzo_code_verifier', codeVerifier, cookieOpts);

  return response;
}
