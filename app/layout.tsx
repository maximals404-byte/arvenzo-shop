import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CookieBanner from '@/components/CookieBanner';
import LanguagePopup from '@/components/LanguagePopup';
import { getLocale } from '@/lib/locale';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Arvenzo — Premium Streetwear Hoodies & Sweaters | België',
    template: '%s | Arvenzo',
  },
  description:
    'Premium streetwear met berglandschapdesigns. Hoodies, sweaters & shirts van Arvenzo – Belgisch merk, gedrukt in Europa. Gratis verzending vanaf €50.',
  keywords: ['arvenzo', 'hoodie', 'sweatshirt', 'streetwear', 'limited edition', 'berglandschap', 'belgisch merk', 'crescent peak', 'sweater heren', 'sweater dames'],
  alternates: { canonical: 'https://www.arvenzo.be' },
  openGraph: {
    title: 'Arvenzo — Premium Streetwear Hoodies & Sweaters | België',
    description: 'Premium streetwear met unieke berglandschapdesigns. Hoodies, sweaters & shirts – Belgisch merk, gedrukt in Europa.',
    url: 'https://www.arvenzo.be',
    siteName: 'Arvenzo',
    locale: 'nl_BE',
    type: 'website',
    images: [{
      url: 'https://cdn.shopify.com/s/files/1/0971/8543/1895/files/front-basic-unisex-hoodie-arctic-white-482-c070-2000x.png',
      width: 2000, height: 2000, alt: 'Arvenzo Crescent Peak Hoodie',
    }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  twitter: { card: 'summary_large_image', site: '@arvenzo' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <CartProvider>
            <LanguageProvider initialLocale={locale}>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <CookieBanner />
              <LanguagePopup />
            </LanguageProvider>
          </CartProvider>
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Arvenzo',
            url: 'https://www.arvenzo.be',
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: 'https://www.arvenzo.be/products?q={search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Arvenzo',
            url: 'https://www.arvenzo.be',
            logo: 'https://www.arvenzo.be/logo.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Pandhoevestraat 62',
              addressLocality: 'Begijnendijk',
              postalCode: '3130',
              addressCountry: 'BE',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+32456882518',
              contactType: 'customer service',
              email: 'support@arvenzo.eu',
            },
          }) }}
        />
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
        <Script
          src="https://rivodesk.vercel.app/analytics.js?id=198d22cb-fb0c-4b84-96db-1a6b2cdbc12d"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
