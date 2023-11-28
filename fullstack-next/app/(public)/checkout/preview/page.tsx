"use client";

import { useCheckout } from "_context";

export default function CheckoutShipping() {
  const { setCurrentCheckoutStep, checkoutSteps } = useCheckout();
  setCurrentCheckoutStep(checkoutSteps.indexOf("Preview"));

  return (
    <main className="grow p-5">
      <h2>Preview order</h2>
    </main>
  );
}
