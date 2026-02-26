import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CookieBanner from '@/components/CookieBanner';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

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
            <CookieBanner />
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var consent = null;
            try { consent = localStorage.getItem('arvenzo_consent'); } catch(e) {}
            gtag('consent', 'default', {
              analytics_storage: consent === 'granted' ? 'granted' : 'denied',
              ad_storage: consent === 'granted' ? 'granted' : 'denied',
              ad_user_data: consent === 'granted' ? 'granted' : 'denied',
              ad_personalization: consent === 'granted' ? 'granted' : 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6ZCTDJ7PLC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-6ZCTDJ7PLC');
          `}
        </Script>
      </body>
    </html>
  );
}
