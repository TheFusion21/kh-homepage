import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import * as DS from './DS';
import { Context, ContextProps } from './Context';
import useLocalStorage from '../utils/useLocalStorage';

const Layout = () => {
  const [user, setUser] = useState<DS.User | null>(null);
  const [cart, setCart] = useLocalStorage<DS.CartItem[]>('cart', []);
  const [token, setToken] = useLocalStorage<string | null>('token', null);

  const loadCart = useCallback((): Promise<void> => {
    if (token !== null) {
      return DS.getCart(token).then((cart) => {
        setCart(cart);
      });
    } else {
      return Promise.resolve(null);
    }
  }, [token]);

  const loadUser = useCallback((): Promise<void> => {
    if (token === null) {
      return Promise.resolve(null);
    } else {
      return DS.getMe(token).then((user) => {
        setUser(user);
      }).catch(() => {
        setUser(null);
        setToken(null);
        // refresh page
        window.location.reload();
      });
    }
  }, [token]);

  useEffect(() => {
    loadUser();
    loadCart();
  }, [loadUser]);

  const logUserIn = useCallback((email: string, password: string): Promise<void> => {
    return DS.login(email, password).then((token) => {
      setToken(token.access_token);
    });
  }, [loadUser]);

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const getProduct = useCallback((id: number): Promise<DS.Product> => {
    return DS.getProduct(id);
  }, []);

  const getProducts = useCallback((page: number): Promise<DS.Product[]> => {
    return DS.getProducts(page);
  }, []);

  const addToCart = useCallback((id: number, variantId: number | null): Promise<void> => {
    if (token === null) {
      return new Promise((resolve) => {
        const newCart = [...cart];
        const index = newCart.findIndex((item) => item.product_id === id && item.variant_id === variantId);
        if (index === -1) {
          newCart.push({
            product_id: id,
            variant_id: variantId,
            quantity: 1,
          });
        } else {
          newCart[index].quantity++;
        }
      });
    } else {
      return DS.addToCart(token, id, variantId).then((cart) => {
        setCart(cart);
      });
    }
  }, [token, cart]);

  const removeFromCart = useCallback((id: number, variantId: number | null): Promise<void> => {
    if (token === null) {
      return new Promise((resolve) => {
        const newCart = [...cart];
        const index = newCart.findIndex((item) => item.product_id === id && item.variant_id === variantId);
        if (index !== -1) {
          if (newCart[index].quantity > 1) {
            newCart[index].quantity--;
          } else {
            newCart.splice(index, 1);
          }
        }
      });
    } else {
      return DS.removeFromCart(token, id, variantId).then((cart) => {
        setCart(cart);
      });
    }
  }, [token, cart]);

  const context: ContextProps = useMemo(() => ({
    user,
    cart,
    token,
    loadUser,
    logUserIn,
    signOut,
    getProduct,
    getProducts,
    addToCart,
    removeFromCart,
  }), [user, cart, token, loadUser]);

  return (
    <Context.Provider value={context}>
      <Header />
      <Outlet />
      <Footer />
    </Context.Provider>
  );
}

export default Layout;