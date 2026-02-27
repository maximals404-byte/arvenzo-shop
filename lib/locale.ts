import { cookies } from 'next/headers';

export function getLocale(): string {
  return cookies().get('arvenzo_locale')?.value ?? 'nl';
}
