"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCheckout, useShoppingCart } from "_context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPayment() {
  const {
    checkoutSteps,
    setCurrentCheckoutStep,
    user,
    shippingAddress,
    servicePoint,
  } = useCheckout();
  const { cartItems } = useShoppingCart();

  const router = useRouter();

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
        cart: cartItems,
        user,
        shippingAddress,
        servicePoint,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        if (data.httpStatusCode !== 201) {
          // TODO: handle error and show on screen
        } else {
          router.push("/checkout/complete");
        }
      });
  }

  // TODO: add all information the user has entered so far and the total price together with cart items

  return (
    <main className="grow p-5">
      <h2 className="mb-10">Payment</h2>

      {paypalClientId !== undefined ? (
        <div className="z-0">
          {/* TODO: fix that the paypal button goes above the shopping cart when open */}
          <PayPalScriptProvider
            options={{ clientId: paypalClientId, currency: "SEK" }}
          >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: "horizontal" }}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <p>Cannot fetch the PayPal Client ID!</p>
      )}
    </main>
  );
}
