'use client';

import {
  createContext, useContext, useEffect, useState,
  useCallback, useRef, type ReactNode,
} from 'react';
import type { CartItem } from '@/lib/types';

// ─── Shopify cart shapes ──────────────────────────────────────────────────────

interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    price: { amount: string; currencyCode: string };
    product: {
      id: string;
      title: string;
      handle: string;
      images: { edges: { node: { url: string; altText: string | null } }[] };
    };
  };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: { edges: { node: ShopifyCartLine }[] };
}

// ─── Context value ────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  checkoutUrl: string;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_ID_KEY = 'arvenzo-cart-id';
const FALLBACK_CHECKOUT = 'https://2bpbqi-n3.myshopify.com/cart';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cartToItems(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }) => ({
    variantId: node.merchandise.id,
    quantity: node.quantity,
    title: node.merchandise.product.title,
    handle: node.merchandise.product.handle,
    price: parseFloat(node.merchandise.price.amount),
    image: node.merchandise.product.images.edges[0]?.node.url ?? null,
    selectedOptions: node.merchandise.selectedOptions,
  }));
}

async function cartApiCall(body: Record<string, unknown>): Promise<ShopifyCart | null> {
  try {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.cart ?? null;
  } catch {
    return null;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState(FALLBACK_CHECKOUT);

  // variantId → Shopify line ID (needed for remove/update)
  const lineIdMap = useRef<Map<string, string>>(new Map());

  const syncCart = useCallback((cart: ShopifyCart) => {
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    setItems(cartToItems(cart));
    try { localStorage.setItem(CART_ID_KEY, cart.id); } catch { /* ignore */ }
    lineIdMap.current = new Map(
      cart.lines.edges.map(({ node }) => [node.merchandise.id, node.id])
    );
  }, []);

  // Restore cart from Shopify on mount
  useEffect(() => {
    let storedId: string | null = null;
    try { storedId = localStorage.getItem(CART_ID_KEY); } catch { /* ignore */ }
    if (!storedId) return;

    cartApiCall({ action: 'get', cartId: storedId }).then((cart) => {
      if (cart) syncCart(cart);
      else {
        try { localStorage.removeItem(CART_ID_KEY); } catch { /* ignore */ }
      }
    });
  }, [syncCart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const line = { merchandiseId: newItem.variantId, quantity };
    const cart = cartId
      ? await cartApiCall({ action: 'add', cartId, lines: [line] })
      : await cartApiCall({ action: 'create', lines: [line] });

    if (cart) {
      syncCart(cart);
    } else {
      // Optimistic fallback when API is unreachable
      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === newItem.variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === newItem.variantId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { ...newItem, quantity }];
      });
    }
    setIsOpen(true);
  }, [cartId, syncCart]);

  const removeItem = useCallback(async (variantId: string) => {
    const lineId = lineIdMap.current.get(variantId);
    if (cartId && lineId) {
      const cart = await cartApiCall({ action: 'remove', cartId, lineIds: [lineId] });
      if (cart) { syncCart(cart); return; }
    }
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, [cartId, syncCart]);

  const updateQuantity = useCallback(async (variantId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(variantId); return; }
    const lineId = lineIdMap.current.get(variantId);
    if (cartId && lineId) {
      const cart = await cartApiCall({
        action: 'update',
        cartId,
        lines: [{ id: lineId, quantity }],
      });
      if (cart) { syncCart(cart); return; }
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  }, [cartId, syncCart, removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCartId(null);
    setCheckoutUrl(FALLBACK_CHECKOUT);
    lineIdMap.current.clear();
    try { localStorage.removeItem(CART_ID_KEY); } catch { /* ignore */ }
  }, []);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, totalQuantity, subtotal, checkoutUrl,
      openCart, closeCart, addItem, removeItem, updateQuantity, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
