"use client";

import Link from "next/link";
import { CheckoutProvider, useShoppingCart } from "_context";
import CheckoutProgress from "_components/checkout/CheckoutProgress";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cartQuantity } = useShoppingCart();

  return (
    <CheckoutProvider>
      <main className="grow flex flex-col bg-slate-100">
        {cartQuantity === 0 ? (
          <div className="grow flex flex-col justify-center items-center px-5">
            <p className="text-center">
              Your cart is empty, please add items to proceed with checkout.
            </p>
            <Link
              href="/"
              className="mt-7 font-medium text-blue-600 hover:underline"
            >
              Return to the shop
            </Link>
          </div>
        ) : (
          <>
            <CheckoutProgress />
            {children}
          </>
        )}
      </main>
    </CheckoutProvider>
  );
}
