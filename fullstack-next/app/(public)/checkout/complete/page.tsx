"use client";

import { useCheckout } from "_context";
import { useEffect } from "react";

export default function CheckoutPreview() {
  const { setCurrentCheckoutStep, checkoutSteps } = useCheckout();

  useEffect(() => {
    setCurrentCheckoutStep(checkoutSteps.indexOf("Complete"));
  }, []);

  return (
    <main className="grow p-5">
      <h2>You order has been completed</h2>
    </main>
  );
}
