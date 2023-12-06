"use client";

import { useCheckout } from "_context";
import { useEffect } from "react";

export default function CheckoutPreview() {
  const { setCurrentCheckoutStep, checkoutSteps } = useCheckout();

  useEffect(() => {
    setCurrentCheckoutStep(checkoutSteps.indexOf("Preview"));
  }, []);

  return (
    <main className="grow p-5">
      <h2>Preview order</h2>
    </main>
  );
}
