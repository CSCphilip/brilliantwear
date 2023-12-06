"use client";

import { useCheckout } from "_context";
import { useEffect } from "react";

export default function CheckoutPayment() {
  const { checkoutSteps, setCurrentCheckoutStep } = useCheckout();

  useEffect(() => {
    setCurrentCheckoutStep(checkoutSteps.indexOf("Payment"));
  }, []);

  return (
    <main className="grow p-5">
      <h2>Payment</h2>
    </main>
  );
}
