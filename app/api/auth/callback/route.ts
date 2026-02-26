import { NextRequest, NextResponse } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { decodeJwtPayload } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const storedState = req.cookies.get('arvenzo_auth_state')?.value;
  const storedNonce = req.cookies.get('arvenzo_auth_nonce')?.value;
  const codeVerifier = req.cookies.get('arvenzo_code_verifier')?.value;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const authDomain = process.env.SHOPIFY_AUTH_DOMAIN!;
  const clientId = process.env.SHOPIFY_CLIENT_ID!;

  // CSRF check
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(`${appUrl}/?error=state_mismatch`);
  }

  if (!code || !codeVerifier) {
    return NextResponse.redirect(`${appUrl}/?error=missing_params`);
  }

  // Exchange code for tokens
  const tokenRes = await fetch(`${authDomain}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: `${appUrl}/api/auth/callback`,
      code,
      code_verifier: codeVerifier,
    }).toString(),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error('Token exchange failed:', err);
    return NextResponse.redirect(`${appUrl}/?error=token_exchange_failed`);
  }

  const tokens = await tokenRes.json() as {
    access_token: string;
    refresh_token?: string;
    id_token: string;
    expires_in: number;
    [key: string]: unknown;
  };
  console.log('[callback] token response keys:', Object.keys(tokens));
  console.log('[callback] access_token prefix:', tokens.access_token?.slice(0, 12));

  // Validate nonce via jose (discover issuer from well-known config)
  try {
    // Discover JWKS URI and issuer from OpenID config
    const oidcRes = await fetch(`${authDomain}/.well-known/openid-configuration`);
    if (oidcRes.ok) {
      const oidc = await oidcRes.json() as { jwks_uri: string; issuer: string };
      const JWKS = createRemoteJWKSet(new URL(oidc.jwks_uri));
      const { payload } = await jwtVerify(tokens.id_token, JWKS, {
        issuer: oidc.issuer,
        audience: clientId,
      });
      if (storedNonce && payload.nonce !== storedNonce) {
        return NextResponse.redirect(`${appUrl}/?error=nonce_mismatch`);
      }
    } else {
      // Fallback: just check nonce via decode (token came directly from Shopify)
      const payload = decodeJwtPayload(tokens.id_token);
      if (storedNonce && payload.nonce !== storedNonce) {
        return NextResponse.redirect(`${appUrl}/?error=nonce_mismatch`);
      }
    }
  } catch (e) {
    console.error('Token validation failed:', e);
    return NextResponse.redirect(`${appUrl}/?error=invalid_token`);
  }

  const response = NextResponse.redirect(`${appUrl}/account`);

  const sessionCookieOpts = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  };

  // Clear PKCE cookies
  response.cookies.delete('arvenzo_auth_state');
  response.cookies.delete('arvenzo_auth_nonce');
  response.cookies.delete('arvenzo_code_verifier');

  // Set session cookies
  response.cookies.set('arvenzo_access_token', tokens.access_token, {
    ...sessionCookieOpts,
    maxAge: 3600,
  });

  if (tokens.refresh_token) {
    response.cookies.set('arvenzo_refresh_token', tokens.refresh_token, {
      ...sessionCookieOpts,
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  response.cookies.set('arvenzo_id_token', tokens.id_token, {
    ...sessionCookieOpts,
    maxAge: 3600,
  });

  return response;
}
