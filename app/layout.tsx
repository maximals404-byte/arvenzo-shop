import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: 'Arvenzo — Draag het avontuur.',
    template: '%s | Arvenzo',
  },
  description:
    'Premium limited edition streetwear met berglandschap designs. Hoodies, sweatshirts, shirts & mugs. Belgisch merk, gedrukt in Europa.',
  keywords: ['arvenzo', 'hoodie', 'sweatshirt', 'limited edition', 'mountain', 'crescent peak'],
  openGraph: {
    title: 'Arvenzo — Draag het avontuur.',
    description: 'Premium limited edition streetwear voor wie de bergen voelt.',
    url: 'https://www.arvenzo.be',
    siteName: 'Arvenzo',
    locale: 'nl_BE',
    type: 'website',
    images: [{
      url: 'https://cdn.shopify.com/s/files/1/0971/8543/1895/files/front-basic-unisex-hoodie-arctic-white-482-c070-2000x.png',
      width: 2000, height: 2000, alt: 'Arvenzo Crescent Peak Hoodie',
    }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
