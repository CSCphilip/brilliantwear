"use client";

// Based on: https://www.youtube.com/watch?v=lATafp15HWA

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { CartItem, Product } from "_types";
import ShoppingCart from "_components/ShoppingCart";
import { useLocalStorage } from "_helpers/client/hooks";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  cartImages: { [id: string]: Blob | undefined };
  totalCartPrice: number;
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

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const [cartImages, setCartImages] = useState<{
    [id: string]: Blob | undefined;
  }>({});

  const [fetchedPrevSessionCartImages, setFetchedPrevSessionCartImages] =
    useState(false);

  useEffect(() => {
    if (!fetchedPrevSessionCartImages && cartItems.length > 0) {
      setFetchedPrevSessionCartImages(true);
      cartItems.forEach((item) => {
        fetchCartImage(item.product, cartImages, setCartImages);
      });
    }
  }, [cartItems]);

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  );

  const totalCartPrice = cartItems.reduce(
    (totalPrice: number, item: CartItem) => {
      return totalPrice + item.product.price * item.quantity;
    },
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return (
      cartItems.find((item: CartItem) => item.product.id === id)?.quantity || 0
    );
  }

  function increaseCartQuantity(product: Product) {
    setCartItems((currItems) => {
      // New item to be added to the cart.
      if (currItems.find((item) => item.product.id === product.id) == null) {
        console.log(
          "An item was added to the shopping cart with id:",
          product.id
        );
        fetchCartImage(product, cartImages, setCartImages);
        return [...currItems, { product, quantity: 1 }];
      } else {
        // Existing item in the cart.
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            console.log(
              "The quantity was increased by one for the item with id:",
              product.id
            );
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
      if (currItems.find((item) => item.product.id === id)?.quantity === 1) {
        console.log(
          "The quantity was decreased to zero for the item with id:",
          id
        );
        cartImages.hasOwnProperty(id) && delete cartImages[id];
        return currItems.filter((item) => item.product.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.product.id === id) {
            console.log(
              "The quantity was decreased by one for the item with id:",
              id
            );
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    console.log("An item was removed from the shopping cart with id:", id);
    cartImages.hasOwnProperty(id) && delete cartImages[id];
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item) => item.product.id !== id);
    });
  }

  function emptyCart() {
    setCartItems([]);
    setCartImages({});
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
        emptyCart,
        cartItems,
        cartQuantity,
        cartImages,
        totalCartPrice,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

function fetchCartImage(
  product: Product,
  cartImages: { [id: string]: Blob | undefined },
  setCartImages: React.Dispatch<
    React.SetStateAction<{ [id: string]: Blob | undefined }>
  >
) {
  fetch(
    "http://localhost:3000/api/products/image/" +
      encodeURIComponent(product.image_url)
  )
    .then((res) => {
      if (res.ok) {
        return res.blob(); // Get the image data as a Blob
      }
      throw new Error("Network res was not OK.");
    })
    .then((image) => {
      console.log("Fetched image for item with id:", product.id);
      console.log(
        "An item with image available was added to the shopping cart with id:",
        product.id
      );
      setCartImages((prevCartImages) => ({
        ...prevCartImages,
        [product.id]: image,
      }));
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      console.log(
        "An item without image available was added to the shopping cart with id:",
        product.id
      );
      setCartImages((prevCartImages) => ({
        ...prevCartImages,
        [product.id]: undefined,
      }));
    });
}
