'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { Pencil, X } from 'lucide-react';
import { updatePersonalInfoAction, updateAddressAction } from './actions';
import type { AdminCustomer } from '@/lib/shopifyAdmin';

const COUNTRIES = [
  { code: 'BE', label: 'België' },
  { code: 'NL', label: 'Nederland' },
  { code: 'LU', label: 'Luxemburg' },
  { code: 'DE', label: 'Duitsland' },
  { code: 'FR', label: 'Frankrijk' },
  { code: 'GB', label: 'Verenigd Koninkrijk' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-arvenzo-brown text-arvenzo-cream font-sans font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-arvenzo-ink transition-colors disabled:opacity-60"
    >
      {pending ? 'Opslaan…' : 'Opslaan'}
    </button>
  );
}

function Field({
  label, name, type = 'text', defaultValue, required, placeholder,
}: {
  label: string; name: string; type?: string;
  defaultValue?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-sans font-medium text-arvenzo-muted uppercase tracking-wide">
        {label}
      </label>
      <input
        id={name} name={name} type={type}
        defaultValue={defaultValue ?? ''}
        required={required} placeholder={placeholder}
        className="w-full border border-arvenzo-cream-dark rounded-lg px-3 py-2.5 text-sm font-sans text-arvenzo-ink bg-white focus:outline-none focus:ring-2 focus:ring-arvenzo-brown/30 focus:border-arvenzo-brown transition"
      />
    </div>
  );
}

function ReadRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 gap-4">
      <dt className="text-sm font-sans text-arvenzo-muted shrink-0 w-36">{label}</dt>
      <dd className="text-sm font-sans text-arvenzo-ink text-right">{value || '—'}</dd>
    </div>
  );
}

/* ── Personal Info ── */

export function PersonalInfoForm({ customer }: { customer: AdminCustomer }) {
  const [editing, setEditing] = useState(false);
  const [state, action] = useFormState(updatePersonalInfoAction, { error: null, success: false });

  useEffect(() => {
    if (state.success) setEditing(false);
  }, [state.success]);

  const fullName = [customer.first_name, customer.last_name].filter(Boolean).join(' ');

  return (
    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-arvenzo-cream-dark">
        <h2 className="font-heading font-bold text-lg text-arvenzo-ink">Persoonlijke gegevens</h2>
        {editing ? (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-brown transition-colors"
            aria-label="Annuleren"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-brown transition-colors"
            aria-label="Bewerken"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>

      {editing ? (
        <form action={action} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Voornaam" name="first_name" defaultValue={customer.first_name} required />
            <Field label="Achternaam" name="last_name" defaultValue={customer.last_name} required />
          </div>
          <Field label="Telefoonnummer" name="phone" type="tel" defaultValue={customer.phone ?? ''} placeholder="+32 XXX XX XX XX" />
          {state.error && <p className="text-sm font-sans text-red-500">{state.error}</p>}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      ) : (
        <dl className="divide-y divide-arvenzo-cream-dark">
          <ReadRow label="Naam" value={fullName} />
          <ReadRow label="E-mailadres" value={customer.email} />
          <ReadRow label="Telefoonnummer" value={customer.phone ?? '—'} />
        </dl>
      )}
    </section>
  );
}

/* ── Address ── */

export function AddressForm({ customer }: { customer: AdminCustomer }) {
  const [editing, setEditing] = useState(false);
  const [state, action] = useFormState(updateAddressAction, { error: null, success: false });

  useEffect(() => {
    if (state.success) setEditing(false);
  }, [state.success]);

  const addr = customer.default_address;
  const countryLabel = COUNTRIES.find((c) => c.code === addr?.country_code)?.label ?? addr?.country ?? '—';
  const cityLine = addr ? [addr.zip, addr.city].filter(Boolean).join(' ') || '—' : '—';
  const addrLine = [addr?.address1, addr?.address2].filter(Boolean).join(', ') || '—';

  return (
    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-arvenzo-cream-dark">
        <h2 className="font-heading font-bold text-lg text-arvenzo-ink">Leveringsadres</h2>
        {editing ? (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-brown transition-colors"
            aria-label="Annuleren"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-1.5 text-arvenzo-muted hover:text-arvenzo-brown transition-colors"
            aria-label="Bewerken"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>

      {editing ? (
        <form action={action} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Voornaam" name="first_name" defaultValue={addr?.first_name ?? customer.first_name} required />
            <Field label="Achternaam" name="last_name" defaultValue={addr?.last_name ?? customer.last_name} required />
          </div>
          <Field label="Straat + huisnummer" name="address1" defaultValue={addr?.address1 ?? ''} required />
          <Field label="Bus / toevoeging" name="address2" defaultValue={addr?.address2 ?? ''} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Postcode" name="zip" defaultValue={addr?.zip ?? ''} required />
            <Field label="Stad" name="city" defaultValue={addr?.city ?? ''} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="country_code" className="text-xs font-sans font-medium text-arvenzo-muted uppercase tracking-wide">
              Land
            </label>
            <select
              id="country_code" name="country_code"
              defaultValue={addr?.country_code ?? 'BE'}
              className="w-full border border-arvenzo-cream-dark rounded-lg px-3 py-2.5 text-sm font-sans text-arvenzo-ink bg-white focus:outline-none focus:ring-2 focus:ring-arvenzo-brown/30 focus:border-arvenzo-brown transition"
            >
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
          </div>
          {state.error && <p className="text-sm font-sans text-red-500">{state.error}</p>}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      ) : (
        <dl className="divide-y divide-arvenzo-cream-dark">
          <ReadRow label="Naam" value={[addr?.first_name, addr?.last_name].filter(Boolean).join(' ') || '—'} />
          <ReadRow label="Adres" value={addrLine} />
          <ReadRow label="Stad" value={cityLine} />
          <ReadRow label="Land" value={countryLabel} />
        </dl>
      )}
    </section>
  );
}
