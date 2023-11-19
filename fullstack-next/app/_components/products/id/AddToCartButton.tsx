"use client";

import { useShoppingCart } from "_context";

export default function AddToCartButton({ id }: { id: string }) {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <button
      onClick={() => increaseCartQuantity(id)}
      className="bg-primary hover:bg-orange-400 rounded-full px-8 py-1"
    >
      Add to Cart
    </button>
  );
}
