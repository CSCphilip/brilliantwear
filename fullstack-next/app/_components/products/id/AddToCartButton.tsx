"use client";

import { useShoppingCart } from "_context";
import { Product } from "_types";
import { useEffect, useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const initialMessage = "Add to Cart";
  const [message, setMessage] = useState(initialMessage);
  const { increaseCartQuantity } = useShoppingCart();

  const handleClick = () => {
    setMessage("Good choice!");
    increaseCartQuantity(product);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (message !== initialMessage) {
      timeoutId = setTimeout(() => {
        setMessage("Add to Cart");
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <button
      onClick={handleClick}
      className={`${
        message === initialMessage
          ? "bg-primary hover:bg-orange-400"
          : "bg-sky-500 transition-colors duration-300"
      } rounded-full px-8 py-1 transition-transform`}
    >
      {message}
    </button>
  );
}
