"use client";

import { useShoppingCart } from "_context";
import { Product } from "_types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <button
      onClick={() => increaseCartQuantity(product)}
      className="bg-primary hover:bg-orange-400 rounded-full px-8 py-1"
    >
      Add to Cart
    </button>
  );
}
