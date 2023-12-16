"use client";

import { useCheckout, useShoppingCart } from "_context";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CheckoutComplete() {
  const { orderId, setCurrentCheckoutStepWithPath } = useCheckout();
  const { emptyCart } = useShoppingCart();

  const pathname = usePathname();
  useEffect(() => {
    setCurrentCheckoutStepWithPath(pathname);
    emptyCart();
  }, []);

  return (
    <main className="grow flex justify-center mb-20">
      <div className="w-96 flex flex-col items-center">
        <h3 className="mt-7">Your order has been taken!</h3>
        <p className="mt-1 text-lg">
          <span className="font-medium">Order id:</span>
          {" " + orderId}
        </p>
        <img
          src="/thumbs-up.gif"
          alt="Thumbs up!"
          className="h-32 lg:h-40 mt-5"
        ></img>
        <p className="mt-7 px-5 text-center bg-blue-500 text-white rounded-md pt-5 pb-9 selection:bg-blue-700">
          Thank you for choosing Brilliantwear! Your order has been successfully
          placed and is now in motion. We're thrilled to be a part of your style
          journey. Our team is diligently working to ensure your items are
          prepared with care and swiftly delivered to you. Should you have any
          questions or need assistance, feel free to reach out to our friendly
          support team. We appreciate your trust in us and look forward to
          delighting you with our exceptional service. <br /> <br />{" "}
          <span className="font-medium">Happy styling!</span>
        </p>
        <Link
          href="/"
          className="mt-20 font-medium border-2 border-blue-500 rounded-md px-5 py-2 hover:underline 
          hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}
