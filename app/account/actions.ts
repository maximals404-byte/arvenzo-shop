'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { decodeJwtPayload } from '@/lib/auth';
import { getCustomerByEmail, updateCustomer, upsertDefaultAddress } from '@/lib/shopifyAdmin';

async function getEmailFromCookie(): Promise<string> {
  const idToken = cookies().get('arvenzo_id_token')?.value;
  if (!idToken) throw new Error('Niet ingelogd');
  const payload = decodeJwtPayload(idToken);
  return (payload.email as string) ?? '';
}

export async function updatePersonalInfoAction(
  _prev: { error: string | null; success: boolean },
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  try {
    const email = await getEmailFromCookie();
    const customer = await getCustomerByEmail(email);
    if (!customer) return { error: 'Klant niet gevonden', success: false };

    await updateCustomer(customer.id, {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
    });

    revalidatePath('/account');
    return { error: null, success: true };
  } catch (e) {
    console.error(e);
    return { error: 'Opslaan mislukt. Probeer opnieuw.', success: false };
  }
}

export async function updateAddressAction(
  _prev: { error: string | null; success: boolean },
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  try {
    const email = await getEmailFromCookie();
    const customer = await getCustomerByEmail(email);
    if (!customer) return { error: 'Klant niet gevonden', success: false };

    await upsertDefaultAddress(
      customer.id,
      {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        address1: formData.get('address1') as string,
        address2: (formData.get('address2') as string) ?? '',
        city: formData.get('city') as string,
        zip: formData.get('zip') as string,
        country_code: formData.get('country_code') as string,
      },
      customer.default_address?.id,
    );

    revalidatePath('/account');
    return { error: null, success: true };
  } catch (e) {
    console.error(e);
    return { error: 'Adres opslaan mislukt. Probeer opnieuw.', success: false };
  }
}
