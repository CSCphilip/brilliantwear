"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckoutProvider, useShoppingCart } from "_context";
import CheckoutProgress from "_components/checkout/CheckoutProgress";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cartQuantity } = useShoppingCart();

  // Condition to skip cart quantity check for checkout complete page
  const pathname = usePathname();
  const checkoutCompleteURL = "/checkout/complete";
  const skipCartQuantityCheck = pathname === checkoutCompleteURL;

  return (
    <CheckoutProvider>
      <main className="grow flex flex-col bg-slate-100">
        {!skipCartQuantityCheck && cartQuantity === 0 ? (
          <div className="grow flex flex-col justify-center items-center px-5">
            <p className="text-center rounded-md py-2 px-5 bg-slate-400">
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
