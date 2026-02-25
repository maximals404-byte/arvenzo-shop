// ─── Shopify Public JSON API types ───────────────────────────────────────────

export interface ShopifyJSONImage {
  src: string;
  alt?: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyJSONVariant {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  available: boolean;
  option1?: string;
  option2?: string;
  option3?: string;
}

export interface ShopifyJSONOption {
  name: string;
  values: string[];
}

export interface ShopifyJSONProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  images: ShopifyJSONImage[];
  options: ShopifyJSONOption[];
  variants: ShopifyJSONVariant[];
}

// ─── Internal UI types ────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage;
}

export interface ShopifyProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  options: ShopifyProductOption[];
  productType: string;
  vendor: string;
  tags: string[];
}

// ─── Cart types ───────────────────────────────────────────────────────────────

export interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  handle: string;
  price: number;
  image: string | null;
  selectedOptions: ShopifySelectedOption[];
}

// Legacy compat
export type ShopifyProduct = Product;
