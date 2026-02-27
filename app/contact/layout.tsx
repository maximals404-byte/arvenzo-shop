import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Arvenzo',
  description: 'Neem contact op met Arvenzo voor vragen over je bestelling, producten of retours. Via e-mail of ons contactformulier.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
