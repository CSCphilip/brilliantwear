"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCheckout, useShoppingCart } from "_context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { CartItem } from "_types";

type paymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

export default function CheckoutPayment() {
  const { checkoutSteps, setCurrentCheckoutStep } = useCheckout();
  const { cartItems } = useShoppingCart();

  const [paymentStatus, setPaymentStatus] = useState<paymentStatus>("FAILED");

  useEffect(() => {
    setCurrentCheckoutStep(checkoutSteps.indexOf("Payment"));
  }, []);

  useEffect(() => {
    if (paymentStatus === "FAILED") {
      let timeoutId: NodeJS.Timeout;
      timeoutId = setTimeout(() => {
        setPaymentStatus("PENDING");
      }, 10000);
    }
  }, [paymentStatus]);

  // TODO: add all information the user has entered so far and the total price together with cart items

  return (
    <main className="grow p-5">
      <h2 className="mb-10">Payment</h2>

      <CheckoutSummary />

      {paymentStatus === "PENDING" && (
        <PaypalPayment
          cartItems={cartItems}
          setPaymentStatus={setPaymentStatus}
        />
      )}
      {paymentStatus === "FAILED" && (
        <div className="flex justify-center">
          <p className="text-center">
            Payment did not go through successfully. Please try again. The
            payment button will soon appear again.
          </p>
        </div>
      )}
    </main>
  );
}

function CheckoutSummary() {
  return <div></div>;
}

interface PaypalPaymentProps {
  cartItems: CartItem[];
  setPaymentStatus: React.Dispatch<paymentStatus>;
}

function PaypalPayment({ cartItems, setPaymentStatus }: PaypalPaymentProps) {
  const { user, shippingAddress, servicePoint } = useCheckout();

  const router = useRouter();

  const [paypalClientId, setPaypalClientId] = useState<string | undefined>(
    undefined
  );
  const [loadingPaypalClientId, setLoadingPaypalClientId] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/checkout/paypal-client-id");
        const data = await res.json();
        if (data.status && data.status === 500) {
          throw new Error(data.message);
        }
        setPaypalClientId(data.paypalClientId);
      } catch (error) {
        console.error("Error fetching PayPal client ID:", error);
      }
      setLoadingPaypalClientId(false);
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
        if (data.status !== "COMPLETED") {
          setPaymentStatus("FAILED");
        } else {
          setPaymentStatus("SUCCESSFUL");
          router.push("/checkout/complete");
        }
      });
  }

  return (
    <>
      {paypalClientId === undefined ? (
        <div className="flex justify-center pt-2">
          {loadingPaypalClientId ? (
            <ClipLoader color="#00457C" size={40} speedMultiplier={1} />
          ) : (
            <p className="text-center">
              Something went wrong with the PayPal payment option. Please try
              again later.
            </p>
          )}
        </div>
      ) : (
        // TODO: fix that the paypal button goes above the shopping cart when open
        <PayPalScriptProvider
          options={{ clientId: paypalClientId, currency: "SEK" }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{ layout: "horizontal" }}
          />
        </PayPalScriptProvider>
      )}
    </>
  );
}
