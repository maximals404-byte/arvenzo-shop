import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwtPayload, getCustomerIdFromToken } from '@/lib/auth';
import { getCustomerById, getCustomerByEmail } from '@/lib/shopifyAdmin';
import { PersonalInfoForm, AddressForm } from './CustomerForm';

export const metadata = { title: 'Mijn gegevens' };

export default async function AccountPage() {
  const cookieStore = cookies();
  const idToken = cookieStore.get('arvenzo_id_token')?.value;
  if (!idToken) redirect('/api/auth/login');

  let email = '';
  try {
    const payload = decodeJwtPayload(idToken);
    email = (payload.email as string) ?? '';
  } catch {
    redirect('/api/auth/login');
  }

  // Log JWT payload to diagnose sub claim format
  try {
    const raw = decodeJwtPayload(idToken);
    console.log('[account] JWT payload:', JSON.stringify({ sub: raw.sub, email: raw.email }));
  } catch { /* ignore */ }

  // Prefer direct ID lookup from JWT sub claim; fall back to email search
  const customerId = getCustomerIdFromToken(idToken);
  console.log('[account] email:', email, '| customerId from JWT:', customerId);

  // Always end up with a full /customers/{id}.json fetch.
  // The search endpoint returns incomplete data for Login-with-Shop customers.
  let resolvedId = customerId;
  if (!resolvedId) {
    const found = await getCustomerByEmail(email).catch(() => null);
    resolvedId = found?.id ?? null;
  }

  const customer = resolvedId ? await getCustomerById(resolvedId) : null;

  console.log('[account] customer:', JSON.stringify(customer));

  if (!customer) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-arvenzo-muted font-sans">
        Kon gegevens niet laden. Probeer opnieuw.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <PersonalInfoForm customer={customer} />
      <AddressForm customer={customer} />
    </div>
  );
}
