export interface Variant {
  id: number;
  color: string;
  images: string[];
}

export interface Product {
  brand: string;
  category: string;
  description: string;
  discount: number | null;
  id: number;
  name: string;
  price: number;
  subcategory: string;
  tags: string[];
  variants: Variant[] | null;
}

export interface User {
  address: string;
  city: string;
  company_name: string | null;
  county: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  phone1: string | null;
  phone2: string | null;
  state: string;
  zip: string;
}

export interface CartItem {
  product_id: number;
  variant_id: number;
  quantity: number;
} 

export type Cart = CartItem[];

export interface Login {
  access_token: string;
  token_type: string;
}

export interface Error {
  detail: string;
}

const API_URL = `http://${window.location.hostname}:8000`;

export const login = (email: string, password: string): Promise<Login> => {
  const formBody = new URLSearchParams();
  formBody.append('username', email);
  formBody.append('password', password);
  return fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody.toString(),
  }).then(res => res.json());
};

export const getMe = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(res => res.json()).then(res => {
      if (res.detail) {
        reject(res as Error);
      } else {
        resolve(res as User);
      }
    });
  });
};

export const getCart = (token: string): Promise<Cart> => {
  return fetch(`${API_URL}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json()).catch(() => []);
};

export const addToCart = (token: string, productId: number, variantId: number): Promise<Cart> => {
  return fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id: productId, variant_id: variantId }),
  }).then(res => res.json());
};

export const removeFromCart = (token: string, productId: number, variantId: number): Promise<Cart> => {
  return fetch(`${API_URL}/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id: productId, variant_id: variantId }),
  }).then(res => res.json());
};

export const getProducts = (page: number): Promise<Product[]> => {
  return fetch(`${API_URL}/products?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const getProduct = (productId: number): Promise<Product> => {
  return fetch(`${API_URL}/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};
