import type { Metadata } from 'next';
import { getFaq } from '@/lib/page-content/faq';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen | Arvenzo',
  description: 'Antwoorden op veelgestelde vragen over verzending, retours, maatvoering en betalingen bij Arvenzo.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: getFaq('nl').map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
