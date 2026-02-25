import type { Product, ShopifyJSONProduct } from './types';

const STORE_URL = 'https://www.arvenzo.be';

// ─── Product Fetching (public JSON API — no auth needed) ──────────────────────

function normalizeJSONProduct(p: ShopifyJSONProduct): Product {
  const firstVariant = p.variants[0];
  const compareAtRaw = firstVariant?.compare_at_price;
  const compareAt = compareAtRaw && parseFloat(compareAtRaw) > 0 ? parseFloat(compareAtRaw) : null;
  const price = parseFloat(firstVariant?.price ?? '0');

  return {
    id: String(p.id),
    title: p.title,
    handle: p.handle,
    description: p.body_html.replace(/<[^>]*>/g, '').trim(),
    descriptionHtml: p.body_html,
    price,
    compareAtPrice: compareAt && compareAt > price ? compareAt : null,
    currency: 'EUR',
    images: p.images.map((img) => ({
      url: img.src,
      altText: img.alt ?? p.title,
      width: img.width ?? 2000,
      height: img.height ?? 2000,
    })),
    options: p.options.map((o) => ({ name: o.name, values: o.values })),
    variants: p.variants.map((v) => ({
      id: String(v.id),
      title: v.title,
      price: { amount: v.price, currencyCode: 'EUR' },
      compareAtPrice: v.compare_at_price
        ? { amount: v.compare_at_price, currencyCode: 'EUR' }
        : null,
      availableForSale: v.available,
      selectedOptions: p.options.map((o, i) => ({
        name: o.name,
        value: (v as Record<string, string>)[`option${i + 1}`] ?? '',
      })),
    })),
    productType: p.product_type,
    vendor: p.vendor,
    tags: p.tags ?? [],
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${STORE_URL}/products.json?limit=250`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: { products: ShopifyJSONProduct[] } = await res.json();
    return data.products.map(normalizeJSONProduct);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const res = await fetch(`${STORE_URL}/products/${handle}.json`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: { product: ShopifyJSONProduct } = await res.json();
    return normalizeJSONProduct(data.product);
  } catch {
    return null;
  }
}

// ─── Cart / Checkout URL builder ──────────────────────────────────────────────

export interface CartLineItem {
  variantId: string; // numeric Shopify variant ID
  quantity: number;
  title: string;
  handle: string;
  price: number;
  image: string | null;
  selectedOptions: { name: string; value: string }[];
}

export function buildCheckoutUrl(items: CartLineItem[]): string {
  const parts = items.map((item) => `${item.variantId}:${item.quantity}`).join(',');
  return `${STORE_URL}/cart/${parts}`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('nl-BE', { style: 'currency', currency }).format(amount);
}

export function getDiscountPercentage(price: number, compareAtPrice: number | null): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function getCollectionName(handle: string): string {
  const map: Record<string, string> = {
    'crescent-peak': 'Crescent Peak',
    'lunar-horizon': 'Lunar Horizon',
    'rustic-retreat': 'Rustic Retreat',
    'pathfinder-edition': 'Pathfinder Edition',
    'natura-compass': 'Natura Compass',
    'starry-compass': 'Starry Compass',
    'mountain-nature': 'Mountain Nature',
  };
  for (const [key, name] of Object.entries(map)) {
    if (handle.includes(key)) return name;
  }
  return handle;
}

// Group products by their collection (based on title prefix)
export function groupProductsByCollection(products: Product[]): Record<string, Product[]> {
  const groups: Record<string, Product[]> = {};
  const collections = [
    'Crescent Peak', 'Lunar Horizon', 'Rustic Retreat',
    'Pathfinder Edition', 'Natura Compass', 'Starry Compass', 'Mountain nature',
  ];

  for (const product of products) {
    const collection = collections.find((c) =>
      product.title.toLowerCase().startsWith(c.toLowerCase())
    ) ?? 'Overig';
    if (!groups[collection]) groups[collection] = [];
    groups[collection].push(product);
  }

  return groups;
}
