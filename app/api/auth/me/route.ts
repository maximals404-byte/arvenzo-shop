import { NextRequest, NextResponse } from 'next/server';
import { decodeJwtPayload } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const idToken = req.cookies.get('arvenzo_id_token')?.value;

  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = decodeJwtPayload(idToken);
    return NextResponse.json({
      customer: {
        email: payload.email as string,
        firstName: (payload.given_name ?? payload.first_name ?? '') as string,
        lastName: (payload.family_name ?? payload.last_name ?? '') as string,
        sub: payload.sub as string,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
