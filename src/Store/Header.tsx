import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineShop,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import {
  Product,
  getProduct,
} from './DS';
import { useOutletContext, Link } from 'react-router-dom';
import { Context } from './Context';
import { useDebounce } from 'use-debounce';

interface CartItem {
  product: Product;
  variant: number;
  quantity: number;
}
const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountIconRef = useRef<HTMLButtonElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [search, setSearch] = useState('');
  const [searchValue] = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const {
    user,
    cart,
    logUserIn,
    signOut,
    getProduct,
    removeFromCart,
    addToCart,
    searchProducts,
  } = useContext(Context);

  useEffect(() => {
    if (cart.length > 0) {
      const promises = cart.map((item) => {
        return getProduct(item.product_id).then((product) => {
          return {
            product,
            quantity: item.quantity,
            variant: product.variants.map((variant) => variant.id).indexOf(item.variant_id),
          };
        });
      });
      Promise.all(promises).then((items) => {
        setCartItems(items);
      });
    } else {
      setCartItems([]);
    }
  }, [cart, getProduct]);

  const toggleCart = () => {
    setCartOpen((open) => !open);
  };

  const toggleAccount = () => {
    setAccountOpen((open) => {
      if (!open) {
        setEmail('');
        setPassword('');
      }
      return !open;
    });
  }

  const handleSignIn = useCallback(() => {
    if (email !== '' && password !== '') {
      logUserIn(email, password).then(() => {
        setEmail('');
        setPassword('');
      });
    }
  }, [email, password]);

  // close cart when clicking outside of it or the cart icon
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node) && cartIconRef.current && !cartIconRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('click', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, []);

  // close account when clicking outside of it or the account icon
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node) && accountIconRef.current && !accountIconRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('click', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, []);

  const handleMinus = useCallback((e: React.MouseEvent<SVGElement, MouseEvent>, item: CartItem) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(item.product.id, item.product.variants[item.variant].id);
  }, [removeFromCart]);

  const handlePlus = useCallback((e: React.MouseEvent<SVGElement, MouseEvent>, item: CartItem) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(item.product.id, item.product.variants[item.variant].id);
  }, [addToCart]);

  // search only first page of results will show so 10 results max
  // we only want the full search when user presses enter or the more button at the bottom of the search results
  useEffect(() => {
    if (searchValue.trim() !== '') {
      searchProducts(searchValue, 0).then((products) => {
        setSearchResults(products.products);
        console.log(products);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchValue, searchProducts]);

  const handleSearchReturn = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // TODO: go to search page
    }
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent<SVGElement, MouseEvent>, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product.id, product.variants[0].id);
  }, [addToCart]);

  return (
    <>
      <div className="w-full h-12 fixed bg-slate-50 shadow-lg flex justify-between items-center">
        <AiOutlineShop className="w-12 h-12 p-1 shrink-0" />
        <span className="hidden md:block  shrink-0">
          Shop name
        </span>
        <input
          type="text" 
          className="grow w-full bg-transparent outline-none border border-slate-950/10 rounded-full px-3 py-1 my-1 md:mx-16 lg:mx-48 2xl:mx-96"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchReturn}
        />
        <button type="button" className="p-1 outline-none" onClick={toggleCart} ref={cartIconRef}>
          <AiOutlineShoppingCart className={`w-11 h-11 p-1 hover:bg-slate-950/10 cursor-pointer rounded-full ${cartOpen ? 'bg-slate-950/10' : ''}`} aria-hidden={true} />
          <span className="sr-only">Cart</span>
        </button>
        <button type="button" className="p-1 outline-none" onClick={toggleAccount} ref={accountIconRef}>
          <AiOutlineUser className={`w-11 h-11 p-1 hover:bg-slate-950/10 cursor-pointer rounded-full ${accountOpen ? 'bg-slate-950/10' : ''}`} aria-hidden={true} />
          <span className="sr-only">Account</span>
        </button>
      </div>
      {/* Cart */}
      {cartOpen && (
        <div className="fixed bg-slate-100 right-0 shadow-lg top-12 w-full md:w-96 max-w-full md:right-12 md:rounded-b-xl" ref={cartRef}>
          {cartItems.length > 0 ? cartItems.map((item) => (
            <Link className="flex flex-row items-center px-1" to={`/product/${item.product.id}`} key={item.product.id}>
              <img
                src={item.product.variants[item.variant].images[0]}
                alt={`${item.product.name} ${item.product.variants[item.variant].color}`}
                className="w-16 h-16 p-1"
              />
              <div>
                <p>{item.product.name} ({item.product.variants[item.variant].color})</p>
                {item.product.discount ? (
                  <p>
                    <span className="line-through">
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price)}
                    </span>
                    &nbsp;
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price - item.product.price * item.product.discount)}
                  </p>
                ) : (
                  <p>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.product.price)}
                  </p>
                )}
              </div>
              <div className="grow" />
              <div className="flex bg-slate-300 rounded-full">
                <AiOutlineMinus className="w-6 h-6 p-1 hover:bg-slate-950/10 cursor-pointer rounded-full" aria-label="Remove one" onClick={(e) => handleMinus(e, item)} />
                <span className="px-1">{item.quantity}</span>
                <AiOutlinePlus className="w-6 h-6 p-1 hover:bg-slate-950/10 cursor-pointer rounded-full" aria-label="Add one" onClick={(e) => handlePlus(e, item)} />
              </div>
            </Link>
          )) : (
            <div className="text-center p-4">
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>
      )}
      {/* Account */}
      {accountOpen && (
        <div className="fixed bg-slate-100 right-0 shadow-lg top-12 w-full md:w-48 max-w-full md:right-2 md:rounded-b-xl" ref={accountRef}>
          {user ? (
            <div className="flex flex-col items-center p-2">
              <Link to="/account" className="w-full bg-sky-600 hover:bg-sky-700 text-center text-white rounded-full px-2 py-1 my-1">
                Account
              </Link>
              <button
                type="button"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-full px-2 py-1 my-1"
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center p-2">
              <input
                type="text"
                className="w-full bg-slate-50 outline-none border border-slate-950/10 rounded-full px-2 py-1 my-1"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full bg-slate-50 outline-none border border-slate-950/10 rounded-full px-2 py-1 my-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="h-4" />
              <button
                type="button"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-full px-2 py-1"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}
      {searchResults.length > 0 && !cartOpen && !accountOpen && (
        <div className="w-full top-12 fixed">
          <div className="bg-slate-100 w-full mx-auto md:w-1/3 max-w-full md:rounded-b-xl max-h-full overflow-hidden">
          {searchResults.map((product) => (
            <Link to={`/product/${product.id}`} className="flex flex-row items-center px-1 hover:bg-slate-950/10" key={product.id}>
              <img
                src={product.variants[0].images[0]}
                alt={`${product.name} ${product.variants[0].color}`}
                className="w-16 h-16 p-1"
              />
              <div>
                <p>{product.name} ({product.variants[0].color})</p>
                {product.discount ? (
                  <p>
                    <span className="line-through">
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                    </span>
                    &nbsp;
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price - product.price * product.discount)}
                  </p>
                ) : (
                  <p>
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </p>
                )}
              </div>
              <div className="grow" />
              <AiOutlinePlus className="w-8 h-8 p-2 bg-slate-300 hover:bg-slate-950/10 cursor-pointer rounded-full" aria-label="Add to cart" onClick={(e) => handleAddToCart(e, product)} />
            </Link>
          ))}
        </div> 
        </div>
      )}
      {/* Header space */}
      <div className="h-12" />
    </>
  );
}

export default Header;