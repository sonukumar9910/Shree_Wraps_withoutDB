/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Product & Cart Types
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category?: string; 
  description?:string;
}

export interface CartItem extends Product {
  qty: number;
}

// Checkout types
export interface CheckoutForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  notes?: string;
  createAccount?: boolean;
}

export interface OrderRequest {
  items: CartItem[];
  subtotal: number;
  total: number;
  taxes?: number;
  form: CheckoutForm;
}

export interface OrderResponse {
  ok: boolean;
  orderId?: string;
  error?: string;
}
