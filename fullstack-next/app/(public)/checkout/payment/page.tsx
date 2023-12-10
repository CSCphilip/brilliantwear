"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCheckout } from "_context";
import { useEffect, useState } from "react";

export default function CheckoutPayment() {
  const { checkoutSteps, setCurrentCheckoutStep } = useCheckout();

  const [paypalClientId, setPaypalClientId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentCheckoutStep(checkoutSteps.indexOf("Payment"));

    const fetchData = async () => {
      try {
        const res = await fetch("/api/checkout/paypal-client-id");
        const data = await res.json();
        setPaypalClientId(data.paypalClientId);
      } catch (error) {
        console.error("Error fetching PayPal client ID:", error);
      }
    };

    fetchData();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  function createOrder() {
    return fetch("/api/checkout/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: [
          {
            id: "test01",
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order created in page for payment");
        console.log(data);
        return data.id;
      });
  }

  function onApprove(data: any) {
    const orderID = data.orderID;

    return fetch(`/api/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <main className="grow p-5">
      <h2 className="mb-10">Payment</h2>

      {paypalClientId !== undefined ? (
        <PayPalScriptProvider
          options={{ clientId: paypalClientId, currency: "SEK" }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{ layout: "horizontal" }}
          />
        </PayPalScriptProvider>
      ) : (
        <p>Cannot fetch the PayPal Client ID!</p>
      )}
    </main>
  );
}
