import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwtPayload } from '@/lib/auth';
import Link from 'next/link';

export const metadata = { title: 'Mijn account' };

export default function AccountPage() {
  const cookieStore = cookies();
  const idToken = cookieStore.get('arvenzo_id_token')?.value;

  if (!idToken) {
    redirect('/api/auth/login');
  }

  let customer: { email: string; firstName: string; lastName: string } = {
    email: '',
    firstName: '',
    lastName: '',
  };

  try {
    const payload = decodeJwtPayload(idToken);
    customer = {
      email: (payload.email as string) ?? '',
      firstName: (payload.given_name ?? payload.first_name ?? '') as string,
      lastName: (payload.family_name ?? payload.last_name ?? '') as string,
    };
  } catch {
    redirect('/api/auth/login');
  }

  const initials = [customer.firstName[0], customer.lastName[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || customer.email[0]?.toUpperCase() || '?';

  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email;

  return (
    <main className="min-h-screen bg-arvenzo-cream pt-[100px] pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Avatar + naam */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-arvenzo-brown text-arvenzo-cream flex items-center justify-center text-2xl font-heading font-bold">
            {initials}
          </div>
          <div className="text-center">
            <h1 className="font-heading font-black text-3xl text-arvenzo-ink">{fullName}</h1>
            <p className="text-arvenzo-muted font-sans mt-1">{customer.email}</p>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-arvenzo-cream-dark">
          <a
            href="https://arvenzo.myshopify.com/account/orders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-4 hover:bg-arvenzo-cream/40 transition-colors"
          >
            <span className="font-sans text-arvenzo-ink">Mijn bestellingen</span>
            <span className="text-arvenzo-muted">→</span>
          </a>

          <Link
            href="/api/auth/logout"
            className="flex items-center justify-between px-6 py-4 hover:bg-arvenzo-cream/40 transition-colors text-red-600"
          >
            <span className="font-sans">Uitloggen</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
