import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { customerAccountQuery, CUSTOMER_DETAILS_QUERY, type CustomerDetails } from '@/lib/customerAccount';

export const metadata = { title: 'Mijn gegevens' };

const COUNTRY_NAMES: Record<string, string> = {
  BE: 'België', NL: 'Nederland', FR: 'Frankrijk', DE: 'Duitsland', GB: 'Verenigd Koninkrijk',
  LU: 'Luxemburg', US: 'Verenigde Staten',
};

export default async function AccountPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('arvenzo_access_token')?.value;

  if (!accessToken) redirect('/api/auth/login');

  let customer: CustomerDetails | null = null;

  try {
    const data = await customerAccountQuery<{ customer: CustomerDetails }>(
      accessToken,
      CUSTOMER_DETAILS_QUERY,
    );
    customer = data.customer;
  } catch (e) {
    console.error('Failed to fetch customer details:', e);
  }

  if (!customer) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-arvenzo-muted font-sans">
        Kon gegevens niet laden. Probeer opnieuw.
      </div>
    );
  }

  const addr = customer.defaultAddress;
  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ');

  return (
    <div className="grid gap-4">
      {/* Persoonlijke gegevens */}
      <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-arvenzo-cream-dark">
          <h2 className="font-heading font-bold text-lg text-arvenzo-ink">Persoonlijke gegevens</h2>
        </div>
        <dl className="divide-y divide-arvenzo-cream-dark">
          <Row label="Naam" value={fullName || '—'} />
          <Row label="E-mailadres" value={customer.emailAddress?.emailAddress ?? '—'} />
          <Row label="Telefoonnummer" value={customer.phoneNumber?.phoneNumber ?? '—'} />
        </dl>
      </section>

      {/* Standaard adres */}
      <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-arvenzo-cream-dark">
          <h2 className="font-heading font-bold text-lg text-arvenzo-ink">Standaard leveringsadres</h2>
        </div>
        {addr ? (
          <dl className="divide-y divide-arvenzo-cream-dark">
            <Row label="Naam" value={[addr.firstName, addr.lastName].filter(Boolean).join(' ') || '—'} />
            <Row label="Adres" value={[addr.address1, addr.address2].filter(Boolean).join(', ')} />
            <Row label="Stad" value={`${addr.zip} ${addr.city}`} />
            <Row label="Land" value={COUNTRY_NAMES[addr.countryCode] ?? addr.countryCode} />
          </dl>
        ) : (
          <p className="px-6 py-4 text-sm text-arvenzo-muted font-sans">Geen adres opgeslagen.</p>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 gap-4">
      <dt className="text-sm font-sans text-arvenzo-muted shrink-0 w-36">{label}</dt>
      <dd className="text-sm font-sans text-arvenzo-ink text-right">{value}</dd>
    </div>
  );
}
