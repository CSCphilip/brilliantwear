"use client";

import { useCheckout } from "_context";

export default function CheckoutShipping() {
  const { setCurrentCheckoutStep, checkoutSteps } = useCheckout();
  setCurrentCheckoutStep(checkoutSteps.indexOf("Payment"));

  return (
    <main className="grow p-5">
      <h2>Payment</h2>
    </main>
  );
}
