import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Arvenzo',
  description: 'Neem contact op met Arvenzo voor vragen over je bestelling, producten of retours. Via e-mail of ons contactformulier.',
  alternates: { canonical: 'https://www.arvenzo.be/contact' },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
