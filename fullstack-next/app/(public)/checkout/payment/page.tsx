"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCheckout, useShoppingCart } from "_context";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CartItem } from "_types";
import { formatCurrency } from "_utilities";
import PlusSign from "_components/PlusSign";
import MinusSign from "_components/MinusSign";
import Link from "next/link";
import { usePathname } from "next/navigation";

type paymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

export default function CheckoutPayment() {
  const { cartItems } = useShoppingCart();
  const { setCurrentCheckoutStepWithPath } = useCheckout();

  const pathname = usePathname();
  useEffect(() => {
    setCurrentCheckoutStepWithPath(pathname);
  }, []);

  const [paymentStatus, setPaymentStatus] = useState<paymentStatus>("PENDING");

  useEffect(() => {
    if (paymentStatus === "FAILED") {
      let timeoutId: NodeJS.Timeout;
      timeoutId = setTimeout(() => {
        setPaymentStatus("PENDING");
      }, 7000);
    }
  }, [paymentStatus]);

  return (
    <main className="grow px-5 mb-8 flex flex-col items-center">
      <div className="max-w-xl">
        <p className="py-2 px-3 mt-7 text-center bg-red-500 rounded-md">
          <b>Please note:</b> PayPal Sandbox is currently in use. No real
          transactions will be processed. Feel free to use a PayPal sandbox
          account to simulate a payment transaction and complete the checkout.
        </p>
        <h3 className="my-7 text-center">Order preview & Payment</h3>

        <OrderSummary cartItems={cartItems} />

        {paymentStatus === "PENDING" && (
          <>
            <PaypalPayment
              cartItems={cartItems}
              setPaymentStatus={setPaymentStatus}
            />
          </>
        )}
        {paymentStatus === "FAILED" && (
          <div className="flex justify-center mx-5 px-4 py-1 rounded-sm bg-[#0079C1]">
            <p className="text-center">
              Payment did not go through successfully. Please try again. The
              payment button will soon appear again.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

interface OrderSummaryProps {
  cartItems: CartItem[];
}

function OrderSummary({ cartItems }: OrderSummaryProps) {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    totalCartPrice,
  } = useShoppingCart();

  const { shippingAddress, user, servicePoint } = useCheckout();

  return (
    <div className="w-full mb-10">
      <p className="font-medium mb-2">
        {cartItems.length > 1 ? "Products:" : "Product:"}
      </p>
      <ul>
        {cartItems.map((item, index) => (
          <li key={item.product.id} className="mb-3">
            <div className="flex mb-3">
              <img
                src={
                  "http://localhost:3000/api/products/image/" +
                  encodeURIComponent(item.product.image_url)
                }
                alt="Image of product"
                className="w-20"
              />
              <div className="flex flex-col justify-between py-0 pl-5 grow">
                <div>
                  <p>Brand: {item.product.brand}</p>
                  <p>Category: {item.product.category}</p>
                </div>
                <p className="font-medium text-gray-900">
                  {formatCurrency(item.product.price)}
                </p>
                <div className="flex">
                  <div className="flex grow">
                    <p>Qty: {item.quantity}</p>
                    <button
                      onClick={() => increaseCartQuantity(item.product)}
                      className="pt-[2px]"
                    >
                      <PlusSign />
                    </button>
                    <button
                      onClick={() => decreaseCartQuantity(item.product.id)}
                      className="pt-[2px]"
                    >
                      <MinusSign />
                    </button>
                  </div>
                  <p className="font-medium text-orange-700">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
              <div className="mt-0">
                <CrossDeleteItemButton
                  removeFromCart={() => removeFromCart(item.product.id)}
                />
              </div>
            </div>
            <hr
              className={`${
                index === cartItems.length - 1 && "hidden"
              } h-px mt-1 mx-2 border-0 bg-gray-300`}
            />
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t-2 border-black mx-2 pt-1 flex justify-between ps-2 pe-6">
        <p className="font-medium text-gray-900">Subtotal</p>
        <p className="font-medium text-gray-900">
          {formatCurrency(totalCartPrice)}
        </p>
      </div>

      <p className="font-medium mt-5 mb-2">Packet is sent to:</p>
      <div className="ms-2 text-sm lg:text-base">
        <p>
          {user.firstName + " " + user.lastName}
          <br />
          {shippingAddress.street + " " + shippingAddress.streetNumber}
          <br />
          {shippingAddress.postalCode + " " + shippingAddress.city}
          <br />
          {shippingAddress.country}
        </p>
        <p className="font-medium mt-3 mb-1">Pick up</p>
        <p>
          <span className="font-medium">Service point:</span>{" "}
          {servicePoint.name}
          <br />
          <span className="font-medium">Address:</span>{" "}
          {servicePoint.visitingAddress.streetName +
            " " +
            servicePoint.visitingAddress.streetNumber}
          <br />
          <span className="font-medium">Shipping fee:</span> Free
        </p>
      </div>
      <div className="mt-4 border-t-2 border-black mx-2 pt-1 flex justify-between ps-2 pe-6">
        <p className="font-medium text-gray-900">Subtotal</p>
        <p className="font-medium text-gray-900">{formatCurrency(0)}</p>
      </div>

      <div className="mt-8 border-y-4 border-black mx-2 py-1 flex justify-between ps-2 pe-6">
        <p className="font-medium text-gray-900">Total</p>
        <p className="font-medium text-gray-900">
          {formatCurrency(totalCartPrice)}
        </p>
      </div>
    </div>
  );
}

interface PaypalPaymentProps {
  cartItems: CartItem[];
  setPaymentStatus: React.Dispatch<paymentStatus>;
}

function PaypalPayment({ cartItems, setPaymentStatus }: PaypalPaymentProps) {
  const {
    user,
    shippingAddress,
    servicePoint,
    setOrderId,
    toNextCheckoutStep,
  } = useCheckout();

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
          setOrderId(data.id);
          toNextCheckoutStep();
        }
      });
  }

  return (
    <>
      {paypalClientId === undefined ? (
        <div className="flex justify-center">
          {loadingPaypalClientId ? (
            <ClipLoader color="#00457C" size={40} speedMultiplier={1} />
          ) : (
            <div className="mx-5 px-4 py-1 rounded-sm bg-[#0079C1]">
              <p className="text-center">
                Something went wrong with the PayPal payment option. Please try
                again later.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative z-0 w-full">
          <PayPalScriptProvider
            options={{ clientId: paypalClientId, currency: "SEK" }}
          >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: "horizontal" }}
            />
          </PayPalScriptProvider>

          <p className="mt-3 px-5 text-sm text-center">
            By clicking the above button and completing the transaction through
            PayPal, I agree to abide by the{" "}
            <Link
              href="/terms-and-conditions"
              className="text-blue-600 hover:underline"
            >
              terms and conditions
            </Link>{" "}
            of Brilliantwear.
          </p>
        </div>
      )}
    </>
  );
}

function CrossDeleteItemButton({
  removeFromCart,
}: {
  removeFromCart: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => removeFromCart()}
      className="text-gray-400 hover:text-gray-600 focus:outline-none"
    >
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M16 8L8 16M8.00001 8L16 16"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  );
}
