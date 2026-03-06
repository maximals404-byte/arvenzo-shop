import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  AnalyticsPageType,
} from '@shopify/hydrogen-react';

export const SHOP_ID = 'gid://shopify/Shop/97185431895';
export const SHOP_DOMAIN = 'https://2bpbqi-n3.myshopify.com';

export function getHasConsent(): boolean {
  try {
    return localStorage.getItem('arvenzo_consent') === 'granted';
  } catch {
    return false;
  }
}

export function getPageType(pathname: string): string {
  if (pathname === '/') return AnalyticsPageType.home;
  if (pathname.startsWith('/products/')) return AnalyticsPageType.product;
  if (pathname === '/products') return AnalyticsPageType.collection;
  if (pathname === '/cart') return AnalyticsPageType.cart;
  return AnalyticsPageType.page;
}

export function toVariantGid(id: string): string {
  return id.startsWith('gid://') ? id : `gid://shopify/ProductVariant/${id}`;
}

function basePayload() {
  return {
    shopId: SHOP_ID,
    acceptedLanguage: 'NL' as const,
    currency: 'EUR' as never,
    hydrogenSubchannelId: '0',
    hasUserConsent: getHasConsent(),
  };
}

export function trackPageView(pathname: string) {
  try {
    sendShopifyAnalytics(
      {
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...getClientBrowserParameters(),
          ...basePayload(),
          pageType: getPageType(pathname),
        },
      },
      SHOP_DOMAIN,
    );
  } catch { /* ignore analytics errors */ }
}

export function trackAddToCart(
  cartId: string,
  item: { variantId: string; title: string; price: number; quantity: number },
) {
  try {
    const variantGid = toVariantGid(item.variantId);
    sendShopifyAnalytics(
      {
        eventName: AnalyticsEventName.ADD_TO_CART,
        payload: {
          ...getClientBrowserParameters(),
          ...basePayload(),
          cartId,
          products: [
            {
              productGid: variantGid, // gebruik variantGid als fallback
              variantGid,
              name: item.title,
              brand: 'Arvenzo',
              price: String(item.price),
              quantity: item.quantity,
            },
          ],
        },
      },
      SHOP_DOMAIN,
    );
  } catch { /* ignore analytics errors */ }
}
