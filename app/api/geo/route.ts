import { headers } from 'next/headers';

export async function GET() {
  const country = headers().get('x-vercel-ip-country') ?? 'XX';
  return Response.json({ country });
}
