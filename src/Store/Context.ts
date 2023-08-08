import { createContext} from 'react';
import { User, Product, Cart, Products } from "./DS";

export interface ContextProps {
  user: User | null;
  cart: Cart;
  loadUser: () => Promise<void>;
  logUserIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  getProduct: (id: number) => Promise<Product>;
  getProducts: (page: number) => Promise<Product[]>;
  searchProducts: (query: string, page: number) => Promise<Products>;
  addToCart: (id: number, variantId: number) => Promise<void>;
  removeFromCart: (id: number, variantId: number) => Promise<void>;
}

export const Context = createContext<ContextProps>({
  user: null,
  cart: [],
  loadUser: () => Promise.resolve(null),
  logUserIn: (email: string, password: string) => Promise.resolve(null),
  signOut: () => {},
  getProduct: (id: number) => Promise.resolve(null),
  getProducts: (page: number) => Promise.resolve([]),
  searchProducts: (query: string, page: number) => Promise.resolve({ products: [], prev: null, next: null }),
  addToCart: (productId: number) => Promise.resolve(),
  removeFromCart: (productId: number) => Promise.resolve(),
});