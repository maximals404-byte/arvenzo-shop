import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decodeJwtPayload } from '@/lib/auth';
import { getCustomerByEmail } from '@/lib/shopifyAdmin';
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

  const customer = await getCustomerByEmail(email).catch(() => null);

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
