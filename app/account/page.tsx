import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwtPayload, getCustomerIdFromToken } from '@/lib/auth';
import { getCustomerById, getCustomerByEmail } from '@/lib/shopifyAdmin';
import { getCustomerAccountProfile } from '@/lib/shopifyCustomerApi';
import type { AdminCustomer } from '@/lib/shopifyAdmin';
import { PersonalInfoForm, AddressForm } from './CustomerForm';

export const metadata = { title: 'Mijn gegevens' };

export default async function AccountPage() {
  const cookieStore = cookies();
  const idToken = cookieStore.get('arvenzo_id_token')?.value;
  const accessToken = cookieStore.get('arvenzo_access_token')?.value;
  if (!idToken) redirect('/api/auth/login');

  let email = '';
  try {
    const payload = decodeJwtPayload(idToken);
    email = (payload.email as string) ?? '';
  } catch {
    redirect('/api/auth/login');
  }

  // Resolve the numeric customer ID
  let resolvedId = getCustomerIdFromToken(idToken);
  if (!resolvedId) {
    const found = await getCustomerByEmail(email).catch(() => null);
    resolvedId = found?.id ?? null;
  }

  if (!resolvedId) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-arvenzo-muted font-sans">
        Kon gegevens niet laden. Probeer opnieuw.
      </div>
    );
  }

  // Customer Account API: full profile data (works on all Shopify plans)
  const profile = accessToken ? await getCustomerAccountProfile(accessToken) : null;

  // Admin API: only used to get the address ID for mutations
  const adminCustomer = await getCustomerById(resolvedId);
  const addressId = adminCustomer?.default_address?.id;

  // Build unified customer object — Customer Account API is primary, Admin API is full fallback
  const adminAddr = adminCustomer?.default_address;
  const customer: AdminCustomer = {
    id: resolvedId,
    first_name: profile?.firstName || adminCustomer?.first_name || '',
    last_name: profile?.lastName || adminCustomer?.last_name || '',
    email: profile?.emailAddress?.emailAddress || adminCustomer?.email || email,
    phone: profile?.phoneNumber?.phoneNumber || adminCustomer?.phone || null,
    default_address: (profile?.defaultAddress || adminAddr)
      ? {
          id: addressId ?? 0,
          first_name: profile?.defaultAddress?.firstName || adminAddr?.first_name || profile?.firstName || adminCustomer?.first_name || '',
          last_name: profile?.defaultAddress?.lastName || adminAddr?.last_name || profile?.lastName || adminCustomer?.last_name || '',
          address1: profile?.defaultAddress?.address1 || adminAddr?.address1 || '',
          address2: profile?.defaultAddress?.address2 ?? adminAddr?.address2 ?? null,
          city: profile?.defaultAddress?.city || adminAddr?.city || '',
          zip: profile?.defaultAddress?.zip || adminAddr?.zip || '',
          country: adminAddr?.country || '',
          country_code: adminAddr?.country_code || 'BE',
          province: adminAddr?.province ?? null,
          default: true,
        }
      : null,
    addresses: [],
  };

  return (
    <div className="grid gap-4">
      <PersonalInfoForm customer={customer} />
      <AddressForm customer={customer} />
    </div>
  );
}
