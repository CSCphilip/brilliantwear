"use client";

import { useCheckout } from "_context";

export default function CheckoutShipping() {
  const { setCurrentCheckoutStep, checkoutSteps } = useCheckout();
  setCurrentCheckoutStep(checkoutSteps.indexOf("Shipping"));

  return (
    <main className="grow p-5">
      <h2>Shipping information</h2>
    </main>
  );
}
