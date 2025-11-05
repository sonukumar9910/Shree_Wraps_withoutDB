import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { CartItem, Product } from "@shared/api";

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD"; product: Product; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  state: CartState;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  total: number;
} | null>(null);

const key = "wrapsboxes_cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.qty ?? 1;
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.product, qty }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, (init) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as CartState) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    [state.items],
  );
  const total = subtotal; // taxes/shipping can be added later

  const api = useMemo(
    () => ({
      state,
      add: (p: Product, qty?: number) => dispatch({ type: "ADD", product: p, qty }),
      remove: (id: string) => dispatch({ type: "REMOVE", id }),
      setQty: (id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      subtotal,
      total,
    }),
    [state, subtotal, total],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
