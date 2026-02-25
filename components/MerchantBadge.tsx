'use client';

import Script from 'next/script';

export default function MerchantBadge() {
  return (
    <>
      <div id="goog-merchant-badge" className="mt-5" />
      <Script
        src="https://apis.google.com/js/platform.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-expect-error — google global loaded by script
          if (window.google?.merchantwidget) {
            // @ts-expect-error
            window.google.merchantwidget.render('goog-merchant-badge', {
              merchant_id: 5715486747,
            });
          }
        }}
      />
    </>
  );
}
