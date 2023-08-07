import { createContext} from 'react';
import { User, Product, Cart } from "./DS";

export interface ContextProps {
  user: User | null;
  cart: Cart;
  token: string | null;
  loadUser: () => Promise<void>;
  logUserIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  getProduct: (id: number) => Promise<Product>;
  getProducts: (page: number) => Promise<Product[]>;
  addToCart: (id: number, variantId: number) => Promise<void>;
  removeFromCart: (id: number, variantId: number) => Promise<void>;
}

export const Context = createContext<ContextProps>({
  user: null,
  cart: [],
  token: null,
  loadUser: () => Promise.resolve(null),
  logUserIn: (email: string, password: string) => Promise.resolve(null),
  signOut: () => {},
  getProduct: (id: number) => Promise.resolve(null),
  getProducts: (page: number) => Promise.resolve([]),
  addToCart: (productId: number) => Promise.resolve(),
  removeFromCart: (productId: number) => Promise.resolve(),
});