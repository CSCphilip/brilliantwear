"use client";

// Based on: https://www.youtube.com/watch?v=lATafp15HWA

import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "_components/ShoppingCart";
// import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

/* NOTE: This file can be seen as a template for working with context in React.
  It is a clean way to handle context inside of React.
*/
const ShoppingCartContext = createContext({} as ShoppingCartContext);

/* Context lets a component receive information from distant parents without
  passing it as props. For example, your app’s top-level component can pass 
  the current UI theme to all components below, no matter how deep.

  useContext() reads and subscribes to a context.

  NOTE: This is a custom hook. 
*/
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //   "shopping-cart",
  //   []
  // );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      {/* <ShoppingCart isOpen={isOpen} /> */}
    </ShoppingCartContext.Provider>
  );
}
